import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useWeather } from '../context/WeatherContext';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useWeather();

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      className="p-2 rounded-full bg-white/10 dark:bg-white/5 backdrop-blur-md shadow-lg text-white absolute top-4 left-4 z-50"
    >
      {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
    </motion.button>
  );
};

export default ThemeToggle;
