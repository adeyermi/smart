const express = require('express');
const router = express.Router();

const generateBitcoinWallet = require('../utils/bitcoinWallet');
const generateEthWallet = require('../utils/ethWallet');
const generateTrc20Wallet = require('../utils/trc20Wallets');
const generateSolWallet = require('../utils/solWallet');

router.get('/generate-wallets', async (req, res) => {
  try {
    const [btc, eth, trc20, sol] = await Promise.all([
      generateBitcoinWallet(),
      generateEthWallet(),
      generateTrc20Wallet(),
      generateSolWallet()
    ]);

    res.json({
      bitcoin: btc,
      ethereum: eth,
      usdt_trc20: trc20,
      solana: sol
    });
  } catch (err) {
    console.error('Wallet generation error:', err);
    res.status(500).json({ error: 'Error generating wallets' });
  }
});

module.exports = router;
