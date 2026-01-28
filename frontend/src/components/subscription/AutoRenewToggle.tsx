import React, { useState } from 'react';
import { RotateCcwIcon, CheckCircleIcon, XCircleIcon, InfoIcon } from 'lucide-react';
import { themeClasses, combineThemeClasses } from '../../lib/themeClasses';

interface AutoRenewToggleProps {
  isEnabled: boolean;
  onToggle: (enabled: boolean) => void;
  disabled?: boolean;
  loading?: boolean;
  nextBillingDate?: string;
  billingCycle?: string;
  showDetails?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const AutoRenewToggle: React.FC<AutoRenewToggleProps> = ({
  isEnabled,
  onToggle,
  disabled = false,
  loading = false,
  nextBillingDate,
  billingCycle,
  showDetails = true,
  size = 'md'
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const sizeClasses = {
    sm: {
      toggle: 'w-10 h-6',
      thumb: 'w-4 h-4',
      text: 'text-sm',
      icon: 'w-4 h-4'
    },
    md: {
      toggle: 'w-12 h-7',
      thumb: 'w-5 h-5',
      text: 'text-base',
      icon: 'w-5 h-5'
    },
    lg: {
      toggle: 'w-14 h-8',
      thumb: 'w-6 h-6',
      text: 'text-lg',
      icon: 'w-6 h-6'
    }
  };

  const currentSize = sizeClasses[size];

  const formatNextBilling = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getBillingText = () => {
    if (!billingCycle) return '';
    return billingCycle.charAt(0).toUpperCase() + billingCycle.slice(1);
  };

  return (
    <div className="space-y-3">
      {/* Toggle Control */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <button
              onClick={() => onToggle(!isEnabled)}
              disabled={disabled || loading}
              className={combineThemeClasses(
                'relative inline-flex items-center rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
                currentSize.toggle,
                isEnabled 
                  ? 'bg-green-500 hover:bg-green-600' 
                  : 'bg-gray-300 hover:bg-gray-400',
                disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
              )}
            >
              <span
                className={combineThemeClasses(
                  'inline-block rounded-full bg-white shadow-lg transform transition-transform duration-300',
                  currentSize.thumb,
                  isEnabled ? 'translate-x-6' : 'translate-x-1'
                )}
              />
              
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className={combineThemeClasses(themeClasses.loading.spinner, 'w-3 h-3')}></div>
                </div>
              )}
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <RotateCcwIcon className={combineThemeClasses(
              currentSize.icon,
              isEnabled ? 'text-green-600' : themeClasses.text.muted
            )} />
            <span className={combineThemeClasses(
              themeClasses.text.heading,
              'font-medium',
              currentSize.text
            )}>
              Auto-Renew
            </span>
          </div>
        </div>

        {/* Status Indicator */}
        <div className="flex items-center space-x-2">
          {isEnabled ? (
            <div className="flex items-center space-x-1 text-green-600">
              <CheckCircleIcon className={currentSize.icon} />
              <span className={combineThemeClasses('font-medium', currentSize.text)}>
                Enabled
              </span>
            </div>
          ) : (
            <div className="flex items-center space-x-1 text-gray-500">
              <XCircleIcon className={currentSize.icon} />
              <span className={combineThemeClasses('font-medium', currentSize.text)}>
                Disabled
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Details Section */}
      {showDetails && (
        <div className={combineThemeClasses(
          themeClasses.background.elevated,
          'rounded-lg p-4 border',
          themeClasses.border.light
        )}>
          <div className="flex items-start space-x-3">
            <InfoIcon className={combineThemeClasses(
              themeClasses.text.muted,
              'w-5 h-5 mt-0.5 flex-shrink-0'
            )} />
            <div className="flex-1 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <h4 className={combineThemeClasses(themeClasses.text.heading, 'font-medium text-sm')}>
                  Subscription Renewal
                </h4>
                {nextBillingDate && (
                  <span className={combineThemeClasses(themeClasses.text.secondary, 'text-sm')}>
                    Next billing: {formatNextBilling(nextBillingDate)}
                  </span>
                )}
              </div>
              
              <div className="space-y-1">
                {isEnabled ? (
                  <div className="space-y-1">
                    <p className={combineThemeClasses(themeClasses.text.secondary, 'text-sm')}>
                      Your subscription will automatically renew {billingCycle ? getBillingText().toLowerCase() : 'on schedule'}.
                    </p>
                    <p className={combineThemeClasses(themeClasses.text.muted, 'text-xs')}>
                      You can cancel or modify your subscription at any time before the next billing date.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <p className={combineThemeClasses(themeClasses.text.secondary, 'text-sm')}>
                      Your subscription will not automatically renew. It will end after the current billing period.
                    </p>
                    <p className={combineThemeClasses(themeClasses.text.muted, 'text-xs')}>
                      You can re-enable auto-renewal at any time to continue your subscription.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Billing Cycle Info */}
      {billingCycle && showDetails && (
        <div className="flex items-center justify-center space-x-2 text-center">
          <div className={combineThemeClasses(
            themeClasses.background.surface,
            'px-3 py-1 rounded-full border',
            themeClasses.border.light
          )}>
            <span className={combineThemeClasses(themeClasses.text.muted, 'text-xs')}>
              Billing Cycle: {getBillingText()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};