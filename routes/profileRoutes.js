const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { authenticate } = require('../middleware/authMiddleware');
const bcrypt = require('bcrypt');
const sendEmail = require('../utils/emailService');

// Get logged-in user's profile
router.get('/profile', authenticate, async (req, res) => {
  try {
    // Find the user and exclude the password field
    const user = await User.findById(req.user._id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Update user's profile
router.put('/profile', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Optional updates: only update if new value is provided
    user.fullName = req.body.fullName || user.fullName;
    user.phone = req.body.phone || user.phone;
    user.country = req.body.country || user.country;

    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update profile', error: err.message });
  }
});

// Change password
router.put('/change-password', authenticate, async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: 'Please provide both current and new passwords' });
  }

  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Compare current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Current password is incorrect' });

    // Hash and update password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();

    // Send email notification
    await sendEmail(
      user.email,
      'Your SmartCoin Password Was Changed',
      `
        <p>Hello ${user.fullName || user.name || 'User'},</p>
        <p>Your password was successfully changed on SmartCoin. If you did not perform this action, please contact support immediately.</p>
        <p>Regards,<br/>SmartCoin Team</p>
      `
    );

    res.json({ message: 'Password changed successfully and notification sent' });

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
