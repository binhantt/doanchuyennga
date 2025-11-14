import axios from 'axios';
import { OrderRequest, OrderResponse } from '../types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const cartApi = {
  // Create order
  createOrder: async (orderData: OrderRequest): Promise<OrderResponse> => {
    const response = await api.post('/api/users/orders', orderData);
    return response.data;
  },

  // Get order by ID
  getOrder: async (orderId: number): Promise<OrderResponse> => {
    const response = await api.get(`/api/users/orders/${orderId}`);
    return response.data;
  },
};