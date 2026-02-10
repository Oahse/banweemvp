import React, { useEffect, useState } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import AdminLayoutSkeleton from '@/features/protected/admin/components/skeletons/AdminLayoutSkeleton';
import { InventoryAdjustmentsSkeleton } from '@/features/protected/admin/components/skeletons/InventorySkeleton';
import { Loader, AlertCircle, Plus, Filter, ChevronLeft, ChevronRight, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import AdminAPI from '@/api/admin';
import Dropdown from '@/components/ui/Dropdown';
import toast from 'react-hot-toast';
import { useTheme } from '@/components/shared/contexts/ThemeContext';
import { Button } from '@/components/ui/Button';
import { AdminDataTable, AdminColumn, FilterConfig } from '@/components/shared/AdminDataTable';
import { Card } from '@/components/ui/Card';

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
  const [localFilters, setLocalFilters] = useState({
    adjustment_type: '',
    date_from: '',
    date_to: '',
    search: ''
  });

  const fetchData = async (params: any) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await AdminAPI.getAllStockAdjustments();
      const allAdjustments = response?.data || [];
      let filteredAdjustments = allAdjustments;
      
      if (params.search) {
        filteredAdjustments = filteredAdjustments.filter((adjustment: any) =>
          adjustment.reason?.toLowerCase().includes(params.search.toLowerCase()) ||
          adjustment.product_variant?.name?.toLowerCase().includes(params.search.toLowerCase()) ||
          adjustment.product_variant?.sku?.toLowerCase().includes(params.search.toLowerCase()) ||
          adjustment.warehouse_location?.name?.toLowerCase().includes(params.search.toLowerCase())
        );
      }
      
      if (params.filters?.adjustment_type) {
        filteredAdjustments = filteredAdjustments.filter((adjustment: any) => adjustment.adjustment_type === params.filters.adjustment_type);
      }
      
      if (params.filters?.date_from) {
        filteredAdjustments = filteredAdjustments.filter((adjustment: any) => {
          const adjDate = new Date(adjustment.created_at || 0);
          const fromDate = new Date(params.filters.date_from);
          return adjDate >= fromDate;
        });
      }
      
      if (params.filters?.date_to) {
        filteredAdjustments = filteredAdjustments.filter((adjustment: any) => {
          const adjDate = new Date(adjustment.created_at || 0);
          const toDate = new Date(params.filters.date_to);
          return adjDate <= toDate;
        });
      }
      
      if (params.sort_by === 'created_at') {
        filteredAdjustments.sort((a: any, b: any) => {
          const aDate = new Date(a.created_at || 0);
          const bDate = new Date(b.created_at || 0);
          return params.sort_order === 'asc' 
            ? aDate.getTime() - bDate.getTime()
            : bDate.getTime() - aDate.getTime();
        });
      } else if (params.sort_by === 'quantity') {
        filteredAdjustments.sort((a: any, b: any) => {
          return params.sort_order === 'asc' 
            ? a.quantity - b.quantity
            : b.quantity - a.quantity;
        });
      }
      
      const total = filteredAdjustments.length;
      const pages = Math.max(1, Math.ceil(total / params.limit));
      const startIndex = (params.page - 1) * params.limit;
      const endIndex = startIndex + params.limit;
      const paginatedAdjustments = filteredAdjustments.slice(startIndex, endIndex);
      
      setAdjustments(paginatedAdjustments);
      setPagination({
        page: params.page,
        limit: params.limit,
        total: total,
        pages: pages
      });
    } catch (err: any) {
      const message = err?.response?.data?.message || 'Failed to load inventory adjustments';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  };

  const handleFilterChange = (key: string, value: any) => {
    setLocalFilters(prev => ({ ...prev, [key]: value }));
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
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${bg} ${color}`}>
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

  // Define columns for AdminDataTable
  const columns: AdminColumn<any>[] = [
    {
      key: 'created_at',
      label: 'Date',
      sortable: true,
      render: (value: string) => (
        <span className="text-sm text-gray-900 dark:text-white">
          {new Date(value).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: 'product_variant',
      label: 'Product',
      render: (value: any, row: any) => (
        <div>
          <span className="text-sm text-gray-900 dark:text-white">{value?.name || 'N/A'}</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">{value?.sku || 'N/A'}</span>
        </div>
      ),
    },
    {
      key: 'adjustment_type',
      label: 'Type',
      render: (value: string) => adjustmentTypeBadge(value),
    },
    {
      key: 'quantity',
      label: 'Quantity',
      sortable: true,
      render: (value: number, row: any) => quantityBadge(row.adjustment_type, value),
    },
    {
      key: 'reason',
      label: 'Reason',
      render: (value: string) => (
        <span className="text-sm text-gray-900 dark:text-white truncate">{value || 'N/A'}</span>
      ),
    },
    {
      key: 'warehouse_location',
      label: 'Location',
      render: (value: any) => (
        <span className="text-sm text-gray-900 dark:text-white truncate">{value?.name || 'N/A'}</span>
      ),
    },
    {
      key: 'adjusted_by_user',
      label: 'Adjusted By',
      render: (value: any, row: any) => (
        <div>
          <span className="text-sm text-gray-900 dark:text-white truncate">{value?.name || row.adjusted_by || 'N/A'}</span>
          <span className="text-sm text-gray-500 dark:text-gray-400 truncate">{value?.email || 'N/A'}</span>
        </div>
      ),
    },
  ];

  const tableFilters: FilterConfig[] = [
    {
      key: 'adjustment_type',
      label: 'Adjustment Type',
      type: 'select',
      options: [
        { value: '', label: 'All Types' },
        { value: 'increase', label: 'Increase' },
        { value: 'decrease', label: 'Decrease' },
        { value: 'transfer', label: 'Transfer' }
      ],
      placeholder: 'All Types',
    },
  ];

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
    return <AdminLayoutSkeleton />;
  }

  return (
    <AdminLayout>
      <div className={`space-y-3 ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-1">
          <div>
            <h1 className="text-xl lg:text-2xl font-semibold">Inventory Adjustments</h1>
            <p className={`mt-1 text-sm lg:text-sm ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Track all inventory changes and adjustments</p>
          </div>
          <div className="flex gap-2 w-full lg:w-auto">
            <Button
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm"
              leftIcon={<Plus className="w-4 h-4" />}
            >
              New Adjustment
            </Button>
          </div>
        </div>

        <AdminDataTable
          data={adjustments}
          loading={loading}
          error={error}
          pagination={pagination}
          columns={columns}
          fetchData={fetchData}
          searchPlaceholder="Search adjustments..."
          filters={tableFilters}
          actions={
            <Button
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm"
              leftIcon={<Plus className="w-4 h-4" />}
            >
              New Adjustment
            </Button>
          }
          emptyMessage="No inventory adjustments found"
          responsive="cards"
          limit={LIMIT}
        />
      </div>
    </AdminLayout>
  );
};

export default AdminInventoryAdjustments;
