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
// EXISTING PAYMENT LOGIC (RETAINED)
// --------------------------------------------------------
const MERCHANT_ID = process.env.MERCHANT_ID || "MPGS00000348";
const API_PASSWORD = process.env.API_PASSWORD || "078809c1ac7c0359ef5e1a13ff9728a5";
const API_USERNAME = `merchant.${MERCHANT_ID}`;
const API_BASE_URL = process.env.API_BASE_URL || "https://seylan.gateway.mastercard.com/api/rest/version/69";

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
    const currency = "LKR";

    const sessionResponse = await axios.post(
      `${API_BASE_URL}/merchant/${MERCHANT_ID}/session`,
      {
        apiOperation: "INITIATE_CHECKOUT",
        interaction: {
          operation: "PURCHASE",
          returnUrl: `http://localhost:5173/payment?payment=success&orderId=${orderId}`,
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
        auth: { username: API_USERNAME, password: API_PASSWORD },
        headers: { "Content-Type": "application/json" }
      }
    );

    res.json({
      success: true,
      orderId: orderId,
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
    const response = await axios.get(
      `${API_BASE_URL}/merchant/${MERCHANT_ID}/order/${orderId}`,
      { auth: { username: API_USERNAME, password: API_PASSWORD } }
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
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
  console.log(`📍 Test endpoint: http://localhost:${PORT}/api/test`);
});