import React from 'react';
import { motion } from 'framer-motion';
import { useWeather } from '../context/WeatherContext';

const TemperatureUnitToggle = () => {
  const { unit, toggleUnit } = useWeather();

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="absolute top-4 right-4 bg-white/10 dark:bg-white/5 rounded-full p-1 backdrop-blur-md shadow-lg flex items-center cursor-pointer z-50"
      onClick={toggleUnit}
    >
      <span className={`px-3 py-1 rounded-full text-sm font-semibold transition-colors duration-300 ${unit === 'metric' ? 'bg-purple-600 text-white' : 'text-gray-300'}`}>
        °C
      </span>
      <span className={`px-3 py-1 rounded-full text-sm font-semibold transition-colors duration-300 ${unit === 'imperial' ? 'bg-purple-600 text-white' : 'text-gray-300'}`}>
        °F
      </span>
    </motion.div>
  );
};

export default TemperatureUnitToggle;
