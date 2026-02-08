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
    return <SkeletonDashboard />;
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
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Stats Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm flex items-center gap-3">
          <ShoppingBagIcon className="h-5 w-5 text-primary" />
          <div>
            <Link to="/account/orders" className="text-sm font-medium mb-1 text-gray-700 dark:text-gray-200 hover:underline">Orders</Link>
            <div className="text-lg font-bold text-primary">{paginatedOrders?.total || 0}</div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm flex items-center gap-3">
          <CreditCardIcon className="h-5 w-5 text-primary" />
          <div>
            <Link to="/account/subscriptions" className="text-sm font-medium mb-1 text-gray-700 dark:text-gray-200 hover:underline">Subscriptions</Link>
            <div className="text-lg font-bold text-primary">{subscriptions?.length || 0}</div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm flex items-center gap-3">
          <HeartIcon className="h-5 w-5 text-primary" />
          <div>
            <Link to="/account/wishlist" className="text-sm font-medium mb-1 text-gray-700 dark:text-gray-200 hover:underline">Wishlist</Link>
            <div className="text-lg font-bold text-primary">-</div>
          </div>
        </div>
      </motion.div>

      {/* Recent Orders */}
      <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
        <h3 className="text-base font-semibold mb-2 text-gray-900 dark:text-white">Recent Orders</h3>
        {Array.isArray(paginatedOrders?.data) ? (
          <div className="space-y-2">
            {paginatedOrders?.data.slice(0, 5).map((order: Order) => (
              <div key={order.id} className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-2 last:border-b-0">
                <div>
                  <div className="text-xs font-medium text-gray-800 dark:text-gray-200">Order #{order.order_number || order.id}</div>
                  <div className="text-xs text-gray-500">{new Date(order.created_at).toLocaleDateString()}</div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold text-primary">${order.total_amount.toFixed(2)}</span>
                  <span className="ml-2 px-2 py-0.5 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">{order.status}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-xs text-gray-500">No recent orders found.</div>
        )}
      </motion.div>
    </motion.div>
  );
};
