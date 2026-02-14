import apiClient from './client';

export interface Promocode {
  id: string;
  code: string;
  description?: string;
  discount_type: 'percentage' | 'fixed' | 'shipping';
  value: number;
  minimum_order_amount?: number;
  maximum_discount_amount?: number;
  usage_limit?: number;
  used_count: number;
  is_active: boolean;
  valid_from?: string;
  valid_until?: string;
  created_at?: string;
  updated_at?: string;
}

export interface PromocodeCreate {
  code: string;
  description?: string;
  discount_type: 'percentage' | 'fixed' | 'shipping';
  value: number;
  minimum_order_amount?: number;
  maximum_discount_amount?: number;
  usage_limit?: number;
  is_active: boolean;
  valid_from?: string;
  valid_until?: string;
}

export interface PromocodeUpdate {
  code?: string;
  description?: string;
  discount_type?: 'percentage' | 'fixed' | 'shipping';
  value?: number;
  minimum_order_amount?: number;
  maximum_discount_amount?: number;
  usage_limit?: number;
  is_active?: boolean;
  valid_from?: string;
  valid_until?: string;
}

export interface PromocodesResponse {
  promocodes: Promocode[];
  pagination: {
    current_page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

class PromocodesAPI {
  static async getAllPromocodes(page: number = 1, limit: number = 10, is_active?: boolean): Promise<PromocodesResponse> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString()
    });
    
    if (is_active !== undefined) {
      params.append('is_active', is_active.toString());
    }

    const response = await apiClient.get(`/promocodes?${params.toString()}`);
    return response.data;
  }

  static async getPromocodeById(id: string): Promise<Promocode> {
    const response = await apiClient.get(`/promocodes/${id}`);
    return response.data;
  }

  static async createPromocode(promocodeData: PromocodeCreate): Promise<Promocode> {
    const response = await apiClient.post('/promocodes', promocodeData);
    return response.data;
  }

  static async updatePromocode(id: string, promocodeData: PromocodeUpdate): Promise<Promocode> {
    const response = await apiClient.put(`/promocodes/${id}`, promocodeData);
    return response.data;
  }

  static async deletePromocode(id: string): Promise<void> {
    await apiClient.delete(`/promocodes/${id}`);
  }

  static async applyPromocode(code: string): Promise<any> {
    const response = await apiClient.post('/cart/promocode', { code });
    return response.data;
  }

  static async removePromocode(): Promise<any> {
    const response = await apiClient.delete('/cart/promocode');
    return response.data;
  }
}

export default PromocodesAPI;
