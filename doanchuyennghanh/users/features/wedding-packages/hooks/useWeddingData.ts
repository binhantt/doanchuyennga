'use client';

import { useEffect } from 'react';
import { useWeddingStore } from '../store/useWeddingStore';
import { weddingApi } from '../api/weddingApi';

export const useWeddingData = () => {
  const { 
    packages, 
    featuredPackages,
    services, 
    loading, 
    error, 
    setPackages, 
    setFeaturedPackages,
    setServices, 
    setLoading, 
    setError 
  } = useWeddingStore();

  const fetchPackages = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await weddingApi.getPackages();
      setPackages(data);
    } catch (err: any) {
      setError(err.message || 'Lỗi khi tải gói cưới');
    } finally {
      setLoading(false);
    }
  };

  const fetchFeaturedPackages = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await weddingApi.getFeaturedPackages();
      setFeaturedPackages(data);
    } catch (err: any) {
      setError(err.message || 'Lỗi khi tải gói cưới nổi bật');
    } finally {
      setLoading(false);
    }
  };

  const fetchServices = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await weddingApi.getAvailableServices();
      setServices(data);
    } catch (err: any) {
      setError(err.message || 'Lỗi khi tải dịch vụ');
    } finally {
      setLoading(false);
    }
  };

  const fetchServicesByCategory = async (categoryId: number) => {
    try {
      setLoading(true);
      setError(null);
      const data = await weddingApi.getServicesByCategory(categoryId);
      setServices(data);
    } catch (err: any) {
      setError(err.message || 'Lỗi khi tải dịch vụ theo danh mục');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
    fetchServices();
  }, []);

  return {
    packages,
    featuredPackages,
    services,
    loading,
    error,
    refetchPackages: fetchPackages,
    refetchFeaturedPackages: fetchFeaturedPackages,
    refetchServices: fetchServices,
    fetchServicesByCategory,
  };
};