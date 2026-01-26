import React from 'react';
import { usePolling } from '../hooks/usePolling';
import { ProductsAPI } from '../apis/products';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';
import Error from '../components/Error';

const Products = () => {
  const fetchProducts = async () => {
    const response = await ProductsAPI.getProducts({ page: 1, limit: 20 });
    return response.data;
  };

  const { data: products, loading, error, refresh } = usePolling(fetchProducts, {
    interval: 30000, // Poll every 30 seconds for price updates
  });

  if (loading && !products) {
    return <Loading text="Loading products..." />;
  }

  if (error && !products) {
    return <Error message="Failed to load products" onRetry={refresh} />;
  }

  const items = products?.items || [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-4 sm:py-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Products
        </h1>
        <p className="text-gray-600">
          {items.length} products available
        </p>
      </div>

      {/* Products Grid */}
      {items.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600">No products found</p>
        </div>
      )}

      {/* Loading indicator for polling */}
      {loading && products && (
        <div className="fixed bottom-4 right-4 bg-blue-600 text-white px-3 py-2 rounded-lg shadow-lg">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm">Updating prices...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;