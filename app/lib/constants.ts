/**
 * Application constants for DSVN Food Customer Web
 */

export const APP_CONFIG = {
  name: 'DSVN Food Customer',
  description: 'Hệ thống đặt đồ ăn trên tàu - Đường sắt Việt Nam',
  version: '1.0.0',
} as const

export const API_CONFIG = {
  baseUrl: import.meta.env.VITE_API_BASE_URL || 'https://api.dsvn-food.vn',
  publicBasePath: '/api/v1/public',
  timeout: 10000,
  retries: 3,
  retryDelay: 1000,
} as const

export const ROUTES = {
  home: '/',
  scan: '/scan',
  menu: '/menu',
  order: '/order',
  track: '/track',
  payment: '/payment',
} as const

export const TRAIN_TYPES = {
  SE: 'Tàu Chất lượng cao',
  TN: 'Tàu Nhanh',
  SNT: 'Tàu Siêu nhanh',
} as const

export const ORDER_STATUS = {
  pending_payment: 'Chờ thanh toán',
  confirmed: 'Đã xác nhận',
  preparing: 'Đang chuẩn bị',
  ready: 'Sẵn sàng',
  out_for_delivery: 'Đang giao',
  delivered: 'Đã giao',
  cancelled: 'Đã hủy',
} as const

export const PAYMENT_METHODS = {
  vnpay: 'VNPay',
  zalopay: 'ZaloPay',
  viettel_money: 'Viettel Money',
  qr_banking: 'QR Banking',
} as const

export const BREAKPOINTS = {
  xs: '475px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const

export const SESSION_KEYS = {
  currentTrip: 'dsvn_current_trip',
  cart: 'dsvn_cart',
  guestToken: 'dsvn_guest_token',
  sessionToken: 'dsvn_session_token',
} as const

export const LOCAL_STORAGE_KEYS = {
  preferences: 'dsvn_preferences',
  orderHistory: 'dsvn_order_history',
  guestProfile: 'dsvn_guest_profile',
} as const

export const DIETARY_FLAGS = {
  vegetarian: 'Chay',
  vegan: 'Thuần chay',
  halal: 'Halal',
  spicy: 'Cay',
} as const

export const SPICE_LEVELS = {
  none: 'Không cay',
  mild: 'Ít cay',
  medium: 'Vừa cay',
  hot: 'Cay',
  extra_hot: 'Rất cay',
} as const

export const ERROR_CODES = {
  INVALID_QR: 'QR_INVALID',
  TICKET_EXPIRED: 'TICKET_EXPIRED',
  TRAIN_NOT_FOUND: 'TRAIN_NOT_FOUND',
  NETWORK_ERROR: 'NETWORK_ERROR',
  SESSION_EXPIRED: 'SESSION_EXPIRED',
  PAYMENT_FAILED: 'PAYMENT_FAILED',
  OUT_OF_STOCK: 'OUT_OF_STOCK',
  DELIVERY_NOT_POSSIBLE: 'DELIVERY_NOT_POSSIBLE',
} as const

export const QR_SCANNER_CONFIG = {
  constraints: {
    video: {
      facingMode: 'environment',
      width: { ideal: 1280 },
      height: { ideal: 720 },
    },
  },
  scanDelay: 500, // ms between scans
  timeout: 30000, // 30 seconds timeout
} as const

export const CACHE_DURATIONS = {
  stations: 24 * 60 * 60 * 1000, // 24 hours
  routes: 24 * 60 * 60 * 1000, // 24 hours
  menu: 4 * 60 * 60 * 1000, // 4 hours
  products: 1 * 60 * 60 * 1000, // 1 hour
  trainSchedule: 1 * 60 * 60 * 1000, // 1 hour
} as const