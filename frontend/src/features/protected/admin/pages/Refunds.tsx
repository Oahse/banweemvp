import React, { useEffect, useState, useCallback } from 'react';
import { Loader, AlertCircle, ChevronLeft, ChevronRight, SearchIcon, DownloadIcon, ArrowUpDownIcon, EyeIcon, CreditCardIcon } from 'lucide-react';
import AdminAPI from '@/api/admin';
import toast from 'react-hot-toast';
import { useTheme } from '@/components/shared/contexts/ThemeContext';
import Dropdown from '@/components/ui/Dropdown';
import { AdminLayout } from '@/components/layout/Layout';

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
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [viewingRefund, setViewingRefund] = useState<Refund | null>(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [adminNotes, setAdminNotes] = useState('');

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
    const fetchRefunds = async () => {
      try {
        if (page === 1 && !searchQuery && !statusFilter) {
          setInitialLoading(true);
        } else {
          setLoading(true);
        }
        setError(null);
        console.log('Fetching refunds with params:', {
          page,
          limit: LIMIT,
          search: debouncedSearchQuery || undefined,
          status: statusFilter || undefined,
          sort_by: sortBy,
          sort_order: sortOrder
        });
        
        // For now, we'll use the existing API and handle pagination on frontend
        const response = await AdminAPI.getRefunds({
          page,
          limit: LIMIT,
          search: debouncedSearchQuery || undefined,
          status: statusFilter || undefined,
          sort_by: sortBy,
          sort_order: sortOrder
        });
        
        // Handle response format
        const data = response?.data?.data || response?.data;
        const allRefunds = Array.isArray(data) ? data : data?.items || [];
        
        // Apply client-side filtering and sorting if needed
        let filteredRefunds = allRefunds;
        
        // Apply search filter
        if (debouncedSearchQuery) {
          filteredRefunds = filteredRefunds.filter((refund: any) =>
            refund.id.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
            refund.order_id.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
            refund.customer_name?.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
            refund.reason?.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
          );
        }
        
        // Apply status filter
        if (statusFilter) {
          filteredRefunds = filteredRefunds.filter((refund: any) => refund.status === statusFilter);
        }
        
        // Apply sorting
        if (sortBy === 'created_at') {
          filteredRefunds.sort((a: any, b: any) => {
            const aDate = new Date(a.created_at || 0);
            const bDate = new Date(b.created_at || 0);
            return sortOrder === 'asc' 
              ? aDate.getTime() - bDate.getTime()
              : bDate.getTime() - aDate.getTime();
          });
        } else if (sortBy === 'amount') {
          filteredRefunds.sort((a: any, b: any) => {
            return sortOrder === 'asc' 
              ? a.amount - b.amount
              : b.amount - a.amount;
          });
        } else if (sortBy === 'customer_name') {
          filteredRefunds.sort((a: any, b: any) => {
            const aName = (a.customer_name || '').toLowerCase();
            const bName = (b.customer_name || '').toLowerCase();
            return sortOrder === 'asc' 
              ? aName.localeCompare(bName)
              : bName.localeCompare(aName);
          });
        } else if (sortBy === 'status') {
          filteredRefunds.sort((a: any, b: any) => {
            const aStatus = (a.status || '').toLowerCase();
            const bStatus = (b.status || '').toLowerCase();
            return sortOrder === 'asc'
              ? aStatus.localeCompare(bStatus)
              : bStatus.localeCompare(aStatus);
          });
        }
        
        const total = filteredRefunds.length;
        const pages = Math.max(1, Math.ceil(total / LIMIT));
        const startIndex = (page - 1) * LIMIT;
        const endIndex = startIndex + LIMIT;
        const paginatedRefunds = filteredRefunds.slice(startIndex, endIndex);
        
        setRefunds(paginatedRefunds);
        setPagination({
          page: page,
          limit: LIMIT,
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

    fetchRefunds();
  }, [page, debouncedSearchQuery, statusFilter, sortBy, sortOrder]);

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
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

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
    setShowDetailsModal(true);
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <AdminLayout>
    <div className={`space-y-6 ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl lg:text-2xl font-semibold">Refunds Management</h1>
          <p className={`mt-1 text-xs lg:text-sm ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Manage refund requests and processing</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className={`p-4 rounded-lg border ${currentTheme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="flex flex-col gap-4">
          <div className="flex-1">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search refunds..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-10 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-sm ${
                  currentTheme === 'dark' 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
              {searchQuery !== debouncedSearchQuery && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Dropdown
              options={[
                { value: '', label: 'All Status' },
                { value: 'requested', label: 'Requested' },
                { value: 'pending_review', label: 'Pending Review' },
                { value: 'approved', label: 'Approved' },
                { value: 'rejected', label: 'Rejected' },
                { value: 'processing', label: 'Processing' },
                { value: 'completed', label: 'Completed' },
                { value: 'failed', label: 'Failed' },
                { value: 'cancelled', label: 'Cancelled' }
              ]}
              value={statusFilter}
              onChange={setStatusFilter}
              placeholder="All Status"
              className="min-w-[120px]"
            />
            
            <Dropdown
              options={[
                { value: 'created_at', label: 'Created' },
                { value: 'amount', label: 'Amount' },
                { value: 'customer_name', label: 'Customer' },
                { value: 'status', label: 'Status' }
              ]}
              value={sortBy}
              onChange={setSortBy}
              placeholder="Sort by"
              className="min-w-[120px]"
            />
            
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className={`inline-flex items-center gap-1 px-2 py-1.5 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-sm font-medium ${
                currentTheme === 'dark' 
                  ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-700' 
                  : 'bg-white border-gray-300 text-gray-900 hover:bg-gray-50'
              }`}
            >
              <ArrowUpDownIcon size={16} />
              <span className="hidden sm:inline">{sortOrder === 'asc' ? 'A-Z' : 'Z-A'}</span>
              <span className="sm:hidden">{sortOrder === 'asc' ? '↑' : '↓'}</span>
            </button>
          </div>

          {/* Active Filters */}
          {(debouncedSearchQuery || statusFilter) && (
            <div className="flex items-center gap-2 pt-2 border-t border-gray-200 dark:border-gray-600">
              <span className="text-sm text-gray-600 dark:text-gray-400">Active filters:</span>
              {debouncedSearchQuery && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                  Search: "{debouncedSearchQuery}"
                  <button
                    onClick={() => setSearchQuery('')}
                    className="ml-1 hover:text-primary-dark"
                  >
                    ×
                  </button>
                </span>
              )}
              {statusFilter && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                  Status: {statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}
                  <button
                    onClick={() => setStatusFilter('')}
                    className="ml-1 hover:text-primary-dark"
                  >
                    ×
                  </button>
                </span>
              )}
              <button
                onClick={() => {
                  setSearchQuery('');
                  setStatusFilter('');
                }}
                className="text-xs text-primary hover:text-primary-dark underline"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className={`p-4 rounded-lg border flex items-start gap-3 ${
          currentTheme === 'dark' 
            ? 'bg-red-900/20 border-red-800 text-red-200' 
            : 'bg-red-50 border-red-200 text-red-800'
        }`}>
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Error</p>
            <p className="text-sm">{error}</p>
          </div>
        </div>
      )}

      <div className={`rounded-lg border overflow-hidden ${currentTheme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className={`p-4 lg:p-6 border-b ${currentTheme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
          <h2 className="text-base lg:text-lg font-semibold">All Refunds</h2>
        </div>

        {refunds.length > 0 ? (
          <>
            {/* Desktop table */}
            <div className="overflow-x-auto hidden md:block">
              <table className="w-full">
                <thead className={`${currentTheme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} border-b ${currentTheme === 'dark' ? 'border-gray-600' : 'border-gray-200'}`}>
                  <tr>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-semibold">Refund ID</th>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-semibold">Order ID</th>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-semibold">Customer</th>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-semibold">Amount</th>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-semibold">Status</th>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-semibold">Reason</th>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-semibold">Date</th>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {refunds.map((refund: any) => (
                    <tr
                      key={refund.id}
                      onClick={() => handleView(refund)}
                      className={`border-b cursor-pointer ${currentTheme === 'dark' ? 'border-gray-700' : 'border-gray-200'} hover:${currentTheme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}
                    >
                      <td className={`px-4 lg:px-6 py-3 lg:py-4 text-xs lg:text-sm font-mono text-primary`}>{String(refund.id).slice(0, 8)}</td>
                      <td className={`px-4 lg:px-6 py-3 lg:py-4 text-xs lg:text-sm font-mono ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{String(refund.order_id).slice(0, 8)}</td>
                      <td className={`px-4 lg:px-6 py-3 lg:py-4 text-xs lg:text-sm font-medium ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{refund.customer_name || 'N/A'}</td>
                      <td className={`px-4 lg:px-6 py-3 lg:py-4 text-xs lg:text-sm font-mono font-semibold ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{formatCurrency(refund.amount, refund.currency)}</td>
                      <td className="px-4 lg:px-6 py-3 lg:py-4 text-xs lg:text-sm">{statusBadge(refund.status)}</td>
                      <td className={`px-4 lg:px-6 py-3 lg:py-4 text-xs lg:text-sm ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{refund.reason || 'No reason provided'}</td>
                      <td className={`px-4 lg:px-6 py-3 lg:py-4 text-xs lg:text-sm ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{new Date(refund.created_at || '').toLocaleDateString()}</td>
                      <td className="px-4 lg:px-6 py-3 lg:py-4 text-xs lg:text-sm">
                        <div className="flex gap-1 lg:gap-2">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleView(refund);
                            }}
                            className="inline-flex items-center gap-1 px-2 py-1 bg-primary text-white rounded hover:bg-primary-dark transition-colors"
                          >
                            <EyeIcon size={14} className="hidden sm:block" />
                            <span className="sm:hidden">View</span>
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleView(refund);
                            }}
                            className="inline-flex items-center gap-1 px-2 py-1 bg-success text-white rounded hover:bg-success/90 transition-colors"
                          >
                            <CreditCardIcon size={14} className="hidden sm:block" />
                            <span className="sm:hidden">Process</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className={`md:hidden divide-y ${currentTheme === 'dark' ? 'divide-gray-700' : 'divide-gray-200'}`}>
              {refunds.map((refund: any) => (
                <div
                  key={refund.id}
                  onClick={() => handleView(refund)}
                  className={`p-3 lg:p-4 flex flex-col gap-2 cursor-pointer ${currentTheme === 'dark' ? 'bg-gray-800' : 'bg-white'} ${currentTheme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} transition`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs lg:text-sm font-mono text-primary">{String(refund.id).slice(0, 8)}</span>
                    {statusBadge(refund.status)}
                  </div>
                  <div className={`text-sm lg:text-base font-medium ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{refund.customer_name || 'N/A'}</div>
                  <div className={`text-xs lg:text-sm ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Order: {String(refund.order_id).slice(0, 8)}</div>
                  <div className={`text-xs lg:text-sm font-mono font-semibold ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{formatCurrency(refund.amount, refund.currency)}</div>
                  <div className={`text-xs lg:text-sm ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{refund.reason || 'No reason provided'}</div>
                  <div className={`text-xs lg:text-sm ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{new Date(refund.created_at || '').toLocaleDateString()}</div>
                  <div className="flex gap-1 lg:gap-2 mt-2">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleView(refund);
                      }}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-primary text-white rounded hover:bg-primary-dark transition-colors text-xs"
                    >
                      <EyeIcon size={14} />
                      View
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleView(refund);
                      }}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-success text-white rounded hover:bg-success/90 transition-colors text-xs"
                    >
                      <CreditCardIcon size={14} />
                      Process
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className={`p-6 text-center ${currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>No refunds found</div>
        )}

        {/* Pagination - Always visible */}
        <div className={`px-4 lg:px-6 py-4 border-t ${currentTheme === 'dark' ? 'border-gray-700' : 'border-gray-200'} flex flex-col sm:flex-row items-center justify-between gap-4`}>
          <p className={`text-xs lg:text-sm ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            {pagination.total > 0
              ? `Showing ${(pagination.page - 1) * pagination.limit + 1}–${Math.min(pagination.page * pagination.limit, pagination.total)} of ${pagination.total} items`
              : `Total: ${pagination.total} items`
            }
            {pagination.total > 0 && pagination.pages > 1 && ` (Page ${pagination.page} of ${pagination.pages || 1})`}
          </p>
          <div className="flex items-center gap-1">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className={`inline-flex items-center gap-1 px-2 lg:px-3 py-2 rounded-lg border text-xs lg:text-sm font-medium transition-colors ${
                  currentTheme === 'dark' 
                    ? 'border-gray-600 bg-gray-800 text-white hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed' 
                    : 'border-gray-300 bg-white text-gray-900 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
                }`}
              >
                <ChevronLeft className="w-3 h-3 lg:w-4 lg:h-4" />
                <span className="hidden sm:inline">Previous</span>
              </button>
              
              {/* Page numbers */}
              <div className="flex items-center gap-1 mx-1 lg:mx-2">
                {Array.from({ length: Math.min(5, Math.max(1, pagination.pages || 1)) }, (_, i) => {
                  let pageNum;
                  if (pagination.pages <= 5) {
                    pageNum = i + 1;
                  } else if (page <= 3) {
                    pageNum = i + 1;
                  } else if (page >= pagination.pages - 2) {
                    pageNum = pagination.pages - 4 + i;
                  } else {
                    pageNum = page - 2 + i;
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setPage(pageNum)}
                      className={`w-6 h-6 lg:w-8 lg:h-8 rounded-md text-xs lg:text-sm font-medium transition-colors ${
                        pageNum === page
                          ? 'bg-primary text-white'
                          : currentTheme === 'dark'
                            ? 'text-gray-300 hover:bg-gray-700 border border-gray-600'
                            : 'text-gray-700 hover:bg-gray-50 border border-gray-300'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              
              <button
                onClick={() => setPage((p) => Math.min(pagination.pages || 1, p + 1))}
                disabled={page >= (pagination.pages || 1)}
                className={`inline-flex items-center gap-1 px-2 lg:px-3 py-2 rounded-lg border text-xs lg:text-sm font-medium transition-colors ${
                  currentTheme === 'dark' 
                    ? 'border-gray-600 bg-gray-800 text-white hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed' 
                    : 'border-gray-300 bg-white text-gray-900 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
                }`}
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="w-3 h-3 lg:w-4 lg:h-4" />
              </button>
          </div>
        </div>
      </div>

      {showDetailsModal && viewingRefund && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setShowDetailsModal(false)}>
          <div className={`w-full max-w-4xl rounded-xl p-6 shadow-xl ${currentTheme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`} onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">Refund Details</h3>
                <p className={`text-sm ${currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  {viewingRefund.refund_number || viewingRefund.id}
                </p>
              </div>
              <button
                onClick={() => setShowDetailsModal(false)}
                className={`p-1 rounded-lg transition-colors ${currentTheme === 'dark' ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'}`}
              >
                <span className="text-xl">×</span>
              </button>
            </div>

            {detailsLoading ? (
              <div className="flex items-center justify-center py-10">
                <Loader className="w-8 h-8 text-primary animate-spin" />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className={`font-medium ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Customer</p>
                    <p>{viewingRefund.customer_name || 'N/A'}</p>
                  </div>
                  <div>
                    <p className={`font-medium ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Status</p>
                    {statusBadge(viewingRefund.status)}
                  </div>
                  <div>
                    <p className={`font-medium ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Order ID</p>
                    <p className="font-mono break-all">{viewingRefund.order_id}</p>
                  </div>
                  <div>
                    <p className={`font-medium ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Reason</p>
                    <p>{viewingRefund.reason || 'N/A'}</p>
                  </div>
                  <div>
                    <p className={`font-medium ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Refund Type</p>
                    <p>{viewingRefund.refund_type || 'N/A'}</p>
                  </div>
                  <div>
                    <p className={`font-medium ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Requested Amount</p>
                    <p className="font-mono">
                      {formatCurrency(viewingRefund.requested_amount ?? viewingRefund.amount, viewingRefund.currency)}
                    </p>
                  </div>
                  <div>
                    <p className={`font-medium ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Approved Amount</p>
                    <p className="font-mono">
                      {viewingRefund.approved_amount != null
                        ? formatCurrency(viewingRefund.approved_amount, viewingRefund.currency)
                        : '—'}
                    </p>
                  </div>
                  <div>
                    <p className={`font-medium ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Processed Amount</p>
                    <p className="font-mono">
                      {viewingRefund.processed_amount != null
                        ? formatCurrency(viewingRefund.processed_amount, viewingRefund.currency)
                        : '—'}
                    </p>
                  </div>
                  <div>
                    <p className={`font-medium ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Customer Reason</p>
                    <p>{viewingRefund.customer_reason || '—'}</p>
                  </div>
                  <div>
                    <p className={`font-medium ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Customer Notes</p>
                    <p>{viewingRefund.customer_notes || '—'}</p>
                  </div>
                </div>

                {viewingRefund.refund_items && viewingRefund.refund_items.length > 0 && (
                  <div className="border rounded-lg overflow-hidden">
                    <div className={`px-4 py-2 text-sm font-semibold ${currentTheme === 'dark' ? 'bg-gray-700 text-gray-200' : 'bg-gray-50 text-gray-700'}`}>
                      Refunded Items
                    </div>
                    <div className="divide-y">
                      {viewingRefund.refund_items.map((item) => (
                        <div key={item.id} className={`px-4 py-2 text-sm ${currentTheme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <span className="font-mono">{item.order_item_id}</span>
                            <span>Qty: {item.quantity_to_refund}</span>
                            <span className="font-mono">${item.total_refund_amount.toFixed(2)}</span>
                          </div>
                          {item.condition_notes && (
                            <p className={`mt-1 text-xs ${currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                              Notes: {item.condition_notes}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <label className={`block text-sm font-medium mb-2 ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    Admin Notes
                  </label>
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

            <div className="mt-6 flex flex-wrap justify-end gap-2">
              <button
                onClick={() => handleStatusUpdate(viewingRefund.id, 'approved')}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm font-medium"
              >
                Approve
              </button>
              <button
                onClick={() => handleStatusUpdate(viewingRefund.id, 'processing')}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                Mark Processing
              </button>
              <button
                onClick={() => handleStatusUpdate(viewingRefund.id, 'completed')}
                className="inline-flex items-center gap-2 px-4 py-2 bg-success text-white rounded-lg hover:bg-success/90 transition-colors text-sm font-medium"
              >
                Mark Completed
              </button>
              <button
                onClick={() => handleStatusUpdate(viewingRefund.id, 'rejected')}
                className="inline-flex items-center gap-2 px-4 py-2 bg-error text-white rounded-lg hover:bg-error/90 transition-colors text-sm font-medium"
              >
                Reject
              </button>
              <button
                onClick={() => setShowDetailsModal(false)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium ${currentTheme === 'dark' ? 'border-gray-600 text-gray-200 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </AdminLayout>
  );
};

export default Refunds;
