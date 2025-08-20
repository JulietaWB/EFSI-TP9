import React from 'react';
import { motion } from 'framer-motion';
import { useWeather } from '../context/WeatherContext';
import { getWeatherIcon, getTemperatureUnitSymbol } from '../utils/weatherIcons';

const CurrentWeatherCard = ({ weatherData }) => {
  const { unit } = useWeather();
  const unitSymbol = getTemperatureUnitSymbol(unit);

  if (!weatherData) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/10 dark:bg-white/5 rounded-2xl p-6 backdrop-blur-md shadow-lg flex items-center justify-center h-full"
      >
        <p className="text-lg text-gray-300">Cargando datos del clima o ciudad no encontrada.</p>
      </motion.div>
    );
  }

  const WeatherIcon = getWeatherIcon(weatherData.weatherStatus);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/10 dark:bg-white/5 rounded-2xl p-6 backdrop-blur-md shadow-lg flex flex-col md:flex-row items-center justify-between text-center md:text-left"
    >
      <div className="flex flex-col items-center md:items-start mb-4 md:mb-0">
        <h2 className="text-4xl font-bold">{weatherData.location}</h2>
        <p className="text-sm text-gray-300">{weatherData.time}</p>
        <div className="flex items-center mt-4">
          <WeatherIcon size={80} className="text-purple-300" />
          <p className="text-6xl font-bold ml-4">{Math.round(weatherData.temperature)}{unitSymbol}</p>
        </div>
        <p className="text-xl mt-2">{weatherData.weatherStatus}</p>
        <p className="text-md text-gray-300">Sensación térmica: {Math.round(weatherData.feelsLike)}{unitSymbol}</p>
      </div>

      <div className="md:text-right">
        <p className="text-lg">Viento: {weatherData.windSpeed} m/s</p>
        <p className="text-lg">Humedad: {weatherData.humidity}%</p>
        <p className="text-lg">Máx: {Math.round(weatherData.maxTemperature)}{unitSymbol}</p>
        <p className="text-lg">Mín: {Math.round(weatherData.minTemperature)}{unitSymbol}</p>
      </div>
    </motion.div>
  );
};

export default CurrentWeatherCard;
