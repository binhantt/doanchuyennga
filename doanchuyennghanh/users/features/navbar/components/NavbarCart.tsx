"use client";

import Link from "next/link";
import { useState } from "react";
import { useHydratedCartStore } from "../../cart/hooks/useCartPersistence";
import CartPreview from "./CartPreview";

export default function NavbarCart() {
  const { totalItems, items, totalPrice, removeItem, isHydrated } = useHydratedCartStore();
  const [isOpen, setIsOpen] = useState(false);

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

  // Show loading state until cart is hydrated
  if (!isHydrated) {
    return (
      <div className="relative">
        <button className="relative group flex items-center space-x-2 px-4 py-2 rounded-full">
          <div className="relative">
            <svg className="w-6 h-6 text-gray-400 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <span className="hidden md:block text-gray-400 font-medium">
            Giỏ hàng
          </span>
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Cart Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative group flex items-center space-x-2 px-4 py-2 rounded-full hover:bg-pink-50 transition-all duration-300"
      >
        <div className="relative">
          <svg className="w-6 h-6 text-gray-700 group-hover:text-pink-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          
          {totalItems > 0 && (
            <div className="absolute -top-2 -right-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
              {totalItems > 99 ? '99+' : totalItems}
            </div>
          )}
        </div>
        
        <span className="hidden md:block text-gray-700 group-hover:text-pink-600 font-medium transition-colors">
          Giỏ hàng
        </span>
      </button>

      {/* Cart Dropdown */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-96 bg-white rounded-2xl shadow-2xl border border-pink-100 z-50 max-h-[80vh] overflow-hidden">
          {items.length === 0 ? (
            // Empty Cart
            <div className="p-6 text-center">
              <div className="text-6xl mb-4">🛒</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Giỏ hàng trống</h3>
              <p className="text-gray-500 text-sm mb-4">Thêm sản phẩm vào giỏ hàng để bắt đầu mua sắm</p>
              <Link
                href="/wedding-packages"
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-pink-600 to-rose-600 text-white font-semibold rounded-lg hover:from-pink-700 hover:to-rose-700 transition-all"
              >
                Khám phá sản phẩm
              </Link>
            </div>
          ) : (
            // Cart Items with Preview
            <>
              <div className="p-4 border-b border-pink-100">
                <h3 className="font-semibold text-gray-900 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Giỏ hàng ({totalItems} sản phẩm)
                </h3>
              </div>

              <div className="max-h-96 overflow-y-auto p-4">
                <CartPreview onClose={() => setIsOpen(false)} />
              </div>

              <div className="p-4 bg-gradient-to-r from-pink-50 to-rose-50 border-t border-pink-100">
                <div className="flex gap-2">
                  <Link
                    href="/cart"
                    onClick={() => setIsOpen(false)}
                    className="flex-1 px-4 py-2 border-2 border-pink-300 text-pink-600 font-semibold rounded-lg hover:bg-pink-50 transition-colors text-center"
                  >
                    Xem chi tiết
                  </Link>
                  <Link
                    href="/cart"
                    onClick={() => setIsOpen(false)}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-pink-600 to-rose-600 text-white font-semibold rounded-lg hover:from-pink-700 hover:to-rose-700 transition-all text-center"
                  >
                    Thanh toán
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}