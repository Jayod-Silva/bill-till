console.log("Starting server.js...");
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const { sendInvoiceEmail } = require("./services/emailService");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Serve static files (for profile pictures)
app.use("/uploads", express.static(uploadDir));

// Rotues
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);

// --------------------------------------------------------
// PAYMENT CREDENTIALS (LKR & USD)
// --------------------------------------------------------
const paymentCredentials = {
  LKR: {
    merchantId: process.env.MERCHANT_ID_LKR || process.env.MERCHANT_ID || "MPGS00000348",
    apiPassword: process.env.API_PASSWORD_LKR || process.env.API_PASSWORD || "078809c1ac7c0359ef5e1a13ff9728a5",
    apiBaseUrl: process.env.API_BASE_URL_LKR || process.env.API_BASE_URL || "https://seylan.gateway.mastercard.com/api/rest/version/69",
  },
  USD: {
    merchantId: process.env.MERCHANT_ID_USD || "MPGS00000349",
    apiPassword: process.env.API_PASSWORD_USD || "2102663c909bc3b8b15f792cba596fbd",
    apiBaseUrl: process.env.API_BASE_URL_USD || "https://seylan.gateway.mastercard.com/api/rest/version/69",
  },
};

const getCredentials = (currency) => {
  const creds = paymentCredentials[currency] || paymentCredentials.LKR;
  return {
    ...creds,
    apiUsername: `merchant.${creds.merchantId}`,
  };
};

// In-memory map to remember which credentials were used per order
const orderCurrencyMap = {};

app.get('/api/test', (req, res) => {
  res.json({
    status: 'Server OK',
    timestamp: new Date().toISOString(),
    auth: "JWT enabled",
    prisma: "SQL Server ready"
  });
});

app.post("/api/create-payment", async (req, res) => {
  try {
    const orderId = "ORDER_" + Date.now();
    const amount = req?.body?.amount;
    const currency = req?.body?.currency === "USD" ? "USD" : "LKR";
    const creds = getCredentials(currency);

    // Remember currency for this order (used during verification)
    orderCurrencyMap[orderId] = currency;

    const sessionResponse = await axios.post(
      `${creds.apiBaseUrl}/merchant/${creds.merchantId}/session`,
      {
        apiOperation: "INITIATE_CHECKOUT",
        interaction: {
          operation: "PURCHASE",
          returnUrl: `https://caritasconnect.ddns.net/billtill/payment?payment=success&orderId=${orderId}`,
          merchant: {
            name: "BillTill",
            address: { line1: "Sri Lanka" }
          }
        },
        order: {
          id: orderId,
          amount: amount,
          currency: currency,
          description: `${req.body.businessName} - Business Registration`
        }
      },
      {
        auth: { username: creds.apiUsername, password: creds.apiPassword },
        headers: { "Content-Type": "application/json" }
      }
    );

    res.json({
      success: true,
      orderId: orderId,
      merchantId: creds.merchantId,
      currency: currency,
      session: { id: sessionResponse.data.session.id }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.response?.data || error.message
    });
  }
});

app.get("/api/verify-payment/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;
    // Look up which currency was used for this order, default to LKR
    const currency = orderCurrencyMap[orderId] || "LKR";
    const creds = getCredentials(currency);

    const response = await axios.get(
      `${creds.apiBaseUrl}/merchant/${creds.merchantId}/order/${orderId}`,
      { auth: { username: creds.apiUsername, password: creds.apiPassword } }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.response?.data || error.message
    });
  }
});

app.post("/api/send-invoice", upload.single("invoice"), async (req, res) => {
  try {
    const { email, businessName, invoiceId, orderId, confirmationCode, amount, plan } = req.body;
    const pdfBuffer = req.file?.buffer;
    const filename = req.file?.originalname || `BillTill_Invoice_${orderId}.pdf`;

    if (!pdfBuffer) {
      return res.status(400).json({ success: false, error: "No PDF attached" });
    }
    if (!email) {
      return res.status(400).json({ success: false, error: "Email is required" });
    }

    await sendInvoiceEmail({
      to: email,
      businessName,
      pdfBuffer,
      filename,
      invoiceId,
      orderId,
      confirmationCode,
      amount,
      plan,
    });

    res.json({ success: true, message: "Invoice sent successfully" });
  } catch (error) {
    console.error("Email send error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// START SERVER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
  console.log(`📍 Test endpoint: https://caritasconnect.ddns.net/api/test`);
});