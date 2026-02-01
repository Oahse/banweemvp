import React, { useState, useEffect } from 'react';
import { AdminPageLayout } from '../../components/admin/shared/PageLayout';
import { AdminDataTable } from '../../components/admin/shared/DataTable';
import { apiClient } from '../../api/client';
import { Eye } from 'lucide-react';
import toast from 'react-hot-toast';

interface Refund {
  id: string;
  payment_id: string;
  order_id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'approved' | 'rejected' | 'processed';
  reason: string;
  created_at: string;
  customer_name: string;
}

export const Refunds = () => {
  const [refunds, setRefunds] = useState<Refund[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 1
  });

  const fetchRefunds = async (params: { page: number; limit: number }) => {
    setLoading(true);
    try {
      const response = await apiClient.get('/admin/refunds', { params });
      setRefunds(response.data?.items || []);
      setPagination({
        page: response.data?.page || 1,
        limit: response.data?.limit || 10,
        total: response.data?.total || 0,
        pages: response.data?.pages || 1
      });
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch refunds');
      toast.error('Failed to load refunds');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRefunds({ page: 1, limit: 10 });
  }, []);

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD'
    }).format(amount);
  };

  const columns = [
    { key: 'id', label: 'Refund ID', width: '120px' },
    { key: 'payment_id', label: 'Payment ID', width: '120px' },
    { key: 'order_id', label: 'Order ID', width: '100px' },
    { key: 'customer_name', label: 'Customer', width: '150px' },
    { 
      key: 'amount', 
      label: 'Amount', 
      width: '100px',
      render: (value: number, row: Refund) => formatCurrency(value, row.currency)
    },
    { 
      key: 'status', 
      label: 'Status', 
      width: '100px',
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'processed' ? 'bg-green-100 text-green-800' :
          value === 'pending' ? 'bg-yellow-100 text-yellow-800' :
          value === 'approved' ? 'bg-green-100 text-green-800' :
          value === 'rejected' ? 'bg-red-100 text-red-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {value}
        </span>
      )
    },
    { key: 'reason', label: 'Reason', width: '200px' },
    { 
      key: 'created_at', 
      label: 'Date', 
      width: '150px',
      render: (value: string) => new Date(value).toLocaleDateString()
    }
  ];

  const handleView = (refund: Refund) => {
    toast.success(`Viewing refund ${refund.id}`);
  };

  return (
    <AdminPageLayout title="Refunds">
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Refunds</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{pagination.total}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">Processed</p>
            <p className="text-2xl font-bold text-green-600">
              {refunds.filter(r => r.status === 'processed').length}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">
              {refunds.filter(r => r.status === 'pending').length}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">Rejected</p>
            <p className="text-2xl font-bold text-red-600">
              {refunds.filter(r => r.status === 'rejected').length}
            </p>
          </div>
        </div>

        {/* Refunds Table */}
        <AdminDataTable
          data={refunds}
          columns={columns}
          loading={loading}
          error={error}
          pagination={pagination}
          fetchData={fetchRefunds}
          onView={handleView}
          searchPlaceholder="Search refunds..."
          emptyMessage="No refunds found"
        />
      </div>
    </AdminPageLayout>
  );
};

export default Refunds;
