"use client";

export default function FooterNewsletter() {
  return (
    <div className="border-t border-pink-200 pt-12 mb-12">
      <div className="max-w-2xl mx-auto text-center">
        <h4 className="text-2xl font-bold text-gray-800 mb-4">
          Đăng ký nhận tin tức mới nhất
        </h4>
        <p className="text-gray-600 mb-6">
          Nhận thông tin về các gói cưới mới, ưu đãi đặc biệt và tips hữu ích cho ngày cưới của bạn
        </p>
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Nhập email của bạn"
            className="flex-1 px-4 py-3 bg-white border border-pink-200 rounded-lg text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors shadow-sm"
          />
          <button className="px-6 py-3 bg-gradient-to-r from-pink-600 to-rose-600 text-white font-semibold rounded-lg hover:from-pink-700 hover:to-rose-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            Đăng ký
          </button>
        </div>
      </div>
    </div>
  );
}