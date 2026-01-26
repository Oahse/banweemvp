import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { 
  BuildingIcon, 
  MapPinIcon, 
  PackageIcon, 
  TrendingUpIcon,
  TrendingDownIcon,
  AlertTriangleIcon,
  PlusIcon,
  EditIcon,
  TrashIcon,
  SearchIcon
} from 'lucide-react';
import { useAsync } from '../../hooks/useAsync';
import { stockMonitor } from '../../services/stockMonitoring';

interface WarehouseLocation {
  id: string;
  name: string;
  code: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip_code: string;
    country: string;
  };
  capacity: number;
  current_utilization: number;
  manager_name?: string;
  manager_email?: string;
  phone?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface WarehouseInventory {
  id: string;
  warehouse_id: string;
  variant_id: string;
  product_name: string;
  variant_name: string;
  sku: string;
  quantity: number;
  reserved_quantity: number;
  available_quantity: number;
  location_code?: string; // Specific location within warehouse (e.g., "A1-B2")
  last_updated: string;
  images?: Array<{
    url: string;
    alt_text?: string;
    is_primary?: boolean;
  }>;
}

interface StockMovement {
  id: string;
  warehouse_id: string;
  variant_id: string;
  movement_type: 'in' | 'out' | 'transfer' | 'adjustment';
  quantity: number;
  reason: string;
  reference_number?: string; // Order number, transfer ID, etc.
  created_by: string;
  created_at: string;
}

export const WarehouseManager: React.FC = () => {
  // ✅ Using useState for all local state management
  const [warehouses, setWarehouses] = useState<WarehouseLocation[]>([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState<WarehouseLocation | null>(null);
  const [warehouseInventory, setWarehouseInventory] = useState<WarehouseInventory[]>([]);
  const [stockMovements, setStockMovements] = useState<StockMovement[]>([]);
  const [filteredInventory, setFilteredInventory] = useState<WarehouseInventory[]>([]);
  
  // UI states
  const [activeTab, setActiveTab] = useState<'overview' | 'inventory' | 'movements'>('overview');
  const [showWarehouseModal, setShowWarehouseModal] = useState<boolean>(false);
  const [showStockModal, setShowStockModal] = useState<boolean>(false);
  const [editingWarehouse, setEditingWarehouse] = useState<WarehouseLocation | null>(null);
  const [selectedInventoryItem, setSelectedInventoryItem] = useState<WarehouseInventory | null>(null);
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [stockFilter, setStockFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('product_name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  
  // Form states
  const [warehouseForm, setWarehouseForm] = useState<Partial<WarehouseLocation>>({});
  const [stockAdjustment, setStockAdjustment] = useState({
    quantity: 0,
    reason: '',
    movement_type: 'adjustment' as const
  });

  const { loading, error, execute: fetchData } = useAsync();

  // Mock API calls
  const fetchWarehouses = useCallback(async () => {
    const mockWarehouses: WarehouseLocation[] = [
      {
        id: 'wh_1',
        name: 'Main Warehouse',
        code: 'WH-MAIN',
        address: {
          street: '123 Storage Street',
          city: 'New York',
          state: 'NY',
          zip_code: '10001',
          country: 'USA'
        },
        capacity: 10000,
        current_utilization: 7500,
        manager_name: 'John Manager',
        manager_email: 'john@warehouse.com',
        phone: '+1-555-0123',
        is_active: true,
        created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'wh_2',
        name: 'Secondary Warehouse',
        code: 'WH-SEC',
        address: {
          street: '456 Inventory Avenue',
          city: 'Los Angeles',
          state: 'CA',
          zip_code: '90210',
          country: 'USA'
        },
        capacity: 15000,
        current_utilization: 12000,
        manager_name: 'Jane Supervisor',
        manager_email: 'jane@warehouse.com',
        phone: '+1-555-0456',
        is_active: true,
        created_at: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date().toISOString()
      }
    ];

    return mockWarehouses;
  }, []);

  const fetchWarehouseInventory = useCallback(async (warehouseId: string) => {
    const mockInventory: WarehouseInventory[] = [
      {
        id: 'inv_1',
        warehouse_id: warehouseId,
        variant_id: 'var_1',
        product_name: 'Organic Coffee Beans',
        variant_name: '1kg Bag',
        sku: 'OCB-1KG-001',
        quantity: 150,
        reserved_quantity: 25,
        available_quantity: 125,
        location_code: 'A1-B2',
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
        id: 'inv_2',
        warehouse_id: warehouseId,
        variant_id: 'var_2',
        product_name: 'Organic Coffee Beans',
        variant_name: '500g Bag',
        sku: 'OCB-500G-001',
        quantity: 0,
        reserved_quantity: 0,
        available_quantity: 0,
        location_code: 'A2-B1',
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
        id: 'inv_3',
        warehouse_id: warehouseId,
        variant_id: 'var_3',
        product_name: 'Premium Tea Leaves',
        variant_name: 'Earl Grey 100g',
        sku: 'PTL-EG-100G',
        quantity: 75,
        reserved_quantity: 10,
        available_quantity: 65,
        location_code: 'B1-C3',
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

    return mockInventory;
  }, []);

  const fetchStockMovements = useCallback(async (warehouseId: string) => {
    const mockMovements: StockMovement[] = [
      {
        id: 'mov_1',
        warehouse_id: warehouseId,
        variant_id: 'var_1',
        movement_type: 'in',
        quantity: 100,
        reason: 'New stock delivery',
        reference_number: 'PO-2024-001',
        created_by: 'John Manager',
        created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'mov_2',
        warehouse_id: warehouseId,
        variant_id: 'var_1',
        movement_type: 'out',
        quantity: 25,
        reason: 'Order fulfillment',
        reference_number: 'ORD-2024-001',
        created_by: 'System',
        created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'mov_3',
        warehouse_id: warehouseId,
        variant_id: 'var_2',
        movement_type: 'adjustment',
        quantity: -5,
        reason: 'Damaged goods',
        created_by: 'Jane Supervisor',
        created_at: new Date().toISOString()
      }
    ];

    return mockMovements;
  }, []);

  // Initialize data
  useEffect(() => {
    fetchData(async () => {
      const warehousesData = await fetchWarehouses();
      setWarehouses(warehousesData);
      if (warehousesData.length > 0) {
        setSelectedWarehouse(warehousesData[0]);
      }
      return warehousesData;
    });
  }, [fetchData, fetchWarehouses]);

  // Fetch warehouse-specific data when warehouse changes
  useEffect(() => {
    if (selectedWarehouse) {
      fetchData(async () => {
        const [inventory, movements] = await Promise.all([
          fetchWarehouseInventory(selectedWarehouse.id),
          fetchStockMovements(selectedWarehouse.id)
        ]);
        setWarehouseInventory(inventory);
        setStockMovements(movements);
        return { inventory, movements };
      });
    }
  }, [selectedWarehouse, fetchData, fetchWarehouseInventory, fetchStockMovements]);

  // Filter inventory
  useEffect(() => {
    let filtered = [...warehouseInventory];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.product_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.variant_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location_code?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply stock filter
    if (stockFilter !== 'all') {
      filtered = filtered.filter(item => {
        switch (stockFilter) {
          case 'in_stock':
            return item.available_quantity > 0;
          case 'low_stock':
            return item.available_quantity > 0 && item.available_quantity <= 10;
          case 'out_of_stock':
            return item.available_quantity === 0;
          case 'reserved':
            return item.reserved_quantity > 0;
          default:
            return true;
        }
      });
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: any = a[sortBy as keyof WarehouseInventory];
      let bValue: any = b[sortBy as keyof WarehouseInventory];

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
  }, [warehouseInventory, searchQuery, stockFilter, sortBy, sortOrder]);

  // Handle warehouse creation/update
  const handleWarehouseSave = async () => {
    try {
      if (editingWarehouse) {
        // Update existing warehouse
        const updatedWarehouses = warehouses.map(wh =>
          wh.id === editingWarehouse.id
            ? { ...wh, ...warehouseForm, updated_at: new Date().toISOString() }
            : wh
        );
        setWarehouses(updatedWarehouses);
        toast.success('Warehouse updated successfully');
      } else {
        // Create new warehouse
        const newWarehouse: WarehouseLocation = {
          id: `wh_${Date.now()}`,
          ...warehouseForm as WarehouseLocation,
          current_utilization: 0,
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        setWarehouses(prev => [...prev, newWarehouse]);
        toast.success('Warehouse created successfully');
      }
      
      setShowWarehouseModal(false);
      setEditingWarehouse(null);
      setWarehouseForm({});
    } catch (error: any) {
      toast.error(error.message || 'Failed to save warehouse');
    }
  };

  // Handle stock adjustment
  const handleStockAdjustment = async () => {
    if (!selectedInventoryItem) return;

    try {
      const newQuantity = selectedInventoryItem.quantity + stockAdjustment.quantity;
      
      // Update inventory
      const updatedInventory = warehouseInventory.map(item =>
        item.id === selectedInventoryItem.id
          ? {
              ...item,
              quantity: Math.max(0, newQuantity),
              available_quantity: Math.max(0, newQuantity - item.reserved_quantity),
              last_updated: new Date().toISOString()
            }
          : item
      );
      setWarehouseInventory(updatedInventory);

      // Add stock movement record
      const newMovement: StockMovement = {
        id: `mov_${Date.now()}`,
        warehouse_id: selectedWarehouse!.id,
        variant_id: selectedInventoryItem.variant_id,
        movement_type: stockAdjustment.movement_type,
        quantity: stockAdjustment.quantity,
        reason: stockAdjustment.reason,
        created_by: 'Current User', // In real app, get from auth context
        created_at: new Date().toISOString()
      };
      setStockMovements(prev => [newMovement, ...prev]);

      // Update stock monitoring
      stockMonitor.updateStock(
        selectedInventoryItem.variant_id,
        Math.max(0, newQuantity),
        selectedInventoryItem.product_name,
        selectedInventoryItem.variant_name
      );

      toast.success('Stock adjusted successfully');
      setShowStockModal(false);
      setSelectedInventoryItem(null);
      setStockAdjustment({ quantity: 0, reason: '', movement_type: 'adjustment' });
    } catch (error: any) {
      toast.error(error.message || 'Failed to adjust stock');
    }
  };

  // Get primary image
  const getPrimaryImage = (item: WarehouseInventory) => {
    if (!item.images || item.images.length === 0) {
      return '/placeholder-product.jpg';
    }
    const primaryImage = item.images.find(img => img.is_primary);
    return primaryImage?.url || item.images[0]?.url || '/placeholder-product.jpg';
  };

  // Get utilization percentage
  const getUtilizationPercentage = (warehouse: WarehouseLocation) => {
    return Math.round((warehouse.current_utilization / warehouse.capacity) * 100);
  };

  // Get utilization color
  const getUtilizationColor = (percentage: number) => {
    if (percentage >= 90) return 'text-red-600 bg-red-100';
    if (percentage >= 75) return 'text-orange-600 bg-orange-100';
    if (percentage >= 50) return 'text-yellow-600 bg-yellow-100';
    return 'text-green-600 bg-green-100';
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
            <h1 className="heading text-2xl mb-2">Warehouse Management</h1>
            <p className="body-text text-gray-600">
              Manage warehouse locations, track inventory, and monitor stock movements
            </p>
          </div>
          
          <button
            onClick={() => {
              setEditingWarehouse(null);
              setWarehouseForm({});
              setShowWarehouseModal(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
          >
            <PlusIcon size={16} />
            <span className="button-text">Add Warehouse</span>
          </button>
        </div>
      </div>

      {/* Warehouse Selection */}
      <div className="mb-6">
        <div className="flex items-center gap-4 overflow-x-auto pb-2">
          {warehouses.map((warehouse) => (
            <button
              key={warehouse.id}
              onClick={() => setSelectedWarehouse(warehouse)}
              className={`flex-shrink-0 p-4 rounded-lg border-2 transition-colors ${
                selectedWarehouse?.id === warehouse.id
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <BuildingIcon size={24} className="text-gray-600" />
                <div className="text-left">
                  <div className="heading text-sm font-medium">{warehouse.name}</div>
                  <div className="body-text text-xs text-gray-500">{warehouse.code}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <div className={`px-2 py-1 rounded-full text-xs ${getUtilizationColor(getUtilizationPercentage(warehouse))}`}>
                      {getUtilizationPercentage(warehouse)}% full
                    </div>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selectedWarehouse && (
        <>
          {/* Warehouse Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center gap-3">
                <PackageIcon className="text-blue-500" size={24} />
                <div>
                  <p className="body-text text-sm text-gray-600">Total Items</p>
                  <p className="heading text-xl">{warehouseInventory.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center gap-3">
                <TrendingUpIcon className="text-green-500" size={24} />
                <div>
                  <p className="body-text text-sm text-gray-600">In Stock</p>
                  <p className="heading text-xl">
                    {warehouseInventory.filter(item => item.available_quantity > 0).length}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center gap-3">
                <AlertTriangleIcon className="text-orange-500" size={24} />
                <div>
                  <p className="body-text text-sm text-gray-600">Low Stock</p>
                  <p className="heading text-xl">
                    {warehouseInventory.filter(item => item.available_quantity > 0 && item.available_quantity <= 10).length}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center gap-3">
                <TrendingDownIcon className="text-red-500" size={24} />
                <div>
                  <p className="body-text text-sm text-gray-600">Out of Stock</p>
                  <p className="heading text-xl">
                    {warehouseInventory.filter(item => item.available_quantity === 0).length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-6">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                {[
                  { id: 'overview', label: 'Overview' },
                  { id: 'inventory', label: 'Inventory' },
                  { id: 'movements', label: 'Stock Movements' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-primary text-primary'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="heading text-lg mb-4">Warehouse Details</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="body-text text-sm text-gray-600">Name:</span>
                      <span className="body-text text-sm font-medium ml-2">{selectedWarehouse.name}</span>
                    </div>
                    <div>
                      <span className="body-text text-sm text-gray-600">Code:</span>
                      <span className="body-text text-sm font-medium ml-2">{selectedWarehouse.code}</span>
                    </div>
                    <div>
                      <span className="body-text text-sm text-gray-600">Address:</span>
                      <div className="body-text text-sm ml-2">
                        {selectedWarehouse.address.street}<br />
                        {selectedWarehouse.address.city}, {selectedWarehouse.address.state} {selectedWarehouse.address.zip_code}<br />
                        {selectedWarehouse.address.country}
                      </div>
                    </div>
                    <div>
                      <span className="body-text text-sm text-gray-600">Manager:</span>
                      <span className="body-text text-sm font-medium ml-2">{selectedWarehouse.manager_name}</span>
                    </div>
                    <div>
                      <span className="body-text text-sm text-gray-600">Contact:</span>
                      <span className="body-text text-sm ml-2">{selectedWarehouse.manager_email}</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => {
                      setEditingWarehouse(selectedWarehouse);
                      setWarehouseForm(selectedWarehouse);
                      setShowWarehouseModal(true);
                    }}
                    className="mt-4 flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <EditIcon size={16} />
                    <span className="button-text">Edit Warehouse</span>
                  </button>
                </div>
                
                <div>
                  <h3 className="heading text-lg mb-4">Capacity Utilization</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="body-text text-sm text-gray-600">Current Utilization</span>
                        <span className="body-text text-sm font-medium">
                          {selectedWarehouse.current_utilization.toLocaleString()} / {selectedWarehouse.capacity.toLocaleString()}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            getUtilizationPercentage(selectedWarehouse) >= 90
                              ? 'bg-red-500'
                              : getUtilizationPercentage(selectedWarehouse) >= 75
                              ? 'bg-orange-500'
                              : 'bg-green-500'
                          }`}
                          style={{ width: `${getUtilizationPercentage(selectedWarehouse)}%` }}
                        ></div>
                      </div>
                      <div className="text-right mt-1">
                        <span className="body-text text-xs text-gray-500">
                          {getUtilizationPercentage(selectedWarehouse)}% utilized
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'inventory' && (
            <div className="space-y-4">
              {/* Inventory Filters */}
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="relative">
                    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type="text"
                      placeholder="Search inventory..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  <select
                    value={stockFilter}
                    onChange={(e) => setStockFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                  >
                    <option value="all">All Items</option>
                    <option value="in_stock">In Stock</option>
                    <option value="low_stock">Low Stock</option>
                    <option value="out_of_stock">Out of Stock</option>
                    <option value="reserved">Has Reserved</option>
                  </select>

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
                    <option value="quantity:desc">Quantity High-Low</option>
                    <option value="quantity:asc">Quantity Low-High</option>
                    <option value="location_code:asc">Location A-Z</option>
                  </select>

                  <button
                    onClick={() => {
                      setSelectedInventoryItem(null);
                      setShowStockModal(true);
                    }}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
                  >
                    <span className="button-text">Adjust Stock</span>
                  </button>
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
                          Location
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Quantity
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Available
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Reserved
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredInventory.map((item) => (
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
                                  {item.variant_name} • {item.sku}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="body-text text-sm text-gray-900">
                              {item.location_code || 'Not assigned'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="body-text text-sm font-medium text-gray-900">
                              {item.quantity}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`body-text text-sm font-medium ${
                              item.available_quantity === 0 ? 'text-red-600' :
                              item.available_quantity <= 10 ? 'text-orange-600' : 'text-green-600'
                            }`}>
                              {item.available_quantity}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="body-text text-sm text-gray-900">
                              {item.reserved_quantity}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => {
                                setSelectedInventoryItem(item);
                                setShowStockModal(true);
                              }}
                              className="text-primary hover:text-primary-dark"
                              title="Adjust stock"
                            >
                              <EditIcon size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'movements' && (
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quantity
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Reason
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Reference
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Created By
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {stockMovements.map((movement) => (
                      <tr key={movement.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="body-text text-sm text-gray-900">
                            {new Date(movement.created_at).toLocaleDateString()}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            movement.movement_type === 'in' ? 'bg-green-100 text-green-800' :
                            movement.movement_type === 'out' ? 'bg-red-100 text-red-800' :
                            movement.movement_type === 'transfer' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {movement.movement_type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`body-text text-sm font-medium ${
                            movement.quantity > 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {movement.quantity > 0 ? '+' : ''}{movement.quantity}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="body-text text-sm text-gray-900">
                            {movement.reason}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="body-text text-sm text-gray-500">
                            {movement.reference_number || '-'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="body-text text-sm text-gray-900">
                            {movement.created_by}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};