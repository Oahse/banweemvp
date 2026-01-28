import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { 
  ShoppingBagIcon, 
  TruckIcon, 
  CheckCircleIcon,
  ClockIcon,
  SearchIcon,
  EyeIcon,
  PrinterIcon,
  MailIcon
} from 'lucide-react';
import { useAsync } from '../../hooks/useAsync';
import { stockMonitor } from '../../utils/stock';

interface OrderItem {
  id: string;
  variant_id: string;
  product_name: string;
  variant_name: string;
  quantity: number;
  price_per_unit: number;
  total_price: number;
  sku: string;
  images?: Array<{
    url: string;
    alt_text?: string;
    is_primary?: boolean;
  }>;
}

interface Order {
  id: string;
  order_number: string;
  customer_id: string;
  customer_name: string;
  customer_email: string;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
  total_amount: number;
  shipping_address: {
    street: string;
    city: string;
    state: string;
    zip_code: string;
    country: string;
  };
  items: OrderItem[];
  created_at: string;
  updated_at: string;
  estimated_delivery?: string;
  tracking_number?: string;
  notes?: string;
}

export const OrderManager: React.FC = () => {
  // ✅ Using useState for all local state management
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showOrderModal, setShowOrderModal] = useState<boolean>(false);
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [paymentStatusFilter, setPaymentStatusFilter] = useState<string>('all');
  const [dateRange, setDateRange] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  
  // UI states
  const [isUpdatingStatus, setIsUpdatingStatus] = useState<boolean>(false);
  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);

  const { loading, error, execute: fetchData } = useAsync();

  // Mock API call for orders
  const fetchOrders = useCallback(async () => {
    // Mock orders data
    const mockOrders: Order[] = [
      {
        id: '1',
        order_number: 'ORD-2024-001',
        customer_id: 'cust_1',
        customer_name: 'John Doe',
        customer_email: 'john@example.com',
        status: 'processing',
        payment_status: 'paid',
        total_amount: 89.99,
        shipping_address: {
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          zip_code: '10001',
          country: 'USA'
        },
        items: [
          {
            id: 'item_1',
            variant_id: 'var_1',
            product_name: 'Organic Coffee Beans',
            variant_name: '1kg Bag',
            quantity: 2,
            price_per_unit: 34.99,
            total_price: 69.98,
            sku: 'OCB-1KG-001',
            images: [
              {
                url: '/images/coffee-beans-1kg.jpg',
                alt_text: 'Organic Coffee Beans 1kg',
                is_primary: true
              }
            ]
          },
          {
            id: 'item_2',
            variant_id: 'var_3',
            product_name: 'Premium Tea Leaves',
            variant_name: 'Earl Grey 100g',
            quantity: 1,
            price_per_unit: 20.01,
            total_price: 20.01,
            sku: 'PTL-EG-100G',
            images: [
              {
                url: '/images/earl-grey-tea.jpg',
                alt_text: 'Earl Grey Tea 100g',
                is_primary: true
              }
            ]
          }
        ],
        created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date().toISOString(),
        estimated_delivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
        tracking_number: 'TRK123456789',
        notes: 'Customer requested expedited shipping'
      },
      {
        id: '2',
        order_number: 'ORD-2024-002',
        customer_id: 'cust_2',
        customer_name: 'Jane Smith',
        customer_email: 'jane@example.com',
        status: 'pending',
        payment_status: 'pending',
        total_amount: 45.50,
        shipping_address: {
          street: '456 Oak Ave',
          city: 'Los Angeles',
          state: 'CA',
          zip_code: '90210',
          country: 'USA'
        },
        items: [
          {
            id: 'item_3',
            variant_id: 'var_2',
            product_name: 'Organic Coffee Beans',
            variant_name: '500g Bag',
            quantity: 1,
            price_per_unit: 25.50,
            total_price: 25.50,
            sku: 'OCB-500G-001',
            images: [
              {
                url: '/images/coffee-beans-500g.jpg',
                alt_text: 'Organic Coffee Beans 500g',
                is_primary: true
              }
            ]
          }
        ],
        created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date().toISOString(),
        notes: 'First-time customer'
      }
    ];

    return mockOrders;
  }, []);

  // Initialize data
  useEffect(() => {
    fetchData(async () => {
      const ordersData = await fetchOrders();
      setOrders(ordersData);
      return ordersData;
    });
  }, [fetchData, fetchOrders]);

  // Filter and sort orders
  useEffect(() => {
    let filtered = [...orders];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(order =>
        order.order_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customer_email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    // Apply payment status filter
    if (paymentStatusFilter !== 'all') {
      filtered = filtered.filter(order => order.payment_status === paymentStatusFilter);
    }

    // Apply date range filter
    if (dateRange !== 'all') {
      const now = new Date();
      const filterDate = new Date();
      
      switch (dateRange) {
        case 'today':
          filterDate.setHours(0, 0, 0, 0);
          break;
        case 'week':
          filterDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          filterDate.setMonth(now.getMonth() - 1);
          break;
      }
      
      if (dateRange !== 'all') {
        filtered = filtered.filter(order => new Date(order.created_at) >= filterDate);
      }
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: any = a[sortBy as keyof Order];
      let bValue: any = b[sortBy as keyof Order];

      if (sortBy === 'created_at' || sortBy === 'updated_at') {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      } else if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    setFilteredOrders(filtered);
  }, [orders, searchQuery, statusFilter, paymentStatusFilter, dateRange, sortBy, sortOrder]);

  // Handle status update
  const handleStatusUpdate = async (orderId: string, newStatus: Order['status']) => {
    setIsUpdatingStatus(true);
    setUpdatingOrderId(orderId);

    try {
      // Optimistic update
      const updatedOrders = orders.map(order =>
        order.id === orderId
          ? { ...order, status: newStatus, updated_at: new Date().toISOString() }
          : order
      );
      setOrders(updatedOrders);

      // Check if order items need stock updates
      const order = orders.find(o => o.id === orderId);
      if (order && newStatus === 'cancelled') {
        // Return stock to inventory when order is cancelled
        order.items.forEach(item => {
          // In a real app, you'd call an API to update stock
          console.log(`Returning ${item.quantity} units of ${item.sku} to stock`);
        });
      }

      toast.success(`Order ${order?.order_number} status updated to ${newStatus}`);
    } catch (error: any) {
      toast.error(error.message || 'Failed to update order status');
      // Revert optimistic update
      const revertedOrders = orders.map(order =>
        order.id === orderId
          ? { ...order, status: order.status }
          : order
      );
      setOrders(revertedOrders);
    } finally {
      setIsUpdatingStatus(false);
      setUpdatingOrderId(null);
    }
  };

  // Get status styling
  const getStatusStyle = (status: Order['status']) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      processing: 'bg-purple-100 text-purple-800',
      shipped: 'bg-indigo-100 text-indigo-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return styles[status];
  };

  // Get payment status styling
  const getPaymentStatusStyle = (status: Order['payment_status']) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800',
      paid: 'bg-green-100 text-green-800',
      failed: 'bg-red-100 text-red-800',
      refunded: 'bg-gray-100 text-gray-800'
    };
    return styles[status];
  };

  // Get primary image for order item
  const getItemImage = (item: OrderItem) => {
    if (!item.images || item.images.length === 0) {
      return '/placeholder-product.jpg';
    }
    const primaryImage = item.images.find(img => img.is_primary);
    return primaryImage?.url || item.images[0]?.url || '/placeholder-product.jpg';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="heading text-2xl mb-2">Order Management</h1>
            <p className="body-text text-gray-600">
              Track and manage customer orders, update statuses, and monitor fulfillment
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <ShoppingBagIcon className="text-blue-500" size={24} />
            <div>
              <p className="body-text text-sm text-gray-600">Total Orders</p>
              <p className="heading text-xl">{orders.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <ClockIcon className="text-yellow-500" size={24} />
            <div>
              <p className="body-text text-sm text-gray-600">Pending</p>
              <p className="heading text-xl">
                {orders.filter(o => o.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <TruckIcon className="text-purple-500" size={24} />
            <div>
              <p className="body-text text-sm text-gray-600">Processing</p>
              <p className="heading text-xl">
                {orders.filter(o => o.status === 'processing' || o.status === 'shipped').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <CheckCircleIcon className="text-green-500" size={24} />
            <div>
              <p className="body-text text-sm text-gray-600">Delivered</p>
              <p className="heading text-xl">
                {orders.filter(o => o.status === 'delivered').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Search */}
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>

          {/* Payment Status Filter */}
          <select
            value={paymentStatusFilter}
            onChange={(e) => setPaymentStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Payments</option>
            <option value="pending">Payment Pending</option>
            <option value="paid">Paid</option>
            <option value="failed">Failed</option>
            <option value="refunded">Refunded</option>
          </select>

          {/* Date Range Filter */}
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
          </select>

          {/* Sort */}
          <select
            value={`${sortBy}:${sortOrder}`}
            onChange={(e) => {
              const [field, order] = e.target.value.split(':');
              setSortBy(field);
              setSortOrder(order as 'asc' | 'desc');
            }}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
          >
            <option value="created_at:desc">Newest First</option>
            <option value="created_at:asc">Oldest First</option>
            <option value="total_amount:desc">Highest Value</option>
            <option value="total_amount:asc">Lowest Value</option>
            <option value="customer_name:asc">Customer A-Z</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="heading text-sm font-medium text-gray-900">
                        {order.order_number}
                      </div>
                      <div className="body-text text-sm text-gray-500">
                        {new Date(order.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="body-text text-sm font-medium text-gray-900">
                        {order.customer_name}
                      </div>
                      <div className="body-text text-sm text-gray-500">
                        {order.customer_email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex -space-x-2">
                      {order.items.slice(0, 3).map((item, index) => (
                        <img
                          key={item.id}
                          src={getItemImage(item)}
                          alt={`${item.product_name} ${item.variant_name}`}
                          className="w-8 h-8 rounded-full border-2 border-white object-cover"
                          title={`${item.product_name} ${item.variant_name} (${item.quantity}x)`}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/placeholder-product.jpg';
                          }}
                        />
                      ))}
                      {order.items.length > 3 && (
                        <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs text-gray-600">
                          +{order.items.length - 3}
                        </div>
                      )}
                    </div>
                    <div className="body-text text-xs text-gray-500 mt-1">
                      {order.items.reduce((sum, item) => sum + item.quantity, 0)} items
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="price text-sm font-medium text-gray-900">
                      ${order.total_amount.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusUpdate(order.id, e.target.value as Order['status'])}
                      disabled={isUpdatingStatus && updatingOrderId === order.id}
                      className={`text-xs font-semibold rounded-full px-2 py-1 border-0 ${getStatusStyle(order.status)} disabled:opacity-50`}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPaymentStatusStyle(order.payment_status)}`}>
                      {order.payment_status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedOrder(order);
                          setShowOrderModal(true);
                        }}
                        className="text-primary hover:text-primary-dark"
                        title="View details"
                      >
                        <EyeIcon size={16} />
                      </button>
                      <button
                        onClick={() => window.print()}
                        className="text-gray-600 hover:text-gray-800"
                        title="Print order"
                      >
                        <PrinterIcon size={16} />
                      </button>
                      <button
                        onClick={() => toast.success('Email sent to customer')}
                        className="text-blue-600 hover:text-blue-800"
                        title="Send email"
                      >
                        <MailIcon size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <ShoppingBagIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="heading text-lg text-gray-900 mt-2">No orders found</h3>
          <p className="body-text text-gray-500 mt-1">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      )}
    </div>
  );
};