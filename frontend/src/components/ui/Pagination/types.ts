/**
 * Pagination Types
 * Core type definitions for the pagination system
 */

export interface PaginationProps {
  /** Current active page (1-indexed) */
  currentPage: number;
  
  /** Total number of items */
  totalItems: number;
  
  /** Number of items per page */
  pageSize: number;
  
  /** Callback when page changes */
  onPageChange: (page: number) => void;
  
  /** Maximum number of page buttons to show */
  maxVisiblePages?: number;
  
  /** Show first/last page buttons */
  showFirstLast?: boolean;
  
  /** Show ellipsis for skipped pages */
  showEllipsis?: boolean;
  
  /** Disabled state */
  disabled?: boolean;
  
  /** Loading state */
  loading?: boolean;
  
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  
  /** Custom class name */
  className?: string;
  
  /** Show page size selector */
  showPageSize?: boolean;
  
  /** Available page sizes */
  pageSizeOptions?: number[];
  
  /** Callback when page size changes */
  onPageSizeChange?: (pageSize: number) => void;
  
  /** Show total items count */
  showTotal?: boolean;
  
  /** Custom total text renderer */
  totalText?: (total: number, range: [number, number]) => string;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  startIndex: number;
  endIndex: number;
  hasPrevious: boolean;
  hasNext: boolean;
  isFirstPage: boolean;
  isLastPage: boolean;
}

export type PageItem = 
  | { type: 'page'; value: number; active: boolean }
  | { type: 'ellipsis'; value: string }
  | { type: 'previous'; disabled: boolean }
  | { type: 'next'; disabled: boolean }
  | { type: 'first'; disabled: boolean }
  | { type: 'last'; disabled: boolean };
