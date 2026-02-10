/**
 * Modal Module Exports
 */

export { Modal } from './Modal';
export { ModalHeader } from './ModalHeader';
export { ModalBody } from './ModalBody';
export { ModalFooter } from './ModalFooter';
export { ConfirmModal } from './ConfirmModal';
export { useModal } from './useModal';
export { useModalContext } from './ModalContext';

export type {
  ModalProps,
  ModalHeaderProps,
  ModalBodyProps,
  ModalFooterProps,
  ModalSize,
  ModalVariant,
  ConfirmModalOptions,
  UseModalOptions,
  UseModalReturn,
} from './types';

// Compound component pattern
import { Modal as ModalRoot } from './Modal';
import { ModalHeader } from './ModalHeader';
import { ModalBody } from './ModalBody';
import { ModalFooter } from './ModalFooter';

export const ModalCompound = Object.assign(ModalRoot, {
  Header: ModalHeader,
  Body: ModalBody,
  Footer: ModalFooter,
});
