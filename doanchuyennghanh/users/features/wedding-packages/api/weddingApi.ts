import axios from 'axios';
import { WeddingPackage, Service } from '../types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const weddingApi = {
  // Wedding Packages
  getPackages: async (): Promise<WeddingPackage[]> => {
    const response = await api.get('/api/users/wedding-packages');
    return response.data.data;
  },

  getFeaturedPackages: async (): Promise<WeddingPackage[]> => {
    const response = await api.get('/api/users/wedding-packages/featured');
    return response.data.data;
  },

  // Services
  getServices: async (): Promise<Service[]> => {
    const response = await api.get('/api/users/services');
    return response.data.data;
  },

  getAvailableServices: async (): Promise<Service[]> => {
    const response = await api.get('/api/users/services/available');
    return response.data.data;
  },

  getServicesByCategory: async (categoryId: number): Promise<Service[]> => {
    const response = await api.get(`/api/services/category/${categoryId}`);
    return response.data.data;
  },
};