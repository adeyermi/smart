const express = require('express');
const { register, login } = require('../controllers/authController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.get('/verify-email', async (req, res) => {
    try {
      const { token } = req.query;
      const decoded = jwt.verify(token, process.env.JWT_EMAIL_SECRET);
      const user = await User.findById(decoded.userId);
  
      if (!user) return res.status(404).send('User not found');
      if (user.verified) return res.send('Email already verified');
  
      user.verified = true;
      await user.save();
  
      res.send('Email verified successfully 🎉');
    } catch (err) {
      res.status(400).send('Invalid or expired token');
    }
  });
  


module.exports = router;
