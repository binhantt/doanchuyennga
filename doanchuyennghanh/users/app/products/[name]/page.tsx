'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Product } from '../../../features/products/types';
import { productsApi } from '../../../features/products/api/productsApi';
import { useCartStore } from '../../../features/cart/store/useCartStore';
import { createSlug, formatPrice } from '../../../lib/utils';
import * as Separator from '@radix-ui/react-separator';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addItem } = useCartStore();
  const [productData, setProductData] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        setLoading(true);
        const products = await productsApi.getProducts();
        
        // Find product by name slug
        const productName = decodeURIComponent(params.name as string);
        const product = products.find(p => {
          const slug = createSlug(p.name);
          const normalizedInput = productName.toLowerCase().trim();
          const normalizedName = p.name.toLowerCase().trim();
          
          return (
            slug === normalizedInput || 
            normalizedName === normalizedInput ||
            normalizedName.includes(normalizedInput) ||
            normalizedInput.includes(normalizedName)
          );
        });
        
        if (!product) {
          setError(`Không tìm thấy sản phẩm với tên: "${productName}"`);
          return;
        }

        setProductData(product);
        
        // Get related products (same category or random)
        const related = products
          .filter(p => p.id !== product.id && Boolean(p.is_available))
          .slice(0, 6);
        setRelatedProducts(related);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Có lỗi xảy ra khi tải dữ liệu');
      } finally {
        setLoading(false);
      }
    };

    if (params.name) {
      fetchProductDetail();
    }
  }, [params.name]);

  const handleAddToCart = () => {
    if (productData) {
      addItem({
        type: 'product',
        itemId: productData.id,
        name: productData.name,
        price: typeof productData.price === 'string' ? parseFloat(productData.price) : productData.price,
        image_url: productData.image_url,
        description: productData.description
      });
      
      router.push('/cart');
    }
  };

  const handleAddRelatedToCart = (product: Product) => {
    addItem({
      type: 'product',
      itemId: product.id,
      name: product.name,
      price: typeof product.price === 'string' ? parseFloat(product.price) : product.price,
      image_url: product.image_url,
      description: product.description
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-pink-600 mx-auto mb-6"></div>
          <p className="text-gray-600 text-lg">Đang tải chi tiết sản phẩm...</p>
        </div>
      </div>
    );
  }

  if (error || !productData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Không tìm thấy sản phẩm</h2>
          <p className="text-red-600 mb-4">{error}</p>
          <Link 
            href="/products"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-600 to-rose-600 text-white font-semibold rounded-lg hover:from-pink-700 hover:to-rose-700 transition-all"
          >
            Quay lại danh sách
          </Link>
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
            <Link href="/products" className="text-gray-500 hover:text-pink-600 transition-colors">
              Sản phẩm
            </Link>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-pink-600 font-medium">{productData.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-2xl">
              {productData.image_url ? (
                <img 
                  src={productData.image_url} 
                  alt={productData.name}
                  className="w-full h-96 object-cover"
                />
              ) : (
                <div className="w-full h-96 bg-gradient-to-r from-purple-200 to-pink-200 flex items-center justify-center">
                  <div className="text-center text-purple-600">
                    <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    <p>Hình ảnh sản phẩm</p>
                  </div>
                </div>
              )}
              
              {/* Availability Badge */}
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  Boolean(productData.is_available) 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {Boolean(productData.is_available) ? 'Còn hàng' : 'Hết hàng'}
                </span>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{productData.name}</h1>
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-6">
                {formatPrice(typeof productData.price === 'string' ? parseFloat(productData.price) : productData.price)}
              </div>
            </div>

            <Separator.Root className="bg-pink-200 h-px" />

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Mô tả sản phẩm</h3>
              <p className="text-gray-600 leading-relaxed">{productData.description}</p>
            </div>

            <Separator.Root className="bg-pink-200 h-px" />

            {/* Product Info */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-gray-50 p-3 rounded-lg">
                <span className="text-gray-500">Danh mục:</span>
                <p className="font-medium">
                  {productData.category_name || 'Chưa phân loại'}
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <span className="text-gray-500">Trạng thái:</span>
                <p className={`font-medium ${Boolean(productData.is_available) ? 'text-green-600' : 'text-red-600'}`}>
                  {Boolean(productData.is_available) ? 'Còn hàng' : 'Hết hàng'}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                onClick={handleAddToCart}
                disabled={!Boolean(productData.is_available)}
                className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${
                  Boolean(productData.is_available)
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  {Boolean(productData.is_available) ? 'Thêm vào giỏ hàng' : 'Hết hàng'}
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

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Sản phẩm liên quan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-pink-100">
                {product.image_url && (
                  <img 
                    src={product.image_url} 
                    alt={product.name}
                    className="w-full h-40 object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-purple-600">
                      {formatPrice(typeof product.price === 'string' ? parseFloat(product.price) : product.price)}
                    </span>
                    <div className="flex gap-2">
                      <Link
                        href={`/products/${createSlug(product.name)}`}
                        className="px-2 py-1 border border-purple-300 text-purple-600 rounded text-xs hover:bg-purple-50 transition-colors"
                      >
                        Xem
                      </Link>
                      <button
                        onClick={() => handleAddRelatedToCart(product)}
                        disabled={!Boolean(product.is_available)}
                        className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                          Boolean(product.is_available)
                            ? 'bg-purple-100 text-purple-600 hover:bg-purple-200'
                            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        {Boolean(product.is_available) ? 'Thêm' : 'Hết'}
                      </button>
                    </div>
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