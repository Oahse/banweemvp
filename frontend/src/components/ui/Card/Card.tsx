/**
 * Card Component System
 * Production-ready, composable card components for consistent layouts
 */

import React, { forwardRef } from 'react';
import { cn } from '@/utils/cn';
import { Text, Heading } from '@/components/ui/Text/Text';
import {
  BaseCardProps,
  CardMediaProps,
  CardActionsProps,
} from './types';
import {
  getVariantStyles,
  getSizePadding,
  getSizeSpacing,
  getOrientationStyles,
  getInteractiveStyles,
  getMediaPlacementStyles,
  getAspectRatioStyles,
} from './utils';

/**
 * Main Card Component
 * Flexible container with support for variants, sizes, and interactive states
 */
const CardRoot = forwardRef<HTMLElement, BaseCardProps & React.HTMLAttributes<HTMLElement>>(
  (
    {
      as: Component = 'div',
      variant = 'default',
      size = 'md',
      orientation = 'vertical',
      density = 'comfortable',
      clickable = false,
      selectable = false,
      selected = false,
      disabled = false,
      hoverable = false,
      className,
      children,
      onClick,
      onKeyDown,
      tabIndex,
      role,
      'aria-selected': ariaSelected,
      ...props
    },
    ref
  ) => {
    // Determine if card should be keyboard accessible
    const isInteractive = clickable || selectable;
    const computedTabIndex = disabled ? -1 : (tabIndex ?? (isInteractive ? 0 : undefined));
    const computedRole = role ?? (selectable ? 'option' : clickable ? 'button' : 'article');
    
    // Handle keyboard interaction
    const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
      if (disabled) return;
      
      if (isInteractive && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        onClick?.(e as any);
      }
      
      onKeyDown?.(e);
    };

    return (
      <Component
        ref={ref}
        className={cn(
          // Base styles
          'rounded-lg transition-all duration-200',
          
          // Variant styles
          getVariantStyles(variant),
          
          // Orientation
          getOrientationStyles(orientation),
          
          // Interactive styles
          getInteractiveStyles(clickable, selectable, selected, disabled, hoverable),
          
          className
        )}
        onClick={disabled ? undefined : onClick}
        onKeyDown={handleKeyDown}
        tabIndex={computedTabIndex}
        role={computedRole}
        aria-selected={selectable ? (ariaSelected ?? selected) : undefined}
        aria-disabled={disabled}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

CardRoot.displayName = 'Card';

/**
 * Card Header
 * Top section for titles, descriptions, and actions
 */
const CardHeader = forwardRef<HTMLElement, BaseCardProps & React.HTMLAttributes<HTMLElement>>(
  (
    {
      as: Component = 'header',
      size = 'md',
      density = 'comfortable',
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        className={cn(
          'flex flex-col',
          getSizeSpacing(size),
          getSizePadding(size, density),
          'pb-0',
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

CardHeader.displayName = 'Card.Header';

/**
 * Card Title
 * Primary heading for the card
 */
const CardTitle = forwardRef<HTMLHeadingElement, { size?: 'sm' | 'md' | 'lg' } & React.HTMLAttributes<HTMLHeadingElement>>(
  (
    {
      size = 'md',
      className,
      children,
      ...props
    },
    ref
  ) => {
    const sizeMap = {
      sm: 2,
      md: 3,
      lg: 2,
    } as const;
    
    const textSizeMap = {
      sm: 'text-base',
      md: 'text-lg',
      lg: 'text-xl',
    };

    return (
      <Heading
        ref={ref as any}
        level={sizeMap[size]}
        weight="semibold"
        className={cn(
          textSizeMap[size],
          'leading-none tracking-tight text-main',
          className
        )}
        {...props}
      >
        {children}
      </Heading>
    );
  }
);

CardTitle.displayName = 'Card.Title';

/**
 * Card Description
 * Secondary text for additional context
 */
const CardDescription = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  (
    {
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Text
        ref={ref as any}
        as="p"
        variant="body-sm"
        tone="secondary"
        className={cn('text-copy-light', className)}
        {...props}
      >
        {children}
      </Text>
    );
  }
);

CardDescription.displayName = 'Card.Description';

/**
 * Card Body/Content
 * Main content area
 */
const CardBody = forwardRef<HTMLElement, BaseCardProps & React.HTMLAttributes<HTMLElement>>(
  (
    {
      as: Component = 'div',
      size = 'md',
      density = 'comfortable',
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        className={cn(
          getSizePadding(size, density),
          'flex-1',
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

CardBody.displayName = 'Card.Body';

/**
 * Card Footer
 * Bottom section for actions and metadata
 */
const CardFooter = forwardRef<HTMLElement, BaseCardProps & React.HTMLAttributes<HTMLElement>>(
  (
    {
      as: Component = 'footer',
      size = 'md',
      density = 'comfortable',
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        className={cn(
          'flex items-center',
          getSizePadding(size, density),
          'pt-0',
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

CardFooter.displayName = 'Card.Footer';

/**
 * Card Media
 * Image, video, or icon display
 */
const CardMedia = forwardRef<HTMLDivElement, CardMediaProps>(
  (
    {
      src,
      alt = '',
      type = 'image',
      placement = 'top',
      aspectRatio = '16/9',
      icon,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const aspectRatioClass = getAspectRatioStyles(aspectRatio);
    
    if (type === 'icon' && icon) {
      return (
        <div
          ref={ref}
          className={cn(
            'flex items-center justify-center',
            'bg-surface-elevated',
            aspectRatioClass,
            placement === 'top' && 'rounded-t-lg',
            placement === 'left' && 'rounded-l-lg',
            placement === 'right' && 'rounded-r-lg',
            className
          )}
          {...props}
        >
          {icon}
        </div>
      );
    }
    
    if (type === 'video' && src) {
      return (
        <div
          ref={ref}
          className={cn(
            'relative overflow-hidden',
            aspectRatioClass,
            placement === 'top' && 'rounded-t-lg',
            placement === 'left' && 'rounded-l-lg',
            placement === 'right' && 'rounded-r-lg',
            placement === 'background' && 'rounded-lg',
            className
          )}
          {...props}
        >
          <video
            src={src}
            className="absolute inset-0 w-full h-full object-cover"
            controls
          />
        </div>
      );
    }
    
    // Default: image
    if (src) {
      return (
        <div
          ref={ref}
          className={cn(
            'relative overflow-hidden',
            aspectRatioClass,
            placement === 'top' && 'rounded-t-lg',
            placement === 'left' && 'rounded-l-lg',
            placement === 'right' && 'rounded-r-lg',
            placement === 'background' && 'rounded-lg',
            className
          )}
          {...props}
        >
          <img
            src={src}
            alt={alt}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      );
    }
    
    // Custom children
    return (
      <div
        ref={ref}
        className={cn(
          'relative overflow-hidden',
          aspectRatioClass,
          placement === 'top' && 'rounded-t-lg',
          placement === 'left' && 'rounded-l-lg',
          placement === 'right' && 'rounded-r-lg',
          placement === 'background' && 'rounded-lg',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardMedia.displayName = 'Card.Media';

/**
 * Card Actions
 * Action buttons and controls
 */
const CardActions = forwardRef<HTMLDivElement, CardActionsProps>(
  (
    {
      align = 'right',
      divider = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const alignmentStyles = {
      left: 'justify-start',
      center: 'justify-center',
      right: 'justify-end',
      between: 'justify-between',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center gap-2',
          alignmentStyles[align],
          divider && 'border-t border-border pt-4 mt-4',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardActions.displayName = 'Card.Actions';

/**
 * Card Divider
 * Visual separator between sections
 */
const CardDivider = forwardRef<HTMLHRElement, React.HTMLAttributes<HTMLHRElement>>(
  (
    {
      className,
      ...props
    },
    ref
  ) => {
    return (
      <hr
        ref={ref}
        className={cn('border-t border-border my-4', className)}
        {...props}
      />
    );
  }
);

CardDivider.displayName = 'Card.Divider';

// Compound component pattern - attach sub-components to Card
type CardComponent = typeof CardRoot & {
  Header: typeof CardHeader;
  Title: typeof CardTitle;
  Description: typeof CardDescription;
  Body: typeof CardBody;
  Footer: typeof CardFooter;
  Media: typeof CardMedia;
  Actions: typeof CardActions;
  Divider: typeof CardDivider;
};

const Card = CardRoot as CardComponent;

Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Body = CardBody;
Card.Footer = CardFooter;
Card.Media = CardMedia;
Card.Actions = CardActions;
Card.Divider = CardDivider;

// Named exports for flexibility
export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardBody,
  CardFooter,
  CardMedia,
  CardActions,
  CardDivider,
};
