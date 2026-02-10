import React, { useState } from 'react';
import { TrashIcon, PauseIcon, PlayIcon, AlertTriangleIcon } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Heading, Body, Text, Label } from '@/components/ui/Text/Text';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@/components/ui/Modal';
import { useTheme } from '@/components/shared/contexts/ThemeContext';

export type SubscriptionAction = 'cancel' | 'pause' | 'resume';

interface SubscriptionActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason?: string) => void;
  action: SubscriptionAction;
  subscriptionId: string;
  planName: string;
  loading?: boolean;
}

const actionConfig = {
  cancel: {
    title: 'Cancel Subscription',
    icon: TrashIcon,
    iconColor: 'text-red-500',
    iconBg: 'bg-red-100',
    buttonStyle: 'danger',
    buttonText: 'Cancel Subscription',
    loadingText: 'Cancelling...',
    requiresConfirmation: true,
    confirmationText: 'CANCEL',
    warning: 'This action cannot be undone',
    description: 'Once cancelled, you\'ll lose access to all subscription benefits immediately. Your current billing cycle will complete, but no future charges will occur.',
    reasonPlaceholder: 'e.g., Too expensive, not using enough, found better alternative...',
    reasonLabel: 'Why are you cancelling? (optional)',
    reasonHelp: 'Your feedback helps us improve'
  },
  pause: {
    title: 'Pause Subscription',
    icon: PauseIcon,
    iconColor: 'text-yellow-500',
    iconBg: 'bg-yellow-100',
    buttonStyle: 'warning',
    buttonText: 'Pause Subscription',
    loadingText: 'Pausing...',
    requiresConfirmation: false,
    warning: 'Your current billing cycle will complete',
    description: 'Your subscription will be paused and you won\'t be charged until you resume it. You can resume at any time from your subscription management page.',
    reasonPlaceholder: 'e.g., Going on vacation, temporary financial constraints, trying other options...',
    reasonLabel: 'Please provide a reason for pausing (optional):',
    reasonHelp: 'This helps us improve our service'
  },
  resume: {
    title: 'Resume Subscription',
    icon: PlayIcon,
    iconColor: 'text-green-500',
    iconBg: 'bg-green-100',
    buttonStyle: 'primary',
    buttonText: 'Resume Subscription',
    loadingText: 'Resuming...',
    requiresConfirmation: false,
    description: 'Your subscription will be resumed and billing will continue on your next scheduled date.',
    reasonPlaceholder: 'e.g., Ready to continue, issue resolved...',
    reasonLabel: 'Any additional notes? (optional):',
    reasonHelp: 'Help us understand your experience'
  }
};

export const SubscriptionActionModal: React.FC<SubscriptionActionModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  action,
  subscriptionId,
  planName,
  loading = false
}) => {
  const { currentTheme } = useTheme();
  const [reason, setReason] = useState('');
  const [confirmText, setConfirmText] = useState('');

  const config = actionConfig[action];
  const Icon = config.icon;

  const handleConfirm = () => {
    onConfirm(reason.trim() || undefined);
    setReason('');
    setConfirmText('');
  };

  const handleClose = () => {
    if (!loading) {
      setReason('');
      setConfirmText('');
      onClose();
    }
  };

  const isConfirmValid = !config.requiresConfirmation || 
    confirmText.toLowerCase() === config.confirmationText?.toLowerCase();

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="md">
      <ModalHeader>
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-full ${config.iconBg}`}>
            <Icon className={`w-5 h-5 ${config.iconColor}`} />
          </div>
          <div>
            <Heading level={5} className="text-lg font-semibold">
              {config.title}
            </Heading>
            <Body className={`text-sm ${currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              {planName} Plan
            </Body>
          </div>
        </div>
      </ModalHeader>

      <ModalBody>
        <div className="mb-4">
          {/* Warning for destructive actions */}
          {action === 'cancel' && (
            <div className="p-4 rounded-lg border-2 border-dashed border-red-300 bg-red-50 mb-4">
              <div className="flex items-start gap-3">
                <AlertTriangleIcon className="w-5 h-5 mt-0.5 flex-shrink-0 text-red-500" />
                <div>
                  <Heading level={5} className="font-semibold text-sm mb-1 text-red-800">
                    {config.warning}
                  </Heading>
                  <Body className="text-sm text-red-700">
                    {config.description}
                  </Body>
                </div>
              </div>
            </div>
          )}

          {/* Info for non-destructive actions */}
          {action !== 'cancel' && (
            <>
              <Body className={`text-sm mb-3 ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                {config.description}
              </Body>
              
              {config.warning && (
                <div className={`p-3 rounded-lg border mb-4 ${currentTheme === 'dark' ? 'bg-yellow-900/20 border-yellow-700/30' : 'bg-yellow-50 border-yellow-300/30'}`}>
                  <Text className="text-sm font-medium text-yellow-700">
                    Note: {config.warning}
                  </Text>
                </div>
              )}
            </>
          )}

          {/* Reason input */}
          <div className="mb-4">
            <Label 
              htmlFor="action-reason"
              className={`block text-sm font-medium mb-2 ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}
            >
              {config.reasonLabel}
            </Label>
            <textarea
              id="action-reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              disabled={loading}
              placeholder={config.reasonPlaceholder}
              rows={3}
              maxLength={500}
              className={`w-full px-3 py-2 border rounded-md resize-none transition-colors ${
                currentTheme === 'dark'
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
              } focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            />
            <div className="flex justify-between items-center mt-1">
              <p className={`text-sm ${currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                {config.reasonHelp}
              </p>
              <span className={`text-sm ${currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                {reason.length}/500
              </span>
            </div>
          </div>

          {/* Confirmation input for destructive actions */}
          {config.requiresConfirmation && (
            <div className="mb-4">
              <label 
                htmlFor="confirm-action"
                className={`block text-sm font-medium mb-2 ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}
              >
                Type "{config.confirmationText}" to confirm {action}
              </label>
              <input
                id="confirm-action"
                type="text"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                disabled={loading}
                placeholder={`Type ${config.confirmationText} here`}
                className={`w-full px-3 py-2 border rounded-md transition-colors ${
                  currentTheme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                } ${
                  isConfirmValid ? 'border-green-300' : ''
                } focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              />
            </div>
          )}
        </div>
      </ModalBody>

      <ModalFooter>
        <Button
          onClick={handleClose}
          disabled={loading}
          variant="ghost"
          size="xs"
        >
          {action === 'cancel' ? 'Keep Subscription' : 'Cancel'}
        </Button>
        
        <Button
          onClick={handleConfirm}
          disabled={loading || !isConfirmValid}
          variant={action === 'cancel' ? 'danger' : action === 'pause' ? 'warning' : 'success'}
          size="xs"
          leftIcon={loading ? undefined : <Icon size={16} />}
          isLoading={loading}
        >
          {loading ? config.loadingText : config.buttonText}
        </Button>
      </ModalFooter>
    </Modal>
  );
};