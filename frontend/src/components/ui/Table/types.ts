/**
 * Table Component Types
 * Type definitions for the Table component system
 */

import { ReactNode, HTMLAttributes, ThHTMLAttributes, TdHTMLAttributes } from 'react';

export type TableVariant = 'default' | 'striped' | 'bordered';
export type TableDensity = 'compact' | 'comfortable';
export type ColumnAlignment = 'left' | 'center' | 'right';
export type SortDirection = 'asc' | 'desc' | null;

/**
 * Column definition for typed table data
 */
export interface TableColumn<T = any> {
  /** Unique identifier for the column */
  id: string;
  
  /** Column header label */
  header: ReactNode;
  
  /** Accessor function or key to get cell value */
  accessor?: keyof T | ((row: T) => any);
  
  /** Custom cell renderer */
  cell?: (row: T, index: number) => ReactNode;
  
  /** Column alignment */
  align?: ColumnAlignment;
  
  /** Column width (CSS value) */
  width?: string;
  
  /** Whether column is sortable */
  sortable?: boolean;
  
  /** Custom sort function */
  sortFn?: (a: T, b: T) => number;
  
  /** Whether column is sticky */
  sticky?: boolean;
  
  /** Custom header cell props */
  headerProps?: ThHTMLAttributes<HTMLTableCellElement>;
  
  /** Custom cell props */
  cellProps?: TdHTMLAttributes<HTMLTableCellElement>;
}

/**
 * Base Table props
 */
export interface BaseTableProps extends HTMLAttributes<HTMLTableElement> {
  /** Visual variant */
  variant?: TableVariant;
  
  /** Density/spacing variant */
  density?: TableDensity;
  
  /** Whether to show hover effect on rows */
  hoverable?: boolean;
  
  /** Whether table header is sticky */
  stickyHeader?: boolean;
  
  /** Maximum height for scrollable table */
  maxHeight?: string;
  
  /** Table caption for accessibility */
  caption?: ReactNode;
  
  /** Whether caption is visible or screen-reader only */
  captionSide?: 'top' | 'bottom' | 'hidden';
  
  /** Custom class name */
  className?: string;
}

/**
 * Props for data-driven table
 */
export interface DataTableProps<T = any> extends BaseTableProps {
  /** Column definitions */
  columns: TableColumn<T>[];
  
  /** Table data */
  data: T[];
  
  /** Unique key extractor */
  getRowKey?: (row: T, index: number) => string | number;
  
  /** Row selection */
  selectable?: boolean;
  selectedRows?: Set<string | number>;
  onRowSelect?: (keys: Set<string | number>) => void;
  
  /** Sorting */
  sortBy?: string;
  sortDirection?: SortDirection;
  onSort?: (columnId: string, direction: SortDirection) => void;
  
  /** Row click handler */
  onRowClick?: (row: T, index: number) => void;
  
  /** Empty state */
  emptyMessage?: ReactNode;
  
  /** Loading state */
  loading?: boolean;
  loadingRows?: number;
  
  /** Custom row props */
  getRowProps?: (row: T, index: number) => HTMLAttributes<HTMLTableRowElement>;
  
  /** Pagination */
  pagination?: {
    currentPage: number;
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
    showPagination?: boolean;
  };
  
  /** Responsive behavior */
  responsive?: 'scroll' | 'stack' | 'cards';
  
  /** Mobile breakpoint for responsive behavior (default: 768px) */
  mobileBreakpoint?: number;
}

/**
 * Table context value
 */
export interface TableContextValue {
  variant: TableVariant;
  density: TableDensity;
  hoverable: boolean;
}
