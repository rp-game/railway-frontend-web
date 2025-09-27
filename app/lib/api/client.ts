/**
 * API Client Configuration for DSVN Food Frontend Web
 *
 * This file configures the generated OpenAPI client with proper types,
 * authentication, error handling, and caching strategies.
 *
 * IMPORTANT: This client ONLY works with properly typed API endpoints.
 * No mock data is allowed - all data must come from real API calls.
 */

// Note: Import from generated API when available
// import { ApiError, CancelablePromise, OpenAPI } from './generated'

// Temporary mock until API is generated
const OpenAPI = {
  BASE: '',
  TIMEOUT: 10000,
  interceptors: {
    request: { use: (fn: any) => {} },
    response: { use: (fn: any, errorFn?: any) => {} },
  },
}

class ApiError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public body?: any
  ) {
    super(`API Error ${status}: ${statusText}`)
  }
}

type CancelablePromise<T> = Promise<T>
import { API_CONFIG, SESSION_KEYS, ERROR_CODES } from '../constants'

// Configure the base OpenAPI client
OpenAPI.BASE = API_CONFIG.baseUrl + API_CONFIG.publicBasePath
OpenAPI.TIMEOUT = API_CONFIG.timeout

/**
 * Custom error class for typed API errors
 */
export class TypedAPIError extends Error {
  constructor(
    public readonly status: number,
    public readonly statusText: string,
    public readonly code: string,
    public readonly details?: Record<string, any>
  ) {
    super(`API Error ${status}: ${statusText}`)
    this.name = 'TypedAPIError'
  }
}

/**
 * Type-safe storage utilities
 */
class TypedStorage {
  static getSessionToken(): string | null {
    return sessionStorage.getItem(SESSION_KEYS.sessionToken)
  }

  static setSessionToken(token: string): void {
    sessionStorage.setItem(SESSION_KEYS.sessionToken, token)
  }

  static getGuestToken(): string | null {
    return sessionStorage.getItem(SESSION_KEYS.guestToken)
  }

  static setGuestToken(token: string): void {
    sessionStorage.setItem(SESSION_KEYS.guestToken, token)
  }

  static clearTokens(): void {
    sessionStorage.removeItem(SESSION_KEYS.sessionToken)
    sessionStorage.removeItem(SESSION_KEYS.guestToken)
  }
}

/**
 * Request interceptor - adds authentication headers
 * NOTE: This will be implemented when the actual OpenAPI client is generated
 */
/*
OpenAPI.interceptors.request.use((request: any) => {
  // Add session token if available (for QR-authenticated users)
  const sessionToken = TypedStorage.getSessionToken()
  if (sessionToken) {
    request.headers = {
      ...request.headers,
      'Authorization': `Bearer ${sessionToken}`,
    }
  }

  // Add guest token if available (for anonymous users)
  const guestToken = TypedStorage.getGuestToken()
  if (guestToken) {
    request.headers = {
      ...request.headers,
      'X-Guest-Token': guestToken,
    }
  }

  // Add common headers
  request.headers = {
    ...request.headers,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Client-Version': '1.0.0',
    'X-Client-Type': 'frontend-web',
  }

  return request
})
*/

/**
 * Response interceptor - handles errors and validation
 * NOTE: This will be implemented when the actual OpenAPI client is generated
 */
/*
OpenAPI.interceptors.response.use(
  (response: any) => {
    // TODO: Add runtime schema validation with Zod here
    // This will be implemented when public API endpoints are ready
    return response
  },
  (error) => {
    if (error instanceof ApiError) {
      // Map API errors to typed errors
      const typedError = new TypedAPIError(
        error.status,
        error.statusText,
        error.body?.code || ERROR_CODES.NETWORK_ERROR,
        error.body?.details
      )

      // Handle specific error cases
      if (error.status === 401) {
        // Session expired, clear tokens
        TypedStorage.clearTokens()
        // Optionally redirect to login or show error
      }

      throw typedError
    }

    throw error
  }
)
*/

/**
 * Retry mechanism for failed requests
 */
export async function withRetry<T>(
  apiCall: () => CancelablePromise<T>,
  maxRetries: number = API_CONFIG.retries
): Promise<T> {
  let lastError: Error

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await apiCall()
    } catch (error) {
      lastError = error as Error

      // Don't retry on client errors (4xx)
      if (error instanceof TypedAPIError && error.status >= 400 && error.status < 500) {
        throw error
      }

      // Don't retry on last attempt
      if (attempt === maxRetries) {
        break
      }

      // Wait before retrying (exponential backoff)
      const delay = API_CONFIG.retryDelay * Math.pow(2, attempt - 1)
      await new Promise(resolve => setTimeout(resolve, delay))
    }
  }

  throw lastError!
}

/**
 * Type-safe API call wrapper with error handling
 */
export async function apiCall<T>(
  call: () => CancelablePromise<T>
): Promise<T> {
  try {
    return await withRetry(call)
  } catch (error) {
    if (error instanceof TypedAPIError) {
      // Log error for debugging (remove in production)
      console.error('API Error:', {
        status: error.status,
        code: error.code,
        message: error.message,
        details: error.details,
      })
    }

    throw error
  }
}

/**
 * Utility functions for common API operations
 */
export const apiUtils = {
  /**
   * Check if we have a valid session
   */
  hasValidSession(): boolean {
    return !!TypedStorage.getSessionToken() || !!TypedStorage.getGuestToken()
  },

  /**
   * Clear all authentication data
   */
  clearAuth(): void {
    TypedStorage.clearTokens()
  },

  /**
   * Set session token (after QR authentication)
   */
  setSessionToken(token: string): void {
    TypedStorage.setSessionToken(token)
  },

  /**
   * Set guest token (for anonymous browsing)
   */
  setGuestToken(token: string): void {
    TypedStorage.setGuestToken(token)
  },

  /**
   * Get current authentication state
   */
  getAuthState(): {
    isAuthenticated: boolean
    isGuest: boolean
    hasSession: boolean
  } {
    const sessionToken = TypedStorage.getSessionToken()
    const guestToken = TypedStorage.getGuestToken()

    return {
      isAuthenticated: !!sessionToken,
      isGuest: !!guestToken && !sessionToken,
      hasSession: !!(sessionToken || guestToken),
    }
  },
}

// Export the configured OpenAPI client
export { OpenAPI } from './generated'

// Export all generated services and models
export * from './generated'