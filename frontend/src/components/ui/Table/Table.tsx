/**
 * Table Component
 * Production-ready compound table component system
 */

import React, { createContext, useContext, forwardRef, HTMLAttributes, ThHTMLAttributes, TdHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';
import {
  BaseTableProps,
  TableContextValue,
  TableVariant,
  TableDensity,
  ColumnAlignment,
  SortDirection,
} from './types';
import {
  getTableContainerClasses,
  getTableClasses,
  getTableHeadClasses,
  getTableHeaderCellClasses,
  getTableRowClasses,
  getTableCellClasses,
  getSortIcon,
  getAriaSortAttribute,
} from './utils';

// Table Context
const TableContext = createContext<TableContextValue>({
  variant: 'default',
  density: 'comfortable',
  hoverable: false,
});

const useTableContext = () => useContext(TableContext);

/**
 * Main Table Component
 */
export interface TableProps extends BaseTableProps {
  children: React.ReactNode;
}

interface TableComponent extends React.ForwardRefExoticComponent<TableProps & React.RefAttributes<HTMLTableElement>> {
  Head: typeof TableHead;
  Body: typeof TableBody;
  Footer: typeof TableFooter;
  Row: typeof TableRow;
  HeaderCell: typeof TableHeaderCell;
  Cell: typeof TableCell;
  Empty: typeof TableEmpty;
  Loading: typeof TableLoading;
}

export const Table = forwardRef<HTMLTableElement, TableProps>(
  (
    {
      variant = 'default',
      density = 'comfortable',
      hoverable = false,
      stickyHeader = false,
      maxHeight,
      caption,
      captionSide = 'hidden',
      className,
      children,
      ...props
    },
    ref
  ) => {
    const containerClasses = getTableContainerClasses(stickyHeader, maxHeight);
    const tableClasses = getTableClasses(variant, density, hoverable, className);

    return (
      <TableContext.Provider value={{ variant, density, hoverable }}>
        <div 
          className={containerClasses}
          style={maxHeight ? { maxHeight } : undefined}
        >
          <table
            ref={ref}
            className={tableClasses}
            {...props}
          >
            {caption && (
              <caption
                className={cn(
                  'text-sm font-medium text-copy dark:text-copy-dark',
                  captionSide === 'top' && 'caption-top mb-2',
                  captionSide === 'bottom' && 'caption-bottom mt-2',
                  captionSide === 'hidden' && 'sr-only'
                )}
              >
                {caption}
              </caption>
            )}
            {children}
          </table>
        </div>
      </TableContext.Provider>
    );
  }
) as TableComponent;

Table.displayName = 'Table';

/**
 * Table Head Component
 */
export interface TableHeadProps extends HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode;
  sticky?: boolean;
}

export const TableHead = forwardRef<HTMLTableSectionElement, TableHeadProps>(
  ({ sticky, className, children, ...props }, ref) => {
    const headClasses = getTableHeadClasses(sticky);

    return (
      <thead
        ref={ref}
        className={cn(headClasses, className)}
        {...props}
      >
        {children}
      </thead>
    );
  }
);

TableHead.displayName = 'Table.Head';

/**
 * Table Body Component
 */
export interface TableBodyProps extends HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode;
}

export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <tbody
        ref={ref}
        className={cn('bg-surface dark:bg-surface-dark', className)}
        {...props}
      >
        {children}
      </tbody>
    );
  }
);

TableBody.displayName = 'Table.Body';

/**
 * Table Footer Component
 */
export interface TableFooterProps extends HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode;
}

export const TableFooter = forwardRef<HTMLTableSectionElement, TableFooterProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <tfoot
        ref={ref}
        className={cn(
          'bg-surface-elevated dark:bg-surface-elevated-dark',
          'border-t-2 border-border-light dark:border-border-dark',
          'font-semibold',
          className
        )}
        {...props}
      >
        {children}
      </tfoot>
    );
  }
);

TableFooter.displayName = 'Table.Footer';

/**
 * Table Row Component
 */
export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  children: React.ReactNode;
  selected?: boolean;
  index?: number;
}

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ selected, index = 0, className, children, onClick, ...props }, ref) => {
    const { variant, hoverable } = useTableContext();
    const isEven = index % 2 === 0;
    const isClickable = !!onClick;
    
    const rowClasses = getTableRowClasses(variant, hoverable, isEven, selected, isClickable);

    return (
      <tr
        ref={ref}
        className={cn(rowClasses, className)}
        onClick={onClick}
        role={isClickable ? 'button' : undefined}
        tabIndex={isClickable ? 0 : undefined}
        onKeyDown={
          isClickable
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onClick?.(e as any);
                }
              }
            : undefined
        }
        {...props}
      >
        {children}
      </tr>
    );
  }
);

TableRow.displayName = 'Table.Row';

/**
 * Table Header Cell Component
 */
export interface TableHeaderCellProps extends ThHTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode;
  align?: ColumnAlignment;
  sortable?: boolean;
  sortDirection?: SortDirection;
  onSort?: () => void;
  sticky?: boolean;
  width?: string;
}

export const TableHeaderCell = forwardRef<HTMLTableCellElement, TableHeaderCellProps>(
  (
    {
      children,
      align = 'left',
      sortable,
      sortDirection,
      onSort,
      sticky,
      width,
      className,
      ...props
    },
    ref
  ) => {
    const { density } = useTableContext();
    const headerClasses = getTableHeaderCellClasses(density, align, sortable, sticky);
    const ariaSort = getAriaSortAttribute(sortable, !!sortDirection, sortDirection);

    return (
      <th
        ref={ref}
        scope="col"
        className={cn(headerClasses, className)}
        style={width ? { width } : undefined}
        aria-sort={ariaSort}
        onClick={sortable ? onSort : undefined}
        role={sortable ? 'button' : undefined}
        tabIndex={sortable ? 0 : undefined}
        onKeyDown={
          sortable && onSort
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSort();
                }
              }
            : undefined
        }
        {...props}
      >
        <div className="flex items-center gap-2">
          <span>{children}</span>
          {sortable && (
            <span className="text-xs opacity-50" aria-hidden="true">
              {getSortIcon(sortDirection || null)}
            </span>
          )}
        </div>
      </th>
    );
  }
);

TableHeaderCell.displayName = 'Table.HeaderCell';

/**
 * Table Cell Component
 */
export interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  children?: React.ReactNode;
  align?: ColumnAlignment;
  sticky?: boolean;
}

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ children, align = 'left', sticky, className, ...props }, ref) => {
    const { density, variant } = useTableContext();
    const cellClasses = getTableCellClasses(density, align, variant, sticky);

    return (
      <td
        ref={ref}
        className={cn(cellClasses, className)}
        {...props}
      >
        {children}
      </td>
    );
  }
);

TableCell.displayName = 'Table.Cell';

/**
 * Table Empty State Component
 */
export interface TableEmptyProps {
  message?: React.ReactNode;
  colSpan?: number;
}

export const TableEmpty: React.FC<TableEmptyProps> = ({
  message = 'No data available',
  colSpan,
}) => {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} align="center" className="py-12">
        <div className="text-copy-light dark:text-copy-light-dark">
          {message}
        </div>
      </TableCell>
    </TableRow>
  );
};

TableEmpty.displayName = 'Table.Empty';

/**
 * Table Loading State Component
 */
export interface TableLoadingProps {
  rows?: number;
  columns?: number;
}

export const TableLoading: React.FC<TableLoadingProps> = ({
  rows = 5,
  columns = 3,
}) => {
  return (
    <>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <TableRow key={rowIndex} index={rowIndex}>
          {Array.from({ length: columns }).map((_, colIndex) => (
            <TableCell key={colIndex}>
              <div className="h-4 bg-surface-elevated dark:bg-surface-elevated-dark rounded animate-pulse" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
};

TableLoading.displayName = 'Table.Loading';

// Compound component exports
Table.Head = TableHead;
Table.Body = TableBody;
Table.Footer = TableFooter;
Table.Row = TableRow;
Table.HeaderCell = TableHeaderCell;
Table.Cell = TableCell;
Table.Empty = TableEmpty;
Table.Loading = TableLoading;
