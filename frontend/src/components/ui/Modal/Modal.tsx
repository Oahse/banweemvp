/**
 * Modal Component
 * Universal modal component for consistent dialog UI across the application
 */

import { useEffect, useRef, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { ModalProps } from './types';
import { ModalContext } from './ModalContext';
import {
  getFocusableElements,
  trapFocus,
  getModalSizeClasses,
  getModalVariantClasses,
  preventBodyScroll,
  generateId,
} from './utils';
import { cn } from '@/utils/cn';
import { Button } from '@/components/ui/Button';
import { useTheme } from '@/components/shared/contexts/ThemeContext';

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  size = 'md',
  variant = 'default',
  closeOnOverlayClick = true,
  closeOnEscape = true,
  preventScroll = true,
  showCloseButton = true,
  className,
  overlayClassName,
  initialFocus,
  returnFocus = true,
  ariaLabel,
  ariaLabelledBy,
  ariaDescribedBy,
  zIndex = 50,
  animationDuration = 200,
  onAfterOpen,
  onAfterClose,
}) => {
  const { currentTheme } = useTheme();
  const isDark = currentTheme === 'dark';
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const modalId = useRef(generateId('modal')).current;
  const titleId = ariaLabelledBy || `${modalId}-title`;
  const descriptionId = ariaDescribedBy || `${modalId}-description`;

  // Handle body scroll prevention
  useEffect(() => {
    if (isOpen && preventScroll) {
      preventBodyScroll(true);
      return () => preventBodyScroll(false);
    }
  }, [isOpen, preventScroll]);

  // Handle focus management
  useEffect(() => {
    if (!isOpen) return;

    // Store previously focused element
    previousActiveElement.current = document.activeElement as HTMLElement;

    // Focus initial element or first focusable element
    const focusInitial = () => {
      if (!modalRef.current) return;

      if (initialFocus) {
        const element = modalRef.current.querySelector<HTMLElement>(initialFocus);
        element?.focus();
      } else {
        const focusableElements = getFocusableElements(modalRef.current);
        focusableElements[0]?.focus();
      }
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(focusInitial, 50);
    onAfterOpen?.();

    return () => {
      clearTimeout(timer);
      // Return focus to previous element
      if (returnFocus && previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
      onAfterClose?.();
    };
  }, [isOpen, initialFocus, returnFocus, onAfterOpen, onAfterClose]);

  // Handle keyboard events
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!isOpen) return;

      // Handle Escape key
      if (event.key === 'Escape' && closeOnEscape) {
        event.preventDefault();
        onClose();
        return;
      }

      // Handle Tab key (focus trap)
      if (modalRef.current) {
        trapFocus(modalRef.current, event);
      }
    },
    [isOpen, closeOnEscape, onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Handle overlay click
  const handleOverlayClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (closeOnOverlayClick && event.target === event.currentTarget) {
        onClose();
      }
    },
    [closeOnOverlayClick, onClose]
  );

  // Context value for compound components
  const contextValue = useMemo(
    () => ({
      isOpen,
      onClose,
      variant,
      size,
      labelledBy: titleId,
      describedBy: descriptionId,
    }),
    [isOpen, onClose, variant, size, titleId, descriptionId]
  );

  if (!isOpen) return null;

  const modalContent = (
    <div
      className={cn(
        'fixed inset-0 flex items-center justify-center p-4',
        `z-${zIndex}`,
        overlayClassName
      )}
      style={{ zIndex }}
      onClick={handleOverlayClick}
    >
      {/* Backdrop */}
      <div
        className={cn(
          'absolute inset-0 bg-black transition-opacity',
          isOpen ? 'opacity-50' : 'opacity-0'
        )}
        style={{ transitionDuration: `${animationDuration}ms` }}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy ? ariaLabelledBy : undefined}
        aria-describedby={ariaDescribedBy ? ariaDescribedBy : undefined}
        className={cn(
          'relative w-full rounded-lg shadow-xl transition-all',
          'border',
          getModalSizeClasses(size),
          getModalVariantClasses(variant, isDark),
          isDark ? 'border-gray-700' : 'border-gray-200',
          isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95',
          className
        )}
        style={{ transitionDuration: `${animationDuration}ms` }}
      >
        <ModalContext.Provider value={contextValue}>
          {/* Close button */}
          {showCloseButton && (
            <Button
              onClick={onClose}
              variant="ghost"
              size="xs"
              className={cn(
                'absolute top-4 right-4 p-1 rounded-lg transition-colors z-10',
                isDark
                  ? 'text-gray-400 hover:text-white hover:bg-gray-700'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
              )}
              aria-label="Close modal"
            >
              <X size={20} />
            </Button>
          )}

          {children}
        </ModalContext.Provider>
      </div>
    </div>
  );

  // Render in portal
  return createPortal(modalContent, document.body);
};
