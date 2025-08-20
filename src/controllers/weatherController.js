const weatherService = require('../services/weatherService');
const config = require('../config/config');

const formatCurrentWeather = (data) => {
  if (!data || !data.main || !data.weather || !data.wind) {
    return null; // Or throw an error, depending on desired error handling
  }
  return {
    location: data.name,
    country: data.sys.country,
    temperature: data.main.temp,
    feelsLike: data.main.feels_like,
    minTemperature: data.main.temp_min,
    maxTemperature: data.main.temp_max,
    windSpeed: data.wind.speed,
    humidity: data.main.humidity,
    weatherStatus: data.weather[0].description,
    icon: data.weather[0].icon,
    time: new Date(data.dt * 1000).toLocaleString(),
  };
};

const formatHourlyForecast = (data) => {
  return data.map(item => ({
    time: new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    temperature: item.main.temp,
    weatherStatus: item.weather[0].description,
    icon: item.weather[0].icon,
  }));
};

const formatDailyForecast = (data) => {
  return data.map(item => ({
    date: new Date(item.dt * 1000).toLocaleDateString(),
    minTemperature: item.main.temp_min,
    maxTemperature: item.main.temp_max,
    weatherStatus: item.weather[0].description,
    icon: item.weather[0].icon,
  }));
};

const getCurrentWeather = async (req, res, next) => {
  try {
    const city = req.query.city || config.DEFAULT_CITY;
    const units = req.query.unit;
    const weatherData = await weatherService.getCurrentWeather(city, units);
    res.json(formatCurrentWeather(weatherData));
  } catch (error) {
    next(error);
  }
};

const getHourlyForecast = async (req, res, next) => {
  try {
    const city = req.query.city || config.DEFAULT_CITY;
    const units = req.query.unit;
    const forecastData = await weatherService.getHourlyForecast(city, units);
    res.json(formatHourlyForecast(forecastData));
  } catch (error) {
    next(error);
  }
};

const getDailyForecast = async (req, res, next) => {
  try {
    const city = req.query.city || config.DEFAULT_CITY;
    const units = req.query.unit;
    const forecastData = await weatherService.getDailyForecast(city, units);
    res.json(formatDailyForecast(forecastData));
  } catch (error) {
    next(error);
  }
};

const getLargeCitiesSummary = async (req, res, next) => {
  try {
    const cities = ['New York', 'London', 'Tokyo'];
    const units = req.query.unit;
    const weatherPromises = cities.map(city => weatherService.getCurrentWeather(city, units));
    const results = await Promise.allSettled(weatherPromises);

    const formattedResults = results.map((result, index) => {
      if (result.status === 'fulfilled') {
        return formatCurrentWeather(result.value);
      } else {
        console.error(`Error fetching weather for ${cities[index]}:`, result.reason.message);
        return {
          location: cities[index],
          error: result.reason.message || 'Failed to fetch weather data',
        };
      }
    });
    res.json(formattedResults);
  } catch (error) {
    next(error);
  }
};

const searchCity = async (req, res, next) => {
  try {
    const city = req.query.city;
    if (!city) {
      const error = new Error('City name is required for search.');
      error.statusCode = 400;
      throw error;
    }
    const units = req.query.unit;
    const weatherData = await weatherService.getCurrentWeather(city, units);
    res.json(formatCurrentWeather(weatherData));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCurrentWeather,
  getHourlyForecast,
  getDailyForecast,
  getLargeCitiesSummary,
  searchCity,
};
