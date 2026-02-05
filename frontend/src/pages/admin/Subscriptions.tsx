import React, { useEffect, useState, useCallback } from 'react';
import { Loader, AlertCircle, PlusIcon, EditIcon, TrashIcon, ChevronLeft, ChevronRight, Calendar, DollarSign, User, Package, SearchIcon, DownloadIcon, ArrowUpDownIcon, EyeIcon, CreditCardIcon } from 'lucide-react';
import { Dropdown } from '../../components/ui/Dropdown';
import { DateTimeDropdown } from '../../components/ui/DateTimeDropdown';
import AdminAPI from '../../api/admin';
import toast from 'react-hot-toast';
import { useTheme } from '../../store/ThemeContext';

const LIMIT = 20;

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

interface Subscription {
  id: string;
  user_id: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
  subscription_plan_id: string;
  subscription_plan?: {
    id: string;
    name: string;
    description: string;
    billing_interval: string;
    base_price: number;
  };
  status: 'active' | 'paused' | 'cancelled' | 'expired' | 'pending';
  current_period_start: string;
  current_period_end: string;
  next_billing_date?: string;
  base_cost: number;
  delivery_cost: number;
  tax_amount: number;
  discount_amount?: number;
  total_cost: number;
  currency: string;
  delivery_address: {
    street: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
  created_at: string;
  updated_at?: string;
  cancelled_at?: string;
  pause_reason?: string;
  cancellation_reason?: string;
  variant_quantities?: Record<string, number>;
  variants?: Array<{
    id: string;
    name: string;
    sku: string;
    base_price: number;
    current_price?: number;
    qty: number;
  }>;
}

export const AdminSubscriptions = () => {
  const { currentTheme } = useTheme();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<PaginationInfo>({ 
    page: 1, 
    limit: LIMIT, 
    total: 0, 
    pages: 0 
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFromFilter, setDateFromFilter] = useState('');
  const [dateToFilter, setDateToFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState<Subscription | null>(null);
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const handleViewSubscription = (subscription: Subscription) => {
    setSelectedSubscription(subscription);
    setShowDetailsModal(true);
  };

  const getCostBreakdown = (subscription: Subscription) => {
    const subtotal = Number(subscription.base_cost ?? 0);
    const shipping = Number(subscription.delivery_cost ?? 0);
    const tax = Number(subscription.tax_amount ?? 0);
    const discount = Number(subscription.discount_amount ?? 0);
    const derivedTotal = subtotal + shipping + tax - discount;
    const total = Number(subscription.total_cost ?? 0);
    return {
      subtotal,
      shipping,
      tax,
      discount,
      total: total > 0 ? total : derivedTotal
    };
  };

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300); // 300ms delay

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Reset to page 1 when filters change
  const resetPage = useCallback(() => {
    setPage(1);
  }, []);

  useEffect(() => {
    resetPage();
  }, [debouncedSearchQuery, statusFilter, dateFromFilter, dateToFilter, sortBy, sortOrder, resetPage]);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        if (page === 1 && !searchQuery && !statusFilter) {
          setInitialLoading(true);
        } else {
          setLoading(true);
        }
        setError(null);
        
        const response = await AdminAPI.getSubscriptions({
          page,
          limit: LIMIT,
          status: statusFilter || undefined,
          search: debouncedSearchQuery || undefined,
          date_from: dateFromFilter || undefined,
          date_to: dateToFilter || undefined,
          sort_by: sortBy,
          sort_order: sortOrder
        });
        
        if (response?.success && response?.data) {
          const data = response.data;
          setSubscriptions(data.data || []);
          if (data.pagination) {
            setPagination({
              page: data.pagination.page || page,
              limit: data.pagination.limit || LIMIT,
              total: data.pagination.total || 0,
              pages: data.pagination.pages || 0,
            });
          }
        } else {
          throw new Error(response?.message || 'Failed to load subscriptions');
        }
      } catch (err: any) {
        const message = err?.response?.data?.message || err?.message || 'Failed to load subscriptions';
        setError(message);
        toast.error(message);
      } finally {
        setLoading(false);
        setInitialLoading(false);
      }
    };

    fetchSubscriptions();
  }, [page, debouncedSearchQuery, statusFilter, dateFromFilter, dateToFilter, sortBy, sortOrder]);

  const formatCurrency = (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount ?? 0);
  };

  const statusBadge = (status: string) => {
    const config = {
      active: { color: 'bg-success/20 text-success', label: 'Active' },
      paused: { color: 'bg-warning/20 text-warning', label: 'Paused' },
      cancelled: { color: 'bg-destructive/20 text-destructive', label: 'Cancelled' },
      expired: { color: 'bg-gray/20 text-gray', label: 'Expired' },
      pending: { color: 'bg-blue/20 text-blue', label: 'Pending' }
    };
    
    const { color, label } = config[status as keyof typeof config] || config.pending;
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${color}`}>
        {label}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-copy">Subscriptions Management</h1>
          <p className="text-sm text-copy-light mt-2">Manage all customer subscriptions</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-surface rounded-lg border border-border-light p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-copy">Filters</h2>
          <button
            type="button"
            onClick={() => setShowFilters((prev) => !prev)}
            className="md:hidden inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-border-light text-xs font-medium text-copy hover:bg-surface-light transition"
          >
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>
        <div className={`${showFilters ? 'grid' : 'hidden'} md:grid grid-cols-1 md:grid-cols-4 gap-4`}>
          <div>
            <label className="block text-sm font-medium text-copy-light mb-1">Status</label>
            <Dropdown
              options={[
                { value: '', label: 'All Status' },
                { value: 'active', label: 'Active' },
                { value: 'paused', label: 'Paused' },
                { value: 'cancelled', label: 'Cancelled' },
                { value: 'expired', label: 'Expired' },
                { value: 'pending', label: 'Pending' }
              ]}
              value={statusFilter}
              onChange={(value) => setStatusFilter(value)}
              placeholder="All Status"
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-copy-light mb-1">Search</label>
            <input
              type="text"
              placeholder="Search by email, name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors ${currentTheme === 'dark' ? 'bg-gray-800 border-gray-700 text-white placeholder:text-gray-400' : 'bg-white border-gray-200 text-gray-900 placeholder:text-gray-500'}`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-copy-light mb-1">From Date</label>
            <DateTimeDropdown
              value={dateFromFilter}
              onChange={(value) => setDateFromFilter(value)}
              placeholder="Select from date"
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-copy-light mb-1">To Date</label>
            <DateTimeDropdown
              value={dateToFilter}
              onChange={(value) => setDateToFilter(value)}
              placeholder="Select to date"
              className="w-full"
            />
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-destructive/10 border border-destructive rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-destructive">Error</p>
            <p className="text-destructive/80 text-sm">{error}</p>
          </div>
        </div>
      )}

      <div className="bg-surface rounded-lg border border-border-light overflow-hidden">
        <div className="p-6 border-b border-border-light">
          <h2 className="text-lg font-semibold text-copy">All Subscriptions ({subscriptions.length})</h2>
        </div>

        {subscriptions.length > 0 ? (
          <>
            <div className="hidden md:block overflow-hidden">
              <table className="w-full table-fixed">
                <thead className="bg-surface-dark border-b border-border-light">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-copy-light w-[28%]">Customer</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-copy-light w-[18%] hidden lg:table-cell">Plan</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-copy-light w-[12%]">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-copy-light w-[16%]">Monthly Cost</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-copy-light w-[16%]">Next Billing</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-copy-light w-[10%] hidden xl:table-cell">Created</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-copy-light w-[10%]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {subscriptions.map((subscription) => (
                    <tr key={subscription.id} className="border-b border-border-light hover:bg-surface-light">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <User className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-copy truncate">
                              {subscription.user?.name || 'Unknown User'}
                            </p>
                            <p className="text-xs text-copy-light truncate">{subscription.user?.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell">
                        <div className="text-sm">
                          {subscription.subscription_plan ? (
                            <>
                              <p className="text-copy font-medium">{subscription.subscription_plan.name}</p>
                              <p className="text-copy-light text-xs">
                                {subscription.subscription_plan.billing_interval}
                              </p>
                            </>
                          ) : (
                            <span className="text-copy-light">{subscription.name || 'Unknown plan'}</span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        {statusBadge(subscription.status)}
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-sm">
                          <p className="font-semibold text-copy">
                            {formatCurrency(subscription.total_cost, subscription.currency)}
                          </p>
                          <p className="text-copy-light text-xs">
                            Base: {formatCurrency(subscription.base_cost, subscription.currency)}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-sm">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-copy-light" />
                            <span className="text-copy">
                              {subscription.next_billing_date 
                                ? new Date(subscription.next_billing_date).toLocaleDateString()
                                : 'N/A'
                              }
                            </span>
                          </div>
                          {subscription.current_period_end && (
                            <p className="text-copy-light text-xs">
                              Period: {new Date(subscription.current_period_end).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-copy-light hidden xl:table-cell">
                        {new Date(subscription.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <button
                          onClick={() => handleViewSubscription(subscription)}
                          className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded hover:bg-primary/20 transition text-xs whitespace-nowrap"
                        >
                          <EyeIcon className="w-3.5 h-3.5" />
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="md:hidden divide-y border-t border-border-light">
              {subscriptions.map((subscription) => (
                <div key={subscription.id} className="p-4 flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium text-copy">
                        {subscription.user?.name || 'Unknown User'}
                      </p>
                      <p className="text-xs text-copy-light">{subscription.user?.email}</p>
                    </div>
                    {statusBadge(subscription.status)}
                  </div>

                  <div className="text-xs text-copy-light">
                    {subscription.subscription_plan ? (
                      <span className="text-copy">
                        {subscription.subscription_plan.name} • {subscription.subscription_plan.billing_interval}
                      </span>
                    ) : (
                      <span className="text-copy">{subscription.name || 'Unknown plan'}</span>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <p className="text-copy-light">Monthly</p>
                      <p className="text-copy font-semibold">
                        {formatCurrency(subscription.total_cost, subscription.currency)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-copy-light">Next Billing</p>
                      <p className="text-copy">
                        {subscription.next_billing_date
                          ? new Date(subscription.next_billing_date).toLocaleDateString()
                          : 'N/A'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-copy-light">
                    <span>Created: {new Date(subscription.created_at).toLocaleDateString()}</span>
                    <button
                      onClick={() => handleViewSubscription(subscription)}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded hover:bg-primary/20 transition whitespace-nowrap"
                    >
                      <EyeIcon className="w-3.5 h-3.5" />
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="p-6 text-center text-copy-light">
            <div className="flex flex-col items-center gap-3">
              <Package className="w-12 h-12 text-copy-light/50" />
              <p>No subscriptions found</p>
            </div>
          </div>
        )}

        {/* Pagination - Always visible */}
        <div className="px-6 py-4 border-t border-border-light flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-copy-light">
            {subscriptions.length > 0 
              ? `Showing ${(pagination.page - 1) * pagination.limit + 1}–${Math.min(pagination.page * pagination.limit, pagination.total)} of ${pagination.total} subscriptions`
              : `Total: ${pagination.total} subscriptions`
            }
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-border-light bg-surface text-copy text-sm font-medium hover:bg-surface-light disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>
            <span className="text-sm text-copy-light px-2">
              Page {pagination.page} of {pagination.pages || 1}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(pagination.pages || 1, p + 1))}
              disabled={page >= (pagination.pages || 1)}
              className="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-border-light bg-surface text-copy text-sm font-medium hover:bg-surface-light disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {showDetailsModal && selectedSubscription && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setShowDetailsModal(false)}>
          <div className={`w-full max-w-3xl rounded-xl p-6 shadow-xl ${currentTheme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`} onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">Subscription Details</h3>
                <p className={`text-sm ${currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  {selectedSubscription.name || 'Subscription'}
                </p>
              </div>
              <button
                onClick={() => setShowDetailsModal(false)}
                className={`p-1 rounded-lg transition-colors ${currentTheme === 'dark' ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'}`}
              >
                <span className="text-xl">×</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className={`font-medium ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Customer</p>
                <p>{selectedSubscription.user?.name || 'Unknown User'}</p>
                <p className={`text-xs ${currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{selectedSubscription.user?.email}</p>
              </div>
              <div>
                <p className={`font-medium ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Status</p>
                {statusBadge(selectedSubscription.status)}
              </div>
              <div>
                <p className={`font-medium ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Billing</p>
                <p>Next: {selectedSubscription.next_billing_date ? new Date(selectedSubscription.next_billing_date).toLocaleDateString() : 'N/A'}</p>
                <p>Period End: {selectedSubscription.current_period_end ? new Date(selectedSubscription.current_period_end).toLocaleDateString() : 'N/A'}</p>
              </div>
              <div>
                <p className={`font-medium ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Costs</p>
                <p>Subtotal: {formatCurrency(getCostBreakdown(selectedSubscription).subtotal, selectedSubscription.currency)}</p>
                <p>Shipping: {formatCurrency(getCostBreakdown(selectedSubscription).shipping, selectedSubscription.currency)}</p>
                <p>Tax: {formatCurrency(getCostBreakdown(selectedSubscription).tax, selectedSubscription.currency)}</p>
                <p className="text-green-600">Discount: -{formatCurrency(getCostBreakdown(selectedSubscription).discount, selectedSubscription.currency)}</p>
                <p className={`text-sm font-semibold ${currentTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                  Total: {formatCurrency(getCostBreakdown(selectedSubscription).total, selectedSubscription.currency)}
                </p>
              </div>
              <div className="md:col-span-2">
                <p className={`font-medium ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Delivery Address</p>
                {selectedSubscription.delivery_address ? (
                  <p className="text-sm">
                    {selectedSubscription.delivery_address.street}, {selectedSubscription.delivery_address.city}, {selectedSubscription.delivery_address.state} {selectedSubscription.delivery_address.postal_code}, {selectedSubscription.delivery_address.country}
                  </p>
                ) : (
                  <p className={`text-xs ${currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>No delivery address</p>
                )}
              </div>

              <div className="md:col-span-2">
                <p className={`font-medium ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Variants</p>
                {selectedSubscription.variants && selectedSubscription.variants.length > 0 ? (
                  <div className="mt-2 overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className={`${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                          <th className="text-left font-medium py-1">Name</th>
                          <th className="text-left font-medium py-1">SKU</th>
                          <th className="text-right font-medium py-1">Price</th>
                          <th className="text-right font-medium py-1">Qty</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedSubscription.variants.map((variant) => (
                          <tr key={variant.id} className={`${currentTheme === 'dark' ? 'border-gray-700' : 'border-gray-200'} border-t`}>
                            <td className="py-2 pr-2">
                              <span className="text-copy text-sm truncate block">{variant.name}</span>
                            </td>
                            <td className={`py-2 pr-2 ${currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{variant.sku}</td>
                            <td className="py-2 text-right text-copy">
                              {formatCurrency(variant.current_price ?? variant.base_price, selectedSubscription.currency)}
                            </td>
                            <td className="py-2 text-right text-copy">{variant.qty}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className={`text-xs ${currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>No variants found</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSubscriptions;
