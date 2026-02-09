// Theme utility classes for consistent styling across components

export interface ThemeClasses {
  primary: string;
  secondary: string;
  success: string;
  warning: string;
  error: string;
  destructive: string;
  info: string;
  light: string;
  dark: string;
  text: {
    primary: string;
    secondary: string;
    muted: string;
    heading: string;
    error: string;
    inverse: string;
  };
  background: {
    surface: string;
    elevated: string;
    primary: string;
  };
  input: {
    base: string;
    default: string;
  };
  card: {
    base: string;
  };
  loading: {
    spinner: string;
  };
  layout: {
    container: string;
  };
  shadow: {
    sm: string;
    lg: string;
  };
  interactive: {
    hover: string;
  };
  border: {
    default: string;
  };
}

export const themeClasses: ThemeClasses = {
  primary: 'bg-[#61b482] hover:bg-[#4c9066] text-white',
  secondary: 'bg-gray-600 hover:bg-gray-700 text-white',
  success: 'bg-green-600 hover:bg-green-700 text-white',
  warning: 'bg-yellow-600 hover:bg-yellow-700 text-white',
  error: 'bg-red-600 hover:bg-red-700 text-white',
  destructive: 'bg-red-600 hover:bg-red-700 text-white',
  info: 'bg-cyan-600 hover:bg-cyan-700 text-white',
  light: 'bg-gray-100 hover:bg-gray-200 text-gray-900',
  dark: 'bg-gray-900 hover:bg-gray-800 text-white',
  text: {
    primary: 'text-gray-900 dark:text-gray-100',
    secondary: 'text-gray-700 dark:text-gray-300',
    muted: 'text-gray-500 dark:text-gray-400',
    heading: 'text-gray-900 dark:text-gray-100 font-semibold',
    error: 'text-red-600 dark:text-red-400',
    destructive: 'text-red-600 dark:text-red-400',
    inverse: 'text-white',
  },
  background: {
    surface: 'bg-white dark:bg-gray-800',
    elevated: 'bg-gray-50 dark:bg-gray-900',
    primary: 'bg-[#61b482]',
  },
  input: {
    base: 'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#61b482]',
    default: 'border-gray-300 dark:border-gray-600',
  },
  card: {
    base: 'bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm',
  },
  loading: {
    spinner: 'animate-spin border-4 border-[#61b482] border-t-transparent rounded-full',
  },
  layout: {
    container: 'container mx-auto px-4',
  },
  shadow: {
    sm: 'shadow-sm',
    lg: 'shadow-lg',
  },
  interactive: {
    hover: 'hover:bg-gray-100',
  },
  border: {
    default: 'border-gray-200',
  },
};

export function combineThemeClasses(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function getInputClasses(error?: string): string {
  const baseClasses = 'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#61b482]';
  const errorClasses = error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300';
  return combineThemeClasses(baseClasses, errorClasses);
}

export function getButtonClasses(
  variant: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'destructive' | 'info' | 'light' | 'dark' | 'outline' = 'primary',
  size: 'sm' | 'md' | 'lg' = 'md',
  disabled = false
): string {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200';
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';
  
  const variantClasses = {
    primary: themeClasses.primary,
    secondary: themeClasses.secondary,
    success: themeClasses.success,
    warning: themeClasses.warning,
    error: themeClasses.error,
    destructive: themeClasses.destructive,
    info: themeClasses.info,
    light: themeClasses.light,
    dark: themeClasses.dark,
    outline: 'border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700',
  };
  
  return combineThemeClasses(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    disabledClasses
  );
}

export function getCardClasses(elevated = false): string {
  const baseClasses = 'bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700';
  const elevatedClasses = elevated ? 'shadow-lg' : 'shadow-sm';
  return combineThemeClasses(baseClasses, elevatedClasses);
}

export function getTextClasses(
  variant: 'primary' | 'secondary' | 'muted' | 'success' | 'warning' | 'error' = 'primary',
  size: 'xs' | 'sm' | 'base' | 'lg' | 'xl' = 'base'
): string {
  const variantClasses = {
    primary: 'text-gray-900 dark:text-gray-100',
    secondary: 'text-gray-700 dark:text-gray-300',
    muted: 'text-gray-500 dark:text-gray-400',
    success: 'text-green-600 dark:text-green-400',
    warning: 'text-yellow-600 dark:text-yellow-400',
    error: 'text-red-600 dark:text-red-400',
  };

  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
  };

  return combineThemeClasses(variantClasses[variant], sizeClasses[size]);
}