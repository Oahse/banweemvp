import { OrderItemDetails } from './OrderItemDetails';
import { useState, useEffect } from 'react';
import { ChevronDownIcon, ChevronUpIcon, EyeIcon, DownloadIcon, ShoppingBagIcon, TruckIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SkeletonOrderTable } from '../ui/SkeletonTable';
import { usePaginatedApi } from '@/components/shared/hooks/useAsync';
import OrdersAPI from '@/api/orders';
import { toast } from 'react-hot-toast';
import { useLocale } from '@/components/shared/contexts/LocaleContext';
import { unwrapResponse, extractErrorMessage } from '../../utils/api-response';

interface Order {
  id: string;
  created_at: string;
  status: string;
  total_amount: number;
  subtotal?: number;
  discount_amount?: number;
  discount_type?: 'percentage' | 'fixed';
  tax_amount?: number;
  tax_rate?: number;
  shipping_cost?: number;
  shipping_amount?: number;
  items: any[];
}

interface OrdersProps {
  animation?: 'shimmer' | 'pulse' | 'wave';
}

export const Orders = ({
  animation = 'shimmer' 
}: OrdersProps) => {
  const { formatCurrency } = useLocale();
  const { data: paginatedData, loading, error, execute } = usePaginatedApi();
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);
  const ordersPerPage = 10;

  // Helper function to calculate and format pricing breakdown
  const calculatePricingBreakdown = (order: Order) => {
    // Calculate subtotal from items if not provided
    const calculatedSubtotal = order.items?.reduce((sum: number, item: any) => {
      return sum + (item.total_price || 0);
    }, 0) || 0;
    
    const subtotal = order.subtotal && order.subtotal > 0 ? order.subtotal : calculatedSubtotal;
    const discount = order.discount_amount || 0;
    const tax = order.tax_amount || 0;
    const shipping = order.shipping_cost || order.shipping_amount || 0;
    
    return {
      subtotal,
      discount,
      tax,
      shipping,
      total: order.total_amount
    };
  };

  // Fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await OrdersAPI.getOrders({
          page: currentPage,
          limit: ordersPerPage
        });
        
        const orders = unwrapResponse(response);
        setTotalOrders(orders.total || 0);
        setTotalPages(Math.ceil((orders.total || 0) / ordersPerPage));
      } catch (error) {
        toast.error(extractErrorMessage(error));
      }
    };

    fetchOrders();
  }, [currentPage]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Your Orders</h2>
        <p className="text-gray-600">
          {totalOrders} order{totalOrders !== 1 ? 's' : ''}
        </p>
      </div>

      {loading ? (
        <SkeletonOrderTable />
      ) : error ? (
        <div className="text-center py-8">
          <p className="text-red-600">Error loading orders</p>
        </div>
      ) : paginatedData?.data?.length === 0 ? (
        <div className="text-center py-8">
          <ShoppingBagIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No orders</h3>
          <p className="mt-1 text-sm text-gray-500">
            You haven't placed any orders yet.
          </p>
          <div className="mt-6">
            <Link
              to="/products"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {paginatedData?.data?.map((order: Order) => (
            <div key={order.id} className="bg-white shadow rounded-lg">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-medium">Order #{order.id}</h3>
                    <p className="text-sm text-gray-500">
                      {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">
                      {formatCurrency(order.total_amount)}
                    </p>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setExpandedOrderId(
                      expandedOrderId === order.id ? null : order.id
                    )}
                    className="flex items-center text-sm text-gray-600 hover:text-gray-900"
                  >
                    {expandedOrderId === order.id ? (
                      <ChevronUpIcon className="h-4 w-4 mr-1" />
                    ) : (
                      <ChevronDownIcon className="h-4 w-4 mr-1" />
                    )}
                    {expandedOrderId === order.id ? 'Hide' : 'Show'} details
                  </button>
                  
                  <div className="flex space-x-2">
                    <Link
                      to={`/account/orders/${order.id}`}
                      className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <EyeIcon className="h-4 w-4 mr-1" />
                      View
                    </Link>
                  </div>
                </div>

                {expandedOrderId === order.id && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="space-y-2">
                      {order.items?.map((item: any, index: number) => (
                        <div key={index} className="flex items-center justify-between py-2">
                          <div className="flex-1">
                            <p className="text-sm font-medium">{item.product_name}</p>
                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                          </div>
                          <p className="text-sm font-medium">
                            {formatCurrency(item.total_price || 0)}
                          </p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Subtotal:</span>
                          <span>{formatCurrency(calculatePricingBreakdown(order).subtotal)}</span>
                        </div>
                        {calculatePricingBreakdown(order).discount > 0 && (
                          <div className="flex justify-between text-green-600">
                            <span>Discount:</span>
                            <span>-{formatCurrency(calculatePricingBreakdown(order).discount)}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span>Shipping:</span>
                          <span>{formatCurrency(calculatePricingBreakdown(order).shipping)}</span>
                        </div>
                        <div className="flex justify-between font-semibold">
                          <span>Total:</span>
                          <span>{formatCurrency(calculatePricingBreakdown(order).total)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="p-2 border border-gray-300 rounded-md disabled:opacity-50"
                >
                  <ChevronLeftIcon className="h-4 w-4" />
                </button>
                <span className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 border border-gray-300 rounded-md disabled:opacity-50"
                >
                  <ChevronRightIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
