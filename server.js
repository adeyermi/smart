const express = require ('express');
const dotenv = require ('dotenv');
const authRoutes = require("./routes/auth");
// const sendVerificationEmail = require ("./utils/emailService");
const connectDB = require('./config/db');
dotenv.config();
const app = express();
connectDB();
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Smartcoin API is running💰')
}
);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}✅`);
})