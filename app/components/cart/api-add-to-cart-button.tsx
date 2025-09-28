import * as React from "react"
import { Button } from "~/components/ui/button"
import type { ExtendedProduct } from "~/lib/api/type-extensions"
import { cn } from "~/lib/utils"
import { getEffectivePrice } from "~/lib/utils/price"
import { getCartManager } from "~/lib/cart/hooks"

interface ApiAddToCartButtonProps {
  product: ExtendedProduct
  deliveryStation?: string
  quantity?: number
  notes?: string
  disabled?: boolean
  className?: string
  variant?: "default" | "train" | "outline"
  size?: "default" | "sm" | "lg" | "xl"
  children?: React.ReactNode
  onSuccess?: (item: any) => void
  onError?: (error: string) => void
}

export function ApiAddToCartButton({
  product,
  deliveryStation,
  quantity = 1,
  notes,
  disabled,
  className,
  variant = "train",
  size = "default",
  children,
  onSuccess,
  onError,
}: ApiAddToCartButtonProps) {
  const [isAdding, setIsAdding] = React.useState(false)

  const handleAddToCart = async () => {
    if (!deliveryStation) {
      const errorMsg = "Vui lòng chọn ga giao hàng"
      onError?.(errorMsg)
      return
    }

    setIsAdding(true)

    try {
      // Use the shared cart manager singleton for real-time updates
      const cartManager = getCartManager()
      console.log('Before addToCart:', cartManager.getCartState().items.length)

      const cartItem = cartManager.addToCart({
        product,
        quantity,
        deliveryStation,
        notes
      })

      console.log('After addToCart:', cartManager.getCartState().items.length)
      onSuccess?.(cartItem)
    } catch (error) {
      onError?.("Không thể thêm sản phẩm vào giỏ hàng")
    } finally {
      setIsAdding(false)
    }
  }

  // Debug logging
  React.useEffect(() => {
    console.log('Product debug:', {
      id: product.id,
      name: product.name,
      isActive: product.isActive,
      isVisible: product.isVisible,
      deliveryStation,
      vendor: product.vendor
    })
  }, [product, deliveryStation])

  const isDisabled = disabled ||
    !product.isActive ||
    !product.isVisible ||
    !deliveryStation ||
    isAdding

  const buttonText = children || (
    isAdding ? "Đang thêm..." :
    !product.isActive ? "Sản phẩm không hoạt động" :
    !product.isVisible ? "Sản phẩm không hiển thị" :
    !deliveryStation ? "Chọn ga giao" :
    "Thêm vào giỏ"
  )

  return (
    <Button
      onClick={handleAddToCart}
      disabled={isDisabled}
      variant={variant}
      size={size}
      className={cn(
        "relative",
        isAdding && "opacity-75",
        className
      )}
    >
      {isAdding && (
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="animate-spin">⏳</span>
        </span>
      )}
      <span className={cn(isAdding && "opacity-0")}>
        {buttonText}
      </span>
    </Button>
  )
}

interface ApiQuickAddToCartProps {
  product: ExtendedProduct
  defaultStation?: string
  showQuantitySelector?: boolean
  className?: string
}

export function ApiQuickAddToCart({
  product,
  defaultStation,
  showQuantitySelector = false,
  className,
}: ApiQuickAddToCartProps) {
  const [quantity, setQuantity] = React.useState(1)
  const [selectedStation, setSelectedStation] = React.useState(defaultStation || "")
  const [showSuccess, setShowSuccess] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null)

  const handleSuccess = () => {
    setShowSuccess(true)
    setErrorMessage(null)
    setTimeout(() => setShowSuccess(false), 2000)
  }

  const handleError = (error: string) => {
    setErrorMessage(error)
    setShowSuccess(false)
    setTimeout(() => setErrorMessage(null), 5000)
  }

  // Auto-select station if vendor has a station code or use default
  React.useEffect(() => {
    if (!selectedStation) {
      if (product.vendor?.stationCode) {
        setSelectedStation(product.vendor.stationCode)
      } else if (defaultStation) {
        setSelectedStation(defaultStation)
      } else {
        // Auto-select first available station as fallback
        setSelectedStation('HAN') // Default to Hanoi station
      }
    }
  }, [product.vendor?.stationCode, selectedStation, defaultStation])

  return (
    <div className={cn("space-y-3", className)}>
      {/* Station Selector - show when no station selected or allow changing */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Ga giao hàng
        </label>
        <select
          value={selectedStation}
          onChange={(e) => setSelectedStation(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Chọn ga...</option>
          {product.vendor?.stationCode && (
            <option value={product.vendor.stationCode}>
              Ga {product.vendor.stationCode}
            </option>
          )}
          {/* Default stations */}
          <option value="HAN">Ga Hà Nội</option>
          <option value="DNA">Ga Đà Nẵng</option>
          <option value="SGN">Ga Sài Gòn</option>
        </select>
      </div>

      {/* Quantity Selector */}
      {showQuantitySelector && (
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">
            Số lượng:
          </label>
          <div className="flex items-center border border-gray-300 rounded-md">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className="px-2 py-1 hover:bg-gray-100 disabled:opacity-50"
            >
              −
            </button>
            <span className="px-3 py-1 text-sm min-w-[3rem] text-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(Math.min(10, quantity + 1))}
              disabled={quantity >= 10}
              className="px-2 py-1 hover:bg-gray-100 disabled:opacity-50"
            >
              +
            </button>
          </div>
        </div>
      )}

      {/* Add to Cart Button */}
      <ApiAddToCartButton
        product={product}
        deliveryStation={selectedStation}
        quantity={quantity}
        onSuccess={handleSuccess}
        onError={handleError}
        className="w-full"
      />

      {/* Success Message */}
      {showSuccess && (
        <div className="text-center text-sm text-green-600 bg-green-50 p-2 rounded-md">
          ✅ Đã thêm vào giỏ hàng!
        </div>
      )}

      {/* Error Message */}
      {errorMessage && (
        <div className="text-center text-sm text-red-600 bg-red-50 p-2 rounded-md">
          ❌ {errorMessage}
        </div>
      )}
    </div>
  )
}