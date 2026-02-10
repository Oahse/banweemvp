/**
 * Form Control Utilities
 * Shared utilities for form controls
 */

import React from 'react';
import { FormControlSize, FormControlVariant, FormControlState } from './types';
import { cn } from '@/utils/cn';

/**
 * Generate a unique ID for form controls
 */
export const generateId = (prefix: string = 'form-control'): string => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Get the current state based on error/success/warning props
 */
export const getControlState = (
  error?: string,
  success?: string,
  warning?: string
): FormControlState => {
  if (error) return 'error';
  if (success) return 'success';
  if (warning) return 'warning';
  return 'default';
};

/**
 * Get base input/control styles
 */
export const getBaseControlStyles = (
  variant: FormControlVariant,
  state: FormControlState,
  disabled?: boolean
) => {
  const variantStyles = {
    default: cn(
      'bg-surface border border-border',
      'focus:border-primary focus:ring-2 focus:ring-primary/20',
      state === 'error' && 'border-error focus:border-error focus:ring-error/20',
      state === 'success' && 'border-success focus:border-success focus:ring-success/20',
      state === 'warning' && 'border-warning focus:border-warning focus:ring-warning/20'
    ),
    filled: cn(
      'bg-surface-hover border border-transparent',
      'focus:bg-surface focus:border-primary focus:ring-2 focus:ring-primary/20',
      state === 'error' && 'bg-error/5 border-error focus:border-error focus:ring-error/20',
      state === 'success' && 'bg-success/5 border-success focus:border-success focus:ring-success/20',
      state === 'warning' && 'bg-warning/5 border-warning focus:border-warning focus:ring-warning/20'
    ),
    outlined: cn(
      'bg-transparent border-2 border-border',
      'focus:border-primary',
      state === 'error' && 'border-error focus:border-error',
      state === 'success' && 'border-success focus:border-success',
      state === 'warning' && 'border-warning focus:border-warning'
    ),
  };

  return cn(
    // Base styles
    'w-full text-copy placeholder:text-copy-muted',
    'transition-all duration-200 ease-in-out',
    'focus:outline-none',
    
    // Variant styles
    variantStyles[variant],
    
    // Disabled state
    disabled && 'bg-surface-disabled cursor-not-allowed opacity-60'
  );
};

/**
 * Get size-specific styles
 */
export const getSizeStyles = (size: FormControlSize) => {
  const sizeMap = {
    sm: 'px-3 py-1.5 text-sm min-h-[32px]',
    md: 'px-4 py-2 text-sm min-h-[40px]',
    lg: 'px-4 py-3 text-base min-h-[48px]',
  };
  
  return sizeMap[size];
};

/**
 * Get icon size based on control size
 */
export const getIconSize = (size: FormControlSize) => {
  const sizeMap = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };
  
  return sizeMap[size];
};

/**
 * Get icon container width based on control size
 */
export const getIconContainerWidth = (size: FormControlSize) => {
  const sizeMap = {
    sm: 'w-8',
    md: 'w-10',
    lg: 'w-12',
  };
  
  return sizeMap[size];
};

/**
 * Get padding for inputs with prefix/suffix
 */
export const getAffixPadding = (
  size: FormControlSize,
  hasPrefix?: boolean,
  hasSuffix?: boolean
) => {
  const paddingMap = {
    sm: { prefix: 'pl-8', suffix: 'pr-8' },
    md: { prefix: 'pl-10', suffix: 'pr-10' },
    lg: { prefix: 'pl-12', suffix: 'pr-12' },
  };
  
  return cn(
    hasPrefix && paddingMap[size].prefix,
    hasSuffix && paddingMap[size].suffix
  );
};

/**
 * Get label styles
 */
export const getLabelStyles = (
  state: FormControlState,
  disabled?: boolean,
  required?: boolean
) => {
  return cn(
    'block text-sm font-medium text-copy transition-colors',
    state === 'error' && 'text-error',
    state === 'success' && 'text-success',
    state === 'warning' && 'text-warning',
    disabled && 'text-copy-muted opacity-60'
  );
};

/**
 * Get feedback message styles
 */
export const getFeedbackStyles = (state: FormControlState) => {
  const stateMap = {
    default: 'text-copy-light',
    error: 'text-error',
    success: 'text-success',
    warning: 'text-warning',
  };
  
  return stateMap[state];
};

/**
 * Get feedback icon
 */
export const getFeedbackIcon = (state: FormControlState) => {
  if (state === 'error') {
    return (
      <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
    );
  }
  
  if (state === 'success') {
    return (
      <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    );
  }
  
  if (state === 'warning') {
    return (
      <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
    );
  }
  
  return null;
};
