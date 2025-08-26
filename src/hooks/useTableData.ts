import { useState, useEffect, useMemo, useCallback } from 'react';
import type { Character, TableFilters, SortConfig, TableState } from '../types';
import { generateCharacters } from '../utils/dataGenerator';

const INITIAL_FILTERS: TableFilters = {
  search: '',
  health: [],
};

const INITIAL_SORT: SortConfig = {
  key: null,
  direction: 'asc',
};

export function useTableData() {
  const [state, setState] = useState<TableState>({
    data: [],
    filteredData: [],
    selectedIds: new Set(),
    filters: INITIAL_FILTERS,
    sortConfig: INITIAL_SORT,
    loading: true,
  });

  // Simulate API call
  useEffect(() => {
    const loadData = async () => {
      setState(prev => ({ ...prev, loading: true }));

      // Simulate network delay (skip in test environment)
      const delayMs = (import.meta as any).env?.MODE === 'test' ? 0 : 1000;
      await new Promise(resolve => setTimeout(resolve, delayMs));

      const characters = generateCharacters(1200);
      setState(prev => ({
        ...prev,
        data: characters,
        filteredData: characters,
        loading: false,
      }));
    };

    loadData();
  }, []);

  // Filter and sort data
  const processedData = useMemo(() => {
    let filtered = state.data;

    // Apply search filter
    if (state.filters.search) {
      const searchTerm = state.filters.search.toLowerCase();
      filtered = filtered.filter(char =>
        char.name.toLowerCase().includes(searchTerm) ||
        char.location.toLowerCase().includes(searchTerm)
      );
    }

    // Apply health filter
    if (state.filters.health.length > 0) {
      filtered = filtered.filter(char =>
        state.filters.health.includes(char.health)
      );
    }

    // Apply sorting
    if (state.sortConfig.key) {
      filtered = [...filtered].sort((a, b) => {
        const aVal = a[state.sortConfig.key!];
        const bVal = b[state.sortConfig.key!];

        if (typeof aVal === 'string' && typeof bVal === 'string') {
          const comparison = aVal.localeCompare(bVal);
          return state.sortConfig.direction === 'asc' ? comparison : -comparison;
        }

        if (typeof aVal === 'number' && typeof bVal === 'number') {
          const comparison = aVal - bVal;
          return state.sortConfig.direction === 'asc' ? comparison : -comparison;
        }

        return 0;
      });
    }

    return filtered;
  }, [state.data, state.filters, state.sortConfig]);

  useEffect(() => {
    setState(prev => ({ ...prev, filteredData: processedData }));
  }, [processedData]);

  const updateFilters = useCallback((filters: Partial<TableFilters>) => {
    setState(prev => ({
      ...prev,
      filters: { ...prev.filters, ...filters },
      selectedIds: new Set(), // Clear selection when filters change
    }));
  }, []);

  const updateSort = useCallback((key: keyof Character) => {
    setState(prev => ({
      ...prev,
      sortConfig: {
        key,
        direction: prev.sortConfig.key === key && prev.sortConfig.direction === 'asc'
          ? 'desc'
          : 'asc',
      },
    }));
  }, []);

  const toggleSelection = useCallback((id: string) => {
    setState(prev => {
      const newSelected = new Set(prev.selectedIds);
      if (newSelected.has(id)) {
        newSelected.delete(id);
      } else {
        newSelected.add(id);
      }
      return { ...prev, selectedIds: newSelected };
    });
  }, []);

  const toggleSelectAll = useCallback(() => {
    setState(prev => {
      const allIds = prev.filteredData.map(char => char.id);
      const isAllSelected = allIds.every(id => prev.selectedIds.has(id));

      return {
        ...prev,
        selectedIds: isAllSelected
          ? new Set()
          : new Set(allIds),
      };
    });
  }, []);

  const markAsViewed = useCallback((viewed: boolean = true) => {
    const selectedArray = Array.from(state.selectedIds);
    console.log(`Marking ${viewed ? 'viewed' : 'unviewed'}:`, selectedArray);

    setState(prev => ({
      ...prev,
      data: prev.data.map(char =>
        prev.selectedIds.has(char.id)
          ? { ...char, isViewed: viewed }
          : char
      ),
      selectedIds: new Set(),
    }));
  }, [state.selectedIds]);

  return {
    ...state,
    updateFilters,
    updateSort,
    toggleSelection,
    toggleSelectAll,
    markAsViewed,
  };
}