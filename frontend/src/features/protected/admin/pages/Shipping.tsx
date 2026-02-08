import React, { useEffect, useState, useCallback } from 'react';
import { Loader, AlertCircle, PlusIcon, EditIcon, TrashIcon, ChevronLeft, ChevronRight, SearchIcon, DownloadIcon, ArrowUpDownIcon, PackageIcon, TruckIcon } from 'lucide-react';
import AdminAPI from '@/api/admin';
import toast from 'react-hot-toast';
import { useTheme } from '@/components/shared/contexts/ThemeContext';
import Dropdown from '@/components/ui/Dropdown';
import AdminLayout from '../components/AdminLayout';
import { ShippingListSkeleton } from '../components/skeletons/ShippingSkeleton';

const LIMIT = 10;

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

interface ShippingMethod {
  id: string;
  name: string;
  description?: string;
  price: number;
  estimated_days: number;
  is_active: boolean;
  regions: string[];
  carrier?: string;
  tracking_url_template?: string;
  created_at: string;
  updated_at?: string;
}

export const AdminShipping = () => {
  const { currentTheme } = useTheme();
  const [methods, setMethods] = useState<ShippingMethod[]>([]);
  const [allMethods, setAllMethods] = useState<ShippingMethod[]>([]); // Cache all methods
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
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showModal, setShowModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [editingMethod, setEditingMethod] = useState<ShippingMethod | null>(null);
  const [viewingMethod, setViewingMethod] = useState<ShippingMethod | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    estimated_days: '',
    is_active: true,
    carrier: '',
    tracking_url_template: ''
  });

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
    resetPage();
  }, [debouncedSearchQuery, statusFilter, sortBy, sortOrder, resetPage]);

  // Fetch all methods once
  useEffect(() => {
    const fetchMethods = async () => {
      try {
        setInitialLoading(true);
        setError(null);
        
        const response = await AdminAPI.getShippingMethods();
        const data = response?.data?.data || response?.data;
        const fetchedMethods = Array.isArray(data) ? data : data?.items || [];

        const normalizedMethods = fetchedMethods.map((method: any) => ({
          ...method,
          price: typeof method.price === 'number' ? method.price : 0,
          regions: Array.isArray(method.regions) ? method.regions : []
        }));
        
        setAllMethods(normalizedMethods);
      } catch (err: any) {
        const message = err?.response?.data?.message || 'Failed to load shipping methods';
        setError(message);
        toast.error(message);
      } finally {
        setInitialLoading(false);
      }
    };

    fetchMethods();
  }, []);

  // Apply filters, sorting, and pagination whenever they change
  useEffect(() => {
    if (allMethods.length === 0) return;

    setLoading(true);
    
    // Apply client-side filtering and sorting
    let filteredMethods = [...allMethods];
    
    // Apply search filter
    if (debouncedSearchQuery) {
      filteredMethods = filteredMethods.filter((method: any) =>
        method.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
        method.description?.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
      );
    }
    
    // Apply status filter
    if (statusFilter === 'active') {
      filteredMethods = filteredMethods.filter((method: any) => method.is_active);
    } else if (statusFilter === 'inactive') {
      filteredMethods = filteredMethods.filter((method: any) => !method.is_active);
    }
    
    // Apply sorting
    if (sortBy === 'created_at') {
      filteredMethods.sort((a: any, b: any) => {
        const aDate = new Date(a.created_at || 0);
        const bDate = new Date(b.created_at || 0);
        return sortOrder === 'asc' 
          ? aDate.getTime() - bDate.getTime()
          : bDate.getTime() - aDate.getTime();
      });
    } else if (sortBy === 'name') {
      filteredMethods.sort((a: any, b: any) => {
        const aName = a.name.toLowerCase();
        const bName = b.name.toLowerCase();
        return sortOrder === 'asc' 
          ? aName.localeCompare(bName)
          : bName.localeCompare(aName);
      });
    } else if (sortBy === 'cost') {
      filteredMethods.sort((a: any, b: any) => {
        return sortOrder === 'asc' 
          ? a.price - b.price
          : b.price - a.price;
      });
    } else if (sortBy === 'estimated_days') {
      filteredMethods.sort((a: any, b: any) => {
        return sortOrder === 'asc' 
          ? a.estimated_days - b.estimated_days
          : b.estimated_days - a.estimated_days;
      });
    }
    
    const total = filteredMethods.length;
    const pages = Math.max(1, Math.ceil(total / LIMIT));
    const startIndex = (page - 1) * LIMIT;
    const endIndex = startIndex + LIMIT;
    const paginatedMethods = filteredMethods.slice(startIndex, endIndex);
    
    setMethods(paginatedMethods);
    setPagination({
      page: page,
      limit: LIMIT,
      total: total,
      pages: pages
    });
    
    setLoading(false);
  }, [allMethods, page, debouncedSearchQuery, statusFilter, sortBy, sortOrder]);

  const openAddModal = () => {
    setEditingMethod(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      estimated_days: '',
      is_active: true,
      carrier: '',
      tracking_url_template: ''
    });
    setShowModal(true);
  };

  const openEditModal = (method: ShippingMethod) => {
    setEditingMethod(method);
    setFormData({
      name: method.name || '',
      description: method.description || '',
      price: method.price?.toString() || '',
      estimated_days: method.estimated_days?.toString() || '',
      is_active: method.is_active,
      carrier: method.carrier || '',
      tracking_url_template: method.tracking_url_template || ''
    });
    setShowModal(true);
  };

  const openDetailsModal = (method: ShippingMethod) => {
    setViewingMethod(method);
    setShowDetailsModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error('Name is required');
      return;
    }

    const priceValue = parseFloat(formData.price);
    if (Number.isNaN(priceValue) || priceValue < 0) {
      toast.error('Price must be 0 or greater');
      return;
    }

    const estimatedDaysValue = parseInt(formData.estimated_days, 10);
    if (Number.isNaN(estimatedDaysValue) || estimatedDaysValue < 1) {
      toast.error('Estimated days must be 1 or more');
      return;
    }

    const payload = {
      name: formData.name.trim(),
      description: formData.description.trim() || undefined,
      price: priceValue,
      estimated_days: estimatedDaysValue,
      is_active: formData.is_active,
      carrier: formData.carrier.trim() || undefined,
      tracking_url_template: formData.tracking_url_template.trim() || undefined
    };

    if (editingMethod) {
      const previous = allMethods;
      setAllMethods(prev => prev.map(method =>
        method.id === editingMethod.id ? { ...method, ...payload } : method
      ));
      try {
        const response = await AdminAPI.updateShippingMethod(editingMethod.id, payload);
        const updated = response?.data?.data || response?.data;
        if (updated) {
          setAllMethods(prev => prev.map(method =>
            method.id === editingMethod.id ? { ...method, ...updated } : method
          ));
          if (viewingMethod?.id === editingMethod.id) {
            setViewingMethod(prev => (prev ? { ...prev, ...updated } : prev));
          }
        }
        toast.success('Shipping method updated successfully');
        setShowModal(false);
      } catch (error: any) {
        setAllMethods(previous);
        toast.error('Failed to update shipping method');
      }
      return;
    }

    const tempId = `temp-${Date.now()}`;
    const tempMethod: ShippingMethod = {
      id: tempId,
      name: payload.name,
      description: payload.description || undefined,
      price: payload.price,
      estimated_days: payload.estimated_days,
      is_active: payload.is_active,
      regions: [],
      carrier: payload.carrier || undefined,
      tracking_url_template: payload.tracking_url_template || undefined,
      created_at: new Date().toISOString(),
      updated_at: undefined
    };

    setAllMethods(prev => [tempMethod, ...prev]);

    try {
      const response = await AdminAPI.createShippingMethod(payload);
      const created = response?.data?.data || response?.data;
      if (created) {
        setAllMethods(prev => prev.map(method =>
          method.id === tempId ? { ...method, ...created } : method
        ));
      }
      toast.success('Shipping method created successfully');
      setShowModal(false);
    } catch (error: any) {
      setAllMethods(prev => prev.filter(method => method.id !== tempId));
      toast.error('Failed to create shipping method');
    }
  };

  const handleDelete = async (methodId: string) => {
    const previous = allMethods;
    setAllMethods(prev => prev.filter(method => method.id !== methodId));
    try {
      await AdminAPI.deleteShippingMethod(methodId);
      toast.success('Shipping method deleted successfully');
    } catch (error: any) {
      setAllMethods(previous);
      toast.error('Failed to delete shipping method');
    }
  };

  const handleDownloadCSV = () => {
    try {
      // Apply same filters as the table to get all filtered results
      let filteredMethods = [...allMethods];
      
      if (debouncedSearchQuery) {
        filteredMethods = filteredMethods.filter((method: any) =>
          method.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
          method.description?.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
        );
      }
      
      if (statusFilter === 'active') {
        filteredMethods = filteredMethods.filter((method: any) => method.is_active);
      } else if (statusFilter === 'inactive') {
        filteredMethods = filteredMethods.filter((method: any) => !method.is_active);
      }
      
      // Export all filtered methods (not just current page)
      const methodsToExport = filteredMethods.map((method: any) => ({
        'Method Name': method.name || 'N/A',
        'Description': method.description || 'No description',
        'Cost': `$${(method.price || 0).toFixed(2)}`,
        'Delivery Time': `${method.estimated_days || '-'} days`,
        'Regions': method.regions?.join(', ') || 'All regions',
        'Status': method.is_active ? 'Active' : 'Inactive',
        'Created At': new Date(method.created_at || '').toLocaleDateString()
      }));

      // Create CSV content
      const headers = Object.keys(methodsToExport[0] || {});
      const csvContent = [
        headers.join(','),
        ...methodsToExport.map((item: any) => {
          return headers.map(header => {
            const value = item[header];
            return typeof value === 'string' && value.includes(',') 
              ? `"${value}"` 
              : value;
          }).join(',');
        })
      ].join('\n');

      // Create and download CSV file
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `shipping-methods-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      toast.success('Shipping methods downloaded successfully');
    } catch (error: any) {
      toast.error('Failed to download shipping methods');
    }
  };

  if (initialLoading) {
    return (
      <AdminLayout>
        <ShippingListSkeleton />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
    <div className={`space-y-3 ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <p className={`mt-1 text-sm ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Manage shipping methods and rates</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm font-medium"
          >
            <PlusIcon size={18} />
            <span>Add Method</span>
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
                placeholder="Search shipping methods..."
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
                  <div className={`w-4 h-4 border-2 rounded-full animate-spin ${
                    currentTheme === 'dark' 
                      ? 'border-white border-t-transparent' 
                      : 'border-gray-900 border-t-transparent'
                  }`}></div>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Dropdown
              options={[
                { value: '', label: 'All Status' },
                { value: 'active', label: 'Active Only' },
                { value: 'inactive', label: 'Inactive Only' }
              ]}
              value={statusFilter}
              onChange={setStatusFilter}
              placeholder="All Status"
              className="min-w-[120px]"
            />
            
            <Dropdown
              options={[
                { value: 'created_at', label: 'Created' },
                { value: 'name', label: 'Method Name' },
                { value: 'cost', label: 'Cost' },
                { value: 'estimated_days', label: 'Delivery Time' }
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
          {(debouncedSearchQuery || statusFilter) && (
            <div className={`flex items-center gap-2 pt-2 border-t ${currentTheme === 'dark' ? 'border-gray-600' : 'border-gray-200'}`}>
              <span className={`text-sm ${currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Active filters:</span>
              {debouncedSearchQuery && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
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
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                  Status: {statusFilter === 'active' ? 'Active Only' : 'Inactive Only'}
                  <button
                    onClick={() => setStatusFilter('')}
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
                }}
                className="text-xs text-primary hover:text-primary-dark underline"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className={`p-4 rounded-lg border flex items-start gap-3 ${
          currentTheme === 'dark' 
            ? 'bg-red-900/20 border-red-800 text-red-200' 
            : 'bg-red-50 border-red-200 text-red-800'
        }`}>
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Error</p>
            <p className="text-sm">{error}</p>
          </div>
        </div>
      )}

      <div className={`rounded-lg border overflow-hidden ${currentTheme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className={`p-4 border-b ${currentTheme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
            <h2 className="text-lg font-semibold">All Shipping Methods</h2>
        </div>

        {methods.length > 0 ? (
          <>
            {/* Desktop table */}
            <div className="overflow-x-auto hidden md:block">
              <table className="w-full">
                <thead className={`${currentTheme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} border-b ${currentTheme === 'dark' ? 'border-gray-600' : 'border-gray-200'}`}>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold">Method Name</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold">Description</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold">Cost</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold">Delivery Time</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold">Regions</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {methods.map((method: any) => (
                    <tr
                      key={method.id}
                      onClick={() => openDetailsModal(method)}
                      className={`border-b cursor-pointer ${currentTheme === 'dark' ? 'border-gray-700' : 'border-gray-200'} hover:${currentTheme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}
                    >
                      <td className={`px-4 py-3 text-xs font-medium ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'} max-w-[150px] truncate`}>{method.name || 'N/A'}</td>
                      <td className={`px-4 py-3 text-xs ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'} max-w-[200px] truncate`}>{method.description || 'No description'}</td>
                      <td className={`px-4 py-3 text-xs font-mono font-semibold ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>${(method.price || 0).toFixed(2)}</td>
                      <td className={`px-4 py-3 text-xs ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{method.estimated_days || '-'} days</td>
                      <td className={`px-4 py-3 text-xs ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'} max-w-[150px] truncate`}>
                        {method.regions?.join(', ') || 'All regions'}
                      </td>
                      <td className="px-4 py-3 text-xs">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          method.is_active 
                            ? 'bg-success/20 text-success' 
                            : 'bg-error/20 text-error'
                        }`}>
                          {method.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs">
                        <div className="flex gap-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(method.id);
                            }}
                            className="inline-flex items-center gap-1 px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-xs"
                          >
                            <TrashIcon size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className={`md:hidden divide-y ${currentTheme === 'dark' ? 'divide-gray-700' : 'divide-gray-200'}`}>
              {methods.map((method: any) => (
                <div
                  key={method.id}
                  onClick={() => openDetailsModal(method)}
                  className={`p-4 flex flex-col gap-2 cursor-pointer ${currentTheme === 'dark' ? 'bg-gray-800' : 'bg-white'} ${currentTheme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} transition`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-medium text-primary truncate">{method.name || 'N/A'}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      method.is_active 
                        ? 'bg-success/20 text-success' 
                        : 'bg-error/20 text-error'
                    }`}>
                      {method.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <div className={`text-xs ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'} truncate`}>{method.description || 'No description'}</div>
                  <div className={`flex items-center justify-between text-xs ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    <span>{method.estimated_days || '-'} days</span>
                    <span className="font-mono font-semibold">${(method.price || 0).toFixed(2)}</span>
                  </div>
                  <div className={`text-xs ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'} truncate`}>
                    {method.regions?.join(', ') || 'All regions'}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(method.id);
                    }}
                    className="w-full inline-flex items-center justify-center gap-1 px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm mt-2"
                  >
                    <TrashIcon size={14} />
                    Delete
                  </button>
                </div>
              ))}
            </div>

            {pagination.total > 0 && (
              <div className={`px-4 lg:px-6 py-4 border-t ${currentTheme === 'dark' ? 'border-gray-700' : 'border-gray-200'} flex flex-col sm:flex-row items-center justify-between gap-4`}>
                <p className={`text-xs lg:text-sm ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  Showing {(pagination.page - 1) * pagination.limit + 1}–{Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} items
                  {pagination.pages > 1 && ` (Page ${pagination.page} of ${pagination.pages})`}
                </p>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page <= 1}
                    className={`inline-flex items-center gap-1 px-2 lg:px-3 py-2 rounded-lg border text-xs lg:text-sm font-medium transition-colors ${
                      currentTheme === 'dark' 
                        ? 'border-gray-600 bg-gray-800 text-white hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed' 
                        : 'border-gray-300 bg-white text-gray-900 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
                    }`}
                  >
                    <ChevronLeft className="w-3 h-3 lg:w-4 lg:h-4" />
                    <span className="hidden sm:inline">Previous</span>
                  </button>
                  
                  {/* Page numbers */}
                  <div className="flex items-center gap-1 mx-1 lg:mx-2">
                    {Array.from({ length: Math.min(5, Math.max(1, pagination.pages)) }, (_, i) => {
                      let pageNum: number;
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
                        <button
                          key={pageNum}
                          onClick={() => setPage(pageNum)}
                          className={`w-6 h-6 lg:w-8 lg:h-8 rounded-md text-xs lg:text-sm font-medium transition-colors ${
                            pageNum === page
                              ? 'bg-primary text-white'
                              : currentTheme === 'dark'
                                ? 'text-gray-300 hover:bg-gray-700 border border-gray-600'
                                : 'text-gray-700 hover:bg-gray-50 border border-gray-300'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>
                  
                  <button
                    onClick={() => setPage((p) => (pagination.pages > 0 ? Math.min(pagination.pages, p + 1) : p + 1))}
                    disabled={page >= pagination.pages || pagination.pages <= 1}
                    className={`inline-flex items-center gap-1 px-2 lg:px-3 py-2 rounded-lg border text-xs lg:text-sm font-medium transition-colors ${
                      currentTheme === 'dark' 
                        ? 'border-gray-600 bg-gray-800 text-white hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed' 
                        : 'border-gray-300 bg-white text-gray-900 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
                    }`}
                  >
                    <span className="hidden sm:inline">Next</span>
                    <ChevronRight className="w-3 h-3 lg:w-4 lg:h-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className={`p-6 text-center ${currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>No shipping methods found</div>
        )}
      </div>

      {showDetailsModal && viewingMethod && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setShowDetailsModal(false)}>
          <div className={`w-full max-w-2xl rounded-xl p-6 shadow-xl ${currentTheme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`} onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">{viewingMethod.name}</h3>
                <p className={`text-sm ${currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Shipping method details</p>
              </div>
              <button
                onClick={() => setShowDetailsModal(false)}
                className={`p-1 rounded-lg transition-colors ${currentTheme === 'dark' ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'}`}
              >
                <span className="text-xl">×</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className={`font-medium ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Description</p>
                <p className={`${currentTheme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>{viewingMethod.description || 'No description'}</p>
              </div>
              <div>
                <p className={`font-medium ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Price</p>
                <p className="font-mono">${(viewingMethod.price || 0).toFixed(2)}</p>
              </div>
              <div>
                <p className={`font-medium ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Estimated Days</p>
                <p>{viewingMethod.estimated_days} days</p>
              </div>
              <div>
                <p className={`font-medium ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Status</p>
                <p>{viewingMethod.is_active ? 'Active' : 'Inactive'}</p>
              </div>
              <div>
                <p className={`font-medium ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Carrier</p>
                <p>{viewingMethod.carrier || '—'}</p>
              </div>
              <div>
                <p className={`font-medium ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Tracking URL Template</p>
                <p className="break-all">{viewingMethod.tracking_url_template || '—'}</p>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowDetailsModal(false);
                  openEditModal(viewingMethod);
                }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm font-medium"
              >
                <EditIcon size={16} />
                Edit
              </button>
              <button
                onClick={() => setShowDetailsModal(false)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium ${currentTheme === 'dark' ? 'border-gray-600 text-gray-200 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setShowModal(false)}>
          <div className={`w-full max-w-2xl rounded-xl p-6 shadow-xl ${currentTheme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`} onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">{editingMethod ? 'Edit Shipping Method' : 'Add Shipping Method'}</h3>
                <p className={`text-sm ${currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Fill in the details below</p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className={`p-1 rounded-lg transition-colors ${currentTheme === 'dark' ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'}`}
              >
                <span className="text-xl">×</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors ${
                    currentTheme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                  placeholder="e.g., Standard Shipping"
                  required
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors ${
                    currentTheme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                  rows={3}
                  placeholder="Describe the shipping method..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    Price *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                    className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors ${
                      currentTheme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="e.g., 9.99"
                    required
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    Estimated Days *
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.estimated_days}
                    onChange={(e) => setFormData(prev => ({ ...prev, estimated_days: e.target.value }))}
                    className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors ${
                      currentTheme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="e.g., 3"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    Carrier
                  </label>
                  <input
                    type="text"
                    value={formData.carrier}
                    onChange={(e) => setFormData(prev => ({ ...prev, carrier: e.target.value }))}
                    className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors ${
                      currentTheme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="e.g., UPS"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    Tracking URL Template
                  </label>
                  <input
                    type="text"
                    value={formData.tracking_url_template}
                    onChange={(e) => setFormData(prev => ({ ...prev, tracking_url_template: e.target.value }))}
                    className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors ${
                      currentTheme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="https://carrier.com/track/{tracking_number}"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  role="switch"
                  aria-checked={formData.is_active}
                  onClick={(e) => {
                    e.preventDefault();
                    setFormData(prev => ({ ...prev, is_active: !prev.is_active }));
                  }}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    formData.is_active ? 'bg-primary' : currentTheme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      formData.is_active ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
                <span className={`text-sm font-medium ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {formData.is_active ? 'Active' : 'Inactive'}
                </span>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium ${currentTheme === 'dark' ? 'border-gray-600 text-gray-200 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm font-medium"
                >
                  {editingMethod ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    </AdminLayout>
  );
};

export default AdminShipping;
