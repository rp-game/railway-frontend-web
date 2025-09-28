/**
 * Cart Utility Functions
 *
 * Helper functions for cart calculations, validations, and transformations.
 */

import {
  type CartState,
  type CartItem,
  type CartMetadata,
  type AddToCartParams,
  CART_CONFIG,
  CartErrorCode,
  CartError,
} from './types'
import type { ExtendedProduct } from '../api/type-extensions'

/**
 * Calculate cart totals
 */
export function calculateCartTotals(items: CartItem[]): {
  totalItems: number
  subtotal: number
  tax: number
  total: number
} {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  const subtotal = items.reduce((sum, item) => {
    const itemPrice = item.product.price * item.quantity
    const customizationPrice = (item.customizations || []).reduce(
      (customSum, customization) => customSum + customization.additionalPrice,
      0
    ) * item.quantity

    return sum + itemPrice + customizationPrice
  }, 0)

  const tax = subtotal * CART_CONFIG.TAX_RATE
  const total = subtotal + tax

  return {
    totalItems,
    subtotal: Math.round(subtotal),
    tax: Math.round(tax),
    total: Math.round(total),
  }
}

/**
 * Create initial cart state
 */
export function createInitialCartState(): CartState {
  const now = new Date().toISOString()

  const metadata: CartMetadata = {
    createdAt: now,
    updatedAt: now,
  }

  return {
    items: [],
    totalItems: 0,
    subtotal: 0,
    tax: 0,
    total: 0,
    metadata,
  }
}

/**
 * Generate unique cart item ID
 */
export function generateCartItemId(): string {
  return `cart_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Validate product availability
 */
export function validateProductAvailability(product: ExtendedProduct): void {
  if (!product.isActive) {
    throw new CartError(
      CartErrorCode.PRODUCT_NOT_AVAILABLE,
      `Sản phẩm "${product.name}" hiện không hoạt động`
    )
  }

  if (!product.isVisible) {
    throw new CartError(
      CartErrorCode.PRODUCT_NOT_AVAILABLE,
      `Sản phẩm "${product.name}" hiện không khả dụng`
    )
  }
}

/**
 * Validate add to cart parameters
 */
export function validateAddToCartParams(params: AddToCartParams, currentItems: CartItem[]): void {
  const { product, quantity, deliveryStation } = params

  // Validate product availability
  validateProductAvailability(product)

  // Validate quantity
  if (quantity <= 0) {
    throw new CartError(
      CartErrorCode.MAX_QUANTITY_EXCEEDED,
      'Số lượng phải lớn hơn 0'
    )
  }

  if (quantity > CART_CONFIG.MAX_ITEMS_PER_PRODUCT) {
    throw new CartError(
      CartErrorCode.MAX_QUANTITY_EXCEEDED,
      `Số lượng tối đa cho mỗi sản phẩm là ${CART_CONFIG.MAX_ITEMS_PER_PRODUCT}`
    )
  }

  // Check if adding this quantity would exceed stock (using extended fields with fallbacks)
  const currentQuantityInCart = currentItems
    .filter(item => item.product.id === product.id)
    .reduce((sum, item) => sum + item.quantity, 0)

  const stockLevel = product.stockLevel ?? 999999 // Fallback to unlimited if not provided
  if (stockLevel > 0 && currentQuantityInCart + quantity > stockLevel) {
    throw new CartError(
      CartErrorCode.PRODUCT_NOT_AVAILABLE,
      `Không đủ hàng trong kho. Còn lại: ${stockLevel - currentQuantityInCart}`
    )
  }

  // Validate delivery station
  if (!deliveryStation) {
    throw new CartError(
      CartErrorCode.INVALID_STATION,
      'Vui lòng chọn ga giao hàng'
    )
  }

  const stationCodes = product.stationCodes ?? [] // Fallback to empty array if not provided
  if (stationCodes.length > 0 && !stationCodes.includes(deliveryStation)) {
    throw new CartError(
      CartErrorCode.INVALID_STATION,
      `Sản phẩm "${product.name}" không có sẵn tại ga ${deliveryStation}`
    )
  }

  // Check total items limit
  const currentTotalItems = currentItems.reduce((sum, item) => sum + item.quantity, 0)
  if (currentTotalItems + quantity > CART_CONFIG.MAX_TOTAL_ITEMS) {
    throw new CartError(
      CartErrorCode.MAX_ITEMS_EXCEEDED,
      `Tối đa ${CART_CONFIG.MAX_TOTAL_ITEMS} sản phẩm trong giỏ hàng`
    )
  }
}

/**
 * Validate cart item update
 */
export function validateCartItemUpdate(
  itemId: string,
  updates: { quantity?: number; deliveryStation?: string },
  currentItems: CartItem[]
): void {
  const item = currentItems.find(item => item.id === itemId)
  if (!item) {
    throw new CartError(
      CartErrorCode.PRODUCT_NOT_AVAILABLE,
      'Không tìm thấy sản phẩm trong giỏ hàng'
    )
  }

  // Validate quantity if updating
  if (updates.quantity !== undefined) {
    if (updates.quantity <= 0) {
      throw new CartError(
        CartErrorCode.MAX_QUANTITY_EXCEEDED,
        'Số lượng phải lớn hơn 0'
      )
    }

    if (updates.quantity > CART_CONFIG.MAX_ITEMS_PER_PRODUCT) {
      throw new CartError(
        CartErrorCode.MAX_QUANTITY_EXCEEDED,
        `Số lượng tối đa cho mỗi sản phẩm là ${CART_CONFIG.MAX_ITEMS_PER_PRODUCT}`
      )
    }

    // Check stock availability
    const otherItemsQuantity = currentItems
      .filter(otherItem =>
        otherItem.product.id === item.product.id &&
        otherItem.id !== itemId
      )
      .reduce((sum, otherItem) => sum + otherItem.quantity, 0)

    if (otherItemsQuantity + updates.quantity > item.product.stockLevel) {
      throw new CartError(
        CartErrorCode.PRODUCT_NOT_AVAILABLE,
        `Không đủ hàng trong kho. Còn lại: ${item.product.stockLevel - otherItemsQuantity}`
      )
    }
  }

  // Validate delivery station if updating
  if (updates.deliveryStation) {
    if (!item.product.stationCodes.includes(updates.deliveryStation)) {
      throw new CartError(
        CartErrorCode.INVALID_STATION,
        `Sản phẩm "${item.product.name}" không có sẵn tại ga ${updates.deliveryStation}`
      )
    }
  }
}

/**
 * Find existing cart item for the same product and station
 */
export function findExistingCartItem(
  items: CartItem[],
  productId: string,
  deliveryStation: string
): CartItem | undefined {
  return items.find(
    item =>
      item.product.id === productId &&
      item.deliveryStation === deliveryStation
  )
}

/**
 * Merge cart items if they have the same product and delivery station
 */
export function mergeCartItems(items: CartItem[]): CartItem[] {
  const mergedItems: CartItem[] = []
  const processedIds = new Set<string>()

  for (const item of items) {
    if (processedIds.has(item.id)) {
      continue
    }

    // Find all items with same product and delivery station
    const similarItems = items.filter(
      otherItem =>
        otherItem.product.id === item.product.id &&
        otherItem.deliveryStation === item.deliveryStation &&
        JSON.stringify(otherItem.customizations || []) === JSON.stringify(item.customizations || [])
    )

    if (similarItems.length === 1) {
      // No merge needed
      mergedItems.push(item)
    } else {
      // Merge quantities
      const totalQuantity = similarItems.reduce((sum, similarItem) => sum + similarItem.quantity, 0)
      const mergedItem: CartItem = {
        ...item,
        quantity: Math.min(totalQuantity, CART_CONFIG.MAX_ITEMS_PER_PRODUCT),
        notes: similarItems
          .map(similarItem => similarItem.notes)
          .filter(Boolean)
          .join('; ') || undefined,
      }
      mergedItems.push(mergedItem)
    }

    // Mark all similar items as processed
    similarItems.forEach(similarItem => processedIds.add(similarItem.id))
  }

  return mergedItems
}

/**
 * Format price for display
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(price)
}

/**
 * Get cart summary text
 */
export function getCartSummaryText(cartState: CartState): string {
  if (cartState.totalItems === 0) {
    return 'Giỏ hàng trống'
  }

  const itemText = cartState.totalItems === 1 ? 'sản phẩm' : 'sản phẩm'
  return `${cartState.totalItems} ${itemText} - ${formatPrice(cartState.total)}`
}

/**
 * Check if cart needs attention (errors, warnings)
 */
export function getCartStatus(cartState: CartState): {
  hasErrors: boolean
  hasWarnings: boolean
  messages: string[]
} {
  const messages: string[] = []
  let hasErrors = false
  let hasWarnings = false

  // Check for out-of-stock items
  const outOfStockItems = cartState.items.filter(
    item => !item.product.available || item.quantity > item.product.stockLevel
  )

  if (outOfStockItems.length > 0) {
    hasErrors = true
    messages.push(`${outOfStockItems.length} sản phẩm trong giỏ hàng không còn đủ số lượng`)
  }

  // Check for high cart value (warning)
  if (cartState.total > 5000000) { // 5 million VND
    hasWarnings = true
    messages.push('Giá trị đơn hàng cao, vui lòng xác nhận thông tin giao hàng')
  }

  // Check for mixed delivery stations (warning)
  const deliveryStations = new Set(cartState.items.map(item => item.deliveryStation))
  if (deliveryStations.size > 1) {
    hasWarnings = true
    messages.push(`Đơn hàng có sản phẩm giao tại ${deliveryStations.size} ga khác nhau`)
  }

  return {
    hasErrors,
    hasWarnings,
    messages,
  }
}