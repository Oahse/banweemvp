/**
 * RadioGroup Component
 * Group of radio buttons with shared state management
 */

import React, { forwardRef, useId } from 'react';
import { cn } from '@/utils/cn';
import { Label, Text } from '@/components/ui/Text/Text';
import { Radio, RadioProps } from './Radio';
import { BaseFormControlProps } from './types';
import {
  getControlState,
  getLabelStyles,
  getFeedbackStyles,
  getFeedbackIcon,
} from './utils';

export interface RadioGroupOption {
  value: string;
  label: string;
  description?: string | React.ReactNode;
  disabled?: boolean;
}

export interface RadioGroupProps
  extends Omit<BaseFormControlProps, 'variant' | 'fullWidth'> {
  /** Array of radio options */
  options: RadioGroupOption[];
  
  /** Selected value */
  value?: string;
  
  /** Change handler */
  onChange?: (value: string) => void;
  
  /** Layout direction */
  direction?: 'vertical' | 'horizontal';
  
  /** Radio size */
  radioSize?: RadioProps['size'];
  
  /** Name for all radios in the group */
  name: string;
}

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
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
      
      // RadioGroup props
      options,
      value,
      onChange,
      direction = 'vertical',
      radioSize,
      
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const id = providedId || generatedId;

    const state = getControlState(error, success, warning);

    const handleRadioChange = (optionValue: string) => {
      if (readOnly) return;
      onChange?.(optionValue);
    };

    const feedbackMessage = error || success || warning || helperText;
    const feedbackState = error ? 'error' : success ? 'success' : warning ? 'warning' : 'default';

    return (
      <div ref={ref} className={cn('space-y-2', className)} {...props}>
        {/* Group Label */}
        {label && (
          <Label
            as="legend"
            id={`${id}-label`}
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

        {/* Radio Buttons */}
        <div
          role="radiogroup"
          aria-labelledby={label ? `${id}-label` : undefined}
          aria-describedby={feedbackMessage ? `${id}-feedback` : undefined}
          aria-required={required}
          className={cn(
            'flex gap-4',
            direction === 'vertical' ? 'flex-col' : 'flex-row flex-wrap'
          )}
        >
          {options.map((option, index) => (
            <Radio
              key={option.value}
              id={`${id}-${index}`}
              name={name}
              value={option.value}
              label={option.label}
              description={option.description}
              checked={value === option.value}
              onChange={() => handleRadioChange(option.value)}
              disabled={disabled || option.disabled}
              readOnly={readOnly}
              size={radioSize || size}
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

RadioGroup.displayName = 'RadioGroup';
