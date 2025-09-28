/**
 * API Data Adapters
 * Converts raw API responses to extended types with fallback values
 * for missing fields until backend provides proper schema
 */

import type { Product, ProductCategory, Vendor } from './generated'
import type {
  ExtendedProduct,
  ExtendedProductCategory,
  ExtendedVendor,
  ExtendedProductDiscoveryResponse
} from './type-extensions'
import {
  DEFAULT_PREPARATION_TIME,
  DEFAULT_RATING,
  DEFAULT_STOCK_LEVEL,
  DEFAULT_CATEGORY_ICONS,
  DEFAULT_STATIONS
} from './type-extensions'

/**
 * Convert API Vendor to ExtendedVendor with fallback values
 */
export function adaptVendor(vendor: Vendor): ExtendedVendor {
  const adapted: ExtendedVendor = {
    ...vendor,
    // Extract station code from business address or use default
    stationCode: extractStationCodeFromAddress(vendor.businessAddress) || 'HAN',
    // Use displayName, businessName, or fallback
    name: vendor.displayName || vendor.businessName || 'Nhà cung cấp'
  }

  return adapted
}

/**
 * Convert API Product to ExtendedProduct with fallback values
 */
export function adaptProduct(product: Product): ExtendedProduct {
  const vendor = product.vendor ? adaptVendor(product.vendor) : undefined

  const adapted: ExtendedProduct = {
    ...product,
    stockLevel: DEFAULT_STOCK_LEVEL, // API doesn't provide this yet - always provide default
    isVegetarian: extractDietaryFlag(product, 'vegetarian'),
    isSpicy: extractDietaryFlag(product, 'spicy'),
    preparationTime: extractPreparationTime(product),
    averageRating: DEFAULT_RATING, // API doesn't provide this yet - always provide default
    stationCodes: vendor?.stationCode ? [vendor.stationCode] : DEFAULT_STATIONS, // Always provide array
    vendor: vendor,
    productId: product.id, // Alias for cart system compatibility - always provide
    available: product.isActive && product.isVisible && product.status === 'active' // Derive availability - always provide
  }

  return adapted
}

/**
 * Convert API ProductCategory to ExtendedProductCategory with fallback values
 */
export function adaptProductCategory(category: ProductCategory): ExtendedProductCategory {
  const adapted: ExtendedProductCategory = {
    ...category,
    // Generate ID from existing fields or use random
    id: generateCategoryId(category),
    // Get icon from mapping or use default
    icon: getCategoryIcon(category),
    // Use existing name or derive from description/code
    name: extractCategoryName(category)
  }

  return adapted
}

/**
 * Convert product discovery response to expected format
 */
export function adaptProductDiscoveryResponse(response: any): ExtendedProductDiscoveryResponse {
  // Handle different response structures
  const products = response.data || response.products || response || []

  return {
    data: Array.isArray(products) ? products.map(adaptProduct) : [],
    meta: response.meta || {
      page: 1,
      pageSize: products.length,
      total: products.length
    }
  }
}

// Helper functions

function extractStationCodeFromAddress(address?: string): string | undefined {
  if (!address) return undefined

  // Try to extract station codes from address
  const stationPatterns = [
    /Ga\s+([A-Z]{3})/i,
    /([A-Z]{3})\s+Station/i,
    /(HAN|DNA|SGN|HUE|DNH)/i
  ]

  for (const pattern of stationPatterns) {
    const match = address.match(pattern)
    if (match) return match[1].toUpperCase()
  }

  return undefined
}

function extractDietaryFlag(product: Product, flag: 'vegetarian' | 'spicy'): boolean {
  // Check in tags array - safely access potentially missing field
  const productWithTags = product as Product & { tags?: string[] }
  if (productWithTags.tags && Array.isArray(productWithTags.tags)) {
    return productWithTags.tags.some((tag: string) =>
      tag.toLowerCase().includes(flag) ||
      (flag === 'vegetarian' && (tag.includes('chay') || tag.includes('vegan'))) ||
      (flag === 'spicy' && (tag.includes('cay') || tag.includes('spicy')))
    )
  }

  // Check in metadata - safely access potentially missing field
  const productWithMetadata = product as Product & {
    metadata?: {
      [flag]?: boolean
      isVegetarian?: boolean
      spiceLevel?: number
    }
  }
  if (productWithMetadata.metadata && typeof productWithMetadata.metadata === 'object') {
    const metadata = productWithMetadata.metadata
    if (metadata[flag] !== undefined) return !!metadata[flag]
    if (metadata.isVegetarian !== undefined && flag === 'vegetarian') return !!metadata.isVegetarian
    if (metadata.spiceLevel !== undefined && flag === 'spicy') return metadata.spiceLevel > 0
  }

  // Check in description - safely handle undefined
  const description = (product.description || '').toLowerCase()
  if (flag === 'vegetarian') {
    return description.includes('chay') || description.includes('vegetarian') || description.includes('vegan')
  }
  if (flag === 'spicy') {
    return description.includes('cay') || description.includes('spicy') || description.includes('🌶')
  }

  return false
}

function extractPreparationTime(product: Product): number {
  // Check if already provided - safely access potentially missing field
  const productWithTime = product as Product & { preparationTime?: number }
  if (productWithTime.preparationTime) return productWithTime.preparationTime

  // Check in metadata - safely access potentially missing field
  const productWithMetadata = product as Product & {
    metadata?: {
      preparationTime?: number
      cookingTime?: number
    }
  }
  if (productWithMetadata.metadata && typeof productWithMetadata.metadata === 'object') {
    const metadata = productWithMetadata.metadata
    if (metadata.preparationTime) return metadata.preparationTime
    if (metadata.cookingTime) return metadata.cookingTime
  }

  // Estimate based on product type - safely handle undefined
  const productType = product.productType?.toLowerCase()
  if (productType?.includes('beverage')) return 3
  if (productType?.includes('snack')) return 5
  if (productType?.includes('food')) return DEFAULT_PREPARATION_TIME

  return DEFAULT_PREPARATION_TIME
}

function generateCategoryId(category: ProductCategory): string {
  // Use existing ID-like field or generate one - safely access potentially missing fields
  const categoryWithFields = category as ProductCategory & {
    id?: string
    categoryId?: string
    code?: string
  }
  return categoryWithFields.id ||
         categoryWithFields.categoryId ||
         categoryWithFields.code ||
         `cat-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

function getCategoryIcon(category: ProductCategory): string {
  // Safely access potentially missing fields
  const categoryWithFields = category as ProductCategory & {
    code?: string
    description?: string
  }
  const code = categoryWithFields.code?.toLowerCase() || ''
  const description = (categoryWithFields.description || '').toLowerCase()

  // Try to match by code first
  if (DEFAULT_CATEGORY_ICONS[code]) {
    return DEFAULT_CATEGORY_ICONS[code]
  }

  // Try to match by description keywords
  for (const [key, icon] of Object.entries(DEFAULT_CATEGORY_ICONS)) {
    if (description.includes(key) || code.includes(key)) {
      return icon
    }
  }

  return DEFAULT_CATEGORY_ICONS.default
}

function extractCategoryName(category: ProductCategory): string {
  // Safely access potentially missing fields
  const categoryWithFields = category as ProductCategory & {
    name?: string
    description?: string
    code?: string
  }
  return categoryWithFields.name ||
         categoryWithFields.description ||
         categoryWithFields.code ||
         'Danh mục'
}