import { apiClient, TokenManager } from './client';


export class PaymentsAPI {
  static async getPaymentMethods() {
    return await apiClient.get('/payments/methods', {});
  }

  static async addPaymentMethod(data: any) {
    return await apiClient.post('/payments/methods', data, {});
  }

  static async updatePaymentMethod(paymentMethodId: string, data: any) {
    return await apiClient.put(`/payments/methods/${paymentMethodId}`, data, {});
  }

  static async deletePaymentMethod(paymentMethodId: string) {
    return await apiClient.delete(`/payments/methods/${paymentMethodId}`, {});
  }

  static async setDefaultPaymentMethod(paymentMethodId: string) {
    return await apiClient.put(`/payments/methods/${paymentMethodId}/default`, {}, {});
  }
}

export default PaymentsAPI;
