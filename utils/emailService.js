const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendVerificationEmail = async (to, token) => {
    const verificationLink = `https://yourdomain.com/verify-email?token=${token}`;
  
    const htmlTemplate = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Verify Your Email - SmartCoin</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9f9f9;">
        <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; margin: 40px auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
          <!-- Header -->
          <tr>
             <td style="background-color: #1a1a1a; padding: 20px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0;">SmartCoin</h1>
        <p style="color: #bbbbbb; margin: 0; font-size: 14px;">Your trusted crypto trading partner</p>
      </td>
          </tr>
  
          <!-- Body -->
          <tr>
            <td style="padding: 30px;">
              <h2 style="color: #111111; text-align: center;">Verify Your Email Address</h2>
              <p style="font-size: 16px; color: #444444;">
                Hello,
                <br/><br/>
                Please verify your email to activate your SmartCoin account. This helps us keep your account secure.
              </p>
  
              <div style="text-align: center; margin: 30px 0;">
                <a href="${verificationLink}" style="background-color: #e60000; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
                  Verify Now
                </a>
              </div>
  
              <p style="font-size: 14px; color: #555555;">
                If the button doesn’t work, copy and paste this URL into your browser:
              </p>
              <p style="font-size: 13px; color: #0073e6; word-break: break-word;">${verificationLink}</p>
  
              <p style="font-size: 13px; color: #888888; margin-top: 30px;">
                This link expires in 30 minutes. If you did not sign up for SmartCoin, please ignore this message.
              </p>
            </td>
          </tr>
  
          <!-- Footer -->
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
  
    const mailOptions = {
      from: `"SmartCoin" <${process.env.GMAIL_USER}>`,
      to,
      subject: "SmartCoin Email Verification",
      html: htmlTemplate,
    };
  
    await transporter.sendMail(mailOptions);
  };
  
  

module.exports = sendVerificationEmail;
