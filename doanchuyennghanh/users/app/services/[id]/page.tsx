'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useClientCart } from '../../../features/cart/hooks/useClientCart';
import { createSlug, formatPrice } from '../../../lib/utils';
import * as Separator from '@radix-ui/react-separator';

interface Service {
  id: number;
  name: string;
  description: string;
  price: number | string;
  image_url?: string;
  category_id?: number;
  category_name?: string;
  is_available: boolean | number;
  features?: string[];
  duration?: string;
  max_guests?: number;
  created_at?: string;
  updated_at?: string;
}

export default function ServiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addItem, hasItem, isHydrated } = useClientCart();
  const [serviceData, setServiceData] = useState<Service | null>(null);
  const [relatedServices, setRelatedServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchServiceDetail = async () => {
      try {
        setLoading(true);
        const serviceId = params.id as string;
        
        // Fetch service detail
        const response = await fetch(`http://localhost:3000/api/users/services/${serviceId}`);
        const data = await response.json();
        
        if (!response.ok) {
          setError(data.error || 'Không tìm thấy dịch vụ');
          return;
        }

        setServiceData(data.data);

        // Fetch related services
        const relatedResponse = await fetch('http://localhost:3000/api/users/services/available');
        const relatedData = await relatedResponse.json();
        
        if (relatedResponse.ok) {
          const related = relatedData.data
            .filter((s: Service) => s.id !== parseInt(serviceId))
            .slice(0, 6);
          setRelatedServices(related);
        }
      } catch (err) {
        console.error('Error fetching service:', err);
        setError('Có lỗi xảy ra khi tải dữ liệu');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchServiceDetail();
    }
  }, [params.id]);

  const handleAddToCart = () => {
    if (serviceData && isHydrated) {
      addItem({
        type: 'service',
        itemId: serviceData.id,
        name: serviceData.name,
        price: typeof serviceData.price === 'string' ? parseFloat(serviceData.price) : serviceData.price,
        image_url: serviceData.image_url,
        description: serviceData.description
      });
      router.push('/cart');
    }
  };

  const handleAddRelatedToCart = (service: Service) => {
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
          <p className="text-gray-600 text-lg">Đang tải chi tiết dịch vụ...</p>
        </div>
      </div>
    );
  }

  if (error || !serviceData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Không tìm thấy dịch vụ</h2>
          <p className="text-red-600 mb-4">{error}</p>
          <Link
            href="/wedding-packages"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-600 to-rose-600 text-white font-semibold rounded-lg hover:from-pink-700 hover:to-rose-700 transition-all"
          >
            Quay lại danh sách
          </Link>
        </div>
      </div>
    );
  }

  const isInCart = isHydrated ? hasItem('service', serviceData.id) : false;

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
              Gói cưới & Dịch vụ
            </Link>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-pink-600 font-medium">{serviceData.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-2xl">
              {serviceData.image_url ? (
                <img 
                  src={serviceData.image_url} 
                  alt={serviceData.name}
                  className="w-full h-96 object-cover"
                />
              ) : (
                <div className="w-full h-96 bg-gradient-to-r from-rose-200 to-pink-200 flex items-center justify-center">
                  <div className="text-center text-rose-600">
                    <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                    </svg>
                    <p>Hình ảnh dịch vụ</p>
                  </div>
                </div>
              )}
              
              {/* Availability Badge */}
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  Boolean(serviceData.is_available) 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {Boolean(serviceData.is_available) ? 'Có sẵn' : 'Hết chỗ'}
                </span>
              </div>

              {/* Cart Badge */}
              {isInCart && (
                <div className="absolute top-4 right-4">
                  <div className="bg-green-500 text-white p-2 rounded-full">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{serviceData.name}</h1>
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-600 mb-6">
                {formatPrice(typeof serviceData.price === 'string' ? parseFloat(serviceData.price) : serviceData.price)}
              </div>
            </div>

            <Separator.Root className="bg-pink-200 h-px" />

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Mô tả dịch vụ</h3>
              <p className="text-gray-600 leading-relaxed">{serviceData.description}</p>
            </div>

            <Separator.Root className="bg-pink-200 h-px" />

            {/* Service Info */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-gray-50 p-3 rounded-lg">
                <span className="text-gray-500">Danh mục:</span>
                <p className="font-medium">
                  {serviceData.category_name || 'Dịch vụ cưới'}
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <span className="text-gray-500">Trạng thái:</span>
                <p className={`font-medium ${Boolean(serviceData.is_available) ? 'text-green-600' : 'text-red-600'}`}>
                  {Boolean(serviceData.is_available) ? 'Có sẵn' : 'Hết chỗ'}
                </p>
              </div>
              {serviceData.duration && (
                <div className="bg-gray-50 p-3 rounded-lg">
                  <span className="text-gray-500">Thời gian:</span>
                  <p className="font-medium">{serviceData.duration}</p>
                </div>
              )}
              {serviceData.max_guests && (
                <div className="bg-gray-50 p-3 rounded-lg">
                  <span className="text-gray-500">Số khách tối đa:</span>
                  <p className="font-medium">{serviceData.max_guests} khách</p>
                </div>
              )}
            </div>

            {/* Features */}
            {serviceData.features && serviceData.features.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Tính năng bao gồm</h3>
                <ul className="space-y-2">
                  {serviceData.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Separator.Root className="bg-pink-200 h-px" />

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                onClick={handleAddToCart}
                disabled={!Boolean(serviceData.is_available)}
                className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${
                  Boolean(serviceData.is_available)
                    ? isInCart
                      ? 'bg-green-100 text-green-600 cursor-default'
                      : 'bg-gradient-to-r from-rose-600 to-pink-600 text-white hover:from-rose-700 hover:to-pink-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  {!Boolean(serviceData.is_available) 
                    ? 'Hết chỗ' 
                    : isInCart 
                    ? 'Đã thêm vào giỏ' 
                    : 'Thêm vào giỏ hàng'
                  }
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
        {relatedServices.length > 0 && (
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
                      <span className="text-lg font-bold text-rose-600">
                        {formatPrice(typeof service.price === 'string' ? parseFloat(service.price) : service.price)}
                      </span>
                      <div className="flex gap-2">
                        <Link
                          href={`/services/${service.id}`}
                          className="px-2 py-1 border border-pink-300 text-pink-600 rounded text-xs hover:bg-pink-50 transition-colors"
                        >
                          Xem
                        </Link>
                        <button
                          onClick={() => handleAddRelatedToCart(service)}
                          disabled={!Boolean(service.is_available)}
                          className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                            Boolean(service.is_available)
                              ? 'bg-rose-100 text-rose-600 hover:bg-rose-200'
                              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                          }`}
                        >
                          {Boolean(service.is_available) ? 'Thêm' : 'Hết'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}