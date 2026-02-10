import { useEffect, useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader, AlertCircle, SearchIcon, ArrowUpDownIcon, EyeIcon, PackageIcon, Trash2 } from 'lucide-react';
import AdminAPI from '@/api/admin';
import toast from 'react-hot-toast';
import { useTheme } from '@/components/shared/contexts/ThemeContext';
import { useLocale } from '@/components/shared/contexts/LocaleContext';
import Dropdown from '@/components/ui/Dropdown';
import { ProductsListSkeleton } from '@/features/protected/admin/components/skeletons/ProductsSkeleton';
import { ConfirmModal, useModal } from '@/components/ui/Modal';
import { AdminDataTable, AdminColumn, FilterConfig } from '@/components/shared/AdminDataTable';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const LIMIT = 10;

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  supplier: string;
  price: number;
  status: string;
  stock: number;
  created_at: string;
  updated_at: string;
}

const AdminProductsPage = () => {
  const { currentTheme } = useTheme();
  const { formatCurrency } = useLocale();
  const navigate = useNavigate();
  const hasLoadedRef = useRef(false);
  const [products, setProducts] = useState<Product[]>([]);
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
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [refreshKey, setRefreshKey] = useState(0);
  const deleteModal = useModal();
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchData = async (params: any) => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching products with params:', {
        page: params.page,
        limit: params.limit,
        search: params.search,
        status: params.filters?.status || undefined,
        category: params.filters?.category || undefined,
        sort_by: params.sort_by,
        sort_order: params.sort_order
      });
      
      const response = await AdminAPI.getProducts({
        page: params.page,
        limit: params.limit,
        search: params.search,
        status: params.filters?.status || undefined,
        category: params.filters?.category || undefined,
        sort_by: params.sort_by,
        sort_order: params.sort_order
      });
      
      const responseData = response?.data || {};
      const data = responseData?.data || [];
      const paginationData = responseData?.pagination || { page: params.page, limit: params.limit, total: 0, pages: 0 };
      const allProducts = Array.isArray(data) ? data : [];
      
      const normalizedProducts = allProducts.map((product: any) => ({
        ...product,
        stock: product.stock ?? product.total_stock ?? product.primary_variant?.stock ?? 0,
        status: product.is_active ? 'active' : 'inactive',
        price: product.price ?? product.min_price ?? 0
      }));
      
      let filteredProducts = normalizedProducts;
      
      if (params.search) {
        filteredProducts = filteredProducts.filter((product: any) =>
          product.name.toLowerCase().includes(params.search.toLowerCase()) ||
          product.description?.toLowerCase().includes(params.search.toLowerCase()) ||
          product.category?.toLowerCase().includes(params.search.toLowerCase()) ||
          product.supplier?.toLowerCase().includes(params.search.toLowerCase())
        );
      }
      
      if (params.filters?.status) {
        filteredProducts = filteredProducts.filter((product: any) => product.status === params.filters.status);
      }
      
      if (params.filters?.category) {
        filteredProducts = filteredProducts.filter((product: any) => product.category === params.filters.category);
      }
      
      if (params.sort_by === 'created_at') {
        filteredProducts.sort((a: any, b: any) => {
          const aDate = new Date(a.created_at || 0);
          const bDate = new Date(b.created_at || 0);
          return params.sort_order === 'asc' 
            ? aDate.getTime() - bDate.getTime()
            : bDate.getTime() - aDate.getTime();
        });
      } else if (params.sort_by === 'name') {
        filteredProducts.sort((a: any, b: any) => {
          const aName = (a.name || '').toLowerCase();
          const bName = (b.name || '').toLowerCase();
          return params.sort_order === 'asc' 
            ? aName.localeCompare(bName)
            : bName.localeCompare(aName);
        });
      } else if (params.sort_by === 'price') {
        filteredProducts.sort((a: any, b: any) => {
          return params.sort_order === 'asc' 
            ? a.price - b.price
            : b.price - a.price;
        });
      } else if (params.sort_by === 'stock') {
        filteredProducts.sort((a: any, b: any) => {
          return params.sort_order === 'asc' 
            ? a.stock - b.stock
            : b.stock - a.stock;
        });
      }
      
      const total = filteredProducts.length;
      const pages = Math.max(1, Math.ceil(total / params.limit));
      const startIndex = (params.page - 1) * params.limit;
      const endIndex = startIndex + params.limit;
      const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
      
      setProducts(paginatedProducts);
      setPagination({
        page: params.page,
        limit: params.limit,
        total: total,
        pages: pages
      });
      
    } catch (err: any) {
      const message = err?.response?.data?.message || 'Failed to load products';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
      setInitialLoading(false);
      hasLoadedRef.current = true;
    }
  };

  // Define columns for AdminDataTable
  const columns: AdminColumn<Product>[] = [
    {
      key: 'name',
      label: 'Name',
      sortable: true,
      render: (value: string) => (
        <Text className="text-sm text-gray-900 dark:text-white">{value || 'N/A'}</Text>
      ),
    },
    {
      key: 'category',
      label: 'Category',
      sortable: true,
      render: (value: string) => (
        <Text className="text-sm text-gray-600 dark:text-gray-300">{value || 'N/A'}</Text>
      ),
    },
    {
      key: 'price',
      label: 'Price',
      sortable: true,
      render: (value: number) => (
        <Text className="text-sm font-semibold text-gray-900 dark:text-white">{formatCurrency(value)}</Text>
      ),
    },
    {
      key: 'stock',
      label: 'Stock',
      sortable: true,
      render: (value: number) => stockBadge(value),
    },
    {
      key: 'status',
      label: 'Status',
      render: (value: string) => statusBadge(value),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_: any, row: Product) => (
        <div className="flex items-center gap-2">
          <Button
            onClick={() => handleView(row)}
            variant="ghost"
            size="sm"
            leftIcon={<EyeIcon size={14} />}
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
          >
            View
          </Button>
          <Button
            onClick={() => handleDelete(row)}
            variant="ghost"
            size="sm"
            leftIcon={<Trash2 size={14} />}
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-error/10 text-error rounded-lg hover:bg-error/20 transition-colors"
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const filters: FilterConfig[] = [
    {
      key: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { value: '', label: 'All Status' },
        { value: 'active', label: 'Active Only' },
        { value: 'inactive', label: 'Inactive Only' },
        { value: 'draft', label: 'Draft' },
        { value: 'discontinued', label: 'Discontinued' }
      ],
      placeholder: 'All Status',
    },
    {
      key: 'category',
      label: 'Category',
      type: 'select',
      options: [
        { value: '', label: 'All Categories' },
        { value: 'electronics', label: 'Electronics' },
        { value: 'clothing', label: 'Clothing' },
        { value: 'food', label: 'Food' },
        { value: 'books', label: 'Books' },
        { value: 'toys', label: 'Toys' }
      ],
      placeholder: 'All Categories',
    },
  ];

  const statusBadge = (status: string) => {
    const statusConfig = {
      active: { bg: 'bg-success/20', text: 'text-success', label: 'Active' },
      inactive: { bg: 'bg-error/20', text: 'text-error', label: 'Inactive' },
      draft: { bg: 'bg-warning/20', text: 'text-warning', label: 'Draft' },
      discontinued: { bg: 'bg-gray-500/20', text: 'text-gray-500', label: 'Discontinued' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.active;
    
    return (
      <span className={`px-2 py-1 rounded-full text-sm font-semibold ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  const stockBadge = (stock: number) => {
    if (stock === 0) {
      return <span className="px-2 py-1 rounded-full text-sm font-semibold bg-error/20 text-error">Out of Stock</span>;
    } else if (stock <= 10) {
      return <span className="px-2 py-1 rounded-full text-sm font-semibold bg-warning/20 text-warning">Low Stock ({stock})</span>;
    } else {
      return <span className="px-2 py-1 rounded-full text-sm font-semibold bg-success/20 text-success">{stock} in Stock</span>;
    }
  };

  const handleView = (product: Product) => {
    navigate(`/admin/products/${product.id}`);
  };

  const handleDelete = (product: Product) => {
    setProductToDelete(product);
    deleteModal.open();
  };

  const confirmDelete = async () => {
    if (!productToDelete) return;

    setIsDeleting(true);
    try {
      // Optimistically remove from UI immediately
      setProducts(prev => prev.filter(p => p.id !== productToDelete.id));
      setPagination(prev => ({ ...prev, total: prev.total - 1 }));
      
      await AdminAPI.deleteProduct(productToDelete.id);
      toast.success('Product deleted successfully');
      deleteModal.close();
      setProductToDelete(null);
    } catch (error: any) {
      console.error('Failed to delete product:', error);
      toast.error(error?.response?.data?.message || 'Failed to delete product');
      // Revert the optimistic update on error
      setRefreshKey(prev => prev + 1);
    } finally {
      setIsDeleting(false);
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
  

  return (
    <div className={`space-y-3 ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-1">
          <div>
            <p className={`mt-1 text-sm lg:text-sm ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Manage product catalog and inventory</p>
          </div>
          <div className="flex gap-2 w-full lg:w-auto">
            <button
              onClick={() => navigate('/admin/products/new')}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm font-medium"
            >
              Add Product
            </button>
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
                  placeholder="Search products..."
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
                  { value: 'active', label: 'Active Only' },
                  { value: 'inactive', label: 'Inactive Only' },
                  { value: 'draft', label: 'Draft' },
                  { value: 'discontinued', label: 'Discontinued' }
                ]}
                value={statusFilter}
                onChange={setStatusFilter}
                placeholder="All Status"
                className="min-w-[120px]"
              />
              
              <Dropdown
                options={[
                  { value: '', label: 'All Categories' },
                  { value: 'electronics', label: 'Electronics' },
                  { value: 'clothing', label: 'Clothing' },
                  { value: 'food', label: 'Food' },
                  { value: 'books', label: 'Books' },
                  { value: 'toys', label: 'Toys' }
                ]}
                value={categoryFilter}
                onChange={setCategoryFilter}
                placeholder="All Categories"
                className="min-w-[120px]"
              />
              
              <Dropdown
                options={[
                  { value: 'created_at', label: 'Created' },
                  { value: 'name', label: 'Name' },
                  { value: 'price', label: 'Price' },
                  { value: 'stock', label: 'Stock' },
                  { value: 'category', label: 'Category' }
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
            {(debouncedSearchQuery || statusFilter || categoryFilter) && (
              <div className="flex items-center gap-2 pt-2 border-t border-gray-200 dark:border-gray-600">
                <span className="text-sm text-gray-600 dark:text-gray-400">Active filters:</span>
                {debouncedSearchQuery && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-sm rounded-full">
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
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-sm rounded-full">
                    Status: {statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}
                    <button
                      onClick={() => setStatusFilter('')}
                      className="ml-1 hover:text-primary-dark"
                    >
                      ×
                    </button>
                  </span>
                )}
                {categoryFilter && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-sm rounded-full">
                    Category: {categoryFilter.charAt(0).toUpperCase() + categoryFilter.slice(1)}
                    <button
                      onClick={() => setCategoryFilter('')}
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
                    setCategoryFilter('');
                  }}
                  className="text-sm text-primary hover:text-primary-dark underline"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>
        </div>

        <AdminDataTable
          data={products}
          loading={loading}
          error={error}
          pagination={pagination}
          columns={columns}
          fetchData={fetchData}
          searchPlaceholder="Search products..."
          filters={filters}
          actions={
            <button
              onClick={() => navigate('/admin/products/new')}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm font-medium"
            >
              Add Product
            </button>
          }
          emptyMessage="No products found"
          responsive="cards"
          limit={LIMIT}
          onRowClick={handleView}
        />

        <ConfirmModal
          isOpen={deleteModal.isOpen}
          onClose={deleteModal.close}
          title="Delete Product"
          message={`Are you sure you want to delete "${productToDelete?.name}"? This will permanently delete all variants, inventory, reviews, and cart items.`}
          confirmText={isDeleting ? 'Deleting...' : 'Delete'}
          cancelText="Cancel"
          variant="danger"
          onConfirm={confirmDelete}
          disabled={isDeleting}
        />
      </div>
  );
};

export default AdminProductsPage;
