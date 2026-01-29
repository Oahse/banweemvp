/**
 * Products API endpoints
 * 
 * ACCESS LEVELS:
 * - Public: Product listings, search, categories, variants, recommendations
 * - Authenticated: Product reviews, availability checks
 * - Supplier/Admin: Product management, inventory updates, image uploads
 * - Admin Only: Product moderation, featured product management
 */

import { apiClient } from './client';

export class ProductsAPI {
  /**
   * Get all products with optional filters
   * ACCESS: Public - No authentication required
   */
  static async getProducts(params: any) {
    const queryParams = new URLSearchParams();
    
    if (params?.q) queryParams.append('q', params.q);
    if (params?.category) queryParams.append('category', params.category);
    if (params?.min_price) queryParams.append('min_price', params.min_price.toString());
    if (params?.max_price) queryParams.append('max_price', params.max_price.toString());
    if (params?.min_rating) queryParams.append('min_rating', params.min_rating.toString());
    if (params?.max_rating) queryParams.append('max_rating', params.max_rating.toString());
    if (params?.availability !== undefined) queryParams.append('availability', params.availability.toString());
    if (params?.sort_by) queryParams.append('sort_by', params.sort_by);
    if (params?.sort_order) queryParams.append('sort_order', params.sort_order);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const url = `/products${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return await apiClient.get(url);
  }

  /**
   * Get product by ID
   * ACCESS: Public - No authentication required
   */
  static async getProduct(productId: string) {
    return await apiClient.get(`/products/${productId}`);
  }

  /**
   * Search products (advanced search with fuzzy matching)
   * ACCESS: Public - No authentication required
   */
  static async searchProducts(query: string, filters: any) {
    // Ensure query is provided and not empty
    if (!query || query.trim().length < 2) {
      return { data: { products: [], count: 0 } };
    }

    const params = new URLSearchParams({ q: query.trim() });
    
    if (filters?.category_id) params.append('category_id', filters.category_id);
    if (filters?.min_price !== undefined) params.append('min_price', filters.min_price.toString());
    if (filters?.max_price !== undefined) params.append('max_price', filters.max_price.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());

    return await apiClient.get(`/products/search?${params.toString()}`);
  }

  /**
   * Search categories (advanced search with fuzzy matching)
   * ACCESS: Public - No authentication required
   */
  static async searchCategories(query: string, limit = 20) {
    const params = new URLSearchParams({
      q: query,
      limit: limit.toString()
    });
    
    return await apiClient.get(`/products/categories/search?${params.toString()}`);
  }

  /**
   * Get all home page data in one request
   * ACCESS: Public - No authentication required
   */
  static async getHomeData() {
    return await apiClient.get('/products/home');
  }

  /**
   * Get product variants
   * ACCESS: Public - No authentication required
   */
  static async getProductVariants(productId: string) {
    return await apiClient.get(`/products/${productId}/variants`);
  }

  /**
   * Get variant by ID
   * ACCESS: Public - No authentication required
   */
  static async getVariant(variantId: string) {
    return await apiClient.get(`/products/variants/${variantId}`);
  }

  /**
   * Get variant QR code
   * ACCESS: Public - No authentication required
   */
  static async getVariantQRCode(variantId) {
    return await apiClient.get(`/products/variants/${variantId}/qrcode`);
  }

  /**
   * Get variant barcode
   * ACCESS: Public - No authentication required
   */
  static async getVariantBarcode(variantId) {
    return await apiClient.get(`/products/variants/${variantId}/barcode`);
  }

  /**
   * Generate barcode and QR code for variant
   * ACCESS: Supplier/Admin - Requires supplier or admin role
   */
  static async generateVariantCodes(variantId) {
    return await apiClient.post(`/products/variants/${variantId}/codes/generate`);
  }

  /**
   * Update barcode and/or QR code for variant
   * ACCESS: Supplier/Admin - Requires supplier or admin role
   */
  static async updateVariantCodes(variantId, codes) {
    return await apiClient.put(`/products/variants/${variantId}/codes`, codes);
  }

  /**
   * Get featured products
   * ACCESS: Public - No authentication required
   */
  static async getFeaturedProducts(limit = 10) {
    return await apiClient.get(`/products/featured?limit=${limit}`);
  }
  
  /**
   * Get popular products
   * ACCESS: Public - No authentication required
   */
  static async getPopularProducts(limit = 10) {
    return await apiClient.get(`/products/popular?limit=${limit}`);
  }

  /**
   * Get recommended products
   * ACCESS: Public - No authentication required
   */
  static async getRecommendedProducts(productId, limit = 10) {
    // If no productId provided, return empty results
    if (!productId) {
      return { data: [] };
    }

    const url = `/products/${productId}/recommendations?limit=${limit}`;
    return await apiClient.get(url);
  }

  /**
   * Get product reviews
   * ACCESS: Public - No authentication required
   */
  static async getProductReviews(productId, page = 1, limit = 10) {
    return await apiClient.get(`/reviews/product/${productId}?page=${page}&limit=${limit}`);
  }

  /**
   * Add product review
   * ACCESS: Authenticated - Requires user login
   */
  static async addProductReview(productId, review) {
    return await apiClient.post(`/reviews`, { ...review, product_id: productId });
  }

  /**
   * Get product availability
   * ACCESS: Public - No authentication required
   */
  static async checkAvailability(variantId, quantity = 1) {
    return await apiClient.get(`/inventory/check-stock/${variantId}?quantity=${quantity}`);
  }

  // Supplier/Admin endpoints
  /**
   * Create new product
   * ACCESS: Supplier/Admin - Requires supplier or admin role
   */
  static async createProduct(product) {
    return await apiClient.post('/products', product);
  }

  /**
   * Update product
   * ACCESS: Supplier/Admin - Requires supplier or admin role
   */
  static async updateProduct(productId, updates) {
    return await apiClient.put(`/products/${productId}`, updates);
  }

  /**
   * Delete product
   * ACCESS: Supplier/Admin - Requires supplier or admin role
   */
  static async deleteProduct(productId) {
    return await apiClient.delete(`/products/${productId}`);
  }

  /**
   * Create product variant
   * ACCESS: Supplier/Admin - Requires supplier or admin role
   */
  static async createVariant(productId, variant) {
    return await apiClient.post(`/products/${productId}/variants`, variant);
  }

  /**
   * Update product variant
   * ACCESS: Supplier/Admin - Requires supplier or admin role
   */
  static async updateVariant(variantId, updates) {
    return await apiClient.put(`/products/variants/${variantId}`, updates);
  }

  /**
   * Delete product variant
   * ACCESS: Supplier/Admin - Requires supplier or admin role
   */
  static async deleteVariant(variantId) {
    return await apiClient.delete(`/products/variants/${variantId}`);
  }

  /**
   * Upload product images
   * ACCESS: Supplier/Admin - Requires supplier or admin role
   */
  static async uploadProductImage(
    variantId, 
    file, 
    isPrimary = false,
    onProgress
  ) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('is_primary', isPrimary.toString());

    return await apiClient.upload(`/products/variants/${variantId}/images`, file, onProgress);
  }

  /**
   * Delete product image
   * ACCESS: Supplier/Admin - Requires supplier or admin role
   */
  static async deleteProductImage(imageId) {
    return await apiClient.delete(`/products/images/${imageId}`);
  }

  /**
   * Update inventory
   * ACCESS: Supplier/Admin - Requires supplier or admin role
   */
  static async updateInventory(variantId, stock) {
    return await apiClient.put(`/products/variants/${variantId}/inventory`, { stock });
  }

  /**
   * Get supplier products
   * ACCESS: Supplier - Requires supplier role (own products only)
   */
  static async getSupplierProducts(params) {
    const queryParams = new URLSearchParams();
    
    if (params?.q) queryParams.append('q', params.q);
    if (params?.category) queryParams.append('category', params.category);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const url = `/suppliers/products${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return await apiClient.get(url);
  }
}

export default ProductsAPI;