'use client';

import Link from 'next/link';
import * as Separator from '@radix-ui/react-separator';

export default function AboutPage() {
  const stats = [
    { number: '500+', label: 'Đám cưới thành công' },
    { number: '5+', label: 'Năm kinh nghiệm' },
    { number: '50+', label: 'Đối tác tin cậy' },
    { number: '98%', label: 'Khách hàng hài lòng' }
  ];

  const team = [
    {
      name: 'Nguyễn Thị Hoa',
      role: 'Giám đốc điều hành',
      image: '/team/ceo.jpg',
      description: 'Với hơn 10 năm kinh nghiệm trong ngành tổ chức sự kiện'
    },
    {
      name: 'Trần Văn Nam',
      role: 'Trưởng phòng tư vấn',
      image: '/team/consultant.jpg',
      description: 'Chuyên gia tư vấn gói cưới và dịch vụ'
    },
    {
      name: 'Lê Thị Mai',
      role: 'Trưởng phòng thiết kế',
      image: '/team/designer.jpg',
      description: 'Chuyên về thiết kế và trang trí không gian cưới'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-pink-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-16 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Về
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-600"> Chúng Tôi</span>
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Chúng tôi là đội ngũ chuyên nghiệp với niềm đam mê tạo nên những ngày cưới hoàn hảo
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Câu chuyện của chúng tôi</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Được thành lập từ năm 2019, chúng tôi bắt đầu với một ước mơ đơn giản: 
                tạo nên những ngày cưới đáng nhớ nhất trong cuộc đời mỗi cặp đôi.
              </p>
              <p>
                Với đội ngũ chuyên nghiệp và kinh nghiệm nhiều năm trong ngành tổ chức sự kiện, 
                chúng tôi đã đồng hành cùng hơn 500 cặp đôi trong hành trình tạo nên ngày trọng đại của họ.
              </p>
              <p>
                Chúng tôi tin rằng mỗi đám cưới đều có câu chuyện riêng, và sứ mệnh của chúng tôi 
                là biến những câu chuyện đó thành hiện thực một cách hoàn hảo nhất.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-r from-pink-400 to-rose-400 rounded-2xl p-8 text-white text-center">
              <div className="text-6xl mb-4">💕</div>
              <h3 className="text-2xl font-bold mb-2">Sứ mệnh</h3>
              <p className="text-pink-100">
                Tạo nên những khoảnh khắc đáng nhớ nhất trong cuộc đời bạn với sự chuyên nghiệp và tận tâm
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-pink-100 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Thành tựu của chúng tôi</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Giá trị cốt lõi</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-pink-100 text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Tận tâm</h3>
              <p className="text-gray-600">
                Chúng tôi đặt trái tim vào từng chi tiết nhỏ để tạo nên sự hoàn hảo
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-pink-100 text-center">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Chuyên nghiệp</h3>
              <p className="text-gray-600">
                Đội ngũ có kinh nghiệm và kỹ năng chuyên môn cao trong ngành
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-pink-100 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Sáng tạo</h3>
              <p className="text-gray-600">
                Luôn đổi mới và sáng tạo để mang đến những trải nghiệm độc đáo
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Đội ngũ của chúng tôi</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-pink-100 text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">
                    {member.name.charAt(0)}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-pink-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-pink-600 to-rose-600 rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Hãy để chúng tôi đồng hành cùng bạn</h2>
            <p className="text-pink-100 mb-6 max-w-2xl mx-auto">
              Với kinh nghiệm và sự tận tâm, chúng tôi cam kết mang đến cho bạn một ngày cưới hoàn hảo nhất
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center px-6 py-3 bg-white text-pink-600 font-semibold rounded-lg hover:bg-pink-50 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Liên hệ ngay
              </Link>
              <Link
                href="/wedding-packages"
                className="inline-flex items-center px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-pink-600 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Xem gói cưới
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}