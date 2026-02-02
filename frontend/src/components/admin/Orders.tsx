import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EyeIcon, ShoppingCartIcon, TrendingUpIcon } from 'lucide-react';
import AdminAPI from '../../api/admin';
import toast from 'react-hot-toast';
import { useTheme } from '../../store/ThemeContext';
import { useLocale } from '../../store/LocaleContext';
import { 
  PageLayout, 
  DataTable, 
  FilterBar 
} from './shared';
import { ORDER_STATUSES } from '../../config/product';

// Types
interface Order {
  id: string;
  order_number: string;
  user_email: string;
  total_amount: number;
  status: string;
  payment_status: string;
  created_at: string;
  shipped_at?: string;
  delivered_at?: string;
}

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export const Orders = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { formatCurrency } = useLocale();
  
  // State
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationInfo>({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<Record<string, string>>({});

  // Filter configuration
  const filterConfig = [
    {
      key: 'status',
      label: 'Status',
      type: 'select' as const,
      options: ORDER_STATUSES
    },
    {
      key: 'date_range',
      label: 'Date Range',
      type: 'daterange' as const
    }
  ];

  // Table columns
  const columns = [
    {
      key: 'order_number',
      label: 'Order #',
      render: (value: string) => (
        <span className="font-mono text-sm font-medium text-blue-600">
          #{value}
        </span>
      )
    },
    {
      key: 'user_email',
      label: 'Customer',
      render: (value: string) => (
        <span className="text-sm text-gray-900">{value}</span>
      )
    },
    {
      key: 'total_amount',
      label: 'Total',
      render: (value: number) => (
        <span className="text-sm font-medium text-gray-900">
          {formatCurrency(value)}
        </span>
      ),
      align: 'right' as const
    },
    {
      key: 'status',
      label: 'Status',
      render: (value: string) => {
        const statusColors = {
          pending: 'bg-orange text-orange-dark dark:bg-orange-dark dark:text-orange-light',
          confirmed: 'bg-info text-info-dark dark:bg-info-dark dark:text-info-light',
          shipped: 'bg-purple text-purple-dark dark:bg-purple-dark dark:text-purple-light',
          delivered: 'bg-success text-success-dark dark:bg-success-dark dark:text-success-light',
          cancelled: 'bg-error text-error-dark dark:bg-error-dark dark:text-error-light'
        };
        
        return (
          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
            statusColors[value as keyof typeof statusColors] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
          }`}>
            {value}
          </span>
        );
      }
    },
    {
      key: 'created_at',
      label: 'Created',
      render: (value: string) => (
        <span className="text-sm text-gray-500">
          {new Date(value).toLocaleDateString()}
        </span>
      )
    }
  ];

  // Fetch data function
  const fetchData = async (params: any) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await AdminAPI.getAllOrders({
        page: params.page,
        limit: params.limit,
        search: params.search,
        status: params.filters?.status,
        date_from: params.filters?.date_range?.split(',')[0],
        date_to: params.filters?.date_range?.split(',')[1],
        sort_by: params.sort_by,
        sort_order: params.sort_order
      });
      
      if (response?.success && response?.data) {
        const data = response.data;
        setOrders(data.data || []);
        setPagination({
          page: data.pagination?.page || params.page,
          limit: data.pagination?.limit || params.limit,
          total: data.pagination?.total || 0,
          pages: data.pagination?.pages || 0
        });
      } else {
        throw new Error('Failed to fetch orders');
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to load orders';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Action handlers
  const handleViewOrder = (order: Order) => {
    navigate(`/admin/orders/${order.id}`);
  };

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters };
    if (value) {
      newFilters[key] = value;
    } else {
      delete newFilters[key];
    }
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({});
    setSearchQuery('');
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  return (
    <PageLayout>
      <div className="space-y-6">
        {/* Filters */}
        <FilterBar
          filters={filterConfig}
          values={filters}
          onChange={handleFilterChange}
          onClear={handleClearFilters}
          searchValue={searchQuery}
          onSearchChange={handleSearchChange}
          searchPlaceholder="Search orders..."
        />

        {/* Orders Table */}
        <DataTable
          data={orders}
          loading={loading}
          error={error}
          pagination={pagination}
          columns={columns}
          fetchData={fetchData}
          onView={handleViewOrder}
          searchable={false} // Search is handled by AdminFilterBar
          filterable={false} // Filters are handled by AdminFilterBar
          emptyMessage="No orders found"
        />
      </div>
    </PageLayout>
  );
};

export default Orders;
