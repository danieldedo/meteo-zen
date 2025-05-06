// src/context/WeatherContext.jsx
import { createContext, useState, useEffect, useCallback } from 'react';
import { fetchWeatherByCity, fetchForecast } from '../services/weatherAPI';

export const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [city, setCity] = useState(() => {
    const savedCity = localStorage.getItem('lastCity');
    return savedCity || 'Cotonou';
  });


  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  
  const [recentSearches, setRecentSearches] = useState(() => {
    const saved = localStorage.getItem('recentSearches');
    return saved ? JSON.parse(saved) : [];
  });

  const fetchWeatherData = useCallback(async (cityName) => {
    setLoading(true);
    setError(null);
    try {
      const weatherData = await fetchWeatherByCity(cityName);
      setWeather(weatherData);
      
      // Une fois qu'on a la météo actuelle, récupérer les prévisions
      const forecastData = await fetchForecast(cityName);
      setForecast(forecastData);
      
      // Mettre à jour les recherches récentes
      setRecentSearches(prev => {
        const updated = [cityName, ...prev.filter(item => item !== cityName)].slice(0, 5);
        localStorage.setItem('recentSearches', JSON.stringify(updated));
        return updated;
      });
      
      // Sauvegarder la dernière ville recherchée
      localStorage.setItem('lastCity', cityName);
    } catch (err) {
      setError(err.message || 'Une erreur est survenue');
      console.error('Erreur météo:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Charger la météo pour la ville par défaut au montage
  useEffect(() => {
    fetchWeatherData(city);
  }, [city, fetchWeatherData]);

  const searchCity = (cityName) => {
    setCity(cityName);
  };

  return (
    <WeatherContext.Provider value={{
      city,
      weather,
      forecast,
      loading,
      error,
      recentSearches,
      searchCity,
      fetchWeatherData
    }}>
      {children}
    </WeatherContext.Provider>
  );
};