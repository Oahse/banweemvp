// Theme class utilities for consistent styling across the application
import { cn } from './cn';

export const themeClasses = {
  // Text colors
  text: {
    primary: 'text-gray-900 dark:text-gray-100',
    secondary: 'text-gray-700 dark:text-gray-300',
    muted: 'text-gray-500 dark:text-gray-400',
    heading: 'text-gray-900 dark:text-white',
  },

  // Background colors
  background: {
    base: 'bg-white dark:bg-gray-900',
    surface: 'bg-gray-50 dark:bg-gray-800',
    elevated: 'bg-gray-100 dark:bg-gray-700',
  },

  // Border styles
  border: {
    default: 'border-gray-200 dark:border-gray-700',
    light: 'border-gray-100 dark:border-gray-800',
    strong: 'border-gray-300 dark:border-gray-600',
  },

  // Card styles
  card: {
    base: 'bg-white dark:bg-gray-800 rounded-lg shadow-sm',
  },

  // Loading states
  loading: {
    spinner: 'animate-spin',
    shimmer: 'animate-pulse',
  },
};

// Combine theme classes with additional classes
export const combineThemeClasses = (...classes: (string | undefined | null | false)[]) => {
  return cn(...classes);
};

// Button class generator
export const getButtonClasses = (variant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'success' | 'error') => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  
  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-primary-dark focus:ring-primary',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 focus:ring-gray-500',
    outline: 'border border-gray-300 bg-transparent hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800 focus:ring-gray-500',
    ghost: 'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 focus:ring-gray-500',
    success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
    error: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  };

  return cn(baseClasses, variantClasses[variant]);
};

// Input class generator
export const getInputClasses = (hasError?: boolean) => {
  const baseClasses = 'block w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  const normalClasses = 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-primary focus:ring-primary';
  const errorClasses = 'border-red-500 focus:border-red-500 focus:ring-red-500';

  return cn(baseClasses, hasError ? errorClasses : normalClasses);
};
