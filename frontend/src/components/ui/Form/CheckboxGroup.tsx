/**
 * CheckboxGroup Component
 * Group of checkboxes with shared state management
 */

import React, { forwardRef, useId } from 'react';
import { cn } from '@/utils/cn';
import { Label, Text } from '@/components/ui/Text/Text';
import { Checkbox, CheckboxProps } from './Checkbox';
import { BaseFormControlProps } from './types';
import {
  getControlState,
  getLabelStyles,
  getFeedbackStyles,
  getFeedbackIcon,
} from './utils';

export interface CheckboxGroupOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface CheckboxGroupProps
  extends Omit<BaseFormControlProps, 'variant' | 'fullWidth'> {
  /** Array of checkbox options */
  options: CheckboxGroupOption[];
  
  /** Selected values */
  value?: string[];
  
  /** Change handler */
  onChange?: (value: string[]) => void;
  
  /** Layout direction */
  direction?: 'vertical' | 'horizontal';
  
  /** Checkbox size */
  checkboxSize?: CheckboxProps['size'];
  
  /** Name for all checkboxes in the group */
  name?: string;
}

export const CheckboxGroup = forwardRef<HTMLDivElement, CheckboxGroupProps>(
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
      
      // CheckboxGroup props
      options,
      value = [],
      onChange,
      direction = 'vertical',
      checkboxSize,
      
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const id = providedId || generatedId;

    const state = getControlState(error, success, warning);

    const handleCheckboxChange = (optionValue: string, checked: boolean) => {
      if (readOnly) return;
      
      const newValue = checked
        ? [...value, optionValue]
        : value.filter((v) => v !== optionValue);
      
      onChange?.(newValue);
    };

    const feedbackMessage = error || success || warning || helperText;
    const feedbackState = error ? 'error' : success ? 'success' : warning ? 'warning' : 'default';

    return (
      <div ref={ref} className={cn('space-y-2', className)} {...props}>
        {/* Group Label */}
        {label && (
          <Label
            as="legend"
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

        {/* Checkboxes */}
        <div
          role="group"
          aria-labelledby={label ? `${id}-label` : undefined}
          aria-describedby={feedbackMessage ? `${id}-feedback` : undefined}
          aria-required={required}
          className={cn(
            'flex gap-4',
            direction === 'vertical' ? 'flex-col' : 'flex-row flex-wrap'
          )}
        >
          {options.map((option, index) => (
            <Checkbox
              key={option.value}
              id={`${id}-${index}`}
              name={name}
              label={option.label}
              description={option.description}
              checked={value.includes(option.value)}
              onChange={(e) => handleCheckboxChange(option.value, e.target.checked)}
              disabled={disabled || option.disabled}
              readOnly={readOnly}
              size={checkboxSize || size}
              error={state === 'error' ? '' : undefined}
              success={state === 'success' ? '' : undefined}
              warning={state === 'warning' ? '' : undefined}
            />
          ))}
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

CheckboxGroup.displayName = 'CheckboxGroup';
