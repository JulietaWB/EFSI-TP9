import React from 'react';
import { motion } from 'framer-motion';
import { useWeather } from '../context/WeatherContext';
import { getWeatherIcon, getTemperatureUnitSymbol } from '../utils/weatherIcons';

const LargeCityWeatherCard = ({ cityData, onCityClick }) => {
  const { unit } = useWeather();
  const unitSymbol = getTemperatureUnitSymbol(unit);

  if (!cityData) {
    return null; // Or a loading/error state
  }

  const WeatherIcon = getWeatherIcon(cityData.weatherStatus);

  return (
    <motion.li
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      className="flex justify-between items-center py-2 px-3 bg-white/5 rounded-xl cursor-pointer hover:bg-white/10 transition-colors duration-300 backdrop-blur-md shadow-sm"
      onClick={() => onCityClick(cityData.location)}
    >
      <div className="flex items-center">
        <WeatherIcon size={24} className="text-yellow-300 mr-2" />
        <div>
          <span className="font-medium">{cityData.location}</span>
          {cityData.country && <span className="text-xs text-gray-400 ml-1">({cityData.country})</span>}
          {cityData.weatherStatus && <p className="text-xs text-gray-400">{cityData.weatherStatus}</p>}
        </div>
      </div>
      <span className="text-lg font-semibold">{Math.round(cityData.temperature)}{unitSymbol}</span>
    </motion.li>
  );
};

export default LargeCityWeatherCard;
