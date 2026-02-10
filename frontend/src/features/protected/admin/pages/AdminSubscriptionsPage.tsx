import { useEffect, useState, useCallback } from 'react';
import { Loader, AlertCircle, PlusIcon, EditIcon, TrashIcon, Calendar, DollarSign, User, Package, SearchIcon, DownloadIcon, ArrowUpDownIcon, EyeIcon, CreditCardIcon } from 'lucide-react';
import { Dropdown } from '@/components/ui/Dropdown';
import { DateTimeDropdown } from '@/components/ui/DateTimeDropdown';
import AdminAPI from '@/api/admin';
import toast from 'react-hot-toast';
import { useTheme } from '@/components/shared/contexts/ThemeContext';
import AdminLayout from '@/../components/layout/AdminLayout';
import { SubscriptionsListSkeleton } from '@/components/skeletons/SubscriptionsSkeleton';
import { Button } from '@/components/ui/Button';
import { Heading, Body, Text, Label } from '@/components/ui/Text/Text';
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
  const detailsModal = useModal();
  const [selectedSubscription, setSelectedSubscription] = useState<Subscription | null>(null);
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const handleViewSubscription = (subscription: Subscription) => {
    setSelectedSubscription(subscription);
    detailsModal.open();
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
          <Text className="text-sm text-gray-900 dark:text-white">{row.user?.name || 'N/A'}</Text>
          <Text className="text-xs text-gray-500 dark:text-gray-400">{row.user?.email || 'N/A'}</Text>
        </div>
      ),
    },
    {
      key: 'subscription_plan',
      label: 'Plan',
      sortable: true,
      render: (value: any, row: Subscription) => (
        <Text className="text-sm text-gray-900 dark:text-white">{value?.name || 'N/A'}</Text>
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
        <Text className="text-sm font-semibold text-gray-900 dark:text-white">
          {formatCurrency(value, row.currency)}
        </Text>
      ),
    },
    {
      key: 'next_billing_date',
      label: 'Next Billing',
      sortable: true,
      render: (value: string) => (
        <Text className="text-sm text-gray-900 dark:text-white">
          {value ? new Date(value).toLocaleDateString() : 'N/A'}
        </Text>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_: any, row: Subscription) => (
        <Button
          onClick={() => handleViewSubscription(row)}
          variant="ghost"
          size="sm"
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
        { value: 'expired', label: 'Expired Only' },
        { value: 'pending', label: 'Pending Only' }
      ],
      placeholder: 'All Status',
    },
  ];

  const statusBadge = (status: string) => {
    const config = {
      active: { color: 'bg-success/20 text-success', label: 'Active' },
      paused: { color: 'bg-warning/20 text-warning', label: 'Paused' },
      cancelled: { color: 'bg-error/20 text-error', label: 'Cancelled' },
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
    return (
      <AdminLayout>
        <SubscriptionsListSkeleton />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className={`space-y-3 ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
        <div className="flex items-center justify-between">
          <div>
            <Text variant="body-sm" tone={currentTheme === 'dark' ? 'secondary' : 'default'}>Manage all customer subscriptions</Text>
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
                  <Heading level={3} className="text-lg font-semibold">Subscription Details</Heading>
                  <Body className={`text-sm ${currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    {selectedSubscription.subscription_plan?.name || 'Subscription'}
                  </Body>
                </div>
              </ModalHeader>

              <ModalBody>
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
              </ModalBody>
            </>
          )}
        </Modal>
      </div>
    </AdminLayout>
  );
};

export default AdminSubscriptions;
