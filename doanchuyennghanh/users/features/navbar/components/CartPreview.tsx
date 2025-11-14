"use client";

import { useCartStore } from "../../cart/store/useCartStore";
import { CartItem } from "../../cart/types";
import CartStats from "./CartStats";

interface CartPreviewProps {
  onClose: () => void;
}

export default function CartPreview({ onClose }: CartPreviewProps) {
  const { items, totalPrice } = useCartStore();

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
    product: { label: 'Sản phẩm', icon: '📦', color: 'purple' },
    dish: { label: 'Món ăn', icon: '🍽️', color: 'orange' }
  };

  const getColorClasses = (color: string) => {
    const colors = {
      pink: 'bg-pink-50 border-pink-200 text-pink-800',
      rose: 'bg-rose-50 border-rose-200 text-rose-800',
      pink: 'bg-pink-50 border-pink-200 text-pink-800',
      orange: 'bg-orange-50 border-orange-200 text-orange-800'
    };
    return colors[color as keyof typeof colors] || colors.pink;
  };

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
                    <div className="font-semibold ml-2">
                      {formatPrice(item.price * item.quantity)}
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