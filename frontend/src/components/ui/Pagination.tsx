import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  showingStart: number;
  showingEnd: number;
  itemName?: string;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  showingStart,
  showingEnd,
  itemName = 'items',
  className = '',
}) => {
  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const start = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
      const end = Math.min(totalPages, start + maxVisiblePages - 1);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className={`flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 ${className}`}>
      <div className="text-sm text-copy-light text-center sm:text-left">
        Showing <span className="font-medium">{showingStart}</span> to{' '}
        <span className="font-medium">{showingEnd}</span> of{' '}
        <span className="font-medium">{totalItems}</span> {itemName}
      </div>
      
      <div className="flex items-center justify-center space-x-1 sm:space-x-2">
        {/* Previous button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center px-2 py-1 sm:px-3 sm:py-1 border border-border rounded-md text-sm text-copy-light bg-background disabled:opacity-50 disabled:cursor-not-allowed hover:bg-surface-hover transition-colors"
          aria-label="Previous page"
        >
          <ChevronLeftIcon size={16} className="sm:mr-1" />
          <span className="hidden sm:inline">Previous</span>
        </button>
        
        {/* Page numbers */}
        <div className="flex items-center space-x-1">
          {getPageNumbers().map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`px-2 py-1 sm:px-3 sm:py-1 text-sm rounded-md min-w-[32px] transition-colors ${
                currentPage === pageNum
                  ? 'bg-primary text-white'
                  : 'border border-border text-copy hover:bg-surface-hover'
              }`}
              aria-label={`Go to page ${pageNum}`}
              aria-current={currentPage === pageNum ? 'page' : undefined}
            >
              {pageNum}
            </button>
          ))}
        </div>
        
        {/* Next button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center px-2 py-1 sm:px-3 sm:py-1 border border-border rounded-md text-sm text-copy-light bg-background disabled:opacity-50 disabled:cursor-not-allowed hover:bg-surface-hover transition-colors"
          aria-label="Next page"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRightIcon size={16} className="sm:ml-1" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;