import React from 'react';
import { motion } from 'framer-motion';
import { useWeather } from '../context/WeatherContext';
import { getWeatherIcon, getTemperatureUnitSymbol } from '../utils/weatherIcons';

const HourlyForecastCard = ({ hourData }) => {
  const { unit } = useWeather();
  const unitSymbol = getTemperatureUnitSymbol(unit);
  const WeatherIcon = getWeatherIcon(hourData.weatherStatus);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex-shrink-0 w-32 bg-white/10 dark:bg-white/5 rounded-xl p-3 text-center backdrop-blur-md shadow-lg hover:bg-white/20 dark:hover:bg-white/10 transition-colors duration-300"
    >
      <p className="text-sm text-gray-300">{hourData.time}</p>
      <div className="my-2">
        <WeatherIcon size={40} className="mx-auto text-blue-300" />
      </div>
      <p className="text-xl font-semibold">{Math.round(hourData.temperature)}{unitSymbol}</p>
      <p className="text-xs text-gray-400 mt-1">{hourData.weatherStatus}</p>
    </motion.div>
  );
};

export default HourlyForecastCard;
