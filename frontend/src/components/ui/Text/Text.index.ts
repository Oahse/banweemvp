// Text Component Barrel Export
// This file provides clean imports for the Text component system

// Core component and types
export { Text } from './Text';
export type { TextProps, TextVariants } from './Text';

// Convenience components
export { 
  Display, 
  Heading, 
  Body, 
  Caption, 
  Label, 
  Code, 
  Quote 
} from './Text';

// Type definitions and utilities
export type {
  TypographyVariant,
  TextTone,
  TextAlign,
  TextWeight,
  TextTransform,
  TextDecoration,
  TextTruncate,
  TextElement,
} from './Text.types';

export {
  SEMANTIC_MAPPING,
  ACCESSIBILITY_GUIDELINES,
  DESIGN_TOKENS,
  TEXT_PRESETS,
} from './Text.types';

// Examples (for development and documentation)
export * from './Text.examples';
