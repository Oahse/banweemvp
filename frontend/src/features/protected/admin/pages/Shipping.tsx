import { useEffect, useState, useCallback } from 'react';
import { Loader, AlertCircle, PlusIcon, EditIcon, TrashIcon, SearchIcon, DownloadIcon, ArrowUpDownIcon, PackageIcon, TruckIcon } from 'lucide-react';
import AdminAPI from '@/api/admin';
import toast from 'react-hot-toast';
import { useTheme } from '@/components/shared/contexts/ThemeContext';
import Dropdown from '@/components/ui/Dropdown';
import { ShippingListSkeleton } from '@/features/protected/admin/components/skeletons/ShippingSkeleton';
import { Button } from '@/components/ui/Button';
import { Heading, Body, Text, Label } from '@/components/ui/Text/Text';
import { Modal, ModalHeader, ModalBody, ModalFooter, useModal } from '@/components/ui/Modal';
import { AdminDataTable, AdminColumn, FilterConfig } from '@/components/shared/AdminDataTable';
import { Card } from '@/components/ui/Card';

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
  const editModal = useModal();
  const detailsModal = useModal();
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
    editModal.open();
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
    editModal.open();
  };

  const openDetailsModal = (method: ShippingMethod) => {
    setViewingMethod(method);
    detailsModal.open();
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
        editModal.close();
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
      editModal.close();
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

  const fetchData = async (params: any) => {
    try {
      setLoading(true);
      setError(null);
      
      let filteredMethods = [...allMethods];
      
      if (params.search) {
        filteredMethods = filteredMethods.filter((method: any) =>
          method.name.toLowerCase().includes(params.search.toLowerCase()) ||
          method.description?.toLowerCase().includes(params.search.toLowerCase())
        );
      }
      
      if (params.filters?.status === 'active') {
        filteredMethods = filteredMethods.filter((method: any) => method.is_active);
      } else if (params.filters?.status === 'inactive') {
        filteredMethods = filteredMethods.filter((method: any) => !method.is_active);
      }
      
      if (params.sort_by === 'created_at') {
        filteredMethods.sort((a: any, b: any) => {
          const aDate = new Date(a.created_at || 0);
          const bDate = new Date(b.created_at || 0);
          return params.sort_order === 'asc' 
            ? aDate.getTime() - bDate.getTime()
            : bDate.getTime() - aDate.getTime();
        });
      } else if (params.sort_by === 'name') {
        filteredMethods.sort((a: any, b: any) => {
          const aName = a.name.toLowerCase();
          const bName = b.name.toLowerCase();
          return params.sort_order === 'asc' 
            ? aName.localeCompare(bName)
            : bName.localeCompare(aName);
        });
      } else if (params.sort_by === 'cost') {
        filteredMethods.sort((a: any, b: any) => {
          return params.sort_order === 'asc' 
            ? a.price - b.price
            : b.price - a.price;
        });
      } else if (params.sort_by === 'estimated_days') {
        filteredMethods.sort((a: any, b: any) => {
          return params.sort_order === 'asc' 
            ? a.estimated_days - b.estimated_days
            : b.estimated_days - a.estimated_days;
        });
      }
      
      const total = filteredMethods.length;
      const pages = Math.max(1, Math.ceil(total / params.limit));
      const startIndex = (params.page - 1) * params.limit;
      const endIndex = startIndex + params.limit;
      const paginatedMethods = filteredMethods.slice(startIndex, endIndex);
      
      setMethods(paginatedMethods);
      setPagination({
        page: params.page,
        limit: params.limit,
        total: total,
        pages: pages
      });
      
    } catch (err: any) {
      const message = err?.response?.data?.message || 'Failed to load shipping methods';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // Define columns for AdminDataTable
  const columns: AdminColumn<ShippingMethod>[] = [
    {
      key: 'name',
      label: 'Method Name',
      sortable: true,
      render: (value: string) => (
        <Text variant="caption" weight="medium" truncate="single">{value || 'N/A'}</Text>
      ),
    },
    {
      key: 'description',
      label: 'Description',
      render: (value: string) => (
        <Text variant="caption" tone="secondary" truncate="single">{value || 'No description'}</Text>
      ),
    },
    {
      key: 'price',
      label: 'Cost',
      sortable: true,
      render: (value: number) => (
        <Text variant="caption" weight="semibold">${(value || 0).toFixed(2)}</Text>
      ),
    },
    {
      key: 'estimated_days',
      label: 'Delivery Time',
      sortable: true,
      render: (value: number) => (
        <Text variant="caption" tone="secondary">{value || '-'} days</Text>
      ),
    },
    {
      key: 'regions',
      label: 'Regions',
      render: (value: string[]) => (
        <Text variant="caption" tone="secondary" truncate="single">{value?.join(', ') || 'All regions'}</Text>
      ),
    },
    {
      key: 'is_active',
      label: 'Status',
      render: (value: boolean) => (
        <Text className={`px-2 py-1 rounded-full font-semibold ${
          value 
            ? 'bg-success/20 text-success' 
            : 'bg-error/20 text-error'
        }`}>
          {value ? 'Active' : 'Inactive'}
        </Text>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_: any, row: ShippingMethod) => (
        <div className="flex gap-1">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(row.id);
            }}
            variant="danger"
            size="sm"
            leftIcon={<TrashIcon size={14} />}
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
        { value: 'inactive', label: 'Inactive Only' }
      ],
      placeholder: 'All Status',
    },
  ];

  if (initialLoading) {
    return (
      <ShippingListSkeleton />
    );
  }

  return (
    <div className={`space-y-3 ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Text variant="body-sm" tone="secondary">Manage shipping methods and rates</Text>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button
            onClick={openAddModal}
            variant="primary"
            size="sm"
            leftIcon={<PlusIcon size={14} />}
          >
            Add Shipping Method
          </Button>
        </div>
      </div>

      <AdminDataTable
        data={methods}
        loading={loading}
        error={error}
        pagination={pagination}
        columns={columns}
        fetchData={fetchData}
        searchPlaceholder="Search shipping methods..."
        filters={filters}
        actions={
          <Button
            onClick={openAddModal}
            variant="primary"
            size="sm"
            leftIcon={<PlusIcon size={14} />}
          >
            Add Shipping Method
          </Button>
        }
        exportable={true}
        emptyMessage="No shipping methods found"
        responsive="cards"
        limit={LIMIT}
        onRowClick={openDetailsModal}
      />

      <Modal isOpen={detailsModal.isOpen} onClose={detailsModal.close} size="lg">
        {viewingMethod && (
          <>
            <ModalHeader>
              <div>
                <Heading level={5} className="text-lg font-semibold">{viewingMethod.name}</Heading>
                <Body className={`text-sm ${currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Shipping method details</Body>
              </div>
            </ModalHeader>

            <ModalBody>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <Body className={`font-medium ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Description</Body>
                <Body className={`${currentTheme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>{viewingMethod.description || 'No description'}</Body>
              </div>
              <div>
                <Body className={`font-medium ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Price</Body>
                <Body className="font-mono">${(viewingMethod.price || 0).toFixed(2)}</Body>
              </div>
              <div>
                <Body className={`font-medium ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Estimated Days</Body>
                <Body>{viewingMethod.estimated_days} days</Body>
              </div>
              <div>
                <Body className={`font-medium ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Status</Body>
                <Body>{viewingMethod.is_active ? 'Active' : 'Inactive'}</Body>
              </div>
              <div>
                <Body className={`font-medium ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Carrier</Body>
                <Body>{viewingMethod.carrier || '—'}</Body>
              </div>
              <div>
                <Body className={`font-medium ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Tracking URL Template</Body>
                <Body>{viewingMethod.tracking_url_template || '—'}</Body>
              </div>
            </div>
            </ModalBody>

            <ModalFooter>
              <Button
                onClick={() => {
                  detailsModal.close();
                  openEditModal(viewingMethod);
                }}
                variant="primary"
                size="sm"
                leftIcon={<EditIcon size={16} />}
              >
                Edit
              </Button>
            </ModalFooter>
          </>
        )}
      </Modal>

      <Modal isOpen={editModal.isOpen} onClose={editModal.close} size="lg">
        <ModalHeader>
          <div>
            <Heading level={5} className="text-lg font-semibold">{editingMethod ? 'Edit Shipping Method' : 'Add Shipping Method'}</Heading>
            <Body className={`text-sm ${currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Fill in the details below</Body>
          </div>
        </ModalHeader>

        <ModalBody>
          <form onSubmit={handleSubmit} id="shipping-form" className="space-y-4">
              <div>
                <Label className={`block text-sm font-medium mb-2 ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Name *
                </Label>
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
                    placeholder="e.g., UPS, FedEx"
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
                    placeholder="e.g., https://carrier.com/track/{tracking_number}"
                  />
                </div>
              </div>
          </form>
        </ModalBody>

        <ModalFooter>
          <Button
            onClick={() => {
              editModal.close();
              setEditingMethod(null);
            }}
            variant="secondary"
            size="sm"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="shipping-form"
            variant="primary"
            size="sm"
          >
            {editingMethod ? 'Update Shipping Method' : 'Add Shipping Method'}
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default AdminShipping;
