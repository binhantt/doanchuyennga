"use client";

export default function FooterBrand() {
  return (
    <div className="lg:col-span-1">
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-pink-600 to-rose-600 rounded-full flex items-center justify-center mr-3 shadow-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-400">
            Wedding Paradise
          </h3>
        </div>
        <p className="text-gray-600 leading-relaxed mb-6">
          Tạo nên những khoảnh khắc đáng nhớ nhất trong ngày cưới của bạn với dịch vụ chuyên nghiệp và tận tâm.
        </p>
        
        {/* Social Media */}
        <div className="flex space-x-4">
          <a
            href="https://facebook.com/weddingparadise"
            target="_blank"
            rel="noopener noreferrer"
            className="group w-10 h-10 bg-white border border-pink-200 rounded-full flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <svg className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
          <a
            href="https://instagram.com/weddingparadise"
            target="_blank"
            rel="noopener noreferrer"
            className="group w-10 h-10 bg-white border border-pink-200 rounded-full flex items-center justify-center hover:bg-pink-600 hover:border-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <svg className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.781c-.24 0-.49-.068-.683-.205-.193-.137-.342-.342-.41-.581-.068-.24-.034-.49.103-.683.137-.193.342-.342.581-.41.24-.068.49-.034.683.103.193.137.342.342.41.581.068.24.034.49-.103.683-.137.193-.342.342-.581.41z"/>
            </svg>
          </a>
          <a
            href="https://zalo.me/weddingparadise"
            target="_blank"
            rel="noopener noreferrer"
            className="group w-10 h-10 bg-white border border-pink-200 rounded-full flex items-center justify-center hover:bg-blue-500 hover:border-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <svg className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 8.16c-.169-.224-.487-.32-.686-.32-.198 0-.517.096-.686.32L12 13.44 7.804 8.16c-.169-.224-.487-.32-.686-.32-.198 0-.517.096-.686.32-.338.448-.338 1.152 0 1.6L10.4 14.88c.169.224.487.32.686.32.198 0 .517-.096.686-.32L15.74 9.76c.338-.448.338-1.152 0-1.6z"/>
            </svg>
          </a>
          <a
            href="mailto:info@weddingparadise.com"
            className="group w-10 h-10 bg-white border border-pink-200 rounded-full flex items-center justify-center hover:bg-purple-600 hover:border-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <svg className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}