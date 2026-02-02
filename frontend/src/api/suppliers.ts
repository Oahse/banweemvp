/**
 * Suppliers API endpoints
 * 
 * ACCESS LEVELS:
 * - Public: Supplier listings, supplier profiles, supplier products
 * - Authenticated: Contact supplier, review supplier
 * - Supplier/Admin: Manage supplier profile, products
 */

import { apiClient } from './client';

export class SuppliersAPI {
  /**
   * Get all public suppliers with optional filters
   * ACCESS: Public - No authentication required
   */
  static async getPublicSuppliers(params?: any) {
    const queryParams = new URLSearchParams();
    
    if (params?.search) queryParams.append('search', params.search);
    if (params?.category) queryParams.append('category', params.category);
    if (params?.sort_by) queryParams.append('sort_by', params.sort_by);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const url = `/suppliers/public${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return await apiClient.get(url);
  }

  /**
   * Get supplier by ID
   * ACCESS: Public - No authentication required
   */
  static async getSupplierById(supplierId: string) {
    return await apiClient.get(`/suppliers/public/${supplierId}`);
  }

  /**
   * Get supplier's products
   * ACCESS: Public - No authentication required
   */
  static async getSupplierProducts(supplierId: string, params?: any) {
    const queryParams = new URLSearchParams();
    
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.category) queryParams.append('category', params.category);
    if (params?.sort_by) queryParams.append('sort_by', params.sort_by);

    const url = `/suppliers/public/${supplierId}/products${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return await apiClient.get(url);
  }

  /**
   * Search suppliers
   * ACCESS: Public - No authentication required
   */
  static async searchSuppliers(query: string, params?: any) {
    if (!query || query.trim().length < 2) {
      return { data: { suppliers: [], count: 0 } };
    }

    const queryParams = new URLSearchParams({ q: query.trim() });
    
    if (params?.category) queryParams.append('category', params.category);
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    return await apiClient.get(`/suppliers/public/search?${queryParams.toString()}`);
  }

  /**
   * Get supplier categories
   * ACCESS: Public - No authentication required
   */
  static async getSupplierCategories() {
    return await apiClient.get('/suppliers/public/categories');
  }

  // Supplier/Admin endpoints (require authentication)

  /**
   * Get current supplier's profile
   * ACCESS: Supplier - Requires supplier authentication
   */
  static async getMyProfile() {
    return await apiClient.get('/suppliers/profile');
  }

  /**
   * Update supplier profile
   * ACCESS: Supplier - Requires supplier authentication
   */
  static async updateProfile(updates: any) {
    return await apiClient.put('/suppliers/profile', updates);
  }

  /**
   * Upload supplier avatar
   * ACCESS: Supplier - Requires supplier authentication
   */
  static async uploadAvatar(file: File, onProgress?: (progress: number) => void) {
    return await apiClient.upload('/suppliers/profile/avatar', file, onProgress);
  }

  /**
   * Get supplier's products (authenticated)
   * ACCESS: Supplier - Requires supplier authentication
   */
  static async getMyProducts(params?: any) {
    const queryParams = new URLSearchParams();
    
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.status) queryParams.append('status', params.status);

    const url = `/suppliers/products${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return await apiClient.get(url);
  }

  /**
   * Create new product
   * ACCESS: Supplier - Requires supplier authentication
   */
  static async createProduct(product: any) {
    return await apiClient.post('/suppliers/products', product);
  }

  /**
   * Update product
   * ACCESS: Supplier - Requires supplier authentication
   */
  static async updateProduct(productId: string, updates: any) {
    return await apiClient.put(`/suppliers/products/${productId}`, updates);
  }

  /**
   * Delete product
   * ACCESS: Supplier - Requires supplier authentication
   */
  static async deleteProduct(productId: string) {
    return await apiClient.delete(`/suppliers/products/${productId}`);
  }

  /**
   * Get supplier analytics
   * ACCESS: Supplier - Requires supplier authentication
   */
  static async getAnalytics(params?: any) {
    const queryParams = new URLSearchParams();
    
    if (params?.start_date) queryParams.append('start_date', params.start_date);
    if (params?.end_date) queryParams.append('end_date', params.end_date);
    if (params?.period) queryParams.append('period', params.period);

    const url = `/suppliers/analytics${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return await apiClient.get(url);
  }

  /**
   * Get supplier reviews
   * ACCESS: Public - No authentication required
   */
  static async getSupplierReviews(supplierId: string, params?: any) {
    const queryParams = new URLSearchParams();
    
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.rating) queryParams.append('rating', params.rating.toString());

    const url = `/suppliers/public/${supplierId}/reviews${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return await apiClient.get(url);
  }

  /**
   * Add supplier review
   * ACCESS: Authenticated - Requires user login
   */
  static async addSupplierReview(supplierId: string, review: any) {
    return await apiClient.post(`/suppliers/${supplierId}/reviews`, review);
  }

  /**
   * Contact supplier
   * ACCESS: Authenticated - Requires user login
   */
  static async contactSupplier(supplierId: string, message: any) {
    return await apiClient.post(`/suppliers/${supplierId}/contact`, message);
  }
}

export default SuppliersAPI;
