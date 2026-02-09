import React, { useEffect, useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import DashboardFilterBar, { DashboardFilters } from '../components/DashboardFilterBar';
import AdminStatsCard from '../components/shared/StatsCard';
import AdminDataTable, { Column, PaginationInfo } from '../components/shared/DataTable';
import { AdminAPI } from '@/api/admin';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Button } from '@/components/ui/Button';

// Loading spinner for stats
const StatsCardSkeleton: React.FC = () => (
  <div className="flex items-center justify-center h-48">
    <LoadingSpinner size="lg" text="Loading dashboard..." />
  </div>
);

// Loading spinner for table
const TableSkeleton: React.FC = () => (
  <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
    <div className="space-y-4">
      {/* Table header skeleton */}
      <div className="h-8 bg-gray-100 dark:bg-gray-700 rounded mb-4 animate-pulse"></div>
      
      {/* Table rows skeleton */}
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex items-center space-x-4 py-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-12 animate-pulse"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-16 animate-pulse"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-20 animate-pulse"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-16 animate-pulse"></div>
        </div>
      ))}
    </div>
  </div>
);

const defaultFilters: DashboardFilters = {
  dateRange: 'month',
};

const AdminDashboard: React.FC = () => {
  const [filters, setFilters] = useState<DashboardFilters>(defaultFilters);
  const [stats, setStats] = useState<any>(null);
  const [loadingStats, setLoadingStats] = useState(false);
  const [statsError, setStatsError] = useState<string | null>(null);

  const [tableData, setTableData] = useState<any[]>([]);
  const [tableLoading, setTableLoading] = useState(false);
  const [tableError, setTableError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationInfo>({
    page: 1,
    limit: 5,
    total: 0,
    pages: 1
  });

  const [showFilters, setShowFilters] = useState(true);

  const columns: Column[] = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'full_name', label: 'Name', sortable: true },
    { key: 'is_active', label: 'Status', sortable: true },
    { key: 'created_at', label: 'Created', sortable: true }
  ];

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoadingStats(true);
      setStatsError(null);

      let date_from: string | undefined;
      let date_to: string | undefined;

      if (filters.dateRange === 'today') {
        const today = new Date();
        date_from = today.toISOString().split('T')[0];
        date_to = today.toISOString().split('T')[0];
      } else if (filters.dateRange === 'week') {
        const today = new Date();
        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        date_from = weekAgo.toISOString().split('T')[0];
        date_to = today.toISOString().split('T')[0];
      } else if (filters.dateRange === 'month') {
        const today = new Date();
        const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
        date_from = monthAgo.toISOString().split('T')[0];
        date_to = today.toISOString().split('T')[0];
      } else if (filters.dateRange === 'quarter') {
        const today = new Date();
        const quarterAgo = new Date(today.getTime() - 90 * 24 * 60 * 60 * 1000);
        date_from = quarterAgo.toISOString().split('T')[0];
        date_to = today.toISOString().split('T')[0];
      } else if (filters.dateRange === 'year') {
        const today = new Date();
        const yearAgo = new Date(today.getTime() - 365 * 24 * 60 * 60 * 1000);
        date_from = yearAgo.toISOString().split('T')[0];
        date_to = today.toISOString().split('T')[0];
      } else {
        // Use custom dates if provided
        date_from = filters.startDate;
        date_to = filters.endDate;
      }

      try {
        const res = await AdminAPI.getDashboardData({
          date_from,
          date_to,
        });

        const data = res.data || res;
        setStats(data);

        // Set table data if recent users exist
        if (data.recent_users && Array.isArray(data.recent_users)) {
          setTableData(data.recent_users);
          setPagination({
            page: 1,
            limit: 5,
            total: data.recent_users.length,
            pages: 1
          });
        } else {
          // Fallback to empty array if no recent users data
          setTableData([]);
          setPagination({
            page: 1,
            limit: 5,
            total: 0,
            pages: 1
          });
        }
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
        setStatsError('Failed to load dashboard data');
      } finally {
        setLoadingStats(false);
      }
    };

    fetchDashboardData();
  }, [filters.dateRange, filters.startDate, filters.endDate]);

  const fetchTableData = async (params: { page: number; limit: number; search?: string; filters?: Record<string, string>; sort_by?: string; sort_order?: 'asc' | 'desc' }) => {
    setTableLoading(true);
    setTableError(null);
    
    try {
      const res = await AdminAPI.getUsers({
        page: params.page,
        limit: params.limit,
        role: undefined,
        search: params.search,
        sort_by: params.sort_by,
        sort_order: params.sort_order,
      });
      
      const users = res.data?.users || [];
      setTableData(users);
      
      if (res.data?.pagination) {
        setPagination({
          page: res.data.pagination.page,
          limit: res.data.pagination.limit,
          total: res.data.pagination.total,
          pages: res.data.pagination.pages
        });
      }
    } catch (err) {
      console.error('Failed to fetch table data:', err);
      setTableError('Failed to load users data');
    } finally {
      setTableLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Toggle filter bar */}
        <div className="flex items-center mb-2">
          <Button
            variant="outline"
            className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm font-medium mr-2 focus:outline-none focus:ring"
            onClick={() => setShowFilters((prev) => !prev)}
          >
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </Button>
        </div>
        {showFilters && (
          <DashboardFilterBar
            filters={filters}
            onFiltersChange={setFilters}
          />
        )}

        {/* Overview Section */}
        {loadingStats ? (
          <StatsCardSkeleton />
        ) : stats?.overview ? (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Platform Overview</h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <AdminStatsCard
                title="Total Users"
                value={stats.overview.total_users ?? '-'}
                loading={loadingStats}
                error={statsError ?? undefined}
                color="blue"
              />
              <AdminStatsCard
                title="Active Users"
                value={stats.overview.active_users ?? '-'}
                loading={loadingStats}
                error={statsError ?? undefined}
                color="green"
              />
              <AdminStatsCard
                title="Total Products"
                value={stats.overview.total_products ?? '-'}
                loading={loadingStats}
                error={statsError ?? undefined}
                color="purple"
              />
              <AdminStatsCard
                title="Active Products"
                value={stats.overview.active_products ?? '-'}
                loading={loadingStats}
                error={statsError ?? undefined}
                color="yellow"
              />
            </div>
          </div>
        ) : null}

        {/* Revenue Overview */}
        {loadingStats ? (
          <StatsCardSkeleton />
        ) : stats?.revenue ? (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Revenue Overview</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Revenue Chart */}
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Revenue Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
                  {/* ...existing code... */}
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        ) : null}

        {/* Orders Section */}
        {loadingStats ? (
          <StatsCardSkeleton />
        ) : stats?.overview ? (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Orders Overview</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Total Orders Chart */}
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Total Orders Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
                  {/* ...existing code... */}
                </ResponsiveContainer>
              </div>

              {/* Total Users Chart */}
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Total Users Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
                  {/* ...existing code... */}
                </ResponsiveContainer>
              </div>
            </div>

        {/* Recent Users Table */}
        {tableLoading ? (
          <TableSkeleton />
        ) : tableData.length > 0 ? (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Recent Users</h2>
            <AdminDataTable
              columns={columns}
              data={tableData}
              loading={tableLoading}
              error={tableError ?? null}
              pagination={pagination}
              onPageChange={(page: number) => setPagination(prev => ({ ...prev, page }))}
              fetchData={fetchTableData}
            />
          </div>
        ) : null}

        {/* Recent Orders Table */}
        {stats?.recent_orders && stats.recent_orders.length > 0 ? (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Recent Orders</h2>
            <AdminDataTable
              columns={[
                { key: 'id', label: 'Order ID', sortable: true }, 
                { key: 'user_email', label: 'User Email', sortable: true }, 
                { key: 'status', label: 'Status', sortable: true }, 
                { key: 'total_amount', label: 'Total', sortable: true }, 
                { key: 'created_at', label: 'Created', sortable: true }
              ]}
              data={stats.recent_orders}
              loading={tableLoading}
              error={tableError ?? null}
              pagination={{ page: 1, limit: 5, total: stats.recent_orders.length, pages: 1 }}
              onPageChange={() => {}}
              fetchData={() => Promise.resolve()}
            />
          </div>
        ) : null}
      </div>
    </AdminLayout>
  );
  );
};

export default AdminDashboard;
