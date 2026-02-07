import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader, AlertCircle, PlusIcon, EditIcon, TrashIcon, ChevronLeft, ChevronRight, SearchIcon, DownloadIcon, ArrowUpDownIcon, EyeIcon, ShoppingCartIcon, TrendingUpIcon, PackageIcon, CalendarIcon, UserIcon, CreditCardIcon } from 'lucide-react';
import AdminAPI from '@/api/admin';
import toast from 'react-hot-toast';
import { useTheme } from '@/components/shared/contexts/ThemeContext';
import { useLocale } from '@/components/shared/contexts/LocaleContext';
import Dropdown from '@/components/ui/Dropdown';

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

export const Orders = () => {
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
    }, 300); // 300ms delay

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Reset to page 1 when filters change
  const resetPage = useCallback(() => {
    setPage(1);
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (page === 1 && !searchQuery && !statusFilter && !paymentStatusFilter) {
          setInitialLoading(true);
        } else {
          setLoading(true);
        }
        setError(null);
        console.log('Fetching orders with params:', {
          page,
          limit: LIMIT,
          search: debouncedSearchQuery || undefined,
          status: statusFilter || undefined,
          payment_status: paymentStatusFilter || undefined,
          sort_by: sortBy,
          sort_order: sortOrder
        });
        
        // For now, we'll use the existing API and handle pagination on frontend
        const response = await AdminAPI.getOrders({
          page,
          limit: LIMIT,
          search: debouncedSearchQuery || undefined,
          status: statusFilter || undefined,
          payment_status: paymentStatusFilter || undefined,
          sort_by: sortBy,
          sort_order: sortOrder
        });
        
        // Handle response format
        const data = response?.data?.data || response?.data;
        const allOrders = Array.isArray(data) ? data : data?.items || [];
        
        // Apply client-side filtering and sorting if needed
        let filteredOrders = allOrders;
        
        // Apply search filter
        if (debouncedSearchQuery) {
          filteredOrders = filteredOrders.filter((order: any) =>
            order.order_number.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
            order.user_email?.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
            order.user_name?.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
            order.status?.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
            order.payment_status?.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
          );
        }
        
        // Apply status filter
        if (statusFilter) {
          filteredOrders = filteredOrders.filter((order: any) => order.status === statusFilter);
        }
        
        // Apply payment status filter
        if (paymentStatusFilter) {
          filteredOrders = filteredOrders.filter((order: any) => order.payment_status === paymentStatusFilter);
        }
        
        // Apply sorting
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
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}>
        {config.label}
      </span>
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
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  const handleDownloadCSV = () => {
    try {
      // Get all orders without pagination for CSV
      const allOrders = orders.map((order: any) => ({
        'Order ID': order.id || 'N/A',
        'Order Number': order.order_number || 'N/A',
        'Customer Email': order.user_email || 'N/A',
        'Customer Name': order.user_name || 'N/A',
        'Total Amount': formatCurrency(order.total_amount),
        'Items': order.items_count || 0,
        'Status': order.status || 'N/A',
        'Payment Status': order.payment_status || 'N/A',
        'Created At': new Date(order.created_at || '').toLocaleDateString(),
        'Shipped At': order.shipped_at ? new Date(order.shipped_at).toLocaleDateString() : 'Not Shipped',
        'Delivered At': order.delivered_at ? new Date(order.delivered_at).toLocaleDateString() : 'Not Delivered'
      }));

      // Create CSV content
      const headers = Object.keys(allOrders[0] || {});
      const csvContent = [
        headers.join(','),
        ...allOrders.map((item: any) => {
          return headers.map(header => {
            const value = item[header];
            return typeof value === 'string' && value.includes(',') 
              ? `"${value}"` 
              : value;
          }).join(',');
        })
      ].join('\n');

      // Create and download CSV file
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `orders-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      toast.success('Orders downloaded successfully');
    } catch (error: any) {
      toast.error('Failed to download orders');
    }
  };

  const handleView = (order: Order) => {
    navigate(`/admin/orders/${order.id}`);
  };

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
          <p className={`text-sm ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-3 ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-1">
        <div>
          <h1 className="text-xl lg:text-2xl font-semibold">Orders Management</h1>
          <p className={`mt-1 text-xs lg:text-sm ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Manage customer orders and fulfillment</p>
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
              value={sortBy}
              onChange={setSortBy}
              placeholder="Sort by"
              className="min-w-[120px]"
            />
            
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className={`inline-flex items-center gap-1 px-2 py-1.5 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-sm font-medium ${
                currentTheme === 'dark' 
                  ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-700' 
                  : 'bg-white border-gray-300 text-gray-900 hover:bg-gray-50'
              }`}
            >
              <ArrowUpDownIcon size={16} />
              <span className="hidden sm:inline">{sortOrder === 'asc' ? 'A-Z' : 'Z-A'}</span>
              <span className="sm:hidden">{sortOrder === 'asc' ? '↑' : '↓'}</span>
            </button>
          </div>

          {/* Active Filters */}
          {(debouncedSearchQuery || statusFilter || paymentStatusFilter) && (
            <div className="flex items-center gap-2 pt-2 border-t border-gray-200 dark:border-gray-600">
              <span className="text-sm text-gray-600 dark:text-gray-400">Active filters:</span>
              {debouncedSearchQuery && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                  Search: "{debouncedSearchQuery}"
                  <button
                    onClick={() => setSearchQuery('')}
                    className="ml-1 hover:text-primary-dark"
                  >
                    ×
                  </button>
                </span>
              )}
              {statusFilter && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                  Status: {statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}
                  <button
                    onClick={() => setStatusFilter('')}
                    className="ml-1 hover:text-primary-dark"
                  >
                    ×
                  </button>
                </span>
              )}
              {paymentStatusFilter && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                  Payment: {paymentStatusFilter.replace('_', ' ').charAt(0).toUpperCase() + paymentStatusFilter.slice(1).replace('_', ' ')}
                  <button
                    onClick={() => setPaymentStatusFilter('')}
                    className="ml-1 hover:text-primary-dark"
                  >
                    ×
                  </button>
                </span>
              )}
              <button
                onClick={() => {
                  setSearchQuery('');
                  setStatusFilter('');
                  setPaymentStatusFilter('');
                }}
                className="text-xs text-primary hover:text-primary-dark underline"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className={`p-4 rounded-lg border flex items-start gap-3 ${
          currentTheme === 'dark' 
            ? 'bg-error/10 border-error/30 text-error' 
            : 'bg-error/10 border-error/30 text-error'
        }`}>
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-semibold">Error Loading Orders</p>
            <p className="text-sm mt-1">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className={`mt-2 text-sm underline hover:no-underline ${
                currentTheme === 'dark' ? 'text-error hover:text-error-light' : 'text-error hover:text-error-dark'
              }`}
            >
              Try again
            </button>
          </div>
        </div>
      )}

      <div className={`rounded-lg border overflow-hidden ${currentTheme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        
        {loading && !initialLoading ? (
          <div className="p-8">
            <div className="flex items-center justify-center">
              <Loader className="w-8 h-8 text-primary animate-spin mr-3" />
              <span className={`text-sm ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Updating orders...</span>
            </div>
          </div>
        ) : orders.length > 0 ? (
          <>
            {/* Desktop table */}
            <div className="overflow-x-auto hidden md:block">
              <table className="w-full">
                <thead className={`${currentTheme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} border-b border-gray-200`}>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 dark:text-white">Order #</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 dark:text-white">Customer</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-900 dark:text-white">Total</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 dark:text-white">Status</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-900 dark:text-white">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order: any) => (
                    <tr key={order.id} className={`border-b border-gray-200 transition-colors ${currentTheme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">{order.order_number || order.id?.substring(0, 8)}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{order.user_name || order.user_email || 'N/A'}</td>
                      <td className="px-4 py-3 text-sm font-semibold text-right text-gray-900 dark:text-white">{formatCurrency(order.total_amount)}</td>
                      <td className="px-4 py-3 text-sm">
                        {statusBadge(order.status)}
                      </td>
                      <td className="px-4 py-3 text-sm text-center">
                        <button 
                          onClick={() => handleView(order)}
                          className="inline-flex items-center gap-1 px-2 py-1.5 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
                        >
                          <EyeIcon size={14} />
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden divide-y divide-gray-200">
              {orders.map((order: any) => (
                <div
                  key={order.id}
                  className={`p-4 flex flex-col gap-2 bg-white dark:bg-gray-800 transition-colors ${currentTheme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900 dark:text-white">{order.order_number || order.id?.substring(0, 8)}</span>
                    {statusBadge(order.status)}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">{order.user_name || order.user_email || 'N/A'}</div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">{formatCurrency(order.total_amount)}</span>
                    {paymentStatusBadge(order.payment_status)}
                  </div>
                  <button 
                    onClick={() => handleView(order)}
                    className="mt-2 inline-flex items-center gap-1 px-3 py-1.5 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors text-sm w-fit"
                  >
                    <EyeIcon size={14} />
                    View Details
                  </button>
                </div>
              ))}
            </div>


          </>
        ) : (
          <div className="p-8 text-center">
            <PackageIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className={`text-sm ${currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>No orders found</p>
          </div>
        )}
        
        {/* Always show pagination */}
        <div className={`px-6 py-4 border-t ${currentTheme === 'dark' ? 'border-gray-700' : 'border-gray-200'} flex flex-col sm:flex-row items-center justify-between gap-4`}>
          <p className={`text-sm ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            {pagination.total > 0
              ? `Showing ${(pagination.page - 1) * pagination.limit + 1}–${Math.min(pagination.page * pagination.limit, pagination.total)} of ${pagination.total} items`
              : `Total: ${pagination.total} items`
            }
            {pagination.total > 0 && pagination.pages > 1 && ` (Page ${pagination.page} of ${pagination.pages || 1})`}
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className={`inline-flex items-center gap-1 px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${
                currentTheme === 'dark' 
                  ? 'border-gray-600 bg-gray-800 text-white hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed' 
                  : 'border-gray-300 bg-white text-gray-900 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>
            
            {/* Page numbers */}
            <div className="flex items-center gap-1 mx-2">
              {Array.from({ length: Math.min(5, Math.max(1, pagination.pages || 1)) }, (_, i) => {
                let pageNum;
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
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`w-8 h-8 rounded-md text-sm font-medium transition-colors ${
                      pageNum === page
                        ? 'bg-primary text-white'
                        : currentTheme === 'dark'
                          ? 'text-gray-300 hover:bg-gray-700 border border-gray-600'
                          : 'text-gray-700 hover:bg-gray-50 border border-gray-300'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            
            <button
              onClick={() => setPage((p) => Math.min(pagination.pages || 1, p + 1))}
              disabled={page >= (pagination.pages || 1)}
              className={`inline-flex items-center gap-1 px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${
                currentTheme === 'dark' 
                  ? 'border-gray-600 bg-gray-800 text-white hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed' 
                  : 'border-gray-300 bg-white text-gray-900 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
              }`}
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
