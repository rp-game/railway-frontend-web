import { useState } from "react";
import { Link } from "react-router";
import { AppLayout, PageContainer, ResponsiveGrid } from "~/components/layout/responsive-layout";
import { Button } from "~/components/ui/button";
import { demoTrains, getTrainsByType, getAvailableTrains, formatDuration, formatPrice, type DemoTrain } from "~/lib/demo/trains";

export default function TrainsPage() {
  const [filterType, setFilterType] = useState<'all' | 'SE' | 'TN' | 'SNT'>('all');
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(true);

  const filteredTrains = (() => {
    let trains = showOnlyAvailable ? getAvailableTrains() : demoTrains;

    if (filterType !== 'all') {
      trains = trains.filter(train => train.trainType === filterType);
    }

    return trains;
  })();

  return (
    <AppLayout headerProps={{ showBackButton: true, title: "Danh sách chuyến tàu" }}>
      <PageContainer>
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Các chuyến tàu có dịch vụ ăn uống
          </h1>
          <p className="text-gray-800 max-w-2xl mx-auto">
            Khám phá các chuyến tàu trên tuyến đường sắt Việt Nam có dịch vụ đặt món ăn
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="space-y-4">
            {/* Train Type Filter */}
            <div>
              <h3 className="font-semibold mb-3">Loại tàu</h3>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={filterType === 'all' ? 'train' : 'outline'}
                  onClick={() => setFilterType('all')}
                  size="sm"
                >
                  Tất cả
                </Button>
                <Button
                  variant={filterType === 'SE' ? 'train' : 'outline'}
                  onClick={() => setFilterType('SE')}
                  size="sm"
                >
                  SE - Thống Nhất
                </Button>
                <Button
                  variant={filterType === 'TN' ? 'train' : 'outline'}
                  onClick={() => setFilterType('TN')}
                  size="sm"
                >
                  TN - Tàu Nhanh
                </Button>
                <Button
                  variant={filterType === 'SNT' ? 'train' : 'outline'}
                  onClick={() => setFilterType('SNT')}
                  size="sm"
                >
                  SNT - Sài Gòn Nha Trang
                </Button>
              </div>
            </div>

            {/* Availability Filter */}
            <div>
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={showOnlyAvailable}
                  onChange={(e) => setShowOnlyAvailable(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  Chỉ hiển thị tàu còn chỗ
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-800">
            Tìm thấy {filteredTrains.length} chuyến tàu
          </p>
        </div>

        {/* Trains List */}
        {filteredTrains.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg">
            <div className="text-4xl mb-4">🚄</div>
            <h3 className="text-xl font-semibold mb-2">Không tìm thấy chuyến tàu nào</h3>
            <p className="text-gray-800 mb-4">
              Thử thay đổi bộ lọc để xem thêm chuyến tàu khác
            </p>
            <Button
              onClick={() => {
                setFilterType('all');
                setShowOnlyAvailable(false);
              }}
              variant="outline"
            >
              Xem tất cả chuyến tàu
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTrains.map((train) => (
              <TrainCard key={train.trainId} train={train} />
            ))}
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-12 text-center p-8 bg-white rounded-lg shadow">
          <div className="text-4xl mb-4">📱</div>
          <h3 className="text-xl font-semibold mb-2">Sẵn sàng đặt món?</h3>
          <p className="text-gray-800 mb-4">
            Quét mã QR trên vé tàu để bắt đầu đặt món ăn cho chuyến đi
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/">
              <Button variant="train" size="lg">
                📱 Quét QR vé tàu
              </Button>
            </Link>
            <Link to="/browse">
              <Button variant="outline" size="lg">
                🍽️ Khám phá thực đơn
              </Button>
            </Link>
          </div>
        </div>
      </PageContainer>
    </AppLayout>
  );
}

// Train Card Component
function TrainCard({ train }: { train: DemoTrain }) {
  return (
    <Link to={`/trains/${train.trainCode}`}>
      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Train Info */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-xl font-bold text-blue-600">
                {train.trainCode}
              </h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                train.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {train.available ? 'Còn chỗ' : 'Hết chỗ'}
              </span>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                {train.trainType}
              </span>
            </div>

            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              {train.routeName}
            </h4>

            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-800">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span>🔼</span>
                  <span className="font-medium">{train.departureStation.name}</span>
                </div>
                <div className="ml-6">
                  {new Date(train.departureTime).toLocaleString('vi-VN')}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span>🔽</span>
                  <span className="font-medium">{train.arrivalStation.name}</span>
                </div>
                <div className="ml-6">
                  {new Date(train.arrivalTime).toLocaleString('vi-VN')}
                </div>
              </div>
            </div>
          </div>

          {/* Journey Info */}
          <div className="text-center md:text-right">
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {formatDuration(train.duration)}
            </div>
            <div className="text-sm text-gray-800 mb-2">
              {train.distance} km
            </div>

            {/* Food Service Status */}
            <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
              train.foodService.available
                ? 'bg-orange-100 text-orange-800'
                : 'bg-gray-100 text-gray-800'
            }`}>
              <span>🍽️</span>
              <span>
                {train.foodService.available
                  ? train.foodService.menuAvailable
                    ? 'Menu đầy đủ'
                    : 'Menu giới hạn'
                  : 'Không có'
                }
              </span>
            </div>
          </div>

          {/* Price Range */}
          <div className="text-center">
            <div className="text-sm text-gray-800 mb-1">Giá vé từ</div>
            <div className="text-lg font-bold text-green-600">
              {formatPrice(train.ticketPrices.hardSeat)}
            </div>
            <div className="text-xs text-gray-700">
              {train.stops.length} điểm dừng
            </div>
          </div>
        </div>

        {/* Train Services */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex flex-wrap gap-2">
            {train.services.slice(0, 4).map((service: string, index: number) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
              >
                {service}
              </span>
            ))}
            {train.services.length > 4 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                +{train.services.length - 4} khác
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}