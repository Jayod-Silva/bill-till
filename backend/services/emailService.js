const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "smtp.gmail.com",
  port: parseInt(process.env.EMAIL_PORT || "587"),
  secure: false, // TLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Sends the invoice PDF to the customer's email.
 * @param {string} to - Recipient email address
 * @param {string} businessName - Customer business name
 * @param {Buffer} pdfBuffer - PDF file buffer
 * @param {string} filename - File name for the attachment
 * @param {string} invoiceId - Invoice ID
 * @param {string} orderId - Payment/Order ID
 * @param {string} confirmationCode - Unique confirmation code
 * @param {string} amount - Amount paid
 * @param {string} plan - Selected plan name
 */
async function sendInvoiceEmail({
  to,
  businessName,
  pdfBuffer,
  filename,
  invoiceId,
  orderId,
  confirmationCode,
  amount,
  plan,
}) {
  const mailOptions = {
    from: `"Bill-Till" <${process.env.EMAIL_USER}>`,
    to,
    subject: `Your Bill-Till Invoice – ${invoiceId}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b;">
        <div style="background: linear-gradient(135deg, #3b82f6, #4f46e5); padding: 32px 24px; border-radius: 12px 12px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 800;">Bill-Till</h1>
          <p style="color: rgba(255,255,255,0.85); margin: 4px 0 0; font-size: 14px;">Smart Billing &amp; POS Solutions</p>
        </div>

        <div style="background: #ffffff; padding: 32px 24px; border: 1px solid #e2e8f0;">
          <h2 style="color: #1e293b; font-size: 20px; margin-bottom: 8px;">Payment Confirmed ✅</h2>
          <p style="color: #64748b; font-size: 14px; margin-bottom: 24px;">
            Dear <strong>${businessName}</strong>, thank you for subscribing to Bill-Till. Your payment has been received and your subscription is now active.
          </p>

          <div style="background: #f8fafc; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
            <table style="width: 100%; font-size: 13px; border-collapse: collapse;">
              <tr>
                <td style="padding: 6px 0; color: #64748b;">Invoice ID</td>
                <td style="padding: 6px 0; font-weight: 700; text-align: right;">${invoiceId}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b;">Payment ID</td>
                <td style="padding: 6px 0; font-weight: 700; text-align: right; font-family: monospace;">${orderId}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b;">Confirmation Code</td>
                <td style="padding: 6px 0; font-weight: 700; text-align: right; letter-spacing: 1px;">${confirmationCode}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b;">Plan</td>
                <td style="padding: 6px 0; font-weight: 700; text-align: right;">${plan} Plan</td>
              </tr>
              <tr style="border-top: 1px solid #e2e8f0;">
                <td style="padding: 10px 0 6px; color: #3b82f6; font-weight: 700;">Total Paid</td>
                <td style="padding: 10px 0 6px; font-weight: 800; text-align: right; color: #3b82f6; font-size: 16px;">LKR ${parseFloat(amount).toLocaleString()}</td>
              </tr>
            </table>
          </div>

          <p style="color: #64748b; font-size: 13px;">
            📎 We have attached a copy of your invoice to this email. You can also view or download it from the payment page.
          </p>
        </div>

        <div style="background: #f1f5f9; padding: 20px 24px; border-radius: 0 0 12px 12px; text-align: center;">
          <p style="color: #94a3b8; font-size: 12px; margin: 0;">
            © ${new Date().getFullYear()} Bill-Till Lanka (Pvt) Ltd · support@billtill.com<br/>
            This is an automated email. Please do not reply directly.
          </p>
        </div>
      </div>
    `,
    attachments: [
      {
        filename,
        content: pdfBuffer,
        contentType: "application/pdf",
      },
    ],
  };

  await transporter.sendMail(mailOptions);
}

module.exports = { sendInvoiceEmail };
