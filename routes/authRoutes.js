const express = require("express");
const router = express.Router();
const sendVerificationEmail = require ("../utils/emailService");

router.get("/test", async (req, res) => {
  const testEmail = "adeyermi@gmail.com"; 

  const token = "test123token";

  try {
    await sendVerificationEmail(testEmail, token);
    res.send("✅ Verification email sent successfully!");
  } catch (error) {
    console.error("❌ Error sending email:", error);
    res.status(500).send("❌ Failed to send email");
  }
});

module.exports = router;
