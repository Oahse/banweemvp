import React, { useState, useEffect } from 'react';
import { 
  Loader, 
  AlertCircle, 
  Eye, 
  ChevronLeft, 
  ChevronRight, 
  SearchIcon, 
  FilterIcon, 
  PlusIcon,
  ArrowUpDownIcon,
  DownloadIcon,
  TrashIcon,
  EditIcon
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useTheme } from '@/components/shared/contexts/ThemeContext';
import Dropdown from '@/components/ui/Dropdown';

// Types
export interface Column<T = any> {
  key: string; // Changed from keyof T to string for flexibility
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

export interface AdminDataTableProps<T = any> {
  // Data
  data: T[];
  loading: boolean;
  error: string | null;
  pagination: PaginationInfo;
  
  // Columns
  columns: Column<T>[];
  
  // Actions
  fetchData: (params: FetchParams) => Promise<void>;
  onRowClick?: (row: T) => void;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  onView?: (row: T) => void;
  
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
  
  // Styling
  tableClassName?: string;
  headerClassName?: string;
  rowClassName?: string | ((row: T) => string);
}

export interface FetchParams {
  page: number;
  limit: number;
  search?: string;
  filters?: Record<string, string>;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export const AdminDataTable = <T extends Record<string, any>>({
  data,
  loading,
  error,
  pagination,
  columns,
  fetchData,
  onRowClick,
  onEdit,
  onDelete,
  onView,
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
  tableClassName = "",
  headerClassName = "",
  rowClassName = ""
}: AdminDataTableProps<T>) => {
  const { theme } = useTheme();
  
  // State
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
  const [sortBy, setSortBy] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedRows, setSelectedRows] = useState<Set<string | number>>(new Set());

  // Fetch data on mount and when params change
  useEffect(() => {
    fetchData({
      page,
      limit,
      search: searchQuery || undefined,
      filters: Object.keys(activeFilters).length > 0 ? activeFilters : undefined,
      sort_by: sortBy || undefined,
      sort_order: sortOrder
    });
  }, [page, searchQuery, activeFilters, sortBy, sortOrder]);

  // Handle search
  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setPage(1); // Reset to first page
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
    setPage(1); // Reset to first page
  };

  // Handle sort
  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
    setPage(1); // Reset to first page
  };

  // Handle pagination
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  // Handle row selection
  const handleRowSelect = (rowId: string | number) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(rowId)) {
      newSelected.delete(rowId);
    } else {
      newSelected.add(rowId);
    }
    setSelectedRows(newSelected);
  };

  // Handle select all
  const handleSelectAll = () => {
    if (selectedRows.size === data.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(data.map(row => row.id)));
    }
  };

  // Export data
  const handleExport = () => {
    // Implement export functionality
    console.log('Exporting data...');
  };

  // Render cell content
  const renderCell = (column: Column<T>, row: T) => {
    const value = row[column.key];
    if (column.render) {
      try {
        const result = column.render(value, row);
        // Additional safety check for custom render functions
        if (typeof result === 'object' && result !== null && !React.isValidElement(result)) {
          console.warn(`Column "${column.key}" render function returned an object:`, result);
          return '[Invalid Render]';
        }
        return result;
      } catch (error) {
        console.error(`Error rendering column "${column.key}":`, error);
        return '[Render Error]';
      }
    }
    // Prevent rendering objects directly - React doesn't allow this
    if (value === null || value === undefined) {
      return '-';
    }
    if (typeof value === 'object') {
      // Handle common object types
      if (Array.isArray(value)) {
        return value.length > 0 ? value.join(', ') : '-';
      }
      // If it's an object with full_name, show that
      if ('full_name' in value && value.full_name) {
        return String(value.full_name);
      }
      // If it's an object with name, show that
      if ('name' in value && value.name) {
        return String(value.name);
      }
      // If it's an object with email, show that
      if ('email' in value && value.email) {
        return String(value.email);
      }
      // If it's an object with description, show that
      if ('description' in value && value.description) {
        return String(value.description);
      }
      // If it's an object with id, show that as fallback
      if ('id' in value && value.id) {
        return String(value.id);
      }
      // Log the problematic object for debugging
      console.warn(`Object value found in column "${column.key}":`, value);
      // Otherwise convert to string safely or show placeholder
      try {
        const str = String(value);
        return str === '[object Object]' ? '[Object]' : str;
      } catch {
        return '[Object]';
      }
    }
    // Ensure we always return a string or number
    return typeof value === 'string' || typeof value === 'number' ? value : String(value);
  };

  // Get row class name
  const getRowClassName = (row: T) => {
    if (typeof rowClassName === 'function') {
      return rowClassName(row);
    }
    return rowClassName;
  };

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
                    className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 font-medium"
                  />
                </div>
              )}
              
              {/* Filters */}
              {filterable && (
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
                          className="w-full px-3 py-2.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 font-medium"
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Actions Row */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex-1"></div>
              <div className="flex items-center gap-2">
                {actions}
                {exportable && (
                  <Button
                    onClick={handleExport}
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
                    leftIcon={<DownloadIcon className="h-4 w-4" />}
                  >
                    <span className="hidden sm:inline">Export</span>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-6">
          <Loader className="h-5 w-5 animate-spin text-green-600 dark:text-green-400 mr-2" />
          <span className="text-xs text-gray-600 dark:text-gray-400">Loading...</span>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="flex items-center justify-center py-6">
          <AlertCircle className="h-5 w-5 text-red-500 dark:text-red-400 mr-2" />
          <span className="text-xs text-red-600 dark:text-red-400">{error}</span>
        </div>
      )}

      {/* Data Table */}
      {!loading && !error && (
        <>
          {data.length === 0 ? (
            <div className="text-center py-6">
              <div className="text-gray-400 dark:text-gray-500 mb-1">
                <FilterIcon className="h-8 w-8 mx-auto" />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">{emptyMessage}</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className={`w-full ${tableClassName}`}>
                {/* Table Header */}
                <thead className={`bg-gray-100 dark:bg-gray-900 border-b border-gray-300 dark:border-gray-600 ${headerClassName}`}>
                  <tr>
                    {selectable && (
                      <th className="px-3 py-3 text-left">
                        <input
                          type="checkbox"
                          checked={selectedRows.size === data.length}
                          onChange={handleSelectAll}
                          className="rounded border-gray-300 dark:border-gray-600 text-green-600 dark:text-green-400 focus:ring-green-500 focus:ring-green-400 text-sm"
                        />
                      </th>
                    )}
                    {columns.map((column) => (
                      <th
                        key={String(column.key)}
                        className={`px-3 py-3 text-left text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider ${
                          column.align === 'center' ? 'text-center' : column.align === 'right' ? 'text-right' : ''
                        } ${column.sortable && sortable ? 'cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800' : ''}`}
                        style={{ width: column.width }}
                        onClick={() => column.sortable && sortable && handleSort(String(column.key))}
                      >
                        <div className="flex items-center gap-2">
                          {column.label}
                          {column.sortable && sortable && (
                            <ArrowUpDownIcon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {data.map((row) => (
                    <tr
                      key={row.id}
                      className={`hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${getRowClassName(row)}`}
                      onClick={() => onRowClick && onRowClick(row)}
                    >
                      {selectable && (
                        <td className="px-3 py-2">
                          <input
                            type="checkbox"
                            checked={selectedRows.has(row.id)}
                            onChange={() => handleRowSelect(row.id)}
                            className="rounded border-gray-300 dark:border-gray-600 text-green-600 dark:text-green-400 focus:ring-green-500 focus:ring-green-400"
                          />
                        </td>
                      )}
                      {columns.map((column) => (
                        <td
                          key={String(column.key)}
                          className={`px-3 py-2 text-xs text-gray-900 dark:text-gray-100 ${
                            column.align === 'center' ? 'text-center' : column.align === 'right' ? 'text-right' : ''
                          }`}
                        >
                          {renderCell(column, row)}
                        </td>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination - Always show if paginated is true */}
          {paginated && (
            <div className="px-3 py-2 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="text-xs text-gray-700 dark:text-gray-300">
                  <span className="block sm:hidden">
                    Page {pagination.page} of {pagination.pages || 1}
                  </span>
                  <span className="hidden sm:block">
                    Showing {pagination.total === 0 ? 0 : ((pagination.page - 1) * pagination.limit) + 1} to{' '}
                    {Math.min(pagination.page * pagination.limit, pagination.total)} of{' '}
                    {pagination.total} results
                  </span>
                </div>
                <div className="flex items-center justify-center sm:justify-end gap-1">
                  <Button
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page <= 1}
                    variant="outline"
                    size="sm"
                    className="p-1.5 border border-gray-300 dark:border-gray-600 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 transition-colors"
                  >
                    <ChevronLeft className="h-3 w-3" />
                  </Button>
                  
                  <span className="text-xs text-gray-700 dark:text-gray-300 hidden sm:block min-w-[80px] text-center">
                    Page {pagination.page} of {pagination.pages || 1}
                  </span>
                  
                  <Button
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page >= (pagination.pages || 1)}
                    variant="outline"
                    size="sm"
                    className="p-1.5 border border-gray-300 dark:border-gray-600 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 transition-colors"
                  >
                    <ChevronRight className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminDataTable;
