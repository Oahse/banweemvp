/**
 * Modal Types
 * Core type definitions for the modal system
 */

import { ReactNode } from 'react';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'fullscreen';
export type ModalVariant = 'default' | 'danger' | 'success' | 'warning';

export interface ModalProps {
  /** Controls modal visibility */
  isOpen: boolean;
  
  /** Callback when modal should close */
  onClose: () => void;
  
  /** Modal content */
  children: ReactNode;
  
  /** Size variant */
  size?: ModalSize;
  
  /** Visual variant */
  variant?: ModalVariant;
  
  /** Close on overlay click */
  closeOnOverlayClick?: boolean;
  
  /** Close on Escape key */
  closeOnEscape?: boolean;
  
  /** Prevent background scroll */
  preventScroll?: boolean;
  
  /** Show close button */
  showCloseButton?: boolean;
  
  /** Custom class name for modal container */
  className?: string;
  
  /** Custom class name for overlay */
  overlayClassName?: string;
  
  /** Initial focus element selector */
  initialFocus?: string;
  
  /** Return focus on close */
  returnFocus?: boolean;
  
  /** ARIA label */
  ariaLabel?: string;
  
  /** ARIA labelledby (ID of title element) */
  ariaLabelledBy?: string;
  
  /** ARIA describedby (ID of description element) */
  ariaDescribedBy?: string;
  
  /** Z-index for stacking */
  zIndex?: number;
  
  /** Animation duration in ms */
  animationDuration?: number;
  
  /** Callback after modal opens */
  onAfterOpen?: () => void;
  
  /** Callback after modal closes */
  onAfterClose?: () => void;
}

export interface ModalHeaderProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export interface ModalBodyProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export interface ModalFooterProps {
  children: ReactNode;
  className?: string;
  align?: 'left' | 'center' | 'right' | 'between';
}

export interface ModalContextValue {
  isOpen: boolean;
  onClose: () => void;
  variant: ModalVariant;
  size: ModalSize;
  labelledBy?: string;
  describedBy?: string;
}

export interface UseModalOptions {
  /** Initial open state */
  defaultOpen?: boolean;
  
  /** Callback when modal opens */
  onOpen?: () => void;
  
  /** Callback when modal closes */
  onClose?: () => void;
}

export interface UseModalReturn {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export interface ConfirmModalOptions {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: ModalVariant;
  onConfirm: () => void | Promise<void>;
  onCancel?: () => void;
}
