import { useState, useEffect } from "react";
import { Link } from "react-router";
import { AppLayout, PageContainer, ResponsiveGrid } from "~/components/layout/responsive-layout";
import { Button } from "~/components/ui/button";
import { api } from "~/lib/api/services";
import { formatPrice } from "~/lib/demo/trains";
import { QuickAddToCart } from "~/components/cart/add-to-cart-button";
import type { DemoStation } from "~/lib/demo/stations";
import type { DemoProduct, DemoProductCategory } from "~/lib/demo/products";

export default function BrowsePage() {
  const [selectedStation, setSelectedStation] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [stationsWithKitchen, setStationsWithKitchen] = useState<DemoStation[]>([]);
  const [categories, setCategories] = useState<DemoProductCategory[]>([]);
  const [products, setProducts] = useState<DemoProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load initial data
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError(null);

        const [stationsData, categoriesData, productsData] = await Promise.all([
          api.stations.getStationsWithKitchen(),
          api.products.getCategories(),
          api.products.getAvailableProducts(),
        ]);

        setStationsWithKitchen(stationsData);
        setCategories(categoriesData);
        setProducts(productsData);
      } catch (err) {
        console.error('Failed to load browse data:', err);
        setError('Không thể tải dữ liệu. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // Filter products based on selection
  useEffect(() => {
    async function filterProducts() {
      try {
        if (selectedStation) {
          const stationProducts = await api.products.getProductsByStation(selectedStation);
          setProducts(stationProducts.filter(product => product.available && product.stockLevel > 0));
        } else if (selectedCategory) {
          const categoryProducts = await api.products.getProductsByCategory(selectedCategory);
          setProducts(categoryProducts.filter(product => product.available && product.stockLevel > 0));
        } else {
          const allProducts = await api.products.getAvailableProducts();
          setProducts(allProducts);
        }
      } catch (err) {
        console.error('Failed to filter products:', err);
      }
    }

    if (!loading) {
      filterProducts();
    }
  }, [selectedStation, selectedCategory, loading]);

  const productsToShow = products;

  return (
    <AppLayout>
      <PageContainer>
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Khám phá thực đơn
          </h1>
          <p className="text-gray-800 max-w-2xl mx-auto">
            Duyệt qua các món ăn đặc sản từ khắp các ga tàu trên tuyến đường sắt Việt Nam
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">⏳</div>
            <p className="text-gray-800">Đang tải dữ liệu...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12 bg-red-50 rounded-lg mb-8">
            <div className="text-4xl mb-4">❌</div>
            <p className="text-red-600 mb-4">{error}</p>
            <Button
              onClick={() => window.location.reload()}
              variant="outline"
            >
              Thử lại
            </Button>
          </div>
        )}

        {/* Content - only show when not loading and no error */}
        {!loading && !error && (
          <>

        {/* Station Selector */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Chọn ga tàu</h2>
          <ResponsiveGrid
            cols={{ default: 2, md: 3, lg: 6 }}
            gap="sm"
          >
            <Button
              variant={selectedStation === null ? "train" : "outline"}
              onClick={() => {
                setSelectedStation(null);
                setSelectedCategory(null);
              }}
              className="text-sm"
            >
              Tất cả ga
            </Button>
            {stationsWithKitchen.map((station) => (
              <Button
                key={station.stationCode}
                variant={selectedStation === station.stationCode ? "train" : "outline"}
                onClick={() => {
                  setSelectedStation(station.stationCode);
                  setSelectedCategory(null);
                }}
                className="text-sm"
              >
                {station.stationCode}
              </Button>
            ))}
          </ResponsiveGrid>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Danh mục món ăn</h2>
          <ResponsiveGrid
            cols={{ default: 2, md: 3, lg: 6 }}
            gap="sm"
          >
            <Button
              variant={selectedCategory === null ? "train" : "outline"}
              onClick={() => setSelectedCategory(null)}
              className="text-sm"
            >
              Tất cả
            </Button>
            {categories.map((category) => (
              <Button
                key={category.categoryId}
                variant={selectedCategory === category.categoryId ? "train" : "outline"}
                onClick={() => {
                  setSelectedCategory(category.categoryId);
                  setSelectedStation(null);
                }}
                className="text-sm flex items-center gap-1"
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </Button>
            ))}
          </ResponsiveGrid>
        </div>

        {/* Selected Station Info */}
        {selectedStation && (
          <div className="mb-8 p-4 bg-white rounded-lg shadow">
            {(() => {
              const station = stationsWithKitchen.find(s => s.stationCode === selectedStation);
              if (!station) return null;

              return (
                <div>
                  <h3 className="text-lg font-semibold text-blue-600 mb-2">
                    {station.name} ({station.stationCode})
                  </h3>
                  <p className="text-gray-800 mb-2">{station.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {station.specialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* Products Grid */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">
              Các món ăn có sẵn ({productsToShow.length})
            </h2>
          </div>

          {productsToShow.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg">
              <div className="text-4xl mb-4">🍽️</div>
              <p className="text-gray-800 mb-4">Không có món ăn nào phù hợp với bộ lọc hiện tại</p>
              <Button
                onClick={() => {
                  setSelectedStation(null);
                  setSelectedCategory(null);
                }}
                variant="outline"
              >
                Xem tất cả món ăn
              </Button>
            </div>
          ) : (
            <ResponsiveGrid
              cols={{ default: 1, md: 2, lg: 3 }}
              gap="lg"
            >
              {productsToShow.map((product) => (
                <ProductCard key={product.productId} product={product} categories={categories} />
              ))}
            </ResponsiveGrid>
          )}
        </div>

        {/* Call to Action */}
        <div className="text-center p-8 bg-white rounded-lg shadow">
          <div className="text-4xl mb-4">🚄</div>
          <h3 className="text-xl font-semibold mb-2">Sẵn sàng đặt hàng?</h3>
          <p className="text-gray-800 mb-4">
            Quét mã QR trên vé tàu để bắt đầu đặt món ăn cho chuyến đi của bạn
          </p>
          <Link to="/">
            <Button variant="train" size="lg">
              📱 Quét QR vé tàu
            </Button>
          </Link>
        </div>

        {/* Close content wrapper */}
        </>
        )}
      </PageContainer>
    </AppLayout>
  );
}

// Product Card Component
function ProductCard({ product, categories }: { product: DemoProduct; categories: DemoProductCategory[] }) {
  const category = categories.find(cat => cat.categoryId === product.categoryId);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {/* Product Image */}
      <div className="h-48 bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-2">{category?.icon || "🍽️"}</div>
          <div className="text-sm text-gray-800 px-4">
            Hình ảnh sẽ được cập nhật
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-gray-900 line-clamp-2">
            {product.name}
          </h3>
          <div className="text-right ml-2">
            <div className="font-bold text-green-600">
              {formatPrice(product.price)}
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-800 mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {product.dietaryFlags.map((flag: string, index: number) => (
            <span
              key={index}
              className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
            >
              {flag === 'vegetarian' && '🌱 Chay'}
              {flag === 'vegan' && '🌿 Thuần chay'}
              {flag === 'halal' && '☪️ Halal'}
              {flag === 'spicy' && '🌶️ Cay'}
            </span>
          ))}
        </div>

        {/* Meta Info */}
        <div className="flex justify-between items-center text-xs text-gray-700">
          <div className="flex items-center gap-3">
            <span>⏱️ {product.preparationTime}p</span>
            <span>⭐ {product.rating}</span>
          </div>
          <div>
            Có tại {product.stationCodes.length} ga
          </div>
        </div>

        {/* Available Stations */}
        <div className="mt-2 flex flex-wrap gap-1">
          {product.stationCodes.slice(0, 3).map((code: string, index: number) => (
            <span
              key={index}
              className="px-1.5 py-0.5 bg-gray-100 text-gray-700 text-xs rounded"
            >
              {code}
            </span>
          ))}
          {product.stationCodes.length > 3 && (
            <span className="px-1.5 py-0.5 bg-gray-100 text-gray-700 text-xs rounded">
              +{product.stationCodes.length - 3}
            </span>
          )}
        </div>

        {/* Add to Cart */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <QuickAddToCart
            product={product}
            defaultStation={product.stationCodes[0]}
            showQuantitySelector={false}
          />
        </div>
      </div>
    </div>
  );
}