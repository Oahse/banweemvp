import React, { useState, useEffect } from 'react';
import { useSubscription } from '../../store/SubscriptionContext';
import { useLocale } from '../../store/LocaleContext';
import { 
  PlusIcon, 
  PackageIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { SubscriptionCard } from '../subscription/SubscriptionCard';

export const MySubscriptions = () => {
  const { 
    subscriptions, 
    loading, 
    error, 
    refreshSubscriptions, 
    createSubscription, 
    updateSubscription, 
    cancelSubscription,
    activateSubscription,
    pauseSubscription,
    resumeSubscription,
    addProductsToSubscription,
    removeProductsFromSubscription 
  } = useSubscription();
  const { currency = 'USD', formatCurrency: formatCurrencyLocale } = useLocale();
  const [activeTab, setActiveTab] = useState<string>('all');
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;

  useEffect(() => {
    refreshSubscriptions();
  }, [refreshSubscriptions]);

  const filteredSubscriptions = subscriptions.filter((sub: any) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'active') return sub.status === 'active';
    if (activeTab === 'paused') return sub.status === 'paused';
    if (activeTab === 'cancelled') return sub.status === 'cancelled';
    return true;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredSubscriptions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentSubscriptions = filteredSubscriptions.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400 mt-4">Loading your subscriptions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
        <PackageIcon size={48} className="text-gray-400 dark:text-gray-500 mx-auto mb-4" />
        <p className="text-gray-600 dark:text-gray-400 mb-3">
          Unable to load subscriptions
        </p>
        <button 
          onClick={() => refreshSubscriptions()} 
          className="text-primary hover:text-primary-dark underline"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <p className="text-xs text-gray-600 dark:text-gray-300">
            Manage your active and past subscriptions
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-md transition-colors flex items-center text-xs"
        >
          <PlusIcon size={16} className="mr-2" />
          Create
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1 overflow-x-auto">
        {[
          { key: 'all', label: 'All', count: subscriptions.length },
          { key: 'active', label: 'Active', count: subscriptions.filter((s: any) => s.status === 'active').length },
          { key: 'paused', label: 'Paused', count: subscriptions.filter((s: any) => s.status === 'paused').length },
          { key: 'cancelled', label: 'Cancelled', count: subscriptions.filter((s: any) => s.status === 'cancelled').length }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 min-w-[80px] px-2 py-1 text-xs font-medium rounded-md transition-colors ${
              activeTab === tab.key
                ? 'bg-white dark:bg-gray-800 text-primary shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-main dark:hover:text-white'
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Subscriptions List */}
      {subscriptions.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm text-center py-8">
          <PackageIcon size={32} className="text-gray-400 dark:text-gray-500 mx-auto mb-3" />
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
            {activeTab === 'all' 
              ? "You don't have any subscriptions yet." 
              : `No ${activeTab} subscriptions found.`
            }
          </p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-md transition-colors text-xs"
          >
            Create Your First Subscription
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2">
            {currentSubscriptions.map((subscription: any) => (
              <SubscriptionCard
                key={subscription.id}
                subscription={subscription}
                onUpdate={async (subscriptionId: any, data: any) => {
                  await updateSubscription(subscriptionId, data);
                }}
                onCancel={async (subscriptionId: any, reason?: string) => {
                  await cancelSubscription(subscriptionId, reason);
                }}
                onActivate={async (subscriptionId: any) => {
                  await activateSubscription(subscriptionId);
                }}
                onPause={async (subscriptionId: any, reason?: string) => {
                  await pauseSubscription(subscriptionId, reason);
                }}
                onResume={async (subscriptionId: any) => {
                  await resumeSubscription(subscriptionId);
                }}
                onAddProducts={async (subscriptionId: any, productIds: any) => {
                  await addProductsToSubscription(subscriptionId, productIds);
                }}
                onRemoveProducts={async (subscriptionId: any, productIds: any) => {
                  await removeProductsFromSubscription(subscriptionId, productIds);
                }}
                onToggleAutoRenew={async (subscriptionId: any, autoRenew: any) => {
                  await updateSubscription(subscriptionId, { auto_renew: autoRenew });
                }}
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center space-x-2 pt-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center px-3 py-2 text-xs border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeftIcon size={14} className="mr-1" />
              Previous
            </button>
            
            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`px-3 py-2 text-xs rounded transition-colors ${
                      currentPage === pageNum
                        ? 'bg-primary text-white'
                        : 'border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex items-center px-3 py-2 text-xs border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
              <ChevronRightIcon size={14} className="ml-1" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default MySubscriptions;
