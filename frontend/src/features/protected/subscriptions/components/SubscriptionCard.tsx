import React, { useEffect, useState } from 'react';
import { 
  CalendarIcon, 
  ToggleLeftIcon,
  ToggleRightIcon,
  EditIcon,
  TrashIcon,
  PauseIcon,
  PlayIcon,
  XIcon,
  EyeIcon
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { themeClasses, combineThemeClasses, getButtonClasses } from '../../../../utils/themeClasses';
import { Button } from '@/components/ui/Button';
import { formatCurrency } from '../../../../utils/orderCalculations';

interface SubscriptionCardProps {
  subscription: any;
  onUpdate?: (id: string, updates: any) => Promise<any> | void;
  onToggleAutoRenew?: (id: string, enabled: boolean) => Promise<any> | void;
  onPause?: (id: string) => Promise<any> | void;
  onResume?: (id: string) => Promise<any> | void;
  onActivate?: (id: string) => Promise<any> | void;
  onCancel?: (id: string) => Promise<any> | void;
  onDelete?: (id: string) => Promise<any> | void;
  onProductManage?: (id: string) => void;
  showActions?: boolean;
}

export const SubscriptionCard: React.FC<SubscriptionCardProps> = ({
  subscription,
  onUpdate,
  onToggleAutoRenew,
  onPause,
  onResume,
  onActivate,
  onCancel,
  onDelete,
  onProductManage,
  showActions = true
}) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isPausing, setIsPausing] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [isTogglingAutoRenew, setIsTogglingAutoRenew] = useState(false);
  const [isResuming, setIsResuming] = useState(false);
  const [isReactivating, setIsReactivating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [editData, setEditData] = useState({
    billing_cycle: subscription.billing_cycle as 'weekly' | 'monthly' | 'yearly',
    name: subscription.name || ''
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'expired':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleUpdate = async () => {
    if (!onUpdate) return;
    
    setIsUpdating(true);
    try {
      await onUpdate(subscription.id, {
        name: editData.name,
        billing_cycle: editData.billing_cycle
      });
      setIsEditing(false);
      toast.success('Subscription updated successfully');
    } catch (error) {
      console.error('Failed to update subscription:', error);
      toast.error('Failed to update subscription');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancelEdit = () => {
    setEditData({
      billing_cycle: subscription.billing_cycle as 'weekly' | 'monthly' | 'yearly',
      name: subscription.name || ''
    });
    setIsEditing(false);
  };

  const handleProductManageClick = () => {
    onProductManage?.(subscription.id);
  };

  const handleAutoRenewToggle = async () => {
    if (!onToggleAutoRenew) return;
    
    setIsTogglingAutoRenew(true);
    try {
      await onToggleAutoRenew(subscription.id, !subscription.auto_renew);
      toast.success(`Auto-renewal ${!subscription.auto_renew ? 'enabled' : 'disabled'}`);
    } catch (error) {
      console.error('Failed to toggle auto-renewal:', error);
      toast.error('Failed to update auto-renewal');
    } finally {
      setIsTogglingAutoRenew(false);
    }
  };

  const handlePause = async () => {
    if (!onPause) return;
    
    setIsPausing(true);
    try {
      await onPause(subscription.id);
      toast.success('Subscription paused');
    } catch (error) {
      console.error('Failed to pause subscription:', error);
      toast.error('Failed to pause subscription');
    } finally {
      setIsPausing(false);
    }
  };

  const handleResume = async () => {
    if (!onResume) return;
    
    setIsResuming(true);
    try {
      await onResume(subscription.id);
      toast.success('Subscription resumed');
    } catch (error) {
      console.error('Failed to resume subscription:', error);
      toast.error('Failed to resume subscription');
    } finally {
      setIsResuming(false);
    }
  };

  const handleReactivate = async () => {
    if (!onActivate) return;
    
    setIsReactivating(true);
    try {
      await onActivate(subscription.id);
      toast.success('Subscription reactivated');
    } catch (error) {
      console.error('Failed to reactivate subscription:', error);
      toast.error('Failed to reactivate subscription');
    } finally {
      setIsReactivating(false);
    }
  };

  const handleCancel = async () => {
    if (!onCancel) return;
    
    setIsCancelling(true);
    try {
      await onCancel(subscription.id);
      toast.success('Subscription cancelled');
    } catch (error) {
      console.error('Failed to cancel subscription:', error);
      toast.error('Failed to cancel subscription');
    } finally {
      setIsCancelling(false);
    }
  };

  const handleDelete = async () => {
    if (!onDelete) return;
    
    setIsDeleting(true);
    try {
      await onDelete(subscription.id);
      toast.success('Subscription deleted');
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Failed to delete subscription:', error);
      toast.error('Failed to delete subscription');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className={combineThemeClasses(
      themeClasses.card.base,
      'p-3 space-y-2 max-w-md w-full'
    )}>
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {isEditing ? (
            <div className="space-y-3">
              <div>
                <label className={combineThemeClasses(themeClasses.text.primary, 'block text-sm font-medium mb-1')}>
                  Subscription Name
                </label>
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                  className={combineThemeClasses(themeClasses.input.base, themeClasses.input.default, 'text-sm')}
                  placeholder="Enter subscription name"
                />
              </div>
              <div>
                <label className={combineThemeClasses(themeClasses.text.primary, 'block text-sm font-medium mb-1')}>
                  Billing Cycle
                </label>
                <select
                  value={editData.billing_cycle}
                  onChange={(e) => setEditData({ ...editData, billing_cycle: e.target.value as any })}
                  className={combineThemeClasses(themeClasses.input.base, themeClasses.input.default, 'text-sm')}
                >
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
            </div>
          ) : (
            <>
              <h3 className={combineThemeClasses(themeClasses.text.primary, 'text-xs font-medium')}>
                {subscription.name}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className={combineThemeClasses(themeClasses.text.primary, 'font-medium text-xs')}>
                  {formatCurrency(subscription.price, subscription.currency)}
                </span>
                <span className={themeClasses.text.secondary}>
                  / {subscription.billing_cycle}
                </span>
              </div>
            </>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <span className={combineThemeClasses(
            'px-2 py-1 text-xs font-medium rounded-full border',
            getStatusColor(subscription.status)
          )}>
            {subscription.status?.charAt(0).toUpperCase() + subscription.status?.slice(1)}
          </span>
          <Button
            onClick={() => navigate(`/account/subscriptions/${subscription.id}`)}
            variant="primary"
            size="sm"
            title="View details"
          >
            View Details
          </Button>
        </div>
      </div>

      {/* Description */}
      <p className={combineThemeClasses(themeClasses.text.secondary, 'text-xs mb-1')}>
        {subscription.products?.length || 0} products • {subscription.billing_cycle}
      </p>

      {/* Next billing */}
      {subscription.next_billing_date && (
        <div className="flex items-center gap-1 text-xs">
          <CalendarIcon className="w-3 h-3" />
          <span className={themeClasses.text.secondary}>
            Next: {formatDate(subscription.next_billing_date)}
          </span>
        </div>
      )}

      {/* Auto-renew toggle */}
      <div className="flex items-center justify-between">
        <span className="text-xs">Auto-renew</span>
        <Button
          onClick={handleAutoRenewToggle}
          disabled={isTogglingAutoRenew}
          variant="ghost"
          size="sm"
          className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
        >
          {subscription.auto_renew ? 'Disable' : 'Enable'}
        </Button>
      </div>

      {/* Actions */}
      {showActions && (
        <div className="flex flex-wrap gap-2">
          {isEditing ? (
            <>
              <Button
                onClick={handleUpdate}
                disabled={isUpdating}
                variant="primary"
                size="sm"
              >
                {isUpdating ? 'Saving...' : 'Save'}
              </Button>
              <Button
                onClick={handleCancelEdit}
                variant="secondary"
                size="sm"
              >
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => setIsEditing(true)}
                variant="secondary"
                size="sm"
              >
                Edit
              </Button>
              
              {subscription.status === 'active' && onPause && (
                <Button
                  onClick={handlePause}
                  disabled={isPausing}
                  variant="warning"
                  size="sm"
                >
                  Pause
                </Button>
              )}
              
              {subscription.status === 'paused' && onResume && (
                <Button
                  onClick={handleResume}
                  disabled={isResuming}
                  variant="success"
                  size="sm"
                >
                  Resume
                </Button>
              )}
              
              {(subscription.status === 'cancelled' || subscription.status === 'expired') && onActivate && (
                <Button
                  onClick={handleReactivate}
                  disabled={isReactivating}
                  variant="success"
                  size="sm"
                >
                  Reactivate
                </Button>
              )}
              
              {subscription.status === 'active' && onCancel && (
                <Button
                  onClick={handleCancel}
                  disabled={isCancelling}
                  variant="error"
                  size="sm"
                >
                  Cancel
                </Button>
              )}
              
              {onDelete && (
                <Button
                  onClick={() => setShowDeleteModal(true)}
                  disabled={isDeleting}
                  variant="error"
                  size="sm"
                >
                  Delete
                </Button>
              )}
            </>
          )}
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowDeleteModal(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm mx-4" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold mb-2">Delete Subscription</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Are you sure you want to delete this subscription? This action cannot be undone.
            </p>
            <div className="flex gap-2 justify-end">
              <Button
                onClick={() => setShowDeleteModal(false)}
                variant="secondary"
                size="sm"
              >
                Cancel
              </Button>
              <Button
                onClick={handleDelete}
                disabled={isDeleting}
                variant="error"
                size="sm"
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </Button>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
