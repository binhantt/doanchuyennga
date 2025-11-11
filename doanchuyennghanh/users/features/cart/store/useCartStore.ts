import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Cart, CustomerInfo } from '../types';

interface CartStore extends Cart {
  // Customer info
  customerInfo: CustomerInfo | null;
  
  // Voucher
  appliedVoucher: {
    code: string;
    discount_amount: number;
    discount_type: 'percent' | 'amount';
    description: string;
  } | null;
  
  // Actions
  addItem: (item: Omit<CartItem, 'id' | 'quantity'>) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  setCustomerInfo: (info: CustomerInfo) => void;
  clearCustomerInfo: () => void;
  applyVoucher: (voucher: { code: string; discount_amount: number; discount_type: 'percent' | 'amount'; description: string }) => void;
  removeVoucher: () => void;
  
  // Computed
  getItemById: (itemId: string) => CartItem | undefined;
  hasItem: (type: string, itemId: number) => boolean;
  getDiscountAmount: () => number;
  getFinalAmount: () => number;
}

// Helper function to calculate totals
const calculateTotals = (items: CartItem[]) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  return { totalItems, totalPrice };
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,
      customerInfo: null,
      appliedVoucher: null,

      addItem: (newItem) => {
        const items = get().items;
        const existingItemIndex = items.findIndex(
          item => item.type === newItem.type && item.itemId === newItem.itemId
        );

        let updatedItems: CartItem[];
        
        if (existingItemIndex >= 0) {
          // Update quantity if item exists
          updatedItems = items.map((item, index) =>
            index === existingItemIndex
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          // Add new item
          const cartItem: CartItem = {
            ...newItem,
            id: `${newItem.type}-${newItem.itemId}-${Date.now()}`,
            quantity: 1,
          };
          updatedItems = [...items, cartItem];
        }

        const { totalItems, totalPrice } = calculateTotals(updatedItems);

        set({
          items: updatedItems,
          totalItems,
          totalPrice,
        });
      },

      removeItem: (itemId) => {
        const items = get().items;
        const updatedItems = items.filter(item => item.id !== itemId);
        
        const { totalItems, totalPrice } = calculateTotals(updatedItems);

        set({
          items: updatedItems,
          totalItems,
          totalPrice,
        });
      },

      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }

        const items = get().items;
        const updatedItems = items.map(item =>
          item.id === itemId ? { ...item, quantity } : item
        );

        const { totalItems, totalPrice } = calculateTotals(updatedItems);

        set({
          items: updatedItems,
          totalItems,
          totalPrice,
        });
      },

      clearCart: () => {
        set({
          items: [],
          totalItems: 0,
          totalPrice: 0,
        });
      },

      setCustomerInfo: (info) => {
        set({ customerInfo: info });
      },

      clearCustomerInfo: () => {
        set({ customerInfo: null });
      },

      getItemById: (itemId) => {
        return get().items.find(item => item.id === itemId);
      },

      hasItem: (type, itemId) => {
        return get().items.some(item => item.type === type && item.itemId === itemId);
      },

      applyVoucher: (voucher) => {
        set({ appliedVoucher: voucher });
      },

      removeVoucher: () => {
        set({ appliedVoucher: null });
      },

      getDiscountAmount: () => {
        const { appliedVoucher, totalPrice } = get();
        if (!appliedVoucher) return 0;
        
        if (appliedVoucher.discount_type === 'percent') {
          return Math.min(appliedVoucher.discount_amount, totalPrice);
        } else {
          return Math.min(appliedVoucher.discount_amount, totalPrice);
        }
      },

      getFinalAmount: () => {
        const { totalPrice } = get();
        const discountAmount = get().getDiscountAmount();
        return Math.max(0, totalPrice - discountAmount);
      },
    }),
    {
      name: 'wedding-cart-storage', // unique name
      partialize: (state) => ({
        items: state.items,
        totalItems: state.totalItems,
        totalPrice: state.totalPrice,
        customerInfo: state.customerInfo,
        appliedVoucher: state.appliedVoucher,
      }),
      onRehydrateStorage: () => (state) => {
        if (state && state.items) {
          // Recalculate totals when hydrating from localStorage
          const { totalItems, totalPrice } = calculateTotals(state.items);
          state.totalItems = totalItems;
          state.totalPrice = totalPrice;
        }
      },
    }
  )
);