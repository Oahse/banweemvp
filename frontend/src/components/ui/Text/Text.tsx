import React, { forwardRef } from 'react';
import DOMPurify from 'dompurify';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/utils';

// Text component variants using class-variance-authority for type-safe styling
const textVariants = cva(
  // Base classes
  'font-sans antialiased',
  {
    variants: {
      // Typography variants
      variant: {
        // Display variants
        display: 'text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight',
        'display-sm': 'text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight',
        
        // Heading variants
        h1: 'text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight',
        h2: 'text-2xl md:text-3xl lg:text-4xl font-bold leading-tight tracking-tight',
        h3: 'text-xl md:text-2xl lg:text-3xl font-bold leading-tight tracking-tight',
        h4: 'text-lg md:text-xl lg:text-2xl font-semibold leading-tight tracking-tight',
        h5: 'text-base md:text-lg lg:text-xl font-semibold leading-tight tracking-tight',
        h6: 'text-sm md:text-base lg:text-lg font-semibold leading-tight tracking-tight',
        
        // Body text variants
        body: 'text-base leading-relaxed tracking-normal',
        'body-sm': 'text-sm leading-relaxed tracking-normal',
        'body-lg': 'text-lg leading-relaxed tracking-normal',
        
        // UI text variants
        caption: 'text-xs leading-normal tracking-normal',
        label: 'text-sm font-medium leading-normal tracking-normal',
        description: 'text-sm leading-relaxed tracking-normal',
        
        // Special variants
        code: 'font-mono text-sm leading-normal tracking-normal',
        quote: 'text-base italic leading-relaxed tracking-normal',
      },
      
      // Color/tone variants
      tone: {
        default: 'text-copy DEFAULT',
        primary: 'text-primary DEFAULT',
        secondary: 'text-copy-muted',
        success: 'text-success DEFAULT',
        warning: 'text-warning DEFAULT',
        danger: 'text-error DEFAULT',
        info: 'text-info DEFAULT',
        inverse: 'text-copy-inverse',
      },
      
      // Text alignment
      align: {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
        justify: 'text-justify',
      },
      
      // Text weight
      weight: {
        thin: 'font-thin',
        extralight: 'font-extralight',
        light: 'font-light',
        normal: 'font-normal',
        medium: 'font-medium',
        semibold: 'font-semibold',
        bold: 'font-bold',
        extrabold: 'font-extrabold',
        black: 'font-black',
      },
      
      // Text transformation
      transform: {
        none: 'normal-case',
        uppercase: 'uppercase',
        lowercase: 'lowercase',
        capitalize: 'capitalize',
      },
      
      // Text decoration
      decoration: {
        none: 'no-underline',
        underline: 'underline',
        'line-through': 'line-through',
        'overline': 'overline',
      },
      
      // Truncation
      truncate: {
        none: '',
        single: 'truncate',
        '2-lines': 'line-clamp-2',
        '3-lines': 'line-clamp-3',
        '4-lines': 'line-clamp-4',
        '5-lines': 'line-clamp-5',
        '6-lines': 'line-clamp-6',
      },
    },
    defaultVariants: {
      variant: 'body',
      tone: 'default',
      align: 'left',
      weight: 'normal',
      transform: 'none',
      decoration: 'none',
      truncate: 'none',
    },
  }
);

// Export variant props for type safety
export type TextVariants = VariantProps<typeof textVariants>;

// Semantic HTML element types
export type TextElement = 
  | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  | 'p' | 'span' | 'div'
  | 'label' | 'legend' | 'caption'
  | 'small' | 'strong' | 'em'
  | 'blockquote' | 'code' | 'pre'
  | 'strong' | 'em' | 'u'
  | 'small' | 'time' | 'address'
  | 'article' | 'section' | 'aside'
  | 'header' | 'footer' | 'nav';

// Core Text component props
export interface TextProps extends 
  Omit<React.HTMLAttributes<HTMLElement>, 'color'>,
  TextVariants {
  /**
   * The semantic HTML element to render
   * @default 'span'
   */
  as?: TextElement;
  
  /**
   * Whether the text should be selectable
   * @default true
   */
  selectable?: boolean;
  
  /**
   * Custom CSS classes
   */
  className?: string;
  
  /**
   * Children to render
   */
  children: React.ReactNode;
  /**
   * Raw HTML string to render. When provided, `children` are ignored.
   * Use `sanitizeHtml` to control whether to sanitize the HTML before rendering.
   */
  html?: string;

  /**
   * Whether to sanitize the provided `html` string. Defaults to `true`.
   */
  sanitizeHtml?: boolean;
}

/**
 * Universal Text component - A foundational design system primitive
 * 
 * This component replaces all raw HTML text elements and provides:
 * - Consistent typography through variants
 * - Semantic HTML control via the 'as' prop
 * - Centralized styling with Tailwind CSS
 * - Accessibility best practices
 * - Composable and extensible API
 */
export const Text = forwardRef<HTMLElement, TextProps>(
  (
    {
      as: Component = 'span',
      variant,
      tone,
      align,
      weight,
      transform,
      decoration,
      truncate,
      selectable = true,
      className,
      children,
      html,
      sanitizeHtml = true,
      ...props
    },
    ref
  ) => {
    const classes = cn(
      textVariants({
        variant,
        tone,
        align,
        weight,
        transform,
        decoration,
        truncate,
      }),
      !selectable && 'select-none',
      className
    );

    return (
      <Component
        ref={ref}
        className={classes}
        {...props}
        {...(html
          ? { dangerouslySetInnerHTML: { __html: sanitizeHtml ? DOMPurify.sanitize(html) : html } }
          : {})}
      >
        {!html && children}
      </Component>
    );
  }
);

Text.displayName = 'Text';

// Export convenience components for common use cases
export const Display = forwardRef<HTMLElement, Omit<TextProps, 'variant'>>(
  (props, ref) => <Text ref={ref} variant="display" {...props} />
);
Display.displayName = 'Display';

export const Heading = forwardRef<HTMLElement, Omit<TextProps, 'variant' | 'as'> & { level?: 1 | 2 | 3 | 4 | 5 | 6 }>(
  ({ level = 2, ...props }, ref) => {
    const variant = `h${level}` as const;
    const Component = `h${level}` as TextElement;
    return <Text ref={ref} as={Component} variant={variant} {...props} />;
  }
);
Heading.displayName = 'Heading';

export const Body = forwardRef<HTMLElement, Omit<TextProps, 'variant'>>(
  (props, ref) => <Text ref={ref} variant="body" {...props} />
);
Body.displayName = 'Body';

export const Caption = forwardRef<HTMLElement, Omit<TextProps, 'variant' | 'as'>>(
  (props, ref) => <Text ref={ref} as="small" variant="caption" {...props} />
);
Caption.displayName = 'Caption';

export const Label = forwardRef<HTMLElement, Omit<TextProps, 'variant' | 'as'>>(
  (props, ref) => <Text ref={ref} as="label" variant="label" {...props} />
);
Label.displayName = 'Label';

export const Code = forwardRef<HTMLElement, Omit<TextProps, 'variant' | 'as'>>(
  (props, ref) => <Text ref={ref} as="code" variant="code" {...props} />
);
Code.displayName = 'Code';

export const Quote = forwardRef<HTMLElement, Omit<TextProps, 'variant' | 'as'>>(
  (props, ref) => <Text ref={ref} as="blockquote" variant="quote" {...props} />
);
Quote.displayName = 'Quote';
