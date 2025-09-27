/**
 * Zod validation schemas for Frontend Web
 *
 * These schemas provide runtime validation for forms, API responses,
 * and data structures to ensure type safety throughout the application.
 */

import { z } from 'zod'

// Base validation schemas
export const phoneNumberSchema = z
  .string()
  .regex(/^(\+84|0)[3-9]\d{8,9}$/, 'Số điện thoại không hợp lệ')

export const trainCodeSchema = z
  .string()
  .regex(/^(SE|TN|SNT)\d+$/, 'Mã tàu không hợp lệ')

export const qrContentSchema = z
  .string()
  .min(10, 'Nội dung QR không hợp lệ')

// Ticket QR validation schema
export const ticketQRSchema = z.object({
  trainCode: trainCodeSchema,
  seatNumber: z.string().min(1, 'Số ghế không được để trống'),
  routeFrom: z.string().min(1, 'Ga đi không được để trống'),
  routeTo: z.string().min(1, 'Ga đến không được để trống'),
  departureTime: z.string().datetime('Thời gian khởi hành không hợp lệ'),
  arrivalTime: z.string().datetime('Thời gian đến không hợp lệ'),
})

// Authentication schemas
export const qrValidationSchema = z.object({
  qrContent: qrContentSchema,
  deviceInfo: z.object({
    userAgent: z.string(),
    ipAddress: z.string().optional(),
  }).optional(),
})

export const guestSessionSchema = z.object({
  deviceFingerprint: z.string().min(1, 'Device fingerprint là bắt buộc'),
  referrer: z.string().optional(),
})

export const otpRequestSchema = z.object({
  phoneNumber: phoneNumberSchema,
  purpose: z.enum(['order_confirmation', 'payment_verification']),
  orderId: z.string().optional(),
})

export const otpVerifySchema = z.object({
  otpId: z.string().min(1, 'OTP ID là bắt buộc'),
  code: z.string().regex(/^\d{6}$/, 'Mã OTP phải có 6 chữ số'),
  phoneNumber: phoneNumberSchema,
})

// Customer preferences schema
export const customerPreferencesSchema = z.object({
  dietaryRestrictions: z.array(z.string()).default([]),
  allergens: z.array(z.string()).default([]),
  spiceLevel: z.enum(['none', 'mild', 'medium', 'hot', 'extra_hot']).default('none'),
  language: z.enum(['vi', 'en']).default('vi'),
  paymentMethod: z.enum(['vnpay', 'zalopay', 'viettel_money', 'qr_banking']).optional(),
})

// Cart and order schemas
export const cartItemSchema = z.object({
  productId: z.string().min(1, 'ID sản phẩm là bắt buộc'),
  quantity: z.number().min(1, 'Số lượng phải lớn hơn 0').max(10, 'Số lượng tối đa là 10'),
  unitPrice: z.number().min(0, 'Giá không được âm'),
  specialRequests: z.string().max(200, 'Yêu cầu đặc biệt tối đa 200 ký tự').optional(),
  customizations: z.array(z.object({
    type: z.enum(['spice_level', 'size', 'add_on', 'remove_ingredient']),
    value: z.string(),
    priceAdjustment: z.number(),
  })).optional(),
})

export const deliveryInfoSchema = z.object({
  trainId: z.string().min(1, 'ID tàu là bắt buộc'),
  seatNumber: z.string().optional(),
  carNumber: z.string().optional(),
  stationDelivery: z.string().min(1, 'Ga giao hàng là bắt buộc'),
  estimatedArrival: z.string().datetime('Thời gian đến dự kiến không hợp lệ'),
  specialInstructions: z.string().max(300, 'Hướng dẫn đặc biệt tối đa 300 ký tự').optional(),
})

export const contactInfoSchema = z.object({
  phoneNumber: phoneNumberSchema,
  name: z.string().min(1, 'Tên không được để trống').max(50, 'Tên tối đa 50 ký tự').optional(),
})

export const orderCreateSchema = z.object({
  items: z.array(cartItemSchema).min(1, 'Đơn hàng phải có ít nhất 1 sản phẩm'),
  deliveryInfo: z.object({
    trainId: z.string().min(1, 'ID tàu là bắt buộc'),
    seatNumber: z.string().optional(),
    carNumber: z.string().optional(),
    stationDelivery: z.string().min(1, 'Ga giao hàng là bắt buộc'),
    estimatedArrival: z.string().datetime('Thời gian đến dự kiến không hợp lệ'),
    specialInstructions: z.string().max(300, 'Hướng dẫn đặc biệt tối đa 300 ký tự').optional(),
  }),
  contactInfo: contactInfoSchema,
  paymentMethod: z.enum(['vnpay', 'zalopay', 'viettel_money', 'qr_banking']),
})

// Payment schemas
export const paymentInitializationSchema = z.object({
  orderId: z.string().min(1, 'ID đơn hàng là bắt buộc'),
  amount: z.number().min(1, 'Số tiền phải lớn hơn 0'),
  paymentMethod: z.enum(['vnpay', 'zalopay', 'viettel_money', 'qr_banking']),
  returnUrl: z.string().url('URL trở về không hợp lệ'),
  cancelUrl: z.string().url('URL hủy không hợp lệ'),
  guestToken: z.string().min(1, 'Guest token là bắt buộc'),
})

// Filter schemas
export const productFiltersSchema = z.object({
  categoryId: z.string().optional(),
  trainId: z.string().optional(),
  stationId: z.string().optional(),
  search: z.string().max(100, 'Từ khóa tìm kiếm tối đa 100 ký tự').optional(),
  dietaryFlags: z.array(z.string()).optional(),
  priceRange: z.object({
    min: z.number().min(0),
    max: z.number().min(0),
  }).refine((data) => data.max >= data.min, {
    message: 'Giá tối đa phải lớn hơn hoặc bằng giá tối thiểu',
    path: ['max'],
  }).optional(),
  available: z.boolean().optional(),
})

export const menuFiltersSchema = z.object({
  trainId: z.string().optional(),
  departureStation: z.string().optional(),
  arrivalStation: z.string().optional(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Ngày phải có định dạng YYYY-MM-DD').optional(),
})

// Pagination schema
export const paginationSchema = z.object({
  page: z.number().min(1, 'Trang phải lớn hơn 0').default(1),
  pageSize: z.number().min(1).max(100, 'Kích thước trang tối đa là 100').default(20),
  withCount: z.enum(['0', '1']).default('0'),
})

// API response schemas
export const apiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    data: dataSchema,
    meta: z.object({
      total: z.number().optional(),
      page: z.number().optional(),
      pageSize: z.number().optional(),
      lastUpdated: z.string().optional(),
    }).passthrough().optional(),
  })

export const apiErrorSchema = z.object({
  error: z.string(),
  message: z.string(),
  code: z.string(),
  timestamp: z.string(),
  details: z.record(z.string(), z.any()).optional(),
  path: z.string().optional(),
  method: z.string().optional(),
})

// Storage schemas for validation
export const currentTripSchema = z.object({
  ticketInfo: ticketQRSchema,
  trainSchedule: z.any().optional(), // Will be typed when API is ready
  availableStations: z.array(z.any()), // Will be typed when API is ready
  sessionExpiry: z.date(),
  isAuthenticated: z.boolean(),
})

export const cartSchema = z.object({
  items: z.array(cartItemSchema),
  deliveryInfo: deliveryInfoSchema.optional(),
  totalAmount: z.number().min(0),
  lastModified: z.date(),
})

export const guestProfileSchema = z.object({
  anonymousId: z.string().min(1),
  phoneNumber: phoneNumberSchema.optional(),
  email: z.string().email('Email không hợp lệ').optional(),
  deviceFingerprint: z.string().min(1),
  createdAt: z.date(),
})

// Export validation functions
export const validate = {
  ticketQR: (data: unknown) => ticketQRSchema.parse(data),
  qrValidation: (data: unknown) => qrValidationSchema.parse(data),
  guestSession: (data: unknown) => guestSessionSchema.parse(data),
  otpRequest: (data: unknown) => otpRequestSchema.parse(data),
  otpVerify: (data: unknown) => otpVerifySchema.parse(data),
  customerPreferences: (data: unknown) => customerPreferencesSchema.parse(data),
  cartItem: (data: unknown) => cartItemSchema.parse(data),
  orderCreate: (data: unknown) => orderCreateSchema.parse(data),
  paymentInitialization: (data: unknown) => paymentInitializationSchema.parse(data),
  productFilters: (data: unknown) => productFiltersSchema.parse(data),
  menuFilters: (data: unknown) => menuFiltersSchema.parse(data),
  pagination: (data: unknown) => paginationSchema.parse(data),
  apiError: (data: unknown) => apiErrorSchema.parse(data),
  currentTrip: (data: unknown) => currentTripSchema.parse(data),
  cart: (data: unknown) => cartSchema.parse(data),
  guestProfile: (data: unknown) => guestProfileSchema.parse(data),
}

// Type inference from schemas
export type TicketQR = z.infer<typeof ticketQRSchema>
export type QRValidation = z.infer<typeof qrValidationSchema>
export type GuestSession = z.infer<typeof guestSessionSchema>
export type OTPRequest = z.infer<typeof otpRequestSchema>
export type OTPVerify = z.infer<typeof otpVerifySchema>
export type CustomerPreferences = z.infer<typeof customerPreferencesSchema>
export type CartItem = z.infer<typeof cartItemSchema>
export type OrderCreate = z.infer<typeof orderCreateSchema>
export type PaymentInitialization = z.infer<typeof paymentInitializationSchema>
export type ProductFilters = z.infer<typeof productFiltersSchema>
export type MenuFilters = z.infer<typeof menuFiltersSchema>
export type Pagination = z.infer<typeof paginationSchema>
export type ApiError = z.infer<typeof apiErrorSchema>
export type CurrentTrip = z.infer<typeof currentTripSchema>
export type Cart = z.infer<typeof cartSchema>
export type GuestProfile = z.infer<typeof guestProfileSchema>