const User = require('../models/User');
const {
  sendFundWalletNotification, // ✅ Use the correct function for fund wallet notification
  sendWithdrawalNotification  // ✅ Correct function for withdrawal notification
} = require('../utils/emailService'); // ✅ Ensure both functions are exported in emailService.js

// ✅ Get or create user's wallet
const getWallet = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) return res.status(404).json({ message: 'User not found' });

    if (!user.wallet) {
      user.wallet = { balance: 0 };
      await user.save();
    }

    res.status(200).json({ wallet: user.wallet });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Fund wallet
const fundWallet = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: 'Invalid amount' });
    }

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (!user.wallet) {
      user.wallet = { balance: 0 };
    }

    user.wallet.balance += amount;
    await user.save();

    // ✅ Use the correct notification function for wallet funding
    await sendFundWalletNotification(user.email, amount, 'USD');

    res.status(200).json({
      message: 'Wallet funded successfully',
      newBalance: user.wallet.balance
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Withdraw funds
const withdrawFunds = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: 'Invalid withdrawal amount' });
    }

    const user = await User.findById(req.user._id);
    if (!user || !user.wallet) {
      return res.status(404).json({ message: 'User or wallet not found' });
    }

    if (user.wallet.balance < amount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    user.wallet.balance -= amount;
    await user.save();

    // ✅ Use the correct notification function for withdrawals
    await sendWithdrawalNotification(user.email, amount, 'USD', 'destination-address'); // Pass the actual destination address here

    res.status(200).json({
      message: 'Withdrawal successful',
      newBalance: user.wallet.balance
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Export handlers properly as functions
module.exports = {
  getWallet,
  fundWallet,
  withdrawFunds
};
