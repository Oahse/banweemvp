import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSubscription } from '../../store/SubscriptionContext';
import { themeClasses, combineThemeClasses } from '../../utils/themeClasses';
import { formatCurrency } from '../../utils/orderCalculations';
import { toast } from 'react-hot-toast';
import { 
  ArrowLeftIcon,
  EyeIcon,
  TagIcon,
  PackageIcon,
  CalendarIcon,
  CreditCardIcon,
  TruckIcon,
  PercentIcon
} from 'lucide-react';
import SubscriptionItem from '../../components/subscription/SubscriptionItem';
import { AutoRenewToggle } from '../../components/subscription/AutoRenewToggle';

interface SubscriptionDetailsProps {}

export const SubscriptionDetails: React.FC<SubscriptionDetailsProps> = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { subscriptions, updateSubscription, cancelSubscription, pauseSubscription, resumeSubscription } = useSubscription();
  
  const [subscription, setSubscription] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showProducts, setShowProducts] = useState(true);
  const [showBillingSummary, setShowBillingSummary] = useState(true);

  useEffect(() => {
    if (id && subscriptions.length > 0) {
      const foundSubscription = subscriptions.find(sub => sub.id === id);
      if (foundSubscription) {
        setSubscription(foundSubscription);
      } else {
        toast.error('Subscription not found');
        navigate('/account/subscriptions');
      }
      setLoading(false);
    }
  }, [id, subscriptions, navigate]);

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
      toast.success(`Auto-renew ${enabled ? 'enabled' : 'disabled'}`);
    } catch (error) {
      toast.error('Failed to update auto-renewal');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-gray-200 border-t-blue-600 rounded-full"></div>
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
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {subscription.plan_id?.charAt(0).toUpperCase() + subscription.plan_id?.slice(1)} Plan
                  </h1>
                  <span className={`
                    px-3 py-1 rounded-full text-sm font-medium
                    ${getStatusColor(subscription.status)}
                  `}>
                    {subscription.status?.charAt(0).toUpperCase() + subscription.status?.slice(1)}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Monthly Amount</p>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                      {formatCurrency(subscription.price || 0, subscription.currency)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Billing Cycle</p>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                      {subscription.billing_cycle?.charAt(0).toUpperCase() + subscription.billing_cycle?.slice(1)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Next Billing</p>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                      {subscription.next_billing_date ? formatDate(subscription.next_billing_date) : 'Not set'}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <AutoRenewToggle
                  isEnabled={subscription.auto_renew}
                  onToggle={handleAutoRenewToggle}
                  showDetails={true}
                  size="md"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {subscription.status === 'active' && (
              <button
                onClick={() => pauseSubscription(subscription.id)}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors"
              >
                <CalendarIcon size={20} />
                Pause Subscription
              </button>
            )}
            
            {subscription.status === 'paused' && (
              <button
                onClick={() => resumeSubscription(subscription.id)}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
              >
                <CalendarIcon size={20} />
                Resume Subscription
              </button>
            )}
            
            <button
              onClick={() => cancelSubscription(subscription.id)}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
            >
              <CreditCardIcon size={20} />
              Cancel Subscription
            </button>
            
            <button
              onClick={() => navigate('/account/subscriptions')}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <PackageIcon size={20} />
              Manage Products
            </button>
          </div>
        </div>

        {/* Detailed Information */}
        <div className="space-y-6">
          {/* Subscription Item Component */}
          <SubscriptionItem
            subscription={subscription}
            isExpanded={true}
          />

          {/* Additional Details */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Subscription Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Subscription ID</p>
                  <p className="font-medium text-gray-900 dark:text-white">{subscription.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Created Date</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {subscription.created_at ? formatDate(subscription.created_at) : 'Not available'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Current Period</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {subscription.current_period_start && subscription.current_period_end
                      ? `${formatDate(subscription.current_period_start)} - ${formatDate(subscription.current_period_end)}`
                      : 'Not available'
                    }
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Payment Method</p>
                  <p className="font-medium text-gray-900 dark:text-white">•••• •••• •••• 4242</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Delivery Type</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {subscription.delivery_type || 'Standard'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Customer Support</p>
                  <p className="font-medium text-gray-900 dark:text-white">support@example.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionDetails;
