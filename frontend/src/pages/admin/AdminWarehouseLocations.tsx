import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { SearchIcon, FilterIcon, EditIcon, TrashIcon, PlusIcon, MapPinIcon } from 'lucide-react';
import { usePaginatedApi } from '../../hooks/useApi';
import { AdminAPI } from '../../apis';
import ErrorMessage from '../../components/common/ErrorMessage';
import { ResponsiveTable } from '../../components/ui/ResponsiveTable';
import { toast } from 'react-hot-toast';

export const AdminWarehouseLocations = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [submittedSearchTerm, setSubmittedSearchTerm] = useState('');
  const [loadingAction, setLoadingAction] = useState<string | null>(null);

  const apiCall = useCallback((page: number, limit: number) => {
    return AdminAPI.getWarehouseLocations();
  }, []);

  const {
    data: locations,
    loading: locationsLoading,
    error: locationsError,
    execute: fetchLocations,
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

  const handleDeleteLocation = useCallback(async (locationId: string, locationName: string) => {
    if (window.confirm(`Are you sure you want to delete the location "${locationName}"? This action cannot be undone.`)) {
      setLoadingAction(locationId);
      try {
        await AdminAPI.deleteWarehouseLocation(locationId);
        toast.success(`Location "${locationName}" deleted successfully!`);
        await fetchLocations();
      } catch (err: any) {
        toast.error(`Failed to delete location: ${err.message || 'Unknown error'}`);
      } finally {
        setLoadingAction(null);
      }
    }
  }, [fetchLocations]);

  if (locationsError) {
    return (
      <div className="p-6">
        <ErrorMessage
          error={locationsError}
          onRetry={() => fetchLocations()}
          onDismiss={() => {}}
        />
      </div>
    );
  }

  // Filter locations based on search term
  const filteredLocations = locations.filter(location =>
    location.name.toLowerCase().includes(submittedSearchTerm.toLowerCase()) ||
    location.address?.toLowerCase().includes(submittedSearchTerm.toLowerCase()) ||
    location.description?.toLowerCase().includes(submittedSearchTerm.toLowerCase())
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredLocations.length);

  return (
    <div>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold text-main mb-2 md:mb-0">Warehouse Locations</h1>
        <Link to="/admin/inventory/locations/new" className="inline-flex items-center bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md transition-colors">
          <PlusIcon size={18} className="mr-2" />
          Add Location
        </Link>
      </div>

      {/* Search */}
      <div className="bg-surface rounded-lg shadow-sm p-4 mb-6 border border-border-light">
        <form onSubmit={handleSearch}>
          <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-4">
            <div className="flex-grow">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search locations by name, address, or description..." 
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary bg-background text-copy" 
                  value={searchTerm} 
                  onChange={e => setSearchTerm(e.target.value)} 
                />
                <SearchIcon size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-copy-lighter" />
              </div>
            </div>
            <button type="submit" className="flex items-center px-3 py-2 bg-primary text-white rounded-md hover:bg-primary-dark">
              <SearchIcon size={18} className="mr-2" />
              Search
            </button>
          </div>
        </form>
      </div>

      {/* Locations table */}
      <div className="bg-surface rounded-lg shadow-sm border border-border-light overflow-hidden">
        <ResponsiveTable
          data={filteredLocations}
          loading={locationsLoading}
          keyExtractor={(location) => location.id}
          emptyMessage="No warehouse locations found"
          columns={[
            {
              key: 'location',
              label: 'Location',
              mobileLabel: 'Location',
              render: (location) => (
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center mr-3">
                    <MapPinIcon size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-main">{location.name}</p>
                    <p className="text-xs text-copy-light">{location.address || 'No address'}</p>
                  </div>
                </div>
              ),
            },
            {
              key: 'description',
              label: 'Description',
              hideOnMobile: true,
              render: (location) => (
                <span className="text-copy-light">{location.description || 'No description'}</span>
              ),
            },
            {
              key: 'created',
              label: 'Created',
              hideOnMobile: true,
              render: (location) => (
                <span className="text-copy-light">
                  {new Date(location.created_at).toLocaleDateString()}
                </span>
              ),
            },
            {
              key: 'actions',
              label: 'Actions',
              render: (location) => (
                <div className="flex items-center justify-end space-x-2">
                  <Link 
                    to={`/admin/inventory/locations/edit/${location.id}`} 
                    className="p-1 text-copy-light hover:text-primary" 
                    title="Edit"
                  >
                    <EditIcon size={18} />
                  </Link>
                  <button 
                    className="p-1 text-copy-light hover:text-error" 
                    title="Delete"
                    onClick={() => handleDeleteLocation(location.id, location.name)}
                    disabled={loadingAction === location.id}
                  >
                    <TrashIcon size={18} />
                  </button>
                </div>
              ),
            },
          ]}
        />
      </div>

      {/* Pagination */}
      {Math.ceil(filteredLocations.length / itemsPerPage) > 1 && (
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-copy-light">
            Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
            <span className="font-medium">{Math.min(endIndex, filteredLocations.length)}</span> of{' '}
            <span className="font-medium">{filteredLocations.length}</span> locations
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
              {[...Array(Math.ceil(filteredLocations.length / itemsPerPage))].map((_, pageNum) => (
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
              disabled={currentPage === Math.ceil(filteredLocations.length / itemsPerPage)}
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
