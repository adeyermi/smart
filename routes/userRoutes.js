const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { authenticate } = require('../middleware/authMiddleware');
const { checkProfileComplete } = require('../middleware/profileMiddleware');

const router = express.Router();

// Verification route
router.get('/verify-email', async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).send('Verification token is missing');
    }

    const decoded = jwt.verify(token, process.env.JWT_EMAIL_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).send('User not found');
    }

    if (user.verified) {
      return res.send('Email already verified');
    }

    user.verified = true;
    await user.save();

    res.send('Email verified successfully 🎉');
  } catch (err) {
    res.status(400).send('Invalid or expired token');
  }
});

// Profile route
router.get('/me', authenticate, (req, res) => {
  res.status(200).json({
    name: req.user.name,
    email: req.user.email,
    role: req.user.role,
  });
});

module.exports = router;
