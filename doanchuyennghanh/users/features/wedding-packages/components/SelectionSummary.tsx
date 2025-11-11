'use client';

import { useWeddingStore } from '../store/useWeddingStore';
import { useCartStore } from '../../cart/store/useCartStore';
import * as Separator from '@radix-ui/react-separator';
import Link from 'next/link';

export default function SelectionSummary() {
  const { selection, clearSelection } = useWeddingStore();
  const { addItem } = useCartStore();

  const handleAddToCart = () => {
    // Add selected package to cart
    if (selection.selectedPackage) {
      addItem({
        type: 'package',
        itemId: selection.selectedPackage.id,
        name: selection.selectedPackage.name,
        price: selection.selectedPackage.price,
        image_url: selection.selectedPackage.image_url,
        description: selection.selectedPackage.description
      });
    }

    // Add selected services to cart
    selection.selectedServices.forEach(service => {
      addItem({
        type: 'service',
        itemId: service.id,
        name: service.name,
        price: service.price,
        image_url: service.image_url,
        description: service.description
      });
    });

    // Clear selection after adding to cart
    clearSelection();
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  if (!selection.selectedPackage && selection.selectedServices.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-4 border border-pink-100">
        <div className="text-center py-8">
          <div className="text-6xl mb-4">💕</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Chưa có lựa chọn</h3>
          <p className="text-gray-500 text-sm">Hãy chọn gói cưới và dịch vụ yêu thích</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-4 border border-pink-100">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 flex items-center">
          <svg className="w-5 h-5 mr-2 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          Lựa chọn của bạn
        </h3>
        <button
          onClick={clearSelection}
          className="text-gray-400 hover:text-red-500 transition-colors p-1"
          title="Xóa tất cả"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>

      <div className="space-y-4">
        {/* Selected Package */}
        {selection.selectedPackage && (
          <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-4 rounded-xl border border-pink-200">
            <div className="flex items-center mb-2">
              <svg className="w-4 h-4 mr-2 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <h4 className="font-semibold text-pink-800">Gói cưới đã chọn</h4>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-700 font-medium">{selection.selectedPackage.name}</span>
              <span className="font-bold text-pink-600">
                {formatPrice(selection.selectedPackage.price)}
              </span>
            </div>
          </div>
        )}

        {/* Selected Services */}
        {selection.selectedServices.length > 0 && (
          <div className="bg-gradient-to-r from-rose-50 to-pink-50 p-4 rounded-xl border border-rose-200">
            <div className="flex items-center mb-3">
              <svg className="w-4 h-4 mr-2 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <h4 className="font-semibold text-rose-800">
                Dịch vụ thêm ({selection.selectedServices.length})
              </h4>
            </div>
            <div className="space-y-2">
              {selection.selectedServices.map((service) => (
                <div key={service.id} className="flex justify-between items-center text-sm">
                  <span className="text-gray-700">{service.name}</span>
                  <span className="font-semibold text-rose-600">
                    {formatPrice(service.price)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <Separator.Root className="bg-pink-200 h-px my-4" />

        {/* Total */}
        <div className="bg-gradient-to-r from-pink-600 to-rose-600 p-4 rounded-xl text-white">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">Tổng cộng:</span>
            <span className="text-2xl font-bold">
              {formatPrice(selection.totalPrice)}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          <button 
            onClick={handleAddToCart}
            className="w-full bg-gradient-to-r from-pink-600 to-rose-600 text-white py-3 rounded-xl font-semibold hover:from-pink-700 hover:to-rose-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Thêm vào giỏ hàng
          </button>

          <Link 
            href="/cart"
            className="block w-full border-2 border-pink-300 text-pink-600 py-2 rounded-xl font-semibold hover:bg-pink-50 transition-colors text-center"
          >
            Xem giỏ hàng
          </Link>

          <button 
            onClick={clearSelection}
            className="w-full text-gray-500 hover:text-red-500 py-2 text-sm transition-colors"
          >
            Xóa lựa chọn
          </button>
        </div>
      </div>
    </div>
  );
}