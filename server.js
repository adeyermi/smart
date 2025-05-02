const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require("./routes/auth");
const connectDB = require('./config/db');

dotenv.config();

const app = express(); // FIXED: use 'app' instead of 'myapp'

connectDB();

app.use(express.json());

// Route
app.use('/api/auth', authRoutes); // Make sure you use this
app.use('/api/auth', require('./routes/auth'));

// app.get('/', (req, res) => {
//     res.send('Smartcoin API is running 💰');
// });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} ✅`);
});

console.log('JWT_SECRET:', process.env.JWT_SECRET);