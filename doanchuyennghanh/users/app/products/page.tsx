'use client';

import { useState, useMemo } from 'react';
import { useProductsData } from '../../features/products/hooks/useProductsData';
import ProductCard from '../../features/products/components/ProductCard';
import ProductSearch from '../../features/products/components/ProductSearch';
import Link from 'next/link';
import { useHydratedCartStore } from '../../features/cart/hooks/useCartPersistence';

export default function ProductsPage() {
  const { availableProducts, loading, error } = useProductsData();
  const { totalItems, isHydrated } = useHydratedCartStore();
  const [searchQuery, setSearchQuery] = useState('');

  // Filter products based on search query
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) {
      return availableProducts;
    }
    
    const query = searchQuery.toLowerCase();
    return availableProducts.filter(product =>
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
    );
  }, [availableProducts, searchQuery]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-pink-600 mx-auto mb-6"></div>
          <p className="text-gray-600 text-lg">Đang tải sản phẩm...</p>
        </div>
      </div>
    );
  }

  // Debug log
  console.log('Products data:', { availableProducts, loading, error });

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Có lỗi xảy ra</h2>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-pink-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Sản Phẩm
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-600"> Đặc Biệt</span>
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
              Khám phá các món ăn ngon và sản phẩm chất lượng cao cho sự kiện của bạn
            </p>
            
            {/* Search */}
            <ProductSearch onSearch={setSearchQuery} />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Bar */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-gray-600">
            {searchQuery ? (
              <span>
                Tìm thấy <span className="font-semibold text-pink-600">{filteredProducts.length}</span> sản phẩm 
                cho "{searchQuery}"
              </span>
            ) : (
              <span>
                Hiển thị <span className="font-semibold text-pink-600">{availableProducts.length}</span> sản phẩm
              </span>
            )}
          </div>
          
          {/* Cart Button */}
          {isHydrated && totalItems > 0 && (
            <Link 
              href="/cart"
              className="relative inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-600 to-rose-600 text-white font-semibold rounded-full hover:from-pink-700 hover:to-rose-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Giỏ hàng
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-pink-800 text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                {totalItems}
              </span>
            </Link>
          )}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-6">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {searchQuery ? 'Không tìm thấy sản phẩm' : 'Chưa có sản phẩm nào'}
            </h3>
            <p className="text-gray-600 mb-8">
              {searchQuery 
                ? `Không có sản phẩm nào phù hợp với "${searchQuery}"`
                : 'Vui lòng quay lại sau'
              }
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-600 to-rose-600 text-white font-semibold rounded-full hover:from-pink-700 hover:to-rose-700 transition-all duration-300"
              >
                Xem tất cả sản phẩm
              </button>
            )}
          </div>
        )}

        {/* Back to Shopping */}
        <div className="mt-12 text-center">
          <Link 
            href="/wedding-packages"
            className="inline-flex items-center text-pink-600 hover:text-pink-700 font-medium"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Xem gói cưới và dịch vụ
          </Link>
        </div>
      </div>
    </div>
  );
}