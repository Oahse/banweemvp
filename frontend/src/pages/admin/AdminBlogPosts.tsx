import React, { useState, useEffect, useCallback } from 'react';
import { useApi } from '../../hooks/useApi';
import { AdminAPI } from '../../apis'; // Will extend AdminAPI for blog endpoints
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import { toast } from 'react-hot-toast';
import { BlogPostResponse } from '../../types'; // Assuming BlogPostResponse from types
import { Link } from 'react-router-dom';

export const AdminBlogPosts = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPostResponse[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPublished, setFilterPublished] = useState<boolean | undefined>(undefined);
  const [loadingAction, setLoadingAction] = useState<string | null>(null); // To disable buttons during action

  const { data: fetchedPosts, loading, error, execute: fetchPosts } = useApi<{
    total: number;
    page: number;
    limit: number;
    data: BlogPostResponse[];
  }>();

  const loadPosts = useCallback(async () => {
    // AdminAPI.getBlogPosts will be implemented later
    // For now, let's assume it exists and handles pagination, search, and filtering
    await fetchPosts(() => AdminAPI.getBlogPosts({
      page: currentPage,
      limit: 10, // Or a suitable default limit
      search: searchQuery || undefined,
      is_published: filterPublished,
    }));
  }, [currentPage, searchQuery, filterPublished, fetchPosts]);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  useEffect(() => {
    if (fetchedPosts) {
      setBlogPosts(fetchedPosts.data);
      setTotalPages(Math.ceil(fetchedPosts.total / fetchedPosts.limit));
    }
  }, [fetchedPosts]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handleFilterPublishedChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setFilterPublished(value === 'true' ? true : value === 'false' ? false : undefined);
    setCurrentPage(1); // Reset to first page on new filter
  };

  const handleTogglePublished = useCallback(async (post: BlogPostResponse) => {
    setLoadingAction(post.id);
    try {
      // AdminAPI.updateBlogPost will be implemented later
      // Assuming it takes post_id and a partial update object
      await AdminAPI.updateBlogPost(post.id, { is_published: !post.is_published });
      toast.success(`Post "${post.title}" ${post.is_published ? 'unpublished' : 'published'} successfully!`);
      loadPosts(); // Reload posts to reflect changes
    } catch (err: any) {
      toast.error(`Failed to toggle publish status: ${err.message || 'Unknown error'}`);
    } finally {
      setLoadingAction(null);
    }
  }, [loadPosts]);

  const handleDeletePost = useCallback(async (postId: string, postTitle: string) => {
    if (window.confirm(`Are you sure you want to delete the blog post "${postTitle}"?`)) {
      setLoadingAction(postId);
      try {
        // AdminAPI.deleteBlogPost will be implemented later
        await AdminAPI.deleteBlogPost(postId);
        toast.success(`Post "${postTitle}" deleted successfully!`);
        loadPosts(); // Reload posts to reflect changes
      } catch (err: any) {
        toast.error(`Failed to delete post: ${err.message || 'Unknown error'}`);
      } finally {
        setLoadingAction(null);
      }
    }
  }, [loadPosts]);

  if (loading && !fetchedPosts) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="p-6">
        <ErrorMessage error={error} onRetry={loadPosts} onDismiss={() => {}} />
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-main mb-6">Blog Post Management</h1>

      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by title or content..."
          className="input input-bordered w-full max-w-xs"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <select
          className="select select-bordered"
          value={filterPublished === undefined ? 'all' : filterPublished.toString()}
          onChange={handleFilterPublishedChange}
        >
          <option value="all">All Statuses</option>
          <option value="true">Published</option>
          <option value="false">Unpublished</option>
        </select>
        <Link to="/admin/blog/posts/new" className="btn btn-primary">
          Create New Post
        </Link>
      </div>

      {!blogPosts || blogPosts.length === 0 ? (
        <div className="text-center text-copy-light p-8">No blog posts found.</div>
      ) : (
        <div className="overflow-x-auto bg-surface rounded-lg shadow-sm">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Category</th>
                <th>Published</th>
                <th>Published At</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogPosts.map((post) => (
                <tr key={post.id}>
                  <td>{post.title}</td>
                  <td>{post.author?.full_name || post.author?.firstname || 'N/A'}</td>
                  <td>{post.category?.name || 'N/A'}</td>
                  <td>{post.is_published ? 'Yes' : 'No'}</td>
                  <td>{post.published_at ? new Date(post.published_at).toLocaleString() : 'N/A'}</td>
                  <td>{new Date(post.created_at).toLocaleString()}</td>
                  <td className="flex space-x-2">
                    <Link to={`/admin/blog/posts/edit/${post.id}`} className="btn btn-sm btn-info" disabled={loadingAction === post.id}>
                      Edit
                    </Link>
                    <button
                      className={`btn btn-sm ${post.is_published ? 'btn-warning' : 'btn-success'}`}
                      onClick={() => handleTogglePublished(post)}
                      disabled={loadingAction === post.id}
                    >
                      {loadingAction === post.id ? <LoadingSpinner size="sm" /> : (post.is_published ? 'Unpublish' : 'Publish')}
                    </button>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handleDeletePost(post.id, post.title)}
                      disabled={loadingAction === post.id}
                    >
                      {loadingAction === post.id ? <LoadingSpinner size="sm" /> : 'Delete'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center mt-4">
          <div className="join">
            <button className="join-item btn" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>«</button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button key={page} className={`join-item btn ${currentPage === page ? 'btn-active' : ''}`} onClick={() => handlePageChange(page)}>{page}</button>
            ))}
            <button className="join-item btn" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>»</button>
          </div>
        </div>
      )}
    </div>
  );
};
