/**
 * useModal Hook
 * Hook for managing modal state
 */

import { useState, useCallback } from 'react';
import { UseModalOptions, UseModalReturn } from './types';

export const useModal = (options: UseModalOptions = {}): UseModalReturn => {
  const { defaultOpen = false, onOpen, onClose } = options;
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const open = useCallback(() => {
    setIsOpen(true);
    onOpen?.();
  }, [onOpen]);

  const close = useCallback(() => {
    setIsOpen(false);
    onClose?.();
  }, [onClose]);

  const toggle = useCallback(() => {
    if (isOpen) {
      close();
    } else {
      open();
    }
  }, [isOpen, open, close]);

  return {
    isOpen,
    open,
    close,
    toggle,
  };
};
