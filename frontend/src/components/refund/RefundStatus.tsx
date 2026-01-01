/**
 * Refund Status Component - Shows refund progress with timeline
 */
import React from 'react';
import { format } from 'date-fns';
import { CheckCircleIcon, ClockIcon, XCircleIcon } from '@heroicons/react/24/outline';

interface RefundStatusProps {
  refund: any;
}

export const RefundStatus: React.FC<RefundStatusProps> = ({ refund }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'requested': return 'bg-warning-light text-warning-dark dark:bg-warning-dark dark:text-warning-light';
      case 'approved': return 'bg-success-light text-success-dark dark:bg-success-dark dark:text-success-light';
      case 'processing': return 'bg-info-light text-info-dark dark:bg-info-dark dark:text-info-light';
      case 'completed': return 'bg-success-light text-success-dark dark:bg-success-dark dark:text-success-light';
      case 'rejected': return 'bg-error-light text-error-dark dark:bg-error-dark dark:text-error-light';
      case 'cancelled': return 'bg-surface-hover text-copy-light dark:bg-surface-active dark:text-copy-lighter';
      default: return 'bg-surface-hover text-copy-light dark:bg-surface-active dark:text-copy-lighter';
    }
  };

  const getStatusIcon = (status: string, completed: boolean) => {
    if (completed) {
      return <CheckCircleIcon className="w-5 h-5 text-success" />;
    }
    if (status === 'rejected' || status === 'cancelled') {
      return <XCircleIcon className="w-5 h-5 text-error" />;
    }
    return <ClockIcon className="w-5 h-5 text-copy-lighter" />;
  };

  return (
    <div className="bg-surface rounded-lg shadow-sm border-border border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-copy">Refund #{refund.refund_number}</h3>
          <p className="text-sm text-copy-light">
            Requested on {format(new Date(refund.requested_at), 'MMM dd, yyyy')}
          </p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(refund.status)}`}>
          {refund.status.replace('_', ' ').toUpperCase()}
        </span>
      </div>

      {/* Timeline */}
      <div className="space-y-4">
        {refund.timeline?.map((step, index) => (
          <div key={index} className="flex items-start space-x-3">
            {getStatusIcon(step.status, step.completed)}
            <div className="flex-1">
              <div className="font-medium text-copy">{step.title}</div>
              <div className="text-sm text-copy-light">{step.description}</div>
              {step.timestamp && (
                <div className="text-xs text-copy-lighter mt-1">
                  {format(new Date(step.timestamp), 'MMM dd, yyyy at h:mm a')}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Refund amount */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex justify-between items-center">
          <span className="text-copy-light">Refund Amount</span>
          <span className="text-xl font-bold text-success">
            ${refund.processed_amount || refund.approved_amount || refund.requested_amount}
          </span>
        </div>
      </div>
    </div>
  );
};