import React from 'react';
import { Search } from 'lucide-react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = 'Search characters...',
}) => {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg 
                   bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                   focus:ring-2 focus:ring-blue-500 focus:border-transparent
                   transition-colors"
        aria-label="Search characters by name or location"
      />
    </div>
  );
};