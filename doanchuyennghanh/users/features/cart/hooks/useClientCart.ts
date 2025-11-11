import { useEffect, useState } from 'react';
import { useCartStore } from '../store/useCartStore';

// Simple hook that only works on client side
export const useClientCart = () => {
  const [isClient, setIsClient] = useState(false);
  const cartStore = useCartStore();

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Return empty state on server, real state on client
  if (!isClient) {
    return {
      items: [],
      totalItems: 0,
      totalPrice: 0,
      customerInfo: null,
      appliedVoucher: null,
      addItem: () => {},
      removeItem: () => {},
      updateQuantity: () => {},
      clearCart: () => {},
      setCustomerInfo: () => {},
      clearCustomerInfo: () => {},
      applyVoucher: () => {},
      removeVoucher: () => {},
      getItemById: () => undefined,
      hasItem: () => false,
      getDiscountAmount: () => 0,
      getFinalAmount: () => 0,
      isHydrated: false,
    };
  }

  return {
    ...cartStore,
    isHydrated: true,
  };
};