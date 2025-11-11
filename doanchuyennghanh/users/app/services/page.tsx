'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useClientCart } from '../../features/cart/hooks/useClientCart';
import { formatPrice } from '../../lib/utils';

interface Service {
  id: number;
  name: string;
  description: string;
  price: number | string;
  image_url?: string;
  category_id?: number;
  category_name?: string;
  is_available: boolean | number;
  duration?: string;
  max_guests?: number;
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { totalItems, addItem, hasItem, isHydrated } = useClientCart();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3000/api/users/services/available');
        const data = await response.json();
        
        if (response.ok) {
          setServices(data.data);
        } else {
          setError(data.error || 'Lỗi khi tải dịch vụ');
        }
      } catch (err) {
        console.error('Error fetching services:', err);
        setError('Có lỗi xảy ra khi tải dữ liệu');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Filter services based on search and category
  const filteredServices = useMemo(() => {
    let filtered = services;

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(service =>
        service.name.toLowerCase().includes(query) ||
        service.description.toLowerCase().includes(query) ||
        (service.category_name && service.category_name.toLowerCase().includes(query))
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(service => 
        service.category_name === selectedCategory
      );
    }

    return filtered;
  }, [services, searchQuery, selectedCategory]);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = services.map(s => s.category_name).filter(Boolean);
    return ['all', ...Array.from(new Set(cats))];
  }, [services]);

  const handleAddToCart = (service: Service) => {
    if (isHydrated) {
      addItem({
        type: 'service',
        itemId: service.id,
        name: service.name,
        price: typeof service.price === 'string' ? parseFloat(service.price) : service.price,
        image_url: service.image_url,
        description: service.description
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-pink-600 mx-auto mb-6"></div>
          <p className="text-gray-600 text-lg">Đang tải dịch vụ...</p>
        </div>
      </div>
    );
  }

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
              Dịch Vụ
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-600"> Cưới</span>
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
              Khám phá các dịch vụ chuyên nghiệp cho ngày cưới hoàn hảo của bạn
            </p>
            
            {/* Search */}
            <div className="relative max-w-md mx-auto">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm dịch vụ..."
                className="w-full pl-12 pr-4 py-3 border-2 border-pink-200 rounded-full focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white/80 backdrop-blur-sm"
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <svg className="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category || 'all')}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-pink-50 border border-pink-200'
              }`}
            >
              {category === 'all' ? 'Tất cả' : category}
            </button>
          ))}
        </div>

        {/* Stats Bar */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-gray-600">
            {searchQuery || selectedCategory !== 'all' ? (
              <span>
                Tìm thấy <span className="font-semibold text-pink-600">{filteredServices.length}</span> dịch vụ
                {searchQuery && ` cho "${searchQuery}"`}
                {selectedCategory !== 'all' && ` trong "${selectedCategory}"`}
              </span>
            ) : (
              <span>
                Hiển thị <span className="font-semibold text-pink-600">{services.length}</span> dịch vụ
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

        {/* Services Grid */}
        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => {
              const isInCart = isHydrated ? hasItem('service', service.id) : false;
              
              return (
                <div key={service.id} className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-pink-100 hover:border-pink-300 transform hover:-translate-y-1">
                  {/* Image */}
                  {service.image_url && (
                    <div className="relative overflow-hidden">
                      <img 
                        src={service.image_url} 
                        alt={service.name}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      
                      {/* Availability Badge */}
                      {!Boolean(service.is_available) && (
                        <div className="absolute top-3 left-3">
                          <span className="bg-gray-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                            Hết chỗ
                          </span>
                        </div>
                      )}

                      {/* Cart Badge */}
                      {isInCart && (
                        <div className="absolute top-3 right-3">
                          <div className="bg-green-500 text-white p-2 rounded-full">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Content */}
                  <div className="p-6">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors line-clamp-2">
                        {service.name}
                      </h3>
                      {service.category_name && (
                        <span className="inline-block px-2 py-1 bg-rose-100 text-rose-600 text-xs rounded-full font-medium mb-2">
                          {service.category_name}
                        </span>
                      )}
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                        {service.description}
                      </p>
                    </div>
                    
                    {/* Service Info */}
                    <div className="flex justify-between text-xs text-gray-500 mb-4">
                      {service.duration && (
                        <span>⏱️ {service.duration}</span>
                      )}
                      {service.max_guests && (
                        <span>👥 {service.max_guests} khách</span>
                      )}
                    </div>
                    
                    {/* Price and Actions */}
                    <div className="space-y-3">
                      <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-600">
                        {formatPrice(typeof service.price === 'string' ? parseFloat(service.price) : service.price)}
                      </div>
                      
                      <div className="flex gap-2">
                        <Link
                          href={`/services/${service.id}`}
                          className="flex-1 px-3 py-2 border-2 border-pink-300 text-pink-600 rounded-lg hover:bg-pink-50 transition-colors text-center text-sm font-medium"
                        >
                          Xem chi tiết
                        </Link>
                        <button
                          onClick={() => handleAddToCart(service)}
                          disabled={!Boolean(service.is_available) || isInCart}
                          className={`flex-1 px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                            !Boolean(service.is_available)
                              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                              : isInCart
                              ? 'bg-green-100 text-green-600 cursor-default'
                              : 'bg-gradient-to-r from-rose-600 to-pink-600 text-white hover:from-rose-700 hover:to-pink-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                          }`}
                        >
                          {!Boolean(service.is_available) 
                            ? 'Hết chỗ' 
                            : isInCart 
                            ? 'Đã thêm' 
                            : 'Thêm giỏ'
                          }
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-6">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {searchQuery || selectedCategory !== 'all' ? 'Không tìm thấy dịch vụ' : 'Chưa có dịch vụ nào'}
            </h3>
            <p className="text-gray-600 mb-8">
              {searchQuery || selectedCategory !== 'all'
                ? 'Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc'
                : 'Vui lòng quay lại sau'
              }
            </p>
            {(searchQuery || selectedCategory !== 'all') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-600 to-rose-600 text-white font-semibold rounded-full hover:from-pink-700 hover:to-rose-700 transition-all duration-300"
              >
                Xem tất cả dịch vụ
              </button>
            )}
          </div>
        )}

        {/* Back to Wedding Packages */}
        <div className="mt-12 text-center">
          <Link 
            href="/wedding-packages"
            className="inline-flex items-center text-pink-600 hover:text-pink-700 font-medium"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Xem gói cưới
          </Link>
        </div>
      </div>
    </div>
  );
}