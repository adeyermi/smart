const express = require('express');
const router = express.Router();

const { authenticate } = require('../middleware/authMiddleware');
const { checkProfileComplete } = require('../middleware/profileMiddleware');
const walletController = require('../controllers/walletController');



// Route to get wallet details
router.get('/', authenticate, walletController.getWallet);

// Route to fund wallet
router.post('/fund', authenticate, walletController.fundWallet);

// Route to withdraw funds (requires authentication and profile completion)
router.post('/withdraw', authenticate, checkProfileComplete, walletController.withdrawFunds);

module.exports = router;
