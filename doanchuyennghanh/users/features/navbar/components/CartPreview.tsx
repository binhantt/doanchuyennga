"use client";

import { useHydratedCartStore } from "../../cart/hooks/useCartPersistence";
import { CartItem } from "../../cart/types";
import CartStats from "./CartStats";

interface CartPreviewProps {
  onClose: () => void;
}

export default function CartPreview({ onClose }: CartPreviewProps) {
  const { items, totalPrice, removeItem, isHydrated } = useHydratedCartStore();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  // Group items by type
  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.type]) {
      acc[item.type] = [];
    }
    acc[item.type].push(item);
    return acc;
  }, {} as Record<string, CartItem[]>);

  const typeLabels = {
    package: { label: 'Gói cưới', icon: '💍', color: 'pink' },
    service: { label: 'Dịch vụ', icon: '🎉', color: 'rose' },
    product: { label: 'Sản phẩm', icon: '📦', color: 'pink' },
    dish: { label: 'Món ăn', icon: '🍽️', color: 'orange' }
  };

  const getColorClasses = (color: string) => {
    const colors = {
      pink: 'bg-pink-50 border-pink-200 text-pink-800',
      rose: 'bg-rose-50 border-rose-200 text-rose-800',
      purple: 'bg-purple-50 border-purple-200 text-purple-800',
      orange: 'bg-orange-50 border-orange-200 text-orange-800'
    };
    return colors[color as keyof typeof colors] || colors.pink;
  };

  if (!isHydrated) {
    return (
      <div className="w-full max-w-md p-4">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-pink-200 rounded w-3/4"></div>
          <div className="h-20 bg-pink-100 rounded"></div>
          <div className="h-20 bg-pink-100 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      {/* Quick Stats */}
      <CartStats />
      
      <div className="space-y-4">
        {Object.entries(groupedItems).map(([type, typeItems]) => {
          const typeInfo = typeLabels[type as keyof typeof typeLabels];
          const typeTotal = typeItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
          
          return (
            <div key={type} className={`rounded-xl border-2 p-4 ${getColorClasses(typeInfo.color)}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <span className="text-2xl mr-2">{typeInfo.icon}</span>
                  <div>
                    <h4 className="font-semibold">{typeInfo.label}</h4>
                    <p className="text-sm opacity-75">{typeItems.length} sản phẩm</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold">{formatPrice(typeTotal)}</div>
                </div>
              </div>
              
              <div className="space-y-2">
                {typeItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center text-sm bg-white/50 rounded-lg p-2">
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{item.name}</div>
                      <div className="opacity-75">{formatPrice(item.price)} x {item.quantity}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="font-semibold">
                        {formatPrice(item.price * item.quantity)}
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full p-1 transition-colors"
                        title="Xóa sản phẩm"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Summary */}
      <div className="mt-6 p-4 bg-gradient-to-r from-pink-600 to-rose-600 rounded-xl text-white">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold">Tổng cộng:</span>
          <span className="text-2xl font-bold">{formatPrice(totalPrice)}</span>
        </div>
      </div>
    </div>
  );
}