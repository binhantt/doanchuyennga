'use client';

import { useState } from 'react';
import { ContactForm as ContactFormType } from '../types';
import * as Label from '@radix-ui/react-label';
import * as Separator from '@radix-ui/react-separator';

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormType>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (field: keyof ContactFormType, value: string) => {
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
      
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-pink-100 text-center">
        <div className="text-6xl mb-4">💌</div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Gửi thành công!</h3>
        <p className="text-gray-600 mb-6">
          Cảm ơn bạn đã liên hệ với chúng tôi. Chúng tôi sẽ phản hồi trong thời gian sớm nhất.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="px-6 py-2 bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-lg hover:from-pink-700 hover:to-rose-700 transition-all"
        >
          Gửi tin nhắn khác
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg border border-pink-100">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
          <svg className="w-6 h-6 mr-2 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Gửi tin nhắn
        </h3>
        <p className="text-gray-600">
          Điền thông tin bên dưới và chúng tôi sẽ liên hệ lại với bạn sớm nhất
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
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
              Chủ đề *
            </Label.Root>
            <select
              required
              value={formData.subject}
              onChange={(e) => handleInputChange('subject', e.target.value)}
              className="w-full px-4 py-3 border-2 border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
            >
              <option value="">Chọn chủ đề</option>
              <option value="wedding-package">Tư vấn gói cưới</option>
              <option value="service">Dịch vụ thêm</option>
              <option value="pricing">Báo giá</option>
              <option value="booking">Đặt lịch hẹn</option>
              <option value="other">Khác</option>
            </select>
          </div>
        </div>

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
            placeholder="Nhập tin nhắn của bạn..."
          />
        </div>

        <Separator.Root className="bg-pink-200 h-px" />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-pink-600 to-rose-600 text-white py-4 rounded-xl font-semibold hover:from-pink-700 hover:to-rose-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
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