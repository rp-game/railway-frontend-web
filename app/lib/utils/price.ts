import Decimal from 'decimal.js';

/**
 * Safely convert API price string to Decimal
 */
export function parseApiPrice(priceValue: string | number | null | undefined): Decimal {
  if (!priceValue) {
    return new Decimal(0);
  }

  try {
    return new Decimal(priceValue);
  } catch (error) {
    console.warn('Failed to parse price value:', priceValue, error);
    return new Decimal(0);
  }
}

/**
 * Get effective price from API Product (sale price if available, otherwise base price)
 */
export function getEffectivePrice(product: any): Decimal {
  // Check if there's a sale price and it's greater than 0
  const salePrice = parseApiPrice(product.salePrice);
  if (salePrice.greaterThan(0)) {
    return salePrice;
  }

  // Fall back to base price
  return parseApiPrice(product.basePrice);
}

/**
 * Format price as Vietnamese currency
 */
export function formatApiPrice(priceDecimal: Decimal, currency: string = 'VND'): string {
  const priceNumber = priceDecimal.toNumber();

  if (currency === 'VND') {
    // Format Vietnamese dong
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(priceNumber);
  }

  // Default formatting for other currencies
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: currency,
  }).format(priceNumber);
}

/**
 * Convenient function to get formatted price directly from product
 */
export function getFormattedProductPrice(product: any): string {
  const effectivePrice = getEffectivePrice(product);
  return formatApiPrice(effectivePrice, product.currency || 'VND');
}

/**
 * Calculate total price for quantity
 */
export function calculateTotalPrice(product: any, quantity: number): Decimal {
  const unitPrice = getEffectivePrice(product);
  return unitPrice.mul(quantity);
}

/**
 * Get formatted total price for quantity
 */
export function getFormattedTotalPrice(product: any, quantity: number): string {
  const totalPrice = calculateTotalPrice(product, quantity);
  return formatApiPrice(totalPrice, product.currency || 'VND');
}