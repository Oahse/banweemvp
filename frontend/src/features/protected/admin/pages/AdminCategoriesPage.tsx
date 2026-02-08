import React, { useEffect, useState, useCallback } from 'react';
import { Loader, AlertCircle, ChevronLeft, ChevronRight, SearchIcon, Plus, Edit2, Trash2, AlertTriangle, X, FolderIcon, ArrowUpDownIcon } from 'lucide-react';
import AdminAPI from '@/api/admin';
import toast from 'react-hot-toast';
import { useTheme } from '@/components/shared/contexts/ThemeContext';
import Dropdown from '@/components/ui/Dropdown';
import AdminLayout from '../components/AdminLayout';
import AdminLayoutSkeleton from '../components/skeletons/AdminLayoutSkeleton';
import { CategoriesListSkeleton } from '../components/skeletons/CategoriesSkeleton';

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
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showModal, setShowModal] = useState(false);
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
    const fetchCategories = async () => {
      try {
        if (page === 1 && !searchQuery) {
          setInitialLoading(true);
        } else {
          setLoading(true);
        }
        setError(null);

        const response = await AdminAPI.getCategories({
          page,
          limit: LIMIT,
          search: debouncedSearchQuery || undefined,
        });

        if (response?.success && response?.data) {
          const data = response.data;
          let categories = data.data || [];
          
          // Sort categories based on sortBy field
          categories.sort((a, b) => {
            let aVal, bVal;
            
            if (sortBy === 'created_at') {
              aVal = new Date(a.created_at).getTime();
              bVal = new Date(b.created_at).getTime();
            } else if (sortBy === 'updated_at') {
              aVal = new Date(a.updated_at).getTime();
              bVal = new Date(b.updated_at).getTime();
            } else {
              // Default to name
              aVal = a.name;
              bVal = b.name;
            }
            
            if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
            if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
            return 0;
          });
          
          setCategories(categories);
          setPagination({
            page: data.page || page,
            limit: data.limit || LIMIT,
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

    fetchCategories();
  }, [page, debouncedSearchQuery, sortOrder, sortBy]);

  const openEditModal = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description || '',
      image_url: category.image_url || '',
      is_active: category.is_active
    });
    setShowModal(true);
  };

  const openAddModal = () => {
    setEditingCategory(null);
    setFormData({
      name: '',
      description: '',
      image_url: '',
      is_active: true
    });
    setShowModal(true);
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
      
      setShowModal(false);
      setEditingCategory(null);
    } catch (error: any) {
      const message = error?.response?.data?.message || error?.message || 
        (editingCategory ? 'Failed to update category' : 'Failed to create category');
      toast.error(message);
    }
  };

  const handleDelete = (category: Category) => {
    setCategoryToDelete(category);
    setShowDeleteModal(true);
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
      setShowDeleteModal(false);
      setCategoryToDelete(null);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to delete category';
      toast.error(errorMessage);
    } finally {
      setIsDeleting(false);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setCategoryToDelete(null);
  };

  if (initialLoading) {
    return <AdminLayoutSkeleton />;
  }

  return (
    <AdminLayout>
      <div className={`space-y-3 ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-1">
        <div>
          <p className={`mt-1 text-xs lg:text-sm ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Manage product categories</p>
        </div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm font-medium"
        >
          <Plus size={16} />
          Add Category
        </button>
      </div>

      {/* Search and Filters */}
      <div className={`p-4 rounded-lg border ${currentTheme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="flex flex-col gap-4">
          <div className="flex-1">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search categories..."
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
                { value: 'name', label: 'Name' },
                { value: 'created_at', label: 'Created' },
                { value: 'updated_at', label: 'Updated' }
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
          {debouncedSearchQuery && (
            <div className="flex items-center gap-2 pt-2 border-t border-gray-200 dark:border-gray-600">
              <span className="text-sm text-gray-600 dark:text-gray-400">Active filters:</span>
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                Search: "{debouncedSearchQuery}"
                <button
                  onClick={() => setSearchQuery('')}
                  className="ml-1 hover:text-primary-dark"
                >
                  ×
                </button>
              </span>
              <button
                onClick={() => setSearchQuery('')}
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
            ? 'bg-error/10 border-error/30 text-error' 
            : 'bg-error/10 border-error/30 text-error'
        }`}>
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-semibold">Error Loading Categories</p>
            <p className="text-sm mt-1">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className={`mt-2 text-sm underline hover:no-underline ${
                currentTheme === 'dark' ? 'text-error hover:text-error-light' : 'text-error hover:text-error-dark'
              }`}
            >
              Try again
            </button>
          </div>
        </div>
      )}

      <div className={`rounded-lg border overflow-hidden ${currentTheme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        {loading && !initialLoading ? (
          <div className="p-8">
            <div className="flex items-center justify-center">
              <Loader className="w-8 h-8 text-primary animate-spin mr-3" />
              <span className={`text-sm ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Updating categories...</span>
            </div>
          </div>
        ) : categories.length > 0 ? (
          <>
            {/* Desktop table */}
            <div className="overflow-x-auto hidden md:block">
              <table className="w-full">
                <thead className={`${currentTheme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} border-b border-gray-200`}>
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Description</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category) => (
                    <tr key={category.id} className={`border-b border-gray-200 transition-colors ${currentTheme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                        <div className="flex items-center gap-2">
                          <FolderIcon size={16} className="text-gray-400" />
                          {category.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                        {category.description || '-'}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          category.is_active 
                            ? 'bg-success/20 text-success'
                            : 'bg-gray-500/20 text-gray-500'
                        }`}>
                          {category.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => openEditModal(category)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
                          >
                            <Edit2 size={14} />
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDelete(category)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-error/10 text-error rounded-lg hover:bg-error/20 transition-colors"
                          >
                            <Trash2 size={14} />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden divide-y divide-gray-200">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className={`p-4 flex flex-col gap-2 bg-white dark:bg-gray-800 transition-colors ${currentTheme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FolderIcon size={16} className="text-gray-400" />
                      <span className="font-medium text-gray-900 dark:text-white">{category.name}</span>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      category.is_active 
                        ? 'bg-success/20 text-success'
                        : 'bg-gray-500/20 text-gray-500'
                    }`}>
                      {category.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  {category.description && (
                    <div className="text-sm text-gray-600 dark:text-gray-300">{category.description}</div>
                  )}
                  <div className="flex gap-2 mt-2">
                    <button 
                      onClick={() => openEditModal(category)}
                      className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-1.5 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors text-sm"
                    >
                      <Edit2 size={14} />
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(category)}
                      className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-1.5 bg-error/10 text-error rounded-lg hover:bg-error/20 transition-colors text-sm"
                    >
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : null}

        {/* Empty state */}
        {categories.length === 0 && (
          <div className={`px-8 py-12 text-center ${currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            <div className="mb-4">
              <div className={`w-16 h-16 mx-auto rounded-full ${currentTheme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'} flex items-center justify-center`}>
                <FolderIcon className={`w-8 h-8 ${currentTheme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
              </div>
            </div>
            <h3 className="text-lg font-medium mb-2">No categories found</h3>
            <p className="text-sm mb-4">
              {searchQuery 
                ? 'Try adjusting your search to find what you\'re looking for.'
                : 'Get started by adding categories to organize your products.'
              }
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-sm text-primary hover:text-primary-dark underline"
              >
                Clear search
              </button>
            )}
          </div>
        )}

        {/* Pagination - bottom */}
        <div className={`px-6 py-4 border-t ${currentTheme === 'dark' ? 'border-gray-700' : 'border-gray-200'} flex flex-col sm:flex-row items-center justify-between gap-4`}>
          <p className={`text-sm ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            {pagination.total > 0 
              ? `Showing ${(pagination.page - 1) * pagination.limit + 1}–${Math.min(pagination.page * pagination.limit, pagination.total)} of ${pagination.total} items${pagination.pages > 1 ? ` (Page ${pagination.page} of ${pagination.pages})` : ''}`
              : `Total: ${pagination.total} items`
            }
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className={`inline-flex items-center gap-1 px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${
                currentTheme === 'dark' 
                  ? 'border-gray-600 bg-gray-800 text-white hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed' 
                  : 'border-gray-300 bg-white text-gray-900 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>
            
            {/* Page numbers */}
            <div className="flex items-center gap-1 mx-2">
              {Array.from({ length: Math.min(5, Math.max(1, pagination.pages)) }, (_, i) => {
                let pageNum;
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
                    className={`w-8 h-8 rounded-md text-sm font-medium transition-colors ${
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
              className={`inline-flex items-center gap-1 px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${
                currentTheme === 'dark' 
                  ? 'border-gray-600 bg-gray-800 text-white hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed' 
                  : 'border-gray-300 bg-white text-gray-900 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
              }`}
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && categoryToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={cancelDelete}>
          <div className={`w-full max-w-md rounded-xl p-6 shadow-xl ${currentTheme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`} onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start gap-3 mb-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-error/10 flex items-center justify-center">
                <AlertTriangle className="text-error" size={20} />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-semibold mb-1">Delete Category</h3>
                <p className={`text-sm ${currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Are you sure you want to delete "{categoryToDelete.name}"? This action cannot be undone.
                </p>
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <button
                onClick={cancelDelete}
                disabled={isDeleting}
                className={`px-4 py-2 rounded-lg border text-sm font-medium ${
                  currentTheme === 'dark' 
                    ? 'border-gray-600 text-gray-200 hover:bg-gray-700' 
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                } disabled:opacity-50`}
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={isDeleting}
                className="inline-flex items-center gap-2 px-4 py-2 bg-error text-white rounded-lg hover:bg-error-dark transition-colors text-sm font-medium disabled:opacity-50"
              >
                {isDeleting ? (
                  <>
                    <Loader className="animate-spin" size={14} />
                    Deleting...
                  </>
                ) : (
                  'Delete'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setShowModal(false)}>
          <div className={`w-full max-w-2xl rounded-xl p-6 shadow-xl ${currentTheme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`} onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">{editingCategory ? 'Edit Category' : 'Add Category'}</h3>
                <p className={`text-sm ${currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  {editingCategory ? 'Update category information' : 'Fill in the details below'}
                </p>
              </div>
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingCategory(null);
                }}
                className={`p-1 rounded-lg transition-colors ${currentTheme === 'dark' ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'}`}
              >
                <X size={20} />
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
                <label className={`block text-sm font-medium mb-2 ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Description
                </label>
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
                <label className={`block text-sm font-medium mb-2 ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Image URL
                </label>
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
                <label className={`block text-sm font-medium mb-2 ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Status</label>
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

              <div className="flex justify-end gap-2 pt-4 border-t border-gray-200 dark:border-gray-600">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingCategory(null);
                  }}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium ${
                    currentTheme === 'dark' 
                      ? 'border-gray-600 text-gray-200 hover:bg-gray-700' 
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm font-medium"
                >
                  {editingCategory ? 'Update Category' : 'Add Category'}
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

export default AdminCategoriesPage;
