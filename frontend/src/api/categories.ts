/**
 * Categories API endpoints
 */

import { apiClient } from './client';

export class CategoriesAPI {
  /**
   * Get all categories
   */
  static async getCategories() {
    return await apiClient.get('/v1/products/categories');
  }

  /**
   * Get category by ID
   */
  static async getCategory(categoryId: string) {
    return await apiClient.get(`/v1/products/categories/${categoryId}`);
  }
}

export default CategoriesAPI;
