import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useWeather } from '../context/WeatherContext';

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState('');
  const { setLastSearchedLocation } = useWeather();

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
      setLastSearchedLocation(city.trim());
      setCity(''); // Clear input after search
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center space-x-2 w-full">
      <div className="relative flex-grow">
        <input
          type="text"
          placeholder="Buscar ciudad..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full p-3 pl-10 rounded-2xl bg-white/10 dark:bg-white/5 text-white placeholder-gray-300 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400 backdrop-blur-md shadow-lg"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 dark:text-gray-500" size={20} />
      </div>
      <button
        type="submit"
        className="px-5 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl transition-colors duration-300 shadow-lg"
      >
        Buscar
      </button>
    </form>
  );
};

export default SearchBar;
