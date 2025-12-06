/**
 * Admin API endpoints
 */

import { apiClient } from './client';
import { SystemSetting, SystemSettingUpdate, BlogPostResponse, BlogCategoryResponse, BlogTagResponse, CommentResponse, PaginatedResponse } from '../types'; // Added Blog types and PaginatedResponse


export class AdminAPI {
  /**
   * Get admin dashboard statistics
   */
  static async getAdminStats() {
    return await apiClient.get('/admin/stats');
  }

  /**
   * Get platform overview
   */
  static async getPlatformOverview() {
    return await apiClient.get('/admin/overview');
  }

  // User Management
  /**
   * Get all users with filters
   */
  static async getUsers(params: {
    page?: number;
    limit?: number;
    role?: string;
    search?: string;
    status?: string;
    verified?: boolean;
  }) {
    const queryParams = new URLSearchParams();
    
    if (params?.role) queryParams.append('role', params.role);
    if (params?.status) queryParams.append('status', params.status);
    if (params?.verified !== undefined) queryParams.append('verified', params.verified.toString());
    if (params?.search) queryParams.append('search', params.search);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const url = `/admin/users${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return await apiClient.get(url);
  }

  /**
   * Get user details
   */
  static async getUser(userId: string) {
        return await apiClient.get(`/admin/users/${userId}`);  }

  /**
   * Update user
   */
  static async updateUser(userId: string, updates: any) { // Adjust type later
    return await apiClient.put(`/admin/users/${userId}`, updates);
  }

  /**
   * Activate/Deactivate user
   */
  static async toggleUserStatus(userId: string, active: boolean) {
    return await apiClient.put(`/admin/users/${userId}/status`, { active });
  }

  /**
   * Verify user
   */
  static async verifyUser(userId: string) {
    return await apiClient.put(`/admin/users/${userId}/verify`);
  }

  /**
   * Delete user
   */
  static async deleteUser(userId: string) {
    return await apiClient.delete(`/admin/users/${userId}`);
  }

  /**
   * Get user activity log
   */
  static async getUserActivity(userId: string, params: { page?: number; limit?: number }) {
    const queryParams = new URLSearchParams();
    
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const url = `/admin/users/${userId}/activity${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return await apiClient.get(url);
  }

  /**
   * Create a new user (admin only)
   */
  static async createUser(userData: any) { // Adjust type later
    return await apiClient.post('/admin/users', userData);
  }

  // Product Management
  /**
   * Get all products for admin review
   */
  static async getAllProducts(params: {
    status?: string;
    category?: string;
    supplier?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) {
    const queryParams = new URLSearchParams();
    
    if (params?.status) queryParams.append('status', params.status);
    if (params?.category) queryParams.append('category', params.category);
    if (params?.supplier) queryParams.append('supplier', params.supplier);
    if (params?.search) queryParams.append('search', params.search);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const url = `/admin/products${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return await apiClient.get(url);
  }

  /**
   * Approve/Reject product
   */
  static async moderateProduct(productId: string, action: string, reason: string) {
    return await apiClient.put(`/admin/products/${productId}/moderate`, { action, reason });
  }

  /**
   * Feature/Unfeature product
   */
  static async toggleProductFeature(productId: string, featured: boolean) {
    return await apiClient.put(`/admin/products/${productId}/feature`, { featured });
  }

  // Order Management
  /**
   * Get all orders for admin oversight
   */
  static async getAllOrders(params: {
    status?: string;
    q?: string;
    supplier?: string;
    customer?: string;
    date_from?: string;
    date_to?: string;
    min_price?: number;
    max_price?: number;
    page?: number;
    limit?: number;
  }) {
    const queryParams = new URLSearchParams();
    
    if (params?.status) queryParams.append('status', params.status);
    if (params?.q) queryParams.append('q', params.q);
    if (params?.supplier) queryParams.append('supplier', params.supplier);
    if (params?.customer) queryParams.append('customer', params.customer);
    if (params?.date_from) queryParams.append('date_from', params.date_from);
    if (params?.date_to) queryParams.append('date_to', params.date_to);
    if (params?.min_price) queryParams.append('min_price', params.min_price.toString());
    if (params?.max_price) queryParams.append('max_price', params.max_price.toString());
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const url = `/admin/orders${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return await apiClient.get(url);
  }

  /**
   * Get all product variants for admin oversight
   */
  static async getAllVariants(params: {
    product_id?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) {
    const queryParams = new URLSearchParams();
    
    if (params?.product_id) queryParams.append('product_id', params.product_id);
    if (params?.search) queryParams.append('search', params.search);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const url = `/admin/variants${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return await apiClient.get(url);
  }

  /**
   * Get order details
   */
  static async getOrder(orderId: string) {
    return await apiClient.get(`/admin/orders/${orderId}`);
  }

  /**
   * Update order status
   */
  static async updateOrderStatus(orderId: string, status: string) {
    return await apiClient.put(`/admin/orders/${orderId}/status`, { status });
  }

  /**
   * Get order invoice (admin)
   */
  static async getOrderInvoice(orderId: string) {
    await apiClient.download(`/admin/orders/${orderId}/invoice`, `invoice-${orderId}.pdf`);
  }  /**
   * Get order disputes
   */
  static async getOrderDisputes(params: {
    status?: string;
    page?: number;
    limit?: number;
  }) {
    const queryParams = new URLSearchParams();
    
    if (params?.status) queryParams.append('status', params.status);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const url = `/admin/disputes${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return await apiClient.get(url);
  }



  /**
   * Resolve order dispute
   */
  static async resolveDispute(disputeId: string, resolution: any) { // Adjust type later
    return await apiClient.put(`/admin/disputes/${disputeId}/resolve`, resolution);
  }

  // System Management
  static async getSalesTrend(days: number) {
    return await apiClient.get(`/analytics/sales-trend?days=${days}`);
  }

  /**
   * Get system health
   */
  static async getSystemHealth() {
    return await apiClient.get('/admin/system/health');
  }

  /**
   * Get system logs
   */
  static async getSystemLogs(params: {
    level?: string;
    service?: string;
    date_from?: string;
    date_to?: string;
    page?: number;
    limit?: number;
  }) {
    const queryParams = new URLSearchParams();
    
    if (params?.level) queryParams.append('level', params.level);
    if (params?.service) queryParams.append('service', params.service);
    if (params?.date_from) queryParams.append('date_from', params.date_from);
    if (params?.date_to) queryParams.append('date_to', params.date_to);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const url = `/admin/system/logs${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return await apiClient.get(url);
  }

  /**
   * Get audit logs
   */
  static async getAuditLogs(params: {
    user_id?: string;
    action?: string;
    resource?: string;
    date_from?: string;
    date_to?: string;
    page?: number;
    limit?: number;
  }) {
    const queryParams = new URLSearchParams();
    
    if (params?.user_id) queryParams.append('user_id', params.user_id);
    if (params?.action) queryParams.append('action', params.action);
    if (params?.resource) queryParams.append('resource', params.resource);
    if (params?.date_from) queryParams.append('date_from', params.date_from);
    if (params?.date_to) queryParams.append('date_to', params.date_to);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const url = `/admin/audit-logs${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return await apiClient.get(url);
  }

  /**
   * Update system settings
   */
  static async updateSystemSettings(settings: SystemSettingUpdate[]) {
    return await apiClient.put<SystemSetting[]>('/admin/system/settings', settings);
  }

  /**
   * Get system settings
   */
  static async getSystemSettings() {
    return await apiClient.get<SystemSetting[]>('/admin/system/settings');
  }

  /**
   * Export data
   */
  static async exportData(data: {
    type: string;
    format: string;
    filters?: Record<string, any>;
  }) {
    const queryParams = new URLSearchParams();
    
    queryParams.append('type', data.type);
    queryParams.append('format', data.format);
    
    if (data.filters) {
      Object.entries(data.filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });
    }

    const url = `/admin/export?${queryParams.toString()}`;
    const filename = `${data.type}-export-${new Date().toISOString().split('T')[0]}.${data.format}`;
    
    await apiClient.download(url, filename);
  }

  /**
   * Send system notification
   */
  static async sendSystemNotification(notification: any) { // Adjust type later
    return await apiClient.post('/admin/notifications/send', notification);
  }

  /**
   * Reset user password (admin action)
   */
  static async resetUserPassword(userId: string) {
    return await apiClient.post(`/admin/users/${userId}/reset-password`);
  }

  /**
   * Deactivate user account (admin action)
   */
  static async deactivateUser(userId: string) {
    return await apiClient.post(`/admin/users/${userId}/deactivate`);
  }

  /**
   * Activate user account (admin action)
   */
  static async activateUser(userId: string) {
    return await apiClient.post(`/admin/users/${userId}/activate`);
  }

  // Blog Management
  /**
   * Get all blog posts
   */
  static async getBlogPosts(params?: {
    page?: number;
    limit?: number;
    search?: string;
    is_published?: boolean;
    category_slug?: string;
    tag_slug?: string;
  }) {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.search) queryParams.append('search', params.search);
    if (params?.is_published !== undefined) queryParams.append('is_published', params.is_published.toString());
    if (params?.category_slug) queryParams.append('category_slug', params.category_slug);
    if (params?.tag_slug) queryParams.append('tag_slug', params.tag_slug);
    
    const url = `/blog/posts${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return await apiClient.get<PaginatedResponse<BlogPostResponse>>(url); // Explicitly type the response
  }

  /**
   * Get a blog post by slug
   */
  static async getBlogPostBySlug(slug: string) {
    return await apiClient.get<BlogPostResponse>(`/blog/posts/${slug}`); // Explicitly type the response
  }

  /**
   * Create a new blog post
   */
  static async createBlogPost(postData: any) { // Adjust type later
    return await apiClient.post<BlogPostResponse>('/blog/posts', postData); // Explicitly type the response
  }

  /**
   * Update a blog post
   */
  static async updateBlogPost(postId: string, postData: any) { // Adjust type later
    return await apiClient.put<BlogPostResponse>(`/blog/posts/${postId}`, postData); // Explicitly type the response
  }

  /**
   * Delete a blog post
   */
  static async deleteBlogPost(postId: string) {
    return await apiClient.delete(`/blog/posts/${postId}`);
  }

  /**
   * Get all blog categories
   */
  static async getBlogCategories() {
    return await apiClient.get<BlogCategoryResponse[]>('/blog/categories'); // Explicitly type the response
  }

  /**
   * Get a blog category by slug
   */
  static async getBlogCategoryBySlug(slug: string) {
    return await apiClient.get<BlogCategoryResponse>(`/blog/categories/${slug}`); // Explicitly type the response
  }

  /**
   * Create a new blog category
   */
  static async createBlogCategory(categoryData: any) { // Adjust type later
    return await apiClient.post<BlogCategoryResponse>('/blog/categories', categoryData); // Explicitly type the response
  }

  /**
   * Update a blog category
   */
  static async updateBlogCategory(categoryId: string, categoryData: any) { // Adjust type later
    return await apiClient.put<BlogCategoryResponse>(`/blog/categories/${categoryId}`, categoryData); // Explicitly type the response
  }

  /**
   * Delete a blog category
   */
  static async deleteBlogCategory(categoryId: string) {
    return await apiClient.delete(`/blog/categories/${categoryId}`);
  }

  /**
   * Get all blog tags
   */
  static async getBlogTags() {
    return await apiClient.get<BlogTagResponse[]>('/blog/tags'); // Explicitly type the response
  }

  /**
   * Get a blog tag by slug
   */
  static async getBlogTagBySlug(slug: string) {
    return await apiClient.get<BlogTagResponse>(`/blog/tags/${slug}`); // Explicitly type the response
  }

  /**
   * Create a new blog tag
   */
  static async createBlogTag(tagData: any) { // Adjust type later
    return await apiClient.post<BlogTagResponse>('/blog/tags', tagData); // Explicitly type the response
  }

  /**
   * Update a blog tag
   */
  static async updateBlogTag(tagId: string, tagData: any) { // Adjust type later
    return await apiClient.put<BlogTagResponse>(`/blog/tags/${tagId}`, tagData); // Explicitly type the response
  }

  /**
   * Delete a blog tag
   */
  static async deleteBlogTag(tagId: string) {
    return await apiClient.delete(`/blog/tags/${tagId}`);
  }

  /**
   * Get comments for a blog post
   */
  static async getCommentsForPost(postId: string) {
    return await apiClient.get<CommentResponse[]>(`/blog/posts/${postId}/comments`); // Explicitly type the response
  }
  
  /**
   * Get all comments (Admin only)
   */
  static async getAllComments(params?: {
    page?: number;
    limit?: number;
    is_approved?: boolean;
    post_id?: string;
  }) {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.is_approved !== undefined) queryParams.append('is_approved', params.is_approved.toString());
    if (params?.post_id) queryParams.append('post_id', params.post_id);

    const url = `/admin/blog/comments${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return await apiClient.get<PaginatedResponse<CommentResponse>>(url);
  }


  /**
   * Create a comment on a blog post
   */
  static async createComment(postId: string, commentData: any) { // Adjust type later
    return await apiClient.post<CommentResponse>(`/blog/posts/${postId}/comments`, commentData); // Explicitly type the response
  }

  /**
   * Update a comment
   */
  static async updateComment(commentId: string, commentData: any) { // Adjust type later
    return await apiClient.put<CommentResponse>(`/blog/comments/${commentId}`, commentData); // Explicitly type the response
  }

  /**
   * Delete a comment
   */
  static async deleteComment(commentId: string) {
    return await apiClient.delete(`/blog/comments/${commentId}`);
  }
}

export default AdminAPI;
