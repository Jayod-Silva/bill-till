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
  const { 
    plan = "N/A", 
    businessName = "N/A", 
    businessType = "N/A", 
    ownerName = "N/A", 
    email = "N/A", 
    phone = "N/A", 
    address = "N/A",
    billingCycle = "Monthly",
    currency = "LKR",
    amount = "0",
    orderId = "N/A",
    confirmationCode = "N/A"
  } = details;

  const mailOptions = {
    from: `"Bill-Till Notification" <${process.env.EMAIL_USER}>`,
    to: "dilharasilva05@gmail.com",
    subject: `🚀 New ${plan} Plan Subscription - ${businessName}`,
    html: getAdminNotificationEmailHtml({
      businessName,
      businessType,
      ownerName,
      phone,
      email,
      address,
      plan,
      billingCycle,
      currency,
      amount,
      orderId,
      confirmationCode
    }),
  };

  await transporter.sendMail(mailOptions);
}

/**
 * Sends a contact form submission to the admin.
 */
async function sendContactEmail({ name, email, phone, business, message }) {
  const mailOptions = {
    from: `"Bill-Till Contact" <${process.env.EMAIL_USER}>`,
    to: "dilharasilva05@gmail.com",
    replyTo: email,
    subject: `📩 New Contact Form Submission - ${name}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
      <p><strong>Business:</strong> ${business || "Not provided"}</p>
      <div style="margin-top: 20px; padding: 15px; border-left: 4px solid #0957D6; background: #f8fafc;">
        <strong>Message:</strong><br/>
        ${message.replace(/\n/g, "<br/>")}
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}

module.exports = { 
  sendInvoiceEmail, 
  sendWelcomeEmail, 
  sendAdminNotificationEmail,
  sendContactEmail 
};
