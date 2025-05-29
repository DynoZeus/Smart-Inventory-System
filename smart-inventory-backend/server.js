const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const itemRoutes = require('./routes/itemRoutes');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for browser access
//app.use(cors());
app.use(cors({
    origin: 'http://localhost:3001' // your frontend port
  }));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

// Example home route
app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.send('Smart Inventory Backend is running');
});

// Item routes
app.use('/api/items', itemRoutes);

console.log('Starting server...');
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
