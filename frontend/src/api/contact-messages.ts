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
    
    // The backend returns: { success, data: { messages: [...] }, pagination: {...} }
    // So we need response.data.data.messages
    const responseData = response.data;
    
    // Check if we have the expected structure
    if (responseData?.data?.messages && Array.isArray(responseData.data.messages)) {
      return {
        messages: responseData.data.messages,
        total: responseData.pagination?.total || 0,
        page: responseData.pagination?.page || params?.page || 1,
        page_size: responseData.pagination?.page_size || params?.page_size || 20,
        total_pages: responseData.pagination?.total_pages || 0
      };
    }
    
    // Fallback: if messages are directly in data (shouldn't happen but handle it)
    if (responseData?.messages && Array.isArray(responseData.messages)) {
      console.warn('Unexpected response structure - messages directly in data');
      return {
        messages: responseData.messages,
        total: responseData.total || 0,
        page: responseData.page || params?.page || 1,
        page_size: responseData.page_size || params?.page_size || 20,
        total_pages: responseData.total_pages || 0
      };
    }
    
    // No valid data found
    console.error('Invalid response structure:', responseData);
    return {
      messages: [],
      total: 0,
      page: params?.page || 1,
      page_size: params?.page_size || 20,
      total_pages: 0
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
