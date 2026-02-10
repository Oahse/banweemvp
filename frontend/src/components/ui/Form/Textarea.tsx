/**
 * Textarea Component
 * Multi-line text input with auto-resize and character counting
 */

import React, { forwardRef, useState, useId, useEffect, useRef } from 'react';
import { cn } from '@/utils/cn';
import { Label, Text } from '@/components/ui/Text/Text';
import {
  BaseFormControlProps,
  CharacterLimitProps,
} from './types';
import {
  getControlState,
  getBaseControlStyles,
  getSizeStyles,
  getLabelStyles,
  getFeedbackStyles,
  getFeedbackIcon,
} from './utils';

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'>,
    BaseFormControlProps,
    CharacterLimitProps {
  /** Minimum number of rows */
  minRows?: number;
  
  /** Maximum number of rows */
  maxRows?: number;
  
  /** Auto-resize based on content */
  autoResize?: boolean;
  
  /** Rounded corners */
  rounded?: 'sm' | 'md' | 'lg';
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
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
      
      // Character limit props
      maxLength,
      showCount,
      
      // Textarea props
      minRows = 3,
      maxRows,
      autoResize = false,
      rounded = 'md',
      rows,
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
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    const state = getControlState(error, success, warning);

    // Auto-resize functionality
    useEffect(() => {
      if (autoResize && textareaRef.current) {
        const textarea = textareaRef.current;
        textarea.style.height = 'auto';
        
        const lineHeight = parseInt(getComputedStyle(textarea).lineHeight);
        const minHeight = minRows * lineHeight;
        const maxHeight = maxRows ? maxRows * lineHeight : Infinity;
        
        const newHeight = Math.min(
          Math.max(textarea.scrollHeight, minHeight),
          maxHeight
        );
        
        textarea.style.height = `${newHeight}px`;
      }
    }, [value, autoResize, minRows, maxRows]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (showCount) {
        setCharCount(e.target.value.length);
      }
      onChange?.(e);
    };

    const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    const handleRef = (node: HTMLTextAreaElement | null) => {
      textareaRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    };

    const roundedStyles = {
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
    };

    const feedbackMessage = error || success || warning || helperText;
    const feedbackState = error ? 'error' : success ? 'success' : warning ? 'warning' : 'default';

    return (
      <div className={cn('space-y-1.5', fullWidth && 'w-full')}>
        {/* Label */}
        {label && (
          <div className="flex items-center justify-between">
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
            
            {/* Character Count */}
            {showCount && (
              <Text
                variant="caption"
                className={cn(
                  'tabular-nums',
                  maxLength && charCount > maxLength ? 'text-error' : 'text-copy-light'
                )}
              >
                {charCount}
                {maxLength && `/${maxLength}`}
              </Text>
            )}
          </div>
        )}

        {/* Textarea */}
        <textarea
          ref={handleRef}
          id={id}
          name={name}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          maxLength={maxLength}
          rows={autoResize ? minRows : rows}
          aria-invalid={state === 'error'}
          aria-describedby={
            feedbackMessage ? `${id}-feedback` : undefined
          }
          aria-required={required}
          className={cn(
            getBaseControlStyles(variant, state, disabled),
            getSizeStyles(size),
            roundedStyles[rounded],
            'resize-none',
            autoResize && 'overflow-hidden',
            !autoResize && 'resize-y',
            readOnly && 'cursor-default',
            className
          )}
          {...props}
        />

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

Textarea.displayName = 'Textarea';
