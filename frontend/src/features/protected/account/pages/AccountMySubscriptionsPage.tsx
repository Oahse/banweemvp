import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSubscription } from '@/features/protected/subscriptions/contexts/SubscriptionContext';
import { useLocale } from '@/components/shared/contexts/LocaleContext';
import Dropdown from '@/components/ui/Dropdown';
import { Button } from '@/components/ui/Button';
import { Text, Heading, Label } from '@/components/ui/Text/Text';
import TabHeader from '@/components/ui/TabHeader';
import { 
  PlusIcon, 
  PackageIcon,
  XIcon,
  SearchIcon,
  EyeIcon,
  PauseIcon
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { SubscriptionCard } from '@/subscriptions/components/SubscriptionCard';
import { Pagination } from '@/components/ui/Pagination';
import { ConfirmationModal } from '@/components/ui/ConfirmationModal';
import { AutoRenewToggle } from '@/subscriptions/components/AutoRenewToggle';
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
    auto_renew: true,
    product_variant_ids: [] as string[]
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

    if (!newSubscriptionData.product_variant_ids || newSubscriptionData.product_variant_ids.length === 0) {
      toast.error('At least one product must be selected');
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
        auto_renew: true,
        product_variant_ids: []
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
    <div className="space-y-6 px-2 sm:px-0 max-w-full overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Heading level={5} weight="bold">My Subscriptions</Heading>
          <Text variant="caption" tone="secondary">Manage your active and past subscriptions</Text>
        </div>
        <Button
          onClick={() => setShowCreateModal(true)}
          variant="primary"
          size="xs"
          leftIcon={<PlusIcon className="w-4 h-4" />}
          className="mt-4 sm:mt-0"
        >
          <Text variant="body-sm">New Subscription</Text>
        </Button>
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
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-[#61b482] focus:border-[#61b482] text-sm"
        />
      </div>

      {/* Tabs */}
      <TabHeader
        tabs={[
          { id: 'all', label: 'all', count: subscriptions?.length || 0 },
          { id: 'active', label: 'active', count: subscriptions?.filter(s => s.status === 'active').length || 0 },
          { id: 'paused', label: 'paused', count: subscriptions?.filter(s => s.status === 'paused').length || 0 },
          { id: 'cancelled', label: 'cancelled', count: subscriptions?.filter(s => s.status === 'cancelled').length || 0 }
        ]}
        activeTab={activeTab}
        onTabChange={(tabId) => {
          setActiveTab(tabId);
          setCurrentPage(1);
        }}
      />

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex">
              <div className="ml-3">
                <Heading level={5} className="text-sm font-medium text-red-800">Error</Heading>
                <Text as="div" className="mt-2 text-sm text-red-700">{error}</Text>
              </div>
              <div className="mt-4">
                <Button
                  onClick={refreshSubscriptions}
                  variant="link"
                  size="xs"
                  className="text-sm font-medium text-red-600 hover:text-red-500"
                >
                  Try again
                </Button>
              </div>
            </div>
        </div>
      )}

      {/* Subscriptions List */}
      {filteredSubscriptions.length === 0 && !loading ? (
        <div className="text-center py-12">
          <PackageIcon className="mx-auto h-12 w-12 text-gray-400" />
          <Heading level={5} className="mt-2 text-sm font-medium text-gray-900">No subscriptions</Heading>
          <Text as="p" className="mt-1 text-sm text-gray-500">{searchQuery ? 'No subscriptions match your search.' : 'Get started by creating a new subscription.'}</Text>
          <div className="mt-6">
            <Button
              onClick={() => setShowCreateModal(true)}
              variant="primary"
              leftIcon={<PlusIcon className="w-4 h-4" />}
            >
              New Subscription
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {paginatedSubscriptions.map((subscription) => (
            <div key={subscription.id} className="w-full max-w-full overflow-hidden">
              <SubscriptionCard
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
                onDelete={handleDeleteSubscription}
                onProductManage={handleManageProducts}
              />
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="text-sm text-gray-700 text-center sm:text-left">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to{' '}
            {Math.min(currentPage * itemsPerPage, filteredSubscriptions.length)} of{' '}
            {filteredSubscriptions.length} results
          </div>
          <Pagination
            currentPage={currentPage}
            totalItems={filteredSubscriptions.length}
            pageSize={itemsPerPage}
            onPageChange={setCurrentPage}
            size="xs"
          />
        </div>
      )}

      {/* Create Subscription Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-md sm:w-96 shadow-lg rounded-md bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <div className="mt-3">
              <Heading level={5} weight="medium">Create New Subscription</Heading>
              <div className="space-y-4">
                <div>
                  <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subscription Name</Label>
                  <input
                    type="text"
                    value={newSubscriptionData.name}
                    onChange={(e) => setNewSubscriptionData({
                      ...newSubscriptionData,
                      name: e.target.value
                    })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-[#61b482] bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    placeholder="Enter subscription name"
                  />
                </div>
                <div>
                  <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Billing Cycle</Label>
                  <Dropdown
                    options={[
                      { value: 'monthly', label: 'Monthly' },
                      { value: 'quarterly', label: 'Quarterly' },
                      { value: 'yearly', label: 'Yearly' }
                    ]}
                    value={newSubscriptionData.billing_cycle}
                    onChange={(value) => setNewSubscriptionData({
                      ...newSubscriptionData,
                      billing_cycle: value
                    })}
                    placeholder="Select billing cycle"
                    searchable={true}
                    searchPlaceholder="Search billing cycles..."
                  />
                </div>
                <div>
                  <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Delivery Type</Label>
                  <Dropdown
                    options={[
                      { value: 'standard', label: 'Standard' },
                      { value: 'express', label: 'Express' },
                      { value: 'pickup', label: 'Pickup' }
                    ]}
                    value={newSubscriptionData.delivery_type}
                    onChange={(value) => setNewSubscriptionData({
                      ...newSubscriptionData,
                      delivery_type: value
                    })}
                    placeholder="Select delivery type"
                    searchable={true}
                    searchPlaceholder="Search delivery types..."
                  />
                </div>
                <div>
                  <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Products</Label>
                  <div className="space-y-2">
                    <Button
                      type="button"
                      onClick={() => setShowProductModal(true)}
                      variant="outline"
                      fullWidth={true}
                      className="border-dashed"
                    >
                      {newSubscriptionData.product_variant_ids.length > 0 
                        ? <Text variant="body-sm">{`${newSubscriptionData.product_variant_ids.length} product(s) selected`}</Text>
                        : <Text variant="body-sm">Click to select products</Text>
                      }
                    </Button>
                    {newSubscriptionData.product_variant_ids.length > 0 && (
                      <Text variant="caption" className="text-gray-500 dark:text-gray-400">{newSubscriptionData.product_variant_ids.length} product(s) will be included in this subscription</Text>
                    )}
                  </div>
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
              <div className="mt-6 flex flex-col sm:flex-row sm:justify-end gap-3">
                <Button
                  onClick={() => setShowCreateModal(false)}
                  variant="secondary"
                  size="xs"
                  fullWidth={true}
                  className="sm:fullWidth-auto"
                >
                  <Text variant="body-sm">Cancel</Text>
                </Button>
                <Button
                  onClick={handleCreateSubscription}
                  disabled={isLoading}
                  variant="primary"
                  size="xs"
                  isLoading={isLoading}
                  fullWidth={true}
                  className="sm:fullWidth-auto"
                >
                  <Text variant="body-sm">{isLoading ? 'Creating...' : 'Create Subscription'}</Text>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Product Selection Modal */}
      {showProductModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl sm:w-[600px] shadow-lg rounded-md bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 max-h-[80vh] overflow-y-auto">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">
                  Select Products
                </h3>
                <Button
                  onClick={() => setShowProductModal(false)}
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <XIcon className="w-5 h-5" />
                </Button>
              </div>
              
              <div className="space-y-3 max-h-[400px] overflow-y-auto">
                {availableProducts.length > 0 ? (
                  availableProducts.map((product) => (
                    <div key={product.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 gap-3">
                      <div className="flex-1">
                        <Heading level={5} className="font-medium text-gray-900 dark:text-gray-100">{product.name}</Heading>
                        <Text as="p" className="text-sm text-gray-500 dark:text-gray-400">{product.description}</Text>
                        <Text as="p" className="text-sm font-medium text-gray-900 dark:text-gray-100">{formatCurrencyLocale(product.price || 0)}</Text>
                      </div>
                      <Button
                        onClick={() => {
                          const isSelected = newSubscriptionData.product_variant_ids.includes(product.id);
                          if (isSelected) {
                            setNewSubscriptionData({
                              ...newSubscriptionData,
                              product_variant_ids: newSubscriptionData.product_variant_ids.filter(id => id !== product.id)
                            });
                          } else {
                            setNewSubscriptionData({
                              ...newSubscriptionData,
                              product_variant_ids: [...newSubscriptionData.product_variant_ids, product.id]
                            });
                          }
                        }}
                        variant={newSubscriptionData.product_variant_ids.includes(product.id) ? 'primary' : 'secondary'}
                        size="xs"
                      >
                        {newSubscriptionData.product_variant_ids.includes(product.id) ? 'Remove' : 'Add'}
                      </Button>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    No products available
                  </div>
                )}
              </div>
              
              <div className="mt-6 flex flex-col sm:flex-row sm:justify-end gap-3">
                <Button
                  onClick={() => setShowProductModal(false)}
                  variant="secondary"
                  size="xs"
                  fullWidth={true}
                  className="sm:fullWidth-auto"
                >
                  Done
                </Button>
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
