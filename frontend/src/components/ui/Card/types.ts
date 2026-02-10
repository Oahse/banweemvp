/**
 * Card Component Types
 * Shared type definitions for the Card system
 */

import { ReactNode, ElementType } from 'react';

export type CardVariant = 'default' | 'outlined' | 'elevated' | 'ghost';
export type CardSize = 'sm' | 'md' | 'lg';
export type CardOrientation = 'vertical' | 'horizontal';
export type MediaPlacement = 'top' | 'left' | 'right' | 'background';
export type CardDensity = 'compact' | 'comfortable';

/**
 * Base props for Card components
 */
export interface BaseCardProps {
  /** Polymorphic as prop for semantic HTML */
  as?: ElementType;
  
  /** Visual variant */
  variant?: CardVariant;
  
  /** Size variant */
  size?: CardSize;
  
  /** Card orientation */
  orientation?: CardOrientation;
  
  /** Density control */
  density?: CardDensity;
  
  /** Make entire card clickable */
  clickable?: boolean;
  
  /** Make card selectable (checkbox/radio behavior) */
  selectable?: boolean;
  
  /** Selected state (for selectable cards) */
  selected?: boolean;
  
  /** Disabled state */
  disabled?: boolean;
  
  /** Show hover effects */
  hoverable?: boolean;
  
  /** Custom className */
  className?: string;
  
  /** Children */
  children?: ReactNode;
}

/**
 * Media component props
 */
export interface CardMediaProps {
  /** Media source (image/video URL) */
  src?: string;
  
  /** Alt text for images */
  alt?: string;
  
  /** Media type */
  type?: 'image' | 'video' | 'icon';
  
  /** Media placement */
  placement?: MediaPlacement;
  
  /** Aspect ratio */
  aspectRatio?: '1/1' | '4/3' | '16/9' | '21/9';
  
  /** Icon component (for type='icon') */
  icon?: ReactNode;
  
  /** Custom className */
  className?: string;
  
  /** Children (for custom content) */
  children?: ReactNode;
}

/**
 * Action area props
 */
export interface CardActionsProps {
  /** Alignment of actions */
  align?: 'left' | 'center' | 'right' | 'between';
  
  /** Show divider above actions */
  divider?: boolean;
  
  /** Custom className */
  className?: string;
  
  /** Children */
  children?: ReactNode;
}
