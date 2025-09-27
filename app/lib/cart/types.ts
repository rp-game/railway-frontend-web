/**
 * Shopping Cart Types for Frontend-Web
 *
 * Defines types for cart items, cart state, and cart operations.
 * All cart data is stored in localStorage for persistence.
 */

import type { DemoProduct } from '../demo/products'

export interface CartItem {
  /** Unique identifier for this cart item */
  id: string
  /** Product information */
  product: DemoProduct
  /** Quantity selected */
  quantity: number
  /** Station where this item will be delivered */
  deliveryStation: string
  /** Special instructions or customizations */
  notes?: string
  /** When this item was added to cart */
  addedAt: string
  /** Customization options if any */
  customizations?: CartItemCustomization[]
}

export interface CartItemCustomization {
  /** Customization option ID */
  optionId: string
  /** Customization option name */
  optionName: string
  /** Selected choice ID */
  choiceId: string
  /** Selected choice name */
  choiceName: string
  /** Additional price for this customization */
  additionalPrice: number
}

export interface CartState {
  /** All items in the cart */
  items: CartItem[]
  /** Total number of items */
  totalItems: number
  /** Total price before tax */
  subtotal: number
  /** Tax amount */
  tax: number
  /** Total price including tax */
  total: number
  /** Cart metadata */
  metadata: CartMetadata
}

export interface CartMetadata {
  /** When cart was created */
  createdAt: string
  /** When cart was last updated */
  updatedAt: string
  /** User session information */
  sessionInfo?: {
    sessionToken?: string
    guestToken?: string
    ticketInfo?: any
  }
  /** Delivery preferences */
  deliveryPreferences?: {
    defaultStation?: string
    specialInstructions?: string
  }
}

export interface AddToCartParams {
  product: DemoProduct
  quantity: number
  deliveryStation: string
  notes?: string
  customizations?: CartItemCustomization[]
}

export interface UpdateCartItemParams {
  itemId: string
  quantity?: number
  deliveryStation?: string
  notes?: string
  customizations?: CartItemCustomization[]
}

// Cart storage keys
export const CART_STORAGE_KEYS = {
  CART_STATE: 'dsvn_food_cart',
  CART_METADATA: 'dsvn_food_cart_meta',
  CART_VERSION: 'dsvn_food_cart_version',
} as const

// Cart configuration
export const CART_CONFIG = {
  MAX_ITEMS_PER_PRODUCT: 10,
  MAX_TOTAL_ITEMS: 50,
  TAX_RATE: 0.1, // 10% VAT
  STORAGE_VERSION: '1.0',
  EXPIRY_DAYS: 7, // Cart expires after 7 days
} as const

// Cart validation errors
export enum CartErrorCode {
  MAX_QUANTITY_EXCEEDED = 'MAX_QUANTITY_EXCEEDED',
  MAX_ITEMS_EXCEEDED = 'MAX_ITEMS_EXCEEDED',
  PRODUCT_NOT_AVAILABLE = 'PRODUCT_NOT_AVAILABLE',
  INVALID_STATION = 'INVALID_STATION',
  CART_EXPIRED = 'CART_EXPIRED',
  STORAGE_ERROR = 'STORAGE_ERROR',
}

export class CartError extends Error {
  constructor(
    public code: CartErrorCode,
    message: string,
    public details?: any
  ) {
    super(message)
    this.name = 'CartError'
  }
}