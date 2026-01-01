import React, { useState } from 'react';
import { useSubscription } from '../../contexts/SubscriptionContext';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/Button';
import { PlusIcon, CheckIcon } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface SubscriptionSelectorProps {
  variantId: string;
  productName: string;
  className?: string;
}

export const SubscriptionSelector: React.FC<SubscriptionSelectorProps> = ({
  variantId,
  productName,
  className = ''
}) => {
  const { subscriptions, activeSubscription, addProductsToSubscription } = useSubscription();
  const { isAuthenticated } = useAuth();
  const [isAdding, setIsAdding] = useState(false);

  if (!isAuthenticated) {
    return null;
  }

  // Check if product is already in any subscription
  const isInSubscription = subscriptions.some(sub => 
    sub.products?.some(product => product.id === variantId)
  );

  const handleAddToSubscription = async (subscriptionId: string) => {
    setIsAdding(true);
    try {
      const success = await addProductsToSubscription(subscriptionId, [variantId]);
      if (success) {
        toast.success(`Added ${productName} to your subscription!`);
      }
    } catch (error) {
      console.error('Failed to add to subscription:', error);
      toast.error('Failed to add to subscription');
    } finally {
      setIsAdding(false);
    }
  };

  if (subscriptions.length === 0) {
    return (
      <div className={`bg-blue-50 border border-blue-200 rounded-lg p-4 ${className}`}>
        <h3 className="font-medium text-blue-900 mb-2">Subscribe & Save</h3>
        <p className="text-sm text-blue-700 mb-3">
          Get this product delivered regularly with our subscription service.
        </p>
        <a
          href="/subscription"
          className="inline-flex items-center px-3 py-1.5 border border-blue-300 text-sm font-medium rounded-md text-blue-700 bg-white hover:bg-blue-100 transition-colors"
        >
          Learn More About Subscriptions
        </a>
      </div>
    );
  }

  if (isInSubscription) {
    return (
      <div className={`bg-green-50 border border-green-200 rounded-lg p-4 ${className}`}>
        <div className="flex items-center">
          <CheckIcon size={20} className="text-green-600 mr-2" />
          <span className="text-green-800 font-medium">Already in your subscription</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-blue-50 border border-blue-200 rounded-lg p-4 ${className}`}>
      <h3 className="font-medium text-blue-900 mb-2">Add to Subscription</h3>
      <p className="text-sm text-blue-700 mb-3">
        Add this product to your existing subscription for regular delivery.
      </p>
      
      {activeSubscription ? (
        <Button
          onClick={() => handleAddToSubscription(activeSubscription.id)}
          disabled={isAdding}
          size="sm"
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          {isAdding ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
          ) : (
            <PlusIcon size={16} className="mr-2" />
          )}
          Add to {activeSubscription.plan_id.charAt(0).toUpperCase() + activeSubscription.plan_id.slice(1)} Plan
        </Button>
      ) : (
        <div className="space-y-2">
          {subscriptions.map((subscription) => (
            <Button
              key={subscription.id}
              onClick={() => handleAddToSubscription(subscription.id)}
              disabled={isAdding}
              variant="outline"
              size="sm"
              className="w-full border-blue-300 text-blue-700 hover:bg-blue-100"
            >
              {isAdding ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
              ) : (
                <PlusIcon size={16} className="mr-2" />
              )}
              Add to {subscription.plan_id.charAt(0).toUpperCase() + subscription.plan_id.slice(1)} Plan
              <span className="ml-2 text-xs text-blue-600">
                (${subscription.price}/{subscription.billing_cycle})
              </span>
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};