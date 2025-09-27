/**
 * Custom TypeScript type definitions for Frontend Web
 *
 * These types extend the generated API types and add frontend-specific types
 * that are not part of the backend API schema.
 */

// Note: Import types from generated API when available
// import type {
//   Order,
//   Product,
//   Station,
//   TrainSchedule,
//   PaymentMethod as APIPaymentMethod,
// } from '../lib/api/generated'

// Temporary types until API is generated
type Order = any
type Product = any
type Station = any
type TrainSchedule = any
type APIPaymentMethod = 'vnpay' | 'zalopay' | 'viettel_money' | 'qr_banking'

/**
 * UI State Types
 */
export interface LoadingState {
  isLoading: boolean
  error: string | null
}

export interface PaginationState {
  page: number
  pageSize: number
  total?: number
  hasMore: boolean
}

/**
 * Frontend-specific Customer Types
 */
export interface CustomerPreferences {
  dietaryRestrictions: string[]
  allergens: string[]
  spiceLevel: 'none' | 'mild' | 'medium' | 'hot' | 'extra_hot'
  language: 'vi' | 'en'
  paymentMethod?: APIPaymentMethod
}

export interface GuestProfile {
  anonymousId: string
  phoneNumber?: string
  email?: string
  deviceFingerprint: string
  createdAt: Date
}

/**
 * Session Management Types
 */
export interface TicketInfo {
  trainCode: string
  seatNumber: string
  carNumber?: string
  routeFrom: string
  routeTo: string
  departureTime: string
  arrivalTime: string
}

export interface CurrentTrip {
  ticketInfo: TicketInfo
  trainSchedule?: TrainSchedule
  availableStations: Station[]
  sessionExpiry: Date
  isAuthenticated: boolean
}

export interface CartItem {
  productId: string
  product: Product
  quantity: number
  unitPrice: number
  specialRequests?: string
  customizations?: ItemCustomization[]
}

export interface ItemCustomization {
  type: 'spice_level' | 'size' | 'add_on' | 'remove_ingredient'
  value: string
  priceAdjustment: number
}

export interface Cart {
  items: CartItem[]
  deliveryInfo?: DeliveryInfo
  totalAmount: number
  lastModified: Date
}

export interface DeliveryInfo {
  trainId: string
  stationDelivery: string
  estimatedArrival: string
  specialInstructions?: string
  contactInfo: ContactInfo
}

export interface ContactInfo {
  phoneNumber: string
  name?: string
}

/**
 * QR Scanner Types
 */
export interface QRScanResult {
  success: boolean
  data?: TicketInfo
  error?: string
}

export interface CameraPermission {
  granted: boolean
  error?: string
}

/**
 * Order Tracking Types
 */
export interface OrderTimeline {
  status: string
  timestamp: string
  message: string
  station?: string
}

export interface TrackingInfo {
  orderId: string
  currentStatus: string
  timeline: OrderTimeline[]
  estimatedDelivery: string
  currentStation?: string
  lastUpdated: string
}

/**
 * Payment Types
 */
export interface PaymentInitiation {
  orderId: string
  amount: number
  paymentMethod: APIPaymentMethod
  paymentUrl?: string
  qrCode?: string
  expires: string
}

export interface PaymentResult {
  success: boolean
  transactionId?: string
  orderId?: string
  error?: string
}

/**
 * API Response Wrapper Types
 */
export interface ApiResponse<T> {
  data: T
  meta?: {
    total?: number
    page?: number
    pageSize?: number
    lastUpdated?: string
    [key: string]: any
  }
}

export interface ApiError {
  error: string
  message: string
  code: string
  timestamp: string
  details?: Record<string, any>
  path?: string
  method?: string
}

/**
 * Form Types
 */
export interface QRValidationForm {
  qrContent: string
  deviceInfo?: {
    userAgent: string
    ipAddress?: string
  }
}

export interface GuestSessionForm {
  deviceFingerprint: string
  referrer?: string
}

export interface OTPRequestForm {
  phoneNumber: string
  purpose: 'order_confirmation' | 'payment_verification'
  orderId?: string
}

export interface OTPVerifyForm {
  otpId: string
  code: string
  phoneNumber: string
}

export interface OrderCreateForm {
  items: Omit<CartItem, 'product'>[]
  deliveryInfo: DeliveryInfo
  paymentMethod: APIPaymentMethod
}

/**
 * Filter and Search Types
 */
export interface ProductFilters {
  categoryId?: string
  trainId?: string
  stationId?: string
  search?: string
  dietaryFlags?: string[]
  priceRange?: {
    min: number
    max: number
  }
  available?: boolean
}

export interface MenuFilters {
  trainId?: string
  departureStation?: string
  arrivalStation?: string
  date?: string
}

/**
 * Analytics and Tracking Types
 */
export interface UserEvent {
  type: 'page_view' | 'qr_scan' | 'product_view' | 'add_to_cart' | 'order_placed'
  timestamp: Date
  data?: Record<string, any>
}

export interface ConversionMetrics {
  sessionId: string
  events: UserEvent[]
  conversionRate?: number
  abandonmentPoint?: string
}

/**
 * Progressive Web App Types
 */
export interface PWAInstallPrompt {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export interface ServiceWorkerMessage {
  type: 'CACHE_UPDATED' | 'ORDER_UPDATE' | 'OFFLINE_MODE'
  data?: any
}

/**
 * Notification Types
 */
export interface OrderNotification {
  orderId: string
  status: string
  message: string
  timestamp: string
  action?: {
    label: string
    url: string
  }
}

/**
 * Route Parameter Types (for React Router)
 */
export interface RouteParams {
  trainId?: string
  orderId?: string
  token?: string
  stationId?: string
}

/**
 * Component Props Types
 */
export interface BaseComponentProps {
  className?: string
  children?: React.ReactNode
}

export interface LoadingProps extends BaseComponentProps {
  isLoading: boolean
  error?: string | null
  retry?: () => void
}

export interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  pageSize: number
  onPageSizeChange?: (size: number) => void
}

/**
 * Utility Types
 */
export type SpiceLevel = 'none' | 'mild' | 'medium' | 'hot' | 'extra_hot'
export type Language = 'vi' | 'en'
export type OrderStatus = 'pending_payment' | 'confirmed' | 'preparing' | 'ready' | 'out_for_delivery' | 'delivered' | 'cancelled'
export type TrainType = 'SE' | 'TN' | 'SNT'