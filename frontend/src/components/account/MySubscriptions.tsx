import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSubscription } from '../../contexts/SubscriptionContext';
import { CalendarIcon, CreditCardIcon, ShoppingBagIcon, ChevronRightIcon } from 'lucide-react';
import { formatCurrency } from '../../lib/locale-config';

export const MySubscriptions = () => {
  const { subscriptions, loading, error, refreshSubscriptions } = useSubscription();

  useEffect(() => {
    refreshSubscriptions();
  }, [refreshSubscriptions]);

  if (loading) {
    return (
      <div className="text-center p-6">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-copy-light mt-4">Loading your subscriptions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-6 text-error">
        <p>Error loading subscriptions: {error}</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-main mb-6">My Subscriptions</h1>

      {subscriptions.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-gray-300 rounded-lg">
          <ShoppingBagIcon size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500 mb-3">You don't have any active subscriptions yet.</p>
          <Link to="/subscription" className="text-primary hover:underline">
            Explore Subscription Plans
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {subscriptions.map((sub) => (
            <div key={sub.id} className="bg-surface rounded-lg shadow-sm p-6 border border-border">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-copy">
                  {sub.plan_id.charAt(0).toUpperCase() + sub.plan_id.slice(1)} Subscription
                </h2>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  sub.status === 'active' 
                    ? 'bg-success-light text-success-dark dark:bg-success-dark dark:text-success-light' 
                    : 'bg-surface-hover text-copy-light dark:bg-surface-active dark:text-copy-lighter'
                }`}>
                  {sub.status.charAt(0).toUpperCase() + sub.status.slice(1)}
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-copy-light text-sm mb-4">
                <div className="flex items-center">
                  <CreditCardIcon size={16} className="mr-2 text-copy-lighter" />
                  <span>Price: {formatCurrency(sub.price, sub.currency || 'USD')} / {sub.billing_cycle}</span>
                </div>
                <div className="flex items-center">
                  <CalendarIcon size={16} className="mr-2 text-copy-lighter" />
                  <span>Next Billing: {new Date(sub.next_billing_date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center">
                  <ShoppingBagIcon size={16} className="mr-2 text-copy-lighter" />
                  <span>Products: {sub.products?.length || 0} items</span>
                </div>
              </div>
              
              <div className="flex justify-end mt-4">
                <Link 
                  to={`/subscription/${sub.id}/manage`} 
                  className="inline-flex items-center text-primary hover:text-primary-dark font-medium"
                >
                  Manage Subscription
                  <ChevronRightIcon size={18} className="ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
