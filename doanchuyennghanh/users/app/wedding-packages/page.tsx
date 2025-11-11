'use client';
import { useWeddingData } from '../../features/wedding-packages/hooks/useWeddingData';
import PackageCard from '../../features/wedding-packages/components/PackageCard';
import ServiceCard from '../../features/wedding-packages/components/ServiceCard';
import SelectionSummary from '../../features/wedding-packages/components/SelectionSummary';
import * as Tabs from '@radix-ui/react-tabs';

export default function WeddingPackagesPage() {
  const { packages, services, loading, error } = useWeddingData();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-pink-600 mx-auto mb-6"></div>
          <p className="text-gray-600 text-lg">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Có lỗi xảy ra</h2>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-pink-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Gói Cưới & 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-600"> Dịch Vụ</span>
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Chọn gói cưới hoàn hảo và các dịch vụ bổ sung để tạo nên ngày cưới trong mơ của bạn
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs.Root defaultValue="packages" className="w-full">
              {/* Tabs List */}
              <Tabs.List className="flex bg-white/80 backdrop-blur-sm p-1 rounded-2xl shadow-sm border border-pink-100 mb-8">
                <Tabs.Trigger 
                  value="packages"
                  className="flex-1 py-3 px-6 rounded-xl text-sm font-semibold transition-all duration-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-600 data-[state=active]:to-rose-600 data-[state=active]:text-white data-[state=active]:shadow-lg text-gray-600 hover:text-gray-900"
                >
                  <div className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    Gói Cưới ({packages.length})
                  </div>
                </Tabs.Trigger>
                <Tabs.Trigger 
                  value="services"
                  className="flex-1 py-3 px-6 rounded-xl text-sm font-semibold transition-all duration-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-rose-600 data-[state=active]:to-pink-600 data-[state=active]:text-white data-[state=active]:shadow-lg text-gray-600 hover:text-gray-900"
                >
                  <div className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Dịch Vụ Thêm ({services.length})
                  </div>
                </Tabs.Trigger>
              </Tabs.List>

              {/* Packages Tab */}
              <Tabs.Content value="packages" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {packages.map((pkg) => (
                    <PackageCard key={pkg.id} package={pkg} />
                  ))}
                </div>
                {packages.length === 0 && (
                  <div className="text-center py-20 bg-white/50 rounded-2xl">
                    <div className="text-6xl mb-4">💐</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Chưa có gói cưới nào</h3>
                    <p className="text-gray-500">Vui lòng quay lại sau</p>
                  </div>
                )}
              </Tabs.Content>

              {/* Services Tab */}
              <Tabs.Content value="services" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {services.map((service) => (
                    <ServiceCard key={service.id} service={service} />
                  ))}
                </div>
                {services.length === 0 && (
                  <div className="text-center py-20 bg-white/50 rounded-2xl">
                    <div className="text-6xl mb-4">🎉</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Chưa có dịch vụ nào</h3>
                    <p className="text-gray-500">Vui lòng quay lại sau</p>
                  </div>
                )}
              </Tabs.Content>
            </Tabs.Root>
          </div>

          {/* Sidebar - Selection Summary */}
          <div className="lg:col-span-1">
            <SelectionSummary />
          </div>
        </div>
      </div>
    </div>
  );
}