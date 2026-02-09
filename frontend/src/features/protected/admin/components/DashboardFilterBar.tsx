import React, { useState, useEffect } from 'react';
import { Calendar, Filter, X, ChevronDown } from 'lucide-react';
import { apiClient } from '@/api/client';
import { Dropdown } from '@/components/ui/Dropdown';
import { DateTimeDropdown } from '@/components/ui/DateTimeDropdown';
import { Button } from '@/components/ui/Button';

export interface DashboardFilters {
  dateRange: 'today' | 'week' | 'month' | 'year' | 'quarter' | 'custom';
  startDate?: string;
  endDate?: string;
}

interface DashboardFilterBarProps {
  filters: DashboardFilters;
  onFiltersChange: (filters: DashboardFilters) => void;
  onReset: () => void;
}

export const DashboardFilterBar: React.FC<DashboardFilterBarProps> = ({
  filters,
  onFiltersChange,
  onReset,
}) => {
  const [categories, setCategories] = useState<Array<{id: string, name: string}>>([]);
  const [loadingCategories, setLoadingCategories] = useState(false);

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        const response = await apiClient.get('/categories');
        setCategories(response.data?.categories || []);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
        setCategories([]);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  const handleDateRangeChange = (range: DashboardFilters['dateRange']) => {
    onFiltersChange({ ...filters, dateRange: range });
  };

  const handleStartDateChange = (date: string) => {
    onFiltersChange({ ...filters, startDate: date });
  };

  const handleEndDateChange = (date: string) => {
    onFiltersChange({ ...filters, endDate: date });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          <h3 className="font-semibold text-gray-900 dark:text-white">Filters</h3>
        </div>
        <Button
          onClick={onReset}
          variant="ghost"
          size="sm"
          className="flex items-center gap-2 px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
          leftIcon={<X className="w-4 h-4" />}
        >
          Reset
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Date Range Buttons */}
        <div className="lg:col-span-5">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Date Range
          </label>
          <div className="flex gap-2">
            {['today', 'week', 'month', 'year', 'quarter', 'custom'].map((range) => (
              <Button
                key={range}
                onClick={() => handleDateRangeChange(range as DashboardFilters['dateRange'])}
                variant={filters.dateRange === range ? "primary" : "ghost"}
                size="sm"
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors capitalize ${
                  filters.dateRange === range
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {range}
              </Button>
            ))}
          </div>
        </div>

        {/* Custom Date Range */}
        {filters.dateRange === 'custom' && (
          <div className="lg:col-span-5 grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Start Date
              </label>
              <DateTimeDropdown
                value={filters.startDate}
                onChange={handleStartDateChange}
                placeholder="Start Date"
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                End Date
              </label>
              <DateTimeDropdown
                value={filters.endDate}
                onChange={handleEndDateChange}
                placeholder="End Date"
                className="w-full"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardFilterBar;
