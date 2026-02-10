import { useEffect, useState, useCallback } from 'react';
import { Loader, AlertCircle, PlusIcon, EditIcon, TrashIcon, SearchIcon, ArrowUpDownIcon, X } from 'lucide-react';
import AdminAPI from '@/api/admin';
import toast from 'react-hot-toast';
import { useTheme } from '@/components/shared/contexts/ThemeContext';
import Dropdown from '@/components/ui/Dropdown';
import { getCountryOptions, getProvinceOptions } from '@/data/countries';
import AdminLayout from '@/components/layout/AdminLayout';
import { TaxRatesListSkeleton } from '@/components/skeletons/TaxRatesSkeleton';
import { Button } from '@/components/ui/Button';
import { Text } from '@/components/ui/Text/Text';
import { Card } from '@/components/ui/Card';
import { AdminDataTable, AdminColumn, FilterConfig } from '@/components/shared/AdminDataTable';
import { Modal, ModalHeader, ModalBody, ModalFooter, useModal } from '@/components/ui/Modal';
import { Label } from '@/components/ui/Text/Text';

const LIMIT = 10;

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

interface TaxRate {
  id: string;
  country_code: string;
  country_name: string;
  province_code?: string;
  province_name?: string;
  tax_rate: number;
  tax_percentage: number;
  tax_name?: string;
  is_active: boolean;
  created_at: string;
  updated_at?: string;
}

export const AdminTaxRates = () => {
  const { currentTheme } = useTheme();
  const [taxRates, setTaxRates] = useState<TaxRate[]>([]);
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
  
  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [editingTaxRate, setEditingTaxRate] = useState<TaxRate | null>(null);
  const [formData, setFormData] = useState({
    country_code: '',
    country_name: '',
    province_code: '',
    province_name: '',
    tax_rate: '',
    tax_name: '',
    is_active: true
  });

  // Searchable dropdown state
  const [countrySearch, setCountrySearch] = useState('');
  const [provinceSearch, setProvinceSearch] = useState('');
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showProvinceDropdown, setShowProvinceDropdown] = useState(false);
  const [selectedCountryIndex, setSelectedCountryIndex] = useState(-1);
  const [selectedProvinceIndex, setSelectedProvinceIndex] = useState(-1);

  // Get countries and provinces from data
  const countryOptions = getCountryOptions();
  const availableProvinces = formData.country_code ? getProvinceOptions(formData.country_code) : [];
  
  const filteredCountries = countryOptions.filter(c => 
    c.label.toLowerCase().includes(countrySearch.toLowerCase()) ||
    c.value.toLowerCase().includes(countrySearch.toLowerCase())
  );

  const filteredProvinces = availableProvinces.filter(p =>
    p.label.toLowerCase().includes(provinceSearch.toLowerCase()) ||
    p.value.toLowerCase().includes(provinceSearch.toLowerCase())
  );

  const fetchData = async (params: any) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await AdminAPI.getTaxRates({
        page: params.page,
        per_page: params.limit,
        search: params.search || undefined,
        is_active: params.filters?.status === 'active' ? true : params.filters?.status === 'inactive' ? false : undefined,
        sort_by: params.sort_by,
        sort_order: params.sort_order
      });
      
      if (response?.success && response?.data) {
        const data = response.data;
        setTaxRates(data.data || []);
        if (data.pagination) {
          setPagination({
            page: data.pagination.page || params.page,
            limit: data.pagination.limit || params.limit,
            total: data.pagination.total || 0,
            pages: data.pagination.pages || 0,
          });
        }
      } else {
        throw new Error(response?.message || 'Failed to load tax rates');
      }
    } catch (err: any) {
      const message = err?.response?.data?.message || err?.message || 'Failed to load tax rates';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  };

  // Define columns for AdminDataTable
  const columns: AdminColumn<any>[] = [
    {
      key: 'country_name',
      label: 'Country',
      sortable: true,
      render: (value: string, row: any) => (
        <div>
          <Text className="text-sm text-gray-900 dark:text-white">{value}</Text>
          {row.province_name && (
            <Text className="text-xs text-gray-500 dark:text-gray-400">{row.province_name}</Text>
          )}
        </div>
      ),
    },
    {
      key: 'tax_name',
      label: 'Tax Name',
      render: (value: string) => (
        <Text className="text-sm text-gray-900 dark:text-white">{value || 'N/A'}</Text>
      ),
    },
    {
      key: 'tax_rate',
      label: 'Tax Rate',
      sortable: true,
      render: (value: number) => (
        <Text className="text-sm text-gray-900 dark:text-white font-semibold">
          {(value * 100).toFixed(2)}%
        </Text>
      ),
    },
    {
      key: 'is_active',
      label: 'Status',
      render: (value: boolean) => (
        <Text className={`px-2 py-1 rounded-full text-xs font-semibold ${
          value ? 'bg-success/20 text-success' : 'bg-error/20 text-error'
        }`}>
          {value ? 'Active' : 'Inactive'}
        </Text>
      ),
    },
    {
      key: 'created_at',
      label: 'Created',
      sortable: true,
      render: (value: string) => (
        <Text className="text-sm text-gray-500 dark:text-gray-400">
          {new Date(value || '').toLocaleDateString()}
        </Text>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_: any, row: any) => (
        <div className="flex items-center gap-2">
          <Button
            onClick={() => openEditModal(row)}
            variant="ghost"
            size="sm"
            leftIcon={<EditIcon size={14} />}
          />
          <Button
            onClick={() => handleDeleteTaxRate(row.id)}
            variant="danger"
            size="sm"
            leftIcon={<TrashIcon size={14} />}
          />
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

  const handleDeleteTaxRate = async (rateId: string) => {
    try {
      // Optimistically update UI
      setTaxRates(prev => prev.filter(rate => rate.id !== rateId));
      
      // Make API call
      await AdminAPI.deleteTaxRate(rateId);
      toast.success('Tax rate deleted successfully');
      
      // Update pagination total
      setPagination(prev => ({
        ...prev,
        total: Math.max(0, prev.total - 1)
      }));
    } catch (error: any) {
      toast.error('Failed to delete tax rate');
      // Revert on error - refetch list
      fetchData({
        page: page,
        limit: LIMIT,
        search: '',
        sort_by: 'created_at',
        sort_order: 'desc'
      });
    }
  };

  const openAddModal = () => {
    setEditingTaxRate(null);
    setFormData({
      country_code: '',
      country_name: '',
      province_code: '',
      province_name: '',
      tax_rate: '',
      tax_name: '',
      is_active: true
    });
    setCountrySearch('');
    setProvinceSearch('');
    setShowModal(true);
  };

  const openEditModal = (taxRate: TaxRate) => {
    setEditingTaxRate(taxRate);
    setFormData({
      country_code: taxRate.country_code || '',
      country_name: taxRate.country_name || '',
      province_code: taxRate.province_code || '',
      province_name: taxRate.province_name || '',
      tax_rate: (taxRate.tax_rate * 100).toString(), // Convert decimal to percentage for display
      tax_name: taxRate.tax_name || '',
      is_active: taxRate.is_active
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Validate required fields
      if (!formData.tax_rate || parseFloat(formData.tax_rate) <= 0) {
        toast.error('Tax rate must be greater than 0');
        setLoading(false);
        return;
      }
      
      if (!formData.tax_name || formData.tax_name.trim().length < 2) {
        toast.error('Tax name must be at least 2 characters');
        setLoading(false);
        return;
      }

      // Validate country fields for new tax rates
      if (!editingTaxRate) {
        if (!formData.country_code || formData.country_code.trim().length < 2) {
          toast.error('Please select a country');
          setLoading(false);
          return;
        }
        if (!formData.country_name || formData.country_name.trim().length < 2) {
          toast.error('Please select a country');
          setLoading(false);
          return;
        }
      }

      const data: any = {
        tax_rate: parseFloat(formData.tax_rate) / 100, // Convert percentage to decimal
        tax_name: formData.tax_name.trim(),
        is_active: formData.is_active,
        country_code: (editingTaxRate ? editingTaxRate.country_code : formData.country_code).trim(),
        country_name: (editingTaxRate ? editingTaxRate.country_name : formData.country_name).trim(),
      };

      // Only include province fields if they have values
      const provinceCode = editingTaxRate ? editingTaxRate.province_code : formData.province_code;
      const provinceName = editingTaxRate ? editingTaxRate.province_name : formData.province_name;
      
      if (provinceCode && provinceCode.trim()) {
        data.province_code = provinceCode.trim();
      }
      
      if (provinceName && provinceName.trim()) {
        data.province_name = provinceName.trim();
      }

      if (editingTaxRate) {
        // Update existing tax rate
        await AdminAPI.updateTaxRate(editingTaxRate.id, data);
        toast.success('Tax rate updated successfully');
      } else {
        // Create new tax rate
        await AdminAPI.createTaxRate(data);
        toast.success('Tax rate created successfully');
      }

      setShowModal(false);
      setEditingTaxRate(null);
      
      // Refresh the list
      fetchData({
        page: page,
        limit: LIMIT,
        search: '',
        sort_by: 'created_at',
        sort_order: 'desc'
      });
    } catch (error: any) {
      toast.error(editingTaxRate ? 'Failed to update tax rate' : 'Failed to create tax rate');
    } finally {
      setLoading(false);
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

  if (initialLoading) {
    return (
      <AdminLayout>
        <TaxRatesListSkeleton />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className={`space-y-3 ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-1">
          <div>
            <Text className={`mt-1 text-xs lg:text-sm ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Manage tax rates by country and region</Text>
          </div>
          <div className="flex gap-2 w-full lg:w-auto">
            <Button
              onClick={openAddModal}
              variant="primary"
              size="sm"
              leftIcon={<PlusIcon className="w-4 h-4" />}
            >
              Add Tax Rate
            </Button>
          </div>
        </div>

        <AdminDataTable
          data={taxRates}
          loading={loading}
          error={error}
          pagination={pagination}
          columns={columns}
          fetchData={fetchData}
          searchPlaceholder="Search tax rates..."
          filters={filters}
          actions={
            <Button
              onClick={openAddModal}
              variant="primary"
              size="sm"
              leftIcon={<PlusIcon className="w-4 h-4" />}
            >
              Add Tax Rate
            </Button>
          }
          emptyMessage="No tax rates found"
          responsive="cards"
          limit={LIMIT}
        />

        <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="lg">
          <ModalHeader>
            <div>
              <h3 className="text-lg font-semibold">{editingTaxRate ? 'Edit Tax Rate' : 'Add Tax Rate'}</h3>
              <Text className={`text-sm ${currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                {editingTaxRate ? 'Update tax rate information' : 'Fill in the details below'}
              </Text>
            </div>
          </ModalHeader>

          <ModalBody>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className={`block text-sm font-medium mb-2 ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    Country Code *
                  </Label>
                  <input
                    type="text"
                    value={formData.country_code}
                    onChange={(e) => setFormData(prev => ({ ...prev, country_code: e.target.value }))}
                    className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors ${
                      currentTheme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="e.g., US"
                    disabled={!!editingTaxRate}
                    required
                  />
                </div>

                <div>
                  <Label className={`block text-sm font-medium mb-2 ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    Country Name *
                  </Label>
                  <input
                    type="text"
                    value={formData.country_name}
                    onChange={(e) => setFormData(prev => ({ ...prev, country_name: e.target.value }))}
                    className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors ${
                      currentTheme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="e.g., United States"
                    disabled={!!editingTaxRate}
                    required
                  />
                </div>

                <div>
                  <Label className={`block text-sm font-medium mb-2 ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    Province Code
                  </Label>
                  <input
                    type="text"
                    value={formData.province_code}
                    onChange={(e) => setFormData(prev => ({ ...prev, province_code: e.target.value }))}
                    className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors ${
                      currentTheme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="e.g., CA"
                    disabled={!!editingTaxRate}
                  />
                </div>

                <div>
                  <Label className={`block text-sm font-medium mb-2 ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    Province Name
                  </Label>
                  <input
                    type="text"
                    value={formData.province_name}
                    onChange={(e) => setFormData(prev => ({ ...prev, province_name: e.target.value }))}
                    className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors ${
                      currentTheme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="e.g., California"
                    disabled={!!editingTaxRate}
                  />
                </div>

                <div>
                  <Label className={`block text-sm font-medium mb-2 ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    Tax Rate (%)
                  </Label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="100"
                    value={formData.tax_rate}
                    onChange={(e) => setFormData(prev => ({ ...prev, tax_rate: e.target.value }))}
                    className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors ${
                      currentTheme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="e.g., 8.5"
                    required
                  />
                </div>

                <div>
                  <Label className={`block text-sm font-medium mb-2 ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    Tax Name *
                  </Label>
                  <input
                    type="text"
                    value={formData.tax_name}
                    onChange={(e) => setFormData(prev => ({ ...prev, tax_name: e.target.value }))}
                    className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors ${
                      currentTheme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="e.g., Sales Tax"
                    required
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="is_active"
                    checked={formData.is_active}
                    onChange={(e) => setFormData(prev => ({ ...prev, is_active: e.target.checked }))}
                    className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <Label htmlFor="is_active" className={`ml-2 text-sm ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    Active
                  </Label>
                </div>
              </div>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button
              type="button"
              onClick={() => setShowModal(false)}
              variant="outline"
              size="sm"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={handleSubmit}
              variant="primary"
              size="sm"
              disabled={loading}
            >
              {editingTaxRate ? 'Update' : 'Create'} Tax Rate
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </AdminLayout>
  );
};

export default AdminTaxRates;
