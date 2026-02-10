/**
 * Input Component
 * Universal text input with full form control features
 */

import React, { forwardRef, useState, useId } from 'react';
import { cn } from '@/utils/cn';
import { Label, Text } from '@/components/ui/Text/Text';
import {
  BaseFormControlProps,
  AffixProps,
  CharacterLimitProps,
} from './types';
import {
  generateId,
  getControlState,
  getBaseControlStyles,
  getSizeStyles,
  getIconSize,
  getIconContainerWidth,
  getAffixPadding,
  getLabelStyles,
  getFeedbackStyles,
  getFeedbackIcon,
} from './utils';

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'>,
    BaseFormControlProps,
    AffixProps,
    CharacterLimitProps {
  /** Input type */
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
  
  /** Rounded corners */
  rounded?: 'sm' | 'md' | 'lg' | 'full';
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      // Form control props
      label,
      helperText,
      error,
      success,
      warning,
      size = 'md',
      variant = 'default',
      fullWidth = true,
      required,
      disabled,
      readOnly,
      className,
      id: providedId,
      name,
      
      // Affix props
      prefix,
      suffix,
      
      // Character limit props
      maxLength,
      showCount,
      
      // Input props
      type = 'text',
      rounded = 'md',
      value,
      onChange,
      onFocus,
      onBlur,
      
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const id = providedId || generatedId;
    const [isFocused, setIsFocused] = useState(false);
    const [charCount, setCharCount] = useState(
      typeof value === 'string' ? value.length : 0
    );

    const state = getControlState(error, success, warning);
    const hasPrefix = Boolean(prefix);
    const hasSuffix = Boolean(suffix) || showCount;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (showCount) {
        setCharCount(e.target.value.length);
      }
      onChange?.(e);
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    const roundedStyles = {
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      full: 'rounded-full',
    };

    const feedbackMessage = error || success || warning || helperText;
    const feedbackState = error ? 'error' : success ? 'success' : warning ? 'warning' : 'default';

    return (
      <div className={cn('space-y-1.5', fullWidth && 'w-full')}>
        {/* Label */}
        {label && (
          <Label
            as="label"
            htmlFor={id}
            className={getLabelStyles(state, disabled, required)}
          >
            {label}
            {required && (
              <Text as="span" className="text-error ml-1" aria-label="required">
                *
              </Text>
            )}
          </Label>
        )}

        {/* Input Container */}
        <div className="relative">
          {/* Prefix */}
          {prefix && (
            <div
              className={cn(
                'absolute inset-y-0 left-0 flex items-center justify-center',
                getIconContainerWidth(size),
                'text-copy-light pointer-events-none',
                state === 'error' && 'text-error',
                state === 'success' && 'text-success',
                state === 'warning' && 'text-warning',
                isFocused && state === 'default' && 'text-primary'
              )}
            >
              <span className={getIconSize(size)}>{prefix}</span>
            </div>
          )}

          {/* Input */}
          <input
            ref={ref}
            id={id}
            name={name}
            type={type}
            value={value}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={disabled}
            readOnly={readOnly}
            required={required}
            maxLength={maxLength}
            aria-invalid={state === 'error'}
            aria-describedby={
              feedbackMessage ? `${id}-feedback` : undefined
            }
            aria-required={required}
            className={cn(
              getBaseControlStyles(variant, state, disabled),
              getSizeStyles(size),
              roundedStyles[rounded],
              getAffixPadding(size, hasPrefix, hasSuffix),
              readOnly && 'cursor-default',
              className
            )}
            {...props}
          />

          {/* Suffix or Character Count */}
          {(suffix || showCount) && (
            <div
              className={cn(
                'absolute inset-y-0 right-0 flex items-center justify-center',
                getIconContainerWidth(size),
                'text-copy-light pointer-events-none',
                state === 'error' && 'text-error',
                state === 'success' && 'text-success',
                state === 'warning' && 'text-warning',
                isFocused && state === 'default' && 'text-primary'
              )}
            >
              {showCount ? (
                <Text
                  variant="caption"
                  className={cn(
                    'tabular-nums',
                    maxLength && charCount > maxLength && 'text-error'
                  )}
                >
                  {charCount}
                  {maxLength && `/${maxLength}`}
                </Text>
              ) : (
                <span className={getIconSize(size)}>{suffix}</span>
              )}
            </div>
          )}
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

Input.displayName = 'Input';
