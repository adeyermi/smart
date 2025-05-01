const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const authRoutes = require('./routes/auth');

const app = express();
app.use(cors());
app.use(express.json());

// Define Routes
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => res.send('SmartCoin API is Live!'));

module.exports = app;
