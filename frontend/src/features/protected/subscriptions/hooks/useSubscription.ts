import { useAuth } from '@/auth/hooks/useAuth';
import { useSubscription as useSubscriptionContext } from '@/contexts/SubscriptionContext';
import { toast } from 'react-hot-toast';

export const useSubscription = () => {
  const context = useSubscriptionContext();
  return context;
};

export const useSubscriptionAction = () => {
  const { isAuthenticated, setIntendedDestination } = useAuth();
  const { subscriptions, addProductsToSubscription } = useSubscriptionContext();

  const addToSubscription = async (subscriptionId: string, variantIds: string[], quantity: number = 1): Promise<boolean> => {
    if (!isAuthenticated) {
      setIntendedDestination({
        path: window.location.pathname,
        action: 'add product to subscription'
      });
      toast.error('Please log in to add products to subscriptions');
      window.location.href = '/login';
      return false;
    }

    const activeSubscriptions = subscriptions.filter(sub => sub.status === 'active');
    if (activeSubscriptions.length === 0) {
      toast.error('You need an active subscription to add products');
      return false;
    }

    try {
      const variantIdsWithQuantity = Array(quantity).fill(variantIds).flat();
      const ok = await addProductsToSubscription(subscriptionId, variantIdsWithQuantity);
      if (ok) {
        toast.success(`Added ${quantity} item(s) to subscription!`);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to add product to subscription:', error);
      toast.error('Failed to add product to subscription');
      return false;
    }
  };

  const getActiveSubscriptions = () => {
    return subscriptions.filter(sub => sub.status === 'active');
  };

  return {
    addToSubscription,
    getActiveSubscriptions,
    hasActiveSubscriptions: getActiveSubscriptions().length > 0,
    isAuthenticated
  };
};