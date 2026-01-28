import React, { useState } from 'react';
import { X, TrashIcon, AlertTriangleIcon } from 'lucide-react';
import { themeClasses, combineThemeClasses, getButtonClasses } from '../../lib/themeClasses';

interface CancelSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason?: string) => void;
  subscriptionId: string;
  planName: string;
  loading?: boolean;
}

export const CancelSubscriptionModal: React.FC<CancelSubscriptionModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  subscriptionId,
  planName,
  loading = false
}) => {
  const [reason, setReason] = useState('');
  const [confirmText, setConfirmText] = useState('');

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

  const isConfirmValid = confirmText.toLowerCase() === 'cancel';

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className={combineThemeClasses(
        'relative w-full max-w-md mx-auto rounded-lg shadow-xl',
        themeClasses.background.surface,
        'transform transition-all'
      )}>
        {/* Header */}
        <div className={combineThemeClasses(
          'flex items-center justify-between p-6 border-b',
          themeClasses.border.light
        )}>
          <div className="flex items-center gap-3">
            <div className={combineThemeClasses(
              'p-2 rounded-full',
              themeClasses.background.error,
              'bg-opacity-10'
            )}>
              <AlertTriangleIcon className={combineThemeClasses(
                'w-5 h-5',
                themeClasses.text.error
              )} />
            </div>
            <div>
              <h3 className={combineThemeClasses(
                themeClasses.text.heading,
                'text-lg font-semibold'
              )}>
                Cancel Subscription
              </h3>
              <p className={combineThemeClasses(
                themeClasses.text.muted,
                'text-sm'
              )}>
                {planName} Plan
              </p>
            </div>
          </div>
          
          <button
            onClick={handleClose}
            disabled={loading}
            className={combineThemeClasses(
              'p-1 rounded-md transition-colors',
              themeClasses.text.muted,
              themeClasses.interactive.hover,
              loading ? 'opacity-50 cursor-not-allowed' : ''
            )}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-4">
            <div className={combineThemeClasses(
              'p-4 rounded-lg border-2 border-dashed mb-4',
              themeClasses.border.error,
              themeClasses.background.error,
              'bg-opacity-5'
            )}>
              <div className="flex items-start gap-3">
                <AlertTriangleIcon className={combineThemeClasses(
                  'w-5 h-5 mt-0.5 flex-shrink-0',
                  themeClasses.text.error
                )} />
                <div>
                  <h4 className={combineThemeClasses(
                    themeClasses.text.error,
                    'font-semibold text-sm mb-1'
                  )}>
                    This action cannot be undone
                  </h4>
                  <p className={combineThemeClasses(
                    themeClasses.text.secondary,
                    'text-sm'
                  )}>
                    Once cancelled, you'll lose access to all subscription benefits immediately. 
                    Your current billing cycle will complete, but no future charges will occur.
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label 
                htmlFor="cancel-reason"
                className={combineThemeClasses(
                  themeClasses.text.primary,
                  'block text-sm font-medium mb-2'
                )}
              >
                Why are you cancelling? (optional)
              </label>
              <textarea
                id="cancel-reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                disabled={loading}
                placeholder="e.g., Too expensive, not using enough, found better alternative..."
                rows={3}
                maxLength={500}
                className={combineThemeClasses(
                  'w-full px-3 py-2 border rounded-md resize-none transition-colors',
                  themeClasses.background.surface,
                  themeClasses.border.light,
                  themeClasses.text.primary,
                  'focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent',
                  'placeholder:text-gray-400',
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                )}
              />
              <div className="flex justify-between items-center mt-1">
                <p className={combineThemeClasses(
                  themeClasses.text.muted,
                  'text-xs'
                )}>
                  Your feedback helps us improve
                </p>
                <span className={combineThemeClasses(
                  themeClasses.text.muted,
                  'text-xs'
                )}>
                  {reason.length}/500
                </span>
              </div>
            </div>

            <div className="mb-4">
              <label 
                htmlFor="confirm-cancel"
                className={combineThemeClasses(
                  themeClasses.text.primary,
                  'block text-sm font-medium mb-2'
                )}
              >
                Type "CANCEL" to confirm cancellation
              </label>
              <input
                id="confirm-cancel"
                type="text"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                disabled={loading}
                placeholder="Type CANCEL here"
                className={combineThemeClasses(
                  'w-full px-3 py-2 border rounded-md transition-colors',
                  themeClasses.background.surface,
                  isConfirmValid ? themeClasses.border.success : themeClasses.border.light,
                  themeClasses.text.primary,
                  'focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent',
                  'placeholder:text-gray-400',
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                )}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={combineThemeClasses(
          'flex items-center justify-end gap-3 p-6 border-t',
          themeClasses.border.light,
          themeClasses.background.elevated
        )}>
          <button
            onClick={handleClose}
            disabled={loading}
            className={combineThemeClasses(
              getButtonClasses('outline'),
              'px-4 py-2',
              loading ? 'opacity-50 cursor-not-allowed' : ''
            )}
          >
            Keep Subscription
          </button>
          
          <button
            onClick={handleConfirm}
            disabled={loading || !isConfirmValid}
            className={combineThemeClasses(
              getButtonClasses('danger'),
              'px-4 py-2 flex items-center gap-2',
              (loading || !isConfirmValid) ? 'opacity-50 cursor-not-allowed' : ''
            )}
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Cancelling...
              </>
            ) : (
              <>
                <TrashIcon className="w-4 h-4" />
                Cancel Subscription
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};