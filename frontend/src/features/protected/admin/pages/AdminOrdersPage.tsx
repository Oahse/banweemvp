import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader, AlertCircle, ChevronLeft, ChevronRight, SearchIcon, ArrowUpDownIcon, EyeIcon, PackageIcon } from 'lucide-react';
import AdminAPI from '@/api/admin';
import AdminLayout from '../components/AdminLayout';
import { OrdersListSkeleton } from '../components/skeletons/OrdersSkeleton';
import toast from 'react-hot-toast';
import { useTheme } from '@/components/shared/contexts/ThemeContext';
import { useLocale } from '@/components/shared/contexts/LocaleContext';
import Dropdown from '@/components/ui/Dropdown';
import { Button } from '@/components/ui/Button';
import { Heading, Body, Text } from '@/components/ui/Text/Text';

const LIMIT = 10;

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

interface Order {
  id: string;
  order_number: string;
  user_email: string;
  user_name?: string;
  total_amount: number;
  status: string;
  payment_status: string;
  created_at: string;
  shipped_at?: string;
  delivered_at?: string;
  items_count?: number;
  shipping_address?: {
    street: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
}

const AdminOrdersPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentTheme } = useTheme();
  const { formatCurrency } = useLocale();
  const [orders, setOrders] = useState<Order[]>([]);
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
  const [paymentStatusFilter, setPaymentStatusFilter] = useState('');
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (page === 1 && !searchQuery && !statusFilter && !paymentStatusFilter) {
          setInitialLoading(true);
        } else {
          setLoading(true);
        }
        setError(null);
        const response = await AdminAPI.getOrders({
          page,
          limit: LIMIT,
          search: debouncedSearchQuery || undefined,
          status: statusFilter || undefined,
          payment_status: paymentStatusFilter || undefined,
          sort_by: sortBy,
          sort_order: sortOrder
        });
        const data = response?.data?.data || response?.data;
        const allOrders = Array.isArray(data) ? data : data?.items || [];
        let filteredOrders = allOrders;
        if (debouncedSearchQuery) {
          filteredOrders = filteredOrders.filter((order: any) =>
            order.order_number.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
            order.user_email?.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
            order.user_name?.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
            order.status?.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
            order.payment_status?.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
          );
        }
        if (statusFilter) {
          filteredOrders = filteredOrders.filter((order: any) => order.status === statusFilter);
        }
        if (paymentStatusFilter) {
          filteredOrders = filteredOrders.filter((order: any) => order.payment_status === paymentStatusFilter);
        }
        if (sortBy === 'created_at') {
          filteredOrders.sort((a: any, b: any) => {
            const aDate = new Date(a.created_at || 0);
            const bDate = new Date(b.created_at || 0);
            return sortOrder === 'asc' 
              ? aDate.getTime() - bDate.getTime()
              : bDate.getTime() - aDate.getTime();
          });
        } else if (sortBy === 'total_amount') {
          filteredOrders.sort((a: any, b: any) => {
            return sortOrder === 'asc' 
              ? a.total_amount - b.total_amount
              : b.total_amount - a.total_amount;
          });
        } else if (sortBy === 'order_number') {
          filteredOrders.sort((a: any, b: any) => {
            const aOrder = (a.order_number || '').toLowerCase();
            const bOrder = (b.order_number || '').toLowerCase();
            return sortOrder === 'asc' 
              ? aOrder.localeCompare(bOrder)
              : bOrder.localeCompare(aOrder);
          });
        } else if (sortBy === 'user_email') {
          filteredOrders.sort((a: any, b: any) => {
            const aEmail = (a.user_email || '').toLowerCase();
            const bEmail = (b.user_email || '').toLowerCase();
            return sortOrder === 'asc' 
              ? aEmail.localeCompare(bEmail)
              : bEmail.localeCompare(aEmail);
          });
        }
        const total = filteredOrders.length;
        const pages = Math.max(1, Math.ceil(total / LIMIT));
        const startIndex = (page - 1) * LIMIT;
        const endIndex = startIndex + LIMIT;
        const paginatedOrders = filteredOrders.slice(startIndex, endIndex);
        setOrders(paginatedOrders);
        setPagination({
          page: page,
          limit: LIMIT,
          total: total,
          pages: pages
        });
      } catch (err: any) {
        const message = err?.response?.data?.message || 'Failed to load orders';
        setError(message);
        toast.error(message);
      } finally {
        setLoading(false);
        setInitialLoading(false);
      }
    };
    fetchOrders();
  }, [page, debouncedSearchQuery, statusFilter, paymentStatusFilter, sortBy, sortOrder]);

  const statusBadge = (status: string) => {
    const statusConfig = {
      pending: { bg: 'bg-warning/20', text: 'text-warning', label: 'Pending' },
      processing: { bg: 'bg-blue-500/20', text: 'text-blue-500', label: 'Processing' },
      shipped: { bg: 'bg-purple-500/20', text: 'text-purple-500', label: 'Shipped' },
      delivered: { bg: 'bg-success/20', text: 'text-success', label: 'Delivered' },
      cancelled: { bg: 'bg-error/20', text: 'text-error', label: 'Cancelled' },
      returned: { bg: 'bg-orange-500/20', text: 'text-orange-500', label: 'Returned' }
    };
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return (
      <Text className={`px-2 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}>
        {config.label}
      </Text>
    );
  };

  const paymentStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { bg: 'bg-gray-500/20', text: 'text-gray-500', label: 'Pending' },
      paid: { bg: 'bg-success/20', text: 'text-success', label: 'Paid' },
      failed: { bg: 'bg-error/20', text: 'text-error', label: 'Failed' },
      refunded: { bg: 'bg-orange-500/20', text: 'text-orange-500', label: 'Refunded' },
      partially_refunded: { bg: 'bg-yellow-500/20', text: 'text-yellow-500', label: 'Partially Refunded' }
    };
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return (
      <Text className={`px-2 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}>
        {config.label}
      </Text>
    );
  };

  const handleView = (order: Order) => {
    navigate(`/admin/orders/${order.id}`);
  };

  // Show full page skeleton on initial load
  if (initialLoading) {
    return (
      <AdminLayout>
        <OrdersListSkeleton />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className={`space-y-3 ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-1">
          <div>
            <Body className={`mt-1 text-xs lg:text-sm ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Manage customer orders and fulfillment</Body>
          </div>
        </div>
        {/* Search and Filters */}
        <div className={`p-4 rounded-lg border ${currentTheme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="flex flex-col gap-4">
            <div className="flex-1">
              <div className="relative">
                <SearchIcon className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${currentTheme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} size={18} />
                <input
                  type="text"
                  placeholder="Search orders..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-10 pr-10 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-sm ${
                    currentTheme === 'dark' 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
                {searchQuery !== debouncedSearchQuery && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Dropdown
                options={[
                  { value: '', label: 'All Status' },
                  { value: 'pending', label: 'Pending Only' },
                  { value: 'processing', label: 'Processing Only' },
                  { value: 'shipped', label: 'Shipped Only' },
                  { value: 'delivered', label: 'Delivered Only' },
                  { value: 'cancelled', label: 'Cancelled Only' },
                  { value: 'returned', label: 'Returned Only' }
                ]}
                value={statusFilter}
                onChange={setStatusFilter}
                placeholder="All Status"
                className="min-w-[120px]"
              />
              <Dropdown
                options={[
                  { value: '', label: 'All Payment Status' },
                  { value: 'pending', label: 'Pending' },
                  { value: 'paid', label: 'Paid' },
                  { value: 'failed', label: 'Failed' },
                  { value: 'refunded', label: 'Refunded' },
                  { value: 'partially_refunded', label: 'Partially Refunded' }
                ]}
                value={paymentStatusFilter}
                onChange={setPaymentStatusFilter}
                placeholder="All Payment Status"
                className="min-w-[120px]"
              />
              <Dropdown
                options={[
                  { value: 'created_at', label: 'Created' },
                  { value: 'total_amount', label: 'Total Amount' },
                  { value: 'order_number', label: 'Order Number' },
                  { value: 'user_email', label: 'Customer Email' }
                ]}
            {/* Active Filters */}
            {(debouncedSearchQuery || statusFilter || paymentStatusFilter) && (
              <div className="flex items-center gap-2 pt-2 border-t border-gray-200 dark:border-gray-600">
                <Text className="text-sm text-gray-600 dark:text-gray-400">Active filters:</Text>
                {debouncedSearchQuery && (
                  <Text className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                    Search: "{debouncedSearchQuery}"
                    <Button
                      onClick={() => setSearchQuery('')}
                      variant="ghost"
                      size="sm"
                    >
                      ×
                    </Button>
                  </Text>
                )}
                {statusFilter && (
                  <Text className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                    Status: {statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}
                    <Button
                      onClick={() => setStatusFilter('')}
                      variant="ghost"
                      size="sm"
                    >
                      ×
                    </Button>
                  </Text>
                )}
                {paymentStatusFilter && (
                  <Text className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                    Payment: {paymentStatusFilter.replace('_', ' ').charAt(0).toUpperCase() + paymentStatusFilter.slice(1).replace('_', ' ')}
                    <Button
                      onClick={() => setPaymentStatusFilter('')}
                      variant="ghost"
                      size="sm"
                    >
                      ×
                    </Button>
                  </Text>
                )}
                <Button
                  onClick={() => {
                    setSearchQuery('');
                    setStatusFilter('');
                    setPaymentStatusFilter('');
                  }}
                  variant="ghost"
                  size="sm"
                >
                  Clear all
                </Button>
              </div>
            )}

// ... (rest of the code remains the same)

          {error && (
            <div className={`p-4 rounded-lg border flex items-start gap-3 ${
              currentTheme === 'dark' 
                ? 'bg-error/10 border-error/30 text-error' 
                : 'bg-error/10 border-error/30 text-error'
            }`}>
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <Body className="font-semibold">Error Loading Orders</Body>
                <Body className="text-sm mt-1">{error}</Body>
                <Button
                  onClick={() => window.location.reload()}
                  variant="ghost"
                  size="sm"
                >
                  Try Again
                </Button>
              </div>
            </div>
          )}

// ... (rest of the code remains the same)

                        <td className="px-4 py-3 text-sm font-semibold text-right text-gray-900 dark:text-white">{formatCurrency(order.total_amount)}</td>
                        <td className="px-4 py-3 text-sm">
                          {statusBadge(order.status)}
                        </td>
                        <td className="px-4 py-3 text-sm text-center">
                          <Button
                            onClick={() => handleView(order)}
                            variant="primary"
                            size="sm"
                            className="inline-flex items-center gap-1 px-2 py-1.5 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
                          >
                            View
                          </Button>
                        </td>

// ... (rest of the code remains the same)

            <div className="flex items-center gap-1">
              <Button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                variant="outline"
                size="sm"
              >
                Previous
              </Button>
              {/* Page numbers */}
              <div className="flex items-center gap-1 mx-2">
                {Array.from({ length: Math.min(5, Math.max(1, pagination.pages || 1)) }, (_, i) => {
                  let pageNum: number;
                  if (pagination.pages <= 5) {
                    pageNum = i + 1;
                  } else if (page <= 3) {
                    pageNum = i + 1;
                  } else if (page >= pagination.pages - 2) {
                    pageNum = pagination.pages - 4 + i;
                  } else {
                    pageNum = page - 2 + i;
                  }
                  return (
                    <Button
                      key={pageNum}
                      onClick={() => setPage(pageNum)}
                      variant={page === pageNum ? 'primary' : 'ghost'}
                      size="sm"
                      className={`w-8 h-8 rounded-md text-sm font-medium transition-colors ${
                        page === pageNum ? 'bg-primary text-white' : 'border border-gray-300 bg-white text-gray-700'
                      }`}
                    >
                      {pageNum}
                    </Button>
                  );
                })}
              </div>
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
      </div>
    </AdminLayout>
  );
};

export default AdminOrdersPage;
