import type { Route } from "./+types/home";
import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { AppLayout, PageContainer, ResponsiveGrid } from "../components/layout/responsive-layout";
import { QRScanner, useQRScanner } from "../components/qr/qr-scanner";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "DSVN Food - Đặt đồ ăn trên tàu" },
    { name: "description", content: "Hệ thống đặt đồ ăn trên tàu Đường sắt Việt Nam" },
  ];
}

export default function Home() {
  const qrScanner = useQRScanner();

  const handleQRSuccess = (ticketInfo: any) => {
    console.log('QR Scan Success:', ticketInfo);
    // TODO: Redirect to train menu page
  };

  const handleQRError = (error: string) => {
    console.error('QR Scan Error:', error);
    // TODO: Show toast error
  };

  return (
    <AppLayout>
      <PageContainer>
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <span className="text-6xl mb-4 block">🚄</span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              DSVN Food
            </h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Đặt đồ ăn ngon trên tàu Đường sắt Việt Nam.
              Giao tận chỗ ngồi, thanh toán dễ dàng.
            </p>
          </div>
        </div>

        {/* Main Actions */}
        <div className="max-w-md mx-auto space-y-4">
          <Button
            onClick={qrScanner.open}
            variant="train"
            size="xl"
            className="w-full"
          >
            📱 Quét QR vé tàu để đặt hàng
          </Button>

          <div className="text-center text-gray-700">
            <span>hoặc</span>
          </div>

          <Link to="/browse">
            <Button
              variant="outline"
              size="xl"
              className="w-full"
            >
              🍽️ Duyệt menu không cần vé
            </Button>
          </Link>
        </div>

        {/* Features */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900">Nhanh chóng</h3>
            <p className="text-gray-700">
              Quét QR vé tàu để tự động điền thông tin chuyến đi
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900">Chính xác</h3>
            <p className="text-gray-700">
              Giao đúng chỗ ngồi, đúng thời gian dự kiến
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <div className="text-4xl mb-4">💳</div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900">Tiện lợi</h3>
            <p className="text-gray-700">
              Thanh toán online qua VNPay, ZaloPay, ViettelMoney
            </p>
          </div>
        </div>

        {/* Popular Trains */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Các chuyến tàu phổ biến</h2>
            <p className="text-gray-800">Khám phá các tuyến tàu có dịch vụ ăn uống</p>
          </div>

          <ResponsiveGrid
            cols={{ default: 1, md: 2, lg: 3 }}
            gap="lg"
            className="mb-8"
          >
            <Link to="/trains/SE1" className="group">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-blue-600">SE1</h3>
                  <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    Còn chỗ
                  </span>
                </div>
                <h4 className="font-semibold mb-2 text-gray-900">Sài Gòn - Hà Nội</h4>
                <div className="text-sm text-gray-800 space-y-1">
                  <div>🔼 Ga Sài Gòn - 19:00</div>
                  <div>🔽 Ga Hà Nội - 05:30 (+2 ngày)</div>
                  <div>⏱️ 34g 30p | 🍽️ Menu đầy đủ</div>
                </div>
              </div>
            </Link>

            <Link to="/trains/SE2" className="group">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-blue-600">SE2</h3>
                  <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    Còn chỗ
                  </span>
                </div>
                <h4 className="font-semibold mb-2 text-gray-900">Hà Nội - Sài Gòn</h4>
                <div className="text-sm text-gray-800 space-y-1">
                  <div>🔼 Ga Hà Nội - 19:30</div>
                  <div>🔽 Ga Sài Gòn - 06:00 (+2 ngày)</div>
                  <div>⏱️ 34g 30p | 🍽️ Menu đầy đủ</div>
                </div>
              </div>
            </Link>

            <Link to="/trains/SE3" className="group">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-blue-600">SE3</h3>
                  <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    Còn chỗ
                  </span>
                </div>
                <h4 className="font-semibold mb-2 text-gray-900">Sài Gòn - Đà Nẵng</h4>
                <div className="text-sm text-gray-800 space-y-1">
                  <div>🔼 Ga Sài Gòn - 13:00</div>
                  <div>🔽 Ga Đà Nẵng - 08:30 (+1 ngày)</div>
                  <div>⏱️ 19g 30p | 🍽️ Menu đầy đủ</div>
                </div>
              </div>
            </Link>
          </ResponsiveGrid>

          <div className="text-center">
            <Link to="/trains">
              <Button variant="outline" size="lg">
                Xem tất cả chuyến tàu
              </Button>
            </Link>
          </div>
        </div>

        {/* How it works */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-900">Cách sử dụng</h2>

          <div className="max-w-4xl mx-auto grid md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h4 className="font-semibold mb-2 text-gray-900">Quét QR vé tàu</h4>
              <p className="text-sm text-gray-700">
                Sử dụng camera điện thoại quét mã QR trên vé
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h4 className="font-semibold mb-2 text-gray-900">Chọn món ăn</h4>
              <p className="text-sm text-gray-800">
                Duyệt menu và thêm món ưa thích vào giỏ hàng
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h4 className="font-semibold mb-2 text-gray-900">Thanh toán</h4>
              <p className="text-sm text-gray-800">
                Chọn phương thức và hoàn tất thanh toán
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                4
              </div>
              <h4 className="font-semibold mb-2 text-gray-900">Nhận hàng</h4>
              <p className="text-sm text-gray-800">
                Nhân viên giao đồ ăn tận chỗ ngồi
              </p>
            </div>
          </div>
        </div>
      </PageContainer>

      {/* QR Scanner Modal */}
      <QRScanner
        isOpen={qrScanner.isOpen}
        onClose={qrScanner.close}
        onScanSuccess={handleQRSuccess}
        onScanError={handleQRError}
      />
    </AppLayout>
  );
}
