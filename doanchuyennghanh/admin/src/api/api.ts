import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api/v1";

// Tạo axios instance với config mặc định
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Có thể thêm auth token ở đây
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export interface Category {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category_id: string;
  category_name?: string;
  is_available: boolean;
  status: 'published' | 'draft';
  createdAt?: string;
  updatedAt?: string;
}

export class Api {
  // Categories API
  getCategories = async (): Promise<Category[]> => {
    const res = await apiClient.get("/admin/categories");
    return res.data?.data || [];
  };

  getCategoryById = async (id: string): Promise<Category | null> => {
    const res = await apiClient.get(`/admin/categories/${id}`);
    return res.data?.data || null;
  };

  createCategory = async (category: Partial<Category>): Promise<Category> => {
    const res = await apiClient.post("/admin/categories", category);
    return res.data?.data;
  };

  updateCategory = async (id: string, category: Partial<Category>): Promise<Category> => {
    const res = await apiClient.put(`/admin/categories/${id}`, category);
    return res.data?.data;
  };

  deleteCategory = async (id: string): Promise<void> => {
    await apiClient.delete(`/admin/categories/${id}`);
  };

  // Products API
  getProducts = async (): Promise<Product[]> => {
    const res = await apiClient.get("/admin/products");
    return res.data?.data || [];
  };

  getProductById = async (id: string): Promise<Product | null> => {
    const res = await apiClient.get(`/admin/products/${id}`);
    return res.data?.data || null;
  };

  createProduct = async (product: Partial<Product>): Promise<Product> => {
    const res = await apiClient.post("/admin/products", product);
    return res.data?.data;
  };

  updateProduct = async (id: string, product: Partial<Product>): Promise<Product> => {
    const res = await apiClient.put(`/admin/products/${id}`, product);
    return res.data?.data;
  };

  deleteProduct = async (id: string): Promise<void> => {
    await apiClient.delete(`/admin/products/${id}`);
  };

  // Upload API
  uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('image', file);
    const res = await apiClient.post("/admin/upload", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data?.data?.url || res.data?.url;
  };
}

// Export singleton instance
export const api = new Api();