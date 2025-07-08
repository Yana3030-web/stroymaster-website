import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="loading-spinner w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full mb-4"></div>
      <p className="text-gray-600">Загрузка товаров...</p>
    </div>
  );
};

export default LoadingSpinner;