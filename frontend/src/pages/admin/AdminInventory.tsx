import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { SearchIcon, FilterIcon, EditIcon, EyeIcon, PlusIcon, ChevronDownIcon } from 'lucide-react';
import { usePaginatedApi } from '../../hooks/useApi';
import { AdminAPI } from '../../apis';
import ErrorMessage from '../../components/common/ErrorMessage';
import { ResponsiveTable } from '../../components/ui/ResponsiveTable';
import { PLACEHOLDER_IMAGES } from '../../utils/placeholderImage';

export const AdminInventory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [submittedSearchTerm, setSubmittedSearchTerm] = useState('');
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [productId, setProductId] = useState('');
  const [locationId, setLocationId] = useState('');
  const [lowStock, setLowStock] = useState('all');

  const apiCall = useCallback((page: number, limit: number) => {
    return AdminAPI.getInventoryItems({
      page,
      limit,
      product_id: productId || undefined,
      location_id: locationId || undefined,
      low_stock: lowStock === 'true' ? true : lowStock === 'false' ? false : undefined,
    });
  }, [productId, locationId, lowStock]);

  const {
    data: inventoryItems,
    loading: inventoryLoading,
    error: inventoryError,
    execute: fetchInventory,
    page: currentPage,
    limit: itemsPerPage,
    totalPages,
    goToPage,
  } = usePaginatedApi(
    apiCall,
    1,
    10,
    { showErrorToast: false, autoFetch: true }
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedSearchTerm(searchTerm);
    goToPage(1);
  };

  if (inventoryError) {
    return (
      <div className="p-6">
        <ErrorMessage
          error={inventoryError}
          onRetry={() => fetchInventory()}
          onDismiss={() => {}}
        />
      </div>
    );
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, inventoryItems.length);

  return (
    <div>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold text-main mb-2 md:mb-0">Inventory Management</h1>
        <div className="flex space-x-2">
          <Link to="/admin/inventory/adjustments/new" className="inline-flex items-center bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md transition-colors">
            <PlusIcon size={18} className="mr-2" />
            Adjust Stock
          </Link>
          <Link to="/admin/inventory/locations" className="inline-flex items-center bg-secondary hover:bg-secondary-dark text-white px-4 py-2 rounded-md transition-colors">
            Manage Locations
          </Link>
        </div>
      </div>

      {/* Filters and search */}
      <div className="bg-surface rounded-lg shadow-sm p-4 mb-6 border border-border-light">
        <form onSubmit={handleSearch}>
          <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-4">
            <div className="flex-grow">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search inventory..." 
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary bg-background text-copy" 
                  value={searchTerm} 
                  onChange={e => setSearchTerm(e.target.value)} 
                />
                <SearchIcon size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-copy-lighter" />
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button type="button" onClick={() => setShowMoreFilters(!showMoreFilters)} className="flex items-center px-3 py-2 border border-border rounded-md hover:bg-surface-hover text-copy">
                <FilterIcon size={18} className="mr-2" />
                More Filters
              </button>
              <button type="submit" className="flex items-center px-3 py-2 bg-primary text-white rounded-md hover:bg-primary-dark">
                <SearchIcon size={18} className="mr-2" />
                Search
              </button>
            </div>
          </div>
        </form>
        {showMoreFilters && (
          <div className="mt-4 pt-4 border-t border-border-light">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm text-copy-light mb-1 block">Product ID</label>
                <input 
                  type="text" 
                  placeholder="Product ID" 
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary bg-background text-copy" 
                  value={productId} 
                  onChange={e => setProductId(e.target.value)} 
                />
              </div>
              <div>
                <label className="text-sm text-copy-light mb-1 block">Location ID</label>
                <input 
                  type="text" 
                  placeholder="Location ID" 
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary bg-background text-copy" 
                  value={locationId} 
                  onChange={e => setLocationId(e.target.value)} 
                />
              </div>
              <div>
                <label className="text-sm text-copy-light mb-1 block">Stock Status</label>
                <div className="relative">
                  <select 
                    value={lowStock} 
                    onChange={e => setLowStock(e.target.value)} 
                    className="appearance-none w-full pl-3 pr-10 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary bg-background text-copy"
                  >
                    <option value="all">All Stock Levels</option>
                    <option value="true">Low Stock Only</option>
                    <option value="false">Sufficient Stock</option>
                  </select>
                  <ChevronDownIcon size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-copy-light pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Inventory table */}
      <div className="bg-surface rounded-lg shadow-sm border border-border-light overflow-hidden">
        <ResponsiveTable
          data={inventoryItems}
          loading={inventoryLoading}
          keyExtractor={(item) => item.id}
          emptyMessage="No inventory items found"
          columns={[
            {
              key: 'product',
              label: 'Product',
              mobileLabel: 'Product',
              render: (item) => (
                <div className="flex items-center">
                  <img 
                    src={item.variant?.primary_image?.url || item.variant?.images?.[0]?.url || PLACEHOLDER_IMAGES.small} 
                    alt={item.variant?.product?.name || 'Product'} 
                    className="w-10 h-10 rounded-md object-cover mr-3"
                    onError={(e) => {
                      e.currentTarget.src = PLACEHOLDER_IMAGES.small;
                    }}
                  />
                  <div>
                    <p className="font-medium text-main">{item.variant?.product?.name || 'Product Name'}</p>
                    <p className="text-xs text-copy-light">{item.variant?.name || 'Default Variant'}</p>
                  </div>
                </div>
              ),
            },
            {
              key: 'sku',
              label: 'SKU',
              hideOnMobile: true,
              render: (item) => <span className="text-copy-light font-mono text-sm">{item.variant?.sku || '—'}</span>,
            },
            {
              key: 'location',
              label: 'Location',
              render: (item) => <span className="text-copy-light">{item.location?.name || 'Default Location'}</span>,
            },
            {
              key: 'quantity',
              label: 'Quantity',
              render: (item) => <span className="font-medium text-main">{item.quantity}</span>,
            },
            {
              key: 'threshold',
              label: 'Threshold',
              hideOnMobile: true,
              render: (item) => <span className="text-copy-light">{item.low_stock_threshold}</span>,
            },
            {
              key: 'status',
              label: 'Status',
              render: (item) => {
                const isLowStock = item.quantity <= item.low_stock_threshold;
                return (
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    isLowStock ? 'bg-warning/10 text-warning' : 'bg-success/10 text-success'
                  }`}>
                    {isLowStock ? 'Low Stock' : 'In Stock'}
                  </span>
                );
              },
            },
            {
              key: 'actions',
              label: 'Actions',
              render: (item) => (
                <div className="flex items-center justify-end space-x-2">
                  <Link 
                    to={`/admin/inventory/${item.id}/adjustments`}
                    className="p-1 text-copy-light hover:text-main" 
                    title="View Adjustments"
                  >
                    <EyeIcon size={18} />
                  </Link>
                  <Link 
                    to={`/admin/inventory/edit/${item.id}`} 
                    className="p-1 text-copy-light hover:text-primary" 
                    title="Edit"
                  >
                    <EditIcon size={18} />
                  </Link>
                </div>
              ),
            },
          ]}
        />
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-copy-light">
            Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
            <span className="font-medium">{Math.min(endIndex, inventoryItems.length)}</span> of{' '}
            <span className="font-medium">{inventoryItems.length}</span> inventory items
          </p>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 border border-border rounded-md text-sm text-copy-light bg-background disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            <div className="flex items-center gap-1">
              {[...Array(totalPages)].map((_, pageNum) => (
                <button
                  key={pageNum + 1}
                  onClick={() => goToPage(pageNum + 1)}
                  className={`px-3 py-1 text-sm rounded-md ${
                    currentPage === pageNum + 1
                      ? 'bg-primary text-white'
                      : 'border border-border text-copy hover:bg-surface-hover'
                  }`}
                >
                  {pageNum + 1}
                </button>
              ))}
            </div>
            
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border border-border rounded-md text-sm text-copy-light bg-background disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

