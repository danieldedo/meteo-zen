// src/components/Loading.jsx
const Loading = () => {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        <p className="ml-4 text-lg font-medium text-gray-700 dark:text-gray-300">Chargement...</p>
      </div>
    );
  };
  
  export default Loading;