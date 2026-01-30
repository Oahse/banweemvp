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
  TagIcon
} from 'lucide-react';
import { themeClasses, combineThemeClasses, getButtonClasses } from '../../utils/themeClasses';
import { toggleAutoRenew, Subscription } from '../../api/subscription';
import { formatCurrency, formatTaxRate } from '../../utils/orderCalculations';
import { toast } from 'react-hot-toast';

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
  const [isUpdating, setIsUpdating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

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
        return 'bg-green-100 text-green-800 border-green-200';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleAutoRenewToggle = async () => {
    setIsUpdating(true);
    try {
      const newValue = !subscription.auto_renew;
      const result = await toggleAutoRenew(subscription.id, newValue);
      
      // Handle the response structure from backend
      const updatedData = result.data || result;
      onUpdate?.(subscription.id, { auto_renew: updatedData.auto_renew });
      toast.success(`Auto-renew ${updatedData.auto_renew ? 'enabled' : 'disabled'}`);
    } catch (error) {
      console.error('Failed to update auto-renew:', error);
      toast.error('Failed to update auto-renew');
    } finally {
      setIsUpdating(false);
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
          {subscription.status !== 'cancelled' && (
            <>
              {isEditing ? (
                <div className="flex items-center gap-1">
                  <button
                    onClick={handleSaveEdit}
                    disabled={isUpdating}
                    className={combineThemeClasses(
                      'p-1 rounded text-green-600 hover:bg-green-50 transition-colors',
                      isUpdating ? 'opacity-50 cursor-not-allowed' : ''
                    )}
                    title="Save changes"
                  >
                    <SaveIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    disabled={isUpdating}
                    className="p-1 rounded text-gray-600 hover:bg-gray-50 transition-colors"
                    title="Cancel editing"
                  >
                    <XCircleIcon className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-1 rounded text-gray-600 hover:bg-gray-50 transition-colors"
                  title="Edit subscription"
                >
                  <EditIcon className="w-4 h-4" />
                </button>
              )}
            </>
          )}
          
          <span className={combineThemeClasses(
            'px-3 py-1 text-sm font-medium rounded-full border',
            getStatusColor(subscription.status)
          )}>
            {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
          </span>
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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <button
              onClick={handleAutoRenewToggle}
              disabled={isUpdating}
              className={combineThemeClasses(
                'transition-colors',
                isUpdating ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
              )}
            >
              {subscription.auto_renew ? (
                <ToggleRightIcon className="w-6 h-6 text-green-600" />
              ) : (
                <ToggleLeftIcon className="w-6 h-6 text-gray-400" />
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
                  ? `Subscription will automatically renew every ${subscription.billing_cycle}`
                  : 'Subscription will not renew automatically and will expire after current period'}
              </p>
            </div>
          </div>

          {isUpdating && (
            <div className="self-start sm:self-center w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          )}
        </div>
      )}

      {/* Subscription Actions */}
      {showActions && (
        <div className="flex items-center gap-2 pt-2 border-t border-gray-200">
          {subscription.status === 'active' && (
            <>
              {onPause && (
                <button
                  onClick={() => onPause(subscription.id)}
                  className={combineThemeClasses(
                    'px-3 py-1 text-xs rounded-md border border-orange-300 text-orange-700 hover:bg-orange-50 transition-colors flex items-center gap-1'
                  )}
                >
                  <PauseIcon className="w-3 h-3" />
                  Pause
                </button>
              )}
              {onCancel && (
                <button
                  onClick={() => onCancel(subscription.id)}
                  className={combineThemeClasses(
                    'px-3 py-1 text-xs rounded-md border border-red-300 text-red-700 hover:bg-red-50 transition-colors flex items-center gap-1'
                  )}
                >
                  <XIcon className="w-3 h-3" />
                  Cancel
                </button>
              )}
            </>
          )}
          
          {subscription.status === 'paused' && onResume && (
            <button
              onClick={() => onResume(subscription.id)}
              className={combineThemeClasses(
                getButtonClasses('primary'),
                'text-xs flex items-center gap-1'
              )}
            >
              <PlayIcon className="w-3 h-3" />
              Resume
            </button>
          )}

          {subscription.status === 'cancelled' && onActivate && (
            <button
              onClick={() => onActivate(subscription.id)}
              className={combineThemeClasses(
                getButtonClasses('primary'),
                'text-xs flex items-center gap-1'
              )}
            >
              <PlayIcon className="w-3 h-3" />
              Reactivate
            </button>
          )}
        </div>
      )}
    </div>
  );
};