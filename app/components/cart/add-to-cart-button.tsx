import * as React from "react"
import { Button } from "~/components/ui/button"
import { useAddToCart } from "~/lib/cart"
import type { DemoProduct } from "~/lib/demo/products"
import type { AddToCartParams } from "~/lib/cart"
import { cn } from "~/lib/utils"

interface AddToCartButtonProps {
  product: DemoProduct
  deliveryStation: string
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

export function AddToCartButton({
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
}: AddToCartButtonProps) {
  const { addToCart, isAdding, error, clearState } = useAddToCart()

  const handleAddToCart = async () => {
    if (!deliveryStation) {
      const errorMsg = "Vui lòng chọn ga giao hàng"
      onError?.(errorMsg)
      return
    }

    const params: AddToCartParams = {
      product,
      quantity,
      deliveryStation,
      notes,
    }

    const success = await addToCart(params)

    if (success) {
      onSuccess?.(product)
      // Auto-clear success state after 3 seconds
      setTimeout(() => {
        clearState()
      }, 3000)
    } else if (error) {
      onError?.(error)
    }
  }

  // Clear error when component unmounts or props change
  React.useEffect(() => {
    return () => {
      clearState()
    }
  }, [clearState])

  const isDisabled = disabled ||
    !product.available ||
    product.stockLevel <= 0 ||
    !deliveryStation ||
    isAdding

  const buttonText = children || (
    isAdding ? "Đang thêm..." :
    !product.available ? "Hết hàng" :
    product.stockLevel <= 0 ? "Hết hàng" :
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

interface QuickAddToCartProps {
  product: DemoProduct
  defaultStation?: string
  showQuantitySelector?: boolean
  className?: string
}

export function QuickAddToCart({
  product,
  defaultStation,
  showQuantitySelector = false,
  className,
}: QuickAddToCartProps) {
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

  // Auto-select station if product is only available at one station
  React.useEffect(() => {
    if (!selectedStation && product.stationCodes.length === 1) {
      setSelectedStation(product.stationCodes[0])
    }
  }, [product.stationCodes, selectedStation])

  return (
    <div className={cn("space-y-3", className)}>
      {/* Station Selector */}
      {product.stationCodes.length > 1 && (
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
            {product.stationCodes.map((stationCode) => (
              <option key={stationCode} value={stationCode}>
                Ga {stationCode}
              </option>
            ))}
          </select>
        </div>
      )}

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
              disabled={quantity >= 10 || quantity >= product.stockLevel}
              className="px-2 py-1 hover:bg-gray-100 disabled:opacity-50"
            >
              +
            </button>
          </div>
        </div>
      )}

      {/* Add to Cart Button */}
      <AddToCartButton
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