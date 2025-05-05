// controllers/withdrawController.js

const User = require('../models/User'); // Ensure this is correctly imported

const withdrawFunds = async (req, res) => {
  try {
    const user = await User.findById(req.user.id); // Make sure `req.user.id` is correct

    // If user is not found
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check for required profile fields
    if (!user.phone || !user.country || !user.dateOfBirth) {
      return res.status(400).json({
        message: "Please complete your profile (phone, country, date of birth) before making a withdrawal."
      });
    }

    // Continue with withdrawal logic...
    // Example: checking balance and processing the withdrawal
    // ...

    res.json({ message: "Withdrawal successful" });

  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { withdrawFunds };
