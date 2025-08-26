import React, { useState, useRef, useEffect } from 'react';
import { Filter, ChevronDown } from 'lucide-react';
import type { HealthStatus } from '../types';

interface HealthFilterProps {
  selectedHealth: HealthStatus[];
  onChange: (health: HealthStatus[]) => void;
}

const HEALTH_OPTIONS: HealthStatus[] = ['Healthy', 'Injured', 'Critical'];

const HEALTH_COLORS = {
  Healthy: 'text-green-600 dark:text-green-400',
  Injured: 'text-yellow-600 dark:text-yellow-400',
  Critical: 'text-red-600 dark:text-red-400',
};

export const HealthFilter: React.FC<HealthFilterProps> = ({
  selectedHealth,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleToggle = (health: HealthStatus) => {
    const newSelected = selectedHealth.includes(health)
      ? selectedHealth.filter(h => h !== health)
      : [...selectedHealth, health];
    onChange(newSelected);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1 px-2 py-1 rounded-md transition-colors
                   ${selectedHealth.length > 0 
                     ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' 
                     : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
        aria-label="Filter by health status"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <Filter className="w-4 h-4" />
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        {selectedHealth.length > 0 && (
          <span className="text-xs font-medium">({selectedHealth.length})</span>
        )}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-10 min-w-[150px]">
          <div className="p-2">
            {HEALTH_OPTIONS.map((health) => (
              <label
                key={health}
                className="flex items-center gap-2 px-2 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedHealth.includes(health)}
                  onChange={() => handleToggle(health)}
                  className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                  aria-describedby={`health-${health.toLowerCase()}`}
                />
                <span className={`text-sm font-medium ${HEALTH_COLORS[health]}`} id={`health-${health.toLowerCase()}`}>
                  {health}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};