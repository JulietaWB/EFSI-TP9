const express = require('express');
const config = require('./config/config');
const errorHandler = require('./middleware/errorHandler');
const weatherRoutes = require('./routes/weatherRoutes');

const app = express();

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
