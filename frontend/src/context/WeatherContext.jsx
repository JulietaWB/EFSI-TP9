import React, { createContext, useState, useContext, useEffect } from 'react';

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [unit, setUnit] = useState(() => {
    const savedUnit = localStorage.getItem('weatherUnit');
    return savedUnit || 'metric';
  });
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? JSON.parse(savedTheme) : true; // Default to dark mode
  });
  const [lastSearchedLocation, setLastSearchedLocation] = useState(() => {
    const savedLocation = localStorage.getItem('lastSearchedLocation');
    return savedLocation || 'Buenos Aires';
  });

  useEffect(() => {
    localStorage.setItem('weatherUnit', unit);
  }, [unit]);

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem('lastSearchedLocation', lastSearchedLocation);
  }, [lastSearchedLocation]);

  const toggleUnit = () => {
    setUnit(prevUnit => (prevUnit === 'metric' ? 'imperial' : 'metric'));
  };

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <WeatherContext.Provider
      value={{
        unit,
        toggleUnit,
        isDarkMode,
        toggleTheme,
        lastSearchedLocation,
        setLastSearchedLocation,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  return useContext(WeatherContext);
};
