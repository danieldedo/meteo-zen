// src/components/ErrorDisplay.jsx
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';


const ErrorDisplay = ({ message }) => {
  const { darkMode } = useContext(ThemeContext);
  return (
    <div
      className={`bg-red-100 ${darkMode ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-700'} border-l-4 border-red-500 p-4 rounded-md my-4`}
    >

      <div className="flex items-center">
        <svg className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <p>{message || "Une erreur est survenue. Veuillez réessayer."}</p>
      </div>
    </div>
  );
};

export default ErrorDisplay;