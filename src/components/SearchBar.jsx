// src/components/SearchBar.jsx
import { useState, useContext, useRef, useEffect } from 'react';
import { WeatherContext } from '../context/WeatherContext';
import { ThemeContext } from '../context/ThemeContext';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const { darkMode } = useContext(ThemeContext);

  const { searchCity, recentSearches, loading } = useContext(WeatherContext);
  const [showRecent, setShowRecent] = useState(false);
  const recentSearchesRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      searchCity(query.trim());
      setQuery('');
      setShowRecent(false);
    }
  };

  const handleRecentSearch = (city) => {
    searchCity(city);
    setShowRecent(false);
  };

  // Fermer la liste des recherches récentes si l'utilisateur clique ailleurs
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (recentSearchesRef.current && !recentSearchesRef.current.contains(event.target)) {
        setShowRecent(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full max-w-md mx-auto relative" ref={recentSearchesRef}>
      <form onSubmit={handleSubmit} className="flex items-center">
        <div className="relative flex-1">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => recentSearches.length > 0 && setShowRecent(true)}
            placeholder="Rechercher une ville..."
            // className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-l-lg 
            className={`w-full px-4 py-2 border ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-300 bg-white'}
              rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 
              ${darkMode ? 'text-white' : 'text-gray-800'}`}
              disabled={false}
          />
          
          {showRecent && recentSearches.length > 0 && (
            // <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg z-10">
            <div
              className={`absolute top-full left-0 right-0 mt-1 bg-white border
                ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} 
              rounded-lg shadow-lg z-10`} 
            >               
              <ul>
                {recentSearches.map((city, index) => (
                  <li key={index}>
                    <button
                      type="button"
                      onClick={() => handleRecentSearch(city)}
                      className={`w-full text-left px-4 py-2 
                        ${ darkMode ? 'bg-gray-700 hover:bg-gray-500 text-white' : 'hover:bg-gray-100 text-gray-800' } 
                      `}
                    >
                      {city}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className={`px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 
                    ${ darkMode ? 'disabled:bg-blue-800' : 'disabled:bg-blue-300' } 
                   transition-colors duration-200`}
        >
          {loading ? (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          )}
        </button>
      </form>
    </div>
  );
};

export default SearchBar;