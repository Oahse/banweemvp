import React, { useState, useEffect, useCallback } from 'react';
import { useApi } from '../hooks/useApi';
import { AdminAPI } from '../apis'; // Using AdminAPI for now, will create BlogAPI later if needed
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { BlogPostResponse, BlogCategoryResponse, BlogTagResponse } from '../types';
import { Link, useSearchParams } from 'react-router-dom';

export const Blog = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPostResponse[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [selectedTag, setSelectedTag] = useState(searchParams.get('tag') || '');

  const [categories, setCategories] = useState<BlogCategoryResponse[]>([]);
  const [tags, setTags] = useState<BlogTagResponse[]>([]);

  const { data: fetchedPosts, loading: loadingPosts, error: postsError, execute: fetchPosts } = useApi<{
    total: number;
    page: number;
    limit: number;
    data: BlogPostResponse[];
  }>();
  const { data: fetchedCategories, execute: fetchCategories } = useApi<BlogCategoryResponse[]>();
  const { data: fetchedTags, execute: fetchTags } = useApi<BlogTagResponse[]>();

  const loadPosts = useCallback(async () => {
    const params: { [key: string]: any } = { page: currentPage, limit: 10, is_published: true };
    if (searchQuery) params.search = searchQuery;
    if (selectedCategory) params.category_slug = selectedCategory;
    if (selectedTag) params.tag_slug = selectedTag;

    await fetchPosts(() => AdminAPI.getBlogPosts(params));
  }, [currentPage, searchQuery, selectedCategory, selectedTag, fetchPosts]);

  const loadCategoriesAndTags = useCallback(async () => {
    await fetchCategories(AdminAPI.getBlogCategories);
    await fetchTags(AdminAPI.getBlogTags);
  }, [fetchCategories, fetchTags]);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  useEffect(() => {
    loadCategoriesAndTags();
  }, [loadCategoriesAndTags]);

  useEffect(() => {
    if (fetchedPosts) {
      setBlogPosts(fetchedPosts.data);
      setTotalPages(Math.ceil(fetchedPosts.total / fetchedPosts.limit));
    }
  }, [fetchedPosts]);

  useEffect(() => {
    if (fetchedCategories) {
      setCategories(fetchedCategories.data);
    }
  }, [fetchedCategories]);

  useEffect(() => {
    if (fetchedTags) {
      setTags(fetchedTags.data);
    }
  }, [fetchedTags]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSearchParams(prev => {
        prev.set('page', page.toString());
        return prev;
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setCurrentPage(1);
    setSearchParams(prev => {
        if (value) prev.set('search', value);
        else prev.delete('search');
        prev.delete('page');
        return prev;
    });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedCategory(value);
    setCurrentPage(1);
    setSearchParams(prev => {
        if (value) prev.set('category', value);
        else prev.delete('category');
        prev.delete('page');
        return prev;
    });
  };

  const handleTagChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedTag(value);
    setCurrentPage(1);
    setSearchParams(prev => {
        if (value) prev.set('tag', value);
        else prev.delete('tag');
        prev.delete('page');
        return prev;
    });
  };

  if (loadingPosts) {
    return <LoadingSpinner />;
  }

  if (postsError) {
    return (
      <div className="p-6">
        <ErrorMessage error={postsError} onRetry={loadPosts} onDismiss={() => {}} />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8">Our Blog</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Search blog posts..."
          className="input input-bordered flex-grow"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <select
          className="select select-bordered"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.slug}>{cat.name}</option>
          ))}
        </select>
        <select
          className="select select-bordered"
          value={selectedTag}
          onChange={handleTagChange}
        >
          <option value="">All Tags</option>
          {tags.map(tag => (
            <option key={tag.id} value={tag.slug}>{tag.name}</option>
          ))}
        </select>
      </div>

      {!blogPosts || blogPosts.length === 0 ? (
        <div className="text-center text-copy-light p-8">No blog posts found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div key={post.id} className="card bg-base-100 shadow-xl">
              <figure>
                {post.image_url ? (
                  <img src={post.image_url} alt={post.title} className="w-full h-48 object-cover" />
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
              </figure>
              <div className="card-body">
                <h2 className="card-title text-2xl">
                  <Link to={`/blog/${post.slug}`} className="hover:underline">
                    {post.title}
                  </Link>
                </h2>
                <p className="text-copy-light text-sm">
                  By {post.author?.full_name || 'Anonymous'} on {new Date(post.published_at || post.created_at).toLocaleDateString()}
                </p>
                {post.category && (
                    <div className="badge badge-outline">{post.category.name}</div>
                )}
                <p>{post.excerpt || post.content.substring(0, 150)}...</p>
                <div className="card-actions justify-end">
                  <Link to={`/blog/${post.slug}`} className="btn btn-primary">Read More</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
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