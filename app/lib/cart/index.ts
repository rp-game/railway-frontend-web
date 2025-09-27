/**
 * Shopping Cart Module
 *
 * Main export file for cart functionality.
 * Provides a clean API for cart operations.
 */

// Export types
export type {
  CartItem,
  CartState,
  CartMetadata,
  CartItemCustomization,
  AddToCartParams,
  UpdateCartItemParams,
} from './types'

export {
  CART_CONFIG,
  CART_STORAGE_KEYS,
  CartErrorCode,
  CartError,
} from './types'

// Export main classes
export { CartManager } from './manager'
export { CartStorage } from './storage'

// Export utilities
export {
  calculateCartTotals,
  createInitialCartState,
  validateProductAvailability,
  formatPrice,
  getCartSummaryText,
  getCartStatus,
} from './utils'

// Export hooks
export {
  useCart,
  useCartSummary,
  useAddToCart,
  useCartItem,
  useCartStats,
  useCartPersistence,
} from './hooks'

// Export a default cart instance for simple usage
import { CartManager } from './manager'

let defaultCartInstance: CartManager | null = null

export function getDefaultCart(): CartManager {
  if (!defaultCartInstance) {
    defaultCartInstance = new CartManager()
  }
  return defaultCartInstance
}

// Helper function to create cart instance
export function createCart(): CartManager {
  return new CartManager()
}