import React from 'react';
import { useWeather } from './context/WeatherContext';
import SearchBar from './components/SearchBar';
import CurrentWeatherCard from './components/CurrentWeatherCard';
import TemperatureUnitToggle from './components/TemperatureUnitToggle';
import HourlyForecastCard from './components/HourlyForecastCard';
import DailyForecastCard from './components/DailyForecastCard';
import LargeCityWeatherCard from './components/LargeCityWeatherCard';
import ThemeToggle from './components/ThemeToggle';
import BackgroundIllustration from './components/BackgroundIllustration';
import WeatherParticles from './components/WeatherParticles';
import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


function App() {
  const { isDarkMode, unit, lastSearchedLocation, setLastSearchedLocation } = useWeather();
  const [currentWeather, setCurrentWeather] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [dailyForecast, setDailyForecast] = useState([]);
  const [largeCitiesWeather, setLargeCitiesWeather] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_BASE_URL = 'http://localhost:3000/weather'; // Adjust if your backend runs on a different port

  const fetchWeatherData = useCallback(async (city) => {
    setLoading(true);
    setError(null);
    try {
      // Fetch current weather
      const currentResponse = await fetch(`${API_BASE_URL}/current?city=${city}&unit=${unit}`);
      if (!currentResponse.ok) {
        throw new Error('Ciudad no encontrada.');
      }
      const currentData = await currentResponse.json();
      setCurrentWeather(currentData);

      // Fetch hourly forecast
      const hourlyResponse = await fetch(`${API_BASE_URL}/hourly?city=${city}&unit=${unit}`);
      const hourlyData = await hourlyResponse.json();
      setHourlyForecast(hourlyData);

      // Fetch daily forecast
      const dailyResponse = await fetch(`${API_BASE_URL}/daily?city=${city}&unit=${unit}`);
      const dailyData = await dailyResponse.json();
      setDailyForecast(dailyData);

      // Fetch large cities summary (only once or on initial load, independent of current search)
      if (largeCitiesWeather.length === 0) {
        const citiesResponse = await fetch(`${API_BASE_URL}/cities?unit=${unit}`);
        const citiesData = await citiesResponse.json();
        setLargeCitiesWeather(citiesData);
      }

    } catch (err) {
      console.error('Error al obtener datos del clima:', err);
      setError(err.message || 'Error al cargar datos del clima.');
      setCurrentWeather(null);
      setHourlyForecast([]);
      setDailyForecast([]);
    } finally {
      setLoading(false);
    }
  }, [unit, largeCitiesWeather.length]);

  useEffect(() => {
    fetchWeatherData(lastSearchedLocation);
  }, [fetchWeatherData, lastSearchedLocation]);

  const handleSearch = (city) => {
    setLastSearchedLocation(city);
  };

  const handleLargeCityClick = (city) => {
    setLastSearchedLocation(city);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gradient-to-br from-indigo-900 to-purple-800 text-white' : 'bg-gradient-to-br from-blue-100 to-gray-100 text-gray-800'} flex flex-col items-center justify-center p-4 font-sans relative overflow-hidden`}>
      <ThemeToggle />
      <TemperatureUnitToggle />

      <BackgroundIllustration />
      {currentWeather && <WeatherParticles weatherStatus={currentWeather.weatherStatus} />}

      {/* Main Content Area */}
      <h1 className="text-4xl font-bold text-center mb-8">Aplicación del Clima</h1>
      
      <div className="mb-4">
        <SearchBar onSearch={handleSearch} />
      </div>

      {error && <p className="text-red-400 text-center mb-4">{error}</p>}
      {loading && <p className="text-center mb-4">Cargando...</p>}

      <AnimatePresence mode="wait">
        {!loading && currentWeather && (
          <motion.div
            key={currentWeather.location} // Key for re-animating on city change
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Current Weather */}
              <div className="md:col-span-2">
                <CurrentWeatherCard weatherData={currentWeather} />
              </div>

              {/* Other Large Cities */}
              <div className="md:col-span-1">
                <div className="bg-white/10 dark:bg-white/5 rounded-2xl p-4 backdrop-blur-md shadow-lg">
                  <h2 className="text-xl font-bold mb-4">Otras ciudades grandes</h2>
                  <ul>
                    {largeCitiesWeather.map((cityData, index) => (
                      <LargeCityWeatherCard key={index} cityData={cityData} onCityClick={handleLargeCityClick} />
                    ))}
                  </ul>
                </div>
              </div>

              {/* Hourly Forecast */}
              <div className="md:col-span-3 bg-white/10 dark:bg-white/5 rounded-2xl p-4 mt-4 backdrop-blur-md shadow-lg">
                <h2 className="text-xl font-bold mb-4">Pronóstico por hora (próximas 24h)</h2>
                <div className="flex overflow-x-auto space-x-4 pb-2">
                  {hourlyForecast.map((hourData, index) => (
                    <HourlyForecastCard key={index} hourData={hourData} />
                  ))}
                </div>
              </div>

              {/* 5-Day Forecast */}
              <div className="md:col-span-3 bg-white/10 dark:bg-white/5 rounded-2xl p-4 mt-4 backdrop-blur-md shadow-lg">
                <h2 className="text-xl font-bold mb-4">Pronóstico de 5 días</h2>
                <ul>
                  {dailyForecast.map((dayData, index) => (
                    <DailyForecastCard key={index} dayData={dayData} />
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
