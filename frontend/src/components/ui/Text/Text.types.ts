// Type definitions for the Text component
// This file provides comprehensive TypeScript support for the Text component

import type { TextElement } from './Text';

// Typography variant definitions
export type TypographyVariant = 
  // Display variants
  | 'display' | 'display-sm'
  // Heading variants  
  | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  // Body text variants
  | 'body' | 'body-sm' | 'body-lg'
  // UI text variants
  | 'caption' | 'label' | 'description'
  // Special variants
  | 'code' | 'quote';

// Color/tone definitions
export type TextTone = 
  | 'default' | 'primary' | 'secondary'
  | 'success' | 'warning' | 'danger' | 'info'
  | 'inverse';

// Text alignment options
export type TextAlign = 
  | 'left' | 'center' | 'right' | 'justify';

// Font weight options
export type TextWeight = 
  | 'thin' | 'extralight' | 'light' | 'normal'
  | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black';

// Text transformation options
export type TextTransform = 
  | 'none' | 'uppercase' | 'lowercase' | 'capitalize';

// Text decoration options
export type TextDecoration = 
  | 'none' | 'underline' | 'line-through' | 'overline';

// Truncation options
export type TextTruncate = 
  | 'none' | 'single' 
  | '2-lines' | '3-lines' | '4-lines' | '5-lines' | '6-lines';

// Semantic mapping for accessibility
export const SEMANTIC_MAPPING: Record<TypographyVariant, TextElement[]> = {
  // Display should only be used for hero sections or major headers
  display: ['h1'],
  'display-sm': ['h1', 'h2'],
  
  // Heading mappings - maintain document hierarchy
  h1: ['h1'],
  h2: ['h2'],
  h3: ['h3'],
  h4: ['h4'],
  h5: ['h5'],
  h6: ['h6'],
  
  // Body text mappings
  body: ['p', 'div', 'span'],
  'body-sm': ['p', 'div', 'span'],
  'body-lg': ['p', 'div', 'span'],
  
  // UI text mappings
  caption: ['small', 'span', 'figcaption'],
  label: ['label', 'span'],
  description: ['p', 'span', 'div'],
  
  // Special variants
  code: ['code', 'pre'],
  quote: ['blockquote', 'q'],
};

// Accessibility guidelines
export const ACCESSIBILITY_GUIDELINES = {
  // Heading hierarchy must be logical (h1 -> h2 -> h3, etc.)
  headingHierarchy: 'Maintain proper heading hierarchy without skipping levels',
  
  // Only one h1 per page/view
  singleH1: 'Use only one h1 element per page or view',
  
  // Semantic meaning over appearance
  semanticOverAppearance: 'Choose elements based on meaning, not appearance',
  
  // Screen reader considerations
  screenReader: 'Ensure text content is accessible to screen readers',
  
  // Color contrast
  colorContrast: 'Maintain sufficient color contrast for readability',
} as const;

// Design system tokens (can be extended)
export const DESIGN_TOKENS = {
  // Font sizes (in rem, relative to base font size)
  fontSizes: {
    'xs': '0.75rem',    // 12px
    'sm': '0.875rem',   // 14px
    'base': '1rem',     // 16px
    'lg': '1.125rem',   // 18px
    'xl': '1.25rem',    // 20px
    '2xl': '1.5rem',    // 24px
    '3xl': '1.875rem',  // 30px
    '4xl': '2.25rem',   // 36px
    '5xl': '3rem',      // 48px
    '6xl': '3.75rem',   // 60px
  },
  
  // Line heights
  lineHeights: {
    'none': '1',
    'tight': '1.25',
    'snug': '1.375',
    'normal': '1.5',
    'relaxed': '1.625',
    'loose': '2',
  },
  
  // Letter spacing
  letterSpacing: {
    'tighter': '-0.05em',
    'tight': '-0.025em',
    'normal': '0em',
    'wide': '0.025em',
    'wider': '0.05em',
    'widest': '0.1em',
  },
} as const;

// Component presets for common use cases
export const TEXT_PRESETS = {
  // Page headers
  pageHeader: {
    variant: 'display' as TypographyVariant,
    tone: 'default' as TextTone,
    align: 'center' as TextAlign,
  },
  
  // Section headers
  sectionHeader: {
    variant: 'h2' as TypographyVariant,
    tone: 'default' as TextTone,
    align: 'left' as TextAlign,
  },
  
  // Card titles
  cardTitle: {
    variant: 'h4' as TypographyVariant,
    tone: 'default' as TextTone,
    weight: 'semibold' as TextWeight,
  },
  
  // Form labels
  formLabel: {
    variant: 'label' as TypographyVariant,
    tone: 'default' as TextTone,
    weight: 'medium' as TextWeight,
  },
  
  // Error messages
  errorMessage: {
    variant: 'body-sm' as TypographyVariant,
    tone: 'danger' as TextTone,
    weight: 'medium' as TextWeight,
  },
  
  // Success messages
  successMessage: {
    variant: 'body-sm' as TypographyVariant,
    tone: 'success' as TextTone,
    weight: 'medium' as TextWeight,
  },
  
  // Helper text
  helperText: {
    variant: 'caption' as TypographyVariant,
    tone: 'secondary' as TextTone,
  },
  
  // Price display
  price: {
    variant: 'body-lg' as TypographyVariant,
    tone: 'default' as TextTone,
    weight: 'semibold' as TextWeight,
  },
  
  // Navigation items
  navItem: {
    variant: 'body' as TypographyVariant,
    tone: 'default' as TextTone,
    weight: 'medium' as TextWeight,
  },
  
  // Code snippets
  codeSnippet: {
    variant: 'code' as TypographyVariant,
    tone: 'default' as TextTone,
  },
} as const;
