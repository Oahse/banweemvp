import { useEffect, useState } from 'react';
import { Loader, AlertCircle, Plus, Edit, Trash2, MapPin } from 'lucide-react';
import AdminAPI from '@/api/admin';
import toast from 'react-hot-toast';
import AdminLayout from '../../../../components/layout/AdminLayout';
import AdminLayoutSkeleton from '../components/skeletons/AdminLayoutSkeleton';
import { InventoryLocationsSkeleton } from '../components/skeletons/InventorySkeleton';
import { useTheme } from '@/components/shared/contexts/ThemeContext';
import { Button } from '@/components/ui/Button';
import { Text, Heading, Caption, Label } from '@/components/ui/Text/Text';
import { AdminDataTable, AdminColumn, FilterConfig } from '../components/shared/AdminDataTable';
import { Card } from '@/components/ui/Card';

const LIMIT = 20;

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

interface WarehouseLocation {
  id: string;
  name: string;
  code: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  phone?: string;
  email?: string;
  manager_name?: string;
  is_active: boolean;
  total_capacity?: number;
  current_capacity?: number;
  created_at: string;
  updated_at?: string;
}

export const AdminInventoryLocations = () => {
  const { currentTheme } = useTheme();
  const [locations, setLocations] = useState<WarehouseLocation[]>([]);
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

  const fetchData = async (params: any) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await AdminAPI.getWarehouseLocations();
      const allLocations = response?.data || [];
      let filteredLocations = allLocations;
      
      if (params.search) {
        filteredLocations = filteredLocations.filter((location: any) =>
          location.name?.toLowerCase().includes(params.search.toLowerCase()) ||
          location.code?.toLowerCase().includes(params.search.toLowerCase()) ||
          location.address?.toLowerCase().includes(params.search.toLowerCase()) ||
          location.city?.toLowerCase().includes(params.search.toLowerCase()) ||
          location.state?.toLowerCase().includes(params.search.toLowerCase()) ||
          location.country?.toLowerCase().includes(params.search.toLowerCase()) ||
          location.manager_name?.toLowerCase().includes(params.search.toLowerCase())
        );
      }
      
      if (params.filters?.status) {
        filteredLocations = filteredLocations.filter((location: any) => 
          params.filters.status === 'active' ? location.is_active : !location.is_active
        );
      }
      
      if (params.sort_by === 'name') {
        filteredLocations.sort((a: any, b: any) => {
          const aName = (a.name || '').toLowerCase();
          const bName = (b.name || '').toLowerCase();
          return params.sort_order === 'asc' 
            ? aName.localeCompare(bName)
            : bName.localeCompare(aName);
        });
      } else if (params.sort_by === 'created_at') {
        filteredLocations.sort((a: any, b: any) => {
          const aDate = new Date(a.created_at || 0);
          const bDate = new Date(b.created_at || 0);
          return params.sort_order === 'asc' 
            ? aDate.getTime() - bDate.getTime()
            : bDate.getTime() - aDate.getTime();
        });
      } else if (params.sort_by === 'current_capacity') {
        filteredLocations.sort((a: any, b: any) => {
          const aCapacity = a.current_capacity || 0;
          const bCapacity = b.current_capacity || 0;
          return params.sort_order === 'asc' 
            ? aCapacity - bCapacity
            : bCapacity - aCapacity;
        });
      }
      
      const total = filteredLocations.length;
      const pages = Math.max(1, Math.ceil(total / params.limit));
      const startIndex = (params.page - 1) * params.limit;
      const endIndex = startIndex + params.limit;
      const paginatedLocations = filteredLocations.slice(startIndex, endIndex);
      
      setLocations(paginatedLocations);
      setPagination({
        page: params.page,
        limit: params.limit,
        total: total,
        pages: pages
      });
    } catch (err: any) {
      const message = err?.response?.data?.message || 'Failed to load warehouse locations';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  };

  const statusBadge = (isActive: boolean) => {
    return (
      <Text className={`px-3 py-1 rounded-full text-xs font-semibold ${
        isActive ? 'bg-success/20 text-success' : 'bg-error/20 text-error'
      }`}>
        {isActive ? 'Active' : 'Inactive'}
      </Text>
    );
  };

  const capacityBadge = (current?: number, total?: number) => {
    if (current === undefined || total === undefined) {
      return <Text className={`text-xs ${currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>N/A</Text>;
    }
    
    const percentage = (current / total) * 100;
    const colorClass = 
      percentage >= 90 ? 'text-error' :
      percentage >= 75 ? 'text-warning' :
      percentage >= 50 ? 'text-blue-500' :
      'text-success';
    
    return (
      <Text className={`text-xs font-medium ${colorClass}`}>
        {current}/{total} ({percentage.toFixed(1)}%)
      </Text>
    );
  };

  // Define columns for AdminDataTable
  const columns: AdminColumn<any>[] = [
    {
      key: 'name',
      label: 'Location',
      sortable: true,
      render: (value: string, row: any) => (
        <div className="flex items-center gap-2">
          <div className="p-2 bg-primary/10 rounded-lg">
            <MapPin className="w-4 h-4 text-primary" />
          </div>
          <div className="min-w-0">
            <Text className="text-xs font-medium truncate max-w-[120px]">{value}</Text>
            <Caption className="text-xs text-gray-500 dark:text-gray-400 truncate">Code: {row.code}</Caption>
          </div>
        </div>
      ),
    },
    {
      key: 'address',
      label: 'Address',
      render: (value: string, row: any) => (
        <div className="text-xs max-w-[150px]">
          <Text className="truncate">{value}</Text>
          <Caption className="text-gray-500 dark:text-gray-400 truncate">{row.city}, {row.state} {row.postal_code}</Caption>
          <Caption className="text-gray-500 dark:text-gray-400 truncate">{row.country}</Caption>
        </div>
      ),
    },
    {
      key: 'contact',
      label: 'Contact',
      render: (_: any, row: any) => (
        <div className="text-xs max-w-[120px]">
          {row.manager_name && (
            <Text className="font-medium truncate">{row.manager_name}</Text>
          )}
          {row.phone && (
            <Caption className="text-gray-500 dark:text-gray-400 truncate">{row.phone}</Caption>
          )}
          {row.email && (
            <Caption className="text-gray-500 dark:text-gray-400 truncate">{row.email}</Caption>
          )}
        </div>
      ),
    },
    {
      key: 'current_capacity',
      label: 'Capacity',
      sortable: true,
      render: (_: any, row: any) => capacityBadge(row.current_capacity, row.total_capacity),
    },
    {
      key: 'is_active',
      label: 'Status',
      render: (value: boolean) => statusBadge(value),
    },
    {
      key: 'created_at',
      label: 'Created',
      sortable: true,
      render: (value: string) => (
        <Text className="text-xs text-gray-500 dark:text-gray-400">
          {new Date(value).toLocaleDateString()}
        </Text>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_: any, row: any) => (
        <div className="flex items-center gap-2">
          <Button
            className={`p-1 rounded transition-colors ${currentTheme === 'dark' ? 'text-primary hover:bg-primary/10' : 'text-primary hover:bg-primary/10'}`}
            variant="ghost"
            size="sm"
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            className={`p-1 rounded transition-colors ${currentTheme === 'dark' ? 'text-error hover:bg-error/10' : 'text-error hover:bg-error/10'}`}
            variant="danger"
            size="sm"
          >
            <Trash2 className="w-4 h-4" />
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
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' }
      ],
      placeholder: 'All Status',
    },
  ];

  useEffect(() => {
    fetchData({
      page: 1,
      limit: LIMIT,
      search: '',
      sort_by: 'name',
      sort_order: 'asc'
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
            <Heading level={1} className="text-xl lg:text-2xl font-semibold">Warehouse Locations</Heading>
            <Caption className={`mt-1 text-xs lg:text-sm ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Manage warehouse and storage locations</Caption>
          </div>
          <div className="flex gap-2 w-full lg:w-auto">
            <Button
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm"
              leftIcon={<Plus className="w-4 h-4" />}
            >
              Add Location
            </Button>
          </div>
        </div>

        <AdminDataTable
          data={locations}
          loading={loading}
          error={error}
          pagination={pagination}
          columns={columns}
          fetchData={fetchData}
          searchPlaceholder="Search locations..."
          filters={filters}
          actions={
            <Button
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm"
              leftIcon={<Plus className="w-4 h-4" />}
            >
              Add Location
            </Button>
          }
          emptyMessage="No warehouse locations found"
          responsive="cards"
          limit={LIMIT}
        />
      </div>
    </AdminLayout>
  );
};

export default AdminInventoryLocations;
