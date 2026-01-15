import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSubscription } from '../../contexts/SubscriptionContext';
import { useLocale } from '../../contexts/LocaleContext';
import { 
  CalendarIcon, 
  ShoppingBagIcon, 
  PlusIcon, 
  TrashIcon,
  SearchIcon,
  PackageIcon,
  ClockIcon,
  XIcon
} from 'lucide-react';
import { themeClasses, getButtonClasses } from '../../lib/themeClasses';
import { ProductsAPI } from '../../apis/products';
import SubscriptionAPI from '../../apis/subscription';
import { toast } from 'react-hot-toast';
import { Product } from '../../types';

interface NewSubscriptionData {
  plan_id: string;
  billing_cycle: string;
  product_variant_ids: string[];
  delivery_type: string;
  currency: string;
  auto_renew: boolean;
}

export const MySubscriptions = () => {
  const { subscriptions, loading, error, refreshSubscriptions } = useSubscription();
  const { currency, countryCode, formatCurrency: formatCurrencyLocale } = useLocale();
  const [activeTab, setActiveTab] = useState<string>('all');
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [showAddProductModal, setShowAddProductModal] = useState<boolean>(false);
  const [selectedSubscription, setSelectedSubscription] = useState<any>(null);
  const [availableProducts, setAvailableProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // New subscription form state - use user's detected currency
  const [newSubscription, setNewSubscription] = useState<NewSubscriptionData>({
    plan_id: 'basic',
    billing_cycle: 'monthly',
    product_variant_ids: [],
    delivery_type: 'standard',
    currency: currency, // Use user's detected currency
    auto_renew: true
  });
  const [selectedProductsForNew, setSelectedProductsForNew] = useState<Set<string>>(new Set());

  // Update currency when user's locale changes
  useEffect(() => {
    setNewSubscription(prev => ({ ...prev, currency: currency }));
  }, [currency]);

  useEffect(() => {
    refreshSubscriptions();
  }, [refreshSubscriptions]);

  useEffect(() => {
    if (showCreateModal || showAddProductModal) {
      loadAvailableProducts();
    }
  }, [showCreateModal, showAddProductModal, searchQuery]);

  const loadAvailableProducts = async () => {
    try {
      const response = await ProductsAPI.getProducts({ 
        search: searchQuery,
        page: 1,
        limit: 20 
      });
      setAvailableProducts(response.data.products || []);
    } catch (error) {
      console.error('Failed to load products:', error);
      toast.error('Failed to load products');
    }
  };

  const handleCreateSubscription = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Convert selected products to array
      const productVariantIds = Array.from(selectedProductsForNew);
      
      // Ensure we have at least one product selected
      if (productVariantIds.length === 0) {
        toast.error('Please select at least one product for the subscription');
        return;
      }

      const subscriptionData = {
        ...newSubscription,
        product_variant_ids: productVariantIds
      };

      await SubscriptionAPI.createSubscription(subscriptionData);
      toast.success('Subscription created successfully!');
      setShowCreateModal(false);
      setNewSubscription({
        plan_id: 'basic',
        billing_cycle: 'monthly',
        product_variant_ids: [],
        delivery_type: 'standard',
        currency: 'USD',
        auto_renew: true
      });
      setSelectedProductsForNew(new Set());
      refreshSubscriptions();
    } catch (error) {
      console.error('Failed to create subscription:', error);
      toast.error('Failed to create subscription');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddProducts = async () => {
    if (selectedProducts.size === 0) {
      toast.error('Please select at least one product');
      return;
    }

    if (!selectedSubscription) {
      toast.error('No subscription selected');
      return;
    }

    setIsLoading(true);
    try {
      const variantIds = Array.from(selectedProducts);
      await SubscriptionAPI.addProductsToSubscription(selectedSubscription.id, variantIds);
      toast.success(`Added ${selectedProducts.size} product(s) to subscription!`);
      setShowAddProductModal(false);
      setSelectedProducts(new Set());
      refreshSubscriptions();
    } catch (error) {
      console.error('Failed to add products:', error);
      toast.error('Failed to add products to subscription');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveProduct = async (subscriptionId: string, variantId: string) => {
    try {
      await SubscriptionAPI.removeProductsFromSubscription(subscriptionId, [variantId]);
      toast.success('Product removed from subscription');
      refreshSubscriptions();
    } catch (error) {
      console.error('Failed to remove product:', error);
      toast.error('Failed to remove product');
    }
  };

  const handleUpdatePeriod = async (subscriptionId: string, newPeriod: string) => {
    try {
      await SubscriptionAPI.updateSubscription(subscriptionId, { billing_cycle: newPeriod });
      toast.success('Subscription period updated');
      refreshSubscriptions();
    } catch (error) {
      console.error('Failed to update subscription:', error);
      toast.error('Failed to update subscription period');
    }
  };

  const handleDeleteSubscription = async (subscriptionId: string) => {
    if (!confirm('Are you sure you want to delete this subscription?')) return;
    
    try {
      await SubscriptionAPI.deleteSubscription(subscriptionId);
      toast.success('Subscription deleted successfully');
      refreshSubscriptions();
    } catch (error) {
      console.error('Failed to delete subscription:', error);
      toast.error('Failed to delete subscription');
    }
  };

  const filteredSubscriptions = subscriptions.filter((sub: any) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'active') return sub.status === 'active';
    if (activeTab === 'paused') return sub.status === 'paused';
    if (activeTab === 'cancelled') return sub.status === 'cancelled';
    return true;
  });

  if (loading) {
    return (
      <div className="text-center p-6">
        <div className={`${themeClasses.loading.spinner} w-12 h-12 mx-auto`}></div>
        <p className={`${themeClasses.text.secondary} mt-4`}>Loading your subscriptions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-6">
        <p className={themeClasses.text.error}>Error loading subscriptions: {error}</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className={`${themeClasses.text.heading} text-2xl`}>My Subscriptions</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className={`${getButtonClasses('primary')} flex items-center w-full sm:w-auto justify-center`}
        >
          <PlusIcon size={20} className="mr-2" />
          New Subscription
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-6 bg-surface-elevated rounded-lg p-1 overflow-x-auto">
        {[
          { key: 'all', label: 'All', count: subscriptions.length },
          { key: 'active', label: 'Active', count: subscriptions.filter((s: any) => s.status === 'active').length },
          { key: 'paused', label: 'Paused', count: subscriptions.filter((s: any) => s.status === 'paused').length },
          { key: 'cancelled', label: 'Cancelled', count: subscriptions.filter((s: any) => s.status === 'cancelled').length }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-3 sm:px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === tab.key
                ? `${themeClasses.background.surface} ${themeClasses.text.primary} shadow-sm`
                : `${themeClasses.text.secondary} hover:${themeClasses.text.primary}`
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Subscriptions List */}
      {filteredSubscriptions.length === 0 ? (
        <div className={`${themeClasses.card.base} text-center py-12`}>
          <PackageIcon size={48} className={`${themeClasses.text.muted} mx-auto mb-4`} />
          <p className={`${themeClasses.text.secondary} mb-3`}>
            {activeTab === 'all' 
              ? "You don't have any subscriptions yet." 
              : `No ${activeTab} subscriptions found.`
            }
          </p>
          <button
            onClick={() => setShowCreateModal(true)}
            className={getButtonClasses('primary')}
          >
            Create Your First Subscription
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {filteredSubscriptions.map((subscription: any) => (
            <div key={subscription.id} className={`${themeClasses.card.base} p-4 sm:p-6`}>
              {/* Subscription Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1 min-w-0">
                  <h3 className={`${themeClasses.text.heading} text-lg truncate`}>
                    {subscription.plan_id} Subscription
                  </h3>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${
                    subscription.status === 'active' 
                      ? themeClasses.status.success
                      : subscription.status === 'paused'
                      ? themeClasses.status.warning
                      : themeClasses.status.error
                  }`}>
                    {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
                  </span>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => {
                      setSelectedSubscription(subscription);
                      setShowAddProductModal(true);
                    }}
                    className={`${getButtonClasses('outline')} p-2`}
                    title="Add Products"
                  >
                    <PlusIcon size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteSubscription(subscription.id)}
                    className={`${getButtonClasses('danger')} p-2`}
                    title="Delete Subscription"
                  >
                    <TrashIcon size={16} />
                  </button>
                </div>
              </div>

              {/* Subscription Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 text-sm">
                <div className="flex items-center">
                  <CalendarIcon size={16} className={`${themeClasses.text.muted} mr-2 flex-shrink-0`} />
                  <span className={`${themeClasses.text.secondary} truncate`}>
                    Next: {subscription.next_billing_date ? new Date(subscription.next_billing_date).toLocaleDateString() : 'N/A'}
                  </span>
                </div>
                <div className="flex items-center">
                  <ShoppingBagIcon size={16} className={`${themeClasses.text.muted} mr-2 flex-shrink-0`} />
                  <span className={`${themeClasses.text.secondary} truncate`}>
                    {subscription.products?.length || 0} products
                  </span>
                </div>
                <div className="flex items-center sm:col-span-2">
                  <ClockIcon size={16} className={`${themeClasses.text.muted} mr-2 flex-shrink-0`} />
                  <select
                    value={subscription.billing_cycle}
                    onChange={(e) => handleUpdatePeriod(subscription.id, e.target.value)}
                    className={`${themeClasses.input.base} ${themeClasses.input.default} text-sm py-1 flex-1`}
                  >
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>
              </div>

              {/* Products List */}
              {subscription.products && subscription.products.length > 0 && (
                <div className="mb-4">
                  <h4 className={`${themeClasses.text.heading} text-sm mb-2`}>Products:</h4>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {subscription.products.map((product: any) => (
                      <div key={product.id} className={`${themeClasses.background.elevated} rounded-md p-2 flex justify-between items-center`}>
                        <div className="flex items-center flex-1 min-w-0">
                          {product.image && (
                            <img 
                              src={product.image} 
                              alt={product.name}
                              className="w-8 h-8 rounded object-cover mr-2 flex-shrink-0"
                            />
                          )}
                          <div className="flex-1 min-w-0">
                            <span className={`${themeClasses.text.primary} text-sm block truncate`}>
                              {product.name}
                            </span>
                            <span className={`${themeClasses.text.muted} text-xs`}>
                              {formatCurrencyLocale(product.price, subscription.currency || currency)}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => handleRemoveProduct(subscription.id, product.id)}
                          className={`${themeClasses.text.error} hover:${themeClasses.background.hover} p-1 rounded flex-shrink-0 ml-2`}
                          title="Remove product"
                        >
                          <XIcon size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex justify-end">
                <Link 
                  to={`/subscription/${subscription.id}/manage`} 
                  className={`${getButtonClasses('outline')} text-sm`}
                >
                  Manage Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Subscription Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`${themeClasses.card.base} w-full max-w-2xl max-h-[90vh] overflow-y-auto`}>
            <div className="p-6">
              <h2 className={`${themeClasses.text.heading} text-xl mb-4`}>Create New Subscription</h2>
              <form onSubmit={handleCreateSubscription}>
                <div className="space-y-4">
                  <div>
                    <label className={`${themeClasses.text.primary} block text-sm font-medium mb-1`}>
                      Subscription Plan
                    </label>
                    <select
                      value={newSubscription.plan_id}
                      onChange={(e) => setNewSubscription({...newSubscription, plan_id: e.target.value})}
                      className={`${themeClasses.input.base} ${themeClasses.input.default}`}
                      required
                    >
                      <option value="basic">Basic Plan</option>
                      <option value="premium">Premium Plan</option>
                      <option value="enterprise">Enterprise Plan</option>
                    </select>
                  </div>
                  <div>
                    <label className={`${themeClasses.text.primary} block text-sm font-medium mb-1`}>
                      Billing Period
                    </label>
                    <select
                      value={newSubscription.billing_cycle}
                      onChange={(e) => setNewSubscription({...newSubscription, billing_cycle: e.target.value})}
                      className={`${themeClasses.input.base} ${themeClasses.input.default}`}
                    >
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="yearly">Yearly</option>
                    </select>
                  </div>
                  <div>
                    <label className={`${themeClasses.text.primary} block text-sm font-medium mb-1`}>
                      Delivery Type
                    </label>
                    <select
                      value={newSubscription.delivery_type}
                      onChange={(e) => setNewSubscription({...newSubscription, delivery_type: e.target.value})}
                      className={`${themeClasses.input.base} ${themeClasses.input.default}`}
                    >
                      <option value="standard">Standard Delivery</option>
                      <option value="express">Express Delivery</option>
                      <option value="overnight">Overnight Delivery</option>
                    </select>
                  </div>
                  <div>
                    <label className={`${themeClasses.text.primary} block text-sm font-medium mb-1`}>
                      Currency
                    </label>
                    <select
                      value={newSubscription.currency}
                      onChange={(e) => setNewSubscription({...newSubscription, currency: e.target.value})}
                      className={`${themeClasses.input.base} ${themeClasses.input.default}`}
                    >
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                    </select>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="auto_renew"
                      checked={newSubscription.auto_renew}
                      onChange={(e) => setNewSubscription({...newSubscription, auto_renew: e.target.checked})}
                      className={`${themeClasses.input.base} mr-2`}
                    />
                    <label htmlFor="auto_renew" className={`${themeClasses.text.primary} text-sm`}>
                      Auto-renew subscription
                    </label>
                  </div>
                  
                  {/* Product Selection */}
                  <div>
                    <label className={`${themeClasses.text.primary} block text-sm font-medium mb-2`}>
                      Select Products ({selectedProductsForNew.size} selected)
                    </label>
                    <div className="max-h-48 overflow-y-auto border border-border rounded-md p-2">
                      {availableProducts.length === 0 ? (
                        <p className={`${themeClasses.text.secondary} text-sm text-center py-4`}>
                          Loading products...
                        </p>
                      ) : (
                        <div className="space-y-2">
                          {availableProducts.map((product: Product) => (
                            <div key={product.id} className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                checked={selectedProductsForNew.has(product.id)}
                                onChange={(e) => {
                                  const newSelected = new Set(selectedProductsForNew);
                                  if (e.target.checked) {
                                    newSelected.add(product.id);
                                  } else {
                                    newSelected.delete(product.id);
                                  }
                                  setSelectedProductsForNew(newSelected);
                                }}
                                className={`${themeClasses.input.base} flex-shrink-0`}
                              />
                              <div className="flex items-center space-x-2 flex-1 min-w-0">
                                {product.images && product.images.length > 0 && (
                                  <img 
                                    src={product.images[0].url} 
                                    alt={product.name}
                                    className="w-8 h-8 rounded object-cover flex-shrink-0"
                                  />
                                )}
                                <div className="flex-1 min-w-0">
                                  <span className={`${themeClasses.text.primary} text-sm block truncate`}>
                                    {product.name}
                                  </span>
                                  <span className={`${themeClasses.text.muted} text-xs`}>
                                    {formatCurrencyLocale(product.price || product.min_price || 0, currency)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className={`${themeClasses.background.elevated} rounded-md p-3`}>
                    <p className={`${themeClasses.text.secondary} text-sm`}>
                      You must select at least one product to create a subscription.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setShowCreateModal(false);
                      setSelectedProductsForNew(new Set());
                    }}
                    className={`${getButtonClasses('outline')} w-full sm:w-auto`}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading || selectedProductsForNew.size === 0}
                    className={`${getButtonClasses('primary')} w-full sm:w-auto`}
                  >
                    {isLoading ? 'Creating...' : `Create Subscription (${selectedProductsForNew.size} products)`}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Add Products Modal */}
      {showAddProductModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`${themeClasses.card.base} w-full max-w-4xl max-h-[90vh] overflow-hidden`}>
            <div className="p-4 sm:p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className={`${themeClasses.text.heading} text-xl`}>Add Products to Subscription</h2>
                <button
                  onClick={() => setShowAddProductModal(false)}
                  className={`${themeClasses.text.muted} hover:${themeClasses.text.primary}`}
                >
                  <XIcon size={24} />
                </button>
              </div>
              
              {/* Search */}
              <div className="mb-4">
                <div className="relative">
                  <SearchIcon size={20} className={`${themeClasses.text.muted} absolute left-3 top-1/2 transform -translate-y-1/2`} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className={`${themeClasses.input.base} ${themeClasses.input.default} pl-10`}
                  />
                </div>
              </div>

              {/* Products Grid */}
              <div className="max-h-96 overflow-y-auto mb-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {availableProducts.map((product: Product) => (
                    <div key={product.id} className={`${themeClasses.card.base} p-4`}>
                      <div className="flex items-start space-x-3">
                        <input
                          type="checkbox"
                          checked={selectedProducts.has(product.id)}
                          onChange={(e) => {
                            const newSelected = new Set(selectedProducts);
                            if (e.target.checked) {
                              newSelected.add(product.id);
                            } else {
                              newSelected.delete(product.id);
                            }
                            setSelectedProducts(newSelected);
                          }}
                          className={`${themeClasses.input.base} mt-1 flex-shrink-0`}
                        />
                        <div className="flex-1 min-w-0">
                          {product.images && product.images.length > 0 && (
                            <img 
                              src={product.images[0].url} 
                              alt={product.name}
                              className="w-full h-24 object-cover rounded mb-2"
                            />
                          )}
                          <h3 className={`${themeClasses.text.primary} font-medium text-sm truncate`}>{product.name}</h3>
                          <p className={`${themeClasses.text.secondary} text-xs mt-1`}>
                            {formatCurrencyLocale(product.price || product.min_price || 0, currency)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <p className={themeClasses.text.secondary}>
                  {selectedProducts.size} product(s) selected
                </p>
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
                  <button
                    onClick={() => setShowAddProductModal(false)}
                    className={`${getButtonClasses('outline')} w-full sm:w-auto`}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddProducts}
                    disabled={selectedProducts.size === 0 || isLoading}
                    className={`${getButtonClasses('primary')} w-full sm:w-auto`}
                  >
                    {isLoading ? 'Adding...' : `Add ${selectedProducts.size} Product(s)`}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};