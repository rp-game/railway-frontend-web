import * as React from "react"
import { Link } from "react-router"
import { Button } from "~/components/ui/button"
import { useCartSummary } from "~/lib/cart"
import { cn } from "~/lib/utils"

interface CartButtonProps {
  className?: string
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
  showCount?: boolean
  showTotal?: boolean
}

export function CartButton({
  className,
  variant = "outline",
  size = "default",
  showCount = true,
  showTotal = false,
}: CartButtonProps) {
  const {
    totalItems,
    total,
    isEmpty,
    hasErrors,
    hasWarnings,
    summaryText,
  } = useCartSummary()

  return (
    <Link to="/cart">
      <Button
        variant={variant}
        size={size}
        className={cn(
          "relative",
          hasErrors && "border-red-500 text-red-600",
          hasWarnings && !hasErrors && "border-yellow-500 text-yellow-600",
          className
        )}
      >
        <div className="flex items-center gap-2">
          <span className="text-xl">🛒</span>

          {showTotal && !isEmpty ? (
            <span className="hidden sm:inline text-sm">
              {summaryText}
            </span>
          ) : showCount && !isEmpty ? (
            <span className="hidden sm:inline text-sm">
              {totalItems} sản phẩm
            </span>
          ) : (
            <span className="hidden sm:inline text-sm">
              Giỏ hàng
            </span>
          )}

          {/* Badge */}
          {showCount && totalItems > 0 && (
            <span
              className={cn(
                "absolute -top-2 -right-2 min-w-[20px] h-5 rounded-full text-xs font-medium flex items-center justify-center",
                hasErrors
                  ? "bg-red-500 text-white"
                  : hasWarnings
                  ? "bg-yellow-500 text-white"
                  : "bg-blue-600 text-white"
              )}
            >
              {totalItems > 99 ? "99+" : totalItems}
            </span>
          )}
        </div>
      </Button>
    </Link>
  )
}

interface CartIconProps {
  className?: string
  showBadge?: boolean
}

export function CartIcon({ className, showBadge = true }: CartIconProps) {
  const { totalItems, hasErrors, hasWarnings } = useCartSummary()

  return (
    <div className={cn("relative inline-block", className)}>
      <span className="text-xl">🛒</span>

      {showBadge && totalItems > 0 && (
        <span
          className={cn(
            "absolute -top-1 -right-1 min-w-[16px] h-4 rounded-full text-xs font-medium flex items-center justify-center",
            hasErrors
              ? "bg-red-500 text-white"
              : hasWarnings
              ? "bg-yellow-500 text-white"
              : "bg-blue-600 text-white"
          )}
        >
          {totalItems > 9 ? "9+" : totalItems}
        </span>
      )}
    </div>
  )
}