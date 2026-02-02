import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusIcon, EyeIcon, EditIcon, TrashIcon, PackageIcon } from 'lucide-react';
import AdminAPI from '../../api/admin';
import toast from 'react-hot-toast';
import { useTheme } from '../../store/ThemeContext';
import { useLocale } from '../../store/LocaleContext';
import { 
  PageLayout, 
  DataTable, 
  FilterBar 
} from './shared';
import { PRODUCT_STATUSES } from '../../config/product';

// Types
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

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export const Products = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { formatCurrency } = useLocale();
  
  // State
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationInfo>({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<Record<string, string>>({});

  // Filter configuration
  const filterConfig = [
    {
      key: 'status',
      label: 'Status',
      type: 'select' as const,
      options: PRODUCT_STATUSES
    },
    {
      key: 'category',
      label: 'Category',
      type: 'select' as const,
      options: [
        { value: 'electronics', label: 'Electronics' },
        { value: 'clothing', label: 'Clothing' },
        { value: 'food', label: 'Food' },
        { value: 'books', label: 'Books' }
      ]
    },
    {
      key: 'supplier',
      label: 'Supplier',
      type: 'text' as const,
      placeholder: 'Search supplier...'
    }
  ];

  // Table columns
  const columns = [
    {
      key: 'name',
      label: 'Product',
      render: (value: string, row: Product) => (
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-md flex items-center justify-center">
            <PackageIcon className="h-6 w-6 text-gray-400" />
          </div>
          <div>
            <div className="text-sm font-medium text-gray-900">{value}</div>
            <div className="text-sm text-gray-500">{row.slug}</div>
          </div>
        </div>
      )
    },
    {
      key: 'category',
      label: 'Category',
      render: (value: any) => {
        // Handle both string and object values
        const displayValue = typeof value === 'object' && value !== null ? 
          (value.name || value.id || 'Unknown') : 
          value;
        return (
          <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
            {displayValue}
          </span>
        );
      }
    },
    {
      key: 'supplier',
      label: 'Supplier',
      render: (value: any) => {
        // Handle both string and object values
        const displayValue = typeof value === 'object' && value !== null ? 
          (value.full_name || value.name || value.email || value.id || 'Unknown') : 
          value;
        return (
          <span className="text-sm text-gray-900">{displayValue}</span>
        );
      }
    },
    {
      key: 'price',
      label: 'Price',
      render: (value: number) => (
        <span className="text-sm font-medium text-gray-900">
          {formatCurrency(value)}
        </span>
      ),
      align: 'right' as const
    },
    {
      key: 'stock',
      label: 'Stock',
      render: (value: number) => (
        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
          value > 10 
            ? 'bg-success text-success-dark dark:bg-success-dark dark:text-success-light' 
            : value > 0 
            ? 'bg-warning text-warning-dark dark:bg-warning-dark dark:text-warning-light' 
            : 'bg-error text-error-dark dark:bg-error-dark dark:text-error-light'
        }`}>
          {value} units
        </span>
      ),
      align: 'center' as const
    },
    {
      key: 'status',
      label: 'Status',
      render: (value: string) => {
        const statusColors = {
          active: 'bg-success text-success-dark dark:bg-success-dark dark:text-success-light',
          inactive: 'bg-error text-error-dark dark:bg-error-dark dark:text-error-light',
          draft: 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
        };
        
        return (
          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
            statusColors[value as keyof typeof statusColors] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
          }`}>
            {value}
          </span>
        );
      }
    },
    {
      key: 'created_at',
      label: 'Created',
      render: (value: string) => (
        <span className="text-sm text-gray-500">
          {new Date(value).toLocaleDateString()}
        </span>
      )
    }
  ];

  // Fetch data function
  const fetchData = async (params: any) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await AdminAPI.getAllProducts({
        page: params.page,
        limit: params.limit,
        search: params.search,
        status: params.filters?.status,
        category: params.filters?.category,
        supplier: params.filters?.supplier,
        sort_by: params.sort_by,
        sort_order: params.sort_order
      });
      
      if (response?.success && response?.data) {
        const data = response.data;
        setProducts(data.data || []);
        setPagination({
          page: data.pagination?.page || params.page,
          limit: data.pagination?.limit || params.limit,
          total: data.pagination?.total || 0,
          pages: data.pagination?.pages || 0
        });
      } else {
        throw new Error('Failed to fetch products');
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to load products';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Action handlers
  const handleViewProduct = (product: Product) => {
    navigate(`/admin/products/${product.id}`);
  };

  const handleEditProduct = (product: Product) => {
    navigate(`/admin/products/${product.id}/edit`);
  };

  const handleDeleteProduct = (product: Product) => {
    if (window.confirm(`Are you sure you want to delete "${product.name}"?`)) {
      // Implement delete functionality
      toast.success('Product deleted successfully');
      fetchData({ page: pagination.page, limit: 10 });
    }
  };

  const handleAddProduct = () => {
    navigate('/admin/products/new');
  };

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters };
    if (value) {
      newFilters[key] = value;
    } else {
      delete newFilters[key];
    }
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({});
    setSearchQuery('');
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  return (
    <PageLayout>
      <div className="space-y-6">
        {/* Filters */}
        <FilterBar
          filters={filterConfig}
          values={filters}
          onChange={handleFilterChange}
          onClear={handleClearFilters}
          searchValue={searchQuery}
          onSearchChange={handleSearchChange}
          searchPlaceholder="Search products..."
        />

        {/* Products Table */}
        <DataTable
          data={products}
          loading={loading}
          error={error}
          pagination={pagination}
          columns={columns}
          fetchData={fetchData}
          onView={handleViewProduct}
          onEdit={handleEditProduct}
          onDelete={handleDeleteProduct}
          searchable={false} // Search is handled by AdminFilterBar
          filterable={false} // Filters are handled by AdminFilterBar
          emptyMessage="No products found"
        />
      </div>
    </PageLayout>
  );
};

export default Products;
