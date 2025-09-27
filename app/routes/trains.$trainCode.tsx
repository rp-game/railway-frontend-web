import { useState } from "react";
import { useParams, Link } from "react-router";
import { AppLayout, PageContainer, ResponsiveGrid } from "~/components/layout/responsive-layout";
import { Button } from "~/components/ui/button";
import { demoTrains, getTrainByCode, formatDuration, formatPrice, type DemoTrain, type DemoTrainStop } from "~/lib/demo/trains";
import { demoStations, getStationByCode } from "~/lib/demo/stations";
import { getProductsByStation } from "~/lib/demo/products";

export default function TrainDetailsPage() {
  const { trainCode } = useParams();
  const train = trainCode ? getTrainByCode(trainCode) : null;
  const [selectedStop, setSelectedStop] = useState<string | null>(null);

  if (!train) {
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

  const availableProducts = selectedStop ? getProductsByStation(selectedStop) : [];

  return (
    <AppLayout headerProps={{ showBackButton: true, title: `Chuyến tàu ${train.trainCode}` }}>
      <PageContainer>
        {/* Train Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {train.trainCode} - {train.routeName}
              </h1>
              <div className="flex items-center gap-4 text-sm text-gray-800 mt-2">
                <span className="flex items-center gap-1">
                  🚄 {train.trainType}
                </span>
                <span className="flex items-center gap-1">
                  📏 {train.distance} km
                </span>
                <span className="flex items-center gap-1">
                  ⏱️ {formatDuration(train.duration)}
                </span>
              </div>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              train.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {train.available ? 'Có sẵn' : 'Hết chỗ'}
            </div>
          </div>

          {/* Route Info */}
          <div className="grid md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Điểm khởi hành</h3>
              <p className="text-gray-700">{train.departureStation.name}</p>
              <p className="text-sm text-gray-800">
                {new Date(train.departureTime).toLocaleString('vi-VN')}
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Điểm đến</h3>
              <p className="text-gray-700">{train.arrivalStation.name}</p>
              <p className="text-sm text-gray-800">
                {new Date(train.arrivalTime).toLocaleString('vi-VN')}
              </p>
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Dịch vụ trên tàu</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {train.services.map((service: string, index: number) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
              >
                {service}
              </span>
            ))}
          </div>

          {/* Food Service Info */}
          <div className="p-4 bg-orange-50 rounded-lg">
            <h3 className="font-semibold text-orange-900 mb-2">
              🍽️ Dịch vụ ăn uống
            </h3>
            {train.foodService.available ? (
              <div className="space-y-2">
                <p className="text-orange-800">
                  ✅ Có dịch vụ ăn uống
                </p>
                <p className="text-orange-700 text-sm">
                  {train.foodService.menuAvailable
                    ? '📋 Menu đầy đủ có sẵn'
                    : '📋 Menu giới hạn'
                  }
                </p>
                <p className="text-orange-700 text-sm">
                  📍 Có thể đặt tại: {train.foodService.orderingStops.join(', ')}
                </p>
              </div>
            ) : (
              <p className="text-orange-800">❌ Không có dịch vụ ăn uống</p>
            )}
          </div>
        </div>

        {/* Ticket Prices */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Giá vé tham khảo</h2>
          <ResponsiveGrid
            cols={{ default: 2, md: 4 }}
            gap="md"
          >
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-800 mb-1">Ghế cứng</div>
              <div className="font-semibold text-gray-900">
                {formatPrice(train.ticketPrices.hardSeat)}
              </div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-800 mb-1">Ghế mềm</div>
              <div className="font-semibold text-gray-900">
                {formatPrice(train.ticketPrices.softSeat)}
              </div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-800 mb-1">Giường cứng</div>
              <div className="font-semibold text-gray-900">
                {formatPrice(train.ticketPrices.hardBerth)}
              </div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-800 mb-1">Giường mềm</div>
              <div className="font-semibold text-gray-900">
                {formatPrice(train.ticketPrices.softBerth)}
              </div>
            </div>
          </ResponsiveGrid>
        </div>

        {/* Train Stops */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Lịch trình chi tiết</h2>
          <div className="space-y-3">
            {train.stops.map((stop: DemoTrainStop, index: number) => {
              const station = getStationByCode(stop.stationCode);
              const isSelected = selectedStop === stop.stationCode;

              return (
                <div
                  key={stop.stationCode}
                  className={`p-4 rounded-lg border transition-colors cursor-pointer ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedStop(isSelected ? null : stop.stationCode)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-3 h-3 rounded-full ${
                          index === 0 || index === train.stops.length - 1
                            ? 'bg-blue-600'
                            : 'bg-gray-400'
                        }`} />
                        {index < train.stops.length - 1 && (
                          <div className="w-0.5 h-8 bg-gray-300 mt-1" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {stop.stationName} ({stop.stationCode})
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-800">
                          {stop.arrivalTime && (
                            <span>🔽 Đến: {stop.arrivalTime}</span>
                          )}
                          {stop.departureTime && (
                            <span>🔼 Đi: {stop.departureTime}</span>
                          )}
                          {stop.stopDuration > 0 && (
                            <span>⏱️ Dừng: {stop.stopDuration}p</span>
                          )}
                          {stop.platform && (
                            <span>🚉 Ga: {stop.platform}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {station?.hasKitchen && train.foodService.orderingStops.includes(stop.stationCode) && (
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                          🍽️ Có thể đặt món
                        </span>
                        <span className="text-gray-600">
                          {isSelected ? '▼' : '▶'}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Station Products */}
                  {isSelected && station?.hasKitchen && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <h4 className="font-medium mb-3">
                        Món ăn có sẵn tại {station.name}
                      </h4>
                      {availableProducts.length > 0 ? (
                        <ResponsiveGrid
                          cols={{ default: 1, md: 2 }}
                          gap="sm"
                        >
                          {availableProducts.slice(0, 4).map((product) => (
                            <div
                              key={product.productId}
                              className="p-3 bg-white border border-gray-200 rounded-lg"
                            >
                              <div className="flex justify-between items-start mb-1">
                                <h5 className="font-medium text-sm">{product.name}</h5>
                                <span className="text-green-600 font-semibold text-sm">
                                  {formatPrice(product.price)}
                                </span>
                              </div>
                              <p className="text-xs text-gray-800 line-clamp-2">
                                {product.description}
                              </p>
                            </div>
                          ))}
                        </ResponsiveGrid>
                      ) : (
                        <p className="text-gray-800 text-sm">
                          Hiện chưa có món ăn nào có sẵn tại ga này.
                        </p>
                      )}
                      {availableProducts.length > 4 && (
                        <Link
                          to={`/browse?station=${stop.stationCode}`}
                          className="inline-block mt-3"
                        >
                          <Button variant="outline" size="sm">
                            Xem thêm {availableProducts.length - 4} món
                          </Button>
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
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