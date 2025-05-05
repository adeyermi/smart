const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendVerificationEmail, sendWelcomeEmail } = require('../utils/emailService');
const generateBitcoinWallet = require('../utils/bitcoinWallet');
const generateEthWallet = require('../utils/ethWallet');
const generateTrc20Wallet = require('../utils/trc20Wallets');
const generateSolWallet = require('../utils/solWallet');

// REGISTER
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!process.env.EMAIL_PASS) {
      return res.status(500).json({ error: "EMAIL_PASS is not defined" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Generate wallets
    const bitcoinWallet = generateBitcoinWallet();
    const ethWallet = generateEthWallet();
    const trc20Wallet = generateTrc20Wallet();
    const solWallet = generateSolWallet();

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: role || 'user',
      wallets: {
        bitcoin: bitcoinWallet,
        ethereum: ethWallet,
        usdt_trc20: trc20Wallet,
        solana: solWallet
      }
    });

    const emailToken = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.EMAIL_PASS,
      { expiresIn: '1d' }
    );

    await sendVerificationEmail(user.email, emailToken);
    await user.save();

    // Send welcome email after successful registration
    await sendWelcomeEmail(user.email, user.name);

    res.status(201).json({
      message: 'Registration successful. Please check your email to verify your account.',
      wallets: user.wallets
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ error: "JWT_SECRET is not defined" });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE USER
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
