'use client';

import { useState } from 'react';
import { useClientCart } from '../hooks/useClientCart';

export default function SimpleVoucherInput() {
  const { totalPrice, appliedVoucher, applyVoucher, removeVoucher, getDiscountAmount } = useClientCart();
  const [voucherCode, setVoucherCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const handleApplyVoucher = async () => {
    if (!voucherCode.trim()) {
      setError('Vui lòng nhập mã giảm giá');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Call API to check voucher
      const response = await fetch('http://localhost:3000/api/users/vouchers/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          voucher_code: voucherCode,
          total_amount: totalPrice
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        setError(data.error || 'Mã giảm giá không hợp lệ');
        return;
      }

      // Apply voucher to store
      applyVoucher({
        code: data.data.code,
        discount_amount: parseFloat(data.data.discount_value),
        discount_type: data.data.discount_type,
        description: data.data.description
      });

      setVoucherCode('');
      setError('');
    } catch (err) {
      console.error('Voucher error:', err);
      setError('Có lỗi xảy ra khi áp dụng mã giảm giá');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveVoucher = () => {
    removeVoucher();
    setError('');
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-pink-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Mã giảm giá</h3>
      
      {appliedVoucher ? (
        // Applied Voucher Display
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <div className="font-semibold text-green-800">{appliedVoucher.code}</div>
                <div className="text-sm text-green-600">{appliedVoucher.description}</div>
                <div className="text-sm font-medium text-green-700">
                  Tiết kiệm: {formatPrice(getDiscountAmount())}
                </div>
              </div>
            </div>
            <button
              onClick={handleRemoveVoucher}
              className="text-gray-400 hover:text-red-500 transition-colors p-1"
              title="Xóa mã giảm giá"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      ) : (
        // Voucher Input
        <div className="space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={voucherCode}
              onChange={(e) => setVoucherCode(e.target.value.toUpperCase())}
              placeholder="Nhập mã giảm giá (VD: VALENTINE2025)"
              className="flex-1 px-3 py-2 border-2 border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
              disabled={loading}
            />
            <button
              onClick={handleApplyVoucher}
              disabled={loading || !voucherCode.trim()}
              className="px-4 py-2 bg-gradient-to-r from-pink-600 to-rose-600 text-white font-semibold rounded-lg hover:from-pink-700 hover:to-rose-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-1"></div>
                  <span className="text-sm">Kiểm tra</span>
                </div>
              ) : (
                'Áp dụng'
              )}
            </button>
          </div>

          {error && (
            <div className="text-red-600 text-sm flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          )}

          {/* Quick voucher buttons */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setVoucherCode('VALENTINE2025')}
              className="px-3 py-1 bg-pink-100 text-pink-600 text-sm rounded-full hover:bg-pink-200 transition-colors"
            >
              VALENTINE2025
            </button>
          </div>
        </div>
      )}
    </div>
  );
}