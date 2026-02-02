import React, { useEffect, useState, useCallback } from 'react';
import { Loader, AlertCircle, PlusIcon, EditIcon, TrashIcon, ChevronLeft, ChevronRight, SearchIcon, DownloadIcon, ArrowUpDownIcon, EyeIcon, CreditCardIcon, UserIcon } from 'lucide-react';
import AdminAPI from '../../api/admin';
import toast from 'react-hot-toast';
import { useTheme } from '../../store/ThemeContext';
import Dropdown from '../../components/ui/Dropdown';

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
    const fetchPayments = async () => {
      try {
        if (page === 1 && !searchQuery && !statusFilter) {
          setInitialLoading(true);
        } else {
          setLoading(true);
        }
        setError(null);
        console.log('Fetching payments with params:', {
          page,
          limit: LIMIT,
          search: debouncedSearchQuery || undefined,
          status: statusFilter || undefined,
          sort_by: sortBy,
          sort_order: sortOrder
        });
        
        // For now, we'll use the existing API and handle pagination on frontend
        const response = await AdminAPI.getPayments({
          page,
          limit: LIMIT,
          search: debouncedSearchQuery || undefined,
          status: statusFilter || undefined,
          sort_by: sortBy,
          sort_order: sortOrder
        });
        
        // Handle response format
        const data = response?.data?.data || response?.data;
        const allPayments = Array.isArray(data) ? data : data?.items || [];
        
        // Apply client-side filtering and sorting if needed
        let filteredPayments = allPayments;
        
        // Apply search filter
        if (debouncedSearchQuery) {
          filteredPayments = filteredPayments.filter((payment: any) =>
            payment.id.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
            payment.order_id.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
            payment.customer_name?.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
            payment.payment_method?.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
          );
        }
        
        // Apply status filter
        if (statusFilter) {
          filteredPayments = filteredPayments.filter((payment: any) => payment.status === statusFilter);
        }
        
        // Apply sorting
        if (sortBy === 'created_at') {
          filteredPayments.sort((a: any, b: any) => {
            const aDate = new Date(a.created_at || 0);
            const bDate = new Date(b.created_at || 0);
            return sortOrder === 'asc' 
              ? aDate.getTime() - bDate.getTime()
              : bDate.getTime() - aDate.getTime();
          });
        } else if (sortBy === 'amount') {
          filteredPayments.sort((a: any, b: any) => {
            return sortOrder === 'asc' 
              ? a.amount - b.amount
              : b.amount - a.amount;
          });
        } else if (sortBy === 'customer_name') {
          filteredPayments.sort((a: any, b: any) => {
            const aName = (a.customer_name || '').toLowerCase();
            const bName = (b.customer_name || '').toLowerCase();
            return sortOrder === 'asc' 
              ? aName.localeCompare(bName)
              : bName.localeCompare(aName);
          });
        }
        
        const total = filteredPayments.length;
        const pages = Math.max(1, Math.ceil(total / LIMIT));
        const startIndex = (page - 1) * LIMIT;
        const endIndex = startIndex + LIMIT;
        const paginatedPayments = filteredPayments.slice(startIndex, endIndex);
        
        setPayments(paginatedPayments);
        setPagination({
          page: page,
          limit: LIMIT,
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

    fetchPayments();
  }, [page, debouncedSearchQuery, statusFilter, sortBy, sortOrder]);

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD'
    }).format(amount);
  };

  const statusBadge = (status: string) => {
    const statusConfig = {
      completed: { bg: 'bg-success/20', text: 'text-success', label: 'Completed' },
      pending: { bg: 'bg-warning/20', text: 'text-warning', label: 'Pending' },
      failed: { bg: 'bg-error/20', text: 'text-error', label: 'Failed' },
      refunded: { bg: 'bg-gray-500/20', text: 'text-gray-500', label: 'Refunded' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

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
    toast.success(`Viewing payment ${payment.id}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl lg:text-2xl font-semibold">Payments Management</h1>
          <p className={`mt-1 text-xs lg:text-sm ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Manage payment transactions and processing</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className={`p-4 rounded-lg border ${currentTheme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="flex flex-col gap-4">
          <div className="flex-1">
            <div className="relative">
              <SearchIcon className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${currentTheme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} size={18} />
              <input
                type="text"
                placeholder="Search payments..."
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
                { value: 'pending', label: 'Pending' },
                { value: 'completed', label: 'Completed' },
                { value: 'failed', label: 'Failed' },
                { value: 'refunded', label: 'Refunded' }
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
                { value: 'payment_method', label: 'Payment Method' }
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
          <h2 className="text-base lg:text-lg font-semibold">All Payments</h2>
        </div>

        {payments.length > 0 ? (
          <>
            {/* Desktop table */}
            <div className="overflow-x-auto hidden md:block">
              <table className="w-full">
                <thead className={`${currentTheme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} border-b ${currentTheme === 'dark' ? 'border-gray-600' : 'border-gray-200'}`}>
                  <tr>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-semibold">Payment ID</th>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-semibold">Order ID</th>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-semibold">Customer</th>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-semibold">Amount</th>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-semibold">Method</th>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-semibold">Status</th>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-semibold">Date</th>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment: any) => (
                    <tr key={payment.id} className={`border-b ${currentTheme === 'dark' ? 'border-gray-700' : 'border-gray-200'} hover:${currentTheme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <td className={`px-4 lg:px-6 py-3 lg:py-4 text-xs lg:text-sm font-mono text-primary`}>{String(payment.id).slice(0, 8)}</td>
                      <td className={`px-4 lg:px-6 py-3 lg:py-4 text-xs lg:text-sm font-mono ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{String(payment.order_id).slice(0, 8)}</td>
                      <td className={`px-4 lg:px-6 py-3 lg:py-4 text-xs lg:text-sm font-medium ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{payment.customer_name || 'N/A'}</td>
                      <td className={`px-4 lg:px-6 py-3 lg:py-4 text-xs lg:text-sm font-mono font-semibold ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{formatCurrency(payment.amount, payment.currency)}</td>
                      <td className={`px-4 lg:px-6 py-3 lg:py-4 text-xs lg:text-sm ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{payment.payment_method || 'N/A'}</td>
                      <td className="px-4 lg:px-6 py-3 lg:py-4 text-xs lg:text-sm">{statusBadge(payment.status)}</td>
                      <td className={`px-4 lg:px-6 py-3 lg:py-4 text-xs lg:text-sm ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{new Date(payment.created_at || '').toLocaleDateString()}</td>
                      <td className="px-4 lg:px-6 py-3 lg:py-4 text-xs lg:text-sm">
                        <div className="flex gap-1 lg:gap-2">
                          <button 
                            onClick={() => handleView(payment)}
                            className="inline-flex items-center gap-1 px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                          >
                            <EyeIcon size={14} className="hidden sm:block" />
                            <span className="sm:hidden">View</span>
                          </button>
                          <button className="inline-flex items-center gap-1 px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                            <EditIcon size={14} className="hidden sm:block" />
                            <span className="sm:hidden">Edit</span>
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
              {payments.map((payment: any) => (
                <div
                  key={payment.id}
                  className={`p-3 lg:p-4 flex flex-col gap-2 ${currentTheme === 'dark' ? 'bg-gray-800' : 'bg-white'} ${currentTheme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} transition`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs lg:text-sm font-mono text-primary">{String(payment.id).slice(0, 8)}</span>
                    {statusBadge(payment.status)}
                  </div>
                  <div className={`text-sm lg:text-base font-medium ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{payment.customer_name || 'N/A'}</div>
                  <div className={`text-xs lg:text-sm ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Order: {String(payment.order_id).slice(0, 8)}</div>
                  <div className={`text-xs lg:text-sm font-mono font-semibold ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{formatCurrency(payment.amount, payment.currency)}</div>
                  <div className={`text-xs lg:text-sm ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{payment.payment_method || 'N/A'}</div>
                  <div className={`text-xs lg:text-sm ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{new Date(payment.created_at || '').toLocaleDateString()}</div>
                  <div className="flex gap-1 lg:gap-2 mt-2">
                    <button 
                      onClick={() => handleView(payment)}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-xs"
                    >
                      <EyeIcon size={14} />
                      View
                    </button>
                    <button className="inline-flex items-center gap-1 px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-xs">
                      <EditIcon size={14} />
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>

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
          </>
        ) : (
          <>
            <div className={`p-6 text-center ${currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>No payments found</div>
            
            {/* Pagination even with no data */}
            <div className={`px-6 py-4 border-t ${currentTheme === 'dark' ? 'border-gray-700' : 'border-gray-200'} flex flex-col sm:flex-row items-center justify-between gap-4`}>
              <p className={`text-xs lg:text-sm ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                Total: 0 items
              </p>
              <div className="flex items-center gap-1">
                <button
                  disabled
                  className={`inline-flex items-center gap-1 px-2 lg:px-3 py-2 rounded-lg border text-xs lg:text-sm font-medium transition-colors opacity-50 cursor-not-allowed ${
                    currentTheme === 'dark' 
                      ? 'border-gray-600 bg-gray-800 text-white' 
                      : 'border-gray-300 bg-white text-gray-900'
                  }`}
                >
                  <ChevronLeft className="w-3 h-3 lg:w-4 lg:h-4" />
                  <span className="hidden sm:inline">Previous</span>
                </button>
                
                <div className="flex items-center gap-1 mx-1 lg:mx-2">
                  <button
                    disabled
                    className={`w-6 h-6 lg:w-8 lg:h-8 rounded-md text-xs lg:text-sm font-medium bg-primary text-white`}
                  >
                    1
                  </button>
                </div>
                
                <button
                  disabled
                  className={`inline-flex items-center gap-1 px-2 lg:px-3 py-2 rounded-lg border text-xs lg:text-sm font-medium transition-colors opacity-50 cursor-not-allowed ${
                    currentTheme === 'dark' 
                      ? 'border-gray-600 bg-gray-800 text-white' 
                      : 'border-gray-300 bg-white text-gray-900'
                  }`}
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight className="w-3 h-3 lg:w-4 lg:h-4" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Payments;
