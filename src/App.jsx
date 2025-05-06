
import { useContext } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { WeatherProvider } from './context/WeatherContext';
import { ThemeContext } from './context/ThemeContext';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import ForecastSection from './components/ForecastSection';
import ThemeToggle from './components/ThemeToggle';
import './App.css'

// Composant interne qui utilise le contexte
const WeatherApp = () => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-blue-50'}`}>
      <div className="container mx-auto px-4 py-8"> 
        <header className={`${darkMode ? 'bg-gray-900' : 'bg-blue-50'} sticky top-0 flex justify-between items-center z-50 mb-8`}>
          <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Météo App</h1>
          <ThemeToggle />
        </header>
        
        <SearchBar />
        
        <div className="mt-8">
          <WeatherCard />
          <ForecastSection />
        </div>
        
        <footer className={`mt-12 text-center text-gray-600 ${darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
          <p>Application météo créée avec React, Tailwind CSS et l'API OpenWeatherMap</p>
          <p className="mt-1">© {new Date().getFullYear()} - Tous droits réservés</p>
        </footer>
      </div>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
    <WeatherProvider>
      <WeatherApp />
    </WeatherProvider>
  </ThemeProvider>
  )
}

export default App
