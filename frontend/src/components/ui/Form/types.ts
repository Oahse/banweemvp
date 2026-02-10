/**
 * Form Control Types
 * Shared type definitions for all form controls
 */

import { ReactNode } from 'react';

export type FormControlSize = 'sm' | 'md' | 'lg';
export type FormControlVariant = 'default' | 'filled' | 'outlined';
export type FormControlState = 'default' | 'error' | 'success' | 'warning';

/**
 * Base props shared across all form controls
 */
export interface BaseFormControlProps {
  /** Label text or element */
  label?: string | ReactNode;
  
  /** Helper text displayed below the control */
  helperText?: string;
  
  /** Error message - takes precedence over success/warning */
  error?: string;
  
  /** Success message */
  success?: string;
  
  /** Warning message */
  warning?: string;
  
  /** Size variant */
  size?: FormControlSize;
  
  /** Visual variant */
  variant?: FormControlVariant;
  
  /** Whether the control takes full width */
  fullWidth?: boolean;
  
  /** Whether the field is required */
  required?: boolean;
  
  /** Whether the field is disabled */
  disabled?: boolean;
  
  /** Whether the field is read-only */
  readOnly?: boolean;
  
  /** Custom class name */
  className?: string;
  
  /** ID for the control */
  id?: string;
  
  /** Name attribute */
  name?: string;
}

/**
 * Props for controls with prefix/suffix support
 */
export interface AffixProps {
  /** Icon or text to display before the input */
  prefix?: ReactNode;
  
  /** Icon or text to display after the input */
  suffix?: ReactNode;
}

/**
 * Props for controls with character limits
 */
export interface CharacterLimitProps {
  /** Maximum character length */
  maxLength?: number;
  
  /** Whether to show character counter */
  showCount?: boolean;
}

/**
 * Validation state
 */
export interface ValidationState {
  isValid: boolean;
  message?: string;
  type?: 'error' | 'success' | 'warning';
}

/**
 * Form control context value
 */
export interface FormControlContextValue {
  id: string;
  name?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  error?: string;
  size?: FormControlSize;
  variant?: FormControlVariant;
}
