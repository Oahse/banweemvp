import React, { useEffect, useState, useCallback } from 'react';
import { Loader, AlertCircle, ChevronLeft, ChevronRight, SearchIcon, DownloadIcon, EditIcon, ArrowUpDownIcon, PackageIcon, PlusIcon, X } from 'lucide-react';
import AdminAPI from '@/api/admin';
import toast from 'react-hot-toast';
import { useTheme } from '@/components/shared/contexts/ThemeContext';
import Dropdown from '@/components/ui/Dropdown';
import AdminLayout from '../components/AdminLayout';
import { InventoryListSkeleton } from '../components/skeletons/InventorySkeleton';
import { Button } from '@/components/ui/Button';
import { Heading, Body, Text, Label } from '@/components/ui/Text/Text';

const LIMIT = 10;

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

interface InventoryItem {
  id: string;
  product_id: string;
  product_name: string;
  sku: string;
  quantity: number;
  location_name: string;
  low_stock_threshold: number;
  created_at: string;
  updated_at?: string;
}

export const AdminInventory = () => {
  const { currentTheme } = useTheme();
  const [inventory, setInventory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<PaginationInfo>({
    page: 1,
    limit: LIMIT,
    total: 0,
    pages: 1
  });
  const [statusFilter, setStatusFilter] = useState('');
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState({
    product_id: '',
    product_name: '',
    sku: '',
    quantity: '',
    location_name: '',
    low_stock_threshold: ''
  });

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
    const fetchInventory = async () => {
      try {
        if (page === 1 && !searchQuery && !statusFilter) {
          setInitialLoading(true);
        } else {
          setLoading(true);
        }
        setError(null);
        console.log('Sending API request with params:', {
          page, 
          limit: LIMIT,
          search: debouncedSearchQuery || undefined,
          low_stock: statusFilter === 'low_stock' ? true : undefined,
          sort_by: sortBy,
          sort_order: sortOrder
        });
        
        const response = await AdminAPI.getInventory({
          page, 
          limit: LIMIT,
          search: debouncedSearchQuery || undefined,
          low_stock: statusFilter === 'low_stock' ? true : undefined,
          sort_by: sortBy,
          sort_order: sortOrder
        });
        
        console.log('API response:', response);
        
        if (response?.success && response?.data) {
          const data = response.data;
          setInventory(data.data || []);
          if (data.pagination) {
            setPagination({
              page: data.pagination.page || page,
              limit: data.pagination.limit || LIMIT,
              total: data.pagination.total || 0,
              pages: data.pagination.pages || 0,
            });
          }
        } else {
          throw new Error(response?.message || 'Failed to load inventory');
        }
      } catch (err: any) {
        const message = err?.response?.data?.message || err?.message || 'Failed to load inventory';
        setError(message);
        toast.error(message);
      } finally {
        setLoading(false);
        setInitialLoading(false);
      }
    };

    fetchInventory();
  }, [page, debouncedSearchQuery, statusFilter]);

  const getItemDisplay = (item: any) => ({
    productName: item.variant?.name ?? item.variant_name ?? 'N/A',
    variantSku: item.variant?.sku ?? item.sku ?? 'N/A',
    locationName: item.location?.name ?? item.location_name ?? 'N/A',
    stockLevel: item.stock ?? item.quantity_available ?? item.quantity ?? item.stock_level ?? 0,
  });

  const stockStatus = (item: any) => {
    const level = getItemDisplay(item).stockLevel;
    // Debug logging to help identify the issue
    console.log('Stock check for item:', {
      id: item.id,
      productName: getItemDisplay(item).productName,
      stock: item.stock,
      quantity_available: item.quantity_available,
      quantity: item.quantity,
      stock_level: item.stock_level,
      calculatedLevel: level
    });
    
    if (level > 10) return { label: 'In Stock', cls: 'bg-success/20 text-success' };
    if (level > 0) return { label: 'Low Stock', cls: 'bg-warning/20 text-warning' };
    return { label: 'Out of Stock', cls: 'bg-error/20 text-error' };
  };

  const openEditModal = (item: any) => {
    const d = getItemDisplay(item);
    setEditingItem(item);
    setFormData({
      product_id: item.product_id || item.variant?.product_id || '',
      product_name: d.productName,
      sku: item.variant?.sku || item.sku || '',
      quantity: String(d.stockLevel),
      location_name: d.locationName,
      low_stock_threshold: String(item.low_stock_threshold || item.variant?.low_stock_threshold || 10)
    });
    setShowModal(true);
  };

  const openAddModal = () => {
    setFormData({
      product_id: '',
      product_name: '',
      sku: '',
      quantity: '',
      location_name: '',
      low_stock_threshold: ''
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const quantity = parseInt(formData.quantity);
    if (isNaN(quantity) || quantity < 0) {
      toast.error('Quantity must be 0 or greater');
      return;
    }
    
    const lowStockThreshold = parseInt(formData.low_stock_threshold);
    if (isNaN(lowStockThreshold) || lowStockThreshold < 0) {
      toast.error('Low stock threshold must be 0 or greater');
      return;
    }
    
    try {
      if (editingItem) {
        // Update existing inventory item
        const response = await AdminAPI.updateInventoryItem(editingItem.id, {
          quantity: quantity,
          low_stock_threshold: lowStockThreshold,
          location_name: formData.location_name.trim() || 'Main Warehouse'
        });

        if (response?.success === false) {
          throw new Error(response?.message || 'Failed to update inventory');
        }

        const refreshed = await AdminAPI.getInventoryItem(editingItem.id);
        const updatedItem = refreshed?.data || refreshed?.data?.data || refreshed;

        if (updatedItem) {
          setInventory(prev => prev.map(item =>
            item.id === editingItem.id ? { ...item, ...updatedItem } : item
          ));
        }

        const updatedProductId = formData.product_id?.trim()
          || editingItem?.product_id
          || editingItem?.variant?.product_id
          || '';
        if (updatedProductId) {
          window.dispatchEvent(new CustomEvent('inventory:updated', {
            detail: {
              productId: updatedProductId,
              stock: quantity
            }
          }));
        }

        toast.success('Inventory updated successfully');
      } else {
        // Add new inventory item (this shouldn't happen now, but keeping for backwards compatibility)
        if (!formData.product_id.trim()) {
          toast.error('Product ID is required');
          return;
        }
        
        if (!formData.product_name.trim()) {
          toast.error('Product name is required');
          return;
        }
        
        const payload = {
          product_id: formData.product_id.trim(),
          product_name: formData.product_name.trim(),
          sku: formData.sku.trim() || null,
          quantity: quantity,
          location_name: formData.location_name.trim() || 'Main Warehouse',
          low_stock_threshold: lowStockThreshold
        };
        
        const response = await AdminAPI.createInventoryItem(payload);
        const newItem = response?.data?.data || response?.data;
        
        if (newItem) {
          setInventory(prev => [newItem, ...prev]);
          setPagination(prev => ({
            ...prev,
            total: prev.total + 1
          }));
        }
        
        toast.success('Inventory item added successfully');
      }
      
      setShowModal(false);
      setEditingItem(null);
    } catch (error: any) {
      toast.error(editingItem ? 'Failed to update inventory' : 'Failed to add inventory item');
    }
  };

  const handleDownloadCSV = async () => {
    try {
      const response = await AdminAPI.getInventory({
        page: 1,
        limit: 10000, // Get all items for CSV
        search: debouncedSearchQuery || undefined,
        low_stock: statusFilter === 'low_stock' ? true : undefined,
        sort_by: sortBy,
        sort_order: sortOrder
      });

      if (response?.success && response?.data?.data) {
        const items = response.data.data;
        
        // Create CSV content
        const headers = ['Product Name', 'Location', 'Stock Level', 'Status'];
        const csvContent = [
          headers.join(','),
          ...items.map((item: any) => {
            const d = getItemDisplay(item);
            const status = stockStatus(item);
            return [
              `"${d.productName}"`,
              `"${d.locationName}"`,
              d.stockLevel,
              `"${status.label}"`
            ].join(',');
          })
        ].join('\n');

        // Create and download file
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `inventory_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        toast.success('Inventory data downloaded successfully');
      } else {
        throw new Error('Failed to fetch inventory data for download');
      }
    } catch (err: any) {
      const message = err?.response?.data?.message || err?.message || 'Failed to download inventory data';
      toast.error(message);
    }
  };

  if (initialLoading) {
    return (
      <AdminLayout>
        <InventoryListSkeleton />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
    <div className={`space-y-3 ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-1">
        <div>
          <Text variant="body-sm" tone="secondary">Manage stock levels and locations</Text>
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
                placeholder="Search inventory..."
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
                { value: '', label: 'All Items' },
                { value: 'low_stock', label: 'Low Stock Only' }
              ]}
              value={statusFilter}
              onChange={setStatusFilter}
              placeholder="All Items"
              className="min-w-[120px]"
            />
            
            <Dropdown
              options={[
                { value: 'created_at', label: 'Created' },
                { value: 'product_name', label: 'Product Name' },
                { value: 'quantity', label: 'Stock Level' },
                { value: 'location_name', label: 'Location' }
              ]}
                className={currentTheme === 'dark' 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }
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
              { value: '', label: 'All Items' },
              { value: 'low_stock', label: 'Low Stock Only' }
            ]}
            value={statusFilter}
            onChange={setStatusFilter}
            placeholder="All Items"
            className="min-w-[120px]"
          />
          
          <Dropdown
            options={[
              { value: 'created_at', label: 'Created' },
              { value: 'product_name', label: 'Product Name' },
              { value: 'quantity', label: 'Stock Level' },
              { value: 'location_name', label: 'Location' }
            ]}
            value={sortBy}
            onChange={setSortBy}
            placeholder="Sort by"
            className="min-w-[120px]"
          />
          
          <Button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            variant="outline"
            size="sm"
            leftIcon={<ArrowUpDownIcon size={14} />}
            className="inline-flex items-center gap-1 px-2 py-1.5 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-sm font-medium"
          >
            <Text variant="body-sm">Sort {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}</Text>
          </Button>
        </div>

        {/* Active Filters */}
        {(debouncedSearchQuery || statusFilter) && (
          <div className="flex items-center gap-2 pt-2 border-t border-gray-200 dark:border-gray-600">
            <Text variant="body-sm" tone="secondary">Active filters:</Text>
            {debouncedSearchQuery && (
              <Text variant="caption" className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-full">
                Search: "{debouncedSearchQuery}"
                <Button
                  onClick={() => setSearchQuery('')}
                  variant="ghost"
                  size="sm"
                  className="ml-1 hover:text-primary-dark"
                  leftIcon={<X size={12} />}
                >
                </Button>
              </Text>
            )}
            {statusFilter && (
              <Text variant="caption" className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-full">
                Filter: {statusFilter === 'low_stock' ? 'Low Stock Only' : 'All Items'}
                <Button
                  onClick={() => setStatusFilter('')}
                  variant="ghost"
                  size="sm"
                  className="ml-1 hover:text-primary-dark"
                  leftIcon={<X size={12} />}
                >
                </Button>
              </Text>
            )}
            <Button
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('');
              }}
              variant="ghost"
              size="sm"
            >
              Clear all
            </Button>
          </div>
        )}
      </div>
    </div>

    {error && (
      <div className={`p-4 rounded-lg border flex items-start gap-3 ${
        currentTheme === 'dark' 
          ? 'bg-error/10 border-error/30 text-error' 
          : 'bg-error/10 border-error/30 text-error'
      }`}>
        <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <Text weight="semibold">Error Loading Inventory</Text>
          <Text variant="body-sm">{error}</Text>
          <Button
            onClick={() => window.location.reload()}
            variant="ghost"
            size="sm"
          >
            Try Again
          </Button>
        </div>
      </div>
    )}

    <div className={`rounded-lg border overflow-hidden ${currentTheme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
      
      {loading && !initialLoading ? (
        <div className="p-8">
          <div className="flex items-center justify-center">
            <Loader className="w-8 h-8 text-primary animate-spin mr-3" />
            <Text variant="body-sm" tone="secondary">Updating inventory...</Text>
          </div>
        </div>
      ) : inventory.length > 0 ? (
        <>
          {/* Desktop table */}
          <div className="overflow-x-auto hidden md:block">
            <table className="w-full">
              <thead className={`${currentTheme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} border-b border-gray-200`}>
                <tr>
                  <th className="px-4 py-3 text-left"><Text variant="caption" weight="semibold">Variant</Text></th>
                  <th className="px-4 py-3 text-left"><Text variant="caption" weight="semibold">SKU</Text></th>
                  <th className="px-4 py-3 text-left"><Text variant="caption" weight="semibold">Location</Text></th>
                  <th className="px-4 py-3 text-left"><Text variant="caption" weight="semibold">Stock Level</Text></th>
                  <th className="px-4 py-3 text-left"><Text variant="caption" weight="semibold">Status</Text></th>
                  <th className="px-4 py-3 text-left"><Text variant="caption" weight="semibold">Actions</Text></th>
                </tr>
              </thead>
              <tbody>
                {inventory.map((item) => {
                  const status = stockStatus(item);
                  const d = getItemDisplay(item);
                  return (
                    <tr key={item.id} className={`border-b border-gray-200 transition-colors ${currentTheme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                      <td className="px-4 py-3 max-w-[150px] truncate"><Text variant="caption" truncate="single">{d.productName}</Text></td>
                      <td className="px-4 py-3 max-w-[100px] truncate"><Text variant="caption" tone="secondary" truncate="single">{d.variantSku}</Text></td>
                      <td className="px-4 py-3 max-w-[120px] truncate"><Text variant="caption" tone="secondary" truncate="single">{d.locationName}</Text></td>
                      <td className="px-4 py-3"><Text variant="caption" weight="semibold">{d.stockLevel}</Text></td>
                      <td className="px-4 py-3">
                        <Text className={`px-3 py-1 rounded-full font-semibold ${status.cls}`}>
                          {status.label}
                        </Text>
                      </td>
                      <td className="px-4 py-3 text-xs">
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            openEditModal(item);
                          }}
                          variant="primary"
                          size="sm"
                          leftIcon={<EditIcon size={14} />}
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
                        >
                          <Text variant="body-sm">Edit</Text>
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden divide-y divide-gray-200 dark:divide-gray-700">
            {inventory.map((item) => {
              const status = stockStatus(item);
              const d = getItemDisplay(item);
              return (
                <div
                  key={item.id}
                  className={`p-4 flex flex-col gap-2 bg-white dark:bg-gray-800 transition-colors ${currentTheme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <Text variant="body-sm" weight="medium" truncate="single">{d.productName}</Text>
                      <Text variant="caption" tone="secondary" truncate="single">SKU: {d.variantSku}</Text>
                    </div>
                    <Text className={`px-3 py-1 rounded-full font-semibold whitespace-nowrap ${status.cls}`}>
                      {status.label}
                    </Text>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <Text variant="caption" tone="secondary">Location:</Text>
                    <Text variant="caption" truncate="single">{d.locationName}</Text>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <Text variant="caption" tone="secondary">Stock:</Text>
                    <Text variant="caption" weight="semibold">{d.stockLevel}</Text>
                  </div>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      openEditModal(item);
                    }}
                    variant="primary"
                    size="sm"
                    leftIcon={<EditIcon size={14} />}
                    className="mt-2 w-full inline-flex items-center justify-center gap-1 px-3 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors text-sm"
                  >
                    <Text variant="body-sm">Edit Stock</Text>
                  </Button>
                </div>
              );
            })}
          </div>

          <div className={`px-6 py-4 border-t ${currentTheme === 'dark' ? 'border-gray-700' : 'border-gray-200'} flex flex-col sm:flex-row items-center justify-between gap-4`}>
              <Text variant="body-sm" tone="secondary">
                Showing {(pagination.page - 1) * pagination.limit + 1}–{Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} items
                {pagination.pages > 1 && ` (Page ${pagination.page} of ${pagination.pages})`}
              </Text>
              <div className="flex items-center gap-1">
                <Button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1}
                  variant="outline"
                  size="sm"
                >
                  Previous
                </Button>
                
                {/* Page numbers */}
                <div className="flex items-center gap-1 mx-2">
                  {Array.from({ length: Math.min(5, Math.max(1, pagination.pages)) }, (_, i) => {
                    let pageNum: number;
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
                      <Button
                        key={pageNum}
                        onClick={() => setPage(pageNum)}
                        variant={page === pageNum ? 'primary' : 'ghost'}
                        size="sm"
                        className={`w-6 h-6 rounded-md text-sm font-medium transition-colors ${
                          page === pageNum ? 'bg-primary text-white' : 'border border-gray-300 bg-white text-gray-700'
                        }`}
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                </div>
                
                <Button
                  onClick={() => setPage((p) => (pagination.pages > 0 ? Math.min(pagination.pages, p + 1) : p + 1))}
                  disabled={page >= pagination.pages || pagination.pages <= 1}
                  variant="outline"
                  size="sm"
                >
                  Next
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className={`p-8 text-center ${currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                }}
                variant="ghost"
                size="sm"
              >
                Clear all filters
              </Button>
            )}
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setShowModal(false)}>
          <div className={`w-full max-w-2xl rounded-xl p-6 shadow-xl ${currentTheme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`} onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <Heading level={3} className="text-lg font-semibold">{editingItem ? 'Edit Inventory' : 'Add Inventory Item'}</Heading>
                <Body className={`text-sm ${currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{editingItem ? 'Update stock levels and location' : 'Fill in the details below'}</Body>
              </div>
              <Button
                onClick={() => {
                  setShowModal(false);
                  setEditingItem(null);
                }}
                variant="ghost"
                size="sm"
              >
                Close
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {editingItem && (
                <div>
                  <Label className={`block text-sm font-medium mb-2 ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    Product
                  </Label>
                  <div className={`w-full px-3 py-2 text-sm border rounded-lg ${currentTheme === 'dark' ? 'bg-gray-700 border-gray-600 text-gray-400' : 'bg-gray-100 border-gray-300 text-gray-600'}`}>
                    {formData.product_name}
                  </div>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {!editingItem && (
                  <>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        Product ID *
                      </label>
                      <input
                        type="text"
                        value={formData.product_id}
                        onChange={(e) => setFormData(prev => ({ ...prev, product_id: e.target.value }))}
                        className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors ${
                          currentTheme === 'dark'
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                        }`}
                        placeholder="e.g., prod_123456"
                        required
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        Product Name *
                      </label>
                      <input
                        type="text"
                        value={formData.product_name}
                        onChange={(e) => setFormData(prev => ({ ...prev, product_name: e.target.value }))}
                        className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors ${
                          currentTheme === 'dark'
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                        }`}
                        placeholder="e.g., Premium T-Shirt"
                        required
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        SKU
                      </label>
                      <input
                        type="text"
                        value={formData.sku}
                        onChange={(e) => setFormData(prev => ({ ...prev, sku: e.target.value }))}
                        className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors ${
                          currentTheme === 'dark'
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                        }`}
                        placeholder="e.g., TSHIRT-RED-L"
                      />
                    </div>
                  </>
                )}

                <div>
                  <label className={`block text-sm font-medium mb-2 ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    Quantity *
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.quantity}
                    onChange={(e) => setFormData(prev => ({ ...prev, quantity: e.target.value }))}
                    className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors ${
                      currentTheme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="e.g., 100"
                    required
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.location_name}
                    onChange={(e) => setFormData(prev => ({ ...prev, location_name: e.target.value }))}
                    className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors ${
                      currentTheme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="e.g., Main Warehouse"
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    Low Stock Threshold *
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.low_stock_threshold}
                    onChange={(e) => setFormData(prev => ({ ...prev, low_stock_threshold: e.target.value }))}
                    className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors ${
                      currentTheme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="e.g., 10"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-gray-200 dark:border-gray-600">
                <Button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingItem(null);
                  }}
                  variant="ghost"
                  size="sm"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                >
                  {editingItem ? 'Update Stock' : 'Add Item'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    </AdminLayout>
  );
};

export default AdminInventory;
