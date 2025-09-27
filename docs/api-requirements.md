# API Requirements for Frontend-Web

## 📋 Tóm tắt

Document này tóm tắt các yêu cầu API public cần thiết để frontend-web có thể hoạt động. Tất cả các endpoint này cần được implement với proper OpenAPI 3.0+ specification và complete type definitions.

## 🚨 BLOCKING REQUIREMENTS

### 1. OpenAPI Specification
- **Version**: 3.0.0+
- **Complete schemas**: Request/response types cho tất cả endpoints
- **Real examples**: Dữ liệu thật trong documentation
- **Error definitions**: Typed error responses

### 2. Public Endpoints Group
**Base URL**: `/api/v1/public/`

```
/api/v1/public/
├── auth/
│   ├── POST /qr-validate              # Validate QR từ vé tàu
│   ├── POST /guest-session           # Tạo anonymous session
│   ├── POST /otp/request             # Request OTP
│   └── POST /otp/verify              # Verify OTP
├── catalog/
│   ├── GET /trains/schedule          # Lịch trình tàu
│   ├── GET /stations                 # Danh sách ga
│   ├── GET /routes                   # Tuyến đường
│   ├── GET /menus/by-train/{trainId} # Menu theo tàu
│   └── GET /products/available       # Sản phẩm available
├── orders/
│   ├── POST /guest/create            # Đặt hàng guest
│   ├── GET /guest/track/{token}      # Track đơn hàng
│   └── POST /estimate-delivery       # Ước tính giao hàng
└── payments/
    ├── POST /guest/initialize        # Khởi tạo payment
    ├── GET /methods/public           # Payment methods
    └── POST /verify-transaction      # Verify payment
```

## 📝 Chi tiết endpoints

### Authentication Endpoints

#### POST /api/v1/public/auth/qr-validate
Validate QR code từ vé tàu và tạo authenticated session.

**Request**:
```typescript
{
  qrContent: string;  // Raw QR từ vé tàu
  deviceInfo?: {
    userAgent: string;
    ipAddress?: string;
  };
}
```

**Response**:
```typescript
{
  valid: boolean;
  sessionToken?: string;
  ticketInfo?: {
    trainCode: string;
    seatNumber: string;
    routeFrom: string;
    routeTo: string;
    departureTime: string; // ISO datetime
    arrivalTime: string;   // ISO datetime
  };
  expires?: string; // ISO datetime
}
```

#### POST /api/v1/public/auth/guest-session
Tạo session cho guest browsing.

**Request**:
```typescript
{
  deviceFingerprint: string;
  referrer?: string;
}
```

**Response**:
```typescript
{
  guestToken: string;
  sessionId: string;
  expires: string; // ISO datetime
}
```

#### POST /api/v1/public/auth/otp/request
Request OTP cho guest checkout.

**Request**:
```typescript
{
  phoneNumber: string; // +84xxxxxxxxx format
  purpose: 'order_confirmation' | 'payment_verification';
  orderId?: string;
}
```

**Response**:
```typescript
{
  otpId: string;
  expires: string; // ISO datetime
  cooldown: number; // seconds before next request
}
```

#### POST /api/v1/public/auth/otp/verify
Verify OTP code.

**Request**:
```typescript
{
  otpId: string;
  code: string; // 6 digits
  phoneNumber: string;
}
```

**Response**:
```typescript
{
  verified: boolean;
  token?: string;
  expires?: string; // ISO datetime
}
```

### Catalog Endpoints

#### GET /api/v1/public/catalog/trains/schedule
Lấy lịch trình tàu public.

**Query Parameters**:
- `date`: string (YYYY-MM-DD, bắt buộc)
- `route?`: string
- `trainType?`: 'SE' | 'TN' | 'SNT'

**Response**:
```typescript
{
  data: TrainSchedule[];
  meta: { total?: number; date: string; }
}
```

#### GET /api/v1/public/catalog/stations
Danh sách ga đường sắt.

**Response**:
```typescript
{
  data: Station[];
  meta: { total: number; }
}
```

#### GET /api/v1/public/catalog/menus/by-train/{trainId}
Menu theo chuyến tàu cụ thể.

**Path Parameters**:
- `trainId`: string

**Query Parameters**:
- `departureStation?`: string
- `arrivalStation?`: string
- `date?`: string (YYYY-MM-DD)

**Response**:
```typescript
{
  data: {
    categories: MenuCategory[];
    products: Product[];
    availability: ProductAvailability[];
  };
  meta: {
    trainInfo: TrainInfo;
    routeInfo: RouteInfo;
    lastUpdated: string; // ISO datetime
  }
}
```

#### GET /api/v1/public/catalog/products/available
Sản phẩm available.

**Query Parameters**:
- `trainId?`: string
- `stationId?`: string
- `categoryId?`: string
- `withCount?`: 1 | 0 (default 0)
- `page?`: number (default 1)
- `pageSize?`: number (default 20, max 100)

**Response**:
```typescript
{
  data: Product[];
  meta: {
    total?: number; // khi withCount=1
    page: number;
    pageSize: number;
    filters: FilterInfo;
  }
}
```

### Order Endpoints

#### POST /api/v1/public/orders/guest/create
Đặt hàng cho guest.

**Request**:
```typescript
{
  items: OrderItem[];
  deliveryInfo: {
    trainId: string;
    seatNumber?: string;
    carNumber?: string;
    stationDelivery: string;
    estimatedArrival: string; // ISO datetime
    specialInstructions?: string;
  };
  contactInfo: {
    phoneNumber: string;
    name?: string;
  };
  paymentMethod: 'vnpay' | 'zalopay' | 'viettel_money' | 'qr_banking';
}
```

**Response**:
```typescript
{
  orderId: string;
  guestToken: string; // For tracking
  estimatedDelivery: string; // ISO datetime
  totalAmount: number;
  paymentUrl?: string; // If payment gateway required
  status: 'pending_payment' | 'confirmed';
}
```

#### GET /api/v1/public/orders/guest/track/{token}
Track đơn hàng bằng guest token.

**Path Parameters**:
- `token`: string (guest token)

**Response**:
```typescript
{
  order: {
    orderId: string;
    status: OrderStatus;
    items: OrderItem[];
    timeline: OrderTimeline[];
    deliveryInfo: DeliveryInfo;
    payment: PaymentInfo;
  };
  tracking: {
    currentStation?: string;
    estimatedDelivery: string; // ISO datetime
    lastUpdated: string; // ISO datetime
  }
}
```

#### POST /api/v1/public/orders/estimate-delivery
Ước tính thời gian giao hàng.

**Request**:
```typescript
{
  trainId: string;
  fromStation: string;
  toStation: string;
  departureTime: string; // ISO datetime
  items: { productId: string; quantity: number; }[];
}
```

**Response**:
```typescript
{
  estimatedMinutes: number;
  deliveryWindow: {
    earliest: string; // ISO datetime
    latest: string;   // ISO datetime
  };
  preparationTime: number; // minutes
  feasible: boolean;
  warnings?: string[];
}
```

### Payment Endpoints

#### POST /api/v1/public/payments/guest/initialize
Khởi tạo payment cho guest order.

**Request**:
```typescript
{
  orderId: string;
  amount: number;
  paymentMethod: PaymentMethod;
  returnUrl: string;
  cancelUrl: string;
  guestToken: string;
}
```

**Response**:
```typescript
{
  transactionId: string;
  paymentUrl?: string; // For redirect methods
  qrCode?: string;     // For QR payments
  expires: string;     // ISO datetime
}
```

#### GET /api/v1/public/payments/methods/public
Available payment methods.

**Response**:
```typescript
{
  data: {
    available: PaymentMethod[];
    fees: PaymentFee[];
    limits: PaymentLimit[];
  };
  meta: {
    lastUpdated: string; // ISO datetime
  }
}
```

#### POST /api/v1/public/payments/verify-transaction
Verify payment completion.

**Request**:
```typescript
{
  transactionId: string;
  guestToken: string;
}
```

**Response**:
```typescript
{
  status: 'pending' | 'success' | 'failed' | 'expired';
  amount?: number;
  paidAt?: string; // ISO datetime
  reference?: string;
  orderId?: string;
}
```

## 📋 Core Type Definitions

### TrainSchedule
```typescript
interface TrainSchedule {
  trainId: string;
  trainCode: string; // SE1, SE2, etc.
  routeName: string;
  departureStation: Station;
  arrivalStation: Station;
  departureTime: string; // ISO datetime
  arrivalTime: string;   // ISO datetime
  stops: TrainStop[];
  available: boolean;
  trainType: 'SE' | 'TN' | 'SNT';
}
```

### Station
```typescript
interface Station {
  stationId: string;
  stationCode: string; // SGN, HAN, etc.
  name: string;
  nameEn: string;
  city: string;
  province: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  hasKitchen: boolean;
  operatingHours: {
    open: string; // HH:mm
    close: string; // HH:mm
  };
}
```

### Product
```typescript
interface Product {
  productId: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  price: number;
  currency: 'VND';
  category: ProductCategory;
  images: ProductImage[];
  nutrition?: NutritionInfo;
  allergens: string[];
  dietaryFlags: ('vegetarian' | 'vegan' | 'halal' | 'spicy')[];
  preparationTime: number; // minutes
  available: boolean;
  stockLevel?: number;
}
```

### OrderItem
```typescript
interface OrderItem {
  productId: string;
  quantity: number;
  unitPrice: number;
  specialRequests?: string;
  customizations?: ItemCustomization[];
}
```

### Error Response
```typescript
interface APIError {
  error: string;
  message: string;
  code: string;
  timestamp: string; // ISO datetime
  details?: Record<string, any>;
  path?: string;
  method?: string;
}
```

## ⏰ Timeline

| Week | Task |
|------|------|
| 1 | Complete OpenAPI specifications cho public endpoints |
| 2 | Implement và deploy endpoints to staging |
| 3 | Frontend development begins với generated client |
| 4 | Integration testing và bug fixes |
| 5 | Production deployment |

## 🔗 Dependencies

1. **OpenAPI 3.0+ spec** - MUST có trước khi frontend dev
2. **Staging environment** - Test integration
3. **Error handling standards** - Consistent error responses
4. **Authentication middleware** - Handle tokens/sessions
5. **Rate limiting** - Prevent abuse

## ✅ Acceptance Criteria

- [ ] All endpoints có complete OpenAPI documentation
- [ ] TypeScript client generates without errors
- [ ] All responses có proper type definitions
- [ ] Error responses follow standard format
- [ ] Real data examples trong API docs
- [ ] Authentication flow works end-to-end
- [ ] Rate limiting implemented
- [ ] CORS configured for frontend domain

## 📞 Contact

- **Frontend Team**: Ready to integrate khi API ready
- **Questions**: Reference detailed specification trong `documents/frontend-web.requirement.md`
- **Issues**: Create ticket với API endpoint details

---

**Status**: Waiting for API implementation
**Priority**: High - Blocking frontend feature development
**Estimated Frontend Integration**: 1 week after API completion