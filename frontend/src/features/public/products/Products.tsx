import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchIcon, FilterIcon, XIcon } from 'lucide-react';
import { useAsync } from '@/components/shared/hooks/useAsync';
import { ProductsAPI, CategoriesAPI } from '@/api';
import { ProductCard } from '@/components/generic/ProductCard';
import { SkeletonProductCard } from '@/components/ui/SkeletonProductCard';
import { Dropdown } from '@/components/ui/Dropdown';
import { themeClasses, combineThemeClasses, getInputClasses, getButtonClasses } from '@/utils/themeClasses';
import { cn } from '@/utils/cn';
import { Button } from '@/components/ui/Button';
import { Heading, Body, Text, Label } from '@/components/ui/Text/Text';
import { Pagination } from '@/components/ui/Pagination';
import AnimatedLoader from '@/components/ui/AnimatedLoader';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 }
  }
};

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
  const [categories, setCategories] = useState<any[]>([]);

  const { loading, error, execute: fetchProducts } = useAsync({
    showErrorToast: false, // Disable error toasts
    showSuccessToast: false, // Disable success toasts
    onError: (error) => {
      // Log error to console instead of showing toast
      console.error('Failed to fetch products:', error);
    }
  });
  
  const { execute: fetchCategories } = useAsync({
    showErrorToast: false, // Disable error toasts
    showSuccessToast: false, // Disable success toasts
    onError: (error) => {
      // Log error to console instead of showing toast
      console.error('Failed to fetch categories:', error);
    }
  });

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories(async () => {
      const response = await CategoriesAPI.getCategories();
      setCategories(response.data?.categories || []);
      return response.data;
    });
  }, []); // Remove fetchCategories from dependencies to prevent repeat calls

  const sortOptions = [
    { value: 'created_at:desc', label: 'Newest First' },
    { value: 'created_at:asc', label: 'Oldest First' },
    { value: 'name:asc', label: 'Name A-Z' },
    { value: 'name:desc', label: 'Name Z-A' },
    { value: 'price:asc', label: 'Price Low to High' },
    { value: 'price:desc', label: 'Price High to Low' },
  ];

  // Fetch products when filters change
  useEffect(() => {
    const [sortBy, sortOrder] = sortOption.split(':');
    const params = {
      q: searchQuery || undefined,
      category: selectedCategories.length > 0 ? selectedCategories.join(',') : undefined,
      min_price: priceRange[0] > 0 ? priceRange[0] : undefined,
      max_price: priceRange[1] < 1000 ? priceRange[1] : undefined,
      sort_by: sortBy,
      sort_order: sortOrder,
      page: currentPage,
      limit: 12,
    };

    fetchProducts(async () => {
      const response = await ProductsAPI.getProducts(params);
      setProductsData(response.data);
      return response.data;
    });
  }, [searchQuery, selectedCategories, sortOption, priceRange, currentPage]); // Remove fetchProducts from dependencies

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

  const handlePriceRangeChange = (newRange: [number, number]) => {
    setPriceRange(newRange);
    setCurrentPage(1);
    
    const newParams = new URLSearchParams(searchParams);
    if (newRange[0] > 0) {
      newParams.set('min_price', newRange[0].toString());
    } else {
      newParams.delete('min_price');
    }
    if (newRange[1] < 1000) {
      newParams.set('max_price', newRange[1].toString());
    } else {
      newParams.delete('max_price');
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
    const [sortBy, sortOrder] = sortOption.split(':');
    const params = {
      q: searchQuery || undefined,
      category: selectedCategories.length > 0 ? selectedCategories.join(',') : undefined,
      min_price: priceRange[0] > 0 ? priceRange[0] : undefined,
      max_price: priceRange[1] < 1000 ? priceRange[1] : undefined,
      sort_by: sortBy,
      sort_order: sortOrder,
      page: currentPage,
      limit: 12,
    };

    fetchProducts(async () => {
      const response = await ProductsAPI.getProducts(params);
      setProductsData(response.data);
      return response.data;
    });
  };

  // Don't show error UI, just log to console and show skeleton
  const shouldShowSkeleton = loading || (error && !productsData);

  const products = productsData?.data || [];
  const totalProducts = productsData?.total || 0;
  const totalPages = Math.ceil(totalProducts / 12);

  return (
    <motion.div 
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header */}
      <motion.div className="mb-4 sm:mb-6" variants={itemVariants}>
        <Heading level={5} weight="semibold">Products</Heading>
        <Text variant="body-sm" tone="secondary">
          {loading && !productsData ? 'Loading products...' : `${totalProducts} products available`}
        </Text>
      </motion.div>

      {/* Search and Filters */}
      <motion.div className="mb-4 space-y-3" variants={itemVariants}>
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={16} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={cn(
                'w-full pl-8 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600',
                'bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm',
                'placeholder-gray-500 dark:placeholder-gray-400',
                'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary',
                'transition-colors'
              )}
            />
          </div>
          <Button
            type="submit"
            variant="primary"
            size="xs"
            className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded text-sm font-medium transition-colors"
          >
            <Text variant="body-sm">Search</Text>
          </Button>
        </form>

        {/* Filter Toggle and Sort */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <Button
            onClick={() => setShowFilters(!showFilters)}
            variant="outline"
            size="xs"
            className={cn(
              'flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600',
              'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300',
              'hover:border-primary hover:bg-gray-50 dark:hover:bg-gray-700',
              showFilters && 'bg-primary text-white border-primary'
            )}
          >
            <FilterIcon size={14} />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </Button>

          {/* Custom Sort Dropdown */}
          <div className="w-full sm:w-auto sm:min-w-[160px]">
            <Dropdown
              options={sortOptions}
              value={sortOption}
              onChange={setSortOption}
              placeholder="Sort by"
              className="w-full"
            />
          </div>
        </div>

        {/* Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 space-y-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
            {/* Categories */}
            {categories && categories.length > 0 && (
              <div>
                <Heading level={5} weight="medium">Categories</Heading>
                <div className="flex flex-wrap gap-1">
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      onClick={() => handleCategoryChange(category.id)}
                      variant={selectedCategories.includes(category.id) ? "primary" : "ghost"}
                      size="xs"
                      className={cn(
                        'px-3 py-1.5 rounded-full text-sm transition-all duration-200',
                        selectedCategories.includes(category.id)
                          ? 'bg-primary text-white shadow-sm'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      )}
                    >
                      {category.name}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Price Range */}
            <div>
              <Heading level={5} weight="medium">Price Range</Heading>
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <Label weight="medium">Min Price</Label>
                  <input
                    type="number"
                    placeholder="0"
                    value={priceRange[0]}
                    onChange={(e) => handlePriceRangeChange([parseInt(e.target.value) || 0, priceRange[1]])}
                    className={cn(
                      'w-full px-2 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600',
                      'bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm',
                      'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary'
                    )}
                  />
                </div>
                <Text variant="body-sm" tone="secondary">—</Text>
                <div className="flex-1">
                  <Label weight="medium">Max Price</Label>
                  <input
                    type="number"
                    placeholder="1000"
                    value={priceRange[1]}
                    onChange={(e) => handlePriceRangeChange([priceRange[0], parseInt(e.target.value) || 1000])}
                    className={cn(
                      'w-full px-2 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600',
                      'bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm',
                      'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary'
                    )}
                  />
                </div>
              </div>
            </div>

            {/* Clear Filters */}
            <div className="flex items-center justify-between">
              <Button
                onClick={clearFilters}
                variant="ghost"
                size="xs"
                className={cn(
                  'flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg',
                  'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300',
                  'hover:bg-gray-200 dark:hover:bg-gray-600',
                  'transition-colors'
                )}
                leftIcon={<XIcon size={14} />}
              >
                Clear
              </Button>
              <Button
                onClick={() => setShowFilters(false)}
                variant="outline"
                size="xs"
                className="px-3 py-1.5 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <Text variant="body-sm">Done</Text>
              </Button>
            </div>
          </motion.div>
        )}
        </AnimatePresence>
      </motion.div>

      {/* Products Grid - Better responsive layout */}
      <motion.div 
        className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-6"
        variants={containerVariants}
      >
        {shouldShowSkeleton ? (
          // Show skeleton cards while loading or on error
          Array.from({ length: 20 }).map((_, index) => (
            <SkeletonProductCard key={index} />
          ))
        ) : products.length > 0 ? (
          // Show actual products
          products.map((product: any, index: number) => (
            <motion.div key={product.id} variants={itemVariants}>
              <ProductCard 
                product={product} 
                selectedVariant={product.variants?.[0] || product}
                className=""
              />
            </motion.div>
          ))
        ) : (
          // Show empty state - Theme responsive
          <div className="col-span-full text-center py-12 sm:py-16">
            <div className="max-w-md mx-auto">
              <div className={combineThemeClasses(
                themeClasses.background.elevated,
                themeClasses.border.default,
                'w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center border'
              )}>
                <SearchIcon size={24} className={themeClasses.text.muted} />
              </div>
              <Heading level={5} className="text-lg mb-2">No products found</Heading>
              <Text variant="body-sm" tone="secondary" className="mb-4">
                Try adjusting your search or filters to find what you're looking for.
              </Text>
              <Button
                onClick={clearFilters}
                variant="primary"
                size="xs"
                className={combineThemeClasses(
                  getButtonClasses('primary'),
                  'transition-all duration-200 hover:scale-105'
                )}
              >
                Clear filters
              </Button>
            </div>
          </div>
        )}
      </motion.div>

      {/* Pagination - Always show when there are products */}
      {products.length > 0 && (
        <motion.div 
          className="mt-8 sm:mt-12 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Pagination
            currentPage={currentPage}
            totalItems={productsData?.pagination?.total || 0}
            pageSize={productsData?.pagination?.limit || 12}
            onPageChange={setCurrentPage}
            loading={loading}
            size="md"
          />
        </motion.div>
      )}

      {/* Loading indicator for pagination */}
      <AnimatePresence>
        {loading && productsData && (
          <motion.div 
            className="fixed bottom-4 right-4 bg-primary text-white px-4 py-2 rounded-lg shadow-lg z-50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
          <div className="flex items-center gap-2">
            <AnimatedLoader size="sm" variant="spinner" color="primary" centered={false} className="border-white" />
            <Text variant="body-sm" weight="medium">Loading...</Text>
          </div>
        </motion.div>
      )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Products;