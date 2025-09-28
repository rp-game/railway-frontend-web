import { useState } from "react"
import { Link } from "react-router"
import { AppLayout, PageContainer, ResponsiveGrid } from "~/components/layout/responsive-layout"
import { Button } from "~/components/ui/button"
import { useCart, useCartSummary } from "~/lib/cart/hooks"
import { formatApiPrice, getEffectivePrice } from "~/lib/utils/price"
import Decimal from 'decimal.js'
import type { CartItem } from "~/lib/cart/types"
import { cn } from "~/lib/utils"

export default function CartPage() {
  const {
    cartState,
    updateCartItem,
    removeFromCart,
    clearCart,
    validateCartForCheckout,
    isLoading,
    error
  } = useCart()

  const summary = useCartSummary()
  const [updatingItems, setUpdatingItems] = useState<Set<string>>(new Set())

  const handleQuantityChange = async (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      await handleRemoveItem(itemId)
      return
    }

    setUpdatingItems(prev => new Set(prev).add(itemId))
    try {
      await updateCartItem({ itemId, quantity: newQuantity })
    } finally {
      setUpdatingItems(prev => {
        const newSet = new Set(prev)
        newSet.delete(itemId)
        return newSet
      })
    }
  }

  const handleRemoveItem = async (itemId: string) => {
    setUpdatingItems(prev => new Set(prev).add(itemId))
    try {
      await removeFromCart(itemId)
    } finally {
      setUpdatingItems(prev => {
        const newSet = new Set(prev)
        newSet.delete(itemId)
        return newSet
      })
    }
  }

  const handleClearCart = async () => {
    if (confirm("Bạn có chắc muốn xóa tất cả sản phẩm trong giỏ hàng?")) {
      await clearCart()
    }
  }

  const validation = validateCartForCheckout()

  if (summary.isEmpty) {
    return (
      <AppLayout headerProps={{ showBackButton: true, title: "Giỏ hàng" }}>
        <PageContainer>
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🛒</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Giỏ hàng trống
            </h1>
            <p className="text-gray-800 mb-6">
              Bạn chưa có sản phẩm nào trong giỏ hàng
            </p>
            <div className="space-x-4">
              <Link to="/browse">
                <Button variant="train" size="lg">
                  Khám phá thực đơn
                </Button>
              </Link>
              <Link to="/">
                <Button variant="outline" size="lg">
                  Quét QR vé tàu
                </Button>
              </Link>
            </div>
          </div>
        </PageContainer>
      </AppLayout>
    )
  }

  return (
    <AppLayout headerProps={{ showBackButton: true, title: `Giỏ hàng (${summary.totalItems})` }}>
      <PageContainer>
        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Validation Messages */}
        {(!validation.isValid || validation.warnings.length > 0) && (
          <div className="mb-6 space-y-2">
            {validation.errors.map((error, index) => (
              <div key={index} className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">❌ {error}</p>
              </div>
            ))}
            {validation.warnings.map((warning, index) => (
              <div key={index} className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-yellow-600 text-sm">⚠️ {warning}</p>
              </div>
            ))}
          </div>
        )}

        <ResponsiveGrid cols={{ default: 1, lg: 3 }} gap="lg">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">
                    Sản phẩm ({summary.totalItems})
                  </h2>
                  <Button
                    onClick={handleClearCart}
                    variant="ghost"
                    size="sm"
                    disabled={isLoading}
                    className="!text-gray-600 hover:!text-red-600 hover:!bg-red-50 font-medium"
                    style={{ color: '#4b5563' }}
                  >
                    Xóa tất cả
                  </Button>
                </div>
              </div>

              <div className="divide-y divide-gray-200">
                {cartState.items.map((item) => (
                  <CartItemRow
                    key={item.id}
                    item={item}
                    isUpdating={updatingItems.has(item.id)}
                    onQuantityChange={(quantity) => handleQuantityChange(item.id, quantity)}
                    onRemove={() => handleRemoveItem(item.id)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h3 className="text-lg font-semibold mb-4">Tóm tắt đơn hàng</h3>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span>Tạm tính:</span>
                  <span>{formatApiPrice(new Decimal(summary.subtotal || 0), 'VND')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Thuế VAT (10%):</span>
                  <span>{formatApiPrice(new Decimal(summary.tax || 0), 'VND')}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between font-semibold">
                    <span>Tổng cộng:</span>
                    <span className="text-green-600">{formatApiPrice(new Decimal(summary.total || 0), 'VND')}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  variant="train"
                  size="lg"
                  className="w-full"
                  disabled={!validation.isValid || isLoading}
                >
                  Tiến hành thanh toán
                </Button>
                <Link to="/browse">
                  <Button variant="outline" size="lg" className="w-full">
                    Tiếp tục mua hàng
                  </Button>
                </Link>
              </div>

              {/* Delivery Info */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">
                  Thông tin giao hàng
                </h4>
                <div className="text-sm text-blue-700 space-y-1">
                  {Array.from(new Set(cartState.items.map(item => item.deliveryStation))).map(station => (
                    <div key={station}>📍 Ga {station}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ResponsiveGrid>
      </PageContainer>
    </AppLayout>
  )
}

// Cart Item Component
function CartItemRow({
  item,
  isUpdating,
  onQuantityChange,
  onRemove,
}: {
  item: CartItem
  isUpdating: boolean
  onQuantityChange: (quantity: number) => void
  onRemove: () => void
}) {
  const itemTotal = getEffectivePrice(item.product).toNumber() * item.quantity
  const customizationTotal = (item.customizations || []).reduce(
    (sum, customization) => sum + customization.additionalPrice,
    0
  ) * item.quantity

  return (
    <div className={cn("p-6", isUpdating && "opacity-50")}>
      <div className="flex gap-4">
        {/* Product Image */}
        <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-red-100 rounded-lg flex items-center justify-center">
          <span className="text-2xl">🍽️</span>
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-1">
            {item.product.name}
          </h3>
          <p className="text-sm text-gray-800 mb-2">
            {item.product.description}
          </p>

          <div className="flex items-center gap-4 text-sm text-gray-700">
            <span>📍 Ga {item.deliveryStation}</span>
            <span>💰 {formatApiPrice(getEffectivePrice(item.product), 'VND')}</span>
            {item.notes && (
              <span>📝 {item.notes}</span>
            )}
          </div>

          {/* Customizations */}
          {item.customizations && item.customizations.length > 0 && (
            <div className="mt-2 text-sm text-gray-800">
              {item.customizations.map((customization, index) => (
                <div key={index} className="flex justify-between">
                  <span>+ {customization.choiceName}</span>
                  <span>+{formatApiPrice(new Decimal(customization.additionalPrice || 0), 'VND')}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quantity & Actions */}
        <div className="flex flex-col items-end gap-3">
          <div className="font-semibold text-green-600">
            {formatApiPrice(new Decimal((itemTotal || 0) + (customizationTotal || 0)), 'VND')}
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center border border-gray-300 rounded-md">
            <button
              onClick={() => onQuantityChange(item.quantity - 1)}
              disabled={isUpdating || item.quantity <= 1}
              className="px-3 py-1 hover:bg-gray-100 disabled:opacity-50 text-gray-700"
              style={{ color: '#374151' }}
            >
              −
            </button>
            <span className="px-3 py-1 text-sm min-w-[3rem] text-center text-gray-700" style={{ color: '#374151' }}>
              {item.quantity}
            </span>
            <button
              onClick={() => onQuantityChange(item.quantity + 1)}
              disabled={isUpdating || item.quantity >= 10 || item.quantity >= item.product.stockLevel}
              className="px-3 py-1 hover:bg-gray-100 disabled:opacity-50 text-gray-700"
              style={{ color: '#374151' }}
            >
              +
            </button>
          </div>

          <Button
            onClick={onRemove}
            variant="ghost"
            size="sm"
            disabled={isUpdating}
            className="!text-red-600 hover:!text-red-700 hover:!bg-red-50 font-medium"
            style={{ color: '#dc2626' }}
          >
            Xóa
          </Button>
        </div>
      </div>
    </div>
  )
}