'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useClientCart } from '../../features/cart/hooks/useClientCart';
import CheckoutForm from '../../features/cart/components/CheckoutForm';
import SimpleVoucherInput from '../../features/cart/components/SimpleVoucherInput';
import CartItem from '../../features/cart/components/CartItem';
import * as Dialog from '@radix-ui/react-dialog';
import { CartSummary } from '@/features/cart';

export default function CartPage() {
  const { items, clearCart, totalPrice, getDiscountAmount, getFinalAmount, isHydrated } = useClientCart();
  const [showCheckout, setShowCheckout] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [orderId, setOrderId] = useState<number | null>(null);

  const handleCheckoutSuccess = (newOrderId: number) => {
    setOrderId(newOrderId);
    setShowSuccess(true);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="text-8xl mb-6">🛒</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Giỏ hàng trống</h1>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Bạn chưa có sản phẩm nào trong giỏ hàng. Hãy khám phá các gói cưới và dịch vụ tuyệt vời của chúng tôi!
            </p>
            <Link 
              href="/wedding-packages"
              className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-pink-600 to-rose-600 text-white font-semibold rounded-full hover:from-pink-700 hover:to-rose-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Khám phá sản phẩm
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-pink-100">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <svg className="w-8 h-8 mr-3 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Giỏ hàng của bạn
              </h1>
              <p className="text-gray-600 mt-1">
                {items.length} sản phẩm đã được chọn
              </p>
            </div>
            <button
              onClick={clearCart}
              className="text-gray-500 hover:text-red-500 transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Xóa tất cả
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>



            {/* Continue Shopping */}
            <div className="mt-8 text-center">
              <Link 
                href="/wedding-packages"
                className="inline-flex items-center text-pink-600 hover:text-pink-700 font-medium"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Tiếp tục mua sắm
              </Link>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1 space-y-6">
            {/* Voucher Input */}
            <SimpleVoucherInput />
            
            {/* Cart Summary */}
            <CartSummary onCheckout={() => setShowCheckout(true)} />
          </div>
        </div>
      </div>

      {/* Checkout Form */}
      <CheckoutForm
        isOpen={showCheckout}
        onClose={() => setShowCheckout(false)}
        onSuccess={handleCheckoutSuccess}
      />

      {/* Success Dialog */}
      <Dialog.Root open={showSuccess} onOpenChange={setShowSuccess}>
        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/50 fixed inset-0 z-50" />
          <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl p-8 w-full max-w-md z-50 shadow-2xl text-center">
            <div className="text-6xl mb-4">🎉</div>
            <Dialog.Title className="text-2xl font-bold text-gray-900 mb-4">
              Đặt hàng thành công!
            </Dialog.Title>
            <Dialog.Description className="text-gray-600 mb-6">
              Cảm ơn bạn đã đặt hàng. Chúng tôi sẽ liên hệ với bạn sớm nhất để xác nhận đơn hàng.
            </Dialog.Description>
            {orderId && (
              <p className="text-sm text-gray-500 mb-6">
                Mã đơn hàng: <span className="font-mono font-semibold">#{orderId}</span>
              </p>
            )}
            <div className="flex gap-3">
              <Dialog.Close asChild>
                <button className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  Đóng
                </button>
              </Dialog.Close>
              <Link 
                href="/"
                className="flex-1 px-4 py-2 bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-lg hover:from-pink-700 hover:to-rose-700 transition-all text-center"
              >
                Về trang chủ
              </Link>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}