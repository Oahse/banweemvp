/**
 * Pagination Utilities
 * Pure functions for pagination logic
 */

import { PaginationInfo, PageItem } from './types';

/**
 * Calculate pagination information
 */
export function getPaginationInfo(
  currentPage: number,
  totalItems: number,
  pageSize: number
): PaginationInfo {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safePage = Math.max(1, Math.min(currentPage, totalPages));
  
  const startIndex = (safePage - 1) * pageSize + 1;
  const endIndex = Math.min(safePage * pageSize, totalItems);
  
  return {
    currentPage: safePage,
    totalPages,
    totalItems,
    pageSize,
    startIndex,
    endIndex,
    hasPrevious: safePage > 1,
    hasNext: safePage < totalPages,
    isFirstPage: safePage === 1,
    isLastPage: safePage === totalPages,
  };
}

/**
 * Generate page items for rendering
 * Implements smart ellipsis logic for large page ranges
 */
export function generatePageItems(
  currentPage: number,
  totalPages: number,
  maxVisiblePages: number = 7,
  showFirstLast: boolean = true,
  showEllipsis: boolean = true
): PageItem[] {
  const items: PageItem[] = [];
  
  // Add first page button
  if (showFirstLast) {
    items.push({ type: 'first', disabled: currentPage === 1 });
  }
  
  // Add previous button
  items.push({ type: 'previous', disabled: currentPage === 1 });
  
  // Calculate page range
  if (totalPages <= maxVisiblePages) {
    // Show all pages
    for (let i = 1; i <= totalPages; i++) {
      items.push({ type: 'page', value: i, active: i === currentPage });
    }
  } else {
    // Show pages with ellipsis
    const leftSiblingIndex = Math.max(currentPage - 1, 1);
    const rightSiblingIndex = Math.min(currentPage + 1, totalPages);
    
    const showLeftEllipsis = leftSiblingIndex > 2;
    const showRightEllipsis = rightSiblingIndex < totalPages - 1;
    
    // Always show first page
    items.push({ type: 'page', value: 1, active: currentPage === 1 });
    
    // Left ellipsis
    if (showLeftEllipsis && showEllipsis) {
      items.push({ type: 'ellipsis', value: '...' });
    } else if (!showLeftEllipsis) {
      // Show page 2 if no ellipsis
      if (totalPages >= 2) {
        items.push({ type: 'page', value: 2, active: currentPage === 2 });
      }
    }
    
    // Middle pages
    for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
      if (i > 1 && i < totalPages) {
        items.push({ type: 'page', value: i, active: i === currentPage });
      }
    }
    
    // Right ellipsis
    if (showRightEllipsis && showEllipsis) {
      items.push({ type: 'ellipsis', value: '...' });
    } else if (!showRightEllipsis) {
      // Show second-to-last page if no ellipsis
      if (totalPages >= 2 && rightSiblingIndex < totalPages - 1) {
        items.push({ 
          type: 'page', 
          value: totalPages - 1, 
          active: currentPage === totalPages - 1 
        });
      }
    }
    
    // Always show last page
    if (totalPages > 1) {
      items.push({ type: 'page', value: totalPages, active: currentPage === totalPages });
    }
  }
  
  // Add next button
  items.push({ type: 'next', disabled: currentPage === totalPages });
  
  // Add last page button
  if (showFirstLast) {
    items.push({ type: 'last', disabled: currentPage === totalPages });
  }
  
  return items;
}

/**
 * Get default total text
 */
export function getDefaultTotalText(
  total: number,
  range: [number, number]
): string {
  if (total === 0) {
    return 'No items';
  }
  if (total === 1) {
    return '1 item';
  }
  return `Showing ${range[0]}–${range[1]} of ${total} items`;
}

/**
 * Clamp page number to valid range
 */
export function clampPage(page: number, totalPages: number): number {
  return Math.max(1, Math.min(page, totalPages));
}
