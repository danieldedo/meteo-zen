
// src/services/weatherAPI.js
import axios from 'axios';


const API_KEY = '9ab5f004008653594255e67c35618108'; 


const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Fonction pour récupérer la météo actuelle d'une ville
export const fetchWeatherByCity = async (city) => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        units: 'metric',
        lang: 'fr',
        appid: API_KEY
      }
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error('Ville non trouvée. Vérifiez le nom et réessayez.');
    }
    throw new Error('Impossible de récupérer les données météo. Veuillez réessayer plus tard.');
  }
};

// Fonction pour récupérer les prévisions sur 5 jours
export const fetchForecast = async (city) => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        q: city,
        units: 'metric',
        lang: 'fr',
        appid: API_KEY
      }
    });
    
    // Organisation des données par jour (en ignorant les heures)
    const forecastByDay = {};
    
    response.data.list.forEach(item => {
      const date = new Date(item.dt * 1000).toISOString().split('T')[0];
      
      if (!forecastByDay[date]) {
        forecastByDay[date] = {
          date,
          day: new Date(date).toLocaleDateString('fr-FR', { weekday: 'long' }),
          temps: [],
          temp_min: item.main.temp_min,
          temp_max: item.main.temp_max,
          icon: item.weather[0].icon,
          description: item.weather[0].description
        };
      }
      
      // Mise à jour des températures min/max
      forecastByDay[date].temp_min = Math.min(forecastByDay[date].temp_min, item.main.temp_min);
      forecastByDay[date].temp_max = Math.max(forecastByDay[date].temp_max, item.main.temp_max);
      
      // Ajout des données de temps pour cette période
      forecastByDay[date].temps.push({
        time: new Date(item.dt * 1000).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        temp: item.main.temp,
        icon: item.weather[0].icon,
        description: item.weather[0].description,
        wind: item.wind.speed
      });
    });
    
    // Conversion en tableau et limitation à 5 jours
    return Object.values(forecastByDay).slice(0, 5);
  } catch (error) {
    console.error('Erreur forecast:', error);
    throw new Error('Impossible de récupérer les prévisions météo.');
  }
};

