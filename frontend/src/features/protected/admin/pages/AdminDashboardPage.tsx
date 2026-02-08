import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout';
import { AdminAPI } from '@/api/admin';
import AdminLayoutSkeleton from '../components/skeletons/AdminLayoutSkeleton';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { 
  Users, ShoppingCart, Package, DollarSign, TrendingUp, 
  Activity, ArrowUpRight, ArrowDownRight 
} from 'lucide-react';

// Color palette
const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
  color: string;
  loading?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon, color, loading }) => {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-3 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-0.5">{title}</p>
          {loading ? (
            <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          ) : (
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{value}</h3>
          )}
          {change !== undefined && (
            <div className={`flex items-center mt-1 text-xs ${
              isPositive ? 'text-green-600' : isNegative ? 'text-red-600' : 'text-gray-600'
            }`}>
              {isPositive ? <ArrowUpRight className="w-3 h-3 mr-0.5" /> : 
               isNegative ? <ArrowDownRight className="w-3 h-3 mr-0.5" /> : null}
              <span>{Math.abs(change)}% vs last period</span>
            </div>
          )}
        </div>
        <div className={`p-2 rounded-lg ${color}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState('month');

  useEffect(() => {
    fetchDashboardData();
  }, [dateRange]);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await AdminAPI.getDashboardData({});
      setStats(response.data || response);
    } catch (err: any) {
      console.error('Failed to fetch dashboard data:', err);
      if (err.response?.status === 401) {
        navigate('/login');
      } else if (err.response?.status === 403) {
        setError('Access Denied: Admin access required');
      } else {
        setError('Failed to load dashboard data');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <AdminLayoutSkeleton />;
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center h-96">
          <div className="text-red-600 dark:text-red-400 text-lg mb-3">{error}</div>
          <button
            onClick={fetchDashboardData}
            className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </AdminLayout>
    );
  }

  const overview = stats?.overview || {};
  const revenue = stats?.revenue || {};
  const chartData = stats?.chart_data || [];

  return (
    <AdminLayout>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">Welcome back! Here's what's happening.</p>
          </div>
          <div className="flex items-center space-x-2">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="today">Today</option>
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
              <option value="quarter">Last 90 Days</option>
              <option value="year">Last Year</option>
            </select>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <StatCard
            title="Total Revenue"
            value={`${revenue.total_revenue?.toLocaleString() || '0'}`}
            change={12.5}
            icon={<DollarSign className="w-5 h-5 text-white" />}
            color="bg-gradient-to-br from-green-500 to-green-600"
          />
          <StatCard
            title="Total Orders"
            value={overview.total_orders?.toLocaleString() || '0'}
            change={8.2}
            icon={<ShoppingCart className="w-5 h-5 text-white" />}
            color="bg-gradient-to-br from-blue-500 to-blue-600"
          />
          <StatCard
            title="Total Users"
            value={overview.total_users?.toLocaleString() || '0'}
            change={15.3}
            icon={<Users className="w-5 h-5 text-white" />}
            color="bg-gradient-to-br from-purple-500 to-purple-600"
          />
          <StatCard
            title="Total Products"
            value={overview.total_products?.toLocaleString() || '0'}
            change={-2.4}
            icon={<Package className="w-5 h-5 text-white" />}
            color="bg-gradient-to-br from-orange-500 to-orange-600"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {/* Revenue Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Revenue Trend</h3>
              <TrendingUp className="w-4 h-4 text-green-600" />
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="date" 
                  stroke="#6b7280"
                  style={{ fontSize: '11px' }}
                />
                <YAxis 
                  stroke="#6b7280"
                  style={{ fontSize: '11px' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    fontSize: '12px'
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  dot={{ fill: '#10b981', r: 3 }}
                  activeDot={{ r: 5 }}
                  name="Revenue ($)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Orders Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Orders Trend</h3>
              <Activity className="w-4 h-4 text-blue-600" />
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="date" 
                  stroke="#6b7280"
                  style={{ fontSize: '11px' }}
                />
                <YAxis 
                  stroke="#6b7280"
                  style={{ fontSize: '11px' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    fontSize: '12px'
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Bar 
                  dataKey="orders" 
                  fill="#3b82f6" 
                  radius={[6, 6, 0, 0]}
                  name="Orders"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-medium text-gray-600 dark:text-gray-400">Active Users</h3>
              <Users className="w-4 h-4 text-green-600" />
            </div>
            <p className="text-xl font-bold text-gray-900 dark:text-white mb-1">
              {overview.active_users?.toLocaleString() || '0'}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              of {overview.total_users?.toLocaleString() || '0'} total users
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-medium text-gray-600 dark:text-gray-400">Active Products</h3>
              <Package className="w-4 h-4 text-blue-600" />
            </div>
            <p className="text-xl font-bold text-gray-900 dark:text-white mb-1">
              {overview.active_products?.toLocaleString() || '0'}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              of {overview.total_products?.toLocaleString() || '0'} total products
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-medium text-gray-600 dark:text-gray-400">Active Subscriptions</h3>
              <Activity className="w-4 h-4 text-purple-600" />
            </div>
            <p className="text-xl font-bold text-gray-900 dark:text-white mb-1">
              {overview.active_subscriptions?.toLocaleString() || '0'}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              of {overview.total_subscriptions?.toLocaleString() || '0'} total subscriptions
            </p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {/* Recent Orders */}
          {stats?.recent_orders && stats.recent_orders.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Recent Orders</h3>
                <button
                  onClick={() => navigate('/admin/orders')}
                  className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                >
                  View All →
                </button>
              </div>
              <div className="space-y-2">
                {stats.recent_orders.slice(0, 5).map((order: any) => (
                  <div 
                    key={order.id}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                    onClick={() => navigate(`/admin/orders/${order.id}`)}
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {order.user?.firstname} {order.user?.lastname}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {order.user_email}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        ${order.total_amount?.toFixed(2)}
                      </p>
                      <span className={`inline-block px-2 py-0.5 text-xs rounded-full ${
                        order.status === 'completed' ? 'bg-green-100 text-green-800' :
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        order.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recent Users */}
          {stats?.recent_users && stats.recent_users.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Recent Users</h3>
                <button
                  onClick={() => navigate('/admin/users')}
                  className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                >
                  View All →
                </button>
              </div>
              <div className="space-y-2">
                {stats.recent_users.slice(0, 5).map((user: any) => (
                  <div 
                    key={user.id}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                    onClick={() => navigate(`/admin/users/${user.id}`)}
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-semibold">
                        {user.firstname?.[0]}{user.lastname?.[0]}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {user.firstname} {user.lastname}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <span className={`inline-block px-2 py-0.5 text-xs rounded-full ${
                      user.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {user.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Top Products */}
        {stats?.top_products && stats.top_products.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Top Products</h3>
              <button
                onClick={() => navigate('/admin/products')}
                className="text-xs text-blue-600 hover:text-blue-700 font-medium"
              >
                View All →
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {stats.top_products.slice(0, 6).map((product: any, index: number) => (
                <div 
                  key={product.id}
                  className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                  onClick={() => navigate(`/admin/products/${product.id}`)}
                >
                  <div className="flex items-center space-x-2">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-white font-bold text-xs`}
                         style={{ backgroundColor: COLORS[index % COLORS.length] }}>
                      #{index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {product.name}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {product.sales || 0} sales
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
