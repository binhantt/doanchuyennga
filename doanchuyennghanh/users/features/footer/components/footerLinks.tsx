"use client";

import Link from 'next/link';

export default function FooterLinks() {
  return (
    <div>
      <h4 className="text-lg font-bold text-gray-800 mb-6 flex items-center">
        <div className="w-2 h-6 bg-gradient-to-b from-pink-600 to-rose-600 rounded-full mr-3"></div>
        Liên kết nhanh
      </h4>
      <ul className="space-y-3">
        <li>
          <Link href="/" className="text-gray-600 hover:text-pink-600 transition-colors duration-300 flex items-center group">
            <svg className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            Trang chủ
          </Link>
        </li>
        <li>
          <Link href="/about" className="text-gray-600 hover:text-pink-600 transition-colors duration-300 flex items-center group">
            <svg className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            Về chúng tôi
          </Link>
        </li>
        <li>
          <Link href="/services" className="text-gray-600 hover:text-pink-600 transition-colors duration-300 flex items-center group">
            <svg className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            Dịch vụ
          </Link>
        </li>
        <li>
          <Link href="/wedding-packages" className="text-gray-600 hover:text-pink-600 transition-colors duration-300 flex items-center group">
            <svg className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            Gói cưới
          </Link>
        </li>
        <li>
          <Link href="/contact" className="text-gray-600 hover:text-pink-600 transition-colors duration-300 flex items-center group">
            <svg className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            Liên hệ
          </Link>
        </li>
      </ul>
    </div>
  );
}