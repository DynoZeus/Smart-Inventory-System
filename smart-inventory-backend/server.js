const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

//test route
app.get('/', (req, res) => {
    res.send('Smart Inventory Backend is running');
  });

//connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

console.log('Starting server...');
//start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});