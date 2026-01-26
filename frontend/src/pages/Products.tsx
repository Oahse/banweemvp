import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchIcon, FilterIcon, XIcon } from 'lucide-react';
import { useAsync } from '../hooks/useAsync';
import { ProductsAPI } from '../apis';
import { ProductCard } from '../components/ProductCard';
import { SkeletonProductCard } from '../components/ui/SkeletonProductCard';
import { Error } from '../components/Error';
import { useCategories } from '../contexts/CategoryContext';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.get('category')?.split(',') || []
  );
  const [sortOption, setSortOption] = useState('created_at:desc');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [productsData, setProductsData] = useState<any>(null);

  const { loading, error, execute: fetchProducts } = useAsync();
  const { categories } = useCategories();

  const buildSearchParams = useCallback(() => {
    const [sortBy, sortOrder] = sortOption.split(':');
    return {
      q: searchQuery || undefined,
      category: selectedCategories.length > 0 ? selectedCategories.join(',') : undefined,
      min_price: priceRange[0] > 0 ? priceRange[0] : undefined,
      max_price: priceRange[1] < 1000 ? priceRange[1] : undefined,
      sort_by: sortBy,
      sort_order: sortOrder,
      page: currentPage,
      limit: 20,
    };
  }, [searchQuery, selectedCategories, sortOption, priceRange, currentPage]);

  useEffect(() => {
    const params = buildSearchParams();
    fetchProducts(async () => {
      const response = await ProductsAPI.getProducts(params);
      setProductsData(response.data);
      return response.data;
    });
  }, [buildSearchParams, fetchProducts]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    const newParams = new URLSearchParams(searchParams);
    if (searchQuery) {
      newParams.set('q', searchQuery);
    } else {
      newParams.delete('q');
    }
    setSearchParams(newParams);
  };

  const handleCategoryChange = (categoryId: string) => {
    const newCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter(id => id !== categoryId)
      : [...selectedCategories, categoryId];
    
    setSelectedCategories(newCategories);
    setCurrentPage(1);
    
    const newParams = new URLSearchParams(searchParams);
    if (newCategories.length > 0) {
      newParams.set('category', newCategories.join(','));
    } else {
      newParams.delete('category');
    }
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setPriceRange([0, 1000]);
    setSortOption('created_at:desc');
    setCurrentPage(1);
    setSearchParams({});
  };

  const retryFetch = () => {
    const params = buildSearchParams();
    fetchProducts(async () => {
      const response = await ProductsAPI.getProducts(params);
      setProductsData(response.data);
      return response.data;
    });
  };

  if (error && !productsData) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Error message="Failed to load products" onRetry={retryFetch} />
      </div>
    );
  }

  const products = productsData?.items || [];
  const totalProducts = productsData?.total || 0;
  const totalPages = Math.ceil(totalProducts / 20);

  return (
    <div className="max-w-7xl mx-auto px-4 py-4 sm:py-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
          Products
        </h1>
        <p className="text-gray-600 text-sm sm:text-base">
          {loading && !productsData ? 'Loading products...' : `${totalProducts} products available`}
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 sm:mb-8 space-y-4">
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors text-sm sm:text-base"
            />
          </div>
          <button
            type="submit"
            className="px-4 sm:px-6 py-2.5 sm:py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-all duration-200 font-medium text-sm sm:text-base whitespace-nowrap"
          >
            Search
          </button>
        </form>

        {/* Filter Toggle and Sort */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base"
          >
            <FilterIcon size={16} />
            <span>Filters</span>
            {(selectedCategories.length > 0 || priceRange[0] > 0 || priceRange[1] < 1000) && (
              <span className="bg-primary text-white text-xs px-2 py-0.5 rounded-full">
                {selectedCategories.length + (priceRange[0] > 0 || priceRange[1] < 1000 ? 1 : 0)}
              </span>
            )}
          </button>

          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary transition-colors text-sm sm:text-base min-w-[180px]"
          >
            <option value="created_at:desc">Newest First</option>
            <option value="created_at:asc">Oldest First</option>
            <option value="name:asc">Name A-Z</option>
            <option value="name:desc">Name Z-A</option>
            <option value="price:asc">Price Low to High</option>
            <option value="price:desc">Price High to Low</option>
          </select>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 space-y-4 sm:space-y-6 shadow-sm">
            {/* Categories */}
            {categories && categories.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryChange(category.id)}
                      className={`px-3 py-1.5 rounded-full text-sm transition-all duration-200 ${
                        selectedCategories.includes(category.id)
                          ? 'bg-primary text-white shadow-sm'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Price Range */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">Price Range</h3>
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <label className="block text-xs text-gray-600 mb-1">Min Price</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <span className="text-gray-400 mt-5">—</span>
                <div className="flex-1">
                  <label className="block text-xs text-gray-600 mb-1">Max Price</label>
                  <input
                    type="number"
                    placeholder="1000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 1000])}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Clear Filters */}
            <button
              onClick={clearFilters}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
            >
              <XIcon size={16} />
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-6">
        {loading && !productsData ? (
          // Show skeleton cards while loading
          Array.from({ length: 20 }).map((_, index) => (
            <SkeletonProductCard key={index} />
          ))
        ) : products.length > 0 ? (
          // Show actual products
          products.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          // Show empty state
          <div className="col-span-full text-center py-12 sm:py-16">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <SearchIcon size={24} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search or filter criteria
              </p>
              <button
                onClick={clearFilters}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
              >
                Clear filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && !loading && (
        <div className="mt-8 sm:mt-12 flex justify-center">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors text-sm sm:text-base"
            >
              Previous
            </button>
            
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Show page numbers */}
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                if (pageNum > totalPages) return null;
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-3 py-2 rounded-lg text-sm sm:text-base transition-colors ${
                      currentPage === pageNum
                        ? 'bg-primary text-white'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors text-sm sm:text-base"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Loading indicator for pagination */}
      {loading && productsData && (
        <div className="fixed bottom-4 right-4 bg-primary text-white px-4 py-2 rounded-lg shadow-lg z-50">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm font-medium">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;