import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-gray-200 dark:border-gray-700 rounded-full animate-spin border-t-blue-600"></div>
        <div className="absolute inset-0 w-12 h-12 border-4 border-transparent rounded-full animate-pulse border-t-blue-400 opacity-75"></div>
      </div>
      <span className="ml-3 text-gray-600 dark:text-gray-400 font-medium">
        Loading ninja data...
      </span>
    </div>
  );
};