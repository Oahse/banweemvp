/**
 * Modal Utilities
 * Helper functions for modal behavior
 */

/**
 * Get focusable elements within a container
 */
export const getFocusableElements = (container: HTMLElement): HTMLElement[] => {
  const selector = [
    'a[href]',
    'button:not([disabled])',
    'textarea:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(',');

  return Array.from(container.querySelectorAll<HTMLElement>(selector)).filter(
    (el) => !el.hasAttribute('disabled') && el.offsetParent !== null
  );
};

/**
 * Trap focus within modal
 */
export const trapFocus = (container: HTMLElement, event: KeyboardEvent) => {
  const focusableElements = getFocusableElements(container);
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  if (event.key !== 'Tab') return;

  if (event.shiftKey) {
    // Shift + Tab
    if (document.activeElement === firstElement) {
      event.preventDefault();
      lastElement?.focus();
    }
  } else {
    // Tab
    if (document.activeElement === lastElement) {
      event.preventDefault();
      firstElement?.focus();
    }
  }
};

/**
 * Get size classes for modal
 */
export const getModalSizeClasses = (size: string): string => {
  const sizeMap: Record<string, string> = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    fullscreen: 'max-w-full h-full m-0 rounded-none',
  };

  return sizeMap[size] || sizeMap.md;
};

/**
 * Get variant classes for modal
 */
export const getModalVariantClasses = (variant: string, isDark: boolean): string => {
  const variantMap: Record<string, { light: string; dark: string }> = {
    default: {
      light: 'bg-white text-gray-900',
      dark: 'bg-gray-800 text-white',
    },
    danger: {
      light: 'bg-white text-gray-900 border-red-500',
      dark: 'bg-gray-800 text-white border-red-500',
    },
    success: {
      light: 'bg-white text-gray-900 border-green-500',
      dark: 'bg-gray-800 text-white border-green-500',
    },
    warning: {
      light: 'bg-white text-gray-900 border-yellow-500',
      dark: 'bg-gray-800 text-white border-yellow-500',
    },
  };

  const classes = variantMap[variant] || variantMap.default;
  return isDark ? classes.dark : classes.light;
};

/**
 * Prevent body scroll
 */
export const preventBodyScroll = (prevent: boolean) => {
  if (typeof document === 'undefined') return;

  if (prevent) {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbarWidth}px`;
  } else {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  }
};

/**
 * Generate unique ID
 */
export const generateId = (prefix: string): string => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
};
