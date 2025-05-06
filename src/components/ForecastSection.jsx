// src/components/ForecastSection.jsx
import { useContext } from 'react';
import { WeatherContext } from '../context/WeatherContext';
import { ThemeContext } from '../context/ThemeContext';

const ForecastSection = () => {
  const { forecast, loading, error } = useContext(WeatherContext);
  const { darkMode } = useContext(ThemeContext);
  console.log("darkmode", darkMode)
  if (loading || error || !forecast) return null;

  return (
    <div className="mt-8">
      <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-4`}>Prévisions sur 5 jours</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {forecast.map((day, index) => (
          <div 
            key={index} 
            // className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 transition-transform hover:scale-105"
            className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-4 transition-transform hover:scale-105`}
            >
            <div className="text-center">
              {/* <h3 className="font-medium text-gray-800 dark:text-white capitalize"> */}
              <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'} capitalize`}>

                {index === 0 ? "Aujourd'hui" : day.day}
              </h3>
              {/* <p className="text-sm text-gray-500 dark:text-gray-400"> */}
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {new Date(day.date).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'short'
                })}
              </p>
            </div>
            
            <div className="flex justify-center my-2">
              <img 
                src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`} 
                alt={day.description}
                className="w-16 h-16" 
              />
            </div>
            
            <div className="text-center">
              {/* <p className="text-gray-600 dark:text-gray-300 text-sm capitalize">{day.description}</p> */}
              <p className={`text-sm capitalize ${ darkMode ? 'text-gray-300' : 'text-gray-600' }`}>{day.description}</p>
              <div className="flex justify-center items-center mt-2 space-x-2">
                {/* <span className="text-blue-600 dark:text-blue-400 font-medium"> */}
                <span className={`font-medium ${ darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                  {Math.round(day.temp_min)}°
                </span>
                {/* <span className="text-gray-400 dark:text-gray-500">|</span> */}
                <span className={`${ darkMode ? 'text-gray-500' : 'text-gray-400'}`}>|</span>
                {/* <span className="text-red-600 dark:text-red-400 font-medium"> */}
                <span className={`font-medium ${ darkMode ? 'text-red-400' : 'text-red-600'}`}>
                  {Math.round(day.temp_max)}°
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastSection;