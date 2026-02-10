import React from 'react';
import { LucideIcon } from 'lucide-react';
import { useTheme } from '@/components/shared/contexts/ThemeContext';
import { Body, Text } from '@/components/ui/Text/Text';

export interface AdminStatsCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: 'increase' | 'decrease' | 'neutral';
    period?: string;
  };
  icon?: LucideIcon;
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'indigo' | 'pink' | 'gray';
  loading?: boolean;
  error?: string;
  className?: string;
  onClick?: () => void;
}

export const AdminStatsCard: React.FC<AdminStatsCardProps> = ({
  title,
  value,
  change,
  icon: Icon,
  color = 'blue',
  loading = false,
  error,
  className = '',
  onClick
}) => {
  const { theme } = useTheme();

  const colorClasses = {
    blue: 'bg-blue-500 text-white',
    green: 'bg-green-500 text-white',
    red: 'bg-red-500 text-white',
    yellow: 'bg-yellow-500 text-white',
    purple: 'bg-purple-500 text-white',
    indigo: 'bg-indigo-500 text-white',
    pink: 'bg-pink-500 text-white',
    gray: 'bg-gray-500 text-white'
  };

  const changeColorClasses = {
    increase: 'text-green-600 bg-green-100',
    decrease: 'text-red-600 bg-red-100',
    neutral: 'text-gray-600 bg-gray-100'
  };

  const changeIcons = {
    increase: '↗',
    decrease: '↘',
    neutral: '→'
  };

  if (loading) {
    return (
      <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-3 ${className}`}>
        <div className="animate-pulse">
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-1.5"></div>
          <div className="h-2.5 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-red-200 dark:border-red-700 p-3 ${className}`}>
        <div className="text-red-600 dark:text-red-400 text-xs">{error}</div>
      </div>
    );
  }

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-2 sm:p-3 hover:shadow-md transition-shadow ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
      onClick={onClick}
    >
      <div className="flex flex-col space-y-1.5">
        {/* Icon and Title Row */}
        <div className="flex items-start justify-between">
          <Body className="text-xs sm:text-xs font-medium text-gray-600 dark:text-gray-400">{title}</Body>
          {Icon && (
            <div className={`p-1.5 sm:p-2 rounded-lg ${colorClasses[color]} shrink-0`}>
              <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </div>
          )}
        </div>
        
        {/* Value */}
        <Body className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">{value}</Body>
        
        {/* Change Indicator */}
        {change && (
          <div className="flex items-center">
            <Text className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium ${changeColorClasses[change.type]}`}>
              <Text className="mr-0.5">{changeIcons[change.type]}</Text>
              {Math.abs(change.value)}%
              {change.period && <Text className="hidden sm:inline"> {change.period}</Text>}
            </Text>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminStatsCard;
