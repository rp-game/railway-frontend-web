import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utility function to merge Tailwind CSS classes
 * Used throughout the application for conditional styling
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format currency for Vietnamese Dong
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount)
}

/**
 * Format date for Vietnamese locale
 */
export function formatDate(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(dateObj)
}

/**
 * Generate device fingerprint for guest sessions
 */
export function generateDeviceFingerprint(): string {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (ctx) {
    ctx.textBaseline = 'top'
    ctx.font = '14px Arial'
    ctx.fillText('Device fingerprint', 2, 2)
  }

  const fingerprint = [
    navigator.userAgent,
    navigator.language,
    screen.width + 'x' + screen.height,
    new Date().getTimezoneOffset(),
    canvas.toDataURL(),
    navigator.hardwareConcurrency || 0,
    (navigator as any).deviceMemory || 0,
  ].join('|')

  // Simple hash function
  let hash = 0
  for (let i = 0; i < fingerprint.length; i++) {
    const char = fingerprint.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32-bit integer
  }

  return Math.abs(hash).toString(36)
}

/**
 * Validate Vietnamese phone number
 */
export function isValidPhoneNumber(phone: string): boolean {
  const phoneRegex = /^(\+84|0)[3-9]\d{8,9}$/
  return phoneRegex.test(phone)
}

/**
 * Parse QR code content from train ticket
 * Format: trainCode;seatNumber;routeFrom;routeTo;departureTime;arrivalTime
 */
export function parseTicketQR(qrContent: string): {
  trainCode: string
  seatNumber: string
  routeFrom: string
  routeTo: string
  departureTime: string
  arrivalTime: string
} | null {
  try {
    const parts = qrContent.split(';')
    if (parts.length !== 6) {
      return null
    }

    const [trainCode, seatNumber, routeFrom, routeTo, departureTime, arrivalTime] = parts

    // Basic validation
    if (!trainCode || !seatNumber || !routeFrom || !routeTo || !departureTime || !arrivalTime) {
      return null
    }

    return {
      trainCode,
      seatNumber,
      routeFrom,
      routeTo,
      departureTime,
      arrivalTime,
    }
  } catch {
    return null
  }
}