import { useState } from "react";
import { useParams, Link } from "react-router";
import { AppLayout, PageContainer, ResponsiveGrid } from "~/components/layout/responsive-layout";
import { Button } from "~/components/ui/button";
import { useTrainByCode } from "~/lib/api/hooks/use-trains";
import { useProductsByStation } from "~/lib/api/hooks/use-products";
import { formatPrice } from "~/lib/demo/trains";

export default function TrainDetailsPage() {
  const { trainCode } = useParams();

  // Fetch train data using React Query
  const { data: train, isLoading, error } = useTrainByCode(trainCode || '');

  // For products, we'll need a station code - using default for now since the API structure changed
  const { data: productsResponse } = useProductsByStation('HAN', {
    trainCode: trainCode || 'SE1',
  });

  if (isLoading) {
    return (
      <AppLayout headerProps={{ showBackButton: true, title: "Thông tin chuyến tàu" }}>
        <PageContainer>
          <div className="text-center py-12">
            <div className="text-4xl mb-4">⏳</div>
            <p className="text-gray-800">Đang tải thông tin chuyến tàu...</p>
          </div>
        </PageContainer>
      </AppLayout>
    );
  }

  if (error || !train) {
    return (
      <AppLayout headerProps={{ showBackButton: true, title: "Thông tin chuyến tàu" }}>
        <PageContainer>
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🚄</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Không tìm thấy thông tin chuyến tàu
            </h1>
            <p className="text-gray-800 mb-6">
              Mã tàu "{trainCode}" không tồn tại trong hệ thống.
            </p>
            <Link to="/browse">
              <Button variant="train">
                Khám phá thực đơn
              </Button>
            </Link>
          </div>
        </PageContainer>
      </AppLayout>
    );
  }

  const availableProducts = productsResponse?.data || [];

  return (
    <AppLayout headerProps={{ showBackButton: true, title: `Chuyến tàu ${train.trainCode}` }}>
      <PageContainer>
        {/* Train Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {train.trainCode} - {train.name}
              </h1>
              <div className="flex items-center gap-4 text-sm text-gray-800 mt-2">
                <span className="flex items-center gap-1">
                  🚄 {train.type}
                </span>
                <span className="flex items-center gap-1">
                  📏 {train.route.totalDistance} km
                </span>
                <span className="flex items-center gap-1">
                  ⏱️ {Math.floor(train.route.estimatedDuration / 60)}h {train.route.estimatedDuration % 60}m
                </span>
                <span className="flex items-center gap-1">
                  🚃 {train.carriages} toa
                </span>
              </div>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              train.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
            }`}>
              {train.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
            </div>
          </div>

          {/* Route Info */}
          <div className="grid md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Điểm khởi hành</h3>
              <p className="text-gray-700">{train.route.origin || 'N/A'}</p>
              <p className="text-sm text-gray-800">
                Ga đầu tuyến
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Điểm đến</h3>
              <p className="text-gray-700">{train.route.destination || 'N/A'}</p>
              <p className="text-sm text-gray-800">
                Ga cuối tuyến
              </p>
            </div>
          </div>

          {/* Train Details */}
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Thông tin tàu</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Sức chứa:</span>
                <span className="ml-2 font-medium">{train.capacity} hành khách</span>
              </div>
              <div>
                <span className="text-gray-600">Số toa:</span>
                <span className="ml-2 font-medium">{train.carriages} toa</span>
              </div>
              <div>
                <span className="text-gray-600">Loại tàu:</span>
                <span className="ml-2 font-medium">{train.type}</span>
              </div>
            </div>
            {train.description && (
              <div className="mt-3">
                <span className="text-gray-600">Mô tả:</span>
                <p className="mt-1 text-gray-700">{train.description}</p>
              </div>
            )}
          </div>
        </div>

        {/* Services */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Dịch vụ trên tàu</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {train.facilities.length > 0 ? (
              train.facilities.map((facility: string, index: number) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {facility}
                </span>
              ))
            ) : (
              <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                Đang cập nhật thông tin dịch vụ
              </span>
            )}
          </div>

          {/* Food Service Info */}
          <div className="p-4 bg-orange-50 rounded-lg">
            <h3 className="font-semibold text-orange-900 mb-2">
              🍽️ Dịch vụ ăn uống
            </h3>
            <div className="space-y-2">
              <p className="text-orange-800">
                ✅ Có dịch vụ ăn uống
              </p>
              <p className="text-orange-700 text-sm">
                📋 Menu đầy đủ có sẵn
              </p>
              <p className="text-orange-700 text-sm">
                📍 Đặt hàng trực tuyến từ ứng dụng
              </p>
              {availableProducts.length > 0 && (
                <p className="text-orange-700 text-sm">
                  🍽️ {availableProducts.length} sản phẩm có sẵn
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Available Products */}
        {availableProducts.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Sản phẩm có sẵn</h2>
            <p className="text-gray-600 mb-4">
              Các món ăn và đồ uống có thể đặt trên chuyến tàu này:
            </p>
            <ResponsiveGrid
              cols={{ default: 1, md: 2, lg: 3 }}
              gap="md"
            >
              {availableProducts.slice(0, 6).map((product: any) => (
                <div key={product.id} className="p-3 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900">{product.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">{product.description || 'Sản phẩm chất lượng'}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-semibold text-green-600">
                      {formatPrice(product.price)}
                    </span>
                    <span className="text-xs text-gray-500">
                      {product.vendor?.name || 'Nhà cung cấp'}
                    </span>
                  </div>
                </div>
              ))}
            </ResponsiveGrid>
            {availableProducts.length > 6 && (
              <div className="mt-4 text-center">
                <Link to="/browse">
                  <Button variant="outline">
                    Xem thêm {availableProducts.length - 6} sản phẩm
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Route Information */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Thông tin tuyến đường</h2>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
                <div>
                  <h3 className="font-semibold text-gray-900">Ga khởi hành</h3>
                  <p className="text-gray-700">{train.route.origin || 'N/A'}</p>
                </div>
              </div>

              <div className="flex-1 flex items-center justify-center">
                <div className="h-0.5 bg-gray-300 flex-1 mx-4"></div>
                <span className="text-sm text-gray-600 px-2">
                  {train.route.totalDistance} km
                </span>
                <div className="h-0.5 bg-gray-300 flex-1 mx-4"></div>
              </div>

              <div className="flex items-center gap-4">
                <div>
                  <h3 className="font-semibold text-gray-900 text-right">Ga đích</h3>
                  <p className="text-gray-700 text-right">{train.route.destination || 'N/A'}</p>
                </div>
                <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
              </div>
            </div>

            <div className="text-center text-sm text-gray-600">
              <p>Thời gian ước tính: {Math.floor(train.route.estimatedDuration / 60)}h {train.route.estimatedDuration % 60}m</p>
              <p className="mt-1">
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                  🍽️ Có dịch vụ ăn uống trên tàu
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center p-8 bg-white rounded-lg shadow">
          <div className="text-4xl mb-4">🎫</div>
          <h3 className="text-xl font-semibold mb-2">Đã có vé cho chuyến tàu này?</h3>
          <p className="text-gray-800 mb-4">
            Quét mã QR trên vé để bắt đầu đặt món ăn
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/">
              <Button variant="train" size="lg">
                📱 Quét QR vé tàu
              </Button>
            </Link>
            <Link to="/browse">
              <Button variant="outline" size="lg">
                🍽️ Duyệt menu tổng quát
              </Button>
            </Link>
          </div>
        </div>
      </PageContainer>
    </AppLayout>
  );
}