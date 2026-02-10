/**
 * Checkbox Component
 * Accessible checkbox with indeterminate state support
 */

import React, { forwardRef, useId, useEffect, useRef } from 'react';
import { cn } from '@/utils/cn';
import { Label, Text } from '@/components/ui/Text/Text';
import { BaseFormControlProps } from './types';
import {
  getControlState,
  getLabelStyles,
  getFeedbackStyles,
  getFeedbackIcon,
} from './utils';

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'>,
    Omit<BaseFormControlProps, 'variant' | 'fullWidth'> {
  /** Indeterminate state (for "select all" scenarios) */
  indeterminate?: boolean;
  
  /** Label position */
  labelPosition?: 'left' | 'right';
  
  /** Description text below label */
  description?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      // Form control props
      label,
      helperText,
      error,
      success,
      warning,
      size = 'md',
      required,
      disabled,
      readOnly,
      className,
      id: providedId,
      name,
      
      // Checkbox props
      indeterminate = false,
      labelPosition = 'right',
      description,
      checked,
      onChange,
      
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const id = providedId || generatedId;
    const checkboxRef = useRef<HTMLInputElement | null>(null);

    const state = getControlState(error, success, warning);

    // Handle indeterminate state
    useEffect(() => {
      if (checkboxRef.current) {
        checkboxRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    const handleRef = (node: HTMLInputElement | null) => {
      checkboxRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    };

    const sizeStyles = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
    };

    const feedbackMessage = error || success || warning || helperText;
    const feedbackState = error ? 'error' : success ? 'success' : warning ? 'warning' : 'default';

    const checkboxElement = (
      <div className="relative flex items-center">
        <input
          ref={handleRef}
          type="checkbox"
          id={id}
          name={name}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          aria-invalid={state === 'error'}
          aria-describedby={
            feedbackMessage ? `${id}-feedback` : description ? `${id}-description` : undefined
          }
          aria-required={required}
          className={cn(
            // Base styles
            sizeStyles[size],
            'rounded border-2 transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-offset-2',
            
            // Default state
            'border-border bg-surface',
            'checked:bg-primary checked:border-primary',
            'indeterminate:bg-primary indeterminate:border-primary',
            
            // Focus state
            'focus:ring-primary/20',
            state === 'error' && 'focus:ring-error/20',
            state === 'success' && 'focus:ring-success/20',
            state === 'warning' && 'focus:ring-warning/20',
            
            // Error/Success/Warning states
            state === 'error' && 'border-error checked:bg-error checked:border-error',
            state === 'success' && 'border-success checked:bg-success checked:border-success',
            state === 'warning' && 'border-warning checked:bg-warning checked:border-warning',
            
            // Hover state
            !disabled && !readOnly && 'hover:border-primary cursor-pointer',
            
            // Disabled state
            disabled && 'opacity-50 cursor-not-allowed',
            readOnly && 'cursor-default',
            
            className
          )}
          {...props}
        />
        
        {/* Custom checkmark */}
        <svg
          className={cn(
            'absolute inset-0 w-full h-full pointer-events-none',
            'text-white',
            !checked && !indeterminate && 'opacity-0'
          )}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={3}
        >
          {indeterminate ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          )}
        </svg>
      </div>
    );

    const labelElement = label && (
      <div className="flex-1">
        <Label
          as="label"
          htmlFor={id}
          className={cn(
            getLabelStyles(state, disabled, required),
            'cursor-pointer select-none',
            disabled && 'cursor-not-allowed',
            readOnly && 'cursor-default'
          )}
        >
          {label}
          {required && (
            <Text as="span" className="text-error ml-1" aria-label="required">
              *
            </Text>
          )}
        </Label>
        
        {description && (
          <Text
            id={`${id}-description`}
            variant="body-sm"
            className="text-copy-light mt-0.5"
          >
            {description}
          </Text>
        )}
      </div>
    );

    return (
      <div className="space-y-1.5">
        {/* Checkbox and Label */}
        <div className={cn('flex items-start gap-2', labelPosition === 'left' && 'flex-row-reverse')}>
          {checkboxElement}
          {labelElement}
        </div>

        {/* Feedback Message */}
        {feedbackMessage && (
          <div
            id={`${id}-feedback`}
            className="flex items-start gap-1.5 ml-7"
            role={feedbackState === 'error' ? 'alert' : 'status'}
            aria-live="polite"
          >
            {getFeedbackIcon(feedbackState)}
            <Text
              variant="body-sm"
              className={getFeedbackStyles(feedbackState)}
            >
              {feedbackMessage}
            </Text>
          </div>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
