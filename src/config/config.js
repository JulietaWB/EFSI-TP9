require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 3000,
  OPENWEATHER_API_KEY: process.env.OPENWEATHER_API_KEY,
  DEFAULT_CITY: process.env.DEFAULT_CITY || 'Buenos Aires',
  CACHE_DURATION: process.env.CACHE_DURATION || 600, // 10 minutes in seconds
};
