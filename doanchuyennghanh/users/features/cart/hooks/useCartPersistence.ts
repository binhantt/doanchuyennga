import { useEffect, useState } from 'react';
import { useCartStore } from '../store/useCartStore';

export const useCartPersistence = () => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Check if we're on the client side
    if (typeof window !== 'undefined') {
      // Set hydrated to true after a short delay to ensure store is ready
      const timer = setTimeout(() => {
        setIsHydrated(true);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, []);

  return isHydrated;
};

// Hook to get cart data only after hydration
export const useHydratedCartStore = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const cartStore = useCartStore();

  useEffect(() => {
    // Simple client-side check
    if (typeof window !== 'undefined') {
      setIsHydrated(true);
    }
  }, []);

  return {
    ...cartStore,
    isHydrated,
  };
};