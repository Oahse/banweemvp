import React, { useEffect, useState } from 'react';
import { 
  CalendarIcon, 
  ToggleLeftIcon,
  ToggleRightIcon,
  PauseIcon,
  PlayIcon,
  XIcon,
  EditIcon,
  SaveIcon,
  XCircleIcon,
  PlusIcon,
  MinusIcon,
  ChevronDownIcon,
  EyeIcon,
  TagIcon,
  ArrowRightIcon
} from 'lucide-react';
import { themeClasses, combineThemeClasses, getButtonClasses } from '../../utils/themeClasses';
import { toggleAutoRenew, Subscription } from '../../api/subscription';
import { formatCurrency, formatTaxRate } from '../../utils/orderCalculations';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

interface SubscriptionCardProps {
  subscription: Subscription;
  onUpdate?: (id: string, updates: any) => void;
  onPause?: (id: string) => void;
  onResume?: (id: string) => void;
  onCancel?: (id: string) => void;
  onActivate?: (id: string) => void;
  onAddProducts?: (subscription: any) => void;
  onRemoveProduct?: (subscriptionId: string, variantId: string) => void;
  onProductManage?: (subscriptionId: string) => void;
  onDiscountApply?: (subscriptionId: string, discountCode: string) => void;
  showActions?: boolean;
}

export const SubscriptionCard: React.FC<SubscriptionCardProps> = ({
  subscription,
  onUpdate,
  onPause,
  onResume,
  onCancel,
  onActivate,
  onAddProducts,
  onRemoveProduct,
  onProductManage,
  onDiscountApply,
  showActions = true
}) => {
  const navigate = useNavigate();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isPausing, setIsPausing] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [isTogglingAutoRenew, setIsTogglingAutoRenew] = useState(false);
  const [isResuming, setIsResuming] = useState(false);
  const [isReactivating, setIsReactivating] = useState(false);

  const [editData, setEditData] = useState({
    billing_cycle: subscription.billing_cycle as 'weekly' | 'monthly' | 'yearly',
    plan_id: subscription.plan_id
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
        return 'bg-success/10 text-success border-success/20 dark:bg-success/20 dark:border-success/30';
      case 'paused':
        return 'bg-warning/10 text-warning border-warning/20 dark:bg-warning/20 dark:border-warning/30';
      case 'cancelled':
        return 'bg-red/10 text-red border-red-200 dark:bg-red-900/20 dark:border-red-800';
      default:
        return 'bg-muted text-muted-foreground border-border dark:bg-muted/50';
    }
  };

  const handleAutoRenewToggle = async () => {
    if (isTogglingAutoRenew) return;
    
    setIsTogglingAutoRenew(true);
    const currentValue = subscription.auto_renew;
    const newValue = !currentValue;
    
    try {
      console.log('Toggling auto-renew from', currentValue, 'to', newValue);
      
      const result = await toggleAutoRenew(subscription.id, newValue);
      console.log('API response:', result);
      
      // Handle different response structures
      let updatedValue = newValue; // Default to what we requested
      
      if (result && typeof result === 'object') {
        // Check if the response has the updated value
        const responseObj = result as any;
        if (responseObj.auto_renew !== undefined) {
          updatedValue = responseObj.auto_renew;
        } else if (responseObj.data && responseObj.data.auto_renew !== undefined) {
          updatedValue = responseObj.data.auto_renew;
        }
      }
      
      console.log('Final auto-renew value:', updatedValue);
      
      // Update the subscription state
      onUpdate?.(subscription.id, { auto_renew: updatedValue });
      
      // Show success message
      toast.success(`Auto-renew ${updatedValue ? 'enabled' : 'disabled'}`);
      
    } catch (error) {
      console.error('Failed to update auto-renew:', error);
      toast.error('Failed to update auto-renew');
      // Revert to original state on error
      onUpdate?.(subscription.id, { auto_renew: currentValue });
    } finally {
      setIsTogglingAutoRenew(false);
    }
  };

  const handlePause = async () => {
    setIsPausing(true);
    try {
      await onPause(subscription.id);
      toast.success('Subscription paused successfully');
    } catch (error) {
      console.error('Failed to pause subscription:', error);
      toast.error('Failed to pause subscription');
    } finally {
      setIsPausing(false);
    }
  };

  const handleCancel = async () => {
    setIsCancelling(true);
    try {
      await onCancel(subscription.id);
      toast.success('Subscription cancelled successfully');
    } catch (error) {
      console.error('Failed to cancel subscription:', error);
      toast.error('Failed to cancel subscription');
    } finally {
      setIsCancelling(false);
    }
  };

  const handleResume = async () => {
    setIsResuming(true);
    try {
      await onResume(subscription.id);
      toast.success('Subscription resumed successfully');
    } catch (error) {
      console.error('Failed to resume subscription:', error);
      toast.error('Failed to resume subscription');
    } finally {
      setIsResuming(false);
    }
  };

  const handleReactivate = async () => {
    setIsReactivating(true);
    try {
      await onActivate(subscription.id);
      toast.success('Subscription reactivated successfully');
    } catch (error) {
      console.error('Failed to reactivate subscription:', error);
      toast.error('Failed to reactivate subscription');
    } finally {
      setIsReactivating(false);
    }
  };

  const handleSaveEdit = async () => {
    setIsUpdating(true);
    try {
      onUpdate?.(subscription.id, editData);
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
      plan_id: subscription.plan_id
    });
    setIsEditing(false);
  };

  const handleProductManageClick = () => {
    onProductManage?.(subscription.id);
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
                  Subscription Plan
                </label>
                <select
                  value={editData.plan_id}
                  onChange={(e) => setEditData({ ...editData, plan_id: e.target.value })}
                  className={combineThemeClasses(themeClasses.input.base, themeClasses.input.default, 'text-sm')}
                >
                  <option value="basic">Basic Subscription</option>
                  <option value="premium">Premium Subscription</option>
                  <option value="enterprise">Enterprise Subscription</option>
                </select>
              </div>
              <div>
                <label className={combineThemeClasses(themeClasses.text.primary, 'block text-sm font-medium mb-1')}>
                  Billing Cycle
                </label>
                <select
                  value={editData.billing_cycle}
                  onChange={(e) => setEditData({ ...editData, billing_cycle: e.target.value as 'weekly' | 'monthly' | 'yearly' })}
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
                {subscription.plan_id?.charAt(0).toUpperCase() + subscription.plan_id?.slice(1)} Plan
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className={combineThemeClasses(themeClasses.text.primary, 'font-medium text-xs')}>
                  {formatCurrency(subscription.price, subscription.currency)}
                </span>
                <span className={themeClasses.text.secondary}>
                  / {subscription.billing_cycle}
                </span>
              </div>
              <p className={combineThemeClasses(themeClasses.text.secondary, 'text-xs mb-1')}>
                {subscription.products?.length || 0} products • {subscription.billing_cycle}
              </p>
            </>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <span className={combineThemeClasses(
            'px-2 py-1 text-xs font-medium rounded-full border',
            getStatusColor(subscription.status)
          )}>
            {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
          </span>
          <button
            onClick={() => navigate(`/account/subscriptions/${subscription.id}`)}
            className="p-1 rounded text-primary hover:bg-primary/10 transition-colors"
            title="View details"
          >
            <EyeIcon className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Next Billing */}
      {subscription.next_billing_date && subscription.status === 'active' && (
        <div className="flex items-center gap-2">
          <CalendarIcon className={combineThemeClasses(themeClasses.text.muted, 'w-4 h-4')} />
          <span className={combineThemeClasses(themeClasses.text.secondary, 'text-xs')}>
            Next billing: {formatDate(subscription.next_billing_date)}
          </span>
        </div>
      )}

      {/* Auto-Renew Settings */}
      {subscription.status !== 'cancelled' && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 rounded-lg border border-border bg-card">
          <div className="flex items-center gap-3">
            <button
              onClick={handleAutoRenewToggle}
              disabled={isTogglingAutoRenew}
              className={combineThemeClasses(
                'transition-all duration-200 transform',
                isTogglingAutoRenew ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-105'
              )}
              title={subscription.auto_renew ? 'Disable auto-renewal' : 'Enable auto-renewal'}
            >
              {subscription.auto_renew ? (
                <div className="flex items-center gap-1">
                  {isTogglingAutoRenew ? (
                    <div className="w-3 h-3 border-2 border-success border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <ToggleRightIcon className="w-6 h-6 text-success" />
                  )}
                  <span className="text-xs text-success font-medium">
                    {isTogglingAutoRenew ? 'Updating...' : 'ON'}
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  {isTogglingAutoRenew ? (
                    <div className="w-3 h-3 border-2 border-muted-foreground border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <ToggleLeftIcon className="w-6 h-6 text-muted-foreground" />
                  )}
                  <span className="text-xs text-muted-foreground font-medium">
                    {isTogglingAutoRenew ? 'Updating...' : 'OFF'}
                  </span>
                </div>
              )}
            </button>

            <div className="min-w-0">
              <span className={combineThemeClasses(themeClasses.text.primary, 'font-medium text-xs')}>
                Automatic Renewal
              </span>
              <p
                className={combineThemeClasses(
                  themeClasses.text.secondary,
                  'text-xs break-words'
                )}
              >
                {subscription.auto_renew
                  ? `Renews automatically every ${subscription.billing_cycle}`
                  : 'Auto-renewal disabled - expires after current period'}
              </p>
            </div>
          </div>

          {isUpdating && (
            <div className="self-start sm:self-center w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          )}
        </div>
      )}

      {/* Subscription Actions */}
      {showActions && (
        <div className="flex items-center gap-2 pt-2 border-t border-gray-200 dark:border-gray-700">
          {subscription.status === 'active' && (
            <>
              {onPause && (
                <button
                  onClick={handlePause}
                  disabled={isPausing}
                  className={combineThemeClasses(
                    'px-3 py-1 text-xs rounded-md border border-warning text-warning hover:bg-warning/10 transition-colors flex items-center gap-1',
                    isPausing ? 'opacity-50 cursor-not-allowed' : ''
                  )}
                >
                  {isPausing ? (
                    <>
                      <div className="w-3 h-3 border-2 border-warning border-t-transparent rounded-full animate-spin" />
                      Pausing...
                    </>
                  ) : (
                    <>
                      <PauseIcon className="w-3 h-3" />
                      Pause
                    </>
                  )}
                </button>
              )}
              {onCancel && (
                <button
                  onClick={handleCancel}
                  disabled={isCancelling}
                  className={combineThemeClasses(
                    'px-3 py-1 text-xs rounded-md bg-red-600 hover:bg-red-700 text-white transition-colors flex items-center gap-1',
                    isCancelling ? 'opacity-50 cursor-not-allowed' : ''
                  )}
                >
                  {isCancelling ? (
                    <>
                      <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Cancelling...
                    </>
                  ) : (
                    <>
                      <XIcon className="w-3 h-3" />
                      Cancel
                    </>
                  )}
                </button>
              )}
            </>
          )}
          
          {subscription.status === 'paused' && onResume && (
            <button
              onClick={handleResume}
              disabled={isResuming}
              className={combineThemeClasses(
                getButtonClasses('primary'),
                'text-xs flex items-center gap-1',
                isResuming ? 'opacity-50 cursor-not-allowed' : ''
              )}
            >
              {isResuming ? (
                <>
                  <div className="w-3 h-3 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                  Resuming...
                </>
              ) : (
                <>
                  <PlayIcon className="w-3 h-3" />
                  Resume
                </>
              )}
            </button>
          )}

          {subscription.status === 'cancelled' && onActivate && (
            <button
              onClick={handleReactivate}
              disabled={isReactivating}
              className={combineThemeClasses(
                'px-3 py-1 text-xs rounded-md border border-success text-success hover:bg-success/10 transition-colors flex items-center gap-1',
                isReactivating ? 'opacity-50 cursor-not-allowed' : ''
              )}
            >
              {isReactivating ? (
                <>
                  <div className="w-3 h-3 border-2 border-success border-t-transparent rounded-full animate-spin" />
                  Activating...
                </>
              ) : (
                <>
                  <PlayIcon className="w-3 h-3" />
                  Reactivate
                </>
              )}
            </button>
          )}
        </div>
      )}
    </div>
  );
};