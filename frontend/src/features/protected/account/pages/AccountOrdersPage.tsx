import { useState, useEffect } from 'react';
import { ChevronDownIcon, ChevronUpIcon, EyeIcon, DownloadIcon, ShoppingBagIcon, TruckIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Table } from '@/components/ui/Table';
import { usePaginatedApi } from '@/components/shared/hooks/useAsync';
import OrdersAPI from '@/api/orders';
import { toast } from 'react-hot-toast';
import { useLocale } from '@/components/shared/contexts/LocaleContext';
import { unwrapResponse, extractErrorMessage } from '@/utils/api-response';
import { Button } from '@/components/ui/Button';
import { Pagination } from '@/components/ui/Pagination';
import { Text, Heading, Caption } from '@/components/ui/Text/Text';


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

const Orders = (props: OrdersProps) => {
  const { animation = 'shimmer' } = props;
  const { formatCurrency } = useLocale();
  const { data, loading, error, execute } = usePaginatedApi();
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);
  const ordersPerPage = 5;

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
        
        console.log('Orders API full response:', response);
        
        // Response is wrapped: { success: true, data: { orders: [...], pagination: {...} } }
        const ordersData = response?.data || response;
        
        if (ordersData && ordersData.pagination) {
          setTotalOrders(ordersData.pagination.total || 0);
          setTotalPages(ordersData.pagination.pages || 1);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
        toast.error(extractErrorMessage(error));
      }
    };

    fetchOrders();
  }, [currentPage, execute]);

  // Extract orders array - response is { success, data: { orders: [...], pagination: {...} } }
  const ordersArray = data?.data?.orders || data?.orders || [];
  
  console.log('Final ordersArray:', ordersArray, 'length:', ordersArray.length);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Text variant="caption" tone="secondary">{totalOrders} order{totalOrders !== 1 ? 's' : ''}</Text>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="bg-surface dark:bg-surface-dark shadow rounded-lg border border-border dark:border-border-dark">
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse mb-2"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 animate-pulse"></div>
                  </div>
                  <div className="text-right">
                    <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-20 animate-pulse mb-2"></div>
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-24 animate-pulse"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-28 animate-pulse"></div>
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-16 animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-6">
          <Text as="p" className="text-sm text-red-600">Error loading orders</Text>
        </div>
      ) : ordersArray.length === 0 ? (
        <div className="text-center py-6">
          <ShoppingBagIcon className="mx-auto h-10 w-10 text-gray-400" />
          <Heading level={5} weight="medium" className="mt-2">No orders</Heading>
          <Text variant="caption" tone="secondary">You haven't placed any orders yet.</Text>
          <div className="mt-4">
            <Link
              to="/products"
              className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark"
            >
              <Text variant="body-sm" className="text-white">Start Shopping</Text>
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {ordersArray.map((order: Order) => (
            <div key={order.id} className="bg-surface dark:bg-surface-dark shadow rounded-lg border border-border dark:border-border-dark">
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <Caption weight="medium">Order #{order.id.slice(0, 8)}</Caption><br/>
                    <Text variant="caption" tone="secondary">{new Date(order.created_at).toLocaleDateString()}</Text>
                  </div>
                  <div className="text-right">
                    <Text variant="body-sm" className="font-semibold">{formatCurrency(order.total_amount)}</Text><br/>
                    <Text as="span" variant="caption" className={`inline-flex px-2 py-0.5 text-sm font-semibold rounded-full ${
                      order.status === 'delivered' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                      order.status === 'shipped' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                      order.status === 'processing' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                      'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                    }`}>{order.status}</Text>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Button
                    onClick={() => setExpandedOrderId(
                      expandedOrderId === order.id ? null : order.id
                    )}
                    variant="ghost"
                    size="xs"
                    rightIcon={expandedOrderId === order.id ? <ChevronUpIcon className="h-3 w-3" /> : <ChevronDownIcon className="h-3 w-3" />}
                  >
                    <Text variant="body-sm">{expandedOrderId === order.id ? 'Hide' : 'Show'} details</Text>
                  </Button>
                  
                  <div className="flex space-x-2">
                        <Link
                          to={`/account/orders/${order.id}`}
                          className="inline-flex items-center px-2 py-1 border border-border dark:border-border-dark rounded-md text-sm font-medium bg-surface dark:bg-surface-dark hover:bg-surface-elevated dark:hover:bg-surface-elevated-dark"
                        >
                          <EyeIcon className="h-3 w-3 mr-1" />
                          <Text as="span">View</Text>
                        </Link>
                  </div>
                </div>

                {expandedOrderId === order.id && (
                  <div className="mt-3 pt-3 border-t border-border-light dark:border-border-light-dark">
                    <div className="space-y-1.5">
                      {order.items?.map((item: any, index: number) => (
                        <div key={index} className="flex items-center justify-between py-1.5">
                          <div className="flex-1">
                            <Text variant="caption" weight="medium">{item.variant?.product_name || 'Product'}</Text>
                            <Text variant="caption" tone="secondary">Qty: {item.quantity}</Text>
                          </div>
                          <Text variant="caption" weight="medium">{formatCurrency(item.total_price || 0)}</Text>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-3 pt-3 border-t border-border-light dark:border-border-light-dark">
                      <div className="space-y-0.5 text-sm">
                        <div className="flex justify-between">
                          <Text variant="caption">Subtotal:</Text>
                          <Text variant="caption">{formatCurrency(calculatePricingBreakdown(order).subtotal)}</Text>
                        </div>
                        {calculatePricingBreakdown(order).discount > 0 && (
                          <div className="flex justify-between text-green-600 dark:text-green-400">
                            <Text variant="caption">Discount:</Text>
                            <Text variant="caption">-{formatCurrency(calculatePricingBreakdown(order).discount)}</Text>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <Text variant="caption">Shipping:</Text>
                          <Text variant="caption">{formatCurrency(calculatePricingBreakdown(order).shipping)}</Text>
                        </div>
                        <div className="flex justify-between font-semibold">
                          <Text variant="caption">Total:</Text>
                          <Text variant="caption">{formatCurrency(calculatePricingBreakdown(order).total)}</Text>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalOrders}
            itemsPerPage={ordersPerPage}
            onPageChange={setCurrentPage}
            showingStart={(currentPage - 1) * ordersPerPage + 1}
            showingEnd={Math.min(currentPage * ordersPerPage, totalOrders)}
            itemName="orders"
          />
        </div>
      )}
    </div>
  );
};

export default Orders;
