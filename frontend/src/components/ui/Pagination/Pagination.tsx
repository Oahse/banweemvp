/**
 * Pagination Component
 * Universal pagination component for consistent pagination UI across the application
 */

import React, { useMemo } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft, 
  ChevronsRight 
} from 'lucide-react';
import { PaginationProps, PageItem } from './types';
import { 
  getPaginationInfo, 
  generatePageItems, 
  getDefaultTotalText 
} from './utils';
import { cn } from '@/utils/cn';
import { Button } from '@/components/ui/Button';
import { Text, Label } from '@/components/ui/Text/Text';

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
  maxVisiblePages = 7,
  showFirstLast = true,
  showEllipsis = true,
  disabled = false,
  loading = false,
  size = 'md',
  className,
  showPageSize = false,
  pageSizeOptions = [10, 20, 50, 100],
  onPageSizeChange,
  showTotal = true,
  totalText,
}) => {
  // Calculate pagination info
  const info = useMemo(
    () => getPaginationInfo(currentPage, totalItems, pageSize),
    [currentPage, totalItems, pageSize]
  );
  
  // Generate page items
  const pageItems = useMemo(
    () => generatePageItems(
      info.currentPage,
      info.totalPages,
      maxVisiblePages,
      showFirstLast,
      showEllipsis
    ),
    [info.currentPage, info.totalPages, maxVisiblePages, showFirstLast, showEllipsis]
  );
  
  // Handle page change
  const handlePageChange = (page: number) => {
    if (disabled || loading) return;
    if (page === currentPage) return;
    if (page < 1 || page > info.totalPages) return;
    onPageChange(page);
  };
  
  // Handle page size change
  const handlePageSizeChange = (newPageSize: number) => {
    if (disabled || loading || !onPageSizeChange) return;
    onPageSizeChange(newPageSize);
  };
  
  // Size variants
  const sizeClasses = {
    sm: {
      button: 'h-7 min-w-[28px] text-xs px-2',
      icon: 'w-3 h-3',
      gap: 'gap-0.5',
    },
    md: {
      button: 'h-9 min-w-[36px] text-sm px-3',
      icon: 'w-4 h-4',
      gap: 'gap-1',
    },
    lg: {
      button: 'h-11 min-w-[44px] text-base px-4',
      icon: 'w-5 h-5',
      gap: 'gap-1.5',
    },
  };
  
  const sizes = sizeClasses[size];
  
  // Render page item
  const renderPageItem = (item: PageItem, index: number) => {
    switch (item.type) {
      case 'first':
        return (
          <Button
            key={`first-${index}`}
            onClick={() => handlePageChange(1)}
            disabled={item.disabled || disabled || loading}
            aria-label="Go to first page"
            variant="outline"
            size={size}
            leftIcon={<ChevronsLeft className={sizes.icon} />}
            className={cn(sizes.button)}
          />
        );
        
      case 'previous':
        return (
          <Button
            key={`prev-${index}`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={item.disabled || disabled || loading}
            aria-label="Go to previous page"
            variant="outline"
            size={size}
            leftIcon={<ChevronLeft className={sizes.icon} />}
            className={cn(sizes.button)}
          />
        );
        
      case 'next':
        return (
          <Button
            key={`next-${index}`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={item.disabled || disabled || loading}
            aria-label="Go to next page"
            variant="outline"
            size={size}
            leftIcon={<ChevronRight className={sizes.icon} />}
            className={cn(sizes.button)}
          />
        );
        
      case 'last':
        return (
          <Button
            key={`last-${index}`}
            onClick={() => handlePageChange(info.totalPages)}
            disabled={item.disabled || disabled || loading}
            aria-label="Go to last page"
            variant="outline"
            size={size}
            leftIcon={<ChevronsRight className={sizes.icon} />}
            className={cn(sizes.button)}
          />
        );
        
      case 'page':
        return (
          <Button
            key={`page-${item.value}`}
            onClick={() => handlePageChange(item.value)}
            disabled={disabled || loading}
            aria-label={`Go to page ${item.value}`}
            aria-current={item.active ? 'page' : undefined}
            variant={item.active ? 'primary' : 'outline'}
            size={size}
            className={cn(sizes.button)}
          >
            <Text variant="body-sm">{item.value}</Text>
          </Button>
        );
        
      case 'ellipsis':
        return (
          <Text
            key={`ellipsis-${index}`}
            variant="body-sm"
            tone="secondary"
            className={cn(
              'inline-flex items-center justify-center',
              sizes.button
            )}
            aria-hidden="true"
          >
            {item.value}
          </Text>
        );
        
      default:
        return null;
    }
  };
  
  // Don't render if no items
  if (totalItems === 0) {
    return null;
  }
  
  return (
    <nav
      role="navigation"
      aria-label="Pagination"
      className={cn('flex flex-col sm:flex-row items-center justify-between gap-4', className)}
    >
      {/* Total items info */}
      {showTotal && (
        <Text variant="body-sm" tone="secondary" className="order-2 sm:order-1">
          {totalText
            ? totalText(info.totalItems, [info.startIndex, info.endIndex])
            : getDefaultTotalText(info.totalItems, [info.startIndex, info.endIndex])}
        </Text>
      )}
      
      {/* Pagination controls */}
      <div className="flex items-center order-1 sm:order-2">
        <ul className={cn('flex items-center', sizes.gap)} role="list">
          {pageItems.map((item, index) => (
            <li key={index}>
              {renderPageItem(item, index)}
            </li>
          ))}
        </ul>
      </div>
      
      {/* Page size selector */}
      {showPageSize && onPageSizeChange && (
        <div className="flex items-center gap-2 order-3">
          <Label className="whitespace-nowrap">
            Items per page:
          </Label>
          <select
            id="page-size-select"
            value={pageSize}
            onChange={(e) => handlePageSizeChange(Number(e.target.value))}
            disabled={disabled || loading}
            className={cn(
              'border border-border-light rounded-md bg-surface text-copy',
              'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
              'disabled:cursor-not-allowed disabled:opacity-50',
              sizes.button
            )}
          >
            {pageSizeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      )}
    </nav>
  );
};

Pagination.displayName = 'Pagination';
