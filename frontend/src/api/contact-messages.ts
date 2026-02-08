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
    
    // Handle case where data might be undefined or have unexpected structure
    if (!response.data?.data?.messages) {
      console.error('Unexpected response structure:', response.data);
      return {
        messages: [],
        total: 0,
        page: params?.page || 1,
        page_size: params?.page_size || 20,
        total_pages: 0
      };
    }
    
    return {
      messages: response.data.data.messages,
      total: response.data.pagination?.total || 0,
      page: response.data.pagination?.page || params?.page || 1,
      page_size: response.data.pagination?.page_size || params?.page_size || 20,
      total_pages: response.data.pagination?.total_pages || 0
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
    try {
      const response = await apiClient.get('/contact-messages/stats');
      return response.data.data || { total: 0, new: 0, in_progress: 0, resolved: 0 };
    } catch (error) {
      console.error('Error fetching stats:', error);
      return { total: 0, new: 0, in_progress: 0, resolved: 0 };
    }
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
