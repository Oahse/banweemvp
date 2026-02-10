/**
 * DataTable Component
 * Data-driven table with built-in sorting, selection, pagination, and responsive behavior
 */

import React, { useState, useMemo } from 'react';
import { Table } from './Table';
import { DataTableProps, SortDirection, ColumnAlignment } from './types';
import { sortData, getCellValue, toggleSortDirection } from './utils';
import { Checkbox } from '@/components/ui/Form';
import { Pagination } from '@/components/ui/Pagination/Pagination';
import { Text } from '@/components/ui/Text/Text';

export function DataTable<T = any>({
  columns,
  data,
  getRowKey = (_, index) => index,
  selectable,
  selectedRows,
  onRowSelect,
  sortBy: controlledSortBy,
  sortDirection: controlledSortDirection,
  onSort: controlledOnSort,
  onRowClick,
  emptyMessage,
  loading,
  loadingRows = 5,
  getRowProps,
  pagination,
  responsive = 'scroll',
  mobileBreakpoint = 768,
  ...tableProps
}: DataTableProps<T>) {
  // Internal sorting state (used when not controlled)
  const [internalSortBy, setInternalSortBy] = useState<string | undefined>();
  const [internalSortDirection, setInternalSortDirection] = useState<SortDirection>(null);

  // Determine if sorting is controlled
  const isControlledSort = controlledOnSort !== undefined;
  const sortBy = isControlledSort ? controlledSortBy : internalSortBy;
  const sortDirection = isControlledSort ? controlledSortDirection : internalSortDirection;

  // Handle sort
  const handleSort = (columnId: string) => {
    if (isControlledSort) {
      const newDirection = sortBy === columnId ? toggleSortDirection(sortDirection || null) : 'asc';
      controlledOnSort(columnId, newDirection);
    } else {
      const newDirection = sortBy === columnId ? toggleSortDirection(sortDirection || null) : 'asc';
      setInternalSortBy(columnId);
      setInternalSortDirection(newDirection);
    }
  };

  // Sort data (only for client-side sorting)
  const sortedData = useMemo(() => {
    if (isControlledSort || !sortBy || !sortDirection) {
      return data;
    }
    return sortData(data, sortBy, sortDirection, columns);
  }, [data, sortBy, sortDirection, columns, isControlledSort]);

  // Handle row selection
  const handleSelectAll = (checked: boolean) => {
    if (!onRowSelect) return;
    
    if (checked) {
      const allKeys = new Set(sortedData.map((row, index) => getRowKey(row, index)));
      onRowSelect(allKeys);
    } else {
      onRowSelect(new Set());
    }
  };

  const handleSelectRow = (key: string | number, checked: boolean) => {
    if (!onRowSelect || !selectedRows) return;
    
    const newSelection = new Set(selectedRows);
    if (checked) {
      newSelection.add(key);
    } else {
      newSelection.delete(key);
    }
    onRowSelect(newSelection);
  };

  const allSelected = selectedRows && sortedData.length > 0 && 
    sortedData.every((row, index) => selectedRows.has(getRowKey(row, index)));
  const someSelected = selectedRows && selectedRows.size > 0 && !allSelected;

  // Responsive card view for mobile
  const renderCardView = () => (
    <div className="space-y-4 md:hidden">
      {loading && (
        <div className="space-y-3">
          {Array.from({ length: loadingRows }).map((_, i) => (
            <div key={i} className="bg-surface dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-lg p-4 animate-pulse">
              <div className="h-4 bg-surface-elevated dark:bg-surface-elevated-dark rounded mb-2" />
              <div className="h-4 bg-surface-elevated dark:bg-surface-elevated-dark rounded w-3/4" />
            </div>
          ))}
        </div>
      )}
      
      {!loading && sortedData.length === 0 && (
        <div className="text-center py-12 text-copy-light dark:text-copy-light-dark">
          {emptyMessage || 'No data available'}
        </div>
      )}
      
      {!loading && sortedData.map((row, index) => {
        const rowKey = getRowKey(row, index);
        const isSelected = selectedRows?.has(rowKey);
        
        return (
          <div
            key={rowKey}
            className={`bg-surface dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-lg p-4 ${
              onRowClick ? 'cursor-pointer hover:bg-surface-elevated dark:hover:bg-surface-elevated-dark' : ''
            } ${isSelected ? 'ring-2 ring-primary dark:ring-primary-dark' : ''}`}
            onClick={onRowClick ? () => onRowClick(row, index) : undefined}
          >
            {selectable && (
              <div className="mb-3 pb-3 border-b border-border-light dark:border-border-dark">
                <Checkbox
                  checked={isSelected || false}
                  onChange={(e) => {
                    e.stopPropagation();
                    handleSelectRow(rowKey, e.target.checked);
                  }}
                  label="Select"
                />
              </div>
            )}
            
            <div className="space-y-2">
              {columns.map((column) => {
                const cellValue = column.cell
                  ? column.cell(row, index)
                  : getCellValue(row, column.accessor);
                
                return (
                  <div key={column.id} className="flex justify-between items-start gap-4">
                    <Text variant="body-sm" weight="medium" className="text-copy-light dark:text-copy-light-dark min-w-[100px]">
                      {column.header}:
                    </Text>
                    <div className="flex-1 text-right">
                      {cellValue}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );

  // Responsive stack view for mobile
  const renderStackView = () => (
    <div className="space-y-6 md:hidden">
      {loading && (
        <div className="space-y-4">
          {Array.from({ length: loadingRows }).map((_, i) => (
            <div key={i} className="space-y-2 animate-pulse">
              <div className="h-4 bg-surface-elevated dark:bg-surface-elevated-dark rounded" />
              <div className="h-4 bg-surface-elevated dark:bg-surface-elevated-dark rounded w-5/6" />
            </div>
          ))}
        </div>
      )}
      
      {!loading && sortedData.length === 0 && (
        <div className="text-center py-12 text-copy-light dark:text-copy-light-dark">
          {emptyMessage || 'No data available'}
        </div>
      )}
      
      {!loading && sortedData.map((row, index) => {
        const rowKey = getRowKey(row, index);
        const isSelected = selectedRows?.has(rowKey);
        
        return (
          <div
            key={rowKey}
            className={`space-y-3 pb-6 border-b border-border-light dark:border-border-dark last:border-b-0 ${
              onRowClick ? 'cursor-pointer' : ''
            }`}
            onClick={onRowClick ? () => onRowClick(row, index) : undefined}
          >
            {selectable && (
              <Checkbox
                checked={isSelected || false}
                onChange={(e) => {
                  e.stopPropagation();
                  handleSelectRow(rowKey, e.target.checked);
                }}
                label="Select"
              />
            )}
            
            {columns.map((column) => {
              const cellValue = column.cell
                ? column.cell(row, index)
                : getCellValue(row, column.accessor);
              
              return (
                <div key={column.id}>
                  <Text variant="caption" className="text-copy-light dark:text-copy-light-dark mb-1 block">
                    {column.header}
                  </Text>
                  <div>{cellValue}</div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Responsive card/stack view for mobile */}
      {responsive === 'cards' && renderCardView()}
      {responsive === 'stack' && renderStackView()}
      
      {/* Standard table view (hidden on mobile for cards/stack) */}
      <div className={responsive !== 'scroll' ? 'hidden md:block' : ''}>
        <Table {...tableProps}>
          <Table.Head sticky={tableProps.stickyHeader}>
            <Table.Row>
              {/* Selection column */}
              {selectable && (
                <Table.HeaderCell width="48px" align="center">
                  <Checkbox
                    checked={allSelected || false}
                    indeterminate={someSelected}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    aria-label="Select all rows"
                  />
                </Table.HeaderCell>
              )}
              
              {/* Data columns */}
              {columns.map((column) => (
                <Table.HeaderCell
                  key={column.id}
                  align={column.align as ColumnAlignment}
                  width={column.width}
                  sortable={column.sortable}
                  sortDirection={sortBy === column.id ? sortDirection || undefined : undefined}
                  onSort={column.sortable ? () => handleSort(column.id) : undefined}
                  sticky={column.sticky}
                  {...(column.headerProps && { ...column.headerProps, align: undefined })}
                >
                  {column.header}
                </Table.HeaderCell>
              ))}
            </Table.Row>
          </Table.Head>

          <Table.Body>
            {/* Loading state */}
            {loading && (
              <Table.Loading rows={loadingRows} columns={columns.length + (selectable ? 1 : 0)} />
            )}

            {/* Empty state */}
            {!loading && sortedData.length === 0 && (
              <Table.Empty 
                message={emptyMessage} 
                colSpan={columns.length + (selectable ? 1 : 0)} 
              />
            )}

            {/* Data rows */}
            {!loading && sortedData.map((row, index) => {
              const rowKey = getRowKey(row, index);
              const isSelected = selectedRows?.has(rowKey);
              const rowProps = getRowProps?.(row, index) || {};

              return (
                <Table.Row
                  key={rowKey}
                  index={index}
                  selected={isSelected}
                  onClick={onRowClick ? () => onRowClick(row, index) : undefined}
                  {...rowProps}
                >
                  {/* Selection cell */}
                  {selectable && (
                    <Table.Cell align="center">
                      <Checkbox
                        checked={isSelected || false}
                        onChange={(e) => {
                          e.stopPropagation();
                          handleSelectRow(rowKey, e.target.checked);
                        }}
                        aria-label={`Select row ${index + 1}`}
                      />
                    </Table.Cell>
                  )}

                  {/* Data cells */}
                  {columns.map((column) => {
                    const cellValue = column.cell
                      ? column.cell(row, index)
                      : getCellValue(row, column.accessor);

                    return (
                      <Table.Cell
                        key={column.id}
                        align={column.align as ColumnAlignment}
                        sticky={column.sticky}
                        {...(column.cellProps && { ...column.cellProps, align: undefined })}
                      >
                        {cellValue}
                      </Table.Cell>
                    );
                  })}
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </div>
      
      {/* Pagination */}
      {pagination && pagination.showPagination !== false && pagination.totalItems > 0 && (
        <div className="flex justify-center mt-4">
          <Pagination
            currentPage={pagination.currentPage}
            totalItems={pagination.totalItems}
            pageSize={pagination.itemsPerPage}
            onPageChange={pagination.onPageChange}
          />
        </div>
      )}
    </div>
  );
}

DataTable.displayName = 'DataTable';
