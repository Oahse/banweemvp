/**
 * AdminDataTable - Enhanced wrapper around DataTable with admin-specific features
 * Provides search, filters, and export functionality while using the new Table system
 */

import React, { useState, useEffect } from 'react';
import { 
  AlertCircle, 
  SearchIcon, 
  FilterIcon, 
  DownloadIcon,
  ArrowUpDownIcon
} from 'lucide-react';
import AnimatedLoader from '@/components/ui/AnimatedLoader';
import { Button } from '@/components/ui/Button';
import { DataTable } from '@/components/ui/Table';
import { TableColumn, SortDirection } from '@/components/ui/Table/types';
import { useTheme } from '@/components/shared/contexts/ThemeContext';
import Dropdown from '@/components/ui/Dropdown';
import { Body, Text as TextComponent } from '@/components/ui/Text/Text';

// Types
export interface AdminColumn<T = any> {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

export interface FilterOption {
  value: string;
  label: string;
}

export interface FilterConfig {
  key: string;
  label: string;
  type: 'select' | 'text';
  options?: FilterOption[];
  placeholder?: string;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface FetchParams {
  page: number;
  limit: number;
  search?: string;
  filters?: Record<string, string>;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface AdminDataTableProps<T = any> {
  // Data
  data: T[];
  loading: boolean;
  error: string | null;
  pagination: PaginationInfo;
  
  // Columns
  columns: AdminColumn<T>[];
  
  // Actions
  fetchData: (params: FetchParams) => Promise<void>;
  onRowClick?: (row: T) => void;
  
  // Features
  searchable?: boolean;
  filterable?: boolean;
  sortable?: boolean;
  paginated?: boolean;
  selectable?: boolean;
  exportable?: boolean;
  
  // Customization
  searchPlaceholder?: string;
  filters?: FilterConfig[];
  actions?: React.ReactNode;
  emptyMessage?: string;
  className?: string;
  
  // Pagination
  limit?: number;
  
  // Responsive
  responsive?: 'scroll' | 'stack' | 'cards';
}

export const AdminDataTable = <T extends Record<string, any>>({
  data,
  loading,
  error,
  pagination,
  columns,
  fetchData,
  onRowClick,
  searchable = true,
  filterable = true,
  sortable = true,
  paginated = true,
  selectable = false,
  exportable = false,
  searchPlaceholder = "Search...",
  filters = [],
  actions,
  emptyMessage = "No data available",
  className = "",
  limit = 10,
  responsive = 'scroll',
}: AdminDataTableProps<T>) => {
  const { theme } = useTheme();
  
  // State
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
  const [sortBy, setSortBy] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [selectedRows, setSelectedRows] = useState<Set<string | number>>(new Set());

  // Fetch data on mount and when params change
  useEffect(() => {
    fetchData({
      page,
      limit,
      search: searchQuery || undefined,
      filters: Object.keys(activeFilters).length > 0 ? activeFilters : undefined,
      sort_by: sortBy || undefined,
      sort_order: sortDirection || 'desc'
    });
  }, [page, searchQuery, activeFilters, sortBy, sortDirection]);

  // Handle search
  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setPage(1);
  };

  // Handle filter change
  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...activeFilters };
    if (value) {
      newFilters[key] = value;
    } else {
      delete newFilters[key];
    }
    setActiveFilters(newFilters);
    setPage(1);
  };

  // Handle sort
  const handleSort = (columnId: string, direction: SortDirection) => {
    setSortBy(columnId);
    setSortDirection(direction);
    setPage(1);
  };

  // Export data
  const handleExport = () => {
    console.log('Exporting data...');
    // Implement export functionality
  };

  // Convert AdminColumn to TableColumn
  const tableColumns: TableColumn<T>[] = columns.map(col => ({
    id: col.key,
    header: col.label,
    accessor: col.key as keyof T,
    sortable: col.sortable && sortable,
    align: col.align,
    width: col.width,
    cell: col.render ? (row: T) => {
      const value = row[col.key];
      try {
        const result = col.render!(value, row);
        if (typeof result === 'object' && result !== null && !React.isValidElement(result)) {
          return '[Invalid Render]';
        }
        return result;
      } catch (error) {
        console.error(`Error rendering column "${col.key}":`, error);
        return '[Render Error]';
      }
    } : undefined,
  }));

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 ${className}`}>
      {/* Header with search and filters */}
      {(searchable || filterable || actions || exportable) && (
        <div className="p-3 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="flex flex-col gap-3">
            {/* Search and Filters Row */}
            <div className="flex flex-col lg:flex-row gap-3">
              {/* Search */}
              {searchable && (
                <div className="relative flex-1 lg:max-w-md">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <input
                    type="text"
                    placeholder={searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 font-medium"
                  />
                </div>
              )}
              
              {/* Filters */}
              {filterable && filters.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {filters.map((filter) => (
                    <div key={filter.key} className="min-w-[140px]">
                      {filter.type === 'select' ? (
                        <Dropdown
                          options={filter.options || []}
                          value={activeFilters[filter.key] || ''}
                          onChange={(value) => handleFilterChange(filter.key, value)}
                          placeholder={filter.placeholder || 'Select...'}
                          className="w-full"
                        />
                      ) : (
                        <input
                          type="text"
                          placeholder={filter.placeholder || `Filter by ${filter.label}`}
                          value={activeFilters[filter.key] || ''}
                          onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                          className="w-full px-3 py-2.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 font-medium"
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Actions Row */}
            {(actions || exportable) && (
              <div className="flex items-center justify-between gap-3">
                <div className="flex-1"></div>
                <div className="flex items-center gap-2">
                  {actions}
                  {exportable && (
                    <Button
                      onClick={handleExport}
                      variant="ghost"
                      size="xs"
                      leftIcon={<DownloadIcon className="h-4 w-4" />}
                    >
                      <TextComponent className="hidden sm:inline">Export</TextComponent>
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <AnimatedLoader size="sm" variant="spinner" className="mr-2" />
          <TextComponent variant="body-sm" className="text-copy-light dark:text-copy-light-dark">Loading...</TextComponent>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="flex items-center justify-center py-12">
          <AlertCircle className="h-6 w-6 text-error dark:text-error-dark mr-2" />
          <TextComponent variant="body-sm" className="text-error dark:text-error-dark">{error}</TextComponent>
        </div>
      )}

      {/* Data Table */}
      {!loading && !error && (
        <DataTable
          columns={tableColumns}
          data={data}
          getRowKey={(row) => row.id}
          selectable={selectable}
          selectedRows={selectedRows}
          onRowSelect={setSelectedRows}
          sortBy={sortBy}
          sortDirection={sortDirection}
          onSort={handleSort}
          onRowClick={onRowClick}
          emptyMessage={emptyMessage}
          hoverable
          variant="default"
          density="comfortable"
          responsive={responsive}
          pagination={paginated ? {
            currentPage: page,
            totalItems: pagination.total,
            itemsPerPage: limit,
            onPageChange: setPage,
          } : undefined}
        />
      )}
    </div>
  );
};

export default AdminDataTable;
