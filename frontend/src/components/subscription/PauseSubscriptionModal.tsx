import React, { useState } from 'react';
import { X, PauseIcon } from 'lucide-react';
import { themeClasses, combineThemeClasses, getButtonClasses } from '../../lib/themeClasses';

interface PauseSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason?: string) => void;
  subscriptionId: string;
  planName: string;
  loading?: boolean;
}

export const PauseSubscriptionModal: React.FC<PauseSubscriptionModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  subscriptionId,
  planName,
  loading = false
}) => {
  const [reason, setReason] = useState('');

  const handleConfirm = () => {
    onConfirm(reason.trim() || undefined);
    setReason('');
  };

  const handleClose = () => {
    if (!loading) {
      setReason('');
      onClose();
    }
  };

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
              themeClasses.background.warning,
              'bg-opacity-10'
            )}>
              <PauseIcon className={combineThemeClasses(
                'w-5 h-5',
                themeClasses.text.warning
              )} />
            </div>
            <div>
              <h3 className={combineThemeClasses(
                themeClasses.text.heading,
                'text-lg font-semibold'
              )}>
                Pause Subscription
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
            <p className={combineThemeClasses(
              themeClasses.text.secondary,
              'text-sm mb-3'
            )}>
              Your subscription will be paused and you won't be charged until you resume it. 
              You can resume at any time from your subscription management page.
            </p>
            
            <div className={combineThemeClasses(
              'p-3 rounded-lg border',
              themeClasses.background.elevated,
              themeClasses.border.warning,
              'border-opacity-30'
            )}>
              <p className={combineThemeClasses(
                themeClasses.text.warning,
                'text-sm font-medium'
              )}>
                Note: Your current billing cycle will complete, and the pause will take effect on your next billing date.
              </p>
            </div>
          </div>

          <div className="mb-6">
            <label 
              htmlFor="pause-reason"
              className={combineThemeClasses(
                themeClasses.text.primary,
                'block text-sm font-medium mb-2'
              )}
            >
              Please provide a reason for pausing (optional):
            </label>
            <textarea
              id="pause-reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              disabled={loading}
              placeholder="e.g., Going on vacation, temporary financial constraints, trying other options..."
              rows={3}
              maxLength={500}
              className={combineThemeClasses(
                'w-full px-3 py-2 border rounded-md resize-none transition-colors',
                themeClasses.background.surface,
                themeClasses.border.light,
                themeClasses.text.primary,
                'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
                'placeholder:text-gray-400',
                loading ? 'opacity-50 cursor-not-allowed' : ''
              )}
            />
            <div className="flex justify-between items-center mt-1">
              <p className={combineThemeClasses(
                themeClasses.text.muted,
                'text-xs'
              )}>
                This helps us improve our service
              </p>
              <span className={combineThemeClasses(
                themeClasses.text.muted,
                'text-xs'
              )}>
                {reason.length}/500
              </span>
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
            Cancel
          </button>
          
          <button
            onClick={handleConfirm}
            disabled={loading}
            className={combineThemeClasses(
              getButtonClasses('warning'),
              'px-4 py-2 flex items-center gap-2',
              loading ? 'opacity-50 cursor-not-allowed' : ''
            )}
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Pausing...
              </>
            ) : (
              <>
                <PauseIcon className="w-4 h-4" />
                Pause Subscription
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};