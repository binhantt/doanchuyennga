'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { WeddingPackage, Service } from '../../../features/wedding-packages/types';
import { weddingApi } from '../../../features/wedding-packages/api/weddingApi';
import { useCartStore } from '../../../features/cart/store/useCartStore';
import { createSlug, formatPrice, getVenueTypeLabel } from '../../../lib/utils';
import * as Separator from '@radix-ui/react-separator';

export default function WeddingPackageCatchAllPage() {
  const params = useParams();
  const router = useRouter();
  const { addItem } = useCartStore();
  const [packageData, setPackageData] = useState<WeddingPackage | null>(null);
  const [relatedServices, setRelatedServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [debugInfo, setDebugInfo] = useState<any>(null);

  useEffect(() => {
    const fetchPackageDetail = async () => {
      try {
        setLoading(true);
        const packages = await weddingApi.getPackages();
        
        // Get the first slug parameter
        const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
        const packageName = decodeURIComponent(slug || '');
        
        console.log('Searching for package:', packageName);
        console.log('Available packages:', packages.map(p => ({ name: p.name, slug: createSlug(p.name) })));
        
        setDebugInfo({
          searchTerm: packageName,
          availablePackages: packages.map(p => ({ id: p.id, name: p.name, slug: createSlug(p.name) }))
        });
        
        const pkg = packages.find(p => {
          const slug = createSlug(p.name);
          const normalizedInput = packageName.toLowerCase().trim();
          const normalizedName = p.name.toLowerCase().trim();
          
          return (
            slug === normalizedInput || 
            normalizedName === normalizedInput ||
            normalizedName.includes(normalizedInput) ||
            normalizedInput.includes(normalizedName)
          );
        });
        
        if (!pkg) {
          setError(`Không tìm thấy gói cưới với tên: "${packageName}"`);
          return;
        }

        setPackageData(pkg);
        
        // Get related services
        const services = await weddingApi.getAvailableServices();
        setRelatedServices(services.slice(0, 6));
      } catch (err) {
        console.error('Error fetching package:', err);
        setError('Có lỗi xảy ra khi tải dữ liệu');
      } finally {
        setLoading(false);
      }
    };

    if (params.slug) {
      fetchPackageDetail();
    }
  }, [params.slug]);

  const handleAddToCart = () => {
    if (packageData) {
      addItem({
        type: 'package',
        itemId: packageData.id,
        name: packageData.name,
        price: packageData.price,
        image_url: packageData.image_url,
        description: packageData.description
      });
      
      router.push('/cart');
    }
  };

  const handleAddServiceToCart = (service: Service) => {
    addItem({
      type: 'service',
      itemId: service.id,
      name: service.name,
      price: service.price,
      image_url: service.image_url,
      description: service.description
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-pink-600 mx-auto mb-6"></div>
          <p className="text-gray-600 text-lg">Đang tải chi tiết gói cưới...</p>
        </div>
      </div>
    );
  }

  if (error || !packageData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg max-w-2xl">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Không tìm thấy gói cưới</h2>
          <p className="text-red-600 mb-4">{error}</p>
          
          {/* Debug Info */}
          {debugInfo && (
            <div className="bg-gray-100 p-4 rounded-lg mb-4 text-left">
              <h3 className="font-semibold mb-2">Debug Info:</h3>
              <p><strong>Tìm kiếm:</strong> "{debugInfo.searchTerm}"</p>
              <p><strong>Gói có sẵn:</strong></p>
              <ul className="text-sm space-y-1 mt-2">
                {debugInfo.availablePackages.map((pkg: any) => (
                  <li key={pkg.id}>
                    {pkg.name} → <code>{pkg.slug}</code>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="space-y-3">
            <Link 
              href="/wedding-packages"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-600 to-rose-600 text-white font-semibold rounded-lg hover:from-pink-700 hover:to-rose-700 transition-all"
            >
              Quay lại danh sách
            </Link>
            <br />
            <Link 
              href="/wedding-packages/debug"
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-all"
            >
              Xem trang debug
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50">
      {/* Breadcrumb */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-pink-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-pink-600 transition-colors">
              Trang chủ
            </Link>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link href="/wedding-packages" className="text-gray-500 hover:text-pink-600 transition-colors">
              Gói cưới
            </Link>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-pink-600 font-medium">{packageData.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-2xl">
              {packageData.image_url ? (
                <img 
                  src={packageData.image_url} 
                  alt={packageData.name}
                  className="w-full h-96 object-cover"
                />
              ) : (
                <div className="w-full h-96 bg-gradient-to-r from-pink-200 to-rose-200 flex items-center justify-center">
                  <div className="text-center text-pink-600">
                    <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <p>Hình ảnh gói cưới</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{packageData.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-2 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="font-medium">{packageData.guest_count} khách</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-2 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="font-medium">{getVenueTypeLabel(packageData.venue_type)}</span>
                </div>
              </div>
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-600 mb-6">
                {formatPrice(packageData.price)}
              </div>
            </div>

            <Separator.Root className="bg-pink-200 h-px" />

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Mô tả gói cưới</h3>
              <p className="text-gray-600 leading-relaxed">{packageData.description}</p>
            </div>

            <Separator.Root className="bg-pink-200 h-px" />

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                onClick={handleAddToCart}
                className="w-full bg-gradient-to-r from-pink-600 to-rose-600 text-white py-4 rounded-xl font-semibold hover:from-pink-700 hover:to-rose-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Thêm vào giỏ hàng
                </div>
              </button>
              
              <div className="flex gap-3">
                <Link
                  href="/contact"
                  className="flex-1 border-2 border-pink-300 text-pink-600 py-3 rounded-xl font-semibold hover:bg-pink-50 transition-colors text-center"
                >
                  Tư vấn
                </Link>
                <Link
                  href="/cart"
                  className="flex-1 border-2 border-gray-300 text-gray-600 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors text-center"
                >
                  Xem giỏ hàng
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Related Services */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Dịch vụ liên quan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedServices.map((service) => (
              <div key={service.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-pink-100">
                {service.image_url && (
                  <img 
                    src={service.image_url} 
                    alt={service.name}
                    className="w-full h-40 object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{service.name}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{service.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-pink-600">
                      {formatPrice(service.price)}
                    </span>
                    <button
                      onClick={() => handleAddServiceToCart(service)}
                      className="px-3 py-1 bg-pink-100 text-pink-600 rounded-lg hover:bg-pink-200 transition-colors text-sm font-medium"
                    >
                      Thêm
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}