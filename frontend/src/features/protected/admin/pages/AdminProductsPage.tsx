import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useTheme } from '@/components/shared/contexts/ThemeContext';
import AdminLayout from '../components/AdminLayout';
import { Button } from '@/components/ui/Button';
import { Heading, Body, Text } from '@/components/ui/Text/Text';
import { ProductsListSkeleton } from '../components/skeletons/ProductsSkeleton';
import { useLocale } from '@/i18n';
import { AlertCircle, ArrowUpDownIcon, EyeIcon, PackageIcon, SearchIcon } from 'lucide-react';
import Dropdown from '@/components/ui/Dropdown';

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
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

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
    const handleInventoryUpdated = (event: Event) => {
      const detail = (event as CustomEvent).detail as { productId: string; stock: number } | undefined;
      if (!detail?.productId) {
        return;
      }

      setProducts(prev => prev.map(product => (
        product.id === detail.productId
          ? { ...product, stock: detail.stock, total_stock: detail.stock, updated_at: new Date().toISOString() }
          : product
      )));
      setRefreshKey(prev => prev + 1);
    };

    const handleProductCreated = (event: Event) => {
      // Refetch products list when a new product is created
      setPage(1);
      setRefreshKey(prev => prev + 1);
    };

    window.addEventListener('inventory:updated', handleInventoryUpdated);
    window.addEventListener('product:created', handleProductCreated);
    return () => {
      window.removeEventListener('inventory:updated', handleInventoryUpdated);
      window.removeEventListener('product:created', handleProductCreated);
    };
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (!hasLoadedRef.current) {
          setInitialLoading(true);
        } else {
          setLoading(true);
        }
        setError(null);
        console.log('Fetching products with params:', {
          page,
          limit: LIMIT,
          search: debouncedSearchQuery || undefined,
          status: statusFilter || undefined,
          category: categoryFilter || undefined,
          sort_by: sortBy,
          sort_order: sortOrder
        });
        
        // For now, we'll use the existing API and handle pagination on frontend
        const response = await AdminAPI.getProducts({
          page,
          limit: LIMIT,
          search: debouncedSearchQuery || undefined,
          status: statusFilter || undefined,
          category: categoryFilter || undefined,
          sort_by: sortBy,
          sort_order: sortOrder
        });
        
        // Handle response format
        console.log('API Response:', response);
        const responseData = response?.data || {};
        const data = responseData?.data || [];  // The products array
        const paginationData = responseData?.pagination || { page, limit: LIMIT, total: 0, pages: 0 };
        const allProducts = Array.isArray(data) ? data : [];
        console.log('Parsed products:', allProducts, 'Pagination:', paginationData);
        
        const normalizedProducts = allProducts.map((product: any) => ({
          ...product,
          stock: product.stock ?? product.total_stock ?? product.primary_variant?.stock ?? 0,
          status: product.is_active ? 'active' : 'inactive',
          price: product.price ?? product.min_price ?? 0
        }));
        
        // Apply client-side filtering and sorting if needed
        let filteredProducts = normalizedProducts;
        
        // Apply search filter
        if (debouncedSearchQuery) {
          filteredProducts = filteredProducts.filter((product: any) =>
            product.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
            product.description?.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
            product.category?.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
            product.supplier?.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
          );
        }
        
        // Apply status filter
        if (statusFilter) {
          filteredProducts = filteredProducts.filter((product: any) => product.status === statusFilter);
        }
        
        // Apply category filter
        if (categoryFilter) {
          filteredProducts = filteredProducts.filter((product: any) => product.category === categoryFilter);
        }
        
        // Apply sorting
        if (sortBy === 'created_at') {
          filteredProducts.sort((a: any, b: any) => {
            const aDate = new Date(a.created_at || 0);
            const bDate = new Date(b.created_at || 0);
            return sortOrder === 'asc' 
              ? aDate.getTime() - bDate.getTime()
              : bDate.getTime() - aDate.getTime();
          });
        } else if (sortBy === 'name') {
          filteredProducts.sort((a: any, b: any) => {
            const aName = (a.name || '').toLowerCase();
            const bName = (b.name || '').toLowerCase();
            return sortOrder === 'asc' 
              ? aName.localeCompare(bName)
              : bName.localeCompare(aName);
          });
        } else if (sortBy === 'price') {
          filteredProducts.sort((a: any, b: any) => {
            return sortOrder === 'asc' 
              ? a.price - b.price
              : b.price - a.price;
          });
        } else if (sortBy === 'stock') {
          filteredProducts.sort((a: any, b: any) => {
            return sortOrder === 'asc' 
              ? a.stock - b.stock
              : b.stock - a.stock;
          });
        }
        
        setProducts(normalizedProducts);
        setPagination({
          page: paginationData.page || page,
          limit: paginationData.limit || LIMIT,
          total: paginationData.total || 0,
          pages: paginationData.pages || 0
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

    fetchProducts();
  }, [page, debouncedSearchQuery, statusFilter, categoryFilter, sortBy, sortOrder, refreshKey]);

  const statusBadge = (status: string) => {
    const statusConfig = {
      active: { bg: 'bg-success/20', text: 'text-success', label: 'Active' },
      inactive: { bg: 'bg-error/20', text: 'text-error', label: 'Inactive' },
      draft: { bg: 'bg-warning/20', text: 'text-warning', label: 'Draft' },
      discontinued: { bg: 'bg-gray-500/20', text: 'text-gray-500', label: 'Discontinued' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.active;
    
    return (
      <Text as="span" className={`px-2 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}>
        {config.label}
      </Text>
    );
  };

  const stockBadge = (stock: number) => {
    if (stock === 0) {
      return <Text as="span" className="px-2 py-1 rounded-full text-xs font-semibold bg-error/20 text-error">Out of Stock</Text>;
    } else if (stock <= 10) {
      return <Text as="span" className="px-2 py-1 rounded-full text-xs font-semibold bg-warning/20 text-warning">Low Stock ({stock})</Text>;
    } else {
      return <Text as="span" className="px-2 py-1 rounded-full text-xs font-semibold bg-success/20 text-success">{stock} in Stock</Text>;
    }
  };

  const handleView = (product: Product) => {
    navigate(`/admin/products/${product.id}`);
  };

  const handleDelete = (product: Product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
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
      setShowDeleteModal(false);
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

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setProductToDelete(null);
  };

  if (initialLoading) {
    return (
      <AdminLayout>
        <ProductsListSkeleton />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className={`space-y-3 ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-1">
          <div>
            <Heading level={1} className="text-xl font-bold">Products</Heading>
            <Body className={`mt-1 text-xs lg:text-sm ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Manage product catalog and inventory</Body>
          </div>
        <div className="flex gap-2 w-full lg:w-auto">
          <Button
            onClick={() => navigate('/admin/products/new')}
            variant="primary"
            leftIcon={<PackageIcon size={16} />}
          >
            Add Product
          </Button>
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
            
            <Button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              variant="outline"
              size="sm"
              leftIcon={<ArrowUpDownIcon size={14} />}
            >
              Sort {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
            </Button>
          </div>

          {/* Active Filters */}
          {(debouncedSearchQuery || statusFilter || categoryFilter) && (
            <div className="flex items-center gap-2 pt-2 border-t border-gray-200 dark:border-gray-600">
              <Text as="span" className="text-sm text-gray-600 dark:text-gray-400">Active filters:</Text>
              {debouncedSearchQuery && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                  Search: "{debouncedSearchQuery}"
                  <Button
                    onClick={() => setSearchQuery('')}
                    variant="ghost"
                    size="icon"
                    className="ml-1"
                  >
                    <X size={12} />
                  </Button>
                </span>
              )}
              {statusFilter && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                  Status: {statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}
                  <Button
                    onClick={() => setStatusFilter('')}
                    variant="ghost"
                    size="icon"
                    className="ml-1"
                  >
                    <X size={12} />
                  </Button>
                </span>
              )}
              {categoryFilter && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                  Category: {categoryFilter.charAt(0).toUpperCase() + categoryFilter.slice(1)}
                  <Button
                    onClick={() => setCategoryFilter('')}
                    variant="ghost"
                    size="icon"
                    className="ml-1"
                  >
                    <X size={12} />
                  </Button>
                </span>
              )}
              <Button
                onClick={() => {
                  setSearchQuery('');
                  setStatusFilter('');
                  setCategoryFilter('');
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
            <p className="font-semibold">Error Loading Products</p>
            <p className="text-sm mt-1">{error}</p>
            <Button
              onClick={() => window.location.reload()}
              variant="ghost"
              size="sm"
            >
              Try again
            </Button>
          </div>
        </div>
      )}

      <div className={`rounded-lg border overflow-hidden ${currentTheme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        
        {loading && !initialLoading ? (
          <div className="p-8">
            <div className="flex items-center justify-center">
              <Loader className="w-8 h-8 text-primary animate-spin mr-3" />
              <span className={`text-sm ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Updating products...</span>
            </div>
          </div>
        ) : products.length > 0 ? (
          <>
            {/* Desktop table */}
            <div className="overflow-x-auto hidden md:block">
              <table className="w-full">
                <thead className={`${currentTheme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} border-b border-gray-200`}>
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Category</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Price</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Stock</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product: any) => (
                    <tr key={product.id} className={`border-b border-gray-200 transition-colors ${currentTheme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{product.name || 'N/A'}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{product.category || 'N/A'}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">{formatCurrency(product.price)}</td>
                      <td className="px-6 py-4 text-sm">{stockBadge(product.stock)}</td>
                      <td className="px-6 py-4 text-sm">{statusBadge(product.status)}</td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Button 
                            onClick={() => handleView(product)}
                            variant="primary"
                            size="sm"
                            leftIcon={<EyeIcon size={14} />}
                          >
                            View
                          </Button>
                          <Button 
                            onClick={() => handleDelete(product)}
                            variant="danger"
                            size="sm"
                            leftIcon={<Trash2 size={14} />}
                          >
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden divide-y divide-gray-200">
              {products.map((product: any) => (
                <div
                  key={product.id}
                  className={`p-4 flex flex-col gap-2 bg-white dark:bg-gray-800 transition-colors ${currentTheme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <Heading level={3} className="font-medium text-sm">{product.name || 'N/A'}</Heading>
                      <Body className="text-xs text-gray-600 dark:text-gray-300">{product.category || 'N/A'}</Body>
                      <Body className="text-sm font-semibold">{formatCurrency(product.price)}</Body>
                      <Body className="text-xs">{stockBadge(product.stock)}</Body>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button 
                        onClick={() => handleView(product)}
                        variant="primary"
                        size="sm"
                        leftIcon={<EyeIcon size={14} />}
                      >
                        View
                      </Button>
                      <Button 
                        onClick={() => handleDelete(product)}
                        variant="danger"
                        size="sm"
                        leftIcon={<Trash2 size={14} />}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

        {error && (
          <div className={`p-4 rounded-lg border flex items-start gap-3 ${
            currentTheme === 'dark' 
              ? 'bg-error/10 border-error/30 text-error' 
              : 'bg-error/10 border-error/30 text-error'
          }`}>
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <Body className="font-semibold">Error Loading Products</Body>
              <Body className="text-sm mt-1">{error}</Body>
              <Button
                onClick={() => window.location.reload()}
                variant="link"
                size="sm"
                className={`mt-2 text-sm underline hover:no-underline ${
                  currentTheme === 'dark' ? 'text-error hover:text-error-light' : 'text-error hover:text-error-dark'
                }`}
              >
                Try again
              </Button>
            </div>
          </div>
        )}

        <div className={`rounded-lg border overflow-hidden ${currentTheme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          
          {loading && !initialLoading ? (
            <div className="p-8">
              <div className="flex items-center justify-center">
                <Loader className="w-8 h-8 text-primary animate-spin mr-3" />
                <Text className={`text-sm ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Updating products...</Text>
              </div>
            </div>
          ) : products.length > 0 ? (
            <>
              {/* Desktop table */}
              <div className="overflow-x-auto hidden md:block">
                <table className="w-full">
                  <thead className={`${currentTheme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} border-b border-gray-200`}>
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Name</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Category</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Price</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Stock</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Status</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product: any) => (
                      <tr key={product.id} className={`border-b border-gray-200 transition-colors ${currentTheme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{product.name || 'N/A'}</td>
                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{product.category || 'N/A'}</td>
                        <td className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">{formatCurrency(product.price)}</td>
                        <td className="px-6 py-4 text-sm">{stockBadge(product.stock)}</td>
                        <td className="px-6 py-4 text-sm">{statusBadge(product.status)}</td>
                        <td className="px-6 py-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Button 
                              onClick={() => handleView(product)}
                              variant="ghost"
                              size="sm"
                              className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
                            >
                              <EyeIcon size={14} />
                              View
                            </Button>
                            <Button 
                              onClick={() => handleDelete(product)}
                              variant="ghost"
                              size="sm"
                              className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-colors"
                            >
                              <Trash2 size={14} />
                              Delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}
              <div className="md:hidden divide-y divide-gray-200">
                {products.map((product: any) => (
                  <div
                    key={product.id}
                    className={`p-4 flex flex-col gap-2 bg-white dark:bg-gray-800 transition-colors ${currentTheme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900 dark:text-white">{product.name || 'N/A'}</span>
                      {statusBadge(product.status)}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Category: {product.category || 'N/A'}</div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">{formatCurrency(product.price)}</span>
                      {stockBadge(product.stock)}
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Button 
                        onClick={() => handleView(product)}
                        variant="ghost"
                        size="sm"
                        className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-1.5 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors text-sm"
                      >
                        <EyeIcon size={14} />
                        View
                      </Button>
                      <Button 
                        onClick={() => handleDelete(product)}
                        variant="ghost"
                        size="sm"
                        className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-1.5 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-colors text-sm"
                      >
                        <Trash2 size={14} />
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>


            </>
          ) : (
            <div className="p-8 text-center">
              <PackageIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className={`text-sm ${currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>No products found</p>
            </div>
          )}
          
          {/* Always show pagination */}
          <div className={`px-6 py-4 border-t ${currentTheme === 'dark' ? 'border-gray-700' : 'border-gray-200'} flex flex-col sm:flex-row items-center justify-between gap-4`}>
            <p className={`text-sm ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              {pagination.total > 0
                ? `Showing ${(pagination.page - 1) * pagination.limit + 1}–${Math.min(pagination.page * pagination.limit, pagination.total)} of ${pagination.total} items`
                : `Total: ${pagination.total} items`
              }
              {pagination.total > 0 && pagination.pages > 1 && ` (Page ${pagination.page} of ${pagination.pages || 1})`}
            </p>
            <div className="flex items-center gap-1">
              <Button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                variant="outline"
                size="sm"
                className={`inline-flex items-center gap-1 px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${
                  currentTheme === 'dark' 
                    ? 'border-gray-600 bg-gray-800 text-white hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed' 
                    : 'border-gray-300 bg-white text-gray-900 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>
              
              {/* Page numbers */}
              <div className="flex items-center gap-1 mx-2">
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
                    <Button
                      key={pageNum}
                      onClick={() => setPage(pageNum)}
                      variant={pageNum === page ? "primary" : "ghost"}
                      size="sm"
                      className={`w-8 h-8 rounded-md text-sm font-medium transition-colors ${
                        pageNum === page
                          ? 'bg-primary text-white'
                          : currentTheme === 'dark'
                            ? 'text-gray-300 hover:bg-gray-700 border border-gray-600'
                            : 'text-gray-700 hover:bg-gray-50 border border-gray-300'
                      }`}
                    >
                      {pageNum}
                    </Button>
                  );
                })}
              </div>
              
              <Button
                onClick={() => setPage((p) => Math.min(pagination.pages || 1, p + 1))}
                disabled={page >= (pagination.pages || 1)}
                variant="outline"
                size="sm"
                className={`inline-flex items-center gap-1 px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${
                  currentTheme === 'dark' 
                    ? 'border-gray-600 bg-gray-800 text-white hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed' 
                    : 'border-gray-300 bg-white text-gray-900 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
                }`}
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteModal && productToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div 
              className={`relative w-full max-w-sm rounded-xl shadow-2xl ${
                currentTheme === 'dark' ? 'bg-gray-800' : 'bg-white'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <Button
                onClick={cancelDelete}
                disabled={isDeleting}
                variant="ghost"
                size="sm"
                className={`absolute top-3 right-3 p-0.5 rounded-md transition-colors ${
                  currentTheme === 'dark' 
                    ? 'hover:bg-gray-700 text-gray-400 hover:text-gray-300' 
                    : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                } disabled:opacity-50`}
              >
                <X size={16} />
              </Button>

              <div className="p-5">
                {/* Icon */}
                <div className="flex items-center justify-center w-11 h-11 mx-auto mb-3 rounded-full bg-red-500/10">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                </div>

                {/* Title */}
                <Heading level={3} className={`text-lg font-semibold text-center mb-1.5 ${
                  currentTheme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  Delete Product
                </Heading>

                {/* Message */}
                <Body className={`text-sm text-center mb-4 ${
                  currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Are you sure you want to delete "{productToDelete?.name || 'this product'}"? This action cannot be undone.
                </Body>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button
                    onClick={cancelDelete}
                    disabled={isDeleting}
                    variant="outline"
                    size="sm"
                    className={`flex-1 px-3 py-2 text-sm rounded-lg font-medium transition-colors ${
                      currentTheme === 'dark'
                        ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={confirmDelete}
                    disabled={isDeleting}
                    variant="danger"
                    size="sm"
                    isLoading={isDeleting}
                    className="flex-1 px-3 py-2 text-sm bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
                    leftIcon={isDeleting ? <Loader className="w-3.5 h-3.5 animate-spin" /> : <Trash2 size={14} />}
                  >
                    {isDeleting ? 'Deleting...' : 'Delete'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminProductsPage;
