const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// --------------------------------------------------------
// TEST CREDENTIALS
// --------------------------------------------------------
const MERCHANT_ID = "TESTSEYLAN136";
const API_USERNAME = `merchant.${MERCHANT_ID}`;
const API_PASSWORD = "76ee326282cab9f69c9145d2aec85801";
const API_BASE_URL = "https://test-seylan.mtf.gateway.mastercard.com/api/rest/version/69";


// --------------------------------------------------------
// HEALTH CHECK
// --------------------------------------------------------
app.get('/api/test', (req, res) => {
  res.json({
    status: 'Server OK',
    timestamp: new Date().toISOString()
  });
});


// --------------------------------------------------------
// 1️⃣ CREATE CHECKOUT SESSION (UPDATED FOR API VERSION 67+)
// --------------------------------------------------------
app.post("/api/create-payment", async (req, res) => {
  try {
    console.log("📝 Starting payment flow...");
    console.log("📦 Form data:", req.body);

    const orderId = "ORDER_" + Date.now();
    const amount = req?.body?.amount;
    const currency = "LKR";

    // STEP 1: Create session with INITIATE_CHECKOUT (includes interaction config)
    console.log("📤 Creating checkout session with INITIATE_CHECKOUT...");
    const sessionResponse = await axios.post(
      `${API_BASE_URL}/merchant/${MERCHANT_ID}/session`,
      {
        apiOperation: "INITIATE_CHECKOUT",
        interaction: {
          operation: "PURCHASE",
          returnUrl: "http://localhost:5173", // Your React app URL
          merchant: {
            name: "BillTill",
            address: {
              line1: "Sri Lanka"
            }
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
        auth: {
          username: API_USERNAME,
          password: API_PASSWORD
        },
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    const sessionId = sessionResponse.data.session.id;
    console.log("✅ Session created successfully!");
    console.log("✅ Session ID:", sessionId);
    console.log("✅ Order ID:", orderId);

    res.json({
      success: true,
      orderId: orderId,
      session: {
        id: sessionId
      }
    });

  } catch (error) {
    console.error("❌ Error Details:");
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", JSON.stringify(error.response.data, null, 2));
    } else {
      console.error("Message:", error.message);
    }

    res.status(500).json({
      success: false,
      error: error.response?.data || error.message
    });
  }
});


// --------------------------------------------------------
// 2️⃣ VERIFY PAYMENT STATUS
// --------------------------------------------------------
app.get("/api/verify-payment/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;
    console.log("🔍 Verifying payment for:", orderId);

    const response = await axios.get(
      `${API_BASE_URL}/merchant/${MERCHANT_ID}/order/${orderId}`,
      {
        auth: {
          username: API_USERNAME,
          password: API_PASSWORD
        }
      }
    );

    console.log("✅ Payment status:", response.data);
    res.json(response.data);

  } catch (error) {
    console.error("❌ Verification error:", error.response?.data || error.message);
    res.status(500).json({
      success: false,
      error: error.response?.data || error.message
    });
  }
});


// --------------------------------------------------------
// START SERVER
// --------------------------------------------------------
app.listen(3000, () => {
  console.log("🚀 Backend running at http://localhost:3000");
  console.log("📍 Test endpoint: http://localhost:3000/api/test");
});