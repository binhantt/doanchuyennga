"use client";

export default function FooterServices() {
  return (
    <div>
      <h4 className="text-lg font-bold text-gray-800 mb-6 flex items-center">
        <div className="w-2 h-6 bg-gradient-to-b from-pink-600 to-rose-600 rounded-full mr-3"></div>
        Dịch vụ nổi bật
      </h4>
      <ul className="space-y-3">
        <li>
          <a href="#" className="text-gray-600 hover:text-pink-600 transition-colors duration-300 flex items-center group">
            <svg className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            Trang trí tiệc cưới
          </a>
        </li>
        <li>
          <a href="#" className="text-gray-600 hover:text-pink-600 transition-colors duration-300 flex items-center group">
            <svg className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            Chụp ảnh cưới
          </a>
        </li>
        <li>
          <a href="#" className="text-gray-600 hover:text-pink-600 transition-colors duration-300 flex items-center group">
            <svg className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            Makeup cô dâu
          </a>
        </li>
        <li>
          <a href="#" className="text-gray-600 hover:text-pink-600 transition-colors duration-300 flex items-center group">
            <svg className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            Âm thanh ánh sáng
          </a>
        </li>
        <li>
          <a href="#" className="text-gray-600 hover:text-pink-600 transition-colors duration-300 flex items-center group">
            <svg className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            Xe hoa
          </a>
        </li>
      </ul>
    </div>
  );
}