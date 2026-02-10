import { useEffect, useState, useCallback } from 'react';
import { AlertCircle, SearchIcon, DownloadIcon, ArrowUpDownIcon, EyeIcon, CreditCardIcon, X } from 'lucide-react';
import AnimatedLoader from '@/components/ui/AnimatedLoader';
import AdminAPI from '@/api/admin';
import toast from 'react-hot-toast';
import { useTheme } from '@/components/shared/contexts/ThemeContext';
import { RefundsListSkeleton } from '@/features/protected/admin/components/skeletons/RefundsSkeleton';
import { Button } from '@/components/ui/Button';
import { Heading, Body, Text as TextComponent, Label } from '@/components/ui/Text/Text';
import { Modal, ModalHeader, ModalBody, ModalFooter, useModal } from '@/components/ui/Modal';
import { AdminDataTable, AdminColumn, FilterConfig } from '@/components/shared/AdminDataTable';
import { Card } from '@/components/ui/Card';

const LIMIT = 10;

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

interface Refund {
  id: string;
  payment_id: string;
  order_id: string;
  amount: number;
  currency: string;
  status: string;
  reason: string;
  created_at: string;
  customer_name: string;
  refund_number?: string;
  refund_type?: string;
  requested_amount?: number;
  approved_amount?: number;
  processed_amount?: number;
  customer_reason?: string;
  customer_notes?: string;
  admin_notes?: string;
  reviewed_at?: string;
  approved_at?: string;
  processed_at?: string;
  completed_at?: string;
  refund_metadata?: Record<string, any>;
  refund_items?: RefundItem[];
}

interface RefundItem {
  id: string;
  order_item_id: string;
  quantity_to_refund: number;
  unit_price: number;
  total_refund_amount: number;
  condition_notes?: string;
}

export const Refunds = () => {
  const { currentTheme } = useTheme();
  const [refunds, setRefunds] = useState<Refund[]>([]);
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
  const detailsModal = useModal();
  const [viewingRefund, setViewingRefund] = useState<Refund | null>(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [adminNotes, setAdminNotes] = useState('');

  const fetchData = async (params: any) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await AdminAPI.getRefunds({
        page: params.page,
        limit: params.limit,
        search: params.search || undefined,
        status: params.filters?.status || undefined,
        sort_by: params.sort_by,
        sort_order: params.sort_order
      });
      
      const data = response?.data?.data || response?.data;
      const allRefunds = Array.isArray(data) ? data : data?.items || [];
      let filteredRefunds = allRefunds;
      
      if (params.search) {
        filteredRefunds = filteredRefunds.filter((refund: any) =>
          refund.id.toLowerCase().includes(params.search.toLowerCase()) ||
          refund.order_id.toLowerCase().includes(params.search.toLowerCase()) ||
          refund.customer_name?.toLowerCase().includes(params.search.toLowerCase()) ||
          refund.reason?.toLowerCase().includes(params.search.toLowerCase())
        );
      }
      
      if (params.filters?.status) {
        filteredRefunds = filteredRefunds.filter((refund: any) => refund.status === params.filters.status);
      }
      
      if (params.sort_by === 'created_at') {
        filteredRefunds.sort((a: any, b: any) => {
          const aDate = new Date(a.created_at || 0);
          const bDate = new Date(b.created_at || 0);
          return params.sort_order === 'asc' 
            ? aDate.getTime() - bDate.getTime()
            : bDate.getTime() - aDate.getTime();
        });
      } else if (params.sort_by === 'amount') {
        filteredRefunds.sort((a: any, b: any) => {
          return params.sort_order === 'asc' 
            ? a.amount - b.amount
            : b.amount - a.amount;
        });
      } else if (params.sort_by === 'customer_name') {
        filteredRefunds.sort((a: any, b: any) => {
          const aName = (a.customer_name || '').toLowerCase();
          const bName = (b.customer_name || '').toLowerCase();
          return params.sort_order === 'asc' 
            ? aName.localeCompare(bName)
            : bName.localeCompare(aName);
        });
      } else if (params.sort_by === 'status') {
        filteredRefunds.sort((a: any, b: any) => {
          const aStatus = (a.status || '').toLowerCase();
          const bStatus = (b.status || '').toLowerCase();
          return params.sort_order === 'asc'
            ? aStatus.localeCompare(bStatus)
            : bStatus.localeCompare(aStatus);
        });
      }
      
      const total = filteredRefunds.length;
      const pages = Math.max(1, Math.ceil(total / params.limit));
      const startIndex = (params.page - 1) * params.limit;
      const endIndex = startIndex + params.limit;
      const paginatedRefunds = filteredRefunds.slice(startIndex, endIndex);
      
      setRefunds(paginatedRefunds);
      setPagination({
        page: params.page,
        limit: params.limit,
        total: total,
        pages: pages
      });
    } catch (err: any) {
      const message = err?.response?.data?.message || 'Failed to load refunds';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD'
    }).format(amount);
  };

  const statusBadge = (status: string) => {
    const statusConfig = {
      requested: { bg: 'bg-warning/20', text: 'text-warning', label: 'Requested' },
      pending_review: { bg: 'bg-warning/20', text: 'text-warning', label: 'Pending Review' },
      approved: { bg: 'bg-primary/20', text: 'text-primary', label: 'Approved' },
      rejected: { bg: 'bg-error/20', text: 'text-error', label: 'Rejected' },
      processing: { bg: 'bg-blue-500/20', text: 'text-blue-500', label: 'Processing' },
      completed: { bg: 'bg-success/20', text: 'text-success', label: 'Completed' },
      failed: { bg: 'bg-error/20', text: 'text-error', label: 'Failed' },
      cancelled: { bg: 'bg-gray-500/20', text: 'text-gray-500', label: 'Cancelled' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.requested;
    
    return (
      <TextComponent className={`px-2 py-1 rounded-full font-semibold ${config.bg} ${config.text}`}>
        {config.label}
      </TextComponent>
    );
  };

  // Define columns for AdminDataTable
  const columns: AdminColumn<any>[] = [
    {
      key: 'id',
      label: 'Refund ID',
      render: (value: string) => (
        <TextComponent className="text-sm text-gray-900 dark:text-white font-mono">
          {String(value).slice(0, 8)}
        </TextComponent>
      ),
    },
    {
      key: 'order_id',
      label: 'Order ID',
      render: (value: string) => (
        <TextComponent className="text-sm text-gray-500 dark:text-gray-400 font-mono">
          {String(value).slice(0, 8)}
        </TextComponent>
      ),
    },
    {
      key: 'customer_name',
      label: 'Customer',
      render: (value: string) => (
        <TextComponent className="text-sm text-gray-900 dark:text-white">
          {value || 'N/A'}
        </TextComponent>
      ),
    },
    {
      key: 'amount',
      label: 'Amount',
      sortable: true,
      render: (value: number, row: any) => (
        <TextComponent className="text-sm text-gray-900 dark:text-white font-semibold">
          {formatCurrency(value, row.currency)}
        </TextComponent>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (value: string) => statusBadge(value),
    },
    {
      key: 'reason',
      label: 'Reason',
      render: (value: string) => (
        <TextComponent className="text-sm text-gray-500 dark:text-gray-400 truncate">
          {value || 'No reason provided'}
        </TextComponent>
      ),
    },
    {
      key: 'created_at',
      label: 'Date',
      sortable: true,
      render: (value: string) => (
        <TextComponent className="text-sm text-gray-500 dark:text-gray-400">
          {new Date(value || '').toLocaleDateString()}
        </TextComponent>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_: any, row: any) => (
        <Button 
          onClick={(e) => {
            e.stopPropagation();
            handleView(row);
          }}
          variant="primary"
          size="xs"
          leftIcon={<EyeIcon size={14} />}
        />
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
        { value: 'requested', label: 'Requested' },
        { value: 'pending_review', label: 'Pending Review' },
        { value: 'approved', label: 'Approved' },
        { value: 'rejected', label: 'Rejected' },
        { value: 'processing', label: 'Processing' },
        { value: 'completed', label: 'Completed' },
        { value: 'failed', label: 'Failed' },
        { value: 'cancelled', label: 'Cancelled' }
      ],
      placeholder: 'All Status',
    },
  ];

  const handleDownloadCSV = () => {
    try {
      // Get all refunds without pagination for CSV
      const allRefunds = refunds.map((refund: any) => ({
        'Refund ID': refund.id || 'N/A',
        'Order ID': refund.order_id || 'N/A',
        'Customer': refund.customer_name || 'N/A',
        'Amount': formatCurrency(refund.amount, refund.currency),
        'Status': refund.status,
        'Reason': refund.reason || 'N/A',
        'Created At': new Date(refund.created_at || '').toLocaleDateString()
      }));

      // Create CSV content
      const headers = Object.keys(allRefunds[0] || {});
      const csvContent = [
        headers.join(','),
        ...allRefunds.map((item: any) => {
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
      a.download = `refunds-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      toast.success('Refunds downloaded successfully');
    } catch (error: any) {
      toast.error('Failed to download refunds');
    }
  };

  const handleView = async (refund: Refund) => {
    setViewingRefund(refund);
    setAdminNotes(refund.admin_notes || '');
    detailsModal.open();
    setDetailsLoading(true);
    try {
      const response = await AdminAPI.getRefundDetails(refund.id);
      const data = response?.data?.data || response?.data;
      if (data) {
        setViewingRefund(data);
        setAdminNotes(data.admin_notes || '');
      }
    } catch (error: any) {
      toast.error('Failed to load refund details');
    } finally {
      setDetailsLoading(false);
    }
  };

  const handleStatusUpdate = async (refundId: string, status: string) => {
    const previous = refunds;
    setRefunds(prev => prev.map(refund =>
      refund.id === refundId ? { ...refund, status } : refund
    ));
    setViewingRefund(prev => (prev && prev.id === refundId ? { ...prev, status, admin_notes: adminNotes } : prev));

    try {
      const response = await AdminAPI.updateRefundStatus(refundId, status, adminNotes || undefined);
      const updated = response?.data?.data || response?.data;
      if (updated) {
        setRefunds(prev => prev.map(refund =>
          refund.id === refundId ? { ...refund, ...updated } : refund
        ));
        setViewingRefund(prev => (prev && prev.id === refundId ? { ...prev, ...updated } : prev));
      }
      toast.success('Refund status updated');
    } catch (error: any) {
      setRefunds(previous);
      toast.error('Failed to update refund status');
    }
  };

  useEffect(() => {
    fetchData({
      page: 1,
      limit: LIMIT,
      search: '',
      sort_by: 'created_at',
      sort_order: 'desc'
    });
  }, []);

  if (initialLoading) {
    return <RefundsListSkeleton />;
  }

  return (
      <div className={`space-y-3 ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <TextComponent variant="body-sm" tone={currentTheme === 'dark' ? 'secondary' : 'default'}>Manage refund requests and processing</TextComponent>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={handleDownloadCSV}
              variant="outline"
              size="xs"
              leftIcon={<DownloadIcon size={14} />}
            >
              Export CSV
            </Button>
          </div>
        </div>

        <AdminDataTable
          data={refunds}
          loading={loading}
          error={error}
          pagination={pagination}
          columns={columns}
          fetchData={fetchData}
          searchPlaceholder="Search refunds..."
          filters={filters}
          actions={
            <Button
              onClick={handleDownloadCSV}
              variant="outline"
              size="xs"
              leftIcon={<DownloadIcon size={14} />}
            >
              Export CSV
            </Button>
          }
          emptyMessage="No refunds found"
          responsive="cards"
          limit={LIMIT}
          onRowClick={handleView}
        />

        <Modal isOpen={detailsModal.isOpen} onClose={detailsModal.close} size="xl">
          <ModalHeader>
            <div>
              <Heading level={5} className="text-lg font-semibold">Refund Details</Heading>
              <Body className={`text-sm ${currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                {viewingRefund?.refund_number || viewingRefund?.id}
              </Body>
            </div>
          </ModalHeader>

          <ModalBody>
            {detailsLoading ? (
              <div className="flex items-center justify-center py-10">
                <AnimatedLoader size="sm" variant="spinner" color="primary" text="Loading details..." />
              </div>
            ) : viewingRefund && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <TextComponent className={`font-medium ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Customer</TextComponent>
                    <TextComponent>{viewingRefund.customer_name || 'N/A'}</TextComponent>
                  </div>
                  <div>
                    <TextComponent className={`font-medium ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Status</TextComponent>
                    {statusBadge(viewingRefund.status)}
                  </div>
                  <div>
                    <TextComponent className={`font-medium ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Order ID</TextComponent>
                    <TextComponent className="font-mono break-all">{viewingRefund.order_id}</TextComponent>
                  </div>
                  <div>
                    <TextComponent className={`font-medium ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Reason</TextComponent>
                    <TextComponent>{viewingRefund.reason || 'N/A'}</TextComponent>
                  </div>
                  <div>
                    <TextComponent className={`font-medium ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Refund Type</TextComponent>
                    <TextComponent>{viewingRefund.refund_type || 'N/A'}</TextComponent>
                  </div>
                  <div>
                    <TextComponent className={`font-medium ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Requested Amount</TextComponent>
                    <TextComponent className="font-mono">
                      {formatCurrency(viewingRefund.requested_amount ?? viewingRefund.amount, viewingRefund.currency)}
                    </TextComponent>
                  </div>
                  <div>
                    <TextComponent className={`font-medium ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Approved Amount</TextComponent>
                    <TextComponent className="font-mono">
                      {viewingRefund.approved_amount != null
                        ? formatCurrency(viewingRefund.approved_amount, viewingRefund.currency)
                        : '—'}
                    </TextComponent>
                  </div>
                  <div>
                    <TextComponent className={`font-medium ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Processed Amount</TextComponent>
                    <TextComponent className="font-mono">
                      {viewingRefund.processed_amount != null
                        ? formatCurrency(viewingRefund.processed_amount, viewingRefund.currency)
                        : '—'}
                    </TextComponent>
                  </div>
                  <div>
                    <TextComponent className={`font-medium ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Customer Reason</TextComponent>
                    <TextComponent>{viewingRefund.customer_reason || '—'}</TextComponent>
                  </div>
                  <div>
                    <TextComponent className={`font-medium ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Customer Notes</TextComponent>
                    <TextComponent>{viewingRefund.customer_notes || '—'}</TextComponent>
                  </div>
                </div>

                {viewingRefund.refund_items && viewingRefund.refund_items.length > 0 && (
                  <div className="border rounded-lg overflow-hidden">
                    <TextComponent className={`px-4 py-2 text-sm font-semibold ${currentTheme === 'dark' ? 'bg-gray-700 text-gray-200' : 'bg-gray-50 text-gray-700'}`}>
                      Refunded Items
                    </TextComponent>
                    <div className="divide-y">
                      {viewingRefund.refund_items.map((item) => (
                        <div key={item.id} className={`px-4 py-2 text-sm ${currentTheme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <TextComponent className="font-mono">{item.order_item_id}</TextComponent>
                            <TextComponent>Qty: {item.quantity_to_refund}</TextComponent>
                            <TextComponent className="font-mono">${item.total_refund_amount.toFixed(2)}</TextComponent>
                          </div>
                          {item.condition_notes && (
                            <Body className={`mt-1 text-sm ${currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                              Notes: {item.condition_notes}
                            </Body>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <Label className={`block text-sm font-medium mb-2 ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    Admin Notes
                  </Label>
                  <textarea
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    rows={3}
                    className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors ${
                      currentTheme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="Add internal notes..."
                  />
                </div>
              </div>
            )}
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={() => viewingRefund && handleStatusUpdate(viewingRefund.id, 'approved')}
              variant="primary"
              size="xs"
            >
              Approve
            </Button>
            <Button
              onClick={() => viewingRefund && handleStatusUpdate(viewingRefund.id, 'processing')}
              variant="primary"
              size="xs"
            >
              Mark Processing
            </Button>
            <Button
              onClick={() => viewingRefund && handleStatusUpdate(viewingRefund.id, 'completed')}
              variant="success"
              size="xs"
            >
              Mark Completed
            </Button>
            <Button
              onClick={() => viewingRefund && handleStatusUpdate(viewingRefund.id, 'rejected')}
              variant="danger"
              size="xs"
            >
              Reject
            </Button>
            <Button
              onClick={detailsModal.close}
              variant="outline"
              size="xs"
            >
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </div>
  );
};

export default Refunds;
