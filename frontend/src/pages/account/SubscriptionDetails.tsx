import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSubscription } from '../../store/SubscriptionContext';
import { themeClasses, combineThemeClasses } from '../../utils/themeClasses';
import { formatCurrency } from '../../utils/orderCalculations';
import { toast } from 'react-hot-toast';
import { SubscriptionAPI } from '../../api/subscription';
import { 
  ArrowLeftIcon,
  EyeIcon,
  TagIcon,
  PackageIcon,
  CalendarIcon,
  CreditCardIcon,
  TruckIcon,
  PercentIcon,
  PauseIcon,
  TrashIcon
} from 'lucide-react';
import SubscriptionItem from '../../components/subscription/SubscriptionItem';
import { AutoRenewToggle } from '../../components/subscription/AutoRenewToggle';
import { ConfirmationModal } from '../../components/ui/ConfirmationModal';

interface SubscriptionDetailsProps {}

export const SubscriptionDetails: React.FC<SubscriptionDetailsProps> = () => {
  const { subscriptionId } = useParams<{ subscriptionId: string }>();
  const navigate = useNavigate();
  const { subscriptions, refreshSubscriptions, updateSubscription, cancelSubscription, deleteSubscription, activateSubscription, pauseSubscription, resumeSubscription } = useSubscription();
  
  const [subscription, setSubscription] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showProducts, setShowProducts] = useState(true);
  const [showBillingSummary, setShowBillingSummary] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: '',
    billing_cycle: 'monthly' as 'weekly' | 'monthly' | 'yearly',
    delivery_type: 'standard' as 'standard' | 'express' | 'overnight'
  });

  useEffect(() => {
    let isCancelled = false;

    const normalizeBillingCycle = (value: any): 'weekly' | 'monthly' | 'yearly' => {
      if (value === 'weekly' || value === 'monthly' || value === 'yearly') return value;
      return 'monthly';
    };

    const load = async () => {
      if (!subscriptionId) return;
      setLoading(true);

      const foundSubscription = subscriptions.find(sub => sub.id === subscriptionId);
      if (foundSubscription) {
        if (!isCancelled) {
          setSubscription(foundSubscription);
          setEditData({
            name: foundSubscription.name || '',
            billing_cycle: normalizeBillingCycle(foundSubscription.billing_cycle),
            delivery_type: (foundSubscription as any).delivery_type || 'standard'
          });
          setLoading(false);
        }
        return;
      }

      try {
        const response = await SubscriptionAPI.getSubscription(subscriptionId);
        const fetched = (response as any)?.data ?? response;
        if (!isCancelled) {
          if (fetched) {
            setSubscription(fetched);
            setEditData({
              name: fetched.name || '',
              billing_cycle: normalizeBillingCycle(fetched.billing_cycle),
              delivery_type: fetched.delivery_type || 'standard'
            });
          } else {
            toast.error('Subscription not found');
            navigate('/account/subscriptions');
          }
        }
      } catch (error) {
        if (!isCancelled) {
          toast.error('Failed to load subscription');
          navigate('/account/subscriptions');
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    load();
    return () => {
      isCancelled = true;
    };
  }, [subscriptionId, subscriptions, navigate]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
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

  const handleAutoRenewToggle = async (enabled: boolean) => {
    if (!subscription) return;
    
    try {
      await updateSubscription(subscription.id, { auto_renew: enabled });
      setSubscription({ ...subscription, auto_renew: enabled });
      await refreshSubscriptions();
      toast.success(`Auto-renew ${enabled ? 'enabled' : 'disabled'}`);
    } catch (error) {
      toast.error('Failed to update auto-renewal');
    }
  };

  const handleSave = async () => {
    if (!subscription) return;

    try {
      const updated = await updateSubscription(subscription.id, {
        name: editData.name,
        billing_cycle: editData.billing_cycle,
        delivery_type: editData.delivery_type
      });

      if (updated) {
        const normalized = (updated as any)?.data ?? updated;
        setSubscription(normalized);
      } else {
        setSubscription({
          ...subscription,
          name: editData.name,
          billing_cycle: editData.billing_cycle,
          delivery_type: editData.delivery_type
        });
      }

      await refreshSubscriptions();
      setIsEditing(false);
      toast.success('Subscription updated');
    } catch (error) {
      toast.error('Failed to update subscription');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
          <div className="h-5 w-40 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-7 w-40 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="space-y-2">
                    <div className="h-4 w-28 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                    <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                    <div className="h-6 w-28 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                    <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  </div>
                </div>
              </div>

              <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            </div>
          </div>

          <div className="space-y-4">
            <div className="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            </div>
          </div>

          <div className="space-y-4">
            <div className="h-5 w-40 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 space-y-3">
              <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!subscription) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <PackageIcon size={48} className="text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Subscription not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/account/subscriptions')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white mb-4"
          >
            <ArrowLeftIcon size={20} />
            Back to Subscriptions
          </button>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  {isEditing ? (
                    <div className="flex flex-col gap-3 w-full max-w-md">
                      <input
                        type="text"
                        value={editData.name}
                        onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="Enter subscription name"
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <select
                          value={editData.billing_cycle}
                          onChange={(e) => setEditData({ ...editData, billing_cycle: e.target.value as any })}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        >
                          <option value="weekly">Weekly</option>
                          <option value="monthly">Monthly</option>
                          <option value="yearly">Yearly</option>
                        </select>

                        <select
                          value={editData.delivery_type}
                          onChange={(e) => setEditData({ ...editData, delivery_type: e.target.value as any })}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        >
                          <option value="standard">Standard</option>
                          <option value="express">Express</option>
                          <option value="overnight">Overnight</option>
                        </select>
                      </div>
                    </div>
                  ) : (
                    <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                      {subscription.name}
                    </h1>
                  )}
                  <span className={`
                    px-2 py-0.5 rounded-full text-xs font-medium
                    ${getStatusColor(subscription.status)}
                  `}>
                    {subscription.status?.charAt(0).toUpperCase() + subscription.status?.slice(1)}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Monthly Amount</p>
                    <p className="text-base font-bold text-gray-900 dark:text-white">
                      {formatCurrency(subscription.price || 0, subscription.currency)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Billing Cycle</p>
                    <p className="text-base font-bold text-gray-900 dark:text-white">
                      {subscription.billing_cycle?.charAt(0).toUpperCase() + subscription.billing_cycle?.slice(1)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Next Billing</p>
                    <p className="text-base font-bold text-gray-900 dark:text-white">
                      {subscription.next_billing_date ? formatDate(subscription.next_billing_date) : 'Not set'}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <AutoRenewToggle
                  isEnabled={subscription.auto_renew}
                  onToggle={handleAutoRenewToggle}
                  showDetails={true}
                  size="sm"
                />

                {isEditing ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleSave}
                      className="px-3 py-1.5 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors text-sm"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setEditData({
                          name: subscription.name || '',
                          billing_cycle: subscription.billing_cycle,
                          delivery_type: subscription.delivery_type || 'standard'
                        });
                      }}
                      className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-3 py-1.5 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors text-sm"
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {subscription.status === 'active' && (
              <button
                onClick={() => pauseSubscription(subscription.id)}
                className="flex items-center justify-center gap-1.5 px-3 py-2 bg-yellow-50 text-yellow-700 rounded-md hover:bg-yellow-100 transition-colors text-xs"
              >
                <PauseIcon size={16} />
                Pause
              </button>
            )}
            
            {subscription.status === 'paused' && (
              <button
                onClick={() => resumeSubscription(subscription.id)}
                className="flex items-center justify-center gap-1.5 px-3 py-2 bg-green-50 text-green-700 rounded-md hover:bg-green-100 transition-colors text-xs"
              >
                <CalendarIcon size={16} />
                Resume
              </button>
            )}

            {subscription.status !== 'cancelled' ? (
              <button
                onClick={() => cancelSubscription(subscription.id)}
                className="flex items-center justify-center gap-1.5 px-3 py-2 bg-white text-gray-700 rounded-md hover:bg-gray-50 transition-colors border border-gray-200 text-xs"
              >
                <CreditCardIcon size={16} />
                Cancel
              </button>
            ) : (
              <button
                onClick={() => activateSubscription(subscription.id)}
                className="flex items-center justify-center gap-1.5 px-3 py-2 bg-green-50 text-green-700 rounded-md hover:bg-green-100 transition-colors text-xs"
              >
                <CalendarIcon size={16} />
                Reactivate
              </button>
            )}

            <button
              onClick={() => setShowDeleteModal(true)}
              className="flex items-center justify-center gap-1.5 px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-xs"
            >
              <TrashIcon size={16} />
              Delete
            </button>
            
            <button
              onClick={() => navigate('/account/subscriptions')}
              className="flex items-center justify-center gap-1.5 px-3 py-2 bg-gray-50 text-gray-700 rounded-md hover:bg-gray-100 transition-colors text-xs"
            >
              <PackageIcon size={16} />
              Products
            </button>
          </div>
        </div>

        {/* Detailed Information */}
        <div className="space-y-4">
          {/* Subscription Item Component */}
          <SubscriptionItem
            subscription={subscription}
            isExpanded={true}
          />

          {/* Additional Details */}
          <div className="bg-white dark:bg-gray-800 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 p-4">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Subscription Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Subscription ID</p>
                  <p className="font-medium text-xs text-gray-900 dark:text-white">{subscription.id}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Created Date</p>
                  <p className="font-medium text-xs text-gray-900 dark:text-white">
                    {subscription.created_at ? formatDate(subscription.created_at) : 'Not available'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Current Period</p>
                  <p className="font-medium text-xs text-gray-900 dark:text-white">
                    {subscription.current_period_start && subscription.current_period_end
                      ? `${formatDate(subscription.current_period_start)} - ${formatDate(subscription.current_period_end)}`
                      : 'Not available'
                    }
                  </p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Payment Method</p>
                  <p className="font-medium text-xs text-gray-900 dark:text-white">•••• •••• •••• 4242</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Delivery Type</p>
                  <p className="font-medium text-xs text-gray-900 dark:text-white">
                    {subscription.delivery_type || 'Standard'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Customer Support</p>
                  <p className="font-medium text-xs text-gray-900 dark:text-white">support@example.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <ConfirmationModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={async () => {
            const ok = await deleteSubscription(subscription.id);
            if (ok) {
              navigate('/account/subscriptions');
            }
          }}
          title="Delete Subscription"
          message="Delete this subscription permanently? This cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
          variant="danger"
        />
      )}
      </div>
    </div>
  );
};

export default SubscriptionDetails;
