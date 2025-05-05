const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require("./routes/authRoutes");
const connectDB = require('./config/db');
const walletRoutes = require('./routes/walletRoutes');
const profileRoutes = require('./routes/profileRoutes');
const adminRoutes = require('./routes/adminRoutes')
const userRoutes = require('./routes/userRoutes');
dotenv.config();

const app = express(); // FIXED: use 'app' instead of 'myapp'

connectDB();

app.use(express.json());

// Route
app.use('/api/auth', authRoutes); // Make sure you use this
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/wallet', walletRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} ✅`);
});