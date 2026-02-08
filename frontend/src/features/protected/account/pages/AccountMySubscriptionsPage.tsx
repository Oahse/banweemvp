import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSubscription } from '../../subscriptions/contexts/SubscriptionContext';
import { useLocale } from '../../../../components/shared/contexts/LocaleContext';
import { 
  PlusIcon, 
  PackageIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XIcon,
  SearchIcon,
  EyeIcon,
  PauseIcon
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { SubscriptionCard } from '../../subscriptions/components/SubscriptionCard';
import { ConfirmationModal } from '../../../../components/ui/ConfirmationModal';
import { AutoRenewToggle } from '../../subscriptions/components/AutoRenewToggle';
import ProductsAPI from '@/api/products';
import { Product } from '@/types';

export const MySubscriptions = () => {
  const navigate = useNavigate();
  const { 
    subscriptions, 
    loading, 
    error, 
    refreshSubscriptions,
    manualRefresh,
    createSubscription, 
    updateSubscription, 
    cancelSubscription,
    deleteSubscription,
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
  const [newSubscriptionData, setNewSubscriptionData] = useState({
    name: '',
    billing_cycle: 'monthly',
    delivery_type: 'standard',
    auto_renew: true
  });
  // ...rest of the file (truncated for brevity)
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSubscription, setSelectedSubscription] = useState<any>(null);
  const [showCancelModal, setShowCancelModal] = useState<boolean>(false);
  const [showPauseModal, setShowPauseModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [actionLoading, setActionLoading] = useState<boolean>(false);
  const [availableProducts, setAvailableProducts] = useState<Product[]>([]);
  const [showProductModal, setShowProductModal] = useState<boolean>(false);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const itemsPerPage = 10;

  useEffect(() => {
    refreshSubscriptions();
    loadAvailableProducts();
  }, []);

  const loadAvailableProducts = async () => {
    try {
      const products = await ProductsAPI.getProducts({});
      setAvailableProducts(products);
    } catch (error) {
      toast.error('Failed to load available products');
    }
  };

  const filteredSubscriptions = subscriptions?.filter(subscription => {
    const matchesSearch = subscription.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         subscription.id?.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;
    
    switch (activeTab) {
      case 'active':
        return subscription.status === 'active';
      case 'paused':
        return subscription.status === 'paused';
      case 'cancelled':
        return subscription.status === 'cancelled';
      default:
        return true;
    }
  }) || [];

  const totalPages = Math.ceil(filteredSubscriptions.length / itemsPerPage);
  const paginatedSubscriptions = filteredSubscriptions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCreateSubscription = async () => {
    if (!newSubscriptionData.name.trim()) {
      toast.error('Subscription name is required');
      return;
    }

    setIsLoading(true);
    try {
      await createSubscription(newSubscriptionData);
      setShowCreateModal(false);
      setNewSubscriptionData({
        name: '',
        billing_cycle: 'monthly',
        delivery_type: 'standard',
        auto_renew: true
      });
      toast.success('Subscription created successfully');
      refreshSubscriptions();
    } catch (error) {
      toast.error('Failed to create subscription');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleAutoRenew = async (subscriptionId: string, enabled: boolean) => {
    try {
      await updateSubscription(subscriptionId, { auto_renew: enabled });
      toast.success(`Auto-renew ${enabled ? 'enabled' : 'disabled'}`);
      refreshSubscriptions();
    } catch (error) {
      toast.error('Failed to update auto-renew setting');
    }
  };

  const handlePauseSubscription = async () => {
    if (!selectedSubscription) return;
    
    setActionLoading(true);
    try {
      await pauseSubscription(selectedSubscription.id);
      setShowPauseModal(false);
      setSelectedSubscription(null);
      toast.success('Subscription paused');
      refreshSubscriptions();
    } catch (error) {
      toast.error('Failed to pause subscription');
    } finally {
      setActionLoading(false);
    }
  };

  const handleResumeSubscription = async (subscriptionId: string) => {
    try {
      await resumeSubscription(subscriptionId);
      toast.success('Subscription resumed');
      refreshSubscriptions();
    } catch (error) {
      toast.error('Failed to resume subscription');
    }
  };

  const handleCancelSubscription = async () => {
    if (!selectedSubscription) return;
    
    setActionLoading(true);
    try {
      await cancelSubscription(selectedSubscription.id);
      setShowCancelModal(false);
      setSelectedSubscription(null);
      toast.success('Subscription cancelled');
      refreshSubscriptions();
    } catch (error) {
      toast.error('Failed to cancel subscription');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteSubscription = async () => {
    if (!selectedSubscription) return;
    
    setActionLoading(true);
    try {
      await deleteSubscription(selectedSubscription.id);
      setShowDeleteModal(false);
      setSelectedSubscription(null);
      toast.success('Subscription deleted');
      refreshSubscriptions();
    } catch (error) {
      toast.error('Failed to delete subscription');
    } finally {
      setActionLoading(false);
    }
  };

  const handleActivateSubscription = async (subscriptionId: string) => {
    try {
      await activateSubscription(subscriptionId);
      toast.success('Subscription activated');
      refreshSubscriptions();
    } catch (error) {
      toast.error('Failed to activate subscription');
    }
  };

  const handleManageProducts = (subscription: any) => {
    setSelectedSubscription(subscription);
    setSelectedProducts(subscription.products?.map((p: any) => p.id) || []);
    setShowProductModal(true);
  };

  const handleAddProducts = async () => {
    if (!selectedSubscription || selectedProducts.length === 0) return;
    
    setActionLoading(true);
    try {
      await addProductsToSubscription(selectedSubscription.id, selectedProducts);
      setShowProductModal(false);
      setSelectedSubscription(null);
      setSelectedProducts([]);
      toast.success('Products added to subscription');
      refreshSubscriptions();
    } catch (error) {
      toast.error('Failed to add products to subscription');
    } finally {
      setActionLoading(false);
    }
  };

  const handleRemoveProducts = async (productIds: string[]) => {
    if (!selectedSubscription) return;
    
    try {
      await removeProductsFromSubscription(selectedSubscription.id, productIds);
      toast.success('Products removed from subscription');
      refreshSubscriptions();
    } catch (error) {
      toast.error('Failed to remove products from subscription');
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading && subscriptions?.length === 0) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-lg md:text-xl font-bold text-gray-900">My Subscriptions</h1>
          <p className="text-sm text-gray-600 mt-1">Manage your active and past subscriptions</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="mt-4 sm:mt-0 inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <PlusIcon className="w-4 h-4 mr-2" />
          New Subscription
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search subscriptions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {['all', 'active', 'paused', 'cancelled'].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setCurrentPage(1);
              }}
              className={`py-2 px-1 border-b-2 font-medium text-sm capitalize ${
                activeTab === tab
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab}
              <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
                {tab === 'all' 
                  ? subscriptions?.length || 0
                  : subscriptions?.filter(s => s.status === tab).length || 0
                }
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <div className="mt-2 text-sm text-red-700">
                {error}
              </div>
              <div className="mt-4">
                <button
                  onClick={refreshSubscriptions}
                  className="text-sm font-medium text-red-600 hover:text-red-500"
                >
                  Try again
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Subscriptions List */}
      {filteredSubscriptions.length === 0 && !loading ? (
        <div className="text-center py-12">
          <PackageIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No subscriptions</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchQuery ? 'No subscriptions match your search.' : 'Get started by creating a new subscription.'}
          </p>
          <div className="mt-6">
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <PlusIcon className="w-4 h-4 mr-2" />
              New Subscription
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {paginatedSubscriptions.map((subscription) => (
            <SubscriptionCard
              key={subscription.id}
              subscription={subscription}
              onToggleAutoRenew={handleToggleAutoRenew}
              onPause={(id) => {
                setSelectedSubscription(subscription);
                setShowPauseModal(true);
              }}
              onResume={handleResumeSubscription}
              onActivate={handleActivateSubscription}
              onCancel={(id) => {
                setSelectedSubscription(subscription);
                setShowCancelModal(true);
              }}
              onDelete={(id) => {
                setSelectedSubscription(subscription);
                setShowDeleteModal(true);
              }}
              onProductManage={handleManageProducts}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to{' '}
            {Math.min(currentPage * itemsPerPage, filteredSubscriptions.length)} of{' '}
            {filteredSubscriptions.length} results
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeftIcon className="w-4 h-4" />
            </button>
            <span className="px-3 py-1 text-sm">
              {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="p-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRightIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Create Subscription Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Create New Subscription
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subscription Name
                  </label>
                  <input
                    type="text"
                    value={newSubscriptionData.name}
                    onChange={(e) => setNewSubscriptionData({
                      ...newSubscriptionData,
                      name: e.target.value
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Enter subscription name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Billing Cycle
                  </label>
                  <select
                    value={newSubscriptionData.billing_cycle}
                    onChange={(e) => setNewSubscriptionData({
                      ...newSubscriptionData,
                      billing_cycle: e.target.value
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Delivery Type
                  </label>
                  <select
                    value={newSubscriptionData.delivery_type}
                    onChange={(e) => setNewSubscriptionData({
                      ...newSubscriptionData,
                      delivery_type: e.target.value
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="standard">Standard</option>
                    <option value="express">Express</option>
                    <option value="pickup">Pickup</option>
                  </select>
                </div>
                <div>
                  <AutoRenewToggle
                    isEnabled={newSubscriptionData.auto_renew}
                    onToggle={(enabled) => setNewSubscriptionData({
                      ...newSubscriptionData,
                      auto_renew: enabled
                    })}
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateSubscription}
                  disabled={isLoading}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {isLoading ? 'Creating...' : 'Create Subscription'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      <ConfirmationModal
        isOpen={showCancelModal}
        onClose={() => {
          setShowCancelModal(false);
          setSelectedSubscription(null);
        }}
        onConfirm={handleCancelSubscription}
        title="Cancel Subscription"
        message="Are you sure you want to cancel this subscription? This action cannot be undone."
        confirmText="Cancel Subscription"
        cancelText="Keep Subscription"
        loading={actionLoading}
      />

      {/* Pause Confirmation Modal */}
      <ConfirmationModal
        isOpen={showPauseModal}
        onClose={() => {
          setShowPauseModal(false);
          setSelectedSubscription(null);
        }}
        onConfirm={handlePauseSubscription}
        title="Pause Subscription"
        message="Are you sure you want to pause this subscription? You can resume it later."
        confirmText="Pause Subscription"
        cancelText="Keep Active"
        loading={actionLoading}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedSubscription(null);
        }}
        onConfirm={handleDeleteSubscription}
        title="Delete Subscription"
        message="Are you sure you want to delete this subscription? This action cannot be undone and all data will be permanently removed."
        confirmText="Delete Subscription"
        cancelText="Cancel"
        loading={actionLoading}
        variant="danger"
      />
    </div>
  );
};
