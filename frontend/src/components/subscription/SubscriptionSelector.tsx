import React, { useState } from 'react';
import { XIcon, CalendarIcon, CreditCardIcon, PlusIcon } from 'lucide-react';
import { useSubscription } from '../../store/SubscriptionContext';
import { useSubscriptionAction } from '../../hooks/useSubscription';
import { formatCurrency } from '../../utils/locale-config';
import { themeClasses, getButtonClasses } from '../../utils/themeClasses';
import { VariantSelector } from '../product/VariantSelector';
import { useNavigate } from 'react-router-dom';

interface SubscriptionSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  product: any; // Product with variants
  variantId?: string; // initial variant
  quantity?: number;
  onSuccess?: () => void;
}

export const SubscriptionSelector: React.FC<SubscriptionSelectorProps> = ({
  isOpen,
  onClose,
  product,
  variantId,
  quantity = 1,
  onSuccess
}) => {
  const { subscriptions } = useSubscription();
  const { addToSubscription } = useSubscriptionAction();
  const navigate = useNavigate();
  const [selectedSubscriptionId, setSelectedSubscriptionId] = useState<string>('');
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize selected variant from props or first available
  React.useEffect(() => {
    if (product?.variants) {
      const initial = product.variants.find((v: any) => v.id === variantId) || product.variants[0];
      setSelectedVariant(initial);
    }
  }, [product, variantId]);

  const allSubscriptions = subscriptions; // Show all subscriptions, not just active ones

  const handleAddToSubscription = async () => {
    if (!selectedSubscriptionId || !selectedVariant) {
      return;
    }

    setIsLoading(true);
    try {
      const ok = await addToSubscription(selectedSubscriptionId, [selectedVariant.id], quantity);
      if (ok) {
        onSuccess?.();
        onClose();
      }
    } catch (error) {
      console.error('Failed to add to subscription:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateSubscription = () => {
    // Navigate to account subscriptions with a flag to create new
    navigate('/account/subscriptions', { state: { addProduct: { product, variantId: selectedVariant?.id, quantity } } });
    onClose();
  };

  const formatBillingCycle = (cycle: string) => {
    return cycle.charAt(0).toUpperCase() + cycle.slice(1);
  };

  const formatNextBilling = (date: string) => {
    return new Date(date).toLocaleDateString();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4" onClick={onClose}>
      <div className={`${themeClasses.background.surface} rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto`} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border-light">
          <h2 className={`text-lg sm:text-xl font-semibold ${themeClasses.text.primary}`}>
            Add to Subscription
          </h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg ${themeClasses.text.muted} hover:${themeClasses.background.surface} transition-colors`}
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          {/* Product & Variant Selection */}
          <div className="mb-4 sm:mb-6">
            <p className={`${themeClasses.text.muted} mb-2 text-sm sm:text-base`}>Product:</p>
            <p className={`font-medium ${themeClasses.text.primary} text-sm sm:text-base mb-3`}>{product?.name || 'Unknown product'}</p>
            {product?.variants && product.variants.length > 1 && (
              <div className="mb-3">
                <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>
                  Select Variant:
                </label>
                <VariantSelector
                  variants={product.variants}
                  selectedVariant={selectedVariant}
                  onVariantChange={setSelectedVariant}
                  layout="grid"
                  showPrice={true}
                  showStock={true}
                  className="mb-2"
                />
              </div>
            )}
            {quantity > 1 && (
              <p className={`text-xs sm:text-sm ${themeClasses.text.muted}`}>Quantity: {quantity}</p>
            )}
          </div>

          {allSubscriptions.length === 0 ? (
            <div className="text-center py-6 sm:py-8">
              <div className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 rounded-full ${themeClasses.background.surface} flex items-center justify-center`}>
                <PlusIcon className={`w-6 h-6 sm:w-8 sm:h-8 ${themeClasses.text.muted}`} />
              </div>
              <h3 className={`text-base sm:text-lg font-medium ${themeClasses.text.primary} mb-2`}>
                No Subscriptions Found
              </h3>
              <p className={`${themeClasses.text.muted} mb-4 text-sm sm:text-base`}>
                You don't have any subscriptions yet. Create one to start adding products.
              </p>
              <button
                onClick={handleCreateSubscription}
                className={getButtonClasses('primary')}
              >
                Create New Subscription
              </button>
            </div>
          ) : (
            <>
              <div className="mb-4 sm:mb-6">
                <label className={`block text-sm font-medium ${themeClasses.text} mb-3`}>
                  Select Subscription:
                </label>
                <div className="space-y-2 sm:space-y-3">
                  {allSubscriptions.map((subscription) => {
                    const isActive = subscription.status === 'active';
                    const statusColor = isActive 
                      ? 'border-primary bg-primary/5' 
                      : 'border-gray-300 bg-gray-50';
                    const textColor = isActive 
                      ? themeClasses.text.primary 
                      : themeClasses.text.muted;
                    
                    return (
                      <label
                        key={subscription.id}
                        className={`block cursor-pointer p-3 sm:p-4 rounded-lg border-2 transition-colors ${
                          selectedSubscriptionId === subscription.id
                            ? statusColor
                            : `border-border-light hover:border-border`
                        }`}
                      >
                        <input
                          type="radio"
                          name="subscription"
                          value={subscription.id}
                          checked={selectedSubscriptionId === subscription.id}
                          onChange={(e) => setSelectedSubscriptionId(e.target.value)}
                          className="sr-only"
                        />
                        <div className="flex items-center justify-between">
                          <div className="flex-1 min-w-0 mr-2">
                            <div className={`font-medium ${textColor} text-sm sm:text-base truncate flex items-center gap-2`}>
                              {subscription.name}
                              {!isActive && (
                                <span className="px-2 py-1 text-xs bg-gray-200 text-gray-600 rounded-full">
                                  Inactive
                                </span>
                              )}
                            </div>
                            <div className={`text-xs sm:text-sm ${themeClasses.text.muted} flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mt-1`}>
                              <span className="flex items-center gap-1">
                                <CreditCardIcon className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                                <span className="truncate">{formatCurrency(subscription.price || 0)} / {formatBillingCycle(subscription.billing_cycle)}</span>
                              </span>
                              {subscription.next_billing_date && (
                                <span className="flex items-center gap-1">
                                  <CalendarIcon className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                                  <span className="truncate">Next: {formatNextBilling(subscription.next_billing_date)}</span>
                                </span>
                              )}
                            </div>
                          </div>
                          <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${
                            selectedSubscriptionId === subscription.id
                              ? 'border-primary bg-primary'
                              : 'border-border'
                          }`}>
                            {selectedSubscriptionId === subscription.id && (
                              <div className="w-full h-full rounded-full bg-white scale-50"></div>
                            )}
                          </div>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <button
                  onClick={onClose}
                  className={`${getButtonClasses('secondary')} w-full sm:w-auto`}
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateSubscription}
                  className={`${getButtonClasses('primary')} w-full sm:w-auto`}
                  disabled={isLoading}
                >
                  Create New Subscription
                </button>
                <button
                  onClick={handleAddToSubscription}
                  disabled={!selectedSubscriptionId || !selectedVariant || isLoading}
                  className={`${getButtonClasses('primary')} w-full sm:w-auto`}
                >
                  {isLoading ? 'Adding...' : 'Add to Subscription'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};