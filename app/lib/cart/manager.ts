/**
 * Cart Manager
 *
 * Main class for managing shopping cart state and operations.
 * Handles CRUD operations, persistence, and business logic.
 */

import {
  type CartState,
  type CartItem,
  type AddToCartParams,
  type UpdateCartItemParams,
  CartErrorCode,
  CartError,
} from './types'
import { CartStorage } from './storage'
import {
  calculateCartTotals,
  createInitialCartState,
  generateCartItemId,
  validateAddToCartParams,
  validateCartItemUpdate,
  findExistingCartItem,
  mergeCartItems,
} from './utils'

/**
 * Shopping Cart Manager
 */
export class CartManager {
  private cartState: CartState
  private listeners: Set<(cartState: CartState) => void> = new Set()

  constructor() {
    // Initialize cart from storage or create new one
    this.cartState = this.loadCartFromStorage()
  }

  /**
   * Load cart from localStorage
   */
  private loadCartFromStorage(): CartState {
    try {
      const storedCart = CartStorage.getCartState()

      if (storedCart) {
        // Recalculate totals in case of data inconsistency
        const totals = calculateCartTotals(storedCart.items)
        return {
          ...storedCart,
          ...totals,
        }
      }

      return createInitialCartState()
    } catch (error) {
      console.error('Failed to load cart from storage:', error)
      return createInitialCartState()
    }
  }

  /**
   * Save cart to localStorage
   */
  private saveCartToStorage(): void {
    try {
      CartStorage.saveCartState(this.cartState)
    } catch (error) {
      console.error('Failed to save cart to storage:', error)
      // Continue operation even if storage fails
    }
  }

  /**
   * Notify all listeners of cart changes
   */
  private notifyListeners(): void {
    this.listeners.forEach(listener => {
      try {
        listener(this.cartState)
      } catch (error) {
        console.error('Cart listener error:', error)
      }
    })
  }

  /**
   * Update cart state and persist changes
   */
  private updateCartState(updates: Partial<CartState>): void {
    this.cartState = {
      ...this.cartState,
      ...updates,
      metadata: {
        ...this.cartState.metadata,
        updatedAt: new Date().toISOString(),
      },
    }

    this.saveCartToStorage()
    this.notifyListeners()
  }

  /**
   * Get current cart state
   */
  getCartState(): CartState {
    return { ...this.cartState }
  }

  /**
   * Add item to cart
   */
  addToCart(params: AddToCartParams): CartItem {
    // Validate parameters
    validateAddToCartParams(params, this.cartState.items)

    const { product, quantity, deliveryStation, notes, customizations } = params

    // Check if item already exists in cart
    const existingItem = findExistingCartItem(
      this.cartState.items,
      product.productId,
      deliveryStation
    )

    let updatedItems: CartItem[]

    if (existingItem && (!customizations || customizations.length === 0)) {
      // Update existing item quantity
      const newQuantity = existingItem.quantity + quantity

      // Validate new quantity
      if (newQuantity > product.stockLevel) {
        throw new CartError(
          CartErrorCode.PRODUCT_NOT_AVAILABLE,
          `Không đủ hàng trong kho. Còn lại: ${product.stockLevel - existingItem.quantity}`
        )
      }

      updatedItems = this.cartState.items.map(item =>
        item.id === existingItem.id
          ? {
              ...item,
              quantity: newQuantity,
              notes: notes || item.notes,
            }
          : item
      )
    } else {
      // Create new cart item
      const newItem: CartItem = {
        id: generateCartItemId(),
        product,
        quantity,
        deliveryStation,
        notes,
        customizations,
        addedAt: new Date().toISOString(),
      }

      updatedItems = [...this.cartState.items, newItem]
    }

    // Merge similar items and calculate totals
    const mergedItems = mergeCartItems(updatedItems)
    const totals = calculateCartTotals(mergedItems)

    this.updateCartState({
      items: mergedItems,
      ...totals,
    })

    // Return the added/updated item
    const addedItem = existingItem || updatedItems[updatedItems.length - 1]
    return addedItem
  }

  /**
   * Update cart item
   */
  updateCartItem(params: UpdateCartItemParams): CartItem {
    const { itemId, quantity, deliveryStation, notes, customizations } = params

    // Validate update
    validateCartItemUpdate(itemId, { quantity, deliveryStation }, this.cartState.items)

    const updatedItems = this.cartState.items.map(item => {
      if (item.id === itemId) {
        return {
          ...item,
          ...(quantity !== undefined && { quantity }),
          ...(deliveryStation !== undefined && { deliveryStation }),
          ...(notes !== undefined && { notes }),
          ...(customizations !== undefined && { customizations }),
        }
      }
      return item
    })

    const mergedItems = mergeCartItems(updatedItems)
    const totals = calculateCartTotals(mergedItems)

    this.updateCartState({
      items: mergedItems,
      ...totals,
    })

    const updatedItem = mergedItems.find(item => item.id === itemId)
    if (!updatedItem) {
      throw new CartError(
        CartErrorCode.PRODUCT_NOT_AVAILABLE,
        'Không tìm thấy sản phẩm trong giỏ hàng'
      )
    }

    return updatedItem
  }

  /**
   * Remove item from cart
   */
  removeFromCart(itemId: string): void {
    const itemExists = this.cartState.items.some(item => item.id === itemId)

    if (!itemExists) {
      throw new CartError(
        CartErrorCode.PRODUCT_NOT_AVAILABLE,
        'Không tìm thấy sản phẩm trong giỏ hàng'
      )
    }

    const updatedItems = this.cartState.items.filter(item => item.id !== itemId)
    const totals = calculateCartTotals(updatedItems)

    this.updateCartState({
      items: updatedItems,
      ...totals,
    })
  }

  /**
   * Clear entire cart
   */
  clearCart(): void {
    const initialState = createInitialCartState()
    this.updateCartState(initialState)
  }

  /**
   * Get cart item by ID
   */
  getCartItem(itemId: string): CartItem | null {
    return this.cartState.items.find(item => item.id === itemId) || null
  }

  /**
   * Get cart items for a specific station
   */
  getCartItemsByStation(stationCode: string): CartItem[] {
    return this.cartState.items.filter(item => item.deliveryStation === stationCode)
  }

  /**
   * Check if product is in cart
   */
  isProductInCart(productId: string): boolean {
    return this.cartState.items.some(item => item.product.productId === productId)
  }

  /**
   * Get quantity of specific product in cart
   */
  getProductQuantityInCart(productId: string): number {
    return this.cartState.items
      .filter(item => item.product.productId === productId)
      .reduce((sum, item) => sum + item.quantity, 0)
  }

  /**
   * Subscribe to cart changes
   */
  subscribe(listener: (cartState: CartState) => void): () => void {
    this.listeners.add(listener)

    // Return unsubscribe function
    return () => {
      this.listeners.delete(listener)
    }
  }

  /**
   * Update delivery preferences
   */
  updateDeliveryPreferences(preferences: {
    defaultStation?: string
    specialInstructions?: string
  }): void {
    this.updateCartState({
      metadata: {
        ...this.cartState.metadata,
        deliveryPreferences: {
          ...this.cartState.metadata.deliveryPreferences,
          ...preferences,
        },
      },
    })
  }

  /**
   * Update session information
   */
  updateSessionInfo(sessionInfo: {
    sessionToken?: string
    guestToken?: string
    ticketInfo?: any
  }): void {
    this.updateCartState({
      metadata: {
        ...this.cartState.metadata,
        sessionInfo: {
          ...this.cartState.metadata.sessionInfo,
          ...sessionInfo,
        },
      },
    })
  }

  /**
   * Validate cart before checkout
   */
  validateCartForCheckout(): {
    isValid: boolean
    errors: string[]
    warnings: string[]
  } {
    const errors: string[] = []
    const warnings: string[] = []

    // Check if cart is empty
    if (this.cartState.items.length === 0) {
      errors.push('Giỏ hàng trống')
      return { isValid: false, errors, warnings }
    }

    // Check product availability
    for (const item of this.cartState.items) {
      if (!item.product.available) {
        errors.push(`Sản phẩm "${item.product.name}" không còn có sẵn`)
      }

      if (item.quantity > item.product.stockLevel) {
        errors.push(
          `Sản phẩm "${item.product.name}" không đủ số lượng (còn lại: ${item.product.stockLevel})`
        )
      }

      if (!item.product.stationCodes.includes(item.deliveryStation)) {
        errors.push(
          `Sản phẩm "${item.product.name}" không có sẵn tại ga ${item.deliveryStation}`
        )
      }
    }

    // Check for warnings
    const deliveryStations = new Set(this.cartState.items.map(item => item.deliveryStation))
    if (deliveryStations.size > 1) {
      warnings.push(`Đơn hàng có sản phẩm giao tại ${deliveryStations.size} ga khác nhau`)
    }

    if (this.cartState.total > 5000000) {
      warnings.push('Giá trị đơn hàng cao, vui lòng xác nhận thông tin')
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
    }
  }

  /**
   * Get cart statistics
   */
  getCartStats(): {
    totalItems: number
    uniqueProducts: number
    totalValue: number
    averageItemPrice: number
    deliveryStations: string[]
  } {
    const uniqueProducts = new Set(this.cartState.items.map(item => item.product.productId)).size
    const averageItemPrice = this.cartState.items.length > 0
      ? this.cartState.subtotal / this.cartState.totalItems
      : 0
    const deliveryStations = Array.from(new Set(this.cartState.items.map(item => item.deliveryStation)))

    return {
      totalItems: this.cartState.totalItems,
      uniqueProducts,
      totalValue: this.cartState.total,
      averageItemPrice: Math.round(averageItemPrice),
      deliveryStations,
    }
  }
}