import React from 'react';
import { Eye, EyeOff } from 'lucide-react';
import type { Character } from '../types';

interface TableRowProps {
  character: Character;
  isSelected: boolean;
  onToggleSelection: (id: string) => void;
}

const HEALTH_COLORS = {
  Healthy: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  Injured: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  Critical: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
};

const LOCATION_COLORS = {
  Konoha: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  Suna: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
  Kiri: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300',
  Iwa: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
  Kumo: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
};

export const TableRow: React.FC<TableRowProps> = React.memo(({
  character,
  isSelected,
  onToggleSelection,
}) => {
  return (
    <tr 
      className={`border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors
                  ${isSelected ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}
    >
      <td className="px-4 py-3">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onToggleSelection(character.id)}
          className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
          aria-label={`Select ${character.name}`}
        />
      </td>
      <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100">
        {character.name}
      </td>
      <td className="px-4 py-3 text-sm">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${LOCATION_COLORS[character.location]}`}>
          {character.location}
        </span>
      </td>
      <td className="px-4 py-3 text-sm">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${HEALTH_COLORS[character.health]}`}>
          {character.health}
        </span>
      </td>
      <td className="px-4 py-3 text-sm font-mono text-gray-900 dark:text-gray-100">
        {character.power.toLocaleString()}
      </td>
      <td className="px-4 py-3 text-sm">
        {character.isViewed ? (
          <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
            <Eye className="w-4 h-4" />
            <span className="text-xs">Viewed</span>
          </div>
        ) : (
          <div className="flex items-center gap-1 text-gray-400">
            <EyeOff className="w-4 h-4" />
            <span className="text-xs">Unviewed</span>
          </div>
        )}
      </td>
    </tr>
  );
});