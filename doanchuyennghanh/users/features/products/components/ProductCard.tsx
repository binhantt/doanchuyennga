'use client';

import Link from 'next/link';
import { Product } from '../types';
import { useHydratedCartStore } from '../../cart/hooks/useCartPersistence';
import { createSlug, formatPrice } from '../../../lib/utils';
import * as Separator from '@radix-ui/react-separator';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem, hasItem, isHydrated } = useHydratedCartStore();
  const isInCart = isHydrated ? hasItem('product', product.id) : false;



  const handleAddToCart = () => {
    addItem({
      type: 'product',
      itemId: product.id,
      name: product.name,
      price: typeof product.price === 'string' ? parseFloat(product.price) : product.price,
      image_url: product.image_url,
      description: product.description
    });
  };

  return (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-pink-100 hover:border-pink-300 transform hover:-translate-y-1">
      {/* Image */}
      {product.image_url && (
        <div className="relative overflow-hidden">
          <img 
            src={product.image_url} 
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          
          {/* Availability Badge */}
          {!Boolean(product.is_available) && (
            <div className="absolute top-3 left-3">
              <span className="bg-gray-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                Hết hàng
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
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
            {product.description}
          </p>
        </div>
        
        <Separator.Root className="bg-pink-200 h-px my-4" />
        
        {/* Price and Actions */}
        <div className="space-y-3">
          <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-600">
            {formatPrice(typeof product.price === 'string' ? parseFloat(product.price) : product.price)}
          </div>
          
          <div className="flex gap-2">
            <Link
              href={`/products/${createSlug(product.name)}`}
              className="flex-1 px-3 py-2 border-2 border-pink-300 text-pink-600 rounded-lg hover:bg-pink-50 transition-colors text-center text-sm font-medium"
            >
              Xem chi tiết
            </Link>
            <button
              onClick={handleAddToCart}
              disabled={!Boolean(product.is_available) || isInCart}
              className={`flex-1 px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                !Boolean(product.is_available)
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : isInCart
                  ? 'bg-green-100 text-green-600 cursor-default'
                  : 'bg-gradient-to-r from-pink-600 to-rose-600 text-white hover:from-pink-700 hover:to-rose-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
              }`}
            >
              {!Boolean(product.is_available) 
                ? 'Hết hàng' 
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
}