import React, { useState, useEffect } from 'react';
import { AdminPageLayout } from '../../components/admin/shared/PageLayout';
import { AdminDataTable } from '../../components/admin/shared/DataTable';
import { apiClient } from '../../api/client';
import { Eye } from 'lucide-react';
import toast from 'react-hot-toast';

interface Payment {
  id: string;
  order_id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  payment_method: string;
  created_at: string;
  customer_name: string;
}

export const Payments = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 1
  });

  const fetchPayments = async (params: { page: number; limit: number }) => {
    setLoading(true);
    try {
      const response = await apiClient.get('/admin/payments', { params });
      setPayments(response.data?.items || []);
      setPagination({
        page: response.data?.page || 1,
        limit: response.data?.limit || 10,
        total: response.data?.total || 0,
        pages: response.data?.pages || 1
      });
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch payments');
      toast.error('Failed to load payments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments({ page: 1, limit: 10 });
  }, []);

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD'
    }).format(amount);
  };

  const columns = [
    { key: 'id', label: 'Payment ID', width: '120px' },
    { key: 'order_id', label: 'Order ID', width: '100px' },
    { key: 'customer_name', label: 'Customer', width: '150px' },
    { 
      key: 'amount', 
      label: 'Amount', 
      width: '100px',
      render: (value: number, row: Payment) => formatCurrency(value, row.currency)
    },
    { key: 'payment_method', label: 'Method', width: '120px' },
    { 
      key: 'status', 
      label: 'Status', 
      width: '100px',
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'completed' ? 'bg-green-100 text-green-800' :
          value === 'pending' ? 'bg-yellow-100 text-yellow-800' :
          value === 'failed' ? 'bg-red-100 text-red-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {value}
        </span>
      )
    },
    { 
      key: 'created_at', 
      label: 'Date', 
      width: '150px',
      render: (value: string) => new Date(value).toLocaleDateString()
    }
  ];

  const handleView = (payment: Payment) => {
    toast.success(`Viewing payment ${payment.id}`);
  };

  return (
    <AdminPageLayout title="Payments">
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Payments</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{pagination.total}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">Completed</p>
            <p className="text-2xl font-bold text-green-600">
              {payments.filter(p => p.status === 'completed').length}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">
              {payments.filter(p => p.status === 'pending').length}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">Failed</p>
            <p className="text-2xl font-bold text-red-600">
              {payments.filter(p => p.status === 'failed').length}
            </p>
          </div>
        </div>

        {/* Payments Table */}
        <AdminDataTable
          data={payments}
          columns={columns}
          loading={loading}
          error={error}
          pagination={pagination}
          fetchData={fetchPayments}
          onView={handleView}
          searchPlaceholder="Search payments..."
          emptyMessage="No payments found"
        />
      </div>
    </AdminPageLayout>
  );
};

export default Payments;
