app.post("/api/create-payment", async (req, res) => {
  try {
    console.log("📝 Requesting MPGS Session...");

    const orderId = "ORDER_" + Date.now();
    const amount = "4599.00";
    const currency = "LKR";

    const payload = {
      apiOperation: "INITIATE_CHECKOUT",
      interaction: {
        operation: "PURCHASE",
        returnUrl: "http://localhost:5173",
        merchant: {
          name: "BillTill"
        }
      },
      order: {
        id: orderId,
        amount: amount,
        currency: currency
      }
    };

    const session = await axios.post(
      `${API_BASE_URL}/merchant/${MERCHANT_ID}/session`,
      payload,
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

    console.log("✅ Session Created:", session.data);

    res.json({
      success: true,
      orderId,
      sessionId: session.data.session.id
    });

  } catch (error) {
    console.error("❌ Session Error:", error.response?.data || error);
    return res.status(500).json({
      success: false,
      error: error.response?.data || error.message
    });
  }
});
