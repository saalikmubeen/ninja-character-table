export type Location = 'Konoha' | 'Suna' | 'Kiri' | 'Iwa' | 'Kumo';
export type HealthStatus = 'Healthy' | 'Injured' | 'Critical';

export interface Character {
  id: string;
  name: string;
  location: Location;
  health: HealthStatus;
  power: number;
  isViewed?: boolean;
}

export interface TableFilters {
  search: string;
  health: HealthStatus[];
}

export interface SortConfig {
  key: keyof Character | null;
  direction: 'asc' | 'desc';
}

export type Theme = 'light' | 'dark';

export interface TableState {
  data: Character[];
  filteredData: Character[];
  selectedIds: Set<string>;
  filters: TableFilters;
  sortConfig: SortConfig;
  loading: boolean;
}