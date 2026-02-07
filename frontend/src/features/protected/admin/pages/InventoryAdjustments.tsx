import React, { useEffect, useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { Loader, AlertCircle, Plus, Filter, ChevronLeft, ChevronRight, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import AdminAPI from '@/api/admin';
import { Dropdown } from '@/components/ui/Dropdown';
import toast from 'react-hot-toast';

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
  const [adjustments, setAdjustments] = useState<InventoryAdjustment[]>([]);
  const [loading, setLoading] = useState(true);
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
      decrease: { icon: TrendingDown, color: 'text-destructive', bg: 'bg-destructive/10', label: 'Decrease' },
      transfer: { icon: Minus, color: 'text-blue', bg: 'bg-blue/10', label: 'Transfer' }
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
      type === 'decrease' ? 'text-destructive' :
      'text-blue';
    
    const sign = type === 'increase' ? '+' : type === 'decrease' ? '-' : '';
    
    return (
      <span className={`font-semibold ${colorClass}`}>
        {sign}{quantity}
      </span>
    );
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-screen">
          <Loader className="w-12 h-12 text-primary animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  return 
  (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-copy">Inventory Adjustments</h1>
            <p className="text-copy-light mt-2">Track all inventory changes and adjustments</p>
          </div>
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
            <Plus className="w-4 h-4" />
            New Adjustment
          </button>
        </div>

        {/* Filters */}
        <div className="bg-surface rounded-lg border border-border-light p-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-4 h-4 text-copy-light" />
            <h2 className="text-lg font-semibold text-copy">Filters</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-copy-light mb-1">Adjustment Type</label>
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
          {/* ...existing code... */}
        </div>
      </div>
    </AdminLayout>
  )
};

export default AdminInventoryAdjustments;
