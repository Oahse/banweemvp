import React from 'react';
import { PlayIcon } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Heading, Body, Text } from '@/components/ui/Text/Text';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@/components/ui/Modal';
import { useTheme } from '@/components/shared/contexts/ThemeContext';

interface ResumeSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  subscriptionId: string;
  planName: string;
  nextBillingDate?: string;
  loading?: boolean;
}

export const ResumeSubscriptionModal: React.FC<ResumeSubscriptionModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  subscriptionId,
  planName,
  nextBillingDate,
  loading = false
}) => {
  const { currentTheme } = useTheme();

  const handleClose = () => {
    if (!loading) {
      onClose();
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="md">
      <ModalHeader>
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-full ${currentTheme === 'dark' ? 'bg-success/20' : 'bg-success/10'}`}>
            <PlayIcon className="w-5 h-5 text-success" />
          </div>
          <div>
            <Heading level={5} className="text-lg font-semibold">
              Resume Subscription
            </Heading>
            <Body className={`text-sm ${currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              {planName} Plan
            </Body>
          </div>
        </div>
      </ModalHeader>

      <ModalBody>
        <div className="mb-4">
          <p className={`text-sm mb-3 ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Are you sure you want to resume this subscription? Your billing will restart and you'll be charged according to your billing cycle.
          </p>
          
          {nextBillingDate && (
            <div className={`p-3 rounded-lg border ${currentTheme === 'dark' ? 'bg-success/10 border-success/30' : 'bg-success/5 border-success/20'}`}>
              <p className="text-sm font-medium text-success">
                Your next billing date will be: {formatDate(nextBillingDate)}
              </p>
            </div>
          )}
          
          <div className={`mt-3 p-3 rounded-lg border ${currentTheme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
            <Heading level={5} className="text-sm font-medium mb-2">
              What happens when you resume:
            </Heading>
            <ul className={`text-sm space-y-1 ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              <li>• Your subscription will become active immediately</li>
              <li>• Billing will restart according to your plan</li>
              <li>• You'll have access to all subscription benefits</li>
              <li>• Auto-renewal will be enabled (if previously set)</li>
            </ul>
          </div>
        </div>
      </ModalBody>

      <ModalFooter>
        <Button
          onClick={handleClose}
          disabled={loading}
          variant="ghost"
          size="xs"
        >
          Cancel
        </Button>
        
        <Button
          onClick={onConfirm}
          disabled={loading}
          variant="success"
          size="xs"
          leftIcon={loading ? undefined : <PlayIcon className="w-4 h-4" />}
          isLoading={loading}
        >
          {loading ? 'Resuming...' : 'Resume Subscription'}
        </Button>
      </ModalFooter>
    </Modal>
  );
};