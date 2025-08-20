const weatherService = require('../services/weatherService');
const config = require('../config/config');

const formatCurrentWeather = (data) => {
  console.log('Raw data for current weather:', data);
  if (!data || !data.main || !data.weather || !data.wind) {
    console.error('Invalid raw current weather data:', data);
    return null; // Or throw an error, depending on desired error handling
  }
  const formattedData = {
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
    time: new Date(data.dt * 1000).toLocaleString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false }),
  };
  console.log('Formatted current weather:', formattedData);
  return formattedData;
};

const formatHourlyForecast = (data) => {
  const hourlyData = data.list.filter((item, index) => index < 8); // Next 24 hours in 3-hour intervals
  return hourlyData.map(item => ({
    time: new Date(item.dt * 1000).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false }),
    temperature: item.main && item.main.temp !== undefined ? item.main.temp : null,
    weatherStatus: item.weather && item.weather[0] ? item.weather[0].description : 'N/A',
    icon: item.weather && item.weather[0] ? item.weather[0].icon : '01d',
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
    const forecastData = await weatherService.getHourlyForecast(city, units); // This now returns raw data object
    res.json(formatHourlyForecast(forecastData));
  } catch (error) {
    next(error);
  }
};

const getDailyForecast = async (req, res, next) => {
  try {
    const city = req.query.city || config.DEFAULT_CITY;
    const units = req.query.unit;
    const rawForecastData = await weatherService.getDailyForecast(city, units); // This now returns raw data object

    console.log('rawForecastData received in controller:', rawForecastData);

    if (!rawForecastData || !Array.isArray(rawForecastData.list)) {
      console.error('Invalid raw forecast data structure in controller:', rawForecastData);
      return res.status(500).json({ message: 'Error al obtener el pronóstico diario: estructura de datos inválida.' });
    }

    const dailyDataMap = new Map();

    rawForecastData.list.forEach(item => {
      if (!item.main || !item.weather || item.weather.length === 0) return; // Skip malformed items

      const date = new Date(item.dt * 1000);
      if (isNaN(date.getTime())) return;

      // Use a simple date string as key for grouping by day (YYYY-MM-DD)
      const dayKey = date.toISOString().split('T')[0];

      const temp = item.main.temp;
      const description = item.weather[0].description;
      const icon = item.weather[0].icon;

      if (!dailyDataMap.has(dayKey)) {
        dailyDataMap.set(dayKey, {
          date: date.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' }),
          minTemperature: temp,
          maxTemperature: temp,
          weatherStatus: description,
          icon: icon,
        });
      } else {
        const existingData = dailyDataMap.get(dayKey);
        existingData.minTemperature = Math.min(existingData.minTemperature, temp);
        existingData.maxTemperature = Math.max(existingData.maxTemperature, temp);
      }
    });

    // Convert Map values to array and slice for 5 days. Ensure we handle cases where fewer than 5 days are available.
    const formattedDays = Array.from(dailyDataMap.values());
    console.log('Sending formatted daily forecast to frontend:', formattedDays.slice(0, 5));
    res.json(formattedDays.slice(0, 5));
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
