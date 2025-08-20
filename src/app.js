const express = require('express');
const config = require('./config/config');
const errorHandler = require('./middleware/errorHandler');
const weatherRoutes = require('./routes/weatherRoutes');
const cors = require('cors');

const app = express();

// CORS middleware
app.use(cors({ origin: 'http://localhost:5173' }));

// Middleware for parsing JSON bodies
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.send('Weather API is running!');
});

// Weather API routes
app.use('/weather', weatherRoutes);

// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
