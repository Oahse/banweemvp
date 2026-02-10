import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader, AlertCircle, SearchIcon, ArrowUpDownIcon, EyeIcon, PackageIcon } from 'lucide-react';
import AdminAPI from '@/api/admin';
import AdminLayout from '@/components/layout/AdminLayout';
import { OrdersListSkeleton } from '@/components/skeletons/OrdersSkeleton';
import toast from 'react-hot-toast';
import { useTheme } from '@/components/shared/contexts/ThemeContext';
import { useLocale } from '@/components/shared/contexts/LocaleContext';
import Dropdown from '@/components/ui/Dropdown';
import { Button } from '@/components/ui/Button';
import { Heading, Body, Text } from '@/components/ui/Text/Text';
import { AdminDataTable, AdminColumn, FilterConfig } from '@/components/shared/AdminDataTable';
import { Card } from '@/components/ui/Card';

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

  useEffect(() => {
    fetchData({
      page: 1,
      limit: LIMIT,
      search: '',
      sort_by: 'created_at',
      sort_order: 'desc'
    });
  }, []);

  const fetchData = async (params: any) => {
    try {
      setLoading(true);
      setError(null);
      const response = await AdminAPI.getOrders({
        page: params.page,
        limit: params.limit,
        search: params.search,
        status: params.filters?.status || undefined,
        payment_status: params.filters?.payment_status || undefined,
        sort_by: params.sort_by,
        sort_order: params.sort_order
      });
      const data = response?.data?.data || response?.data;
      const allOrders = Array.isArray(data) ? data : data?.items || [];
      let filteredOrders = allOrders;
      if (params.search) {
        filteredOrders = filteredOrders.filter((order: any) =>
          order.order_number.toLowerCase().includes(params.search.toLowerCase()) ||
          order.user_email?.toLowerCase().includes(params.search.toLowerCase()) ||
          order.user_name?.toLowerCase().includes(params.search.toLowerCase()) ||
          order.status?.toLowerCase().includes(params.search.toLowerCase()) ||
          order.payment_status?.toLowerCase().includes(params.search.toLowerCase())
        );
      }
      if (params.filters?.status) {
        filteredOrders = filteredOrders.filter((order: any) => order.status === params.filters.status);
      }
      if (params.filters?.payment_status) {
        filteredOrders = filteredOrders.filter((order: any) => order.payment_status === params.filters.payment_status);
      }
      if (params.sort_by === 'created_at') {
        filteredOrders.sort((a: any, b: any) => {
          const aDate = new Date(a.created_at || 0);
          const bDate = new Date(b.created_at || 0);
          return params.sort_order === 'asc' 
            ? aDate.getTime() - bDate.getTime()
            : bDate.getTime() - aDate.getTime();
        });
      } else if (params.sort_by === 'total_amount') {
        filteredOrders.sort((a: any, b: any) => {
          return params.sort_order === 'asc' 
            ? a.total_amount - b.total_amount
            : b.total_amount - a.total_amount;
        });
      } else if (params.sort_by === 'order_number') {
        filteredOrders.sort((a: any, b: any) => {
          const aOrder = (a.order_number || '').toLowerCase();
          const bOrder = (b.order_number || '').toLowerCase();
          return params.sort_order === 'asc' 
            ? aOrder.localeCompare(bOrder)
            : bOrder.localeCompare(aOrder);
        });
      } else if (params.sort_by === 'user_email') {
        filteredOrders.sort((a: any, b: any) => {
          const aEmail = (a.user_email || '').toLowerCase();
          const bEmail = (b.user_email || '').toLowerCase();
          return params.sort_order === 'asc' 
            ? aEmail.localeCompare(bEmail)
            : bEmail.localeCompare(aEmail);
        });
      }
      const total = filteredOrders.length;
      const pages = Math.max(1, Math.ceil(total / params.limit));
      const startIndex = (params.page - 1) * params.limit;
      const endIndex = startIndex + params.limit;
      const paginatedOrders = filteredOrders.slice(startIndex, endIndex);
      setOrders(paginatedOrders);
      setPagination({
        page: params.page,
        limit: params.limit,
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

  // Define columns for AdminDataTable
  const columns: AdminColumn<Order>[] = [
    {
      key: 'order_number',
      label: 'Order #',
      sortable: true,
      render: (value: string, row: Order) => (
        <div>
          <Text className="text-sm font-medium text-primary">{value}</Text>
          <Text className="text-xs text-gray-500 dark:text-gray-400">{row.items_count || 0} items</Text>
        </div>
      ),
    },
    {
      key: 'user_name',
      label: 'Customer',
      sortable: true,
      render: (value: string, row: Order) => (
        <div>
          <Text className="text-sm text-gray-900 dark:text-white">{value || 'N/A'}</Text>
          <Text className="text-xs text-gray-500 dark:text-gray-400">{row.user_email}</Text>
        </div>
      ),
    },
    {
      key: 'created_at',
      label: 'Date',
      sortable: true,
      render: (value: string) => (
        <Text className="text-sm text-gray-900 dark:text-white">
          {new Date(value).toLocaleDateString()}
        </Text>
      ),
    },
    {
      key: 'total_amount',
      label: 'Total',
      sortable: true,
      render: (value: number) => (
        <Text className="text-sm font-semibold text-gray-900 dark:text-white text-right">
          {formatCurrency(value)}
        </Text>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (value: string) => statusBadge(value),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_: any, row: Order) => (
        <Button
          onClick={() => handleView(row)}
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
        { value: 'pending', label: 'Pending Only' },
        { value: 'processing', label: 'Processing Only' },
        { value: 'shipped', label: 'Shipped Only' },
        { value: 'delivered', label: 'Delivered Only' },
        { value: 'cancelled', label: 'Cancelled Only' },
        { value: 'returned', label: 'Returned Only' }
      ],
      placeholder: 'All Status',
    },
    {
      key: 'payment_status',
      label: 'Payment Status',
      type: 'select',
      options: [
        { value: '', label: 'All Payment Status' },
        { value: 'pending', label: 'Pending' },
        { value: 'paid', label: 'Paid' },
        { value: 'failed', label: 'Failed' },
        { value: 'refunded', label: 'Refunded' },
        { value: 'partially_refunded', label: 'Partially Refunded' }
      ],
      placeholder: 'All Payment Status',
    },
  ];

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
            <Heading level={1} className="text-2xl font-bold">Orders</Heading>
            <Body className={`mt-1 text-xs lg:text-sm ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Manage customer orders and fulfillment</Body>
          </div>
        </div>

        <AdminDataTable
          data={orders}
          loading={loading}
          error={error}
          pagination={pagination}
          columns={columns}
          fetchData={fetchData}
          searchPlaceholder="Search orders..."
          filters={filters}
          emptyMessage="No orders found"
          responsive="cards"
          limit={LIMIT}
          onRowClick={handleView}
        />
      </div>
    </AdminLayout>
  );
};

export default AdminOrdersPage;

