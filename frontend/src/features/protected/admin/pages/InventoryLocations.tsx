import React, { useEffect, useState } from 'react';
import { Loader, AlertCircle, Plus, Edit, Trash2, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import AdminAPI from '@/api/admin';
import toast from 'react-hot-toast';
import AdminLayout from '../components/AdminLayout';
import AdminLayoutSkeleton from '../components/skeletons/AdminLayoutSkeleton';
import { InventoryLocationsSkeleton } from '../components/skeletons/InventorySkeleton';
import { useTheme } from '@/components/shared/contexts/ThemeContext';
import { Button } from '@/components/ui/Button';
import { Text, Heading, Caption, Label } from '@/components/ui/Text/Text';

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

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setLoading(true);
        if (page === 1) {
          setInitialLoading(true);
        }
        setError(null);
        const response = await AdminAPI.getWarehouseLocations();
        const data = response?.data || response;
        setLocations(Array.isArray(data) ? data : []);
      } catch (err: any) {
        const message = err?.response?.data?.message || 'Failed to load warehouse locations';
        setError(message);
        toast.error(message);
      } finally {
        setLoading(false);
        setInitialLoading(false);
      }
    };

    fetchLocations();
  }, []);

  const statusBadge = (isActive: boolean) => {
    return (
      <Text as="span" className={`px-3 py-1 rounded-full text-xs font-semibold ${
        isActive ? 'bg-success/20 text-success' : 'bg-error/20 text-error'
      }`}>
        {isActive ? 'Active' : 'Inactive'}
      </Text>
    );
  };

  const capacityBadge = (current?: number, total?: number) => {
    if (current === undefined || total === undefined) {
      return <Text as="span" className={`text-xs ${currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>N/A</Text>;
    }
    
    const percentage = (current / total) * 100;
    const colorClass = 
      percentage >= 90 ? 'text-error' :
      percentage >= 75 ? 'text-warning' :
      percentage >= 50 ? 'text-blue-500' :
      'text-success';
    
    return (
      <Text as="span" className={`text-xs font-medium ${colorClass}`}>
        {current}/{total} ({percentage.toFixed(1)}%)
      </Text>
    );
  };

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
        <Button
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm"
          leftIcon={<Plus className="w-4 h-4" />}
        >
          Add Location
        </Button>
      </div>

      {error && (
        <div className={`p-4 rounded-lg border flex items-start gap-3 ${
          currentTheme === 'dark' 
            ? 'bg-error/10 border-error/30 text-error' 
            : 'bg-error/10 border-error/30 text-error'
        }`}>
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Error</p>
            <p className="text-sm">{error}</p>
          </div>
        </div>
      )}

      <div className={`rounded-lg border overflow-hidden ${currentTheme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold">All Locations ({locations.length})</h2>
        </div>

        {locations.length > 0 ? (
          <>
            {/* Desktop table */}
            <div className="overflow-x-auto hidden md:block">
              <table className="w-full">
                <thead className={`${currentTheme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} border-b border-gray-200 dark:border-gray-600`}>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold">Location</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold">Address</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold">Contact</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold">Capacity</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold">Created</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {locations.map((location) => (
                    <tr key={location.id} className={`border-b border-gray-200 dark:border-gray-700 transition-colors ${currentTheme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <MapPin className="w-4 h-4 text-primary" />
                          </div>
                          <div className="min-w-0">
                            <Text as="p" className="text-xs font-medium truncate max-w-[120px]">{location.name}</Text>
                            <Caption className="text-xs text-gray-500 dark:text-gray-400 truncate">Code: {location.code}</Caption>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-xs max-w-[150px]">
                          <Text as="p" className="truncate">{location.address}</Text>
                          <Caption className="text-gray-500 dark:text-gray-400 truncate">{location.city}, {location.state} {location.postal_code}</Caption>
                          <Caption className="text-gray-500 dark:text-gray-400 truncate">{location.country}</Caption>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-xs max-w-[120px]">
                          {location.manager_name && (
                            <Text as="p" className="font-medium truncate">{location.manager_name}</Text>
                          )}
                          {location.phone && (
                            <Caption className="text-gray-500 dark:text-gray-400 truncate">{location.phone}</Caption>
                          )}
                          {location.email && (
                            <Caption className="text-gray-500 dark:text-gray-400 truncate">{location.email}</Caption>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        {capacityBadge(location.current_capacity, location.total_capacity)}
                      </td>
                      <td className="px-4 py-3">
                        {statusBadge(location.is_active)}
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-500 dark:text-gray-400">
                        {new Date(location.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 text-xs">
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
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden divide-y divide-gray-200 dark:divide-gray-700">
              {locations.map((location) => (
                <div key={location.id} className={`p-4 flex flex-col gap-2 transition-colors ${currentTheme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <MapPin className="w-4 h-4 text-primary" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium truncate">{location.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">Code: {location.code}</p>
                      </div>
                    </div>
                    {statusBadge(location.is_active)}
                  </div>
                  <div className="text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Address:</span>
                      <span className="truncate ml-2 flex-1 text-right">{location.address}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 dark:text-gray-400">City:</span>
                      <span className="truncate ml-2 flex-1 text-right">{location.city}, {location.state}</span>
                    </div>
                    {location.manager_name && (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500 dark:text-gray-400">Manager:</span>
                        <span className="truncate ml-2 flex-1 text-right">{location.manager_name}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Capacity:</span>
                      <span className="ml-2">{capacityBadge(location.current_capacity, location.total_capacity)}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Button
                      className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors text-sm"
                      variant="primary"
                      size="sm"
                      leftIcon={<Edit className="w-4 h-4" />}
                    >
                      Edit
                    </Button>
                    <Button
                      className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-2 bg-error/10 text-error rounded-lg hover:bg-error/20 transition-colors text-sm"
                      variant="danger"
                      size="sm"
                      leftIcon={<Trash2 className="w-4 h-4" />}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className={`px-4 py-4 border-t ${currentTheme === 'dark' ? 'border-gray-700' : 'border-gray-200'} flex flex-col sm:flex-row items-center justify-between gap-4`}>
              <p className={`text-xs ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                Showing {locations.length} warehouse locations
              </p>
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1}
                  variant="outline"
                  size="sm"
                  className={`inline-flex items-center gap-1 px-3 py-2 rounded-lg border text-xs font-medium transition-colors ${
                    currentTheme === 'dark' 
                      ? 'bg-gray-800 border-gray-700 text-gray-200' 
                      : 'bg-white border-gray-300 text-gray-700'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>
                <span className={`text-xs px-2 ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  Page {page}
                </span>
                <Button
                  onClick={() => setPage((p) => p + 1)}
                  disabled={locations.length < LIMIT}
                  variant="outline"
                  size="sm"
                  className={`inline-flex items-center gap-1 px-3 py-2 rounded-lg border text-xs font-medium transition-colors ${
                    currentTheme === 'dark' 
                      ? 'bg-gray-800 border-gray-700 text-gray-200' 
                      : 'bg-white border-gray-300 text-gray-700'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className={`p-8 text-center ${currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            <div className="flex flex-col items-center gap-3">
              <MapPin className={`w-12 h-12 ${currentTheme === 'dark' ? 'text-gray-600' : 'text-gray-300'}`} />
              <p className="text-sm">No warehouse locations found</p>
              <Button
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm"
                leftIcon={<Plus className="w-4 h-4" />}
              >
                Add Your First Location
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
    </AdminLayout>
  );
};

export default AdminInventoryLocations;
