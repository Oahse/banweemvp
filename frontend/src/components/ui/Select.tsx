import React, { forwardRef } from 'react';
import { cn } from '@/utils/utils';
import { ChevronDownIcon } from 'lucide-react';
import { Label, Text } from '@/components/ui/Text/Text';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: React.ReactNode;
  helperText?: string;
  error?: string;
  options: SelectOption[];
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  variant?: 'default' | 'outline' | 'filled';
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({
  className,
  label,
  helperText,
  error,
  options,
  size = 'md',
  fullWidth = false,
  variant = 'default',
  ...props
}, ref) => {
  const sizeStyles = {
    sm: 'py-1.5 text-sm',
    md: 'py-2.5 text-sm sm:text-base',
    lg: 'py-3 text-lg'
  };

  const variantStyles = {
    default: cn(
      'border border-gray-300 bg-white',
      error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-gray-300 focus:border-primary focus:ring-primary/20'
    ),
    outline: cn(
      'border-2 bg-transparent',
      error ? 'border-red-500' : 'border-gray-300',
      'focus:border-primary focus:ring-primary/20'
    ),
    filled: cn(
      'bg-gray-50 border-transparent',
      'focus:border-primary focus:ring-primary/20'
    )
  };

  return (
    <div className={cn('relative', fullWidth && 'w-full', !label && 'mb-0')}>
      {label && (
        <Label htmlFor={props.id} className={cn('text-gray-900', 'block text-sm font-medium mb-2')}>
          {label}
        </Label>
      )}
      <div className="relative">
        <select 
          ref={ref} 
          className={cn(
            'w-full appearance-none px-4 rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 pr-10',
            sizeStyles[size],
            variantStyles[variant],
            props.disabled && 'bg-gray-100 text-gray-500 cursor-not-allowed',
            className
          )} 
          {...props}
        >
          {options.map(option => (
            <option key={option.value} value={option.value} className={cn('bg-white text-gray-900')}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDownIcon 
          size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16} 
          className={cn(
            'text-gray-500',
            'absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none transition-colors'
          )} 
        />
      </div>
      {(helperText || error) && (
        <Text variant="body-sm" className={cn(
          'mt-2',
          error ? 'text-red-500' : 'text-gray-500'
        )}>
          {error || helperText}
        </Text>
      )}
    </div>
  );
});

Select.displayName = 'Select';