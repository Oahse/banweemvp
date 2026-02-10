/**
 * usePagination Hook
 * Custom hook for managing pagination state
 */

import { useState, useCallback, useMemo } from 'react';
import { getPaginationInfo } from './utils';
import { PaginationInfo } from './types';

export interface UsePaginationOptions {
  /** Initial page (1-indexed) */
  initialPage?: number;
  
  /** Initial page size */
  initialPageSize?: number;
  
  /** Total number of items */
  totalItems: number;
  
  /** Callback when page changes */
  onPageChange?: (page: number) => void;
  
  /** Callback when page size changes */
  onPageSizeChange?: (pageSize: number) => void;
}

export interface UsePaginationReturn {
  /** Current page (1-indexed) */
  currentPage: number;
  
  /** Current page size */
  pageSize: number;
  
  /** Pagination information */
  info: PaginationInfo;
  
  /** Go to specific page */
  goToPage: (page: number) => void;
  
  /** Go to next page */
  nextPage: () => void;
  
  /** Go to previous page */
  previousPage: () => void;
  
  /** Go to first page */
  firstPage: () => void;
  
  /** Go to last page */
  lastPage: () => void;
  
  /** Change page size */
  setPageSize: (size: number) => void;
  
  /** Reset to initial state */
  reset: () => void;
}

/**
 * Hook for managing pagination state
 */
export function usePagination({
  initialPage = 1,
  initialPageSize = 10,
  totalItems,
  onPageChange,
  onPageSizeChange,
}: UsePaginationOptions): UsePaginationReturn {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageSize, setPageSizeState] = useState(initialPageSize);
  
  // Calculate pagination info
  const info = useMemo(
    () => getPaginationInfo(currentPage, totalItems, pageSize),
    [currentPage, totalItems, pageSize]
  );
  
  // Go to specific page
  const goToPage = useCallback(
    (page: number) => {
      const safePage = Math.max(1, Math.min(page, info.totalPages));
      setCurrentPage(safePage);
      onPageChange?.(safePage);
    },
    [info.totalPages, onPageChange]
  );
  
  // Go to next page
  const nextPage = useCallback(() => {
    if (info.hasNext) {
      goToPage(currentPage + 1);
    }
  }, [currentPage, info.hasNext, goToPage]);
  
  // Go to previous page
  const previousPage = useCallback(() => {
    if (info.hasPrevious) {
      goToPage(currentPage - 1);
    }
  }, [currentPage, info.hasPrevious, goToPage]);
  
  // Go to first page
  const firstPage = useCallback(() => {
    goToPage(1);
  }, [goToPage]);
  
  // Go to last page
  const lastPage = useCallback(() => {
    goToPage(info.totalPages);
  }, [info.totalPages, goToPage]);
  
  // Change page size
  const setPageSize = useCallback(
    (size: number) => {
      setPageSizeState(size);
      setCurrentPage(1); // Reset to first page when page size changes
      onPageSizeChange?.(size);
    },
    [onPageSizeChange]
  );
  
  // Reset to initial state
  const reset = useCallback(() => {
    setCurrentPage(initialPage);
    setPageSizeState(initialPageSize);
  }, [initialPage, initialPageSize]);
  
  return {
    currentPage,
    pageSize,
    info,
    goToPage,
    nextPage,
    previousPage,
    firstPage,
    lastPage,
    setPageSize,
    reset,
  };
}
