import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { 
  PackageIcon, 
  AlertTriangleIcon, 
  TrendingDownIcon,
  SearchIcon,
  RefreshCwIcon,
  SettingsIcon,
  MailIcon
} from 'lucide-react';
import { stockMonitor, StockThreshold, StockAlert } from '../../services/stockMonitoring';
import { useAsync } from '../../hooks/useAsync';

interface InventoryItem {
  id: string;
  variant_id: string;
  product_id: string;
  product_name: string;
  variant_name: string;
  sku: string;
  current_stock: number;
  reserved_stock: number;
  available_stock: number;
  warehouse_location?: string;
  last_updated: string;
  images?: Array<{
    url: string;
    alt_text?: string;
    is_primary?: boolean;
  }>;
}

interface WarehouseLocation {
  id: string;
  name: string;
  address: string;
  capacity: number;
  current_utilization: number;
}

export const InventoryManager: React.FC = () => {
  // ✅ Using useState for all local state management
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [filteredInventory, setFilteredInventory] = useState<InventoryItem[]>([]);
  const [warehouses, setWarehouses] = useState<WarehouseLocation[]>([]);
  const [stockAlerts, setStockAlerts] = useState<StockAlert[]>([]);
  const [stockThresholds, setStockThresholds] = useState<StockThreshold[]>([]);
  
  // Filter and search states
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [warehouseFilter, setWarehouseFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('product_name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  
  // UI states
  const [showThresholdModal, setShowThresholdModal] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [showAlertsPanel, setShowAlertsPanel] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const { loading, error, execute: fetchData } = useAsync();

  // Mock API calls (replace with real API calls)
  const fetchInventoryData = useCallback(async () => {
    // Mock inventory data
    const mockInventory: InventoryItem[] = [
      {
        id: '1',
        variant_id: 'var_1',
        product_id: 'prod_1',
        product_name: 'Organic Coffee Beans',
        variant_name: '1kg Bag',
        sku: 'OCB-1KG-001',
        current_stock: 5,
        reserved_stock: 2,
        available_stock: 3,
        warehouse_location: 'Warehouse A',
        last_updated: new Date().toISOString(),
        images: [
          {
            url: '/images/coffee-beans-1kg.jpg',
            alt_text: 'Organic Coffee Beans 1kg',
            is_primary: true
          }
        ]
      },
      {
        id: '2',
        variant_id: 'var_2',
        product_id: 'prod_1',
        product_name: 'Organic Coffee Beans',
        variant_name: '500g Bag',
        sku: 'OCB-500G-001',
        current_stock: 0,
        reserved_stock: 0,
        available_stock: 0,
        warehouse_location: 'Warehouse B',
        last_updated: new Date().toISOString(),
        images: [
          {
            url: '/images/coffee-beans-500g.jpg',
            alt_text: 'Organic Coffee Beans 500g',
            is_primary: true
          }
        ]
      },
      {
        id: '3',
        variant_id: 'var_3',
        product_id: 'prod_2',
        product_name: 'Premium Tea Leaves',
        variant_name: 'Earl Grey 100g',
        sku: 'PTL-EG-100G',
        current_stock: 25,
        reserved_stock: 5,
        available_stock: 20,
        warehouse_location: 'Warehouse A',
        last_updated: new Date().toISOString(),
        images: [
          {
            url: '/images/earl-grey-tea.jpg',
            alt_text: 'Earl Grey Tea 100g',
            is_primary: true
          }
        ]
      }
    ];

    const mockWarehouses: WarehouseLocation[] = [
      {
        id: 'wh_1',
        name: 'Warehouse A',
        address: '123 Storage St, City, State',
        capacity: 10000,
        current_utilization: 7500
      },
      {
        id: 'wh_2',
        name: 'Warehouse B',
        address: '456 Inventory Ave, City, State',
        capacity: 15000,
        current_utilization: 12000
      }
    ];

    return { inventory: mockInventory, warehouses: mockWarehouses };
  }, []);

  // Initialize data and stock monitoring
  useEffect(() => {
    fetchData(async () => {
      const data = await fetchInventoryData();
      setInventory(data.inventory);
      setWarehouses(data.warehouses);

      // Initialize stock monitoring for each item
      data.inventory.forEach(item => {
        stockMonitor.setStockThreshold(item.variant_id, {
          low_stock_threshold: 10,
          critical_threshold: 5,
          out_of_stock_threshold: 0,
          email_notifications_enabled: true
        });

        stockMonitor.updateStock(
          item.variant_id,
          item.current_stock,
          item.product_name,
          item.variant_name
        );
      });

      // Get initial alerts and thresholds
      setStockAlerts(stockMonitor.getAllAlerts());
      setStockThresholds(stockMonitor.getAllThresholds());

      return data;
    });
  }, [fetchData, fetchInventoryData]);

  // Filter and sort inventory
  useEffect(() => {
    let filtered = [...inventory];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.product_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.variant_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(item => {
        const stockStatus = stockMonitor.getStockStatus(item.variant_id);
        return stockStatus.status === statusFilter;
      });
    }

    // Apply warehouse filter
    if (warehouseFilter !== 'all') {
      filtered = filtered.filter(item => item.warehouse_location === warehouseFilter);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: any = a[sortBy as keyof InventoryItem];
      let bValue: any = b[sortBy as keyof InventoryItem];

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    setFilteredInventory(filtered);
  }, [inventory, searchQuery, statusFilter, warehouseFilter, sortBy, sortOrder]);

  // Handle stock update
  const handleStockUpdate = async (variantId: string, newStock: number) => {
    const item = inventory.find(i => i.variant_id === variantId);
    if (!item) return;

    // Optimistic update
    const updatedInventory = inventory.map(i =>
      i.variant_id === variantId
        ? { ...i, current_stock: newStock, available_stock: newStock - i.reserved_stock }
        : i
    );
    setInventory(updatedInventory);

    // Update stock monitoring
    const alerts = stockMonitor.updateStock(variantId, newStock, item.product_name, item.variant_name);
    if (alerts.length > 0) {
      setStockAlerts(prev => [...alerts, ...prev]);
    }
    setStockThresholds(stockMonitor.getAllThresholds());

    toast.success(`Stock updated for ${item.product_name} (${item.variant_name})`);
  };

  // Handle threshold update
  const handleThresholdUpdate = (variantId: string, thresholds: {
    low_stock_threshold: number;
    critical_threshold: number;
    out_of_stock_threshold: number;
    email_notifications_enabled: boolean;
  }) => {
    stockMonitor.setStockThreshold(variantId, thresholds);
    setStockThresholds(stockMonitor.getAllThresholds());
    toast.success('Stock thresholds updated');
  };

  // Refresh data
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      const data = await fetchInventoryData();
      setInventory(data.inventory);
      setWarehouses(data.warehouses);
      toast.success('Inventory data refreshed');
    } catch (error) {
      toast.error('Failed to refresh data');
    } finally {
      setIsRefreshing(false);
    }
  };

  // Get stock status styling
  const getStockStatusStyle = (variantId: string) => {
    const status = stockMonitor.getStockStatus(variantId);
    const styles: Record<string, string> = {
      in_stock: 'bg-green-100 text-green-800',
      low_stock: 'bg-yellow-100 text-yellow-800',
      critical: 'bg-orange-100 text-orange-800',
      out_of_stock: 'bg-red-100 text-red-800'
    };
    return styles[status.status] || 'bg-gray-100 text-gray-800';
  };

  // Get primary image
  const getPrimaryImage = (item: InventoryItem) => {
    if (!item.images || item.images.length === 0) {
      return '/placeholder-product.jpg';
    }
    const primaryImage = item.images.find(img => img.is_primary);
    return primaryImage?.url || item.images[0]?.url || '/placeholder-product.jpg';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="heading text-2xl mb-2">Inventory Management</h1>
            <p className="body-text text-gray-600">
              Monitor stock levels, manage thresholds, and track inventory across warehouses
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAlertsPanel(true)}
              className="relative p-2 text-gray-600 hover:text-primary rounded-lg hover:bg-gray-100"
              title="View alerts"
            >
              <AlertTriangleIcon size={20} />
              {stockAlerts.filter(a => !a.acknowledged).length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {stockAlerts.filter(a => !a.acknowledged).length}
                </span>
              )}
            </button>
            
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50"
            >
              <RefreshCwIcon size={16} className={isRefreshing ? 'animate-spin' : ''} />
              <span className="button-text">Refresh</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <PackageIcon className="text-blue-500" size={24} />
            <div>
              <p className="body-text text-sm text-gray-600">Total Items</p>
              <p className="heading text-xl">{inventory.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <TrendingDownIcon className="text-red-500" size={24} />
            <div>
              <p className="body-text text-sm text-gray-600">Low Stock</p>
              <p className="heading text-xl">
                {stockThresholds.filter(t => t.status === 'low_stock' || t.status === 'critical').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <AlertTriangleIcon className="text-orange-500" size={24} />
            <div>
              <p className="body-text text-sm text-gray-600">Out of Stock</p>
              <p className="heading text-xl">
                {stockThresholds.filter(t => t.status === 'out_of_stock').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <MailIcon className="text-green-500" size={24} />
            <div>
              <p className="body-text text-sm text-gray-600">Alerts Sent</p>
              <p className="heading text-xl">
                {stockAlerts.filter(a => a.email_sent).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Status</option>
            <option value="in_stock">In Stock</option>
            <option value="low_stock">Low Stock</option>
            <option value="critical">Critical</option>
            <option value="out_of_stock">Out of Stock</option>
          </select>

          {/* Warehouse Filter */}
          <select
            value={warehouseFilter}
            onChange={(e) => setWarehouseFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Warehouses</option>
            {warehouses.map(warehouse => (
              <option key={warehouse.id} value={warehouse.name}>
                {warehouse.name}
              </option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={`${sortBy}:${sortOrder}`}
            onChange={(e) => {
              const [field, order] = e.target.value.split(':');
              setSortBy(field);
              setSortOrder(order as 'asc' | 'desc');
            }}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
          >
            <option value="product_name:asc">Name A-Z</option>
            <option value="product_name:desc">Name Z-A</option>
            <option value="current_stock:asc">Stock Low-High</option>
            <option value="current_stock:desc">Stock High-Low</option>
            <option value="last_updated:desc">Recently Updated</option>
          </select>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SKU
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInventory.map((item) => {
                const stockStatus = stockMonitor.getStockStatus(item.variant_id);
                return (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={getPrimaryImage(item)}
                          alt={`${item.product_name} ${item.variant_name}`}
                          className="w-10 h-10 rounded-lg object-cover mr-3"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/placeholder-product.jpg';
                          }}
                        />
                        <div>
                          <div className="product-title text-sm font-medium text-gray-900">
                            {item.product_name}
                          </div>
                          <div className="body-text text-sm text-gray-500">
                            {item.variant_name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="body-text text-sm text-gray-900">{item.sku}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm">
                        <div className="font-medium text-gray-900">{item.current_stock}</div>
                        <div className="text-gray-500">Available: {item.available_stock}</div>
                        {item.reserved_stock > 0 && (
                          <div className="text-orange-600">Reserved: {item.reserved_stock}</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStockStatusStyle(item.variant_id)}`}>
                        {stockStatus.message}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="body-text text-sm text-gray-900">{item.warehouse_location}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedItem(item);
                            setShowThresholdModal(true);
                          }}
                          className="text-primary hover:text-primary-dark"
                          title="Manage thresholds"
                        >
                          <SettingsIcon size={16} />
                        </button>
                        <input
                          type="number"
                          min="0"
                          value={item.current_stock}
                          onChange={(e) => handleStockUpdate(item.variant_id, parseInt(e.target.value) || 0)}
                          className="w-20 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary"
                          title="Update stock"
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {filteredInventory.length === 0 && (
        <div className="text-center py-12">
          <PackageIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="heading text-lg text-gray-900 mt-2">No inventory items found</h3>
          <p className="body-text text-gray-500 mt-1">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      )}
    </div>
  );
};