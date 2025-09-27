# DSVN Food Customer Web Frontend

Vietnamese Railway Food Ordering System - Customer Web Application

## 📋 Tổng quan

Ứng dụng web khách hàng cho hệ thống đặt đồ ăn trên tàu Đường sắt Việt Nam (DSVN). Được xây dựng với React Router v7 (modern Remix), TypeScript, và Tailwind CSS, tối ưu cho trải nghiệm mobile-first.

## 🚀 Tính năng chính

- **QR Authentication**: Quét QR từ vé tàu để tự động điền thông tin chuyến đi
- **Guest Ordering**: Đặt hàng không cần tài khoản, chỉ cần số điện thoại
- **Mobile-First Design**: Tối ưu cho điện thoại và tablet
- **Real-time Tracking**: Theo dõi đơn hàng thời gian thực
- **Multi-Payment**: Hỗ trợ VNPay, ZaloPay, Viettel Money, QR Banking
- **PWA Ready**: Progressive Web App với khả năng offline

## 🛠 Tech Stack

### Core Framework
- **React Router v7** (modern Remix) - Full-stack web framework
- **TypeScript** - Type safety và developer experience
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Build tool và dev server

### UI Components
- **Radix UI** - Accessible UI primitives
- **Class Variance Authority** - Component variant management
- **Tailwind Merge** - Conditional class merging

### API & Validation
- **OpenAPI TypeScript Codegen** - Auto-generated API client
- **Zod** - Runtime schema validation
- **Fetch API** - HTTP client

### Development Tools
- **ESLint** - Code linting
- **TypeScript Compiler** - Type checking
- **Git** - Version control

## 📁 Cấu trúc dự án

```
frontend-web/
├── app/                          # Main application code
│   ├── components/               # Reusable components
│   │   ├── ui/                  # Base UI components (Button, Dialog, etc.)
│   │   ├── qr/                  # QR scanning components
│   │   ├── layout/              # Layout components (Header, etc.)
│   │   └── forms/               # Form components
│   ├── routes/                  # React Router routes
│   │   ├── _index.tsx           # Home page
│   │   └── ...                  # Other route files
│   ├── lib/                     # Utility libraries
│   │   ├── api/                 # API client and types
│   │   │   ├── generated/       # Auto-generated from OpenAPI
│   │   │   └── client.ts        # API client configuration
│   │   ├── validation/          # Zod schemas
│   │   ├── utils.ts             # Utility functions
│   │   └── constants.ts         # App constants
│   ├── types/                   # Custom TypeScript types
│   └── styles/                  # CSS files
├── public/                      # Static assets
├── docs/                        # Documentation
├── scripts/                     # Build and deployment scripts
├── generate-client.sh           # API client generation script
└── package.json                 # Dependencies and scripts
```

## 🔧 Development Setup

### Prerequisites
- Node.js 18+
- npm hoặc yarn
- Git

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Generate API client** (cần openapi.json):
   ```bash
   ./generate-client.sh
   ```

3. **Setup environment variables**:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start development server**:
   ```bash
   npm run dev
   ```

   Ứng dụng sẽ chạy tại `http://localhost:5173`

## 📚 Scripts

```bash
# Development
npm run dev                  # Start dev server
npm run build                # Build for production
npm run start                # Start production server
npm run typecheck            # Type checking

# API Client
./generate-client.sh         # Generate TypeScript client from OpenAPI
```

## 🔌 API Integration

### Generated Client
API client được tự động generate từ OpenAPI specification:

```typescript
import { apiCall, apiUtils } from '~/lib/api/client'
import { PublicCatalogService } from '~/lib/api/generated'

// Type-safe API calls
const trainSchedule = await apiCall(() =>
  PublicCatalogService.getTrainSchedule({ date: '2025-09-27' })
)
```

### Authentication
- **QR Authentication**: Scan vé tàu để lấy session token
- **Guest Session**: Tạo session ẩn danh cho khách duyệt web
- **OTP Verification**: Xác thực số điện thoại cho đặt hàng

### Type Safety
- **NO MOCK DATA**: 100% dữ liệu từ API thật
- **Runtime Validation**: Zod schemas cho tất cả data
- **Build-time Checking**: TypeScript strict mode
- **Error Handling**: Typed error responses

## 🎨 UI Components

### Base Components (Radix UI + Tailwind)
```typescript
import { Button } from '~/components/ui/button'
import { Dialog } from '~/components/ui/dialog'
import { Progress } from '~/components/ui/progress'
import { Toast } from '~/components/ui/toast'

// Usage
<Button variant="train" size="lg" loading={isLoading}>
  Đặt hàng ngay
</Button>
```

### Specialized Components
```typescript
import { QRScanner } from '~/components/qr/qr-scanner'
import { ContactForm } from '~/components/forms/contact-form'
import { Header } from '~/components/layout/header'

// QR Scanner with camera
const { isOpen, result, error, open, close } = useQRScanner()
```

## 📱 Mobile-First Design

### Responsive Breakpoints
```css
/* Tailwind breakpoints */
xs: 475px    /* Small phones */
sm: 640px    /* Large phones */
md: 768px    /* Tablets */
lg: 1024px   /* Small laptops */
xl: 1280px   /* Desktop */
2xl: 1536px  /* Large desktop */
```

### Mobile Features
- **Touch-friendly**: Large tap targets, gestures
- **QR Camera**: Native camera API integration
- **PWA Support**: Install to homescreen
- **Offline Mode**: Service worker caching
- **Mobile Navigation**: Bottom tab navigation

## 🔐 Security & Validation

### Data Validation
```typescript
import { validate } from '~/lib/validation/schemas'

// Runtime validation
const ticketInfo = validate.ticketQR(qrContent)
const orderData = validate.orderCreate(formData)
```

### Security Features
- **Content Security Policy**: XSS protection
- **HTTPS Only**: Secure communication
- **Session Management**: Secure token storage
- **Input Sanitization**: Prevent injection attacks
- **Rate Limiting**: API abuse protection

## 🧪 Testing Strategy

### Type Safety
```bash
npm run typecheck           # TypeScript compilation
```

### Manual Testing
- **Cross-browser**: Chrome, Safari, Firefox
- **Cross-device**: Phones, tablets, desktop
- **Network conditions**: 3G, WiFi, offline
- **QR Scanning**: Various lighting, angles

## 📦 Deployment

### Build Process
```bash
npm run build               # Production build
npm run start               # Start production server
```

### Environment Variables
```env
VITE_API_BASE_URL=https://api.dsvn-food.vn
VITE_APP_ENV=production
```

### Docker Deployment
```dockerfile
# Dockerfile included for containerized deployment
docker build -t dsvn-frontend-web .
docker run -p 3000:3000 dsvn-frontend-web
```

## 🔄 API Requirements

### Public Endpoints Structure
Cần các endpoint public sau (xem chi tiết trong requirements document):

```
/api/v1/public/
├── auth/                    # QR validation, guest sessions, OTP
├── catalog/                 # Trains, stations, menus, products
├── orders/                  # Guest ordering, tracking
└── payments/                # Payment initialization, verification
```

### API Team Coordination
1. **OpenAPI 3.0+ specification** cho tất cả public endpoints
2. **Complete type definitions** cho request/response
3. **Real data examples** trong documentation
4. **Error handling standards** với typed responses

## 🚧 Development Status

### ✅ Completed
- [x] Project initialization với React Router v7
- [x] TypeScript configuration với strict mode
- [x] Tailwind CSS setup với mobile-first
- [x] Radix UI component library integration
- [x] OpenAPI client generation workflow
- [x] Core UI components (Button, Dialog, Progress, Toast)
- [x] QR Scanner component với camera API
- [x] Form components với validation
- [x] Type definitions và validation schemas
- [x] API client configuration với error handling
- [x] Project structure và documentation

### 🔄 Pending (cần public API endpoints)
- [ ] Authentication flow implementation
- [ ] Menu browsing và product catalog
- [ ] Shopping cart và checkout flow
- [ ] Order tracking và notifications
- [ ] Payment gateway integration
- [ ] PWA configuration
- [ ] Error boundaries và fallbacks
- [ ] Performance optimization
- [ ] SEO optimization

## 🤝 Contributing

### Code Style
- **TypeScript strict mode**: Không có `any` types
- **Functional components**: React hooks
- **Tailwind CSS**: Utility-first styling
- **Component composition**: Radix UI patterns

### Commit Convention
```bash
feat: add QR scanner component
fix: resolve type error in API client
docs: update API requirements
style: format code with prettier
```

## 📞 Support

- **Technical Issues**: Create issue trong repository
- **API Questions**: Liên hệ API team
- **Business Requirements**: Liên hệ Product Management

---

## 🎯 Next Steps

1. **API Team**: Implement public endpoints theo specification
2. **Frontend Team**: Implement customer flows khi API ready
3. **Testing**: Cross-browser và device testing
4. **Deployment**: Setup production environment
5. **Monitoring**: Performance và error tracking

**Status**: Ready for API integration và feature implementation

*Generated with [Claude Code](https://claude.ai/code) - v1.0*
