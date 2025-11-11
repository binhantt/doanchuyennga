'use client';

import ContactForm from '../../features/contact/components/ContactForm';
import ContactInfo from '../../features/contact/components/ContactInfo';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-pink-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-16 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Liên Hệ
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-600"> Với Chúng Tôi</span>
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn tạo nên ngày cưới hoàn hảo
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <ContactForm />
          </div>

          {/* Contact Info */}
          <div>
            <ContactInfo />
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-pink-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Câu Hỏi Thường Gặp
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="border-l-4 border-pink-500 pl-4">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Làm thế nào để đặt gói cưới?
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Bạn có thể đặt gói cưới trực tuyến qua website hoặc liên hệ trực tiếp với chúng tôi qua điện thoại.
                  </p>
                </div>
                
                <div className="border-l-4 border-rose-500 pl-4">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Có thể tùy chỉnh gói cưới không?
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Có, chúng tôi cung cấp dịch vụ tùy chỉnh gói cưới theo nhu cầu và ngân sách của bạn.
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="border-l-4 border-pink-500 pl-4">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Thời gian chuẩn bị là bao lâu?
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Thông thường chúng tôi cần 2-3 tuần để chuẩn bị một đám cưới hoàn hảo.
                  </p>
                </div>
                
                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Có hỗ trợ thanh toán trả góp không?
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Có, chúng tôi hỗ trợ nhiều hình thức thanh toán linh hoạt để phù hợp với khách hàng.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-pink-600 to-rose-600 rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Sẵn sàng bắt đầu?</h2>
            <p className="text-pink-100 mb-6 max-w-2xl mx-auto">
              Hãy để chúng tôi giúp bạn tạo nên ngày cưới trong mơ với dịch vụ chuyên nghiệp và tận tâm
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:0123456789"
                className="inline-flex items-center px-6 py-3 bg-white text-pink-600 font-semibold rounded-lg hover:bg-pink-50 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Gọi ngay
              </a>
              <a
                href="/wedding-packages"
                className="inline-flex items-center px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-pink-600 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Xem gói cưới
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}