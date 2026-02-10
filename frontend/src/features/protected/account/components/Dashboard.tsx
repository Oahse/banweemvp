import { useEffect } from 'react';
import { useAuth } from '../../../AuthContext';
import { useSubscription } from '../../../SubscriptionContext';
import { ShoppingBagIcon, HeartIcon, MapPinIcon, CreditCardIcon, PackageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SkeletonDashboard } from '../ui/SkeletonDashboard';
import { usePaginatedApi } from '../../../shared/hooks/useAsync';
import OrdersAPI from '../../api/orders';
import SubscriptionAPI from '../../api/subscription';
import { unwrapResponse, extractErrorMessage } from '../../utils/api-response';
import { Button } from '@/components/ui/Button';
import { Text, Heading } from '@/components/ui/Text/Text';
interface DashboardProps {
  animation?: 'shimmer' | 'pulse' | 'wave';
}
interface Order {
  id: string;
  created_at: string;
  status: string;
  total_amount: number;
  subscription_id?: string;
  order_number?: string;
}
interface User {
  firstname?: string;
  lastname?: string;
  email?: string;
  [key: string]: any;
}
export const Dashboard = ({
  animation = 'shimmer' 
}: DashboardProps) => {
  const { user } = useAuth() as { user: User | null };
  const { subscriptions, loading: subscriptionsLoading } = useSubscription();
  const { data: paginatedOrders, loading, error, execute: fetchRecentOrders } = usePaginatedApi();
  const { data: subscriptionOrders, loading: subscriptionOrdersLoading, execute: fetchSubscriptionOrders } = usePaginatedApi();

  // Handle both array and object responses - moved before useEffect
  const recentOrders: Order[] = (() => {
    if (!paginatedOrders) return [];
    // Handle Response.success wrapper
    if ((paginatedOrders as any)?.success) {
      const data = (paginatedOrders as any).data;
      // Check if data has orders array (paginated response)
      if (data && data.orders) {
        return data.orders;
      }
      // Otherwise return data directly if it's an array
      return Array.isArray(data) ? data : [];
    }
    // Handle direct array response
    if (Array.isArray(paginatedOrders)) {
      return paginatedOrders;
    }
    // Handle object with orders property
    if (paginatedOrders && typeof paginatedOrders === 'object' && 'orders' in paginatedOrders) {
      return (paginatedOrders as any).orders || [];
    }
    return [];
  })();

  const recentSubscriptionOrders: Order[] = (() => {
    if (!subscriptionOrders) return [];
    // Handle Response.success wrapper
    if ((subscriptionOrders as any)?.success) {
      const data = (subscriptionOrders as any).data;
      // Check if data has orders array (paginated response)
      if (data && data.orders) {
        return data.orders;
      }
      // Otherwise return data directly if it's an array
      return Array.isArray(data) ? data : [];
    }
    // Handle direct array response
    if (Array.isArray(subscriptionOrders)) {
      return subscriptionOrders;
    }
    // Handle object with orders property
    if (subscriptionOrders && typeof subscriptionOrders === 'object' && 'orders' in subscriptionOrders) {
      return (subscriptionOrders as any).orders || [];
    }
    return [];
  })();

  // Get active subscriptions
  const activeSubscriptions = subscriptions.filter(sub => sub.status === 'active');

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchRecentOrders(() => OrdersAPI.getOrders({ limit: 3 }));
        // Fetch subscription orders if there are active subscriptions
        if (subscriptions.length > 0) {
          const activeSubscription = subscriptions.find(sub => sub.status === 'active');
          if (activeSubscription) {
            await fetchSubscriptionOrders(() => SubscriptionAPI.getSubscriptionOrders(activeSubscription.id, { page: 1, limit: 3 }));
          }
        }
      } catch (error) {
        console.warn('Dashboard data fetch failed:', error);
      }
    };
    
    fetchData();
  }, [fetchRecentOrders, fetchSubscriptionOrders, subscriptions]);

  // Debug logging
  useEffect(() => {
    if (paginatedOrders) {
      console.log('Dashboard Orders API Response:', paginatedOrders);
      console.log('Dashboard Processed orders:', recentOrders);
    }
  }, [paginatedOrders, recentOrders]);

  if (loading || subscriptionsLoading) {
    return <SkeletonDashboard className="p-6" animation={animation} />;
  }

  if (error) {
    // Handle different error types with user-friendly messages
    const getErrorMessage = (error: any) => {
      if (error.statusCode === 500) {
        if (error.data?.message?.includes('shipping_amount')) {
          return "There's an issue with the order data format. Please contact support or try again later.";
        }
        if (error.data?.message?.includes('discount_amount')) {
          return "There's an issue with the order data format. Please contact support or try again later.";
        }
        return "Server is temporarily unavailable. Please try again in a few minutes.";
      }
      if (error.statusCode === 401) {
        return "Please log in to view your orders.";
      }
      if (error.statusCode === 403) {
        return "You don't have permission to view these orders.";
      }
      return error.message || "Failed to load orders. Please try again.";
    };

    return (
      <div className="text-center p-6">
        <div className="text-red-600 mb-4">
          <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <Heading level={3} weight="medium">Unable to Load Orders</Heading>
          <Text variant="body" tone="secondary">{getErrorMessage(error)}</Text>
        </div>
        <Button 
          onClick={() => window.location.reload()} 
          variant="primary"
          size="sm"
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          <Text variant="body-sm">Try Again</Text>
        </Button>
      </div>
    );
  }

  return <div className="space-y-3">
      {/* Welcome Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-3">
        <Heading level={2} weight="medium">Welcome back, {user?.firstname}!</Heading>
        <Text variant="caption" tone="secondary">
          Here's a summary of your account activities.
        </Text>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
          <Link to="/account/orders" className="bg-gray-50 dark:bg-gray-700 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
            <div className="flex flex-col items-center text-center">
              <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-1">
                <ShoppingBagIcon size={12} className="text-blue-600 dark:text-blue-300" />
              </div>
              <div>
                <Text variant="caption" weight="medium">Orders</Text>
                <Text variant="caption" tone="secondary">
                  {recentOrders.length} recent
                </Text>
              </div>
            </div>
          </Link>
          <Link to="/account/subscriptions" className="bg-gray-50 dark:bg-gray-700 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
            <div className="flex flex-col items-center text-center">
              <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mb-1">
                <PackageIcon size={12} className="text-green-600 dark:text-green-300" />
              </div>
              <div>
                <Text variant="caption" weight="medium">Subscriptions</Text>
                <Text variant="caption" tone="secondary">
                  {activeSubscriptions.length} active
                </Text>
              </div>
            </div>
          </Link>
          <Link to="/account/wishlist" className="bg-gray-50 dark:bg-gray-700 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
            <div className="flex flex-col items-center text-center">
              <div className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center mb-1">
                <HeartIcon size={12} className="text-red-600 dark:text-red-300" />
              </div>
              <div>
                <Text variant="caption" weight="medium">Wishlist</Text>
                <Text variant="caption" tone="secondary">
                  Saved items
                </Text>
              </div>
            </div>
          </Link>
          <Link to="/account/addresses" className="bg-gray-50 dark:bg-gray-700 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
            <div className="flex flex-col items-center text-center">
              <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mb-1">
                <MapPinIcon size={12} className="text-green-600 dark:text-green-300" />
              </div>
              <div>
                <Text variant="caption" weight="medium">Addresses</Text>
                <Text variant="caption" tone="secondary">
                  Manage shipping
                </Text>
              </div>
            </div>
          </Link>
          <Link to="/account/payment-methods" className="bg-gray-50 dark:bg-gray-700 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
            <div className="flex flex-col items-center text-center">
              <div className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mb-1">
                <CreditCardIcon size={12} className="text-purple-600 dark:text-purple-300" />
              </div>
              <div>
                <Text variant="caption" weight="medium">Payment Methods</Text>
                <Text variant="caption" tone="secondary">
                  Manage payment
                </Text>
              </div>
            </div>
          </Link>
        </div>
      </div>
      
      {/* Active Subscriptions Section */}
      {activeSubscriptions.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-3">
          <div className="flex justify-between items-center mb-3">
            <Heading level={2} weight="medium">Active Subscriptions</Heading>
            <Text variant="body-sm" className="text-primary hover:underline">View all</Text>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {activeSubscriptions.slice(0, 2).map((subscription: any) => (
              <div key={subscription.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                <div className="flex justify-between items-start mb-2">
                  <Text variant="caption" weight="medium">{subscription.name}</Text>
                  <Text variant="caption" className="px-2 py-1 rounded-full bg-success-light text-success-dark dark:bg-success-dark dark:text-success-light">
                    Active
                  </Text>
                </div>
                <Text variant="caption" tone="secondary">
                  {subscription.products?.length || 0} products • {subscription.billing_cycle}
                </Text>
                <Text variant="caption" tone="secondary">
                  Next billing: {subscription.next_billing_date ? new Date(subscription.next_billing_date).toLocaleDateString() : 'N/A'}
                </Text>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Recent Orders Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-3">
        <div className="flex justify-between items-center mb-3">
          <Heading level={2} weight="medium">Recent Orders</Heading>
          <Text variant="body-sm" className="text-primary hover:underline">View all</Text>
        </div>
        {recentOrders.length > 0 ? <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="text-xs text-gray-700 dark:text-gray-300 uppercase bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col" className="px-3 py-2 text-left">
                    Order ID
                  </th>
                  <th scope="col" className="px-3 py-2 text-left">
                    Date
                  </th>
                  <th scope="col" className="px-3 py-2 text-left">
                    Status
                  </th>
                  <th scope="col" className="px-3 py-2 text-right">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order: Order) => (
                  <tr key={order.id} className="border-b dark:border-gray-700">
                    <td className="px-3 py-2">
                      <Link to={`/account/orders/${order.id}`}>
                        <Text variant="body-sm" className="text-primary hover:underline">{order.id}</Text>
                      </Link>
                    </td>
                    <td className="px-3 py-2 text-gray-600 dark:text-gray-300 text-sm">
                      <Text variant="body-sm" tone="secondary">{new Date(order.created_at).toLocaleDateString()}</Text>
                    </td>
                    <td className="px-3 py-2">
                      <Text as="span" variant="caption" className={`px-2 py-1 text-xs rounded-full ${order.status === 'Delivered' ? 'bg-success-light text-success-dark dark:bg-success-dark dark:text-success-light' : 'bg-info-light text-info-dark dark:bg-info-dark dark:text-info-light'}`}>
                        {order.status}
                      </Text>
                    </td>
                    <td className="px-3 py-2 text-gray-600 dark:text-gray-300 text-right text-sm">
                      <Text variant="body-sm" tone="secondary">${order.total_amount.toFixed(2)}</Text>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div> : <div className="text-center py-6">
            <Text variant="body-sm" tone="secondary">You haven't placed any orders yet.</Text>
            <Link to="/products" className="mt-2 inline-block">
              <Text variant="body-sm" className="text-primary hover:underline">Start shopping</Text>
            </Link>
          </div>}
      </div>
      
      {/* Subscription Orders Section */}
      {recentSubscriptionOrders.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-3">
          <div className="flex justify-between items-center mb-3">
            <Heading level={2} weight="medium">Recent Subscription Orders</Heading>
            <Link to="/account/subscriptions">
              <Text variant="body-sm" className="text-primary hover:underline">View all</Text>
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="text-xs text-gray-700 dark:text-gray-300 uppercase bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col" className="px-3 py-2 text-left">
                    Order ID
                  </th>
                  <th scope="col" className="px-3 py-2 text-left">
                    Date
                  </th>
                  <th scope="col" className="px-3 py-2 text-left">
                    Status
                  </th>
                  <th scope="col" className="px-3 py-2 text-left">
                    Type
                  </th>
                  <th scope="col" className="px-3 py-2 text-right">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentSubscriptionOrders.map((order: Order) => (
                  <tr key={order.id} className="border-b dark:border-gray-700">
                    <td className="px-3 py-2">
                      <Link to={`/account/orders/${order.id}`}>
                        <Text variant="body-sm" className="text-primary hover:underline">{order.order_number || order.id}</Text>
                      </Link>
                    </td>
                    <td className="px-3 py-2 text-gray-600 dark:text-gray-300 text-sm">
                      <Text variant="body-sm" tone="secondary">{new Date(order.created_at).toLocaleDateString()}</Text>
                    </td>
                    <td className="px-3 py-2">
                      <Text as="span" variant="caption" className={`px-2 py-1 text-xs rounded-full ${
                        order.status === 'Delivered' 
                          ? 'bg-success-light text-success-dark dark:bg-success-dark dark:text-success-light' 
                          : 'bg-info-light text-info-dark dark:bg-info-dark dark:text-info-light'
                      }`}>
                        {order.status}
                      </Text>
                    </td>
                    <td className="px-3 py-2">
                      <Text as="span" variant="caption" className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                        Subscription
                      </Text>
                    </td>
                    <td className="px-3 py-2 text-gray-600 dark:text-gray-300 text-right text-sm">
                      <Text variant="body-sm" tone="secondary">${order.total_amount.toFixed(2)}</Text>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>;
};
export default Dashboard;