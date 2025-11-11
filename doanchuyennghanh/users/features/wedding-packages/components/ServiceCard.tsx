'use client';

import { Service } from '../types';
import { useWeddingStore } from '../store/useWeddingStore';
import * as Separator from '@radix-ui/react-separator';

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const { selection, toggleService } = useWeddingStore();
  const isSelected = selection.selectedServices.some(s => s.id === service.id);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <div 
      className={`group relative bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-1 ${
        isSelected 
          ? 'ring-2 ring-rose-400 ring-opacity-50 border-2 border-rose-400' 
          : 'border border-gray-200 hover:border-rose-300'
      } ${!service.is_available ? 'opacity-60 cursor-not-allowed' : ''}`}
      onClick={() => service.is_available && toggleService(service)}
    >
      {/* Selection Badge */}
      {isSelected && (
        <div className="absolute top-3 right-3 z-10">
          <div className="bg-gradient-to-r from-rose-500 to-pink-500 text-white p-1 rounded-full">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
      )}

      {/* Unavailable Badge */}
      {!service.is_available && (
        <div className="absolute top-3 left-3 z-10">
          <div className="bg-gray-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
            Hết hàng
          </div>
        </div>
      )}

      {/* Image */}
      {service.image_url && (
        <div className="relative overflow-hidden">
          <img 
            src={service.image_url} 
            alt={service.name}
            className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
        </div>
      )}
      
      {/* Content */}
      <div className="p-4">
        <div className="mb-3">
          <h4 className="font-bold text-gray-900 mb-1 group-hover:text-rose-600 transition-colors">
            {service.name}
          </h4>
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
            {service.description}
          </p>
        </div>
        
        <Separator.Root className="bg-rose-200 h-px my-3" />
        
        {/* Price and Status */}
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-600">
            {formatPrice(service.price)}
          </div>
          
          {service.is_available ? (
            <div className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
              isSelected 
                ? 'bg-rose-500 text-white' 
                : 'bg-rose-100 text-rose-600 group-hover:bg-rose-500 group-hover:text-white'
            }`}>
              {isSelected ? 'Đã chọn' : 'Thêm'}
            </div>
          ) : (
            <div className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-200 text-gray-500">
              Không khả dụng
            </div>
          )}
        </div>
      </div>
    </div>
  );
}