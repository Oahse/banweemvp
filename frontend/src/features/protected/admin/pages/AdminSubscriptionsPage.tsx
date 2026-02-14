import { useEffect, useState, useCallback } from 'react';
import { Loader, AlertCircle, PlusIcon, EditIcon, TrashIcon, Calendar, DollarSign, User, Package, SearchIcon, DownloadIcon, ArrowUpDownIcon, EyeIcon, CreditCardIcon } from 'lucide-react';
import { Dropdown } from '@/components/ui/Dropdown';
import { DateTimeDropdown } from '@/components/ui/DateTimeDropdown';
import AdminAPI from '@/api/admin';
import toast from 'react-hot-toast';
import { useTheme } from '@/components/shared/contexts/ThemeContext';
import { SubscriptionsListSkeleton } from '@/features/protected/admin/components/skeletons/SubscriptionsSkeleton';
import { Button } from '@/components/ui/Button';
import { Heading, Body, Text as TextComponent, Label } from '@/components/ui/Text/Text';
import { Modal, ModalHeader, ModalBody, useModal } from '@/components/ui/Modal';
import { AdminDataTable, AdminColumn, FilterConfig } from '@/components/shared/AdminDataTable';
import { Card } from '@/components/ui/Card';

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
  name: string;
  status: 'active' | 'paused' | 'cancelled' | 'payment_failed';
  currency: string;
  billing_cycle: 'weekly' | 'monthly' | 'yearly';
  auto_renew: boolean;
  
  // Billing dates
  current_period_start?: string;
  current_period_end?: string;
  next_billing_date?: string;
  cancelled_at?: string;
  paused_at?: string;
  pause_reason?: string;
  last_payment_error?: string;
  
  // Payment retry fields
  payment_retry_count?: number;
  last_payment_attempt?: string;
  next_retry_date?: string;
  
  // Delivery info
  delivery_type?: string;
  delivery_address_id?: string;
  delivery_address?: {
    street: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
  
  // Historical prices (at creation)
  price_at_creation?: number;
  variant_prices_at_creation?: Array<{
    id: string;
    price: number;
    qty: number;
  }>;
  shipping_amount_at_creation?: number;
  tax_amount_at_creation?: number;
  tax_rate_at_creation?: number;
  
  // Current prices (updated each billing cycle)
  current_variant_prices?: Array<{
    id: string;
    price: number;
    qty: number;
  }>;
  current_shipping_amount?: number;
  current_tax_amount?: number;
  current_tax_rate?: number;
  
  // Legacy fields for compatibility
  base_cost?: number;
  delivery_cost?: number;
  tax_amount?: number;
  discount_amount?: number;
  total_cost?: number;
  subtotal?: number;
  shipping_cost?: number;
  total?: number;
  
  // Products
  variant_ids?: string[];
  variant_quantities?: Record<string, number>;
  variants?: Array<{
    id: string;
    name: string;
    sku: string;
    base_price: number;
    current_price?: number;
    qty: number;
  }>;
  
  // Discount info
  discount?: {
    type?: string;
    value?: number;
    code?: string;
  } | null;
  discount_id?: string;
  discount_type?: string;
  discount_value?: number;
  discount_code?: string;
  
  // Timestamps
  created_at: string;
  updated_at?: string;
  
  // Metadata
  subscription_metadata?: {
    variant_quantities?: { [variantId: string]: number };
    last_order_created?: string;
    orders_created_count?: number;
  };
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
  const detailsModal = useModal();
  const [selectedSubscription, setSelectedSubscription] = useState<Subscription | null>(null);
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const handleViewSubscription = (subscription: Subscription) => {
    setSelectedSubscription(subscription);
    detailsModal.open();
  };

  const getCostBreakdown = (subscription: Subscription) => {
    // Use current prices if available, fallback to creation prices, then legacy fields
    const subtotal = Number(
      subscription.subtotal ?? 
      subscription.base_cost ?? 
      subscription.price_at_creation ?? 
      0
    );
    const shipping = Number(
      subscription.current_shipping_amount ?? 
      subscription.shipping_amount_at_creation ?? 
      subscription.delivery_cost ?? 
      subscription.shipping_cost ?? 
      0
    );
    const tax = Number(
      subscription.current_tax_amount ?? 
      subscription.tax_amount_at_creation ?? 
      subscription.tax_amount ?? 
      0
    );
    const discount = Number(
      subscription.discount_value ?? 
      subscription.discount_amount ?? 
      0
    );
    const derivedTotal = subtotal + shipping + tax - discount;
    const total = Number(
      subscription.total ?? 
      subscription.total_cost ?? 
      0
    );
    return {
      subtotal,
      shipping,
      tax,
      discount,
      total: total > 0 ? total : derivedTotal
    };
  };

  const fetchData = async (params: any) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await AdminAPI.getSubscriptions({
        page: params.page,
        limit: params.limit,
        search: params.search,
        status: params.filters?.status || undefined,
        date_from: params.filters?.date_from || undefined,
        date_to: params.filters?.date_to || undefined,
        sort_by: params.sort_by,
        sort_order: params.sort_order
      });
      
      if (response?.success && response?.data) {
        const data = response.data;
        const allSubscriptions = Array.isArray(data) ? data : data?.data || data?.items || [];
        
        let filteredSubscriptions = allSubscriptions;
        
        if (params.search) {
          filteredSubscriptions = filteredSubscriptions.filter((sub: any) =>
            sub.user?.email?.toLowerCase().includes(params.search.toLowerCase()) ||
            sub.user?.name?.toLowerCase().includes(params.search.toLowerCase()) ||
            sub.subscription_plan?.name?.toLowerCase().includes(params.search.toLowerCase())
          );
        }
        
        if (params.filters?.status) {
          filteredSubscriptions = filteredSubscriptions.filter((sub: any) => sub.status === params.filters.status);
        }
        
        if (params.filters?.date_from) {
          filteredSubscriptions = filteredSubscriptions.filter((sub: any) => {
            const subDate = new Date(sub.created_at || 0);
            const fromDate = new Date(params.filters.date_from);
            return subDate >= fromDate;
          });
        }
        
        if (params.filters?.date_to) {
          filteredSubscriptions = filteredSubscriptions.filter((sub: any) => {
            const subDate = new Date(sub.created_at || 0);
            const toDate = new Date(params.filters.date_to);
            return subDate <= toDate;
          });
        }
        
        if (params.sort_by === 'created_at') {
          filteredSubscriptions.sort((a: any, b: any) => {
            const aDate = new Date(a.created_at || 0);
            const bDate = new Date(b.created_at || 0);
            return params.sort_order === 'asc' 
              ? aDate.getTime() - bDate.getTime()
              : bDate.getTime() - aDate.getTime();
          });
        } else if (params.sort_by === 'user_email') {
          filteredSubscriptions.sort((a: any, b: any) => {
            const aEmail = (a.user?.email || '').toLowerCase();
            const bEmail = (b.user?.email || '').toLowerCase();
            return params.sort_order === 'asc' 
              ? aEmail.localeCompare(bEmail)
              : bEmail.localeCompare(aEmail);
          });
        } else if (params.sort_by === 'subscription_plan') {
          filteredSubscriptions.sort((a: any, b: any) => {
            const aPlan = (a.subscription_plan?.name || '').toLowerCase();
            const bPlan = (b.subscription_plan?.name || '').toLowerCase();
            return params.sort_order === 'asc' 
              ? aPlan.localeCompare(bPlan)
              : bPlan.localeCompare(aPlan);
          });
        } else if (params.sort_by === 'total_cost') {
          filteredSubscriptions.sort((a: any, b: any) => {
            return params.sort_order === 'asc' 
              ? a.total_cost - b.total_cost
              : b.total_cost - a.total_cost;
          });
        }
        
        const total = filteredSubscriptions.length;
        const pages = Math.max(1, Math.ceil(total / params.limit));
        const startIndex = (params.page - 1) * params.limit;
        const endIndex = startIndex + params.limit;
        const paginatedSubscriptions = filteredSubscriptions.slice(startIndex, endIndex);
        
        setSubscriptions(paginatedSubscriptions);
        setPagination({
          page: params.page,
          limit: params.limit,
          total: total,
          pages: pages
        });
      } else {
        throw new Error(response?.message || 'Failed to load subscriptions');
      }
    } catch (err: any) {
      const message = err?.response?.data?.message || 'Failed to load subscriptions';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  };

  // Define columns for AdminDataTable
  const columns: AdminColumn<Subscription>[] = [
    {
      key: 'user',
      label: 'Customer',
      sortable: true,
      render: (value: string, row: Subscription) => (
        <div>
          <TextComponent className="text-sm text-gray-900 dark:text-white">{row.user?.name || 'N/A'}</TextComponent>
          <TextComponent className="text-sm text-gray-500 dark:text-gray-400">{row.user?.email || 'N/A'}</TextComponent>
        </div>
      ),
    },
    {
      key: 'name',
      label: 'Subscription',
      sortable: true,
      render: (value: string, row: Subscription) => (
        <div>
          <TextComponent className="text-sm text-gray-900 dark:text-white">{value || 'N/A'}</TextComponent>
          <TextComponent className="text-sm text-gray-500 dark:text-gray-400">{row.billing_cycle || 'monthly'}</TextComponent>
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (value: string) => statusBadge(value),
    },
    {
      key: 'total_cost',
      label: 'Total Cost',
      sortable: true,
      render: (value: number, row: Subscription) => (
        <TextComponent className="text-sm font-semibold text-gray-900 dark:text-white">
          {formatCurrency(value, row.currency)}
        </TextComponent>
      ),
    },
    {
      key: 'next_billing_date',
      label: 'Next Billing',
      sortable: true,
      render: (value: string) => (
        <TextComponent className="text-sm text-gray-900 dark:text-white">
          {value ? new Date(value).toLocaleDateString() : 'N/A'}
        </TextComponent>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_: any, row: Subscription) => (
        <Button
          onClick={() => handleViewSubscription(row)}
          variant="ghost"
          size="xs"
          leftIcon={<EyeIcon size={14} />}
          className="inline-flex items-center gap-1 px-2 py-1.5 text-primary hover:bg-primary/10 rounded-lg transition-colors"
        >
          View
        </Button>
      ),
    },
  ];

  const filters: FilterConfig[] = [
    {
      key: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { value: '', label: 'All Status' },
        { value: 'active', label: 'Active Only' },
        { value: 'paused', label: 'Paused Only' },
        { value: 'cancelled', label: 'Cancelled Only' },
        { value: 'payment_failed', label: 'Payment Failed Only' }
      ],
      placeholder: 'All Status',
    },
  ];

  const statusBadge = (status: string) => {
    const config = {
      active: { color: 'bg-success/20 text-success', label: 'Active' },
      paused: { color: 'bg-warning/20 text-warning', label: 'Paused' },
      cancelled: { color: 'bg-error/20 text-error', label: 'Cancelled' },
      payment_failed: { color: 'bg-orange/20 text-orange', label: 'Payment Failed' }
    };
    
    const { color, label } = config[status as keyof typeof config] || { color: 'bg-gray/20 text-gray', label: status };
    
    return (
      <TextComponent className={`px-3 py-1 rounded-full text-sm font-semibold ${color}`}>
        {label}
      </TextComponent>
    );
  };

  const formatCurrency = (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount ?? 0);
  };

  useEffect(() => {
    fetchData({
      page: 1,
      limit: LIMIT,
      search: '',
      sort_by: 'created_at',
      sort_order: 'desc'
    });
  }, []);

  if (initialLoading) {
    return <SubscriptionsListSkeleton />;
  }

  return (
    <div className={`space-y-3 ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
        <div className="flex items-center justify-between">
          <div>
            <TextComponent variant="body-sm" tone={currentTheme === 'dark' ? 'secondary' : 'default'}>Manage all customer subscriptions</TextComponent>
          </div>
        </div>

        <AdminDataTable
          data={subscriptions}
          loading={loading}
          error={error}
          pagination={pagination}
          columns={columns}
          fetchData={fetchData}
          searchPlaceholder="Search subscriptions..."
          filters={filters}
          emptyMessage="No subscriptions found"
          responsive="cards"
          limit={LIMIT}
          onRowClick={handleViewSubscription}
        />

        <Modal isOpen={detailsModal.isOpen} onClose={detailsModal.close} size="lg">
          {selectedSubscription && (
            <>
              <ModalHeader>
                <div>
                  <Heading level={5} className="text-lg font-semibold">Subscription Details</Heading>
                  <Body className={`text-sm ${currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    {selectedSubscription.name || 'Subscription'}
                  </Body>
                </div>
              </ModalHeader>

              <ModalBody>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <TextComponent variant="body-sm">{selectedSubscription.user?.name || 'Unknown User'}</TextComponent>
                    <TextComponent variant="caption" tone="secondary">{selectedSubscription.user?.email}</TextComponent>
                  </div>
                  <div>
                    <TextComponent weight="medium" tone={currentTheme === 'dark' ? 'secondary' : 'default'}>Status</TextComponent>
                    {statusBadge(selectedSubscription.status)}
                  </div>
                  <div>
                    <TextComponent weight="medium" tone={currentTheme === 'dark' ? 'secondary' : 'default'}>Billing</TextComponent>
                    <TextComponent variant="body-sm">Cycle: {selectedSubscription.billing_cycle || 'monthly'}</TextComponent>
                    <TextComponent variant="body-sm">Next: {selectedSubscription.next_billing_date ? new Date(selectedSubscription.next_billing_date).toLocaleDateString() : 'N/A'}</TextComponent>
                    <TextComponent variant="body-sm">Period End: {selectedSubscription.current_period_end ? new Date(selectedSubscription.current_period_end).toLocaleDateString() : 'N/A'}</TextComponent>
                    <TextComponent variant="body-sm">Auto-Renew: {selectedSubscription.auto_renew ? 'Yes' : 'No'}</TextComponent>
                  </div>
                  <div>
                    <TextComponent weight="medium" tone={currentTheme === 'dark' ? 'secondary' : 'default'}>Costs</TextComponent>
                    <TextComponent variant="body-sm">Subtotal: {formatCurrency(getCostBreakdown(selectedSubscription).subtotal, selectedSubscription.currency)}</TextComponent>
                    <TextComponent variant="body-sm">Shipping: {formatCurrency(getCostBreakdown(selectedSubscription).shipping, selectedSubscription.currency)}</TextComponent>
                    <TextComponent variant="body-sm">Tax: {formatCurrency(getCostBreakdown(selectedSubscription).tax, selectedSubscription.currency)}</TextComponent>
                    {getCostBreakdown(selectedSubscription).discount > 0 && (
                      <TextComponent tone="success" variant="body-sm">Discount: -{formatCurrency(getCostBreakdown(selectedSubscription).discount, selectedSubscription.currency)}</TextComponent>
                    )}
                    <TextComponent variant="body-sm" weight="semibold">Total: {formatCurrency(getCostBreakdown(selectedSubscription).total, selectedSubscription.currency)}</TextComponent>
                  </div>
                  
                  {/* Payment Status */}
                  {(selectedSubscription.status === 'payment_failed' || selectedSubscription.payment_retry_count) && (
                    <div className="md:col-span-2 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
                      <TextComponent weight="medium" className="text-yellow-800 dark:text-yellow-200">Payment Issue</TextComponent>
                      {selectedSubscription.last_payment_error && (
                        <TextComponent variant="body-sm" className="text-yellow-700 dark:text-yellow-300">{selectedSubscription.last_payment_error}</TextComponent>
                      )}
                      {selectedSubscription.payment_retry_count !== undefined && selectedSubscription.payment_retry_count > 0 && (
                        <TextComponent variant="body-sm" className="text-yellow-700 dark:text-yellow-300">
                          Retry attempt: {selectedSubscription.payment_retry_count} of 3
                        </TextComponent>
                      )}
                      {selectedSubscription.next_retry_date && (
                        <TextComponent variant="body-sm" className="text-yellow-700 dark:text-yellow-300">
                          Next retry: {new Date(selectedSubscription.next_retry_date).toLocaleDateString()}
                        </TextComponent>
                      )}
                    </div>
                  )}
                  
                  <div className="md:col-span-2">
                    <TextComponent weight="medium" tone={currentTheme === 'dark' ? 'secondary' : 'default'}>Delivery Address</TextComponent>
                    {selectedSubscription.delivery_address ? (
                      <TextComponent variant="body-sm">
                        {selectedSubscription.delivery_address.street}, {selectedSubscription.delivery_address.city}, {selectedSubscription.delivery_address.state} {selectedSubscription.delivery_address.postal_code}, {selectedSubscription.delivery_address.country}
                      </TextComponent>
                    ) : (
                      <TextComponent variant="caption" tone="secondary">No delivery address</TextComponent>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <TextComponent weight="medium" tone={currentTheme === 'dark' ? 'secondary' : 'default'}>Variants</TextComponent>
                    {selectedSubscription.variants && selectedSubscription.variants.length > 0 ? (
                      <div className="mt-2 overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr>
                              <th className="text-left py-1"><TextComponent variant="caption" weight="medium">Name</TextComponent></th>
                              <th className="text-left py-1"><TextComponent variant="caption" weight="medium">SKU</TextComponent></th>
                              <th className="text-right py-1"><TextComponent variant="caption" weight="medium">Price</TextComponent></th>
                              <th className="text-right py-1"><TextComponent variant="caption" weight="medium">Qty</TextComponent></th>
                            </tr>
                          </thead>
                          <tbody>
                            {selectedSubscription.variants.map((variant) => (
                              <tr key={variant.id} className={`${currentTheme === 'dark' ? 'border-gray-700' : 'border-gray-200'} border-t`}>
                                <td className="py-2 pr-2">
                                  <TextComponent variant="body-sm" truncate="single">{variant.name}</TextComponent>
                                </td>
                                <td className={`py-2 pr-2`}>
                                  <TextComponent variant="body-sm" tone="secondary">{variant.sku}</TextComponent>
                                </td>
                                <td className="py-2 text-right">
                                  <TextComponent variant="body-sm">{formatCurrency(variant.current_price ?? variant.base_price, selectedSubscription.currency)}</TextComponent>
                                </td>
                                <td className="py-2 text-right">
                                  <TextComponent variant="body-sm">{variant.qty}</TextComponent>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <TextComponent variant="caption" tone="secondary">No variants found</TextComponent>
                    )}
                  </div>
                  
                  {/* Metadata */}
                  {selectedSubscription.subscription_metadata && (
                    <div className="md:col-span-2">
                      <TextComponent weight="medium" tone={currentTheme === 'dark' ? 'secondary' : 'default'}>Subscription History</TextComponent>
                      {selectedSubscription.subscription_metadata.orders_created_count !== undefined && (
                        <TextComponent variant="body-sm">Orders Created: {selectedSubscription.subscription_metadata.orders_created_count}</TextComponent>
                      )}
                      {selectedSubscription.subscription_metadata.last_order_created && (
                        <TextComponent variant="body-sm">Last Order: {new Date(selectedSubscription.subscription_metadata.last_order_created).toLocaleDateString()}</TextComponent>
                      )}
                    </div>
                  )}
                </div>
              </ModalBody>
            </>
          )}
        </Modal>
    </div>
  );
};

export default AdminSubscriptions;
