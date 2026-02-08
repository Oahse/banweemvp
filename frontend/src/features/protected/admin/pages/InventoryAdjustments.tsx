import React, { useEffect, useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import AdminLayoutSkeleton from '../components/skeletons/AdminLayoutSkeleton';
import { InventoryAdjustmentsSkeleton } from '../components/skeletons/InventorySkeleton';
import { Loader, AlertCircle, Plus, Filter, ChevronLeft, ChevronRight, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import AdminAPI from '@/api/admin';
import Dropdown from '@/components/ui/Dropdown';
import toast from 'react-hot-toast';
import { useTheme } from '@/components/shared/contexts/ThemeContext';

const LIMIT = 20;

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

interface InventoryAdjustment {
  id: string;
  inventory_id: string;
  adjustment_type: 'increase' | 'decrease' | 'transfer';
  quantity: number;
  reason: string;
  notes?: string;
  reference_number?: string;
  adjusted_by: string;
  adjusted_by_user?: {
    name: string;
    email: string;
  };
  product_variant?: {
    id: string;
    name: string;
    sku: string;
    product_name: string;
  };
  warehouse_location?: {
    id: string;
    name: string;
    code: string;
  };
  created_at: string;
}

export const AdminInventoryAdjustments = () => {
  const { currentTheme } = useTheme();
  const [adjustments, setAdjustments] = useState<InventoryAdjustment[]>([]);
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
  const [filters, setFilters] = useState({
    adjustment_type: '',
    date_from: '',
    date_to: '',
    search: ''
  });

  useEffect(() => {
    const fetchAdjustments = async () => {
      try {
        setLoading(true);
        if (page === 1 && !filters.adjustment_type && !filters.search) {
          setInitialLoading(true);
        }
        setError(null);
        const response = await AdminAPI.getAllStockAdjustments();
        const data = response?.data || response;
        setAdjustments(Array.isArray(data) ? data : []);
      } catch (err: any) {
        const message = err?.response?.data?.message || 'Failed to load inventory adjustments';
        setError(message);
        toast.error(message);
      } finally {
        setLoading(false);
        setInitialLoading(false);
      }
    };

    fetchAdjustments();
  }, [page, filters]);

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPage(1); // Reset to first page when filters change
  };

  const adjustmentTypeBadge = (type: string) => {
    const config = {
      increase: { icon: TrendingUp, color: 'text-success', bg: 'bg-success/10', label: 'Increase' },
      decrease: { icon: TrendingDown, color: 'text-error', bg: 'bg-error/10', label: 'Decrease' },
      transfer: { icon: Minus, color: 'text-blue-500', bg: 'bg-blue-500/10', label: 'Transfer' }
    };
    
    const { icon: Icon, color, bg, label } = config[type as keyof typeof config] || config.increase;
    
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${bg} ${color}`}>
        <Icon className="w-3 h-3" />
        {label}
      </span>
    );
  };

  const quantityBadge = (type: string, quantity: number) => {
    const colorClass = 
      type === 'increase' ? 'text-success' :
      type === 'decrease' ? 'text-error' :
      'text-blue-500';
    
    const sign = type === 'increase' ? '+' : type === 'decrease' ? '-' : '';
    
    return (
      <span className={`font-semibold ${colorClass}`}>
        {sign}{quantity}
      </span>
    );
  };

  if (initialLoading) {
    return <AdminLayoutSkeleton />;
  }

  return (
    <AdminLayout>
      <div className={`space-y-3 ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-1">
          <div>
            <h1 className="text-xl lg:text-2xl font-semibold">Inventory Adjustments</h1>
            <p className={`mt-1 text-xs lg:text-sm ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Track all inventory changes and adjustments</p>
          </div>
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm">
            <Plus className="w-4 h-4" />
            New Adjustment
          </button>
        </div>

        {/* Filters */}
        <div className={`rounded-lg border p-4 ${currentTheme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center gap-2 mb-4">
            <Filter className={`w-4 h-4 ${currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
            <h2 className="text-base font-semibold">Filters</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className={`block text-xs font-medium mb-1 ${currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Adjustment Type</label>
              <Dropdown
                options={[
                  { value: '', label: 'All Types' },
                  { value: 'increase', label: 'Increase' },
                  { value: 'decrease', label: 'Decrease' },
                  { value: 'transfer', label: 'Transfer' }
                ]}
                value={filters.adjustment_type}
                onChange={(value) => handleFilterChange('adjustment_type', value)}
                placeholder="All Types"
                className="w-full"
              />
            </div>
            <div>
              <label className={`block text-xs font-medium mb-1 ${currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Date From</label>
              <input
                type="date"
                value={filters.date_from}
                onChange={(e) => handleFilterChange('date_from', e.target.value)}
                className={`w-full px-3 py-2 text-xs border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors ${
                  currentTheme === 'dark' 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              />
            </div>
            <div>
              <label className={`block text-xs font-medium mb-1 ${currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Date To</label>
              <input
                type="date"
                value={filters.date_to}
                onChange={(e) => handleFilterChange('date_to', e.target.value)}
                className={`w-full px-3 py-2 text-xs border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors ${
                  currentTheme === 'dark' 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              />
            </div>
            <div>
              <label className={`block text-xs font-medium mb-1 ${currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Search</label>
              <input
                type="text"
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                placeholder="Search adjustments..."
                className={`w-full px-3 py-2 text-xs border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors ${
                  currentTheme === 'dark' 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
            </div>
          </div>
        </div>

        {error && (
          <div className={`p-4 rounded-lg border flex items-start gap-3 ${
            currentTheme === 'dark' 
              ? 'bg-error/10 border-error/30 text-error' 
              : 'bg-error/10 border-error/30 text-error'
          }`}>
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Error</p>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}

        <div className={`rounded-lg border overflow-hidden ${currentTheme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          {loading && !initialLoading ? (
            <div className="p-8">
              <div className="flex items-center justify-center">
                <Loader className="w-8 h-8 text-primary animate-spin mr-3" />
                <span className={`text-sm ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Loading adjustments...</span>
              </div>
            </div>
          ) : adjustments.length > 0 ? (
            <>
              {/* Desktop table */}
              <div className="overflow-x-auto hidden md:block">
                <table className="w-full">
                  <thead className={`${currentTheme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} border-b border-gray-200 dark:border-gray-600`}>
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold">Date</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold">Product</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold">Type</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold">Quantity</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold">Reason</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold">Location</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold">Adjusted By</th>
                    </tr>
                  </thead>
                  <tbody>
                    {adjustments.map((adjustment) => (
                      <tr key={adjustment.id} className={`border-b border-gray-200 dark:border-gray-700 transition-colors ${currentTheme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                        <td className="px-4 py-3 text-xs">
                          {new Date(adjustment.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3 text-xs max-w-[150px]">
                          <div className="truncate">{adjustment.product_variant?.name || 'N/A'}</div>
                          <div className={`text-xs truncate ${currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                            {adjustment.product_variant?.sku || 'N/A'}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-xs">
                          {adjustmentTypeBadge(adjustment.adjustment_type)}
                        </td>
                        <td className="px-4 py-3 text-xs">
                          {quantityBadge(adjustment.adjustment_type, adjustment.quantity)}
                        </td>
                        <td className="px-4 py-3 text-xs max-w-[120px] truncate">
                          {adjustment.reason}
                        </td>
                        <td className="px-4 py-3 text-xs max-w-[100px] truncate">
                          {adjustment.warehouse_location?.name || 'N/A'}
                        </td>
                        <td className="px-4 py-3 text-xs max-w-[120px] truncate">
                          {adjustment.adjusted_by_user?.name || adjustment.adjusted_by}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}
              <div className="md:hidden divide-y divide-gray-200 dark:divide-gray-700">
                {adjustments.map((adjustment) => (
                  <div key={adjustment.id} className={`p-4 flex flex-col gap-2 transition-colors ${currentTheme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{adjustment.product_variant?.name || 'N/A'}</p>
                        <p className={`text-xs truncate ${currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                          {adjustment.product_variant?.sku || 'N/A'}
                        </p>
                      </div>
                      {adjustmentTypeBadge(adjustment.adjustment_type)}
                    </div>
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center justify-between">
                        <span className={currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>Quantity:</span>
                        <span>{quantityBadge(adjustment.adjustment_type, adjustment.quantity)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>Reason:</span>
                        <span className="truncate ml-2 flex-1 text-right">{adjustment.reason}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>Location:</span>
                        <span className="truncate ml-2 flex-1 text-right">{adjustment.warehouse_location?.name || 'N/A'}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>Date:</span>
                        <span>{new Date(adjustment.created_at).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>By:</span>
                        <span className="truncate ml-2 flex-1 text-right">{adjustment.adjusted_by_user?.name || adjustment.adjusted_by}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className={`px-4 py-4 border-t ${currentTheme === 'dark' ? 'border-gray-700' : 'border-gray-200'} flex flex-col sm:flex-row items-center justify-between gap-4`}>
                <p className={`text-xs ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  Showing {adjustments.length} adjustments
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page <= 1}
                    className={`inline-flex items-center gap-1 px-3 py-2 rounded-lg border text-xs font-medium transition-colors ${
                      currentTheme === 'dark' 
                        ? 'border-gray-600 bg-gray-800 text-white hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed' 
                        : 'border-gray-300 bg-white text-gray-900 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </button>
                  <span className={`text-xs px-2 ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    Page {page}
                  </span>
                  <button
                    onClick={() => setPage((p) => p + 1)}
                    disabled={adjustments.length < LIMIT}
                    className={`inline-flex items-center gap-1 px-3 py-2 rounded-lg border text-xs font-medium transition-colors ${
                      currentTheme === 'dark' 
                        ? 'border-gray-600 bg-gray-800 text-white hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed' 
                        : 'border-gray-300 bg-white text-gray-900 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
                    }`}
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className={`p-8 text-center ${currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              <div className="flex flex-col items-center gap-3">
                <TrendingUp className={`w-12 h-12 ${currentTheme === 'dark' ? 'text-gray-600' : 'text-gray-300'}`} />
                <p className="text-sm">No inventory adjustments found</p>
                <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm">
                  <Plus className="w-4 h-4" />
                  Create First Adjustment
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminInventoryAdjustments;
