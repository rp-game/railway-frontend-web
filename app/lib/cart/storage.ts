/**
 * Cart Storage Manager
 *
 * Handles localStorage operations for shopping cart data.
 * Includes version management, migration, and error handling.
 */

import {
  type CartState,
  type CartMetadata,
  CART_STORAGE_KEYS,
  CART_CONFIG,
  CartErrorCode,
  CartError,
} from './types'

/**
 * Storage utilities for cart data
 */
export class CartStorage {
  /**
   * Check if localStorage is available
   */
  private static isStorageAvailable(): boolean {
    try {
      if (typeof window === 'undefined' || !window.localStorage) {
        return false
      }

      const test = '__storage_test__'
      localStorage.setItem(test, test)
      localStorage.removeItem(test)
      return true
    } catch {
      return false
    }
  }

  /**
   * Check if we're running on the server (SSR)
   */
  private static isServerSide(): boolean {
    return typeof window === 'undefined'
  }

  /**
   * Get cart state from localStorage
   */
  static getCartState(): CartState | null {
    if (!this.isStorageAvailable()) {
      // Only log warning on client side, not during SSR
      if (!this.isServerSide()) {
        console.warn('localStorage not available, cart will not persist')
      }
      return null
    }

    try {
      const cartData = localStorage.getItem(CART_STORAGE_KEYS.CART_STATE)
      if (!cartData) {
        return null
      }

      const parsedCart = JSON.parse(cartData) as CartState

      // Validate cart version
      const version = localStorage.getItem(CART_STORAGE_KEYS.CART_VERSION)
      if (version !== CART_CONFIG.STORAGE_VERSION) {
        console.warn('Cart version mismatch, clearing cart')
        this.clearCart()
        return null
      }

      // Check if cart has expired
      const createdAt = new Date(parsedCart.metadata.createdAt)
      const now = new Date()
      const daysDiff = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24)

      if (daysDiff > CART_CONFIG.EXPIRY_DAYS) {
        console.warn('Cart has expired, clearing cart')
        this.clearCart()
        return null
      }

      return parsedCart
    } catch (error) {
      console.error('Failed to load cart from storage:', error)
      this.clearCart() // Clear corrupted data
      return null
    }
  }

  /**
   * Save cart state to localStorage
   */
  static saveCartState(cartState: CartState): void {
    if (!this.isStorageAvailable()) {
      throw new CartError(
        CartErrorCode.STORAGE_ERROR,
        'localStorage not available'
      )
    }

    try {
      const cartData = JSON.stringify(cartState)
      localStorage.setItem(CART_STORAGE_KEYS.CART_STATE, cartData)
      localStorage.setItem(CART_STORAGE_KEYS.CART_VERSION, CART_CONFIG.STORAGE_VERSION)

      // Update metadata timestamp
      const metadata: CartMetadata = {
        ...cartState.metadata,
        updatedAt: new Date().toISOString(),
      }
      localStorage.setItem(CART_STORAGE_KEYS.CART_METADATA, JSON.stringify(metadata))
    } catch (error) {
      console.error('Failed to save cart to storage:', error)
      throw new CartError(
        CartErrorCode.STORAGE_ERROR,
        'Failed to save cart to localStorage',
        error
      )
    }
  }

  /**
   * Clear all cart data from localStorage
   */
  static clearCart(): void {
    if (!this.isStorageAvailable()) {
      return
    }

    try {
      localStorage.removeItem(CART_STORAGE_KEYS.CART_STATE)
      localStorage.removeItem(CART_STORAGE_KEYS.CART_METADATA)
      localStorage.removeItem(CART_STORAGE_KEYS.CART_VERSION)
    } catch (error) {
      console.error('Failed to clear cart from storage:', error)
    }
  }

  /**
   * Get cart metadata
   */
  static getCartMetadata(): CartMetadata | null {
    if (!this.isStorageAvailable()) {
      return null
    }

    try {
      const metadataData = localStorage.getItem(CART_STORAGE_KEYS.CART_METADATA)
      if (!metadataData) {
        return null
      }

      return JSON.parse(metadataData) as CartMetadata
    } catch (error) {
      console.error('Failed to load cart metadata from storage:', error)
      return null
    }
  }

  /**
   * Update cart metadata
   */
  static updateCartMetadata(metadata: Partial<CartMetadata>): void {
    if (!this.isStorageAvailable()) {
      return
    }

    try {
      const currentMetadata = this.getCartMetadata()
      const updatedMetadata: CartMetadata = {
        createdAt: currentMetadata?.createdAt || new Date().toISOString(),
        ...currentMetadata,
        ...metadata,
        updatedAt: new Date().toISOString(),
      }

      localStorage.setItem(CART_STORAGE_KEYS.CART_METADATA, JSON.stringify(updatedMetadata))
    } catch (error) {
      console.error('Failed to update cart metadata:', error)
    }
  }

  /**
   * Get cart storage size in bytes
   */
  static getStorageSize(): number {
    if (!this.isStorageAvailable()) {
      return 0
    }

    try {
      const cartData = localStorage.getItem(CART_STORAGE_KEYS.CART_STATE) || ''
      const metadataData = localStorage.getItem(CART_STORAGE_KEYS.CART_METADATA) || ''
      const versionData = localStorage.getItem(CART_STORAGE_KEYS.CART_VERSION) || ''

      return new Blob([cartData + metadataData + versionData]).size
    } catch {
      return 0
    }
  }

  /**
   * Check if cart storage is near limit (estimate)
   */
  static isStorageNearLimit(): boolean {
    try {
      const size = this.getStorageSize()
      // Rough estimate: warn if cart data exceeds 100KB
      return size > 100 * 1024
    } catch {
      return false
    }
  }

  /**
   * Migrate cart data from older versions (if needed)
   */
  static migrateCartData(): void {
    // Future implementation for handling version migrations
    // This will be useful when cart schema changes
    const version = localStorage.getItem(CART_STORAGE_KEYS.CART_VERSION)

    if (!version || version !== CART_CONFIG.STORAGE_VERSION) {
      console.log('Cart data migration required, clearing old data')
      this.clearCart()
    }
  }
}