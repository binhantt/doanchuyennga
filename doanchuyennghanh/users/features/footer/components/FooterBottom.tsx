"use client";

export default function FooterBottom() {
  return (
    <div className="border-t border-pink-200 pt-8">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="text-gray-500 text-sm mb-4 md:mb-0">
          © 2025 <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-600 font-semibold">Wedding Paradise</span>. All rights reserved.
        </div>
        <div className="flex space-x-6 text-sm">
          <a href="#" className="text-gray-500 hover:text-pink-600 transition-colors">
            Chính sách bảo mật
          </a>
          <a href="#" className="text-gray-500 hover:text-pink-600 transition-colors">
            Điều khoản sử dụng
          </a>
          <a href="#" className="text-gray-500 hover:text-pink-600 transition-colors">
            Hỗ trợ
          </a>
        </div>
      </div>
    </div>
  );
}