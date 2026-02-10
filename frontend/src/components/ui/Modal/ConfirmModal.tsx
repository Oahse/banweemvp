/**
 * Confirm Modal Component
 * Pre-built confirmation dialog
 */

import { useState } from 'react';
import { AlertTriangle, CheckCircle, Info, AlertCircle } from 'lucide-react';
import { Modal } from './Modal';
import { ModalHeader } from './ModalHeader';
import { ModalBody } from './ModalBody';
import { ModalFooter } from './ModalFooter';
import { ConfirmModalOptions } from './types';
import { Button } from '@/components/ui/Button';
import { Body } from '@/components/ui/Text/Text';

interface ConfirmModalProps extends ConfirmModalOptions {
  isOpen: boolean;
  onClose: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'default',
  onConfirm,
  onCancel,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await onConfirm();
      onClose();
    } catch (error) {
      console.error('Confirmation action failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    onCancel?.();
    onClose();
  };

  const getIcon = () => {
    switch (variant) {
      case 'danger':
        return <AlertTriangle className="w-6 h-6 text-red-500" />;
      case 'success':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'warning':
        return <AlertCircle className="w-6 h-6 text-yellow-500" />;
      default:
        return <Info className="w-6 h-6 text-blue-500" />;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
      variant={variant}
      closeOnOverlayClick={!isLoading}
      closeOnEscape={!isLoading}
    >
      <ModalHeader>{title}</ModalHeader>
      <ModalBody>
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-0.5">{getIcon()}</div>
          <Body className="flex-1">{message}</Body>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button
          onClick={handleCancel}
          variant="secondary"
          size="sm"
          disabled={isLoading}
        >
          {cancelText}
        </Button>
        <Button
          onClick={handleConfirm}
          variant={variant === 'danger' ? 'danger' : 'primary'}
          size="sm"
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : confirmText}
        </Button>
      </ModalFooter>
    </Modal>
  );
};
