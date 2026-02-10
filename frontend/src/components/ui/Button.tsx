import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/utils';
import { Text } from '@/components/ui/Text/Text';
import AnimatedLoader from '@/components/ui/AnimatedLoader';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'danger' | 'success' | 'warning' | 'info';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'icon';
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  className,
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  rounded = 'md',
  disabled,
  ...props
}, ref) => {
  const variantStyles = {
    primary: 'bg-primary text-white hover:bg-primary-dark active:bg-primary-dark focus:ring-primary/50 shadow-sm hover:shadow-md',
    secondary: 'bg-secondary text-white hover:bg-secondary-dark active:bg-secondary-dark focus:ring-secondary/50 shadow-sm hover:shadow-md',
    outline: 'border border-primary text-primary bg-transparent hover:bg-primary/10 active:bg-primary/20 focus:ring-primary/50',
    ghost: 'text-copy bg-transparent hover:bg-surface-hover active:bg-surface-active focus:ring-primary/50',
    link: 'text-primary bg-transparent hover:underline focus:ring-primary/50 p-0 h-auto shadow-none',
    danger: 'bg-error text-white hover:bg-error-dark active:bg-error-dark focus:ring-error/50 shadow-sm hover:shadow-md',
    success: 'bg-success text-white hover:bg-success-dark active:bg-success-dark focus:ring-success/50 shadow-sm hover:shadow-md',
    warning: 'bg-warning text-white hover:bg-warning-dark active:bg-warning-dark focus:ring-warning/50 shadow-sm hover:shadow-md',
    info: 'bg-info text-white hover:bg-info-dark active:bg-info-dark focus:ring-info/50 shadow-sm hover:shadow-md',
  };

  const sizeStyles = {
    xs: 'text-sm px-2 py-1 min-h-[24px]',
    sm: 'text-sm px-3 py-1.5 min-h-[32px]',
    md: 'text-sm px-4 py-2 min-h-[40px]',
    lg: 'text-base px-6 py-3 min-h-[48px]',
    xl: 'text-lg px-8 py-4 min-h-[56px]',
    icon: 'p-2 min-h-[40px] min-w-[40px]'
  };

  const roundedStyles = {
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full'
  };

  // ...existing code...

  return (
    <button
      ref={ref}
      className={cn(
        // Base styles
        'inline-flex items-center justify-center',
        'font-medium select-none',
        'transform transition-all duration-200 ease-in-out',
        'active:scale-95',
        
        // Variant styles
        variantStyles[variant],
        
        // Size styles
        sizeStyles[size],
        
        // Rounded styles
        roundedStyles[rounded],
        
        // State styles
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none disabled:transform-none',
        
        // Full width
        fullWidth && 'w-full',
        
        // Loading state - maintain width
        isLoading && 'cursor-wait relative',
        
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
          <Text as="span" className="flex items-center justify-center gap-2">
            {isLoading && (
              <AnimatedLoader size="sm" variant="spinner" color="primary" />
            )}
            
            {!isLoading && leftIcon && (
              <span className="flex-shrink-0" aria-hidden="true">
                {leftIcon}
              </span>
            )}

            {children && <Text as="span" className={cn("truncate", isLoading && "opacity-0 absolute")}>{children}</Text>}
            
            {/* Show loading text in place of children */}
            {isLoading && children && (
              <Text as="span" className="truncate">Loading...</Text>
            )}

            {!isLoading && rightIcon && (
              <span className="flex-shrink-0" aria-hidden="true">
                {rightIcon}
              </span>
            )}
          </Text>
    </button>
  );
});

Button.displayName = 'Button';