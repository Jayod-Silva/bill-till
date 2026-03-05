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
      <div style="font-family: Arial, Helvetica, sans-serif; background:#f1f5f9; padding:40px 0;">
  <div style="max-width:600px; margin:0 auto; background:#ffffff; border-radius:12px; overflow:hidden; border:1px solid #e2e8f0;">

    <!-- Header -->
    <div style="padding:28px 24px; border-bottom:1px solid #e2e8f0;">
      <img src="https://billtill.co/colored-logo.png" alt="Bill-Till" style="height:50px;">
    </div>

    <!-- Title Section -->
    <div style="padding:32px 24px 10px 24px;">
      <h1 style="margin:0; font-size:40px; line-height:40px; color:#0f172a; font-weight:700;">
        Payment <br /> Confirmation <span style="font-size:26px;">✅</span>
      </h1>
    </div>

    <!-- Intro -->
    <div style="padding:0 24px 24px 24px;">
      <p style="font-size:15px; color:#475569; margin:12px 0;">
        Hi <strong>${businessName}</strong>,
      </p>

      <p style="font-size:15px; color:#475569; margin:0;">
        Thank you for subscribing to <strong>Bill-Till</strong>. Your payment has been successfully received and your subscription is now active.
      </p>
    </div>

    <!-- Summary Card -->
    <div style="padding:0 24px 28px 24px;">
      <div style="background:#f8fafc; border-radius:10px; padding:22px; border:1px solid #e2e8f0;">

        <h3 style="margin:0 0 16px 0; font-size:18px; color:#0f172a;">
          Payment Summary
        </h3>

        <table style="width:100%; border-collapse:collapse; font-size:14px;">

          <tr>
            <td style="padding:8px 0; color:#64748b;">Invoice ID</td>
            <td style="padding:8px 0; text-align:right; font-weight:600; color:#0f172a;">
              ${invoiceId}
            </td>
          </tr>

          <tr>
            <td style="padding:8px 0; color:#64748b;">Payment ID</td>
            <td style="padding:8px 0; text-align:right; font-family:monospace; font-weight:600; color:#0f172a;">
              ${orderId}
            </td>
          </tr>

          <tr>
            <td style="padding:8px 0; color:#64748b;">Confirmation Code</td>
            <td style="padding:8px 0; text-align:right; font-weight:600; letter-spacing:1px;">
              ${confirmationCode}
            </td>
          </tr>

          <tr>
            <td style="padding:8px 0; color:#64748b;">Subscription Plan</td>
            <td style="padding:8px 0; text-align:right; font-weight:600;">
              ${plan} Plan
            </td>
          </tr>

          <tr style="border-top:1px solid #e2e8f0;">
            <td style="padding:14px 0 6px 0; font-weight:700; color:#0f172a;">
              Total Paid
            </td>
            <td style="padding:14px 0 6px 0; text-align:right; font-size:18px; font-weight:700; color:#073C94;">
              LKR ${parseFloat(amount).toLocaleString()}
            </td>
          </tr>

        </table>

      </div>
    </div>

    <!-- Info -->
    <div style="padding:0 24px 28px 24px;">
      <p style="font-size:13px; color:#64748b; margin:0;">
        📎 A copy of your invoice has been attached to this email.  
        You can also download it anytime from your Bill-Till dashboard.
      </p>
    </div>

    <!-- Footer -->
    <div style="background:#f8fafc; padding:20px 24px; text-align:center; border-top:1px solid #e2e8f0;">
      <p style="font-size:12px; color:#94a3b8; margin:0;">
        © ${new Date().getFullYear()} Bill-Till<br>
        support@billtill.com
      </p>
      <p style="font-size:11px; color:#cbd5f5; margin-top:6px;">
        This is an automated email. Please do not reply.
      </p>
    </div>

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
