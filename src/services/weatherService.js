const axios = require('axios');
const NodeCache = require('node-cache');
const config = require('../config/config');

const weatherCache = new NodeCache({ stdTTL: config.CACHE_DURATION });

const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const API_KEY = config.OPENWEATHER_API_KEY;

const getWeatherData = async (endpoint, city, units = 'metric') => {
  const cacheKey = `${endpoint}-${city}-${units}`;
  let data = weatherCache.get(cacheKey);

  if (data) {
    console.log(`Cache hit for ${cacheKey}`);
    return data;
  }

  try {
    const url = `${BASE_URL}/${endpoint}?q=${city}&units=${units}&appid=${API_KEY}`;
    const response = await axios.get(url);
    data = response.data;
    weatherCache.set(cacheKey, data);
    console.log(`Cache miss, data fetched and cached for ${cacheKey}`);
    return data;
  } catch (error) {
    console.error(`Error fetching weather data for ${city}:`, error.message);
    if (error.response) {
      if (error.response.status === 404) {
        const notFoundError = new Error('City not found.');
        notFoundError.statusCode = 404;
        throw notFoundError;
      } else {
        const apiError = new Error('OpenWeatherMap API error.');
        apiError.statusCode = error.response.status;
        throw apiError;
      }
    } else {
      throw new Error('Network error or unexpected issue.');
    }
  }
};

const getCurrentWeather = async (city, units) => {
  return getWeatherData('weather', city, units);
};

const getHourlyForecast = async (city, units) => {
  const data = await getWeatherData('forecast', city, units);
  // Filter for next 24 hours in 3-hour intervals
  const hourlyData = data.list.filter((item, index) => index < 8);
  return hourlyData;
};

const getDailyForecast = async (city, units) => {
  const data = await getWeatherData('forecast', city, units);
  // Filter for next 5 days (skipping current day if applicable) at noon (or similar consistent time)
  const dailyData = data.list.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 5);
  return dailyData;
};

module.exports = {
  getCurrentWeather,
  getHourlyForecast,
  getDailyForecast,
};
