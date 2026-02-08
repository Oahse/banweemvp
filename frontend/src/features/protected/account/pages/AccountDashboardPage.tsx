import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../auth/contexts/AuthContext';
import { useSubscription } from '../../subscriptions/contexts/SubscriptionContext';
import { ShoppingBagIcon, HeartIcon, MapPinIcon, CreditCardIcon, PackageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SkeletonDashboard } from '@/components/ui/SkeletonDashboard';
import { usePaginatedApi } from '@/components/shared/hooks/useAsync';
import OrdersAPI from '@/api/orders';
import SubscriptionAPI from '@/api/subscription';
import { unwrapResponse, extractErrorMessage } from '@/utils/api-response';
import { AdminDashboardSkeleton } from '@/components/ui/SkeletonLoader';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 }
  }
};

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

  // Fetch recent orders
  useEffect(() => {
    fetchRecentOrders(() => OrdersAPI.getOrders({ limit: 5 }));
  }, [fetchRecentOrders]);

  // Handle loading state
  if (loading || subscriptionsLoading) {
    return <AdminDashboardSkeleton />;
  }

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
      if (Array.isArray(data)) {
        return data;
      }
      return [];
    }
    // If not wrapped, return paginatedOrders directly if it's an array
    if (Array.isArray(paginatedOrders)) {
      return paginatedOrders;
    }
    return [];
  })();

  return (
    <div className="space-y-8">
      {/* User Details */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm flex items-center gap-6">
        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold">
          {user?.firstname?.[0] || user?.email?.[0] || 'A'}
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-1">{user?.firstname} {user?.lastname}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <div className="text-lg font-semibold mb-2">Orders</div>
          <div className="text-2xl font-bold">{paginatedOrders?.total || 0}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <div className="text-lg font-semibold mb-2">Subscriptions</div>
          <div className="text-2xl font-bold">{subscriptions?.length || 0}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <div className="text-lg font-semibold mb-2">Wishlist</div>
          <div className="text-2xl font-bold">-</div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
        {Array.isArray(paginatedOrders?.data) && paginatedOrders.data.length > 0 ? (
          <div className="space-y-3">
            {paginatedOrders.data.slice(0, 5).map((order: Order) => (
              <div key={order.id} className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-3">
                <div>
                  <div className="text-sm font-medium">Order #{order.order_number || order.id}</div>
                  <div className="text-xs text-gray-500">{new Date(order.created_at).toLocaleDateString()}</div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-semibold">${order.total_amount.toFixed(2)}</span>
                  <span className="ml-2 px-2 py-0.5 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">{order.status}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-sm text-gray-500">No recent orders found.</div>
        )}
      </div>
    </div>
  );
};
