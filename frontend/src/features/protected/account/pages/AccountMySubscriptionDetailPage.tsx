import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSubscription } from '@/features/protected/subscriptions/contexts/SubscriptionContext';
import { Button } from '@/components/ui/Button';
import { Text, Heading, Caption } from '@/components/ui/Text/Text';
import { 
  ArrowLeft,
  Calendar,
  Package,
  DollarSign,
  Edit,
  Pause,
  Play,
  X
} from 'lucide-react';
import AnimatedLoader from '@/components/ui/AnimatedLoader';
import { ConfirmationModal } from '@/components/ui/ConfirmationModal';

const MySubscriptionDetail = () => {
  const { subscriptionId } = useParams<{ subscriptionId: string }>();
  const navigate = useNavigate();
  const { 
    subscriptions, 
    loading,
    pauseSubscription,
    resumeSubscription,
    cancelSubscription,
    updateSubscription
  } = useSubscription();

  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showPauseModal, setShowPauseModal] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const subscription = subscriptions?.find(sub => sub.id === subscriptionId);

  useEffect(() => {
    if (!loading && !subscription) {
      navigate('/account/subscriptions');
    }
  }, [loading, subscription, navigate]);

  if (loading || !subscription) {
    return (
      <div className="flex items-center justify-center h-64">
        <AnimatedLoader size="lg" variant="spinner" color="primary" text="Loading subscription..." />
      </div>
    );
  }

  const handlePause = async () => {
    setActionLoading(true);
    try {
      await pauseSubscription(subscription.id);
      setShowPauseModal(false);
    } finally {
      setActionLoading(false);
    }
  };

  const handleResume = async () => {
    await resumeSubscription(subscription.id);
  };

  const handleCancel = async () => {
    setActionLoading(true);
    try {
      await cancelSubscription(subscription.id);
      setShowCancelModal(false);
      navigate('/account/subscriptions');
    } finally {
      setActionLoading(false);
    }
  };

  const handleToggleAutoRenew = async () => {
    await updateSubscription(subscription.id, { auto_renew: !subscription.auto_renew });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800';
      case 'payment_failed':
        return 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/20 dark:text-orange-300 dark:border-orange-800';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button onClick={() => navigate('/account/subscriptions')} variant="ghost" size="xs" leftIcon={<ArrowLeft className="w-4 h-4" />}>
            <Text variant="body-sm">Back</Text>
          </Button>
          <div>
            <Heading level={5} weight="bold">{subscription.name}</Heading>
            <Caption tone="secondary">Subscription ID: {subscription.id.slice(0, 8)}...</Caption>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 text-sm font-medium rounded-full border ${getStatusColor(subscription.status)}`}>
            {subscription.status?.charAt(0).toUpperCase() + subscription.status?.slice(1)}
          </span>
          <Button onClick={() => navigate(`/account/subscriptions/${subscription.id}/edit`)} variant="primary" size="xs" leftIcon={<Edit className="w-4 h-4" />}>
            <Text variant="body-sm">Edit</Text>
          </Button>
        </div>
      </div>

      {/* Subscription Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Billing Information */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 space-y-4">
          <Heading level={5} weight="semibold" className="flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Billing Information
          </Heading>
          <div className="space-y-3">
            <div>
              <Caption tone="secondary">Billing Cycle</Caption>
              <Text variant="body-sm" weight="medium">{subscription.billing_cycle}</Text>
            </div>
            <div>
              <Caption tone="secondary">Current Period</Caption>
              <Text variant="body-sm" weight="medium">
                {subscription.current_period_start && subscription.current_period_end
                  ? `${formatDate(subscription.current_period_start)} - ${formatDate(subscription.current_period_end)}`
                  : 'N/A'}
              </Text>
            </div>
            <div>
              <Caption tone="secondary">Next Billing Date</Caption>
              <Text variant="body-sm" weight="medium">{subscription.next_billing_date ? formatDate(subscription.next_billing_date) : 'N/A'}</Text>
            </div>
            <div>
              <Caption tone="secondary">Auto-Renew</Caption>
              <div className="flex items-center gap-2">
                <Text variant="body-sm" weight="medium">{subscription.auto_renew ? 'Enabled' : 'Disabled'}</Text>
                <Button onClick={handleToggleAutoRenew} variant="ghost" size="xs">
                  <Text variant="caption">{subscription.auto_renew ? 'Disable' : 'Enable'}</Text>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Information */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 space-y-4">
          <Heading level={5} weight="semibold" className="flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Pricing Details
          </Heading>
          <div className="space-y-3">
            <div>
              <Caption tone="secondary">Price at Creation</Caption>
              <Text variant="body-sm" weight="medium">
                ${subscription.price_at_creation?.toFixed(2) || '0.00'}
              </Text>
            </div>
            {subscription.current_shipping_amount !== undefined && (
              <div>
                <Caption tone="secondary">Current Shipping</Caption>
                <Text variant="body-sm" weight="medium">
                  ${subscription.current_shipping_amount?.toFixed(2) || '0.00'}
                </Text>
              </div>
            )}
            {subscription.current_tax_amount !== undefined && (
              <div>
                <Caption tone="secondary">Current Tax</Caption>
                <Text variant="body-sm" weight="medium">
                  ${subscription.current_tax_amount?.toFixed(2) || '0.00'}
                  {subscription.current_tax_rate && ` (${(subscription.current_tax_rate * 100).toFixed(1)}%)`}
                </Text>
              </div>
            )}
            {subscription.discount && subscription.discount.code && (
              <div>
                <Caption tone="secondary">Discount Applied</Caption>
                <Text variant="body-sm" weight="medium">
                  {subscription.discount.code} ({subscription.discount.type === 'percentage' ? `${subscription.discount.value}%` : `$${subscription.discount.value}`})
                </Text>
              </div>
            )}
            <div>
              <Caption tone="secondary">Currency</Caption>
              <Text variant="body-sm" weight="medium">{subscription.currency?.toUpperCase() || 'USD'}</Text>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Status (if applicable) */}
      {(subscription.status === 'payment_failed' || subscription.payment_retry_count) && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1">
              <Heading level={5} className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                Payment Issue
              </Heading>
              <Text className="mt-1 text-sm text-yellow-700 dark:text-yellow-300">
                {subscription.last_payment_error || 'There was an issue processing your payment.'}
              </Text>
              {subscription.payment_retry_count !== undefined && subscription.payment_retry_count > 0 && (
                <Text className="mt-1 text-sm text-yellow-700 dark:text-yellow-300">
                  Retry attempt: {subscription.payment_retry_count} of 3
                </Text>
              )}
              {subscription.next_retry_date && (
                <Text className="mt-1 text-sm text-yellow-700 dark:text-yellow-300">
                  Next retry: {formatDate(subscription.next_retry_date)}
                </Text>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Subscription Timeline */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 space-y-4">
        <Heading level={5} weight="semibold" className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Subscription Timeline
        </Heading>
        <div className="space-y-3">
          <div>
            <Caption tone="secondary">Created</Caption>
            <Text variant="body-sm" weight="medium">{formatDate(subscription.created_at)}</Text>
          </div>
          {subscription.updated_at && (
            <div>
              <Caption tone="secondary">Last Updated</Caption>
              <Text variant="body-sm" weight="medium">{formatDate(subscription.updated_at)}</Text>
            </div>
          )}
          {subscription.paused_at && (
            <div>
              <Caption tone="secondary">Paused</Caption>
              <Text variant="body-sm" weight="medium">{formatDate(subscription.paused_at)}</Text>
              {subscription.pause_reason && (
                <Text variant="caption" tone="secondary">Reason: {subscription.pause_reason}</Text>
              )}
            </div>
          )}
          {subscription.cancelled_at && (
            <div>
              <Caption tone="secondary">Cancelled</Caption>
              <Text variant="body-sm" weight="medium">{formatDate(subscription.cancelled_at)}</Text>
            </div>
          )}
          {subscription.subscription_metadata?.last_order_created && (
            <div>
              <Caption tone="secondary">Last Order Created</Caption>
              <Text variant="body-sm" weight="medium">
                {formatDate(subscription.subscription_metadata.last_order_created)}
              </Text>
            </div>
          )}
          {subscription.subscription_metadata?.orders_created_count !== undefined && (
            <div>
              <Caption tone="secondary">Total Orders Created</Caption>
              <Text variant="body-sm" weight="medium">
                {subscription.subscription_metadata.orders_created_count}
              </Text>
            </div>
          )}
        </div>
      </div>

      {/* Products */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <Heading level={5} weight="semibold" className="flex items-center gap-2 mb-4">
          <Package className="w-5 h-5" />
          Products ({subscription.products?.length || 0})
        </Heading>
        {subscription.products && subscription.products.length > 0 ? (
          <div className="space-y-3">
            {subscription.products.map((product: any) => (
              <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center gap-3">
                  {product.image && (
                    <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded" />
                  )}
                  <div>
                    <Text variant="body-sm" weight="medium">{product.name}</Text>
                    <Caption tone="secondary">Quantity: {product.quantity}</Caption>
                  </div>
                </div>
                <Text variant="body-sm" weight="medium">${product.unit_price?.toFixed(2)}</Text>
              </div>
            ))}
          </div>
        ) : (
          <Text variant="caption" tone="secondary">No products in this subscription</Text>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        {subscription.status === 'active' && (
          <Button onClick={() => setShowPauseModal(true)} variant="warning" size="xs" leftIcon={<Pause className="w-4 h-4" />}>
            <Text variant="body-sm">Pause Subscription</Text>
          </Button>
        )}
        {subscription.status === 'paused' && (
          <Button onClick={handleResume} variant="success" size="xs" leftIcon={<Play className="w-4 h-4" />}>
            <Text variant="body-sm">Resume Subscription</Text>
          </Button>
        )}
        {subscription.status !== 'cancelled' && (
          <Button onClick={() => setShowCancelModal(true)} variant="danger" size="xs" leftIcon={<X className="w-4 h-4" />}>
            <Text variant="body-sm">Cancel Subscription</Text>
          </Button>
        )}
      </div>

      {/* Modals */}
      <ConfirmationModal
        isOpen={showPauseModal}
        onClose={() => setShowPauseModal(false)}
        onConfirm={handlePause}
        title="Pause Subscription"
        message="Are you sure you want to pause this subscription? You can resume it later."
        confirmText="Pause"
        loading={actionLoading}
        variant="warning"
      />

      <ConfirmationModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={handleCancel}
        title="Cancel Subscription"
        message="Are you sure you want to cancel this subscription? This action cannot be undone."
        confirmText="Cancel Subscription"
        loading={actionLoading}
        variant="danger"
      />
    </div>
  );
};

export default MySubscriptionDetail;
