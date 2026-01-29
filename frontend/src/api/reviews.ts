/**
 * Reviews API endpoints
 * 
 * ACCESS LEVELS:
 * - Public: View product reviews and review details
 * - Authenticated: Create, update, delete own reviews
 * - Admin: Moderate all reviews (backend implementation)
 */

import { apiClient } from './client';

class ReviewsAPI {
  /**
   * Create a new review for a product
   * ACCESS: Authenticated - Requires user login
   */
  async createReview(productId, rating, comment) {
    return apiClient.post('/reviews/', { product_id: productId, rating, comment });
  }

  /**
   * Get reviews for a specific product with filtering and pagination
   * ACCESS: Public - No authentication required
   */
  async getProductReviews(productId, page = 1, limit = 10, minRating, maxRating, sortBy) {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('limit', limit.toString());
    if (minRating !== undefined) {
      params.append('min_rating', minRating.toString());
    }
    if (maxRating !== undefined) {
      params.append('max_rating', maxRating.toString());
    }
    if (sortBy) {
      params.append('sort_by', sortBy);
    }
    return apiClient.get(`/reviews/product/${productId}?${params.toString()}`);
  }

  /**
   * Get a specific review by ID
   * ACCESS: Public - No authentication required
   */
  async getReview(reviewId) {
    return apiClient.get(`/reviews/${reviewId}`);
  }

  /**
   * Update an existing review
   * ACCESS: Authenticated - Requires user login and ownership of review
   */
  async updateReview(reviewId, rating, comment) {
    return apiClient.put(`/reviews/${reviewId}`, { rating, comment });
  }

  /**
   * Delete a review
   * ACCESS: Authenticated - Requires user login and ownership of review
   */
  async deleteReview(reviewId) {
    return apiClient.delete(`/reviews/${reviewId}`);
  }
}

export default new ReviewsAPI();