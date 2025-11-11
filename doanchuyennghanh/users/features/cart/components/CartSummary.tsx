'use client';

import { useCartStore } from '../store/useCartStore';
import * as Separator from '@radix-ui/react-separator';

interface CartSummaryProps {
  onCheckout?: () => void;
}

export default function CartSummary({ onCheckout }: CartSummaryProps) {
  const { totalItems, totalPrice, items, appliedVoucher, getDiscountAmount, getFinalAmount } = useCartStore();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-pink-100 sticky top-4">
      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
        <svg className="w-5 h-5 mr-2 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        Tóm tắt đơn hàng
      </h3>

      <div className="space-y-3 mb-4">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Số lượng sản phẩm:</span>
          <span className="font-medium">{totalItems} món</span>
        </div>

        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Tạm tính:</span>
          <span className="font-medium">{formatPrice(totalPrice)}</span>
        </div>

        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Phí vận chuyển:</span>
          <span className="font-medium text-green-600">Miễn phí</span>
        </div>

        {appliedVoucher && (
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Giảm giá ({appliedVoucher.code}):</span>
            <span className="font-medium text-green-600">-{formatPrice(getDiscountAmount())}</span>
          </div>
        )}
      </div>

      <Separator.Root className="bg-pink-200 h-px my-4" />

      <div className="space-y-2 mb-6">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Tạm tính:</span>
          <span className="font-medium">{formatPrice(totalPrice)}</span>
        </div>
        {appliedVoucher && (
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Giảm giá:</span>
            <span className="font-medium text-green-600">-{formatPrice(getDiscountAmount())}</span>
          </div>
        )}
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-gray-900">Thành tiền:</span>
          <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-600">
            {formatPrice(getFinalAmount())}
          </span>
        </div>
      </div>

      <button
        onClick={onCheckout}
        className="w-full bg-gradient-to-r from-pink-600 to-rose-600 text-white py-3 rounded-xl font-semibold hover:from-pink-700 hover:to-rose-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
      >
        Tiến hành thanh toán
      </button>

      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500">
          Bằng việc đặt hàng, bạn đồng ý với{' '}
          <a href="#" className="text-pink-600 hover:underline">Điều khoản dịch vụ</a>
        </p>
      </div>
    </div>
  );
}