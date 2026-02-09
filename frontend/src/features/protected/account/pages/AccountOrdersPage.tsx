import { useState, useEffect } from 'react';
import { ChevronDownIcon, ChevronUpIcon, EyeIcon, DownloadIcon, ShoppingBagIcon, TruckIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SkeletonOrderTable } from '@/features/protected/account/components/SkeletonOrderTable';
import { usePaginatedApi } from '@/components/shared/hooks/useAsync';
import OrdersAPI from '@/api/orders';
import { toast } from 'react-hot-toast';
import { useLocale } from '@/components/shared/contexts/LocaleContext';
import { unwrapResponse, extractErrorMessage } from '@/utils/api-response';
import { Button } from '@/components/ui/Button';


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

interface OrderPageResponse {
  data: Order[];
  total: number;
  total_pages: number;
}

interface OrdersProps {
  animation?: 'shimmer' | 'pulse' | 'wave';
}

export const Orders = (props: OrdersProps) => {
  const { animation = 'shimmer' } = props;
  const { formatCurrency } = useLocale();
  const { data, loading, error, execute } = usePaginatedApi();
  const paginatedData = (data && typeof data === 'object' && 'data' in data)
    ? (data as OrderPageResponse)
    : undefined;
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
        const response = await execute(() => OrdersAPI.getOrders({
          page: currentPage,
          limit: ordersPerPage
        }));
        
        const orders = unwrapResponse(response);
        setTotalOrders(orders.total || 0);
        setTotalPages(Math.ceil((orders.total || 0) / ordersPerPage));
      } catch (error) {
        toast.error(extractErrorMessage(error));
      }
    };

    fetchOrders();
  }, [currentPage, execute]);

  // Defensive: ensure ordersArray is always an array
  const ordersArray = Array.isArray(paginatedData?.data) ? paginatedData.data : [];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-600">
          {totalOrders} order{totalOrders !== 1 ? 's' : ''}
        </p>
      </div>

      {loading ? (
        <SkeletonOrderTable />
      ) : error ? (
        <div className="text-center py-6">
          <p className="text-xs text-red-600">Error loading orders</p>
        </div>
      ) : ordersArray.length === 0 ? (
        <div className="text-center py-6">
          <ShoppingBagIcon className="mx-auto h-10 w-10 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No orders</h3>
          <p className="mt-1 text-xs text-gray-500">
            You haven't placed any orders yet.
          </p>
          <div className="mt-4">
            <Link
              to="/products"
              className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-md shadow-sm text-xs font-medium text-white bg-primary hover:bg-primary-dark"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {ordersArray.map((order: Order) => (
            <div key={order.id} className="bg-white shadow rounded-lg">
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-sm font-medium">Order #{order.id}</h3>
                    <p className="text-xs text-gray-500">
                      {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">
                      {formatCurrency(order.total_amount)}
                    </p>
                    <span className={`inline-flex px-2 py-0.5 text-xs font-semibold rounded-full ${
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
                  <Button
                    onClick={() => setExpandedOrderId(
                      expandedOrderId === order.id ? null : order.id
                    )}
                    variant="ghost"
                    size="sm"
                    rightIcon={expandedOrderId === order.id ? <ChevronUpIcon className="h-3 w-3" /> : <ChevronDownIcon className="h-3 w-3" />}
                  >
                    {expandedOrderId === order.id ? 'Hide' : 'Show'} details
                  </Button>
                  
                  <div className="flex space-x-2">
                    <Link
                      to={`/account/orders/${order.id}`}
                      className="inline-flex items-center px-2 py-1 border border-gray-300 rounded-md text-xs font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <EyeIcon className="h-3 w-3 mr-1" />
                      View
                    </Link>
                  </div>
                </div>

                {expandedOrderId === order.id && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <div className="space-y-1.5">
                      {order.items?.map((item: any, index: number) => (
                        <div key={index} className="flex items-center justify-between py-1.5">
                          <div className="flex-1">
                            <p className="text-xs font-medium">{item.product_name}</p>
                            <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                          </div>
                          <p className="text-xs font-medium">
                            {(() => {
                              const formatted = formatCurrency(item.total_price || 0);
                              console.log('formatCurrency output:', formatted, 'type:', typeof formatted);
                              return formatted;
                            })()}
                          </p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <div className="space-y-0.5 text-xs">
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
                <Button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  variant="outline"
                  size="icon"
                  leftIcon={<ChevronLeftIcon className="h-3 w-3" />}
                />
                <span className="text-xs text-gray-600">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  variant="outline"
                  size="icon"
                  leftIcon={<ChevronRightIcon className="h-3 w-3" />}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
