/**
 * Returns the HTML for the invoice email.
 */
const getInvoiceEmailHtml = ({
  businessName,
  invoiceId,
  orderId,
  confirmationCode,
  plan,
  currency,
  amount,
}) => {
  return `
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
              ${currency} ${parseFloat(amount).toLocaleString()}
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
        680A Colombo Road, Kattuwa, Negombo, Sri Lanka<br>
        support@billtill.com
      </p>
      <p style="font-size:11px; color:#cbd5f5; margin-top:6px;">
        This is an automated email. Please do not reply.
      </p>
    </div>

  </div>
</div>
    `;
};

/**
 * Returns the HTML for the welcome email.
 */
const getWelcomeEmailHtml = ({ firstName, businessName }) => {
  return `
      <div style="font-family: Arial, Helvetica, sans-serif; background:#f1f5f9; padding:40px 0;">
        <div style="max-width:600px; margin:0 auto; background:#ffffff; border-radius:12px; overflow:hidden; border:1px solid #e2e8f0;">

          <!-- Header -->
          <div style="padding:28px 24px; border-bottom:1px solid #e2e8f0;">
            <img src="https://billtill.co/colored-logo.png" alt="Bill-Till" style="height:50px;">
          </div>

          <!-- Title Section -->
          <div style="padding:32px 24px 10px 24px;">
            <h1 style="margin:0; font-size:32px; line-height:40px; color:#0f172a; font-weight:700;">
              Welcome to the Family! <span style="font-size:26px;">🎉</span>
            </h1>
          </div>

          <!-- Content -->
          <div style="padding:0 24px 32px 24px;">
            <p style="font-size:16px; color:#475569; margin:16px 0; line-height:1.6;">
              Hi <strong>${firstName}</strong>,
            </p>

            <p style="font-size:16px; color:#475569; margin:16px 0; line-height:1.6;">
              Congratulations on successfully registering <strong>${businessName}</strong> with Bill-Till! We're excited to help you streamline your business operations.
            </p>

            <div style="background:#eff6ff; border-left:4px solid #3b82f6; padding:20px; border-radius:8px; margin:24px 0;">
              <h3 style="margin:0 0 10px 0; font-size:18px; color:#1e40af;">Activation Required</h3>
              <p style="font-size:15px; color:#1e40af; margin:0; line-height:1.5;">
                To activate your POS system, you will need a <strong>unique confirmation code</strong>.
              </p>
              <p style="font-size:15px; color:#1e40af; margin:12px 0 0 0; line-height:1.5;">
                Please <strong>contact us directly</strong> to obtain your code, or wait for <strong>our partner to contact you</strong> shortly to assist with the setup.
              </p>
            </div>

            <p style="font-size:15px; color:#475569; margin:24px 0 0 0; line-height:1.6;">
              We're here to help you every step of the way. If you have any questions, feel free to reply to this email or visit our website.
            </p>
          </div>

          <!-- Footer -->
          <div style="background:#f8fafc; padding:20px 24px; text-align:center; border-top:1px solid #e2e8f0;">
            <p style="font-size:12px; color:#94a3b8; margin:0;">
              © ${new Date().getFullYear()} Bill-Till<br>
              680A Colombo Road, Kattuwa, Negombo, Sri Lanka<br>
              support@billtill.com
            </p>
          </div>

        </div>
      </div>
    `;
};

/**
 * Returns the HTML for the admin notification email.
 */
const getAdminNotificationEmailHtml = ({
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
  confirmationCode,
}) => {
  return `
      <div style="font-family: Arial, Helvetica, sans-serif; background:#f1f5f9; padding:40px 0;">
  <div style="max-width:600px; margin:0 auto; background:#ffffff; border-radius:12px; overflow:hidden; border:1px solid #e2e8f0;">
    
    <div style="padding:24px; border-bottom:1px solid #e2e8f0; background:#0f172a; color:#ffffff;">
      <h2 style="margin:0; font-size:20px;">New Premium Subscription! 🚀</h2>
    </div>

    <div style="padding:24px;">
      <p style="font-size:16px; color:#1e293b; margin-top:0;">
        A new customer has just purchased a <strong>${plan}</strong> plan.
      </p>

      <table style="width:100%; border-collapse:collapse; margin-top:20px; font-size:14px;">
        <tr>
          <td style="padding:10px; border-bottom:1px solid #f1f5f9; color:#64748b; width:140px;">Plan</td>
          <td style="padding:10px; border-bottom:1px solid #f1f5f9; color:#0f172a; font-weight:600;">${plan} (${billingCycle})</td>
        </tr>
        <tr>
          <td style="padding:10px; border-bottom:1px solid #f1f5f9; color:#64748b;">Amount Paid</td>
          <td style="padding:10px; border-bottom:1px solid #f1f5f9; color:#073C94; font-weight:700;">${currency} ${parseFloat(amount).toLocaleString()}</td>
        </tr>
        <tr>
          <td style="padding:10px; border-bottom:1px solid #f1f5f9; color:#64748b;">Order ID</td>
          <td style="padding:10px; border-bottom:1px solid #f1f5f9; color:#0f172a;">${orderId}</td>
        </tr>
        <tr>
          <td style="padding:10px; border-bottom:1px solid #f1f5f9; color:#64748b;">Confirmation Code</td>
          <td style="padding:10px; border-bottom:1px solid #f1f5f9; color:#0f172a; font-family:monospace; font-weight:600;">${confirmationCode}</td>
        </tr>
        <tr>
          <td style="padding:20px 0 10px 0; font-weight:bold; color:#0f172a;" colspan="2">Customer Details</td>
        </tr>
        <tr>
          <td style="padding:10px; border-bottom:1px solid #f1f5f9; color:#64748b;">Business Name</td>
          <td style="padding:10px; border-bottom:1px solid #f1f5f9; color:#0f172a;">${businessName}</td>
        </tr>
        <tr>
          <td style="padding:10px; border-bottom:1px solid #f1f5f9; color:#64748b;">Business Type</td>
          <td style="padding:10px; border-bottom:1px solid #f1f5f9; color:#0f172a;">${businessType}</td>
        </tr>
        <tr>
          <td style="padding:10px; border-bottom:1px solid #f1f5f9; color:#64748b;">Owner Name</td>
          <td style="padding:10px; border-bottom:1px solid #f1f5f9; color:#0f172a;">${ownerName}</td>
        </tr>
        <tr>
          <td style="padding:10px; border-bottom:1px solid #f1f5f9; color:#64748b;">Email</td>
          <td style="padding:10px; border-bottom:1px solid #f1f5f9; color:#0f172a;">${email}</td>
        </tr>
        <tr>
          <td style="padding:10px; border-bottom:1px solid #f1f5f9; color:#64748b;">Phone</td>
          <td style="padding:10px; border-bottom:1px solid #f1f5f9; color:#0f172a;">${phone}</td>
        </tr>
        <tr>
          <td style="padding:10px; border-bottom:1px solid #f1f5f9; color:#64748b;">Address</td>
          <td style="padding:10px; border-bottom:1px solid #f1f5f9; color:#0f172a;">${address}</td>
        </tr>
      </table>
    </div>

    <div style="background:#f8fafc; padding:20px; text-align:center; border-top:1px solid #e2e8f0;">
      <p style="font-size:12px; color:#94a3b8; margin:0;">Bill-Till Admin Notification System</p>
    </div>
  </div>
</div>
    `;
};

module.exports = {
  getInvoiceEmailHtml,
  getWelcomeEmailHtml,
  getAdminNotificationEmailHtml,
};
