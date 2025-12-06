import React, { useState, useEffect, useCallback } from 'react';
import { useApi } from '../../hooks/useApi';
import { AdminAPI } from '../../apis';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import { toast } from 'react-hot-toast';
import { BlogTagResponse } from '../../types';
import { Link } from 'react-router-dom';

export const AdminBlogTags = () => {
  const [tags, setTags] = useState<BlogTagResponse[]>([]);
  const [loadingAction, setLoadingAction] = useState<string | null>(null);

  const { data: fetchedTags, loading, error, execute: fetchTags } = useApi<BlogTagResponse[]>();

  const loadTags = useCallback(async () => {
    await fetchTags(AdminAPI.getBlogTags);
  }, [fetchTags]);

  useEffect(() => {
    loadTags();
  }, [loadTags]);

  useEffect(() => {
    if (fetchedTags) {
      setTags(fetchedTags.data);
    }
  }, [fetchedTags]);

  const handleDeleteTag = useCallback(async (tagId: string, tagName: string) => {
    if (window.confirm(`Are you sure you want to delete the tag "${tagName}"? This action cannot be undone.`)) {
      setLoadingAction(tagId);
      try {
        await AdminAPI.deleteBlogTag(tagId);
        toast.success(`Tag "${tagName}" deleted successfully!`);
        loadTags();
      } catch (err: any) {
        toast.error(`Failed to delete tag: ${err.message || 'Unknown error'}`);
      } finally {
        setLoadingAction(null);
      }
    }
  }, [loadTags]);

  if (loading && !fetchedTags) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="p-6">
        <ErrorMessage error={error} onRetry={loadTags} onDismiss={() => {}} />
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-main mb-6">Blog Tag Management</h1>

      <div className="flex justify-end mb-4">
        <Link to="/admin/blog/tags/new" className="btn btn-primary">
          Create New Tag
        </Link>
      </div>

      {!tags || tags.length === 0 ? (
        <div className="text-center text-copy-light p-8">No blog tags found.</div>
      ) : (
        <div className="overflow-x-auto bg-surface rounded-lg shadow-sm">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Slug</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tags.map((tag) => (
                <tr key={tag.id}>
                  <td>{tag.name}</td>
                  <td>{tag.slug}</td>
                  <td>{new Date(tag.created_at).toLocaleString()}</td>
                  <td className="flex space-x-2">
                    <Link to={`/admin/blog/tags/edit/${tag.id}`} className="btn btn-sm btn-info" disabled={loadingAction === tag.id}>
                      Edit
                    </Link>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handleDeleteTag(tag.id, tag.name)}
                      disabled={loadingAction === tag.id}
                    >
                      {loadingAction === tag.id ? <LoadingSpinner size="sm" /> : 'Delete'}
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
