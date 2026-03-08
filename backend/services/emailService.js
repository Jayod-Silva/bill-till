const nodemailer = require("nodemailer");
const { getInvoiceEmailHtml, getWelcomeEmailHtml, getAdminNotificationEmailHtml } = require("../templates/EmailTemplates.cjs");

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
  currency,
}) {
  const mailOptions = {
    from: `"Bill-Till" <${process.env.EMAIL_USER}>`,
    to,
    subject: `Your Bill-Till Invoice – ${invoiceId}`,
    html: getInvoiceEmailHtml({
      businessName,
      invoiceId,
      orderId,
      confirmationCode,
      plan,
      currency,
      amount,
    }),
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

/**
 * Sends a welcome congratulations email after registration.
 */
async function sendWelcomeEmail({ to, firstName, businessName }) {
  const mailOptions = {
    from: `"Bill-Till" <${process.env.EMAIL_USER}>`,
    to,
    subject: `Congratulations on Registering with Bill-Till! 🎉`,
    html: getWelcomeEmailHtml({ firstName, businessName }),
  };

  await transporter.sendMail(mailOptions);
}

/**
 * Sends a notification to the admin about a new premium purchase.
 */
async function sendAdminNotificationEmail(details) {
  const mailOptions = {
    from: `"Bill-Till Notification" <${process.env.EMAIL_USER}>`,
    to: "dilharasilva05@gmail.com",
    subject: `🚀 New ${details.plan} Plan Subscription - ${details.businessName}`,
    html: getAdminNotificationEmailHtml(details),
  };

  await transporter.sendMail(mailOptions);
}

module.exports = { sendInvoiceEmail, sendWelcomeEmail, sendAdminNotificationEmail };
