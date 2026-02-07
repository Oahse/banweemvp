import React, { useEffect, useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import DashboardFilterBar, { DashboardFilters } from '../components/DashboardFilterBar';
import AdminStatsCard from '../components/shared/StatsCard';
import AdminDataTable, { Column, PaginationInfo } from '../components/shared/DataTable';
import { AdminAPI } from '../../../../api/admin';
import ErrorBoundary from '@/components/shared/ErrorBoundary';

const defaultFilters: DashboardFilters = {
  dateRange: 'month',
  status: undefined,
  category: undefined,
};

const AdminDashboard: React.FC = () => {
  const [filters, setFilters] = useState<DashboardFilters>(defaultFilters);
  const [stats, setStats] = useState<any>(null);
  const [loadingStats, setLoadingStats] = useState(false);
  const [statsError, setStatsError] = useState<string|null>(null);
  const [tableData, setTableData] = useState<any[]>([]);
  const [tableLoading, setTableLoading] = useState(false);
  const [tableError, setTableError] = useState<string|null>(null);
  const [pagination, setPagination] = useState<PaginationInfo>({ page: 1, limit: 10, total: 0, pages: 1 });

  // Fetch dashboard stats
  useEffect(() => {
    setLoadingStats(true);
    AdminAPI.getAdminStats({
      date_from: filters.startDate,
      date_to: filters.endDate,
      status: filters.status,
      category: filters.category,
    })
      .then((res: any) => {
        setStats(res.data || res);
        setStatsError(null);
      })
      .catch((err: any) => {
        setStatsError('Failed to load stats');
      })
      .finally(() => setLoadingStats(false));
  }, [filters]);

  // Fetch table data (example: users)
  const fetchTableData = async (params: any) => {
    setTableLoading(true);
    try {
      const res = await AdminAPI.getUsers({
        page: params.page,
        limit: params.limit,
        status: filters.status,
        role: undefined,
        search: params.search,
        sort_by: params.sort_by,
        sort_order: params.sort_order,
      });
      setTableData(res.data?.users || []);
      setPagination({
        page: res.data?.page || 1,
        limit: res.data?.limit || 10,
        total: res.data?.total || 0,
        pages: res.data?.pages || 1,
      });
      setTableError(null);
    } catch (err) {
      setTableError('Failed to load table data');
    } finally {
      setTableLoading(false);
    }
  };

  // Table columns
  const columns: Column[] = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'full_name', label: 'Name', sortable: true },
    { key: 'role', label: 'Role', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
  ];

  // Font style from account pages
  const fontClass = 'font-sans';

  return (
    <AdminLayout>
      <div className={fontClass + " py-4"}>
        <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Admin Dashboard</h1>
        <DashboardFilterBar
          filters={filters}
          onFiltersChange={setFilters}
          onReset={() => setFilters(defaultFilters)}
        />
        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
          <AdminStatsCard
            title="Total Users"
            value={stats?.total_users ?? '-'}
            loading={loadingStats}
            error={statsError ?? undefined}
            color="blue"
          />
          <AdminStatsCard
            title="Total Orders"
            value={stats?.total_orders ?? '-'}
            loading={loadingStats}
            error={statsError ?? undefined}
            color="green"
          />
          {/* Revenue cards: handle object case */}
          {typeof stats?.revenue === 'object' && stats?.revenue !== null ? (
            <>
              <AdminStatsCard
                title="Total Revenue"
                value={stats.revenue.total_revenue ?? '-'}
                loading={loadingStats}
                error={statsError ?? undefined}
                color="purple"
              />
              <AdminStatsCard
                title="Revenue Today"
                value={stats.revenue.revenue_today ?? '-'}
                loading={loadingStats}
                error={statsError ?? undefined}
                color="indigo"
              />
              <AdminStatsCard
                title="Revenue This Month"
                value={stats.revenue.revenue_this_month ?? '-'}
                loading={loadingStats}
                error={statsError ?? undefined}
                color="blue"
              />
              <AdminStatsCard
                title="Currency"
                value={stats.revenue.currency ?? '-'}
                loading={loadingStats}
                error={statsError ?? undefined}
                color="gray"
              />
            </>
          ) : (
            <AdminStatsCard
              title="Revenue"
              value={stats?.revenue ?? '-'}
              loading={loadingStats}
              error={statsError ?? undefined}
              color="purple"
            />
          )}
          <AdminStatsCard
            title="Active Subscriptions"
            value={stats?.active_subscriptions ?? '-'}
            loading={loadingStats}
            error={statsError ?? undefined}
            color="indigo"
          />
        </div>
        {/* Data Table */}
        <div className="my-8">
          <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">User Overview</h2>
          <AdminDataTable
            data={tableData}
            loading={tableLoading}
            error={tableError}
            pagination={pagination}
            columns={columns}
            fetchData={fetchTableData}
            emptyMessage="No users found"
            className=""
          />
        </div>
      </div>
    </AdminLayout>
  );
};

export default function WrappedAdminDashboardPage(props) {
  return (
    <ErrorBoundary>
      <AdminDashboardPage {...props} />
    </ErrorBoundary>
  );
}
