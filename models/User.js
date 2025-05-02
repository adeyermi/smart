const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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

  role: {
    type: String,
    enum: ['user', 'admin', 'manager', 'superuser'],
    default: 'user'
  },

  verified: {
    type: Boolean,
    default: false
  },

  wallets: {
    BTC: { type: String, default: null },
    ETH: { type: String, default: null },
    USDT: { type: String, default: null },
    SOL: { type: String, default: null },
    BCH: { type: String, default: null },
  }

}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
