'use client';

import { CartItem as CartItemType } from '../types';
import { useClientCart } from '../hooks/useClientCart';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useClientCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const getTypeLabel = (type: string) => {
    const labels = {
      package: 'Gói cưới',
      service: 'Dịch vụ',
      product: 'Sản phẩm',
      dish: 'Món ăn'
    };
    return labels[type as keyof typeof labels] || type;
  };

  const getTypeColor = (type: string) => {
    const colors = {
      package: 'bg-pink-100 text-pink-800',
      service: 'bg-rose-100 text-rose-800',
      product: 'bg-pink-100 text-pink-800',
      dish: 'bg-orange-100 text-orange-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-pink-100 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        {/* Image */}
        {item.image_url && (
          <div className="flex-shrink-0">
            <img 
              src={item.image_url} 
              alt={item.name}
              className="w-16 h-16 object-cover rounded-lg"
            />
          </div>
        )}

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h4 className="font-semibold text-gray-900 truncate">{item.name}</h4>
              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(item.type)}`}>
                {getTypeLabel(item.type)}
              </span>
            </div>
            <button
              onClick={() => removeItem(item.id)}
              className="text-gray-400 hover:text-red-500 transition-colors p-1"
              title="Xóa khỏi giỏ hàng"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {item.description && (
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>
          )}

          <div className="flex items-center justify-between">
            {/* Quantity Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="w-8 h-8 rounded-full bg-pink-100 text-pink-600 hover:bg-pink-200 transition-colors flex items-center justify-center"
                disabled={item.quantity <= 1}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
              <span className="w-8 text-center font-medium">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="w-8 h-8 rounded-full bg-pink-100 text-pink-600 hover:bg-pink-200 transition-colors flex items-center justify-center"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
            </div>

            {/* Price */}
            <div className="text-right">
              <div className="text-sm text-gray-500">
                {formatPrice(item.price)} x {item.quantity}
              </div>
              <div className="font-bold text-pink-600">
                {formatPrice(item.price * item.quantity)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}