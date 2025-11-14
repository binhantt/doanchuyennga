'use client';

import Link from 'next/link';
import { WeddingPackage } from '../types';
import { useWeddingStore } from '../store/useWeddingStore';
import { createSlug, formatPrice, getVenueTypeLabel } from '../../../lib/utils';
import * as Separator from '@radix-ui/react-separator';

interface PackageCardProps {
  package: WeddingPackage;
}

export default function PackageCard({ package: pkg }: PackageCardProps) {
  const { selection, selectPackage } = useWeddingStore();
  const isSelected = selection.selectedPackage?.id === pkg.id;



  return (
    <div 
      className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-1 ${
        isSelected 
          ? 'ring-4 ring-pink-500 ring-opacity-50 border-2 border-pink-500' 
          : 'border border-gray-200 hover:border-pink-300'
      }`}
      onClick={() => selectPackage(pkg)}
    >
      {/* Selection Badge */}
      {isSelected && (
        <div className="absolute top-4 left-4 z-10">
          <div className="bg-gradient-to-r from-pink-600 to-rose-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Đã chọn
          </div>
        </div>
      )}

      {/* Image */}
      {pkg.image_url && (
        <div className="relative overflow-hidden">
          <img 
            src={pkg.image_url} 
            alt={pkg.name}
            className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
      )}
      
      {/* Content */}
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">
            {pkg.name}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
            {pkg.description}
          </p>
        </div>
        
        {/* Package Details */}
        <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="font-medium">{pkg.guest_count} khách</span>
          </div>
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="font-medium">{getVenueTypeLabel(pkg.venue_type)}</span>
          </div>
        </div>
        
        <Separator.Root className="bg-pink-200 h-px my-4" />
        
        {/* Price and Actions */}
        <div className="space-y-3">
          <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-600">
            {formatPrice(pkg.price)}
          </div>
          
          <div className="flex gap-2">
            <Link
              href={`/wedding-packages/${createSlug(pkg.name)}`}
              className="flex-1 px-3 py-2 border-2 border-pink-300 text-pink-600 rounded-lg hover:bg-pink-50 transition-colors text-center text-sm font-medium"
            >
              Xem chi tiết
            </Link>
            <div 
              className={`flex-1 px-3 py-2 rounded-lg text-sm font-semibold transition-all text-center cursor-pointer ${
                isSelected 
                  ? 'bg-pink-600 text-white' 
                  : 'bg-pink-100 text-pink-600 group-hover:bg-pink-600 group-hover:text-white'
              }`}
              onClick={(e) => {
                e.stopPropagation();
                selectPackage(pkg);
              }}
            >
              {isSelected ? 'Đã chọn' : 'Chọn gói'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}