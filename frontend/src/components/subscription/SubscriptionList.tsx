import React, { useState, useEffect } from 'react';
import { RefreshCwIcon, PlusIcon } from 'lucide-react';
import { themeClasses, combineThemeClasses, getButtonClasses } from '../../lib/themeClasses';
import { SubscriptionCard } from './SubscriptionCard';
import { 
  getSubscriptions,
  pauseSubscription as pauseSubscriptionAPI,
  resumeSubscription as resumeSubscriptionAPI,
  cancelSubscription as cancelSubscriptionAPI,
  type Subscription
} from '../../apis/subscription';
import { toast } from 'react-hot-toast';

  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
export const SubscriptionList: React.FC = () => {

  useEffect(() => {
    loadSubscriptions();
  }, []); // Remove the dependency to prevent infinite loops

  const loadSubscriptions = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getSubscriptions();
      setSubscriptions(data.subscriptions || []);
    } catch (error) {
      console.error('Failed to load subscriptions:', error);
      setError('Failed to load subscriptions');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = (id: string, updates: any) => {
    setSubscriptions(prev => 
      prev.map(sub => 
        sub.id === id 
          ? { ...sub, ...updates }
          : sub
      )
    );
  };

  const handlePause = async (id: string) => {
    try {
      await pauseSubscriptionAPI(id);
      handleUpdate(id, { status: 'paused' });
      toast.success('Subscription paused');
    } catch (error) {
      console.error('Failed to pause subscription:', error);
      toast.error('Failed to pause subscription');
    }
  };

  const handleResume = async (id: string) => {
    try {
      await resumeSubscriptionAPI(id);
      handleUpdate(id, { 
        status: 'active',
        next_billing_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      });
      toast.success('Subscription resumed');
    } catch (error) {
      console.error('Failed to resume subscription:', error);
      toast.error('Failed to resume subscription');
    }
  };

  const handleCancel = async (id: string) => {
    if (!confirm('Are you sure you want to cancel this subscription?')) {
      return;
    }
    
    try {
      await cancelSubscriptionAPI(id);
      handleUpdate(id, { status: 'cancelled', auto_renew: false });
      toast.success('Subscription cancelled');
    } catch (error) {
      console.error('Failed to cancel subscription:', error);
      toast.error('Failed to cancel subscription');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex items-center gap-2">
          <RefreshCwIcon className="w-5 h-5 animate-spin text-blue-500" />
          <span className={themeClasses.text.secondary}>Loading subscriptions...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={loadSubscriptions}
          className={combineThemeClasses(getButtonClasses('outline'), 'text-sm')}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className={combineThemeClasses(themeClasses.text.heading, 'text-xl font-bold')}>
            My Subscriptions
          </h2>
          <p className={combineThemeClasses(themeClasses.text.secondary, 'text-sm')}>
            Manage your subscriptions and auto-renew settings
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={loadSubscriptions}
            className={combineThemeClasses(getButtonClasses('outline'), 'text-sm')}
          >
            <RefreshCwIcon className="w-4 h-4 mr-1" />
            Refresh
          </button>
          <button
            className={combineThemeClasses(getButtonClasses('primary'), 'text-sm')}
          >
            <PlusIcon className="w-4 h-4 mr-1" />
            New Subscription
          </button>
        </div>
      </div>

      {/* Subscriptions List */}
      {subscriptions.length === 0 ? (
        <div className="text-center py-12">
          <div className={combineThemeClasses(
            'w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center',
            themeClasses.background.elevated,
            'border-2 border-dashed border-gray-300'
          )}>
            <PlusIcon className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className={combineThemeClasses(themeClasses.text.heading, 'font-medium mb-2')}>
            No Subscriptions Yet
          </h3>
          <p className={combineThemeClasses(themeClasses.text.secondary, 'text-sm mb-4')}>
            Create your first subscription to get started
          </p>
          <button
            className={combineThemeClasses(getButtonClasses('primary'), 'text-sm')}
          >
            Create Subscription
          </button>
        </div>
      ) : (
        <div className="grid gap-4">
          {subscriptions.map(subscription => (
            <SubscriptionCard
              key={subscription.id}
              subscription={subscription}
              onUpdate={handleUpdate}
              onPause={handlePause}
              onResume={handleResume}
              onCancel={handleCancel}
            />
          ))}
        </div>
      )}
    </div>
  );
};