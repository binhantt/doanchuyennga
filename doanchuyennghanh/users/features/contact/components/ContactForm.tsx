'use client';

import { useState } from 'react';
import * as Label from '@radix-ui/react-label';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  event_date?: string;
  guest_count?: number;
  budget?: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    event_date: '',
    guest_count: 50,
    budget: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (field: keyof ContactFormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Contact form submitted:', formData);
      setSuccess(true);
      
      // Reset form after success
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          event_date: '',
          guest_count: 50,
          budget: ''
        });
        setSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-pink-100">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Gửi thành công!</h3>
          <p className="text-gray-600">
            Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi trong vòng 24 giờ.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg border border-pink-100">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Gửi tin nhắn</h2>
        <p className="text-gray-600">
          Điền thông tin bên dưới và chúng tôi sẽ liên hệ lại với bạn sớm nhất
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label.Root className="text-sm font-medium text-gray-700 mb-2 block">
              Họ và tên *
            </Label.Root>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full px-4 py-3 border-2 border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
              placeholder="Nhập họ và tên"
            />
          </div>
          <div>
            <Label.Root className="text-sm font-medium text-gray-700 mb-2 block">
              Email *
            </Label.Root>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full px-4 py-3 border-2 border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
              placeholder="Nhập email"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label.Root className="text-sm font-medium text-gray-700 mb-2 block">
              Số điện thoại *
            </Label.Root>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="w-full px-4 py-3 border-2 border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
              placeholder="Nhập số điện thoại"
            />
          </div>
          <div>
            <Label.Root className="text-sm font-medium text-gray-700 mb-2 block">
              Chủ đề
            </Label.Root>
            <select
              value={formData.subject}
              onChange={(e) => handleInputChange('subject', e.target.value)}
              className="w-full px-4 py-3 border-2 border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
            >
              <option value="">Chọn chủ đề</option>
              <option value="wedding-package">Tư vấn gói cưới</option>
              <option value="service">Dịch vụ cưới</option>
              <option value="product">Sản phẩm</option>
              <option value="pricing">Báo giá</option>
              <option value="other">Khác</option>
            </select>
          </div>
        </div>

        {/* Event Info */}
        <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-4 rounded-xl border border-pink-200">
          <h3 className="font-semibold text-gray-900 mb-4">Thông tin sự kiện (tùy chọn)</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label.Root className="text-sm font-medium text-gray-700 mb-2 block">
                Ngày dự kiến
              </Label.Root>
              <input
                type="date"
                value={formData.event_date}
                onChange={(e) => handleInputChange('event_date', e.target.value)}
                className="w-full px-4 py-3 border-2 border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
              />
            </div>
            <div>
              <Label.Root className="text-sm font-medium text-gray-700 mb-2 block">
                Số khách mời
              </Label.Root>
              <input
                type="number"
                min="1"
                value={formData.guest_count}
                onChange={(e) => handleInputChange('guest_count', parseInt(e.target.value))}
                className="w-full px-4 py-3 border-2 border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
              />
            </div>
            <div>
              <Label.Root className="text-sm font-medium text-gray-700 mb-2 block">
                Ngân sách dự kiến
              </Label.Root>
              <select
                value={formData.budget}
                onChange={(e) => handleInputChange('budget', e.target.value)}
                className="w-full px-4 py-3 border-2 border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
              >
                <option value="">Chọn ngân sách</option>
                <option value="under-50m">Dưới 50 triệu</option>
                <option value="50m-100m">50 - 100 triệu</option>
                <option value="100m-200m">100 - 200 triệu</option>
                <option value="over-200m">Trên 200 triệu</option>
              </select>
            </div>
          </div>
        </div>

        {/* Message */}
        <div>
          <Label.Root className="text-sm font-medium text-gray-700 mb-2 block">
            Tin nhắn *
          </Label.Root>
          <textarea
            required
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            rows={5}
            className="w-full px-4 py-3 border-2 border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors resize-none"
            placeholder="Mô tả chi tiết về yêu cầu của bạn..."
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-gradient-to-r from-pink-600 to-rose-600 text-white font-semibold rounded-xl hover:from-pink-700 hover:to-rose-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Đang gửi...
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              Gửi tin nhắn
            </div>
          )}
        </button>
      </form>
    </div>
  );
}