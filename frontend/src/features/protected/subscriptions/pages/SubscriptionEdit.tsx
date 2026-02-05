import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSubscription } from '../../SubscriptionContext';
import { 
  ArrowLeftIcon,
  SaveIcon,
  PackageIcon,
  CalendarIcon,
  DollarSignIcon,
  MapPinIcon,
  CreditCardIcon,
  SettingsIcon
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { ProductVariantModal } from '../components/ui/ProductVariantModal';
import { ConfirmationModal } from '../components/ui/ConfirmationModal';
interface SubscriptionDetail {
  id: string;
  status: 'active' | 'paused' | 'cancelled' | 'expired';
  subscription_plan?: {
    id: string;
    name: string;
    description: string;
    billing_interval: string;
    base_price: number;
  };
  current_period_start: string;
  current_period_end: string;
  next_billing_date?: string;
  base_cost: number;
  delivery_cost: number;
  tax_amount: number;
  total_cost: number;
  currency: string;
  delivery_address: {
    street: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
  payment_method?: {
    id: string;
    type: string;
    last4: string;
    brand: string;
  };
  product_variants?: Array<{
    id: string;
    name: string;
    sku: string;
    price: number;
    quantity: number;
    product?: {
      name: string;
      images?: Array<{ url: string }>;
    };
  }>;
  auto_renew: boolean;
  created_at: string;
  updated_at?: string;
  cancelled_at?: string;
  pause_reason?: string;
  cancellation_reason?: string;
}

export const SubscriptionEdit = () => {
  const { subscriptionId } = useParams<{ subscriptionId: string }>();
  const navigate = useNavigate();
  const { updateSubscription, addProductsToSubscription, removeProductsFromSubscription } = useSubscription();

  const [subscription, setSubscription] = useState<SubscriptionDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('details');
  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedVariants, setSelectedVariants] = useState<string[]>([]);
  const [showAddProductsModal, setShowAddProductsModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [variantToRemove, setVariantToRemove] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    delivery_address: {
      street: '',
      city: '',
      state: '',
      postal_code: '',
      country: ''
    },
    auto_renew: true,
    billing_cycle: 'monthly'
  });

  useEffect(() => {
    if (subscriptionId) {
      loadSubscription();
    }
  }, [subscriptionId]);

  const loadSubscription = async () => {
    try {
      setLoading(true);
      setError(null);
      // This would typically call an API to get subscription details
      // For now, we'll simulate the data
      const mockSubscription: SubscriptionDetail = {
        id: subscriptionId!,
        status: 'active',
        subscription_plan: {
          id: 'basic',
          name: 'Basic Plan',
          description: 'Monthly subscription with basic features',
          billing_interval: 'monthly',
          base_price: 29.99
        },
        current_period_start: '2024-01-01T00:00:00Z',
        current_period_end: '2024-02-01T00:00:00Z',
        next_billing_date: '2024-02-01T00:00:00Z',
        base_cost: 29.99,
        delivery_cost: 5.99,
        tax_amount: 3.60,
        total_cost: 39.58,
        currency: 'USD',
        delivery_address: {
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          postal_code: '10001',
          country: 'USA'
        },
        payment_method: {
          id: 'pm_123',
          type: 'card',
          last4: '4242',
          brand: 'visa'
        },
        product_variants: [
          {
            id: 'var_1',
            name: 'Premium Coffee Beans',
            sku: 'COFFEE-001',
            price: 19.99,
            quantity: 2,
            product: {
              name: 'Coffee Subscription',
              images: [{ url: '/placeholder-coffee.jpg' }]
            }
          }
        ],
        auto_renew: true,
        created_at: '2024-01-01T00:00:00Z'
      };

      setSubscription(mockSubscription);
      setFormData({
        name: mockSubscription.subscription_plan?.name || 'My Subscription',
        delivery_address: mockSubscription.delivery_address,
        auto_renew: mockSubscription.auto_renew,
        billing_cycle: mockSubscription.subscription_plan?.billing_interval || 'monthly'
      });
    } catch (err: any) {
      setError(err.message || 'Failed to load subscription');
      toast.error('Failed to load subscription');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!subscription) return;

    setSaving(true);
    try {
      await updateSubscription(subscription.id, formData);
      toast.success('Subscription updated successfully');
      await loadSubscription(); // Reload to get updated data
    } catch (err: any) {
      toast.error('Failed to update subscription');
    } finally {
      setSaving(false);
    }
  };

  const handleAddProducts = async (variantIds: string[]) => {
    if (!subscription || variantIds.length === 0) return;

    try {
      await addProductsToSubscription(subscription.id, variantIds);
      setShowProductModal(false);
      setShowAddProductsModal(false);
      setSelectedVariants([]);
      toast.success('Products added successfully');
      await loadSubscription();
    } catch (err: any) {
      toast.error('Failed to add products');
    }
  };

  const handleRemoveProduct = async (variantId: string) => {
    if (!subscription) return;

    try {
      await removeProductsFromSubscription(subscription.id, [variantId]);
      setShowRemoveModal(false);
      setVariantToRemove(null);
      toast.success('Product removed successfully');
      await loadSubscription();
    } catch (err: any) {
      toast.error('Failed to remove product');
    }
  };

  const formatCurrency = (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount || 0);
  };

  const getStatusBadge = (status: string) => {
    const config = {
      active: { color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200', label: 'Active' },
      paused: { color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200', label: 'Paused' },
      cancelled: { color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200', label: 'Cancelled' },
      expired: { color: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200', label: 'Expired' }
    };
    
    const { color, label } = config[status as keyof typeof config] || config.active;
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${color}`}>
        {label}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="ml-4 text-gray-600 dark:text-gray-400">Loading subscription...</p>
      </div>
    );
  }

  if (error || !subscription) {
    return (
      <div className="text-center p-6">
        <p className="text-red-600 dark:text-red-400">Error: {error || 'Subscription not found'}</p>
        <button
          onClick={() => navigate('/account/subscriptions')}
          className="mt-4 text-primary hover:underline"
        >
          Back to Subscriptions
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/account/subscriptions')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
          >
            <ArrowLeftIcon size={20} />
            Back to Subscriptions
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Edit Subscription
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {subscription.subscription_plan?.name} • {subscription.id.slice(0, 8)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {getStatusBadge(subscription.status)}
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50 transition-colors"
          >
            <SaveIcon size={16} />
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-6 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
        {[
          { key: 'details', label: 'Details', icon: <SettingsIcon size={16} /> },
          { key: 'products', label: 'Products', icon: <PackageIcon size={16} /> },
          { key: 'billing', label: 'Billing', icon: <DollarSignIcon size={16} /> },
          { key: 'delivery', label: 'Delivery', icon: <MapPinIcon size={16} /> },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        {/* Details Tab */}
        {activeTab === 'details' && (
          <div className="p-6 space-y-8">
            {/* Main Subscription Info */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-6 border border-blue-100 dark:border-gray-600">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                Subscription Information
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">
                    Subscription Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter subscription name (e.g., Premium Coffee Plan)"
                    className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-500 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-medium transition-all duration-200"
                    maxLength={255}
                  />
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Give your subscription a descriptive name
                    </p>
                    <span className="text-xs text-gray-400 dark:text-gray-500">
                      {formData.name.length}/255
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">
                    Billing Cycle
                  </label>
                  <select
                    value={formData.billing_cycle}
                    onChange={(e) => setFormData(prev => ({ ...prev, billing_cycle: e.target.value }))}
                    className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-500 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-medium transition-all duration-200"
                  >
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Choose how often you're billed
                  </p>
                </div>
              </div>
            </div>

            {/* Settings Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                Settings & Status
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-4">
                    Auto-renew
                  </label>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => setFormData(prev => ({ ...prev, auto_renew: !prev.auto_renew }))}
                        className={`relative inline-flex h-8 w-14 items-center rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                          formData.auto_renew ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-500'
                        }`}
                      >
                        <span
                          className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-lg transition-transform duration-300 ${
                            formData.auto_renew ? 'translate-x-7' : 'translate-x-1'
                          }`}
                        />
                      </button>
                      <div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {formData.auto_renew ? 'Enabled' : 'Disabled'}
                        </span>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {formData.auto_renew ? 'Automatically renew subscription' : 'Manual renewal required'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-4">
                    Current Status
                  </label>
                  <div className="flex items-center justify-center">
                    {getStatusBadge(subscription.status)}
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                Timeline & Important Dates
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-600 rounded-xl border border-purple-100 dark:border-gray-600">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">Created</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Subscription start date</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {new Date(subscription.created_at).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-700 dark:to-gray-600 rounded-xl border border-blue-100 dark:border-gray-600">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">Current Period</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Billing period dates</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {new Date(subscription.current_period_start).toLocaleDateString()} - {new Date(subscription.current_period_end).toLocaleDateString()}
                  </span>
                </div>
                
                {subscription.next_billing_date && (
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-700 dark:to-gray-600 rounded-xl border border-green-100 dark:border-gray-600">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">Next Billing</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Upcoming charge date</p>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {new Date(subscription.next_billing_date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Products ({subscription.product_variants?.length || 0})
              </h3>
              <button
                onClick={() => {
                  setSelectedVariants([]);
                  setShowAddProductsModal(true);
                  setShowProductModal(true);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
              >
                <PackageIcon size={16} />
                Add Products
              </button>
            </div>

            <div className="space-y-4">
              {subscription.product_variants?.map((variant) => (
                <div key={variant.id} className="flex items-center gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  {variant.product?.images?.[0]?.url ? (
                    <img
                      src={variant.product.images[0].url}
                      alt={variant.name}
                      className="w-16 h-16 rounded-lg object-cover border border-gray-300 dark:border-gray-600"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-lg bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                      <PackageIcon className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-white">{variant.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{variant.product?.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">SKU: {variant.sku}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {formatCurrency(variant.price, subscription.currency)}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Qty: {variant.quantity}</p>
                    <button
                      onClick={() => {
                        setVariantToRemove(variant.id);
                        setShowRemoveModal(true);
                      }}
                      className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Billing Tab */}
        {activeTab === 'billing' && (
          <div className="p-6 space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Billing Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white">Cost Breakdown</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Base Cost:</span>
                    <span className="text-gray-900 dark:text-white">
                      {formatCurrency(subscription.base_cost, subscription.currency)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Delivery:</span>
                    <span className="text-gray-900 dark:text-white">
                      {formatCurrency(subscription.delivery_cost, subscription.currency)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Tax:</span>
                    <span className="text-gray-900 dark:text-white">
                      {formatCurrency(subscription.tax_amount, subscription.currency)}
                    </span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg pt-2 border-t border-gray-200 dark:border-gray-700">
                    <span>Total:</span>
                    <span className="text-gray-900 dark:text-white">
                      {formatCurrency(subscription.total_cost, subscription.currency)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white">Payment Method</h4>
                {subscription.payment_method ? (
                  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-center gap-3">
                      <CreditCardIcon className="w-8 h-8 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white capitalize">
                          {subscription.payment_method.brand} •••• {subscription.payment_method.last4}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {subscription.payment_method.type}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg text-center">
                    <p className="text-gray-600 dark:text-gray-400">No payment method on file</p>
                    <button className="mt-2 text-primary hover:underline text-sm">
                      Add Payment Method
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Delivery Tab */}
        {activeTab === 'delivery' && (
          <div className="p-6 space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Delivery Address</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Street Address
                </label>
                <input
                  type="text"
                  value={formData.delivery_address.street}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    delivery_address: { ...prev.delivery_address, street: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  City
                </label>
                <input
                  type="text"
                  value={formData.delivery_address.city}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    delivery_address: { ...prev.delivery_address, city: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  State
                </label>
                <input
                  type="text"
                  value={formData.delivery_address.state}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    delivery_address: { ...prev.delivery_address, state: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Postal Code
                </label>
                <input
                  type="text"
                  value={formData.delivery_address.postal_code}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    delivery_address: { ...prev.delivery_address, postal_code: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Country
                </label>
                <input
                  type="text"
                  value={formData.delivery_address.country}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    delivery_address: { ...prev.delivery_address, country: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Product Variant Modal */}
      <ProductVariantModal
        isOpen={showProductModal}
        onClose={() => {
          setShowProductModal(false);
          setSelectedVariants([]);
        }}
        onSelectionChange={(variants) => {
          setSelectedVariants(variants);
        }}
        selectedVariants={selectedVariants}
        multiSelect={true}
        title="Add Products to Subscription"
      />

      {/* Confirmation Modals */}
      {showAddProductsModal && (
        <ConfirmationModal
          isOpen={true}
          onClose={() => {
            setShowAddProductsModal(false);
            setShowProductModal(false);
            setSelectedVariants([]);
          }}
          onConfirm={() => handleAddProducts(selectedVariants)}
          title="Add Products"
          message={`Are you sure you want to add ${selectedVariants.length} product${selectedVariants.length !== 1 ? 's' : ''} to this subscription?`}
          confirmText="Add Products"
          cancelText="Cancel"
        />
      )}

      {showRemoveModal && variantToRemove && (
        <ConfirmationModal
          isOpen={true}
          onClose={() => {
            setShowRemoveModal(false);
            setVariantToRemove(null);
          }}
          onConfirm={() => handleRemoveProduct(variantToRemove)}
          title="Remove Product"
          message="Are you sure you want to remove this product from your subscription?"
          confirmText="Remove"
          cancelText="Cancel"
        />
      )}
    </div>
  );
};

export default SubscriptionEdit;
