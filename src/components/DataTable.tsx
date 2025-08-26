import React, { useCallback, useRef } from 'react';
import { useVirtual } from 'react-virtual';
import { TableHeader } from './TableHeader';
import { TableRow } from './TableRow';
import { SearchInput } from './SearchInput';
import { ActionButtons } from './ActionButtons';
import { LoadingSpinner } from './LoadingSpinner';
import { ThemeToggle } from './ThemeToggle';
import { useTableData } from '../hooks/useTableData';

export const DataTable: React.FC = () => {
  const {
    data,
    filteredData,
    selectedIds,
    filters,
    sortConfig,
    loading,
    updateFilters,
    updateSort,
    toggleSelection,
    toggleSelectAll,
    markAsViewed,
  } = useTableData();

  const isAllSelected = filteredData.length > 0 &&
    filteredData.every(char => selectedIds.has(char.id));

  const handleSubmit = () => {
    const ids = Array.from(selectedIds);
    // Log the IDs of selected rows as a list
    console.log('Selected IDs:', ids);
  };

  // Virtualization using react-virtual
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const estimateSize = useCallback(() => 56, []);
  const rowVirtualizer = useVirtual({
    size: filteredData.length,
    parentRef: scrollContainerRef,
    estimateSize,
    overscan: 10,
  });

  const virtualItems = rowVirtualizer.virtualItems;
  const totalSize = rowVirtualizer.totalSize;
  const topSpacer = virtualItems.length > 0 ? virtualItems[0].start : 0;
  const bottomSpacer = virtualItems.length > 0 ? totalSize - virtualItems[virtualItems.length - 1].end : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
        <div className="container mx-auto px-4 py-8">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Ninja Character Database
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Showing {filteredData.length} of {data.length} characters
            </p>
          </div>
          <ThemeToggle />
        </div>

        {/* Search and Actions */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 max-w-md">
              <SearchInput
                value={filters.search}
                onChange={(search) => updateFilters({ search })}
                placeholder="Search by name or location..."
              />
            </div>
            <button
              type="button"
              onClick={handleSubmit}
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
              aria-label="Submit selected rows"
            >
              Submit
            </button>
          </div>

          <ActionButtons
            selectedCount={selectedIds.size}
            onMarkViewed={() => markAsViewed(true)}
            onMarkUnviewed={() => markAsViewed(false)}
          />
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <div className="max-h-[70vh] overflow-y-auto" ref={scrollContainerRef}>
              <table className="w-full">
                <TableHeader
                  selectedCount={selectedIds.size}
                  totalCount={filteredData.length}
                  isAllSelected={isAllSelected}
                  onToggleSelectAll={toggleSelectAll}
                  sortConfig={sortConfig}
                  onSort={updateSort}
                  selectedHealth={filters.health}
                  onHealthChange={(health) => updateFilters({ health })}
                />
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredData.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                        No characters found matching your criteria.
                      </td>
                    </tr>
                  ) : (
                    <>
                      {topSpacer > 0 && (
                        <tr>
                          <td colSpan={6} style={{ height: `${topSpacer}px` }} />
                        </tr>
                      )}
                      {virtualItems.map((vItem) => {
                        const character = filteredData[vItem.index];
                        return (
                          <TableRow
                            key={character.id}
                            character={character}
                            isSelected={selectedIds.has(character.id)}
                            onToggleSelection={toggleSelection}
                          />
                        );
                      })}
                      {bottomSpacer > 0 && (
                        <tr>
                          <td colSpan={6} style={{ height: `${bottomSpacer}px` }} />
                        </tr>
                      )}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>Built with React, TypeScript, and Tailwind CSS</p>
        </div>
      </div>
    </div>
  );
};