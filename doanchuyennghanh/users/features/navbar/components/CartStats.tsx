"use client";

import { useCartStore } from "../../cart/store/useCartStore";

export default function CartStats() {
  const { items } = useCartStore();

  // Count items by type
  const stats = items.reduce((acc, item) => {
    if (!acc[item.type]) {
      acc[item.type] = { count: 0, total: 0 };
    }
    acc[item.type].count += item.quantity;
    acc[item.type].total += item.price * item.quantity;
    return acc;
  }, {} as Record<string, { count: number; total: number }>);

  const typeInfo = {
    package: { label: 'Gói cưới', icon: '💍', color: 'text-pink-600' },
    service: { label: 'Dịch vụ', icon: '🎉', color: 'text-rose-600' },
    product: { label: 'Sản phẩm', icon: '📦', color: 'text-pink-600' },
    dish: { label: 'Món ăn', icon: '🍽️', color: 'text-orange-600' }
  };

  if (Object.keys(stats).length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-2 gap-2 mb-4">
      {Object.entries(stats).map(([type, data]) => {
        const info = typeInfo[type as keyof typeof typeInfo];
        return (
          <div key={type} className="bg-white/70 rounded-lg p-2 text-center">
            <div className="text-lg">{info.icon}</div>
            <div className="text-xs font-medium text-gray-600">{info.label}</div>
            <div className={`text-sm font-bold ${info.color}`}>{data.count}</div>
          </div>
        );
      })}
    </div>
  );
}