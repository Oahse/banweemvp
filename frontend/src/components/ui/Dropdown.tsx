import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ChevronDownIcon, CheckIcon, XIcon } from 'lucide-react';
import { cn } from '@/utils/cn';
import { Button } from '@/components/ui/Button';
import { Text } from '@/components/ui/Text/Text';

interface DropdownOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface DropdownProps {
  options: DropdownOption[];
  value?: string;
  placeholder?: string;
  onChange: (value: string) => void;
  className?: string;
  disabled?: boolean;
  searchable?: boolean;
  searchPlaceholder?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  placeholder = 'Select an option',
  onChange,
  className = '',
  disabled = false,
  searchable = false,
  searchPlaceholder = 'Search...'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<DropdownOption | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Filter options based on search term
  const filteredOptions = useMemo(() => {
    if (!searchTerm) return options;
    
    const lowerSearchTerm = searchTerm.toLowerCase();
    return options.filter(option => 
      option.label.toLowerCase().includes(lowerSearchTerm) ||
      option.value.toLowerCase().includes(lowerSearchTerm)
    );
  }, [options, searchTerm]);

  useEffect(() => {
    const option = options.find(opt => opt.value === value);
    setSelectedOption(option || null);
  }, [value, options]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        // Clear search when dropdown closes
        if (searchable) {
          setSearchTerm('');
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [searchable]);

  useEffect(() => {
    // Focus search input when dropdown opens
    if (isOpen && searchable && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 0);
    }
  }, [isOpen, searchable]);

  const handleSelect = (option: DropdownOption) => {
    if (option.disabled) return;
    setSelectedOption(option);
    onChange(option.value);
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const handleToggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      if (!isOpen && searchable) {
        setSearchTerm('');
      }
    }
  };

  const displayText = selectedOption ? selectedOption.label : placeholder;

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={handleToggleDropdown}
        disabled={disabled}
        className={cn(
          'w-full flex items-center justify-between gap-2 px-2.5 py-2.5 text-left text-xs',
          'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm transition-colors',
          disabled
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer',
          className
        )}
      >
        <span className={cn(
          'truncate flex-1',
          selectedOption ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'
        )}>
          {displayText}
        </span>
        <ChevronDownIcon 
          className={cn(
            'w-3.5 h-3.5 transition-transform flex-shrink-0',
            isOpen ? 'rotate-180' : ''
          )} 
        />
      </button>

      {isOpen && (
        <div className={cn(
          'absolute z-50 w-full mt-1 rounded-lg border shadow-lg',
          'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
        )}>
          {searchable && (
            <div className="p-1.5 border-b border-gray-200 dark:border-gray-700">
              <div className="relative">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={searchPlaceholder}
                  className={cn(
                    'w-full pl-2.5 pr-7 py-1.5 text-xs border rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary',
                    'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white',
                    'placeholder-gray-500 dark:placeholder-gray-400'
                  )}
                />
                {searchTerm && (
                  <Button
                    type="button"
                    onClick={handleClearSearch}
                    variant="ghost"
                    size="xs"
                    className="absolute right-1.5 top-1/2 transform -translate-y-1/2 p-0.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                  >
                    <XIcon className="w-3.5 h-3.5" />
                  </Button>
                )}
              </div>
            </div>
          )}
          
          <div className="max-h-60 overflow-auto py-1">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleSelect(option)}
                  disabled={option.disabled}
                  className={cn(
                    'w-full px-2.5 py-1.5 text-left text-xs transition-colors flex items-center justify-between gap-2',
                    'hover:bg-gray-100 dark:hover:bg-gray-700',
                    option.disabled && 'opacity-50 cursor-not-allowed',
                    value === option.value && 'bg-primary/10 text-primary font-medium'
                  )}
                >
                  <span className="truncate flex-1">{option.label}</span>
                  {value === option.value && (
                    <CheckIcon className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                  )}
                </button>
              ))
            ) : (
              <div className="px-2.5 py-1.5 text-xs text-gray-500 dark:text-gray-400 text-center">
                {searchTerm ? 'No options found' : 'No options available'}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
