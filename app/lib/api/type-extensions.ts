/**
 * Type extensions for missing API fields
 * This file provides fallback types and utilities for missing API properties
 * until backend provides proper schema definitions
 *
 * TODO: Remove this file when backend API schema is updated with proper types
 */

import type { Product, ProductCategory, Vendor } from './generated'

// Extended types with missing fields
export interface ExtendedVendor extends Vendor {
  stationCode: string // Missing from API - fallback to businessAddress parsing
  name: string // Missing from API - fallback to businessName or displayName
}

export interface ExtendedProduct extends Omit<Product, 'vendor'> {
  stockLevel: number // Missing from API - default to 0, required for cart
  isVegetarian: boolean // Missing from API - parse from tags/metadata
  isSpicy: boolean // Missing from API - parse from tags/metadata
  preparationTime: number // Missing from API - default estimate
  averageRating: number // Missing from API - default to 0
  stationCodes: string[] // Missing from API - derive from vendor
  vendor?: ExtendedVendor // Use extended vendor type
  productId: string // Alias for id field - cart system compatibility
  available: boolean // Missing from API - derive from stock/status
}

export interface ExtendedProductCategory extends ProductCategory {
  id?: string // Missing from API - fallback to generated ID
  icon?: string // Missing from API - default icons by category
  name?: string // Missing from API - fallback to code or description
  code?: string // Missing from API - category identifier
  description?: string // Missing from API - category description
}

// Response wrapper that matches expected structure
export interface ExtendedProductDiscoveryResponse {
  data: ExtendedProduct[]
  meta?: {
    page?: number
    pageSize?: number
    total?: number
    filter?: Record<string, any>
  }
}

// Type guards for safe property access
export function hasStationCode(vendor: Vendor | undefined): vendor is ExtendedVendor & { stationCode: string } {
  return !!(vendor as ExtendedVendor)?.stationCode
}

export function hasVendorName(vendor: Vendor | undefined): vendor is ExtendedVendor & { name: string } {
  return !!(vendor as ExtendedVendor)?.name || !!(vendor as ExtendedVendor)?.businessName || !!(vendor as ExtendedVendor)?.displayName
}

export function hasCategoryId(category: ProductCategory | undefined): category is ExtendedProductCategory & { id: string } {
  return !!(category as ExtendedProductCategory)?.id
}

export function hasCategoryName(category: ProductCategory | undefined): category is ExtendedProductCategory & { name: string } {
  return !!(category as ExtendedProductCategory)?.name
}

// Default value providers
export const DEFAULT_PREPARATION_TIME = 15 // minutes
export const DEFAULT_RATING = 0
export const DEFAULT_STOCK_LEVEL = 100 // Default stock level until API provides real inventory

export const DEFAULT_CATEGORY_ICONS: Record<string, string> = {
  'food': '🍽️',
  'beverage': '🥤',
  'rice': '🍚',
  'noodles': '🍜',
  'snacks': '🍿',
  'dessert': '🍰',
  'vietnamese': '🇻🇳',
  'default': '🍽️'
}

export const DEFAULT_STATIONS = ['HAN', 'DNA', 'SGN'] // Fallback stations