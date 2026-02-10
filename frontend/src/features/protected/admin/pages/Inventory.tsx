import { useEffect, useState, useCallback } from 'react';
import { Loader, AlertCircle, SearchIcon, DownloadIcon, EditIcon, ArrowUpDownIcon, PackageIcon, PlusIcon, X } from 'lucide-react';
import AdminAPI from '@/api/admin';
import toast from 'react-hot-toast';
import { useTheme } from '@/components/shared/contexts/ThemeContext';
import { InventoryListSkeleton } from '@/features/protected/admin/components/skeletons/InventorySkeleton';
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
  const editModal = useModal();
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState({
    product_id: '',
    product_name: '',
    sku: '',
    quantity: '',
    location_name: '',
    low_stock_threshold: ''
  });

  const fetchData = async (params: any) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await AdminAPI.getInventory({
        page: params.page,
        limit: params.limit,
        search: params.search,
        low_stock: params.filters?.low_stock ? true : undefined,
        sort_by: params.sort_by,
        sort_order: params.sort_order
      });
      
      const allItems = response?.data?.data || response?.data || [];
      let filteredItems = allItems;
      
      if (params.search) {
        filteredItems = filteredItems.filter((item: any) =>
          item.product_name?.toLowerCase().includes(params.search.toLowerCase()) ||
          item.sku?.toLowerCase().includes(params.search.toLowerCase()) ||
          item.location_name?.toLowerCase().includes(params.search.toLowerCase())
        );
      }
      
      if (params.filters?.low_stock) {
        filteredItems = filteredItems.filter((item: any) => item.stock <= item.low_stock_threshold);
      }
      
      if (params.sort_by === 'created_at') {
        filteredItems.sort((a: any, b: any) => {
          const aDate = new Date(a.created_at || 0);
          const bDate = new Date(b.created_at || 0);
          return params.sort_order === 'asc' 
            ? aDate.getTime() - bDate.getTime()
            : bDate.getTime() - aDate.getTime();
        });
      } else if (params.sort_by === 'product_name') {
        filteredItems.sort((a: any, b: any) => {
          const aName = (a.product_name || '').toLowerCase();
          const bName = (b.product_name || '').toLowerCase();
          return params.sort_order === 'asc' 
            ? aName.localeCompare(bName)
            : bName.localeCompare(aName);
        });
      } else if (params.sort_by === 'stock') {
        filteredItems.sort((a: any, b: any) => {
          return params.sort_order === 'asc' 
            ? a.stock - b.stock
            : b.stock - a.stock;
        });
      } else if (params.sort_by === 'location_name') {
        filteredItems.sort((a: any, b: any) => {
          const aLocation = (a.location_name || '').toLowerCase();
          const bLocation = (b.location_name || '').toLowerCase();
          return params.sort_order === 'asc' 
            ? aLocation.localeCompare(bLocation)
            : bLocation.localeCompare(aLocation);
        });
      }
      
      const total = filteredItems.length;
      const pages = Math.max(1, Math.ceil(total / params.limit));
      const startIndex = (params.page - 1) * params.limit;
      const endIndex = startIndex + params.limit;
      const paginatedItems = filteredItems.slice(startIndex, endIndex);
      
      setInventory(paginatedItems);
      setPagination({
        page: params.page,
        limit: params.limit,
        total: total,
        pages: pages
      });
    } catch (err: any) {
      const message = err?.response?.data?.message || 'Failed to load inventory';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  };

  const getItemDisplay = (item: any) => ({
    productName: item.variant?.name ?? item.variant_name ?? 'N/A',
    variantSku: item.variant?.sku ?? item.sku ?? 'N/A',
    locationName: item.location?.name ?? item.location_name ?? 'N/A',
    stockLevel: item.stock ?? item.quantity_available ?? item.quantity ?? item.stock_level ?? 0,
  });

  const stockStatus = (item: any) => {
    const level = getItemDisplay(item).stockLevel;
    
    if (level > 10) return { label: 'In Stock', cls: 'bg-success/20 text-success' };
    if (level > 0) return { label: 'Low Stock', cls: 'bg-warning/20 text-warning' };
    return { label: 'Out of Stock', cls: 'bg-error/20 text-error' };
  };

  // Define columns for AdminDataTable
  const columns: AdminColumn<any>[] = [
    {
      key: 'product_name',
      label: 'Product Name',
      sortable: true,
      render: (value: string, row: any) => (
        <TextComponent className="text-sm text-gray-900 dark:text-white">{value || 'N/A'}</TextComponent>
      ),
    },
    {
      key: 'sku',
      label: 'SKU',
      render: (value: string, row: any) => (
        <TextComponent className="text-sm text-gray-900 dark:text-white font-mono">{value || 'N/A'}</TextComponent>
      ),
    },
    {
      key: 'location_name',
      label: 'Location',
      render: (value: string, row: any) => (
        <TextComponent className="text-sm text-gray-900 dark:text-white">{value || 'N/A'}</TextComponent>
      ),
    },
    {
      key: 'stock',
      label: 'Stock Level',
      sortable: true,
      render: (value: number, row: any) => {
        const level = getItemDisplay(row).stockLevel;
        return (
          <TextComponent className={`px-2 py-1 rounded-full text-sm font-semibold ${level.cls}`}>
            {level.label}
          </TextComponent>
        );
      },
    },
    {
      key: 'status',
      label: 'Status',
      render: (value: string) => (
        <TextComponent className={`px-2 py-1 rounded-full text-sm font-semibold ${
          value === 'active' 
            ? 'bg-success/20 text-success' 
            : 'bg-gray-500/20 text-gray-500'
        }`}>
          {value === 'active' ? 'Active' : 'Inactive'}
        </TextComponent>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_: any, row: any) => (
        <div className="flex items-center gap-2">
          <Button
            onClick={() => openEditModal(row)}
            variant="ghost"
            size="xs"
            leftIcon={<EditIcon size={14} />}
            className="inline-flex items-center gap-1 px-2 py-1.5 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
          >
            <span className="hidden sm:inline">Edit</span>
          </Button>
        </div>
      ),
    },
  ];

  const filters: FilterConfig[] = [
    {
      key: 'low_stock',
      label: 'Stock Status',
      type: 'select',
      options: [
        { value: '', label: 'All Items' },
        { value: 'true', label: 'Low Stock Only' }
      ],
      placeholder: 'All Items',
    },
  ];

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
    editModal.open();
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
    editModal.open();
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
      
      editModal.close();
      setEditingItem(null);
    } catch (error: any) {
      toast.error(editingItem ? 'Failed to update inventory' : 'Failed to add inventory item');
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
    return (
      <InventoryListSkeleton />
    );
  }

  return (
      <div className={`space-y-3 ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-1">
          <div>
            <TextComponent variant="body-sm" tone={currentTheme === 'dark' ? 'secondary' : 'default'}>Manage inventory levels and locations</TextComponent>
          </div>
          <div className="flex gap-2 w-full lg:w-auto">
            <Button
              onClick={openAddModal}
              variant="primary"
              size="xs"
              leftIcon={<PlusIcon size={14} />}
            >
              Add Item
            </Button>
          </div>
        </div>

        <AdminDataTable
          data={inventory}
          loading={loading}
          error={error}
          pagination={pagination}
          columns={columns}
          fetchData={fetchData}
          searchPlaceholder="Search inventory..."
          filters={filters}
          actions={
            <Button
              onClick={openAddModal}
              variant="primary"
              size="xs"
              leftIcon={<PlusIcon size={14} />}
            >
              Add Item
            </Button>
          }
          emptyMessage="No inventory items found"
          responsive="cards"
          limit={LIMIT}
          onRowClick={openEditModal}
        />

        <Modal isOpen={editModal.isOpen} onClose={editModal.close} size="lg">
          <ModalHeader>
            <div>
              <Heading level={5} className="text-lg font-semibold">{editingItem ? 'Edit Inventory' : 'Add Inventory Item'}</Heading>
              <Body className={`text-sm ${currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{editingItem ? 'Update stock levels and location' : 'Fill in the details below'}</Body>
            </div>
          </ModalHeader>

          <ModalBody>
            <form onSubmit={handleSubmit} id="inventory-form" className="space-y-4">
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
                    editModal.close();
                    setEditingItem(null);
                  }}
                  variant="ghost"
                  size="xs"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="xs"
                >
                  {editingItem ? 'Update Stock' : 'Add Item'}
                </Button>
              </div>
            </form>
          </ModalBody>
        </Modal>
      </div>
  );
};

export default AdminInventory;
