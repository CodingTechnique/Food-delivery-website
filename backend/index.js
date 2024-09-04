const express = require('express');
const cors = require('cors');
const mongodb = require('./Db');

const app = express();
const port = 5000;

// Middleware to handle CORS
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/api', require('./Routes/CreateUser'));
app.use('/api', require('./Routes/DisplayData'));
app.use('/api', require('./Routes/LoginUser'));
app.use('/api', require('./Routes/OrderData'));
// Test route
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Start the server only after MongoDB is connected and data is fetched
(async () => {
  try {
    await mongodb(); // Ensure MongoDB connection and data fetching
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
  }
})();
