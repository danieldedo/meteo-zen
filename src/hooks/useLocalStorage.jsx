// src/hooks/useLocalStorage.jsx
import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
  // État pour stocker notre valeur
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      // Parse le JSON stocké ou retourne initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  // Retourne une fonction wrapped pour mettre à jour le localStorage
  const setValue = value => {
    try {
      // Si value est une fonction, on l'exécute avec la valeur précédente
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // Sauvegarde de l'état
      setStoredValue(valueToStore);
      // Sauvegarde dans localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  // Effet pour synchroniser la valeur si elle change dans un autre onglet/fenêtre
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key) {
        setStoredValue(JSON.parse(e.newValue));
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key]);

  return [storedValue, setValue];
}

export default useLocalStorage;