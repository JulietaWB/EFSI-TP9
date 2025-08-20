require('dotenv').config();

const config = {
  PORT: process.env.PORT || 3000,
  OPENWEATHER_API_KEY: process.env.OPENWEATHER_API_KEY,
  DEFAULT_CITY: process.env.DEFAULT_CITY || 'Buenos Aires',
  CACHE_DURATION: process.env.CACHE_DURATION || 600, // 10 minutes in seconds
};

console.log('OpenWeather API Key Loaded:', config.OPENWEATHER_API_KEY ? 'YES' : 'NO');
// console.log('Loaded API Key:', config.OPENWEATHER_API_KEY); // Uncomment for debugging exact key (be careful with logs in production!)

module.exports = config;
