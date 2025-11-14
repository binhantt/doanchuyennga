'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { weddingApi } from '../features/wedding-packages/api/weddingApi';
import { WeddingPackage } from '../features/wedding-packages/types';
import { createSlug, formatPrice, getVenueTypeLabel } from '../lib/utils';
import * as Separator from '@radix-ui/react-separator';

export default function HomePage() {
  const [featuredPackages, setFeaturedPackages] = useState<WeddingPackage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const packages = await weddingApi.getFeaturedPackages();
        setFeaturedPackages(packages);
      } catch (error) {
        console.error('Error fetching featured packages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);



  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-600/20 to-rose-600/20"></div>
        <div className="relative container mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            Ngày Cưới
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-600"> Hoàn Hảo</span>
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
            Tạo nên những khoảnh khắc đáng nhớ nhất trong cuộc đời với các gói cưới và dịch vụ chuyên nghiệp của chúng tôi
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/wedding-packages"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-pink-600 to-rose-600 text-white font-semibold rounded-full hover:from-pink-700 hover:to-rose-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <span>Khám Phá Gói Cưới</span>
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link 
              href="/about"
              className="inline-flex items-center px-8 py-4 border-2 border-pink-600 text-pink-600 font-semibold rounded-full hover:bg-pink-600 hover:text-white transition-all duration-300"
            >
              Tìm Hiểu Thêm
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Tại Sao Chọn Chúng Tôi?</h2>
            <p className="text-gray-600 text-lg">Những điều đặc biệt mà chúng tôi mang đến</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-pink-100 hover:border-pink-300">
              <div className="text-6xl mb-6 text-center">💍</div>
              <h3 className="text-2xl font-bold mb-4 text-center text-gray-900">Gói Cưới Đa Dạng</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Từ tiệc cưới nhỏ ấm cúng đến đám cưới hoành tráng, chúng tôi có gói phù hợp với mọi ngân sách và phong cách
              </p>
            </div>
            
            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-pink-100 hover:border-pink-300">
              <div className="text-6xl mb-6 text-center">🎉</div>
              <h3 className="text-2xl font-bold mb-4 text-center text-gray-900">Dịch Vụ Chuyên Nghiệp</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Đội ngũ có kinh nghiệm hơn 10 năm trong ngành tổ chức sự kiện, cam kết mang đến trải nghiệm tuyệt vời
              </p>
            </div>
            
            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-pink-100 hover:border-pink-300">
              <div className="text-6xl mb-6 text-center">✨</div>
              <h3 className="text-2xl font-bold mb-4 text-center text-gray-900">Kỷ Niệm Vĩnh Cửu</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Mỗi chi tiết đều được chăm chút tỉ mỉ để tạo nên những khoảnh khắc đáng nhớ nhất trong cuộc đời bạn
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Packages Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Gói Cưới Nổi Bật</h2>
            <p className="text-gray-600 text-lg">Những gói cưới được yêu thích nhất</p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-pink-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredPackages.map((pkg, index) => (
                <div 
                  key={pkg.id}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-pink-100 hover:border-pink-300 transform hover:-translate-y-2"
                >
                  {pkg.image_url && (
                    <div className="relative overflow-hidden">
                      <img 
                        src={pkg.image_url} 
                        alt={pkg.name}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 right-4">
                        <span className="bg-gradient-to-r from-pink-600 to-rose-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          Nổi bật
                        </span>
                      </div>
                    </div>
                  )}
                  
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{pkg.name}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{pkg.description}</p>
                    
                    <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        {pkg.guest_count} khách
                      </span>
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {getVenueTypeLabel(pkg.venue_type)}
                      </span>
                    </div>
                    
                    <Separator.Root className="bg-pink-200 h-px my-4" />
                    
                    <div className="flex justify-between items-center">
                      <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-600">
                        {formatPrice(pkg.price)}
                      </div>
                      <Link 
                        href={`/wedding-packages/${createSlug(pkg.name)}`}
                        className="bg-gradient-to-r from-pink-600 to-rose-600 text-white px-6 py-2 rounded-full font-semibold hover:from-pink-700 hover:to-rose-700 transition-all duration-300 transform hover:scale-105"
                      >
                        Xem chi tiết
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && featuredPackages.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🌸</div>
              <p className="text-gray-500 text-lg">Chưa có gói cưới nổi bật nào</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-pink-600 to-rose-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Sẵn Sàng Bắt Đầu?</h2>
          <p className="text-pink-100 text-xl mb-8 max-w-2xl mx-auto">
            Hãy để chúng tôi giúp bạn tạo nên ngày cưới trong mơ với những gói dịch vụ tuyệt vời
          </p>
          <Link 
            href="/wedding-packages"
            className="inline-flex items-center px-8 py-4 bg-white text-pink-600 font-bold rounded-full hover:bg-pink-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <span>Khám Phá Ngay</span>
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}