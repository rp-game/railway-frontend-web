# Multi-stage Dockerfile for DSVN Food Frontend Web (React Router v7)

# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production=false

# Copy source code
COPY . .

# Accept build arguments for Vite environment variables (client-side, embedded in bundle)
ARG VITE_API_BASE_URL
ARG VITE_APP_ENV
ARG VITE_APP_TITLE
ARG VITE_VIETTEL_MONEY_ENABLED
ARG VITE_ANALYTICS_ENABLED
ARG VITE_PUBLIC_API_ENABLED
ARG VITE_QR_SCANNING_ENABLED
ARG VITE_GUEST_ORDERING_ENABLED
ARG VITE_PWA_ENABLED
ARG VITE_ZALOPAY_ENABLED
ARG VITE_OFFLINE_MODE
ARG VITE_VNPAY_ENABLED

# Set environment variables for build (these get embedded into the bundle)
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_APP_ENV=$VITE_APP_ENV
ENV VITE_APP_TITLE=$VITE_APP_TITLE
ENV VITE_VIETTEL_MONEY_ENABLED=$VITE_VIETTEL_MONEY_ENABLED
ENV VITE_ANALYTICS_ENABLED=$VITE_ANALYTICS_ENABLED
ENV VITE_PUBLIC_API_ENABLED=$VITE_PUBLIC_API_ENABLED
ENV VITE_QR_SCANNING_ENABLED=$VITE_QR_SCANNING_ENABLED
ENV VITE_GUEST_ORDERING_ENABLED=$VITE_GUEST_ORDERING_ENABLED
ENV VITE_PWA_ENABLED=$VITE_PWA_ENABLED
ENV VITE_ZALOPAY_ENABLED=$VITE_ZALOPAY_ENABLED
ENV VITE_OFFLINE_MODE=$VITE_OFFLINE_MODE
ENV VITE_VNPAY_ENABLED=$VITE_VNPAY_ENABLED

# Build the application with embedded client environment variables
RUN npm run build

# Production stage
FROM node:20-alpine AS production

WORKDIR /app

# Install production dependencies
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copy built application from builder stage
COPY --from=builder /app/build ./build

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S reactrouter -u 1001 -G nodejs

# Change ownership of the app directory
RUN chown -R reactrouter:nodejs /app
USER reactrouter

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

# Start the application
CMD ["npm", "run", "start"]

# Development stage (for local development with hot reload)
FROM node:20-alpine AS development

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S reactrouter -u 1001 -G nodejs

# Change ownership of the app directory
RUN chown -R reactrouter:nodejs /app
USER reactrouter

# Expose port
EXPOSE 5173

# Health check for development
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:5173/ || exit 1

# Start development server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]