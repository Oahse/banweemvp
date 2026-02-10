/**
 * Table Component Utils
 * Utility functions for table styling and behavior
 */

import { TableVariant, TableDensity, ColumnAlignment, SortDirection } from './types';

/**
 * Get table container classes
 */
export const getTableContainerClasses = (
  stickyHeader?: boolean,
  maxHeight?: string
): string => {
  const classes = ['relative'];
  
  if (stickyHeader || maxHeight) {
    classes.push('overflow-auto');
  }
  
  return classes.join(' ');
};

/**
 * Get table base classes
 */
export const getTableClasses = (
  variant: TableVariant,
  density: TableDensity,
  hoverable: boolean,
  className?: string
): string => {
  const classes = [
    'w-full',
    'border-collapse',
    'text-copy dark:text-copy-dark',
  ];
  
  // Variant styles
  if (variant === 'bordered') {
    classes.push('border border-border-light dark:border-border-dark');
  }
  
  if (className) {
    classes.push(className);
  }
  
  return classes.join(' ');
};

/**
 * Get table head classes
 */
export const getTableHeadClasses = (stickyHeader?: boolean): string => {
  const classes = [
    'bg-surface-elevated dark:bg-surface-elevated-dark',
    'border-b-2 border-border-light dark:border-border-dark',
  ];
  
  if (stickyHeader) {
    classes.push('sticky top-0 z-10');
  }
  
  return classes.join(' ');
};

/**
 * Get table header cell classes
 */
export const getTableHeaderCellClasses = (
  density: TableDensity,
  align: ColumnAlignment = 'left',
  sortable?: boolean,
  sticky?: boolean
): string => {
  const classes = [
    'font-semibold',
    'text-copy dark:text-copy-dark',
    'border-b border-border-light dark:border-border-dark',
  ];
  
  // Density padding
  if (density === 'compact') {
    classes.push('px-3 py-2 text-sm');
  } else {
    classes.push('px-4 py-3 text-sm');
  }
  
  // Alignment
  classes.push(`text-${align}`);
  
  // Sortable
  if (sortable) {
    classes.push(
      'cursor-pointer',
      'select-none',
      'hover:bg-surface-elevated dark:hover:bg-surface-elevated-dark',
      'transition-colors duration-150'
    );
  }
  
  // Sticky column
  if (sticky) {
    classes.push('sticky left-0 z-20 bg-surface-elevated dark:bg-surface-elevated-dark');
  }
  
  return classes.join(' ');
};

/**
 * Get table row classes
 */
export const getTableRowClasses = (
  variant: TableVariant,
  hoverable: boolean,
  isEven: boolean,
  isSelected?: boolean,
  isClickable?: boolean
): string => {
  const classes = ['border-b border-border-light dark:border-border-dark last:border-b-0'];
  
  // Striped variant
  if (variant === 'striped' && isEven) {
    classes.push('bg-surface-elevated dark:bg-surface-elevated-dark');
  }
  
  // Hoverable
  if (hoverable) {
    classes.push('hover:bg-surface-elevated dark:hover:bg-surface-elevated-dark transition-colors duration-150');
  }
  
  // Selected
  if (isSelected) {
    classes.push('bg-primary/10 dark:bg-primary-dark/10');
  }
  
  // Clickable
  if (isClickable) {
    classes.push('cursor-pointer');
  }
  
  return classes.join(' ');
};

/**
 * Get table cell classes
 */
export const getTableCellClasses = (
  density: TableDensity,
  align: ColumnAlignment = 'left',
  variant: TableVariant,
  sticky?: boolean
): string => {
  const classes = [];
  
  // Density padding
  if (density === 'compact') {
    classes.push('px-3 py-2 text-sm');
  } else {
    classes.push('px-4 py-3');
  }
  
  // Alignment
  classes.push(`text-${align}`);
  
  // Bordered variant
  if (variant === 'bordered') {
    classes.push('border-r border-border-light dark:border-border-dark last:border-r-0');
  }
  
  // Sticky column
  if (sticky) {
    classes.push('sticky left-0 z-10 bg-surface dark:bg-surface-dark');
  }
  
  return classes.join(' ');
};

/**
 * Get sort icon based on direction
 */
export const getSortIcon = (direction: SortDirection): string => {
  if (direction === 'asc') return '↑';
  if (direction === 'desc') return '↓';
  return '↕';
};

/**
 * Get ARIA sort attribute
 */
export const getAriaSortAttribute = (
  sortable?: boolean,
  isActive?: boolean,
  direction?: SortDirection
): 'ascending' | 'descending' | 'none' | undefined => {
  if (!sortable) return undefined;
  if (!isActive) return 'none';
  if (direction === 'asc') return 'ascending';
  if (direction === 'desc') return 'descending';
  return 'none';
};

/**
 * Toggle sort direction
 */
export const toggleSortDirection = (current: SortDirection): SortDirection => {
  if (current === null) return 'asc';
  if (current === 'asc') return 'desc';
  return null;
};

/**
 * Sort data by column
 */
export const sortData = <T,>(
  data: T[],
  columnId: string,
  direction: SortDirection,
  columns: any[]
): T[] => {
  if (!direction) return data;
  
  const column = columns.find(col => col.id === columnId);
  if (!column) return data;
  
  const sorted = [...data].sort((a, b) => {
    // Use custom sort function if provided
    if (column.sortFn) {
      return column.sortFn(a, b);
    }
    
    // Get values to compare
    let aVal: any;
    let bVal: any;
    
    if (typeof column.accessor === 'function') {
      aVal = column.accessor(a);
      bVal = column.accessor(b);
    } else if (column.accessor) {
      aVal = a[column.accessor];
      bVal = b[column.accessor];
    } else {
      return 0;
    }
    
    // Handle null/undefined
    if (aVal == null && bVal == null) return 0;
    if (aVal == null) return 1;
    if (bVal == null) return -1;
    
    // Compare values
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return aVal.localeCompare(bVal);
    }
    
    if (aVal < bVal) return -1;
    if (aVal > bVal) return 1;
    return 0;
  });
  
  return direction === 'desc' ? sorted.reverse() : sorted;
};

/**
 * Get value from row using accessor
 */
export const getCellValue = <T,>(
  row: T,
  accessor?: keyof T | ((row: T) => any)
): any => {
  if (!accessor) return null;
  
  if (typeof accessor === 'function') {
    return accessor(row);
  }
  
  return row[accessor];
};
