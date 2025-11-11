'use client';

import { useState } from 'react';
import { useCartStore } from '../store/useCartStore';
import { useHydratedCartStore } from '../hooks/useCartPersistence';
import { cartApi } from '../api/cartApi';
import { CustomerInfo, OrderRequest } from '../types';
import * as Dialog from '@radix-ui/react-dialog';
import * as Label from '@radix-ui/react-label';
import * as Separator from '@radix-ui/react-separator';

interface CheckoutFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (orderId: number) => void;
}

export default function CheckoutForm({ isOpen, onClose, onSuccess }: CheckoutFormProps) {
  const { items, totalPrice, appliedVoucher, getDiscountAmount, getFinalAmount, clearCart, isHydrated } = useHydratedCartStore();
  const [loading, setLoading] = useState(false);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: '',
    email: '',
    phone: '',
    address: '',
    event_date: '',
    guest_count: 50,
    event_address: '',
    notes: ''
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  // Don't render until cart is hydrated
  if (!isHydrated) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderData: OrderRequest = {
        customer: customerInfo,
        items: items,
        total_amount: totalPrice,
        discount_amount: getDiscountAmount(),
        final_amount: getFinalAmount(),
        voucher_code: appliedVoucher?.code
      };

      const response = await cartApi.createOrder(orderData);
      
      // Clear cart after successful order
      clearCart();
      
      // Call success callback with order ID
      onSuccess(response.data.id);
      
      onClose();
    } catch (error: any) {
      console.error('Error creating order:', error);
      alert('Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại!');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof CustomerInfo, value: string | number) => {
    setCustomerInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/50 fixed inset-0 z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto z-50 shadow-2xl">
          <Dialog.Title className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <svg className="w-6 h-6 mr-2 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
            Thông tin đặt hàng
          </Dialog.Title>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Customer Information */}
            <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-4 rounded-xl border border-pink-200">
              <h3 className="font-semibold text-gray-900 mb-4">Thông tin khách hàng</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label.Root className="text-sm font-medium text-gray-700 mb-1 block">
                    Họ và tên *
                  </Label.Root>
                  <input
                    type="text"
                    required
                    value={customerInfo.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-3 py-2 border border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                    placeholder="Nhập họ và tên"
                  />
                </div>
                <div>
                  <Label.Root className="text-sm font-medium text-gray-700 mb-1 block">
                    Email *
                  </Label.Root>
                  <input
                    type="email"
                    required
                    value={customerInfo.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-3 py-2 border border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                    placeholder="Nhập email"
                  />
                </div>
                <div>
                  <Label.Root className="text-sm font-medium text-gray-700 mb-1 block">
                    Số điện thoại *
                  </Label.Root>
                  <input
                    type="tel"
                    required
                    value={customerInfo.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-3 py-2 border border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                    placeholder="Nhập số điện thoại"
                  />
                </div>
                <div>
                  <Label.Root className="text-sm font-medium text-gray-700 mb-1 block">
                    Số khách mời *
                  </Label.Root>
                  <input
                    type="number"
                    required
                    min="1"
                    value={customerInfo.guest_count}
                    onChange={(e) => handleInputChange('guest_count', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label.Root className="text-sm font-medium text-gray-700 mb-1 block">
                    Địa chỉ liên hệ *
                  </Label.Root>
                  <input
                    type="text"
                    required
                    value={customerInfo.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="w-full px-3 py-2 border border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                    placeholder="Nhập địa chỉ liên hệ"
                  />
                </div>
              </div>
            </div>

            {/* Event Information */}
            <div className="bg-gradient-to-r from-rose-50 to-pink-50 p-4 rounded-xl border border-rose-200">
              <h3 className="font-semibold text-gray-900 mb-4">Thông tin sự kiện</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label.Root className="text-sm font-medium text-gray-700 mb-1 block">
                    Ngày tổ chức *
                  </Label.Root>
                  <input
                    type="date"
                    required
                    value={customerInfo.event_date}
                    onChange={(e) => handleInputChange('event_date', e.target.value)}
                    className="w-full px-3 py-2 border border-rose-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                  />
                </div>
                <div className="md:col-span-1">
                  <Label.Root className="text-sm font-medium text-gray-700 mb-1 block">
                    Địa điểm tổ chức *
                  </Label.Root>
                  <input
                    type="text"
                    required
                    value={customerInfo.event_address}
                    onChange={(e) => handleInputChange('event_address', e.target.value)}
                    className="w-full px-3 py-2 border border-rose-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                    placeholder="Nhập địa điểm tổ chức"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label.Root className="text-sm font-medium text-gray-700 mb-1 block">
                    Ghi chú thêm
                  </Label.Root>
                  <textarea
                    value={customerInfo.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    className="w-full px-3 py-2 border border-rose-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                    rows={3}
                    placeholder="Nhập ghi chú thêm (nếu có)"
                  />
                </div>
              </div>
            </div>

            <Separator.Root className="bg-pink-200 h-px" />

            {/* Order Summary */}
            <div className="bg-gray-50 p-4 rounded-xl">
              <h3 className="font-semibold text-gray-900 mb-3">Tóm tắt đơn hàng</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Số lượng sản phẩm:</span>
                  <span>{items.length} món</span>
                </div>
                <div className="flex justify-between">
                  <span>Tạm tính:</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Phí vận chuyển:</span>
                  <span>Miễn phí</span>
                </div>
                <Separator.Root className="bg-gray-300 h-px my-2" />
                <div className="flex justify-between font-bold text-lg">
                  <span>Tổng cộng:</span>
                  <span className="text-pink-600">{formatPrice(totalPrice)}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Dialog.Close asChild>
                <button
                  type="button"
                  className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                  disabled={loading}
                >
                  Hủy
                </button>
              </Dialog.Close>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-xl font-semibold hover:from-pink-700 hover:to-rose-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Đang xử lý...
                  </div>
                ) : (
                  'Đặt hàng ngay'
                )}
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}