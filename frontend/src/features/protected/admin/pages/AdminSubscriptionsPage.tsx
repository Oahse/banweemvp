import React, { useEffect, useState, useCallback } from 'react';
import { Loader, AlertCircle, PlusIcon, EditIcon, TrashIcon, ChevronLeft, ChevronRight, Calendar, DollarSign, User, Package, SearchIcon, DownloadIcon, ArrowUpDownIcon, EyeIcon, CreditCardIcon } from 'lucide-react';
import { Dropdown } from '@/components/ui/Dropdown';
import { DateTimeDropdown } from '@/components/ui/DateTimeDropdown';
import AdminAPI from '@/api/admin';
import toast from 'react-hot-toast';
import { useTheme } from '@/components/shared/contexts/ThemeContext';
import AdminLayout from '../components/AdminLayout';
import { SubscriptionsListSkeleton } from '../components/skeletons/SubscriptionsSkeleton';
import { Button } from '@/components/ui/Button';
import { Heading, Body, Text, Label } from '@/components/ui/Text/Text';

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
      <Text className={`px-3 py-1 rounded-full text-xs font-semibold ${color}`}>
        {label}
      </Text>
    );
  };

  if (initialLoading) {
    return (
      <AdminLayout>
        <SubscriptionsListSkeleton />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
                <Text variant="body-sm" tone={currentTheme === 'dark' ? 'secondary' : 'default'}>Manage all customer subscriptions</Text>
          </div>
        </div>

        {/* Filters */}
        <div className={`rounded-lg border p-4 ${currentTheme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center justify-between mb-4">
            <Heading level={2} className="text-base font-semibold">Filters</Heading>
            <Button
              type="button"
              onClick={() => setShowFilters((prev) => !prev)}
              className={`md:hidden inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border text-xs font-medium transition ${
                currentTheme === 'dark' ? 'bg-gray-800 text-gray-200' : 'bg-white border-gray-300 text-gray-700'
              }`}
            >
            <Text className={`text-xs font-medium transition ${
                currentTheme === 'dark' ? 'text-gray-200' : 'text-gray-700'
              }`}>
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </Text>
            </Button>
          </div>
          <div className={`${showFilters ? 'grid' : 'hidden'} md:grid grid-cols-1 md:grid-cols-4 gap-4`}>
            <div>
              <Label className={`block text-sm font-medium mb-1 ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Status</Label>
              {/* ... */}
            </div>
          </div>
        </div>

        {/* ... */}

        <div className={`rounded-lg border overflow-hidden ${currentTheme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className={`p-4 border-b ${currentTheme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
            <Heading level={2} className="text-lg font-semibold">All Subscriptions ({subscriptions.length})</Heading>
          </div>

          {/* ... */}

          <div className="hidden md:block overflow-hidden">
            <table className="w-full table-fixed">
              <thead className={`${currentTheme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} border-b ${currentTheme === 'dark' ? 'border-gray-600' : 'border-gray-200'}`}>
                <tr>
                  {/* ... */}
                </tr>
              </thead>
              <tbody>
                {subscriptions.map((subscription) => (
                  <tr key={subscription.id} className={`border-b ${currentTheme === 'dark' ? 'border-gray-700' : 'border-gray-200'} hover:${currentTheme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    {/* ... */}
                    <td className="px-4 py-3 text-sm">
                      <Button
                        onClick={() => handleViewSubscription(subscription)}
                        variant="primary"
                        size="sm"
                        className="inline-flex items-center gap-1 px-2 py-1.5 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors text-xs whitespace-nowrap"
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ... */}

          <div className={`px-4 py-4 border-t ${currentTheme === 'dark' ? 'border-gray-700' : 'border-gray-200'} flex flex-wrap items-center justify-between gap-4`}>
              <Text variant="body-sm" tone={currentTheme === 'dark' ? 'secondary' : 'default'}>
                {/* ... */}
              </Text>
            <div className="flex items-center gap-2">
              <Button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                variant="outline"
                size="sm"
              >
                Previous
              </Button>
              <Text variant="body-sm" tone={currentTheme === 'dark' ? 'secondary' : 'default'}>Page {pagination.page} of {pagination.pages || 1}</Text>
              <Button
                onClick={() => setPage((p) => Math.min(pagination.pages || 1, p + 1))}
                disabled={page >= pagination.pages || pagination.pages <= 1}
                variant="outline"
                size="sm"
              >
                Next
              </Button>
            </div>
          </div>
        </div>

        {/* ... */}

        {showDetailsModal && selectedSubscription && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setShowDetailsModal(false)}>
            <div className={`w-full max-w-3xl rounded-xl p-6 shadow-xl ${currentTheme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`} onClick={(e) => e.stopPropagation()}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <Heading level={3} className="text-lg font-semibold">Subscription Details</Heading>
                  <Body className={`text-sm ${currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    {selectedSubscription.name || 'Subscription'}
                  </Body>
                </div>
                <Button
                  onClick={() => setShowDetailsModal(false)}
                  variant="ghost"
                  size="sm"
                  className={`p-1 rounded-lg transition-colors ${currentTheme === 'dark' ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'}`}
                >
                  Close
                </Button>
              </div>

              {/* ... */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Text variant="body-sm">{selectedSubscription.user?.name || 'Unknown User'}</Text>
                  <Text variant="caption" tone="secondary">{selectedSubscription.user?.email}</Text>
                </div>
                <div>
                  <Text weight="medium" tone={currentTheme === 'dark' ? 'secondary' : 'default'}>Status</Text>
                  {statusBadge(selectedSubscription.status)}
                </div>
                <div>
                  <Text weight="medium" tone={currentTheme === 'dark' ? 'secondary' : 'default'}>Billing</Text>
                  <Text variant="body-sm">Next: {selectedSubscription.next_billing_date ? new Date(selectedSubscription.next_billing_date).toLocaleDateString() : 'N/A'}</Text>
                  <Text variant="body-sm">Period End: {selectedSubscription.current_period_end ? new Date(selectedSubscription.current_period_end).toLocaleDateString() : 'N/A'}</Text>
                </div>
                <div>
                  <Text weight="medium" tone={currentTheme === 'dark' ? 'secondary' : 'default'}>Costs</Text>
                  <Text variant="body-sm">Subtotal: {formatCurrency(getCostBreakdown(selectedSubscription).subtotal, selectedSubscription.currency)}</Text>
                  <Text variant="body-sm">Shipping: {formatCurrency(getCostBreakdown(selectedSubscription).shipping, selectedSubscription.currency)}</Text>
                  <Text variant="body-sm">Tax: {formatCurrency(getCostBreakdown(selectedSubscription).tax, selectedSubscription.currency)}</Text>
                <Text tone="success" variant="body-sm">Discount: -{formatCurrency(getCostBreakdown(selectedSubscription).discount, selectedSubscription.currency)}</Text>
                  <Text variant="body-sm" weight="semibold">Total: {formatCurrency(getCostBreakdown(selectedSubscription).total, selectedSubscription.currency)}</Text>
                </div>
                <div className="md:col-span-2">
                  <Text weight="medium" tone={currentTheme === 'dark' ? 'secondary' : 'default'}>Delivery Address</Text>
                  {selectedSubscription.delivery_address ? (
                    <Text variant="body-sm">
                      {selectedSubscription.delivery_address.street}, {selectedSubscription.delivery_address.city}, {selectedSubscription.delivery_address.state} {selectedSubscription.delivery_address.postal_code}, {selectedSubscription.delivery_address.country}
                    </Text>
                  ) : (
                    <Text variant="caption" tone="secondary">No delivery address</Text>
                  )}
                </div>

                <div className="md:col-span-2">
                  <Text weight="medium" tone={currentTheme === 'dark' ? 'secondary' : 'default'}>Variants</Text>
                  {selectedSubscription.variants && selectedSubscription.variants.length > 0 ? (
                    <div className="mt-2 overflow-x-auto">
                      <table className="w-full text-xs">
                        <thead>
                          <tr>
                            <th className="text-left py-1"><Text variant="caption" weight="medium">Name</Text></th>
                            <th className="text-left py-1"><Text variant="caption" weight="medium">SKU</Text></th>
                            <th className="text-right py-1"><Text variant="caption" weight="medium">Price</Text></th>
                            <th className="text-right py-1"><Text variant="caption" weight="medium">Qty</Text></th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedSubscription.variants.map((variant) => (
                            <tr key={variant.id} className={`${currentTheme === 'dark' ? 'border-gray-700' : 'border-gray-200'} border-t`}>
                              <td className="py-2 pr-2">
                                <Text variant="body-sm" truncate="single">{variant.name}</Text>
                              </td>
                              <td className={`py-2 pr-2`}>
                                <Text variant="body-sm" tone="secondary">{variant.sku}</Text>
                              </td>
                              <td className="py-2 text-right">
                                <Text variant="body-sm">{formatCurrency(variant.current_price ?? variant.base_price, selectedSubscription.currency)}</Text>
                              </td>
                              <td className="py-2 text-right">
                                <Text variant="body-sm">{variant.qty}</Text>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <Text variant="caption" tone="secondary">No variants found</Text>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminSubscriptions;
