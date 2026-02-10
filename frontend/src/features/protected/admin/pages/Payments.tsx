import { useEffect, useState, useCallback } from 'react';
import { Loader, AlertCircle, PlusIcon, TrashIcon, SearchIcon, DownloadIcon, ArrowUpDownIcon, EyeIcon, CreditCardIcon, UserIcon, X } from 'lucide-react';
import AdminAPI from '@/api/admin';
import toast from 'react-hot-toast';
import { useTheme } from '@/components/shared/contexts/ThemeContext';
import Dropdown from '@/components/ui/Dropdown';
import AdminLayout from '@/components/layout/AdminLayout';
import { PaymentsListSkeleton } from '@/features/protected/admin/components/skeletons/PaymentsSkeleton';
import { Button } from '@/components/ui/Button';
import { Heading, Body, Text } from '@/components/ui/Text/Text';
import { Modal, ModalHeader, ModalBody, ModalFooter, useModal } from '@/components/ui/Modal';
import { AdminDataTable, AdminColumn, FilterConfig } from '@/components/shared/AdminDataTable';
import { Card } from '@/components/ui/Card';

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

const LIMIT = 10;

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export const Payments = () => {
  const { currentTheme } = useTheme();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const detailsModal = useModal();
  const [loading, setLoading] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<PaginationInfo>({ 
    page: 1, 
    limit: LIMIT, 
    total: 0, 
    pages: 0 
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300); // 300ms delay

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Reset to page 1 when filters change
  const resetPage = useCallback(() => {
    setPage(1);
  }, []);

  useEffect(() => {
    resetPage();
  }, [debouncedSearchQuery, statusFilter, sortBy, sortOrder, resetPage]);

  useEffect(() => {
    fetchData({
      page: 1,
      limit: LIMIT,
      search: '',
      sort_by: 'created_at',
      sort_order: 'desc'
    });
  }, []);

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD'
    }).format(amount);
  };

  const statusBadge = (status: string) => {
    const statusConfig = {
      completed: { bg: 'bg-success/20', text: 'text-success', label: 'Completed' },
      succeeded: { bg: 'bg-success/20', text: 'text-success', label: 'Completed' },
      pending: { bg: 'bg-warning/20', text: 'text-warning', label: 'Pending' },
      requires_action: { bg: 'bg-warning/20', text: 'text-warning', label: 'Pending' },
      requires_payment_method: { bg: 'bg-warning/20', text: 'text-warning', label: 'Pending' },
      failed: { bg: 'bg-error/20', text: 'text-error', label: 'Failed' },
      refunded: { bg: 'bg-gray-500/20', text: 'text-gray-500', label: 'Refunded' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    
    return (
      <Text className={`px-2 py-1 rounded-full text-sm font-semibold ${config.bg} ${config.text}`}>
        {config.label}
      </Text>
    );
  };

  const fetchData = async (params: any) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await AdminAPI.getPayments({
        page: params.page,
        limit: params.limit,
        search: params.search,
        status: params.filters?.status || undefined,
        sort_by: params.sort_by,
        sort_order: params.sort_order
      });
      
      const payload = response?.data?.data || response?.data;
      const allPayments = Array.isArray(payload)
        ? payload
        : payload?.data || payload?.items || [];
      
      let filteredPayments = allPayments;
      
      if (params.search) {
        filteredPayments = filteredPayments.filter((payment: any) =>
          payment.id.toLowerCase().includes(params.search.toLowerCase()) ||
          payment.order_id.toLowerCase().includes(params.search.toLowerCase()) ||
          payment.customer_name?.toLowerCase().includes(params.search.toLowerCase()) ||
          payment.payment_method?.toLowerCase().includes(params.search.toLowerCase())
        );
      }
      
      if (params.filters?.status) {
        filteredPayments = filteredPayments.filter((payment: any) => payment.status === params.filters.status);
      }
      
      if (params.sort_by === 'created_at') {
        filteredPayments.sort((a: any, b: any) => {
          const aDate = new Date(a.created_at || 0);
          const bDate = new Date(b.created_at || 0);
          return params.sort_order === 'asc' 
            ? aDate.getTime() - bDate.getTime()
            : bDate.getTime() - aDate.getTime();
        });
      } else if (params.sort_by === 'amount') {
        filteredPayments.sort((a: any, b: any) => {
          return params.sort_order === 'asc' 
            ? a.amount - b.amount
            : b.amount - a.amount;
        });
      } else if (params.sort_by === 'customer_name') {
        filteredPayments.sort((a: any, b: any) => {
          const aName = (a.customer_name || '').toLowerCase();
          const bName = (b.customer_name || '').toLowerCase();
          return params.sort_order === 'asc' 
            ? aName.localeCompare(bName)
            : bName.localeCompare(aName);
        });
      }
      
      const total = filteredPayments.length;
      const pages = Math.max(1, Math.ceil(total / params.limit));
      const startIndex = (params.page - 1) * params.limit;
      const endIndex = startIndex + params.limit;
      const paginatedPayments = filteredPayments.slice(startIndex, endIndex);
      
      const normalizedPayments = paginatedPayments.map((payment: any) => {
        const rawStatus = (payment.status || '').toLowerCase();
        let normalizedStatus = rawStatus;

        if (rawStatus === 'succeeded') normalizedStatus = 'completed';
        if (rawStatus === 'requires_action' || rawStatus === 'requires_payment_method') {
          normalizedStatus = 'pending';
        }

        return {
          ...payment,
          status: normalizedStatus
        };
      });

      setPayments(normalizedPayments);
      setPagination({
        page: params.page,
        limit: params.limit,
        total: total,
        pages: pages
      });
      
    } catch (err: any) {
      const message = err?.response?.data?.message || 'Failed to load payments';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  };

  // Define columns for AdminDataTable
  const columns: AdminColumn<Payment>[] = [
    {
      key: 'id',
      label: 'Payment ID',
      render: (value: string) => (
        <Text className="font-mono text-primary">{String(value).slice(0, 8)}</Text>
      ),
    },
    {
      key: 'order_id',
      label: 'Order ID',
      render: (value: string) => (
        <Text className="font-mono">{String(value).slice(0, 8)}</Text>
      ),
    },
    {
      key: 'customer_name',
      label: 'Customer',
      sortable: true,
      render: (value: string) => (
        <Text weight="medium">{value || 'N/A'}</Text>
      ),
    },
    {
      key: 'amount',
      label: 'Amount',
      sortable: true,
      render: (value: number, row: Payment) => (
        <Text weight="semibold">{formatCurrency(value, row.currency)}</Text>
      ),
    },
    {
      key: 'payment_method',
      label: 'Payment Method',
      render: (value: string) => (
        <Text variant="body-sm">{value || 'N/A'}</Text>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (value: string) => statusBadge(value),
    },
    {
      key: 'created_at',
      label: 'Date',
      sortable: true,
      render: (value: string) => (
        <Text variant="body-sm">{new Date(value || '').toLocaleDateString()}</Text>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_: any, row: Payment) => (
        <Button
          onClick={() => {
            setSelectedPayment(row);
            detailsModal.open();
          }}
          variant="primary"
          size="sm"
          leftIcon={<EyeIcon size={14} />}
        >
          <span className="hidden sm:inline">View</span>
        </Button>
      ),
    },
  ];

  const filters: FilterConfig[] = [
    {
      key: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { value: '', label: 'All Status' },
        { value: 'pending', label: 'Pending' },
        { value: 'completed', label: 'Completed' },
        { value: 'failed', label: 'Failed' },
        { value: 'refunded', label: 'Refunded' }
      ],
      placeholder: 'All Status',
    },
  ];

  const handleDownloadCSV = () => {
    try {
      // Get all payments without pagination for CSV
      const allPayments = payments.map((payment: any) => ({
        'Payment ID': payment.id || 'N/A',
        'Order ID': payment.order_id || 'N/A',
        'Customer': payment.customer_name || 'N/A',
        'Amount': formatCurrency(payment.amount, payment.currency),
        'Payment Method': payment.payment_method || 'N/A',
        'Status': payment.status,
        'Created At': new Date(payment.created_at || '').toLocaleDateString()
      }));

      // Create CSV content
      const headers = Object.keys(allPayments[0] || {});
      const csvContent = [
        headers.join(','),
        ...allPayments.map((item: any) => {
          return headers.map(header => {
            const value = item[header];
            return typeof value === 'string' && value.includes(',') 
              ? `"${value}"` 
              : value;
          }).join(',');
        })
      ].join('\n');

      // Create and download CSV file
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `payments-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      toast.success('Payments downloaded successfully');
    } catch (error: any) {
      toast.error('Failed to download payments');
    }
  };

  const handleView = (payment: Payment) => {
    setSelectedPayment(payment);
    detailsModal.open();
  };

  if (loading) {
    return (
      <AdminLayout>
        <PaymentsListSkeleton />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
    <div className={`space-y-3 ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-1">
        <div>
          <Body className={`mt-1 text-sm lg:text-sm ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Manage payment transactions and processing</Body>
        </div>
      </div>

      <AdminDataTable
        data={payments}
        loading={loading}
        error={error}
        pagination={pagination}
        columns={columns}
        fetchData={fetchData}
        searchPlaceholder="Search payments..."
        filters={filters}
        exportable={true}
        emptyMessage="No payments found"
        responsive="cards"
        limit={LIMIT}
      />

      <Modal isOpen={detailsModal.isOpen} onClose={detailsModal.close} size="md">
        <ModalHeader>Payment Details</ModalHeader>
        <ModalBody>
          {selectedPayment && (
            <div className="space-y-2 text-sm">
              <div><strong>ID:</strong> {selectedPayment.id}</div>
              <div><strong>Order ID:</strong> {selectedPayment.order_id || 'N/A'}</div>
              <div><strong>Customer:</strong> {selectedPayment.customer_name || 'N/A'}</div>
              <div><strong>Amount:</strong> {formatCurrency(selectedPayment.amount, selectedPayment.currency)}</div>
              <div><strong>Method:</strong> {selectedPayment.payment_method || 'N/A'}</div>
              <div><strong>Status:</strong> {selectedPayment.status}</div>
              <div><strong>Date:</strong> {selectedPayment.created_at ? new Date(selectedPayment.created_at).toLocaleString() : 'N/A'}</div>
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button onClick={detailsModal.close} variant="secondary" size="sm">
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
    </AdminLayout>
  );
};

export default Payments;
