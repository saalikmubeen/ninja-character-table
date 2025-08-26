import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { HealthFilter } from './HealthFilter';
import type { Character, SortConfig, HealthStatus } from '../types';

interface TableHeaderProps {
  selectedCount: number;
  totalCount: number;
  isAllSelected: boolean;
  onToggleSelectAll: () => void;
  sortConfig: SortConfig;
  onSort: (key: keyof Character) => void;
  selectedHealth: HealthStatus[];
  onHealthChange: (health: HealthStatus[]) => void;
}

export const TableHeader: React.FC<TableHeaderProps> = ({
  selectedCount,
  totalCount,
  isAllSelected,
  onToggleSelectAll,
  sortConfig,
  onSort,
  selectedHealth,
  onHealthChange,
}) => {
  const getSortIcon = (key: keyof Character) => {
    if (sortConfig.key !== key) {
      return <ChevronDown className="w-4 h-4 text-gray-400" />;
    }
    return sortConfig.direction === 'asc' 
      ? <ChevronUp className="w-4 h-4 text-blue-600" />
      : <ChevronDown className="w-4 h-4 text-blue-600" />;
  };

  return (
    <thead className="bg-gray-50 dark:bg-gray-800 sticky top-0 z-10">
      <tr>
        <th className="w-12 px-4 py-3 text-left">
          <input
            type="checkbox"
            checked={isAllSelected}
            ref={(el) => {
              if (el) {
                el.indeterminate = selectedCount > 0 && !isAllSelected;
              }
            }}
            onChange={onToggleSelectAll}
            className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
            aria-label={`Select all ${totalCount} characters`}
          />
        </th>
        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
          Name
        </th>
        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
          Location
        </th>
        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
          <div className="flex items-center gap-2">
            Health
            <HealthFilter
              selectedHealth={selectedHealth}
              onChange={onHealthChange}
            />
          </div>
        </th>
        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
          <button
            onClick={() => onSort('power')}
            className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            aria-label="Sort by power level"
          >
            Power
            {getSortIcon('power')}
          </button>
        </th>
        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
          Status
        </th>
      </tr>
    </thead>
  );
};