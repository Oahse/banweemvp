/**
 * Card Component Utilities
 * Shared utilities for styling and behavior
 */

import { CardVariant, CardSize, CardDensity, CardOrientation } from './types';

/**
 * Get variant styles
 */
export const getVariantStyles = (variant: CardVariant): string => {
  const variants = {
    default: 'bg-surface border border-border',
    outlined: 'bg-surface border-2 border-border-strong',
    elevated: 'bg-surface shadow-md',
    ghost: 'bg-transparent',
  };
  
  return variants[variant];
};

/**
 * Get size-based padding
 */
export const getSizePadding = (size: CardSize, density: CardDensity): string => {
  const paddingMap = {
    compact: {
      sm: 'p-3',
      md: 'p-4',
      lg: 'p-5',
    },
    comfortable: {
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    },
  };
  
  return paddingMap[density][size];
};

/**
 * Get size-based spacing
 */
export const getSizeSpacing = (size: CardSize): string => {
  const spacingMap = {
    sm: 'space-y-2',
    md: 'space-y-3',
    lg: 'space-y-4',
  };
  
  return spacingMap[size];
};

/**
 * Get orientation styles
 */
export const getOrientationStyles = (orientation: CardOrientation): string => {
  return orientation === 'horizontal' 
    ? 'flex flex-row items-stretch' 
    : 'flex flex-col';
};

/**
 * Get interactive styles
 */
export const getInteractiveStyles = (
  clickable: boolean,
  selectable: boolean,
  selected: boolean,
  disabled: boolean,
  hoverable: boolean
): string => {
  const styles: string[] = [];
  
  if (disabled) {
    styles.push('opacity-50 cursor-not-allowed');
    return styles.join(' ');
  }
  
  if (clickable || selectable) {
    styles.push(
      'cursor-pointer',
      'transition-all duration-200',
      'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2',
      'active:scale-[0.98]'
    );
  }
  
  if (hoverable || clickable) {
    styles.push(
      'hover:shadow-lg hover:border-border-strong',
      'hover:-translate-y-0.5'
    );
  }
  
  if (selectable && selected) {
    styles.push(
      'ring-2 ring-primary border-primary',
      'bg-primary/5'
    );
  }
  
  return styles.join(' ');
};

/**
 * Get media placement styles
 */
export const getMediaPlacementStyles = (
  placement: 'top' | 'left' | 'right' | 'background',
  orientation: CardOrientation
): { container: string; media: string; content: string } => {
  if (placement === 'background') {
    return {
      container: 'relative',
      media: 'absolute inset-0 z-0',
      content: 'relative z-10',
    };
  }
  
  if (placement === 'top') {
    return {
      container: 'flex flex-col',
      media: 'w-full',
      content: 'flex-1',
    };
  }
  
  if (placement === 'left') {
    return {
      container: 'flex flex-row',
      media: orientation === 'horizontal' ? 'w-1/3' : 'w-full',
      content: 'flex-1',
    };
  }
  
  // right
  return {
    container: 'flex flex-row-reverse',
    media: orientation === 'horizontal' ? 'w-1/3' : 'w-full',
    content: 'flex-1',
  };
};

/**
 * Get aspect ratio styles
 */
export const getAspectRatioStyles = (aspectRatio: string): string => {
  const ratioMap: Record<string, string> = {
    '1/1': 'aspect-square',
    '4/3': 'aspect-[4/3]',
    '16/9': 'aspect-video',
    '21/9': 'aspect-[21/9]',
  };
  
  return ratioMap[aspectRatio] || '';
};
