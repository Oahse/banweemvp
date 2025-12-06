import React, { useState, useEffect, useCallback } from 'react';
import { useApi } from '../../hooks/useApi';
import { AdminAPI } from '../../apis';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import { toast } from 'react-hot-toast';
import { BlogCategoryResponse } from '../../types';
import { Link } from 'react-router-dom';

export const AdminBlogCategories = () => {
  const [categories, setCategories] = useState<BlogCategoryResponse[]>([]);
  const [loadingAction, setLoadingAction] = useState<string | null>(null);

  const { data: fetchedCategories, loading, error, execute: fetchCategories } = useApi<BlogCategoryResponse[]>();

  const loadCategories = useCallback(async () => {
    await fetchCategories(AdminAPI.getBlogCategories);
  }, [fetchCategories]);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  useEffect(() => {
    if (fetchedCategories) {
      setCategories(fetchedCategories.data);
    }
  }, [fetchedCategories]);

  const handleDeleteCategory = useCallback(async (categoryId: string, categoryName: string) => {
    if (window.confirm(`Are you sure you want to delete the category "${categoryName}"? This action cannot be undone.`)) {
      setLoadingAction(categoryId);
      try {
        await AdminAPI.deleteBlogCategory(categoryId);
        toast.success(`Category "${categoryName}" deleted successfully!`);
        loadCategories();
      } catch (err: any) {
        toast.error(`Failed to delete category: ${err.message || 'Unknown error'}`);
      } finally {
        setLoadingAction(null);
      }
    }
  }, [loadCategories]);

  if (loading && !fetchedCategories) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="p-6">
        <ErrorMessage error={error} onRetry={loadCategories} onDismiss={() => {}} />
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-main mb-6">Blog Category Management</h1>

      <div className="flex justify-end mb-4">
        <Link to="/admin/blog/categories/new" className="btn btn-primary">
          Create New Category
        </Link>
      </div>

      {!categories || categories.length === 0 ? (
        <div className="text-center text-copy-light p-8">No blog categories found.</div>
      ) : (
        <div className="overflow-x-auto bg-surface rounded-lg shadow-sm">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Slug</th>
                <th>Description</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id}>
                  <td>{category.name}</td>
                  <td>{category.slug}</td>
                  <td>{category.description || 'N/A'}</td>
                  <td>{new Date(category.created_at).toLocaleString()}</td>
                  <td className="flex space-x-2">
                    <Link to={`/admin/blog/categories/edit/${category.id}`} className="btn btn-sm btn-info" disabled={loadingAction === category.id}>
                      Edit
                    </Link>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handleDeleteCategory(category.id, category.name)}
                      disabled={loadingAction === category.id}
                    >
                      {loadingAction === category.id ? <LoadingSpinner size="sm" /> : 'Delete'}
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
