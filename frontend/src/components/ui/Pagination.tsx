import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Text } from '@/components/ui/Text/Text';

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
        Showing <Text as="span" className="font-medium">{showingStart}</Text> to {' '}
        <Text as="span" className="font-medium">{showingEnd}</Text> of{' '}
        <Text as="span" className="font-medium">{totalItems}</Text> {itemName}
      </div>
      
      <div className="flex items-center justify-center space-x-1 sm:space-x-2">
        {/* Previous button */}
        <Button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          variant="outline"
          size="xs"
          leftIcon={<ChevronLeftIcon className="w-4 h-4 flex-shrink-0" />}
          className="flex items-center justify-center h-8 px-3 py-1 sm:px-4 sm:py-1 border border-border rounded-md text-sm text-copy-light bg-background disabled:opacity-50 disabled:cursor-not-allowed hover:bg-surface-hover transition-colors"
        >
          
          <Text  as="span" className="hidden sm:inline ml-2">Previous</Text>
        </Button>
        
        
        {/* Page numbers */}
        <div className="flex items-center space-x-1">
          {getPageNumbers().map((pageNum) => (
            <Button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              variant={currentPage === pageNum ? 'primary' : 'ghost'}
              size="xs"
              className={`flex items-center justify-center h-8 w-8 px-2 py-1 text-sm rounded-md transition-colors ${
                currentPage === pageNum
                  ? 'bg-primary text-white border-primary'
                  : 'text-copy hover:bg-surface-hover border-border'
              }`}
              aria-current={currentPage === pageNum ? 'page' : undefined}
            >
              {pageNum}
            </Button>
          ))}
        </div>
        
        {/* Next button */}
        <Button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          variant="outline"
          size="xs"
          rightIcon={<ChevronRightIcon className="w-4 h-4" />}
          className="flex items-center justify-center h-8 px-3 py-1 sm:px-4 sm:py-1 border border-border rounded-md text-sm text-copy-light bg-background disabled:opacity-50 disabled:cursor-not-allowed hover:bg-surface-hover transition-colors"
        >
          <Text as="span" className="hidden sm:inline mr-2 whitespace-nowrap">Next</Text>
        </Button>
      </div>
    </div>
  );
};

export default Pagination;