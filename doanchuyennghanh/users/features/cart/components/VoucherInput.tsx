'use client';

import { useState, useEffect } from 'react';
import { useClientCart } from '../hooks/useClientCart';
import * as Label from '@radix-ui/react-label';

export default function VoucherInput() {
  const { totalPrice, appliedVoucher, applyVoucher, removeVoucher, getDiscountAmount, isHydrated } = useClientCart();

  if (!isHydrated) {
    return (
      <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-4 rounded-xl border border-pink-200">
        <div className="animate-pulse">
          <div className="h-4 bg-pink-200 rounded w-1/3 mb-2"></div>
          <div className="h-10 bg-pink-100 rounded"></div>
        </div>
      </div>
    );
  }
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
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/users/vouchers/check`, {
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

      // Backend trả về data khác với expected format
      const voucherData = data.data;
      applyVoucher({
        code: voucherData.code,
        discount_amount: parseFloat(voucherData.discount_value),
        discount_type: voucherData.discount_type,
        description: voucherData.description
      });

      setVoucherCode('');
    } catch (err) {
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
    <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-4 rounded-xl border border-pink-200">
      <Label.Root className="text-sm font-medium text-gray-700 mb-2 block">
        Mã giảm giá
      </Label.Root>
      
      {appliedVoucher ? (
        // Applied Voucher Display
        <div className="bg-white rounded-lg p-3 border border-green-200">
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
              placeholder="Nhập mã giảm giá"
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

          {/* Available Vouchers */}
          <AvailableVouchers onSelectVoucher={setVoucherCode} />
        </div>
      )}
    </div>
  );
}

// Component to show available vouchers
function AvailableVouchers({ onSelectVoucher }: { onSelectVoucher: (code: string) => void }) {
  const [vouchers, setVouchers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/users/vouchers`);
        const data = await response.json();
        if (response.ok) {
          // Filter active vouchers
          const activeVouchers = data.data.filter((v: any) => v.is_active && new Date(v.valid_to) > new Date());
          setVouchers(activeVouchers.slice(0, 3)); // Show only 3 vouchers
        }
      } catch (error) {
        console.error('Error fetching vouchers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVouchers();
  }, []);

  if (loading) {
    return (
      <div className="mt-3">
        <p className="text-xs text-gray-500 mb-2">Đang tải mã giảm giá...</p>
      </div>
    );
  }

  if (vouchers.length === 0) {
    return null;
  }

  return (
    <div className="mt-3">
      <p className="text-xs text-gray-500 mb-2">Mã giảm giá có sẵn:</p>
      <div className="flex flex-wrap gap-2">
        {vouchers.map((voucher) => (
          <button
            key={voucher.code}
            onClick={() => onSelectVoucher(voucher.code)}
            className="px-2 py-1 bg-pink-100 text-pink-600 text-xs rounded-full hover:bg-pink-200 transition-colors"
            title={voucher.description}
          >
            {voucher.code}
          </button>
        ))}
      </div>
    </div>
  );
}
