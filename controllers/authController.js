const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendVerificationEmail = require('../utils/emailService');

// REGISTER
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check required JWT secret
    if (!process.env.EMAIL_PASS) {
      return res.status(500).json({ error: "EMAIL_PASS is not defined" });
    }

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Prepare user object (do not save yet)
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: role || 'user'
    });

    // Generate email verification token
    const emailToken = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.EMAIL_PASS,
      { expiresIn: '1d' }
    );

    // Send verification email
    await sendVerificationEmail(user.email, emailToken);

    // Save user after sending email
    await user.save();

    res.status(201).json({
      message: 'Registration successful. Please check your email to verify your account.'
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    // Check JWT secret
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ error: "JWT_SECRET is not defined" });
    }

    // Sign token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      token,
      user: {
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
