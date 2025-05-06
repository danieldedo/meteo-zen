// src/context/ThemeContext.jsx
import { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    // Récupérer le thème depuis localStorage
    const savedTheme = localStorage.getItem('darkMode');
    // Vérifier également les préférences système
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    console.log("prefersDark", prefersDark)
    return savedTheme !== null ? JSON.parse(savedTheme) : prefersDark;
  });

  useEffect(() => {
    // Sauvegarder le choix de thème dans localStorage

    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    
    // Appliquer la classe 'dark' au document
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};