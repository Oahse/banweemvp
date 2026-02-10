import { useEffect, useState, useCallback } from 'react';
import { Loader, AlertCircle, SearchIcon, Plus, Edit2, Trash2, X, FolderIcon, ArrowUpDownIcon } from 'lucide-react';
import AdminAPI from '@/api/admin';
import toast from 'react-hot-toast';
import { useTheme } from '@/components/shared/contexts/ThemeContext';
import Dropdown from '@/components/ui/Dropdown';
import { CategoriesListSkeleton } from '@/features/protected/admin/components/skeletons/CategoriesSkeleton';
import { Button } from '@/components/ui/Button';
import { Heading, Body, Text, Label } from '@/components/ui/Text/Text';
import { Pagination } from '@/components/ui/Pagination';
import { Modal, ModalHeader, ModalBody, ModalFooter, ConfirmModal, useModal } from '@/components/ui/Modal';
import { AdminDataTable, AdminColumn, FilterConfig } from '@/components/shared/AdminDataTable';
import { Card } from '@/components/ui/Card';

const LIMIT = 10;

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

interface Category {
  id: string;
  name: string;
  description: string;
  image_url: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

const AdminCategoriesPage = () => {
  const { currentTheme } = useTheme();
  const [categories, setCategories] = useState<Category[]>([]);
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
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const deleteModal = useModal();
  const formModal = useModal();
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image_url: '',
    is_active: true
  });

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Reset to page 1 when filters change
  const resetPage = useCallback(() => {
    setPage(1);
  }, []);

  useEffect(() => {
    resetPage();
  }, [debouncedSearchQuery, sortBy, sortOrder, resetPage]);

  useEffect(() => {
    fetchData({
      page: 1,
      limit: LIMIT,
      search: '',
      sort_by: 'name',
      sort_order: 'asc'
    });
  }, []);

  const openEditModal = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description || '',
      image_url: category.image_url || '',
      is_active: category.is_active
    });
    formModal.open();
  };

  const openAddModal = () => {
    setEditingCategory(null);
    setFormData({
      name: '',
      description: '',
      image_url: '',
      is_active: true
    });
    formModal.open();
  };

  const handleQuickUpdate = async (categoryId: string, updatedData: any) => {
    try {
      const response = await AdminAPI.updateCategory(categoryId, updatedData);
      
      if (response?.success === false) {
        throw new Error(response?.message || 'Failed to update category');
      }

      // Update the category in the list immediately
      setCategories(prev => prev.map(c => 
        c.id === categoryId ? { ...c, ...updatedData } : c
      ));
    } catch (error: any) {
      const message = error?.response?.data?.message || error?.message || 'Failed to update category';
      toast.error(message);
    }
  };

  const fetchData = async (params: any) => {
    try {
      setLoading(true);
      setError(null);

      const response = await AdminAPI.getCategories({
        page: params.page,
        limit: params.limit,
        search: params.search,
      });

      if (response?.success && response?.data) {
        const data = response.data;
        let categories = data.data || [];
        
        // Sort categories based on sortBy field
        categories.sort((a, b) => {
          let aVal, bVal;
          
          if (params.sort_by === 'created_at') {
            aVal = new Date(a.created_at).getTime();
            bVal = new Date(b.created_at).getTime();
          } else if (params.sort_by === 'updated_at') {
            aVal = new Date(a.updated_at).getTime();
            bVal = new Date(b.updated_at).getTime();
          } else {
            // Default to name
            aVal = a.name;
            bVal = b.name;
          }
          
          if (aVal < bVal) return params.sort_order === 'asc' ? -1 : 1;
          if (aVal > bVal) return params.sort_order === 'asc' ? 1 : -1;
          return 0;
        });
        
        setCategories(categories);
        setPagination({
          page: data.page || params.page,
          limit: data.limit || params.limit,
          total: data.total || 0,
          pages: data.pages || 0,
        });
      } else {
        throw new Error(response?.message || 'Failed to load categories');
      }
    } catch (err: any) {
      const message = err?.response?.data?.message || err?.message || 'Failed to load categories';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  };

  // Define columns for AdminDataTable
  const columns: AdminColumn<Category>[] = [
    {
      key: 'name',
      label: 'Name',
      sortable: true,
      render: (value: string, row: Category) => (
        <div className="flex items-center gap-2">
          <FolderIcon size={16} className="text-gray-400" />
          <Text weight="medium">{value}</Text>
        </div>
      ),
    },
    {
      key: 'description',
      label: 'Description',
      render: (value: string) => (
        <Text variant="body-sm" tone="secondary">{value || '-'}</Text>
      ),
    },
    {
      key: 'is_active',
      label: 'Status',
      sortable: true,
      render: (value: boolean) => (
        <Text className={`px-3 py-1 rounded-full text-sm font-semibold ${
          value 
            ? 'bg-success/20 text-success'
            : 'bg-gray-500/20 text-gray-500'
        }`}>
          {value ? 'Active' : 'Inactive'}
        </Text>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_: any, row: Category) => (
        <div className="flex items-center gap-2">
          <Button 
            onClick={() => openEditModal(row)}
            variant="ghost"
            size="xs"
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
            leftIcon={<Edit2 size={14} />}
          >
            Edit
          </Button>
          <Button 
            onClick={() => handleDelete(row)}
            variant="ghost"
            size="xs"
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-error/10 text-error rounded-lg hover:bg-error/20 transition-colors"
            leftIcon={<Trash2 size={14} />}
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
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' },
      ],
      placeholder: 'All Status',
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast.error('Category name is required');
      return;
    }

    try {
      if (editingCategory) {
        const response = await AdminAPI.updateCategory(editingCategory.id, formData);
        
        if (response?.success === false) {
          throw new Error(response?.message || 'Failed to update category');
        }

        setCategories(prev => prev.map(c => 
          c.id === editingCategory.id ? { ...c, ...(response.data || response) } : c
        ));
        toast.success('Category updated successfully');
      } else {
        const response = await AdminAPI.createCategory(formData);
        
        if (response?.success === false) {
          throw new Error(response?.message || 'Failed to create category');
        }

        const categoryData = response.data || response;
        setCategories(prev => [categoryData, ...prev]);
        setPagination(prev => ({
          ...prev,
          total: prev.total + 1
        }));
        toast.success('Category created successfully');
      }
      
      formModal.close();
      setEditingCategory(null);
    } catch (error: any) {
      const message = error?.response?.data?.message || error?.message || 
        (editingCategory ? 'Failed to update category' : 'Failed to create category');
      toast.error(message);
    }
  };

  const handleDelete = (category: Category) => {
    setCategoryToDelete(category);
    deleteModal.open();
  };

  const confirmDelete = async () => {
    if (!categoryToDelete) return;

    setIsDeleting(true);
    try {
      await AdminAPI.deleteCategory(categoryToDelete.id);
      
      setCategories(prev => prev.filter(c => c.id !== categoryToDelete.id));
      setPagination(prev => ({
        ...prev,
        total: Math.max(0, prev.total - 1)
      }));
      
      toast.success('Category deleted successfully');
      deleteModal.close();
      setCategoryToDelete(null);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to delete category';
      toast.error(errorMessage);
    } finally {
      setIsDeleting(false);
    }
  };

  if (initialLoading) {
    return (
      <CategoriesListSkeleton />
    );
  }

  return (
    <div className={`space-y-3 ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-1">
        <div>
          <Body className={`mt-1 text-sm lg:text-sm ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Manage product categories</Body>
        </div>
          <Button
            onClick={openAddModal}
            variant="primary"
            size="xs"
            leftIcon={<Plus size={14} />}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm font-medium"
          >
            Add Category
          </Button>
      </div>

      <AdminDataTable
        data={categories}
        loading={loading}
        error={error}
        pagination={pagination}
        columns={columns}
        fetchData={fetchData}
        searchPlaceholder="Search categories..."
        filters={filters}
        
        emptyMessage="No categories found"
        responsive="cards"
        limit={LIMIT}
      />

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.close}
        title="Delete Category"
        message={`Are you sure you want to delete "${categoryToDelete?.name}"? This action cannot be undone.`}
        confirmText={isDeleting ? 'Deleting...' : 'Delete Category'}
        cancelText="Cancel"
        variant="danger"
        onConfirm={confirmDelete}
        disabled={isDeleting}
      />

      <Modal isOpen={formModal.isOpen} onClose={formModal.close} size="md">
        <form onSubmit={handleSubmit}>
          <ModalHeader>{editingCategory ? 'Edit Category' : 'Add Category'}</ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <div>
                <Label className={`block text-sm font-medium mb-2 ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Name *
                </Label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => {
                    const newData = { ...formData, name: e.target.value };
                    setFormData(newData);
                    if (editingCategory) {
                      handleQuickUpdate(editingCategory.id, newData);
                    }
                  }}
                  className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors ${
                    currentTheme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                  placeholder="e.g., Electronics"
                  required
                />
              </div>

              <div>
                <Label className={`block text-sm font-medium mb-2 ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Description
                </Label>
                <textarea
                  value={formData.description}
                  onChange={(e) => {
                    const newData = { ...formData, description: e.target.value };
                    setFormData(newData);
                    if (editingCategory) {
                      handleQuickUpdate(editingCategory.id, newData);
                    }
                  }}
                  className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors ${
                    currentTheme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                  placeholder="Optional description"
                  rows={3}
                />
              </div>

              <div>
                <Label className={`block text-sm font-medium mb-2 ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Image URL
                </Label>
                <input
                  type="url"
                  value={formData.image_url}
                  onChange={(e) => {
                    const newData = { ...formData, image_url: e.target.value };
                    setFormData(newData);
                    if (editingCategory) {
                      handleQuickUpdate(editingCategory.id, newData);
                    }
                  }}
                  className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors ${
                    currentTheme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div>
                <Label className={`block text-sm font-medium mb-2 ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Status</Label>
                <Dropdown
                  options={[
                    { value: true, label: 'Active' },
                    { value: false, label: 'Inactive' }
                  ]}
                  value={formData.is_active}
                  onChange={val => {
                    const newData = { ...formData, is_active: val };
                    setFormData(newData);
                    if (editingCategory) {
                      handleQuickUpdate(editingCategory.id, newData);
                    }
                  }}
                  placeholder="Select status"
                  className="min-w-[120px]"
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={() => {
                formModal.close();
                setEditingCategory(null);
              }}
              variant="secondary"
              size="xs"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="xs"
            >
              {editingCategory ? 'Update Category' : 'Add Category'}
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    </div>
  );
};

export default AdminCategoriesPage;
