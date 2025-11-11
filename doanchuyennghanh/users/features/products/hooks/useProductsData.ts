'use client';

import { useEffect } from 'react';
import { useProductsStore } from '../store/useProductsStore';
import { productsApi } from '../api/productsApi';

export const useProductsData = () => {
  const { 
    products, 
    loading, 
    error, 
    setProducts, 
    setLoading, 
    setError,
    getAvailableProducts,
    searchProducts
  } = useProductsStore();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await productsApi.getProducts();
      setProducts(data);
    } catch (err: any) {
      setError(err.message || 'Lỗi khi tải sản phẩm');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    availableProducts: getAvailableProducts(),
    loading,
    error,
    refetchProducts: fetchProducts,
    searchProducts,
  };
};