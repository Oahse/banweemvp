/**
 * Toggle Component
 * Switch/toggle control for boolean values
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

export interface ToggleProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'>,
    Omit<BaseFormControlProps, 'variant' | 'fullWidth'> {
  /** Label position */
  labelPosition?: 'left' | 'right';
  
  /** Description text below label */
  description?: string;
  
  /** Show on/off labels on the toggle */
  showLabels?: boolean;
  
  /** Custom on label */
  onLabel?: string;
  
  /** Custom off label */
  offLabel?: string;
}

export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
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
      
      // Toggle props
      labelPosition = 'right',
      description,
      showLabels = false,
      onLabel = 'On',
      offLabel = 'Off',
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
      sm: {
        track: 'w-9 h-5',
        thumb: 'w-4 h-4',
        translate: 'translate-x-4',
        label: 'text-[8px]',
      },
      md: {
        track: 'w-11 h-6',
        thumb: 'w-5 h-5',
        translate: 'translate-x-5',
        label: 'text-[9px]',
      },
      lg: {
        track: 'w-14 h-7',
        thumb: 'w-6 h-6',
        translate: 'translate-x-7',
        label: 'text-[10px]',
      },
    };

    const feedbackMessage = error || success || warning || helperText;
    const feedbackState = error ? 'error' : success ? 'success' : warning ? 'warning' : 'default';

    const toggleElement = (
      <div className="relative inline-flex items-center">
        {/* Hidden checkbox for accessibility */}
        <input
          ref={ref}
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
          className="sr-only peer"
          {...props}
        />
        
        {/* Toggle track */}
        <div
          className={cn(
            sizeStyles[size].track,
            'relative rounded-full transition-all duration-200',
            'focus-within:ring-2 focus-within:ring-offset-2',
            
            // Default state
            'bg-border',
            'peer-checked:bg-primary',
            
            // Focus state
            'focus-within:ring-primary/20',
            state === 'error' && 'focus-within:ring-error/20',
            state === 'success' && 'focus-within:ring-success/20',
            state === 'warning' && 'focus-within:ring-warning/20',
            
            // Error/Success/Warning states
            state === 'error' && 'peer-checked:bg-error',
            state === 'success' && 'peer-checked:bg-success',
            state === 'warning' && 'peer-checked:bg-warning',
            
            // Hover state
            !disabled && !readOnly && 'cursor-pointer hover:bg-border-hover peer-checked:hover:bg-primary-dark',
            
            // Disabled state
            disabled && 'opacity-50 cursor-not-allowed',
            readOnly && 'cursor-default',
            
            className
          )}
          onClick={() => {
            if (!disabled && !readOnly) {
              const input = document.getElementById(id) as HTMLInputElement;
              input?.click();
            }
          }}
        >
          {/* Toggle thumb */}
          <div
            className={cn(
              sizeStyles[size].thumb,
              'absolute left-0.5 top-0.5',
              'bg-white rounded-full shadow-sm',
              'transition-transform duration-200',
              size === 'sm' && 'peer-checked:translate-x-4',
              size === 'md' && 'peer-checked:translate-x-5',
              size === 'lg' && 'peer-checked:translate-x-7'
            )}
          />
          
          {/* On/Off labels */}
          {showLabels && (
            <>
              <span
                className={cn(
                  'absolute left-1.5 top-1/2 -translate-y-1/2',
                  sizeStyles[size].label,
                  'font-semibold text-white uppercase tracking-wider',
                  'transition-opacity duration-200',
                  checked ? 'opacity-100' : 'opacity-0'
                )}
              >
                {onLabel}
              </span>
              <span
                className={cn(
                  'absolute right-1.5 top-1/2 -translate-y-1/2',
                  sizeStyles[size].label,
                  'font-semibold text-copy-muted uppercase tracking-wider',
                  'transition-opacity duration-200',
                  checked ? 'opacity-0' : 'opacity-100'
                )}
              >
                {offLabel}
              </span>
            </>
          )}
        </div>
      </div>
    );

    const labelElement = label && (
      <div className="flex-1">
        <Label
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
        {/* Toggle and Label */}
        <div className={cn('flex items-start gap-3', labelPosition === 'left' && 'flex-row-reverse justify-between')}>
          {toggleElement}
          {labelElement}
        </div>

        {/* Feedback Message */}
        {feedbackMessage && (
          <div
            id={`${id}-feedback`}
            className="flex items-start gap-1.5"
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

Toggle.displayName = 'Toggle';
