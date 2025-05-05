const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Reusable email HTML wrapper
const generateEmailTemplate = (subject, messageBody, ctaLink, ctaText) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>${subject} - SmartCoin</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9f9f9;">
      <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; margin: 40px auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
        <tr>
          <td style="background-color: #1a1a1a; padding: 20px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0;">SmartCoin</h1>
            <p style="color: #bbbbbb; margin: 0; font-size: 14px;">Your trusted crypto trading partner</p>
          </td>
        </tr>
        <tr>
          <td style="padding: 30px;">
            <h2 style="color: #111111; text-align: center;">${subject}</h2>
            <p style="font-size: 16px; color: #444444;">${messageBody}</p>
            ${
              ctaLink
                ? ` 
            <div style="text-align: center; margin: 30px 0;">
              <a href="${ctaLink}" style="background-color: #e60000; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
                ${ctaText}
              </a>
            </div>
            <p style="font-size: 14px; color: #555555;">
              If the button doesn’t work, copy and paste this URL into your browser:
            </p>
            <p style="font-size: 13px; color: #0073e6; word-break: break-word;">${ctaLink}</p>` : ""
            }
            <p style="font-size: 13px; color: #888888; margin-top: 30px;">
              If you did not initiate this request, please ignore this message.
            </p>
          </td>
        </tr>
        <tr>
          <td style="background-color: #f1f1f1; text-align: center; padding: 20px; font-size: 12px; color: #777;">
            &copy; 2025 SmartCoin. All rights reserved.<br />
            Need help? Contact support at <a href="mailto:support@smartcoin.com" style="color: #e60000; text-decoration: none;">support@smartcoin.com</a>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
};

// Verification Email
const sendVerificationEmail = async (to, token) => {
  const verificationLink = `https://yourdomain.com/verify-email?token=${token}`;
  const html = generateEmailTemplate(
    "Verify Your Email Address",
    "Please verify your email to activate your SmartCoin account.",
    verificationLink,
    "Verify Now"
  );

  await transporter.sendMail({
    from: `"SmartCoin" <${process.env.EMAIL_USER}>`,
    to,
    subject: "SmartCoin Email Verification",
    html,
  });
};

// Welcome Email After Successful Registration
const sendWelcomeEmail = async (to, fullName = "User") => {
  const html = generateEmailTemplate(
    "Welcome to SmartCoin 🎉",
    `Hi <strong>${fullName}</strong>,<br/><br/>
    We're excited to have you join SmartCoin! Start trading crypto easily and securely.<br/><br/>
    Don't forget to verify your email and complete your profile for a full experience.`,
    null,
    null
  );

  await transporter.sendMail({
    from: `"SmartCoin" <${process.env.EMAIL_USER}>`,
    to,
    subject: "🎉 Welcome to SmartCoin!",
    html,
  });
};

// Password Change Notification
const sendPasswordChangeEmail = async (to) => {
  const html = generateEmailTemplate(
    "Your Password Was Changed",
    "This is to notify you that your SmartCoin account password was recently changed. If this wasn't you, please reset your password immediately or contact support.",
    null,
    null
  );

  await transporter.sendMail({
    from: `"SmartCoin" <${process.env.EMAIL_USER}>`,
    to,
    subject: "SmartCoin Password Change Notification",
    html,
  });
};

// Withdrawal Notification
const sendWithdrawalNotification = async (to, amount, currency, destination) => {
  const html = generateEmailTemplate(
    "Withdrawal Alert",
    `You requested a withdrawal of <strong>${amount} ${currency}</strong> to address: <br/><code>${destination}</code>.<br/><br/>If this was not you, please contact support immediately.`,
    null,
    null
  );

  await transporter.sendMail({
    from: `"SmartCoin" <${process.env.EMAIL_USER}>`,
    to,
    subject: "SmartCoin Withdrawal Notification",
    html,
  });
};

// Fund Wallet Notification
const sendFundWalletNotification = async (to, amount, currency) => {
  const html = generateEmailTemplate(
    "Wallet Funded",
    `Your SmartCoin wallet has been successfully funded with <strong>${amount} ${currency}</strong>.<br/><br/>Your new wallet balance reflects this change. Thank you for using SmartCoin!`,
    null,
    null
  );

  await transporter.sendMail({
    from: `"SmartCoin" <${process.env.EMAIL_USER}>`,
    to,
    subject: "SmartCoin Wallet Funded",
    html,
  });
};

module.exports = {
  sendVerificationEmail,
  sendPasswordChangeEmail,
  sendWithdrawalNotification,
  sendWelcomeEmail,
  sendFundWalletNotification,
};
