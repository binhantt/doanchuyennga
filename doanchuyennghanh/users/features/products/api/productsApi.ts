import axios from 'axios';
import { Product } from '../types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const productsApi = {
  // Get all products (dishes)
  getProducts: async (): Promise<Product[]> => {
    const response = await api.get('/api/users/dishes');
    return response.data.data;
  },
};