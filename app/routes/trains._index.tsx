import { useState } from "react";
import { Link } from "react-router";
import { AppLayout, PageContainer, ResponsiveGrid } from "~/components/layout/responsive-layout";
import { Button } from "~/components/ui/button";
import { useTrainsSimple } from "~/lib/api/hooks/use-trains";
import { getFormattedProductPrice } from "~/lib/utils/price";
import type { MappedTrain } from "~/lib/api/hooks/use-trains";

export default function TrainsPage() {
  const [filterType, setFilterType] = useState<'all' | 'EXPRESS' | 'FAST' | 'LOCAL'>('all');
  const [showOnlyActive, setShowOnlyActive] = useState(true);

  // Fetch trains using React Query
  const { data: trains = [], isLoading, error } = useTrainsSimple();

  const filteredTrains = (() => {
    let filteredList = trains;

    if (showOnlyActive) {
      filteredList = filteredList.filter(train => train.status === 'active');
    }

    if (filterType !== 'all') {
      filteredList = filteredList.filter(train => train.type === filterType);
    }

    return filteredList;
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

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">⏳</div>
            <p className="text-gray-800">Đang tải danh sách chuyến tàu...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12 bg-red-50 rounded-lg mb-8">
            <div className="text-4xl mb-4">❌</div>
            <p className="text-red-600 mb-4">Không thể tải danh sách chuyến tàu. Vui lòng thử lại sau.</p>
            <Button
              onClick={() => window.location.reload()}
              variant="outline"
            >
              Thử lại
            </Button>
          </div>
        )}

        {/* Content - only show when not loading and no error */}
        {!isLoading && !error && (
          <>

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
                  variant={filterType === 'EXPRESS' ? 'train' : 'outline'}
                  onClick={() => setFilterType('EXPRESS')}
                  size="sm"
                >
                  EXPRESS - Tàu Thống Nhất
                </Button>
                <Button
                  variant={filterType === 'FAST' ? 'train' : 'outline'}
                  onClick={() => setFilterType('FAST')}
                  size="sm"
                >
                  FAST - Tàu Nhanh
                </Button>
                <Button
                  variant={filterType === 'LOCAL' ? 'train' : 'outline'}
                  onClick={() => setFilterType('LOCAL')}
                  size="sm"
                >
                  LOCAL - Tàu Địa Phương
                </Button>
              </div>
            </div>

            {/* Availability Filter */}
            <div>
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={showOnlyActive}
                  onChange={(e) => setShowOnlyActive(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  Chỉ hiển thị tàu đang hoạt động
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
                setShowOnlyActive(false);
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

        {/* Close content wrapper */}
        </>
        )}
      </PageContainer>
    </AppLayout>
  );
}

// Train Card Component
function TrainCard({ train }: { train: MappedTrain }) {
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
                train.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {train.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
              </span>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                {train.type}
              </span>
            </div>

            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              {train.name}
            </h4>

            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-800">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span>🔼</span>
                  <span className="font-medium">{train.route.origin || 'N/A'}</span>
                </div>
                <div className="ml-6">
                  Ga khởi hành
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span>🔽</span>
                  <span className="font-medium">{train.route.destination || 'N/A'}</span>
                </div>
                <div className="ml-6">
                  Ga đích
                </div>
              </div>
            </div>
          </div>

          {/* Journey Info */}
          <div className="text-center md:text-right">
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {Math.floor(train.route.estimatedDuration / 60)}h {train.route.estimatedDuration % 60}m
            </div>
            <div className="text-sm text-gray-800 mb-2">
              {train.route.totalDistance} km
            </div>

            {/* Food Service Status */}
            <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-orange-100 text-orange-800">
              <span>🍽️</span>
              <span>Có dịch vụ ăn uống</span>
            </div>
          </div>

          {/* Train Details */}
          <div className="text-center">
            <div className="text-sm text-gray-800 mb-1">Sức chứa</div>
            <div className="text-lg font-bold text-green-600">
              {train.capacity} chỗ
            </div>
            <div className="text-xs text-gray-700">
              {train.carriages} toa tàu
            </div>
          </div>
        </div>

        {/* Train Facilities */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex flex-wrap gap-2">
            {train.facilities.slice(0, 4).map((facility: string, index: number) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
              >
                {facility}
              </span>
            ))}
            {train.facilities.length > 4 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                +{train.facilities.length - 4} khác
              </span>
            )}
            {train.facilities.length === 0 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                Đang cập nhật tiện ích
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}