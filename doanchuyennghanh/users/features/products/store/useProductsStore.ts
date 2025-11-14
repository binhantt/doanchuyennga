import { create } from 'zustand';
import { Product } from '../types';

interface ProductsStore {
  products: Product[];
  loading: boolean;
  error: string | null;
  
  // Actions
  setProducts: (products: Product[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  // Filters
  getAvailableProducts: () => Product[];
  getProductsByCategory: (categoryId: number) => Product[];
  searchProducts: (query: string) => Product[];
}

export const useProductsStore = create<ProductsStore>((set, get) => ({
  products: [],
  loading: false,
  error: null,

  setProducts: (products) => set({ products }),
  
  setLoading: (loading) => set({ loading }),
  
  setError: (error) => set({ error }),
  
  getAvailableProducts: () => {
    return get().products.filter(product => Boolean(product.is_available));
  },
  
  getProductsByCategory: (categoryId) => {
    return get().products.filter(product => 
      product.category_id === categoryId && Boolean(product.is_available)
    );
  },
  
  searchProducts: (query) => {
    const searchTerm = query.toLowerCase();
    return get().products.filter(product =>
      Boolean(product.is_available) && (
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
      )
    );
  },
}));