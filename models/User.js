// models/User.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // Basic Info
  name: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },

  password: {
    type: String,
    required: true
  },

  // Role System
  role: {
    type: String,
    enum: ['user', 'admin', 'manager', 'superuser'],
    default: 'user'
  },

  verified: {
    type: Boolean,
    default: false
  },

  // Profile Info (optional at signup, required for withdrawals)
  phone: {
    type: String,
    default: null
  },
  country: {
    type: String,
    default: null
  },
  dateOfBirth: {
    type: Date,
    default: null
  },
  avatar: {
    type: String,
    default: null // e.g., URL of uploaded profile photo
  },
  kycVerified: {
    type: Boolean,
    default: false
  },

  // Wallets
  wallets: {
    BTC: { type: String, default: null },
    ETH: { type: String, default: null },
    USDT: { type: String, default: null },
    SOL: { type: String, default: null },
    BCH: { type: String, default: null }
  }

}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
