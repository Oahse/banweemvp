/**
 * Radio Component
 * Accessible radio button
 */

import React, { forwardRef, useId } from 'react';
import { cn } from '@/utils/cn';
import { Label, Text } from '@/components/ui/Text/Text';
import { BaseFormControlProps } from './types';
import {
  getControlState,
  getLabelStyles,
  getFeedbackStyles,
  getFeedbackIcon,
} from './utils';

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'>,
    Omit<BaseFormControlProps, 'variant' | 'fullWidth'> {
  /** Label position */
  labelPosition?: 'left' | 'right';
  
  /** Description text or element below label */
  description?: string | React.ReactNode;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
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
      
      // Radio props
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

    const state = getControlState(error, success, warning);

    const sizeStyles = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
    };

    const feedbackMessage = error || success || warning || helperText;
    const feedbackState = error ? 'error' : success ? 'success' : warning ? 'warning' : 'default';

    const radioElement = (
      <div className="relative flex items-center">
        <input
          ref={ref}
          type="radio"
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
            'rounded-full border-2 transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-offset-2',
            'appearance-none',
            
            // Default state
            'border-border-light bg-surface',
            'checked:bg-primary checked:border-primary',
            
            // Focus state
            'focus:ring-primary/30',
            state === 'error' && 'focus:ring-error/20',
            state === 'success' && 'focus:ring-success/20',
            state === 'warning' && 'focus:ring-warning/20',
            
            // Error/Success/Warning states
            state === 'error' && 'border-error checked:bg-error checked:border-error',
            state === 'success' && 'border-success checked:bg-success checked:border-success',
            state === 'warning' && 'border-warning checked:bg-warning checked:border-warning',
            
            // Hover state
            !disabled && !readOnly && 'hover:border-primary/60 cursor-pointer',
            !disabled && !readOnly && checked && 'hover:bg-primary-dark hover:border-primary-dark',
            
            // Disabled state
            disabled && 'opacity-50 cursor-not-allowed',
            readOnly && 'cursor-default',
            
            className
          )}
          {...props}
        />
        
        {/* Custom radio dot */}
        <div
          className={cn(
            'absolute inset-0 flex items-center justify-center pointer-events-none',
            !checked && 'opacity-0'
          )}
        >
          <div
            className={cn(
              'rounded-full bg-white',
              size === 'sm' && 'w-1.5 h-1.5',
              size === 'md' && 'w-2 h-2',
              size === 'lg' && 'w-2.5 h-2.5'
            )}
          />
        </div>
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
        {/* Radio and Label */}
        <div className={cn('flex items-start gap-2', labelPosition === 'left' && 'flex-row-reverse')}>
          {radioElement}
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

Radio.displayName = 'Radio';
