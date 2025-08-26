import React from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface ActionButtonsProps {
  selectedCount: number;
  onMarkViewed: () => void;
  onMarkUnviewed: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  selectedCount,
  onMarkViewed,
  onMarkUnviewed,
}) => {
  if (selectedCount === 0) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg">
      <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
        {selectedCount} selected
      </span>
      <div className="flex gap-2">
        <button
          onClick={onMarkViewed}
          className="flex items-center gap-1 px-3 py-1 text-sm bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
          aria-label={`Mark ${selectedCount} selected characters as viewed`}
        >
          <Eye className="w-4 h-4" />
          Mark Viewed
        </button>
        <button
          onClick={onMarkUnviewed}
          className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors"
          aria-label={`Mark ${selectedCount} selected characters as unviewed`}
        >
          <EyeOff className="w-4 h-4" />
          Mark Unviewed
        </button>
      </div>
    </div>
  );
};