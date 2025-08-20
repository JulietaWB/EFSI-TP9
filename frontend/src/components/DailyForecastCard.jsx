import React from 'react';
import { motion } from 'framer-motion';
import { useWeather } from '../context/WeatherContext';
import { getWeatherIcon, getTemperatureUnitSymbol } from '../utils/weatherIcons';

const DailyForecastCard = ({ dayData }) => {
  const { unit } = useWeather();
  const unitSymbol = getTemperatureUnitSymbol(unit);
  const WeatherIcon = getWeatherIcon(dayData.weatherStatus);

  // Calculate percentage for temperature range bar
  const minTemp = Math.round(dayData.minTemperature);
  const maxTemp = Math.round(dayData.maxTemperature);
  const tempRange = maxTemp - minTemp;
  // For simplicity, let's assume a fixed base range for the bar's full width, e.g., -10 to 40.
  // A more robust solution might dynamically determine this based on all displayed temperatures.
  const baseMin = -10; // Example global min temperature for bar scale
  const baseMax = 40;  // Example global max temperature for bar scale
  const totalRange = baseMax - baseMin;

  const minPos = ((minTemp - baseMin) / totalRange) * 100;
  const maxPos = ((maxTemp - baseMin) / totalRange) * 100;

  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-between py-3 border-b border-white/10 last:border-b-0"
    >
      <span className="flex-1 text-left font-medium">{dayData.date}</span>
      <div className="flex-1 flex items-center justify-center">
        <WeatherIcon size={30} className="text-green-300" />
        <span className="ml-2 text-sm text-gray-300">{dayData.weatherStatus}</span>
      </div>
      <span className="flex-1 text-right text-lg font-semibold">
        {minTemp}{unitSymbol} / {maxTemp}{unitSymbol}
      </span>
      <div className="flex-1 ml-4 h-2 bg-gray-600 rounded-full relative overflow-hidden">
        <div
          className="absolute h-full bg-gradient-to-r from-blue-400 to-red-400 rounded-full"
          style={{ left: `${minPos}%`, width: `${maxPos - minPos}%` }}
        ></div>
      </div>
    </motion.li>
  );
};

export default DailyForecastCard;
