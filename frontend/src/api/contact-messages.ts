/**
 * Contact Messages API Client
 */

import apiClient from './client';

export interface ContactMessageCreate {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'new' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  admin_notes?: string;
  assigned_to?: string;
  created_at: string;
  updated_at: string;
  resolved_at?: string;
}

export interface ContactMessageUpdate {
  status?: 'new' | 'in_progress' | 'resolved' | 'closed';
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  admin_notes?: string;
  assigned_to?: string;
}

export interface ContactMessageListResponse {
  messages: ContactMessage[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}

export const ContactMessagesAPI = {
  /**
   * Create a new contact message (public)
   */
  create: async (data: ContactMessageCreate): Promise<ContactMessage> => {
    const response = await apiClient.post('/contact-messages', data);
    return response.data.data;
  },

  /**
   * Get all contact messages (admin only)
   */
  getAll: async (params?: {
    page?: number;
    page_size?: number;
    status?: string;
    priority?: string;
    search?: string;
  }): Promise<ContactMessageListResponse> => {
    const response = await apiClient.get('/contact-messages', { params });
    return {
      messages: response.data.data.messages,
      total: response.data.pagination.total,
      page: response.data.pagination.page,
      page_size: response.data.pagination.page_size,
      total_pages: response.data.pagination.total_pages
    };
  },

  /**
   * Get contact message statistics (admin only)
   */
  getStats: async (): Promise<{
    total: number;
    new: number;
    in_progress: number;
    resolved: number;
  }> => {
    const response = await apiClient.get('/contact-messages/stats');
    return response.data.data;
  },

  /**
   * Get a specific contact message (admin only)
   */
  getById: async (id: string): Promise<ContactMessage> => {
    const response = await apiClient.get(`/contact-messages/${id}`);
    return response.data.data;
  },

  /**
   * Update a contact message (admin only)
   */
  update: async (id: string, data: ContactMessageUpdate): Promise<ContactMessage> => {
    const response = await apiClient.patch(`/contact-messages/${id}`, data);
    return response.data.data;
  },

  /**
   * Delete a contact message (admin only)
   */
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/contact-messages/${id}`);
  },
};

export default ContactMessagesAPI;
