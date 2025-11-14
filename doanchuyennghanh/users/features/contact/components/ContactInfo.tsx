'use client';

import { ContactInfo as ContactInfoType } from '../types';
import * as Separator from '@radix-ui/react-separator';

const contactInfo: ContactInfoType = {
  address: "123 Đường ABC, Quận 1, TP.HCM",
  phone: "0123 456 789",
  email: "info@weddingservice.com",
  workingHours: "Thứ 2 - Chủ nhật: 8:00 - 22:00",
  socialMedia: {
    facebook: "https://facebook.com/weddingservice",
    instagram: "https://instagram.com/weddingservice",
    zalo: "https://zalo.me/weddingservice"
  }
};

export default function ContactInfo() {
  return (
    <div className="space-y-6">
      {/* Company Info */}
      <div className="bg-white rounded-3xl p-8 shadow-xl border border-pink-100 hover:shadow-2xl transition-all duration-300">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-600 to-rose-600 rounded-full mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 8h1m-1-4h1m4 4h1m-1-4h1" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">
            Thông tin liên hệ
          </h3>
        </div>

        <div className="space-y-6">
          {/* Address */}
          <div className="group p-4 rounded-2xl hover:bg-pink-50 transition-all duration-300">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-14 h-14 bg-pink-100 rounded-xl flex items-center justify-center mr-4 group-hover:bg-pink-200 transition-colors">
                <svg className="w-7 h-7 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 mb-2 text-lg">Địa chỉ</h4>
                <p className="text-gray-600 leading-relaxed">{contactInfo.address}</p>
              </div>
            </div>
          </div>

          {/* Phone */}
          <div className="group p-4 rounded-2xl hover:bg-rose-50 transition-all duration-300">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-14 h-14 bg-rose-100 rounded-xl flex items-center justify-center mr-4 group-hover:bg-rose-200 transition-colors">
                <svg className="w-7 h-7 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 mb-2 text-lg">Điện thoại</h4>
                <a 
                  href={`tel:${contactInfo.phone}`} 
                  className="text-rose-600 hover:text-rose-700 transition-colors font-semibold text-lg"
                >
                  {contactInfo.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="group p-4 rounded-2xl hover:bg-purple-50 transition-all duration-300">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mr-4 group-hover:bg-purple-200 transition-colors">
                <svg className="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 mb-2 text-lg">Email</h4>
                <a 
                  href={`mailto:${contactInfo.email}`} 
                  className="text-purple-600 hover:text-purple-700 transition-colors font-semibold break-all"
                >
                  {contactInfo.email}
                </a>
              </div>
            </div>
          </div>

          {/* Working Hours */}
          <div className="group p-4 rounded-2xl hover:bg-green-50 transition-all duration-300">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mr-4 group-hover:bg-green-200 transition-colors">
                <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 mb-2 text-lg">Giờ làm việc</h4>
                <p className="text-gray-600 leading-relaxed font-medium">{contactInfo.workingHours}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media */}
      <div className="bg-white rounded-3xl p-8 shadow-xl border border-pink-100 hover:shadow-2xl transition-all duration-300">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-pink-600 to-rose-600 rounded-full mb-4 shadow-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 4v10a2 2 0 002 2h6a2 2 0 002-2V8M7 8h10M7 8l-2-2m12 2l2-2" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900">
            Kết nối với chúng tôi
          </h3>
        </div>

        <div className="flex justify-center space-x-4">
          {contactInfo.socialMedia.facebook && (
            <a
              href={contactInfo.socialMedia.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center w-14 h-14 bg-blue-100 text-blue-600 rounded-xl hover:bg-blue-200 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <svg className="w-7 h-7 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
          )}

          {contactInfo.socialMedia.instagram && (
            <a
              href={contactInfo.socialMedia.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center w-14 h-14 bg-pink-100 text-pink-600 rounded-xl hover:bg-pink-200 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <svg className="w-7 h-7 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.781c-.24 0-.49-.068-.683-.205-.193-.137-.342-.342-.41-.581-.068-.24-.034-.49.103-.683.137-.193.342-.342.581-.41.24-.068.49-.034.683.103.193.137.342.342.41.581.068.24.034.49-.103.683-.137.193-.342.342-.581.41z"/>
              </svg>
            </a>
          )}

          {contactInfo.socialMedia.zalo && (
            <a
              href={contactInfo.socialMedia.zalo}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center w-14 h-14 bg-blue-100 text-blue-600 rounded-xl hover:bg-blue-200 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <svg className="w-7 h-7 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 8.16c-.169-.224-.487-.32-.686-.32-.198 0-.517.096-.686.32L12 13.44 7.804 8.16c-.169-.224-.487-.32-.686-.32-.198 0-.517.096-.686.32-.338.448-.338 1.152 0 1.6L10.4 14.88c.169.224.487.32.686.32.198 0 .517-.096.686-.32L15.74 9.76c.338-.448.338-1.152 0-1.6z"/>
              </svg>
            </a>
          )}
        </div>
      </div>

      {/* Map */}
      <div className="bg-white rounded-3xl p-8 shadow-xl border border-pink-100 hover:shadow-2xl transition-all duration-300">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-pink-600 to-rose-600 rounded-full mb-4 shadow-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900">
            Vị trí của chúng tôi
          </h3>
        </div>
        
        <div className="relative bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl h-64 flex items-center justify-center overflow-hidden border-2 border-pink-100">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ec4899' fill-opacity='0.1'%3E%3Ccircle cx='15' cy='15' r='2'/%3E%3C/g%3E%3C/svg%3E")`,
            }}></div>
          </div>
          
          <div className="relative text-center text-gray-500">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-lg mb-4">
              <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <p className="font-medium text-gray-700">Bản đồ sẽ được hiển thị tại đây</p>
            <p className="text-sm text-gray-500 mt-2">Nhấn để xem chỉ đường</p>
          </div>
        </div>
        
        {/* Quick Direction Button */}
        <div className="mt-6 text-center">
          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(contactInfo.address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-600 to-rose-600 text-white font-semibold rounded-full hover:from-pink-700 hover:to-rose-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            Xem chỉ đường
          </a>
        </div>
      </div>
    </div>
  );
}