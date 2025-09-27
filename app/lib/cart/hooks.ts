/**
 * Cart React Hooks
 *
 * React hooks for managing shopping cart state in components.
 * Provides reactive access to cart data and operations.
 */

import { useState, useEffect, useCallback, useMemo } from 'react'
import {
  type CartState,
  type CartItem,
  type AddToCartParams,
  type UpdateCartItemParams,
  CartError,
} from './types'
import { CartManager } from './manager'
import { getCartStatus, getCartSummaryText } from './utils'

// Global cart manager instance
let cartManagerInstance: CartManager | null = null

function getCartManager(): CartManager {
  if (!cartManagerInstance) {
    cartManagerInstance = new CartManager()
  }
  return cartManagerInstance
}

/**
 * Main cart hook - provides complete cart functionality
 */
export function useCart() {
  const [cartState, setCartState] = useState<CartState>(() => {
    const manager = getCartManager()
    return manager.getCartState()
  })

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Subscribe to cart changes
  useEffect(() => {
    const manager = getCartManager()
    const unsubscribe = manager.subscribe(setCartState)
    return unsubscribe
  }, [])

  // Cart operations with error handling
  const addToCart = useCallback(async (params: AddToCartParams): Promise<CartItem | null> => {
    setIsLoading(true)
    setError(null)

    try {
      const manager = getCartManager()
      const addedItem = manager.addToCart(params)
      return addedItem
    } catch (err) {
      const errorMessage = err instanceof CartError ? err.message : 'Không thể thêm sản phẩm vào giỏ hàng'
      setError(errorMessage)
      return null
    } finally {
      setIsLoading(false)
    }
  }, [])

  const updateCartItem = useCallback(async (params: UpdateCartItemParams): Promise<CartItem | null> => {
    setIsLoading(true)
    setError(null)

    try {
      const manager = getCartManager()
      const updatedItem = manager.updateCartItem(params)
      return updatedItem
    } catch (err) {
      const errorMessage = err instanceof CartError ? err.message : 'Không thể cập nhật sản phẩm'
      setError(errorMessage)
      return null
    } finally {
      setIsLoading(false)
    }
  }, [])

  const removeFromCart = useCallback(async (itemId: string): Promise<boolean> => {
    setIsLoading(true)
    setError(null)

    try {
      const manager = getCartManager()
      manager.removeFromCart(itemId)
      return true
    } catch (err) {
      const errorMessage = err instanceof CartError ? err.message : 'Không thể xóa sản phẩm'
      setError(errorMessage)
      return false
    } finally {
      setIsLoading(false)
    }
  }, [])

  const clearCart = useCallback(async (): Promise<boolean> => {
    setIsLoading(true)
    setError(null)

    try {
      const manager = getCartManager()
      manager.clearCart()
      return true
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Không thể xóa giỏ hàng'
      setError(errorMessage)
      return false
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Cart queries
  const isProductInCart = useCallback((productId: string): boolean => {
    const manager = getCartManager()
    return manager.isProductInCart(productId)
  }, [])

  const getProductQuantityInCart = useCallback((productId: string): number => {
    const manager = getCartManager()
    return manager.getProductQuantityInCart(productId)
  }, [])

  const getCartItem = useCallback((itemId: string): CartItem | null => {
    const manager = getCartManager()
    return manager.getCartItem(itemId)
  }, [])

  const getCartItemsByStation = useCallback((stationCode: string): CartItem[] => {
    const manager = getCartManager()
    return manager.getCartItemsByStation(stationCode)
  }, [])

  // Cart validation
  const validateCartForCheckout = useCallback(() => {
    const manager = getCartManager()
    return manager.validateCartForCheckout()
  }, [])

  // Clear error
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return {
    // State
    cartState,
    isLoading,
    error,

    // Operations
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,

    // Queries
    isProductInCart,
    getProductQuantityInCart,
    getCartItem,
    getCartItemsByStation,
    validateCartForCheckout,

    // Utils
    clearError,
  }
}

/**
 * Hook for cart summary information
 */
export function useCartSummary() {
  const { cartState } = useCart()

  const summary = useMemo(() => {
    const cartStatus = getCartStatus(cartState)
    const summaryText = getCartSummaryText(cartState)

    return {
      totalItems: cartState.totalItems,
      subtotal: cartState.subtotal,
      tax: cartState.tax,
      total: cartState.total,
      summaryText,
      isEmpty: cartState.totalItems === 0,
      hasErrors: cartStatus.hasErrors,
      hasWarnings: cartStatus.hasWarnings,
      statusMessages: cartStatus.messages,
    }
  }, [cartState])

  return summary
}

/**
 * Hook for adding items to cart with optimistic updates
 */
export function useAddToCart() {
  const [isAdding, setIsAdding] = useState(false)
  const [lastAddedItem, setLastAddedItem] = useState<CartItem | null>(null)
  const [error, setError] = useState<string | null>(null)

  const addToCart = useCallback(async (params: AddToCartParams): Promise<boolean> => {
    setIsAdding(true)
    setError(null)
    setLastAddedItem(null)

    try {
      const manager = getCartManager()
      const addedItem = manager.addToCart(params)
      setLastAddedItem(addedItem)
      return true
    } catch (err) {
      const errorMessage = err instanceof CartError ? err.message : 'Không thể thêm sản phẩm vào giỏ hàng'
      setError(errorMessage)
      return false
    } finally {
      setIsAdding(false)
    }
  }, [])

  const clearState = useCallback(() => {
    setLastAddedItem(null)
    setError(null)
  }, [])

  return {
    addToCart,
    isAdding,
    lastAddedItem,
    error,
    clearState,
  }
}

/**
 * Hook for cart item operations
 */
export function useCartItem(itemId: string | null) {
  const { cartState, updateCartItem, removeFromCart } = useCart()
  const [isUpdating, setIsUpdating] = useState(false)

  const cartItem = useMemo(() => {
    if (!itemId) return null
    return cartState.items.find(item => item.id === itemId) || null
  }, [cartState.items, itemId])

  const updateQuantity = useCallback(async (quantity: number): Promise<boolean> => {
    if (!itemId) return false

    setIsUpdating(true)
    try {
      await updateCartItem({ itemId, quantity })
      return true
    } catch {
      return false
    } finally {
      setIsUpdating(false)
    }
  }, [itemId, updateCartItem])

  const updateDeliveryStation = useCallback(async (deliveryStation: string): Promise<boolean> => {
    if (!itemId) return false

    setIsUpdating(true)
    try {
      await updateCartItem({ itemId, deliveryStation })
      return true
    } catch {
      return false
    } finally {
      setIsUpdating(false)
    }
  }, [itemId, updateCartItem])

  const updateNotes = useCallback(async (notes: string): Promise<boolean> => {
    if (!itemId) return false

    setIsUpdating(true)
    try {
      await updateCartItem({ itemId, notes })
      return true
    } catch {
      return false
    } finally {
      setIsUpdating(false)
    }
  }, [itemId, updateCartItem])

  const removeItem = useCallback(async (): Promise<boolean> => {
    if (!itemId) return false

    return await removeFromCart(itemId)
  }, [itemId, removeFromCart])

  return {
    cartItem,
    isUpdating,
    updateQuantity,
    updateDeliveryStation,
    updateNotes,
    removeItem,
  }
}

/**
 * Hook for cart statistics
 */
export function useCartStats() {
  const { cartState } = useCart()

  const stats = useMemo(() => {
    const manager = getCartManager()
    return manager.getCartStats()
  }, [cartState])

  return stats
}

/**
 * Hook for cart persistence status
 */
export function useCartPersistence() {
  const [isPersisting, setIsPersisting] = useState(false)
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null)

  useEffect(() => {
    // Monitor cart changes and update sync time
    const manager = getCartManager()
    const unsubscribe = manager.subscribe(() => {
      setLastSyncTime(new Date())
    })

    return unsubscribe
  }, [])

  const forceSave = useCallback(async (): Promise<boolean> => {
    setIsPersisting(true)
    try {
      const manager = getCartManager()
      const cartState = manager.getCartState()
      // Force save current state
      manager['saveCartToStorage']()
      setLastSyncTime(new Date())
      return true
    } catch {
      return false
    } finally {
      setIsPersisting(false)
    }
  }, [])

  return {
    isPersisting,
    lastSyncTime,
    forceSave,
  }
}