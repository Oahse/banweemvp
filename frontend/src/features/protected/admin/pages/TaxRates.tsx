import React, { useEffect, useState, useCallback } from 'react';
import { Loader, AlertCircle, PlusIcon, EditIcon, TrashIcon, ChevronLeft, ChevronRight, SearchIcon, ArrowUpDownIcon, X } from 'lucide-react';
import AdminAPI from '@/api/admin';
import toast from 'react-hot-toast';
import { useTheme } from '@/components/shared/contexts/ThemeContext';
import Dropdown from '@/components/ui/Dropdown';
import { getCountryOptions, getProvinceOptions } from '@/data/countries';
import AdminLayout from '../components/AdminLayout';
import { TaxRatesListSkeleton } from '../components/skeletons/TaxRatesSkeleton';
import { Button } from '@/components/ui/Button';

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
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  
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



  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300); // 300ms delay

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.country-dropdown-container')) {
        setShowCountryDropdown(false);
      }
      if (!target.closest('.province-dropdown-container')) {
        setShowProvinceDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Reset to page 1 when filters change
  const resetPage = useCallback(() => {
    setPage(1);
  }, []);

  useEffect(() => {
    resetPage();
  }, [debouncedSearchQuery, statusFilter, sortBy, sortOrder, resetPage]);

  useEffect(() => {
    const fetchTaxRates = async () => {
      try {
        if (page === 1 && !searchQuery && !statusFilter) {
          setInitialLoading(true);
        } else {
          setLoading(true);
        }
        setError(null);
        console.log('Fetching tax rates with params:', {
          page,
          per_page: LIMIT,
          search: debouncedSearchQuery || undefined,
          is_active: statusFilter === 'active' ? true : statusFilter === 'inactive' ? false : undefined,
          sort_by: sortBy,
          sort_order: sortOrder
        });
        
        const response = await AdminAPI.getTaxRates({
          page,
          per_page: LIMIT,
          search: debouncedSearchQuery || undefined,
          is_active: statusFilter === 'active' ? true : statusFilter === 'inactive' ? false : undefined,
          sort_by: sortBy,
          sort_order: sortOrder
        });
        
        console.log('Tax rates API response:', response);
        
        if (response?.success && response?.data) {
          const data = response.data;
          setTaxRates(data.data || []);
          if (data.pagination) {
            setPagination({
              page: data.pagination.page || page,
              limit: data.pagination.limit || LIMIT,
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

    fetchTaxRates();
  }, [page, debouncedSearchQuery, statusFilter, sortBy, sortOrder]);

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
      // Revert on error - refetch the list
      const response = await AdminAPI.getTaxRates({
        page,
        per_page: LIMIT,
        search: debouncedSearchQuery || undefined,
        is_active: statusFilter === 'active' ? true : statusFilter === 'inactive' ? false : undefined,
        sort_by: sortBy,
        sort_order: sortOrder
      });
      if (response?.success && response?.data) {
        setTaxRates(response.data.data || []);
      }
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
        // Optimistically update existing tax rate
        setTaxRates(prev => prev.map(rate => 
          rate.id === editingTaxRate.id 
            ? { ...rate, ...data }
            : rate
        ));
        
        await AdminAPI.updateTaxRate(editingTaxRate.id, data);
        toast.success('Tax rate updated successfully');
      } else {
        // Make API call first for create to get the new ID
        const response = await AdminAPI.createTaxRate(data);
        
        // Add to list with data from response
        if (response?.data) {
          setTaxRates(prev => [response.data, ...prev]);
          setPagination(prev => ({
            ...prev,
            total: prev.total + 1
          }));
        }
        toast.success('Tax rate created successfully');
      }
      
      setShowModal(false);
    } catch (error: any) {
      toast.error(editingTaxRate ? 'Failed to update tax rate' : 'Failed to create tax rate');
      // Revert on error - refetch the list
      const response = await AdminAPI.getTaxRates({
        page,
        per_page: LIMIT,
        search: debouncedSearchQuery || undefined,
        is_active: statusFilter === 'active' ? true : statusFilter === 'inactive' ? false : undefined,
        sort_by: sortBy,
        sort_order: sortOrder
      });
      if (response?.success && response?.data) {
        setTaxRates(response.data.data || []);
      }
    } finally {
      setLoading(false);
    }
  };

  const formatPercentage = (rate: number) => {
    return `${(rate * 100).toFixed(2)}%`; // Convert decimal to percentage for display
  };

  const statusBadge = (isActive: boolean) => {
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
        isActive 
          ? 'bg-success/20 text-success' 
          : 'bg-error/20 text-error'
      }`}>
        {isActive ? 'Active' : 'Inactive'}
      </span>
    );
  };

  if (loading && initialLoading) {
    return (
      <AdminLayout>
        <TaxRatesListSkeleton />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
    <div className={`space-y-3 ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <p className={`mt-1 text-sm ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Manage tax rates by country and region</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button 
            onClick={openAddModal}
            variant="primary"
            leftIcon={<PlusIcon size={16} />}
          >
            Add Tax Rate
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className={`p-4 rounded-lg border ${currentTheme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="flex flex-col gap-4">
          <div className="flex-1">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search tax rates..."
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
                { value: 'country_name', label: 'Country' },
                { value: 'tax_rate', label: 'Tax Rate' },
                { value: 'tax_name', label: 'Tax Name' }
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
          {(debouncedSearchQuery || statusFilter) && (
            <div className="flex items-center gap-2 pt-2 border-t border-gray-200 dark:border-gray-600">
              <span className="text-sm text-gray-600 dark:text-gray-400">Active filters:</span>
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
                  Status: {statusFilter === 'active' ? 'Active Only' : 'Inactive Only'}
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
              <Button
                onClick={() => {
                  setSearchQuery('');
                  setStatusFilter('');
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
        <div className={`p-4 lg:p-6 border-b ${currentTheme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
          <h2 className="text-base lg:text-lg font-semibold">All Tax Rates</h2>
        </div>

        {taxRates.length > 0 ? (
          <>
            {/* Desktop table */}
            <div className="overflow-x-auto hidden md:block">
              <table className="w-full">
                <thead className={`${currentTheme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} border-b ${currentTheme === 'dark' ? 'border-gray-600' : 'border-gray-200'}`}>
                  <tr>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-semibold">Rate ID</th>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-semibold">Country</th>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-semibold">Province</th>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-semibold">Tax Rate</th>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-semibold">Tax Name</th>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-semibold">Status</th>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {taxRates.map((taxRate: any) => (
                    <tr key={taxRate.id} className={`border-b ${currentTheme === 'dark' ? 'border-gray-700' : 'border-gray-200'} hover:${currentTheme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <td className="px-4 lg:px-6 py-3 lg:py-4 text-xs lg:text-sm font-mono text-primary">{String(taxRate.id).slice(0, 8)}</td>
                      <td className={`px-4 lg:px-6 py-3 lg:py-4 text-xs lg:text-sm font-medium ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{taxRate.country_name} ({taxRate.country_code})</td>
                      <td className={`px-4 lg:px-6 py-3 lg:py-4 text-xs lg:text-sm ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        {taxRate.province_name ? `${taxRate.province_name} (${taxRate.province_code})` : '-'}
                      </td>
                      <td className={`px-4 lg:px-6 py-3 lg:py-4 text-xs lg:text-sm font-mono font-semibold ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        {formatPercentage(taxRate.tax_rate)}
                      </td>
                      <td className={`px-4 lg:px-6 py-3 lg:py-4 text-xs lg:text-sm ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{taxRate.tax_name || 'General Tax'}</td>
                      <td className="px-4 lg:px-6 py-3 lg:py-4 text-xs lg:text-sm">{statusBadge(taxRate.is_active)}</td>
                      <td className="px-4 lg:px-6 py-3 lg:py-4 text-xs lg:text-sm">
                        <div className="flex gap-1 lg:gap-2">
                          <Button 
                            onClick={() => openEditModal(taxRate)}
                            variant="primary"
                            size="sm"
                            className="inline-flex items-center gap-1 px-2 py-1 bg-primary text-white rounded hover:bg-primary-dark transition-colors"
                          >
                            <EditIcon size={14} className="hidden sm:block" />
                            <span className="sm:hidden">Edit</span>
                          </Button>
                          <Button
                            onClick={() => handleDeleteTaxRate(taxRate.id)}
                            variant="danger"
                            size="sm"
                            className="inline-flex items-center gap-1 px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                          >
                            <TrashIcon size={14} className="hidden sm:block" />
                            <span className="sm:hidden">Delete</span>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className={`md:hidden divide-y ${currentTheme === 'dark' ? 'divide-gray-700' : 'divide-gray-200'}`}>
              {taxRates.map((taxRate: any) => (
                <div
                  key={taxRate.id}
                  className={`p-3 lg:p-4 flex flex-col gap-2 ${currentTheme === 'dark' ? 'bg-gray-800' : 'bg-white'} ${currentTheme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} transition`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs lg:text-sm font-mono text-primary">{String(taxRate.id).slice(0, 8)}</span>
                    {statusBadge(taxRate.is_active)}
                  </div>
                  <div className={`text-sm lg:text-base font-medium ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {taxRate.country_name} ({taxRate.country_code})
                  </div>
                  <div className={`text-xs lg:text-sm ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {taxRate.province_name ? `${taxRate.province_name} (${taxRate.province_code})` : '-'}
                  </div>
                  <div className={`text-xs lg:text-sm font-mono font-semibold ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {formatPercentage(taxRate.tax_rate)}
                  </div>
                  <div className={`text-xs lg:text-sm ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{taxRate.tax_name || 'General Tax'}</div>
                  <div className="flex gap-1 lg:gap-2 mt-2">
                    <Button 
                      onClick={() => openEditModal(taxRate)}
                      variant="primary"
                      size="sm"
                      className="inline-flex items-center gap-1 px-2 py-1 bg-primary text-white rounded hover:bg-primary-dark transition-colors text-xs"
                    >
                      <EditIcon size={14} />
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDeleteTaxRate(taxRate.id)}
                      variant="danger"
                      size="sm"
                      className="inline-flex items-center gap-1 px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-xs"
                    >
                      <TrashIcon size={14} />
                      Delete
                    </Button>
                  </div>
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
                  <Button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page <= 1}
                    variant="outline"
                    size="sm"
                    className={`inline-flex items-center gap-1 px-2 lg:px-3 py-2 rounded-lg border text-xs lg:text-sm font-medium transition-colors ${
                      currentTheme === 'dark' 
                        ? 'bg-gray-800 border-gray-700 text-gray-200' 
                        : 'bg-white border-gray-300 text-gray-700'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </Button>
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
                        <Button
                          key={pageNum}
                          onClick={() => setPage(pageNum)}
                          className={`w-6 h-6 lg:w-8 lg:h-8 rounded-md text-xs lg:text-sm font-medium transition-colors ${
                            pageNum === page
                              ? 'bg-primary text-white'
                              : currentTheme === 'dark'
                                ? 'bg-gray-800 text-gray-200 hover:bg-gray-700'
                                : 'bg-white text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          {pageNum}
                        </Button>
                      );
                    })}
                  </div>
                  <Button
                    onClick={() => setPage((p) => (pagination.pages > 0 ? Math.min(pagination.pages, p + 1) : p + 1))}
                    disabled={page >= pagination.pages || pagination.pages <= 1}
                    variant="outline"
                    size="sm"
                    className={`inline-flex items-center gap-1 px-2 lg:px-3 py-2 rounded-lg border text-xs lg:text-sm font-medium transition-colors ${
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
            )}
          </>
        ) : (
          <div className={`p-6 text-center ${currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>No tax rates found</div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => setShowModal(false)}>
          <div className={`rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto ${
            currentTheme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`} onClick={(e) => e.stopPropagation()}>
            <div className="p-4 lg:p-6">
              <div className="flex justify-between items-center mb-4 lg:mb-6">
                <h2 className={`text-base lg:text-xl font-semibold ${
                  currentTheme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {editingTaxRate ? 'Edit Tax Rate' : 'Add Tax Rate'}
                </h2>
                <Button
                  onClick={() => setShowModal(false)}
                  variant="ghost"
                  size="icon"
                  className={`p-1 rounded-lg transition-colors ${
                    currentTheme === 'dark' 
                      ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-800' 
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {editingTaxRate ? (
                  <div className={`p-3 rounded-lg text-sm ${
                    currentTheme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
                  }`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className={`font-medium ${
                          currentTheme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                        }`}>
                          {editingTaxRate.country_name}
                        </p>
                        {editingTaxRate.province_name && (
                          <p className={`text-xs mt-1 ${
                            currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                          }`}>
                            {editingTaxRate.province_name}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative country-dropdown-container">
                      <label className={`block text-sm font-medium mb-2 ${
                        currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Country * {!formData.country_name && countrySearch && (
                          <span className="text-xs text-yellow-500 ml-2">
                            (Please select from dropdown)
                          </span>
                        )}
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={formData.country_name || countrySearch}
                          onChange={(e) => {
                            setCountrySearch(e.target.value);
                            if (formData.country_name) {
                              setFormData(prev => ({
                                ...prev,
                                country_code: '',
                                country_name: '',
                                province_code: '',
                                province_name: ''
                              }));
                              setProvinceSearch('');
                            }
                            setShowCountryDropdown(true);
                            setSelectedCountryIndex(-1);
                          }}
                          onFocus={() => {
                            setShowCountryDropdown(true);
                            setSelectedCountryIndex(-1);
                          }}
                          onKeyDown={(e) => {
                            if (!showCountryDropdown || filteredCountries.length === 0) return;
                            
                            if (e.key === 'ArrowDown') {
                              e.preventDefault();
                              setSelectedCountryIndex(prev => 
                                prev < filteredCountries.length - 1 ? prev + 1 : prev
                              );
                            } else if (e.key === 'ArrowUp') {
                              e.preventDefault();
                              setSelectedCountryIndex(prev => prev > 0 ? prev - 1 : -1);
                            } else if (e.key === 'Enter' && selectedCountryIndex >= 0) {
                              e.preventDefault();
                              const country = filteredCountries[selectedCountryIndex];
                              setFormData(prev => ({
                                ...prev,
                                country_code: country.value,
                                country_name: country.label,
                                province_code: '',
                                province_name: ''
                              }));
                              setCountrySearch('');
                              setProvinceSearch('');
                              setShowCountryDropdown(false);
                              setSelectedCountryIndex(-1);
                            } else if (e.key === 'Escape') {
                              setShowCountryDropdown(false);
                              setSelectedCountryIndex(-1);
                            }
                          }}
                          className={`w-full px-3 py-2 pr-8 text-sm border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors ${
                            !formData.country_name && countrySearch ? 'border-yellow-500' : ''
                          } ${
                            currentTheme === 'dark'
                              ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                          }`}
                          placeholder="Search or select country..."
                          required
                        />
                        {(formData.country_name || countrySearch) && (
                          <Button
                            type="button"
                            onClick={() => {
                              setFormData(prev => ({
                                ...prev,
                                country_code: '',
                                country_name: '',
                                province_code: '',
                                province_name: ''
                              }));
                              setCountrySearch('');
                              setProvinceSearch('');
                            }}
                            className={`absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors ${
                              currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                            }`}
                          >
                            <X size={16} />
                          </Button>
                        )}
                      </div>
                      {showCountryDropdown && filteredCountries.length > 0 && (
                        <div className={`absolute z-50 w-full mt-1 max-h-60 overflow-auto rounded-lg border shadow-lg ${
                          currentTheme === 'dark'
                            ? 'bg-gray-700 border-gray-600'
                            : 'bg-white border-gray-300'
                        }`}>
                          {filteredCountries.map((country, index) => (
                            <Button
                              key={country.value}
                              type="button"
                              onClick={() => {
                                setFormData(prev => ({
                                  ...prev,
                                  country_code: country.value,
                                  country_name: country.label,
                                  province_code: '',
                                  province_name: ''
                                }));
                                setCountrySearch('');
                                setProvinceSearch('');
                                setShowCountryDropdown(false);
                                setSelectedCountryIndex(-1);
                              }}
                              className={`block w-full px-3 py-2 text-left text-sm hover:bg-primary/10 transition-colors ${
                                index === selectedCountryIndex ? 'bg-primary/20' : ''
                              } ${
                                currentTheme === 'dark' ? 'text-white' : 'text-gray-900'
                              }`}
                            >
                              {country.label}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="relative province-dropdown-container">
                      <label className={`block text-sm font-medium mb-2 ${
                        currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Province / State
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={formData.province_name || provinceSearch}
                          onChange={(e) => {
                            setProvinceSearch(e.target.value);
                            if (formData.province_name) {
                              setFormData(prev => ({
                                ...prev,
                                province_code: '',
                                province_name: ''
                              }));
                            }
                            setShowProvinceDropdown(true);
                            setSelectedProvinceIndex(-1);
                          }}
                          onFocus={() => {
                            setShowProvinceDropdown(true);
                            setSelectedProvinceIndex(-1);
                          }}
                          onKeyDown={(e) => {
                            if (!showProvinceDropdown || filteredProvinces.length === 0) return;
                            
                            if (e.key === 'ArrowDown') {
                              e.preventDefault();
                              setSelectedProvinceIndex(prev => 
                                prev < filteredProvinces.length - 1 ? prev + 1 : prev
                              );
                            } else if (e.key === 'ArrowUp') {
                              e.preventDefault();
                              setSelectedProvinceIndex(prev => prev > 0 ? prev - 1 : -1);
                            } else if (e.key === 'Enter' && selectedProvinceIndex >= 0) {
                              e.preventDefault();
                              const province = filteredProvinces[selectedProvinceIndex];
                              setFormData(prev => ({
                                ...prev,
                                province_code: province.value,
                                province_name: province.label
                              }));
                              setProvinceSearch('');
                              setShowProvinceDropdown(false);
                              setSelectedProvinceIndex(-1);
                            } else if (e.key === 'Escape') {
                              setShowProvinceDropdown(false);
                              setSelectedProvinceIndex(-1);
                            }
                          }}
                          disabled={!formData.country_code || availableProvinces.length === 0}
                          className={`w-full px-3 py-2 pr-8 text-sm border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                            currentTheme === 'dark'
                              ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                          }`}
                          placeholder="Search or select province/state..."
                        />
                        {(formData.province_name || provinceSearch) && (
                          <Button
                            type="button"
                            onClick={() => {
                              setFormData(prev => ({
                                ...prev,
                                province_code: '',
                                province_name: ''
                              }));
                              setProvinceSearch('');
                            }}
                            className={`absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors ${
                              currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                            }`}
                          >
                            <X size={16} />
                          </Button>
                        )}
                      </div>
                      {showProvinceDropdown && filteredProvinces.length > 0 && (
                        <div className={`absolute z-50 w-full mt-1 max-h-60 overflow-auto rounded-lg border shadow-lg ${
                          currentTheme === 'dark'
                            ? 'bg-gray-700 border-gray-600'
                            : 'bg-white border-gray-300'
                        }`}>
                          {filteredProvinces.map((province, index) => (
                            <Button
                              key={province.value}
                              type="button"
                              onClick={() => {
                                setFormData(prev => ({
                                  ...prev,
                                  province_code: province.value,
                                  province_name: province.label
                                }));
                                setProvinceSearch('');
                                setShowProvinceDropdown(false);
                                setSelectedProvinceIndex(-1);
                              }}
                              className={`block w-full px-3 py-2 text-left text-sm hover:bg-primary/10 transition-colors ${
                                index === selectedProvinceIndex ? 'bg-primary/20' : ''
                              } ${
                                currentTheme === 'dark' ? 'text-white' : 'text-gray-900'
                              }`}
                            >
                              {province.label}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Tax Rate (%) *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max="100"
                      value={formData.tax_rate}
                      onChange={(e) => setFormData(prev => ({...prev, tax_rate: e.target.value}))}
                      className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors ${
                        currentTheme === 'dark'
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                      placeholder="e.g., 13.00"
                      required
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Tax Name *
                    </label>
                    <input
                      type="text"
                      value={formData.tax_name}
                      onChange={(e) => setFormData(prev => ({...prev, tax_name: e.target.value}))}
                      className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors ${
                        currentTheme === 'dark'
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                      placeholder="e.g., HST, VAT, GST, IVA"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <Button
                    type="button"
                    role="switch"
                    aria-checked={formData.is_active}
                    onClick={() => setFormData(prev => ({ ...prev, is_active: !prev.is_active }))}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                      formData.is_active
                        ? 'bg-primary'
                        : 'bg-gray-200'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      formData.is_active ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </Button>
                  <span 
                    className={`text-sm font-medium cursor-pointer select-none ${
                      currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      setFormData(prev => ({...prev, is_active: !prev.is_active}));
                    }}
                  >
                    {formData.is_active ? 'Active' : 'Inactive'}
                  </span>
                </div>

                <div className={`flex gap-3 pt-4 border-t ${
                  currentTheme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                }`}>
                  <Button
                    type="button"
                    onClick={() => setShowModal(false)}
                    variant="secondary"
                    size="sm"
                    className={`flex-1 px-4 py-2 text-sm font-medium border rounded-lg transition-colors ${
                      currentTheme === 'dark'
                        ? 'border-gray-600 text-gray-300 hover:bg-gray-800'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={loading}
                    variant="primary"
                    size="sm"
                    className="flex-1 px-4 py-2 text-sm font-medium bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Saving...' : (editingTaxRate ? 'Update Tax Rate' : 'Add Tax Rate')}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
    </AdminLayout>
  );
};

export default AdminTaxRates;
