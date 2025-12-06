import React, { useState, useEffect, useCallback } from 'react';
import { useApi } from '../../hooks/useApi';
import { AdminAPI } from '../../apis';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import { toast } from 'react-hot-toast';
import { WarehouseLocationResponse } from '../../types';
import { Link } from 'react-router-dom';

export const AdminWarehouseLocations = () => {
  const [locations, setLocations] = useState<WarehouseLocationResponse[]>([]);
  const [loadingAction, setLoadingAction] = useState<string | null>(null);

  const { data: fetchedLocations, loading, error, execute: fetchLocations } = useApi<WarehouseLocationResponse[]>();

  const loadLocations = useCallback(async () => {
    await fetchLocations(AdminAPI.getWarehouseLocations);
  }, [fetchLocations]);

  useEffect(() => {
    loadLocations();
  }, [loadLocations]);

  useEffect(() => {
    if (fetchedLocations) {
      setLocations(fetchedLocations.data);
    }
  }, [fetchedLocations]);

  const handleDeleteLocation = useCallback(async (locationId: string, locationName: string) => {
    if (window.confirm(`Are you sure you want to delete the location "${locationName}"? This action cannot be undone.`)) {
      setLoadingAction(locationId);
      try {
        await AdminAPI.deleteWarehouseLocation(locationId);
        toast.success(`Location "${locationName}" deleted successfully!`);
        loadLocations();
      } catch (err: any) {
        toast.error(`Failed to delete location: ${err.message || 'Unknown error'}`);
      } finally {
        setLoadingAction(null);
      }
    }
  }, [loadLocations]);

  if (loading && !fetchedLocations) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="p-6">
        <ErrorMessage error={error} onRetry={loadLocations} onDismiss={() => {}} />
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-main mb-6">Warehouse Locations</h1>

      <div className="flex justify-end mb-4">
        <Link to="/admin/inventory/locations/new" className="btn btn-primary">
          Add New Location
        </Link>
      </div>

      {!locations || locations.length === 0 ? (
        <div className="text-center text-copy-light p-8">No warehouse locations found.</div>
      ) : (
        <div className="overflow-x-auto bg-surface rounded-lg shadow-sm">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Description</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {locations.map((location) => (
                <tr key={location.id}>
                  <td>{location.name}</td>
                  <td>{location.address || 'N/A'}</td>
                  <td>{location.description || 'N/A'}</td>
                  <td>{new Date(location.created_at).toLocaleString()}</td>
                  <td className="flex space-x-2">
                    <Link to={`/admin/inventory/locations/edit/${location.id}`} className="btn btn-sm btn-info" disabled={loadingAction === location.id}>
                      Edit
                    </Link>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handleDeleteLocation(location.id, location.name)}
                      disabled={loadingAction === location.id}
                    >
                      {loadingAction === location.id ? <LoadingSpinner size="sm" /> : 'Delete'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
