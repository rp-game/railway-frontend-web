/**
 * API Services for Frontend-Web
 *
 * This file provides API services that use the generated client where possible
 * and fall back to demo data when public endpoints are not available.
 *
 * IMPORTANT: This is a temporary solution until public API endpoints are implemented.
 * All demo data fallbacks will be replaced with real API calls.
 */

import { apiCall, apiUtils } from './client'
import {
  TrainsService,
  ProductsService,
  VnTicketIntegrationService,
  type Train,
  type Station,
  type Product,
  type ProductCategory,
  type TicketInfoResponseDto
} from './generated'

// Import demo data as fallback
import {
  demoTrains,
  getTrainByCode as getDemoTrainByCode,
  getTrainsByType as getDemoTrainsByType,
  getAvailableTrains as getDemoAvailableTrains,
  type DemoTrain
} from '../demo/trains'

import {
  demoStations,
  type DemoStation
} from '../demo/stations'

import {
  demoProducts,
  demoCategories,
  type DemoProduct,
  type DemoProductCategory
} from '../demo/products'

/**
 * Stations API Service
 */
class StationsAPI {
  /**
   * Get all stations with kitchen facilities
   * TODO: Replace with public API call when available
   */
  static async getStationsWithKitchen(): Promise<DemoStation[]> {
    try {
      // TODO: Replace with actual API call when public endpoint is available
      // const response = await apiCall(() => TrainsService.trainsControllerFindAllStations())
      // return response.filter(station => station.hasKitchen)

      // Fallback to demo data
      return demoStations.filter((station: DemoStation) => station.hasKitchen)
    } catch (error) {
      console.warn('Failed to fetch stations from API, using demo data:', error)
      return demoStations.filter((station: DemoStation) => station.hasKitchen)
    }
  }

  /**
   * Get station by code
   * TODO: Replace with public API call when available
   */
  static async getStationByCode(code: string): Promise<DemoStation | null> {
    try {
      // TODO: Replace with actual API call when public endpoint is available
      // const stations = await apiCall(() => TrainsService.trainsControllerFindAllStations())
      // return stations.find(station => station.stationCode === code) || null

      // Fallback to demo data
      return demoStations.find((station: DemoStation) => station.stationCode === code) || null
    } catch (error) {
      console.warn('Failed to fetch station from API, using demo data:', error)
      return demoStations.find((station: DemoStation) => station.stationCode === code) || null
    }
  }

  /**
   * Search stations by name or code
   * TODO: Replace with public API call when available
   */
  static async searchStations(query: string): Promise<DemoStation[]> {
    try {
      // TODO: Replace with actual API call when public endpoint is available
      // const response = await apiCall(() =>
      //   TrainsService.trainsControllerFindAllStationsPaginated({ search: query })
      // )
      // return response.data || []

      // Fallback to demo data
      const searchTerm = query.toLowerCase()
      return demoStations.filter((station: DemoStation) =>
        station.name.toLowerCase().includes(searchTerm) ||
        station.nameEn.toLowerCase().includes(searchTerm) ||
        station.city.toLowerCase().includes(searchTerm) ||
        station.stationCode.toLowerCase().includes(searchTerm)
      )
    } catch (error) {
      console.warn('Failed to search stations from API, using demo data:', error)
      const searchTerm = query.toLowerCase()
      return demoStations.filter((station: DemoStation) =>
        station.name.toLowerCase().includes(searchTerm) ||
        station.nameEn.toLowerCase().includes(searchTerm) ||
        station.city.toLowerCase().includes(searchTerm) ||
        station.stationCode.toLowerCase().includes(searchTerm)
      )
    }
  }
}

/**
 * Trains API Service
 */
class TrainsAPI {
  /**
   * Get all available trains
   * TODO: Replace with public API call when available
   */
  static async getAvailableTrains(): Promise<DemoTrain[]> {
    try {
      // TODO: Replace with actual API call when public endpoint is available
      // const response = await apiCall(() => TrainsService.trainsControllerFindAllTrains())
      // return response.filter(train => train.available)

      // Fallback to demo data
      return getDemoAvailableTrains()
    } catch (error) {
      console.warn('Failed to fetch trains from API, using demo data:', error)
      return getDemoAvailableTrains()
    }
  }

  /**
   * Get train by code
   * TODO: Replace with public API call when available
   */
  static async getTrainByCode(trainCode: string): Promise<DemoTrain | null> {
    try {
      // TODO: Replace with actual API call when public endpoint is available
      // const trains = await apiCall(() => TrainsService.trainsControllerFindAllTrains())
      // return trains.find(train => train.trainCode === trainCode) || null

      // Fallback to demo data
      return getDemoTrainByCode(trainCode) || null
    } catch (error) {
      console.warn('Failed to fetch train from API, using demo data:', error)
      return getDemoTrainByCode(trainCode) || null
    }
  }

  /**
   * Get trains by type
   * TODO: Replace with public API call when available
   */
  static async getTrainsByType(trainType: 'SE' | 'TN' | 'SNT'): Promise<DemoTrain[]> {
    try {
      // TODO: Replace with actual API call when public endpoint is available
      // const trains = await apiCall(() => TrainsService.trainsControllerFindAllTrains())
      // return trains.filter(train => train.trainType === trainType)

      // Fallback to demo data
      return getDemoTrainsByType(trainType)
    } catch (error) {
      console.warn('Failed to fetch trains by type from API, using demo data:', error)
      return getDemoTrainsByType(trainType)
    }
  }

  /**
   * Search train schedules
   * TODO: Replace with public API call when available
   */
  static async searchTrainSchedules(
    origin: string,
    destination: string,
    date?: string
  ): Promise<DemoTrain[]> {
    try {
      // TODO: Replace with actual API call when public endpoint is available
      // const response = await apiCall(() =>
      //   TrainsService.trainsControllerFindTrainSchedules({ origin, destination, date })
      // )
      // return response || []

      // Fallback to demo data - simplified filtering
      return demoTrains.filter((train: DemoTrain) =>
        train.departureStation.code === origin &&
        train.arrivalStation.code === destination
      )
    } catch (error) {
      console.warn('Failed to search train schedules from API, using demo data:', error)
      return demoTrains.filter((train: DemoTrain) =>
        train.departureStation.code === origin &&
        train.arrivalStation.code === destination
      )
    }
  }
}

/**
 * Products API Service
 */
class ProductsAPI {
  /**
   * Get all product categories
   * TODO: Replace with public API call when available
   */
  static async getCategories(): Promise<DemoProductCategory[]> {
    try {
      // TODO: Replace with actual API call when public endpoint is available
      // const response = await apiCall(() => ProductsService.productsControllerFindCategories({}))
      // return response.data || []

      // Fallback to demo data
      return demoCategories
    } catch (error) {
      console.warn('Failed to fetch categories from API, using demo data:', error)
      return demoCategories
    }
  }

  /**
   * Get products by category
   * TODO: Replace with public API call when available
   */
  static async getProductsByCategory(categoryId: string): Promise<DemoProduct[]> {
    try {
      // TODO: Replace with actual API call when public endpoint is available
      // const response = await apiCall(() =>
      //   ProductsService.productsControllerFindAll({ category: categoryId })
      // )
      // return response.data || []

      // Fallback to demo data
      return demoProducts.filter((product: DemoProduct) => product.categoryId === categoryId)
    } catch (error) {
      console.warn('Failed to fetch products by category from API, using demo data:', error)
      return demoProducts.filter((product: DemoProduct) => product.categoryId === categoryId)
    }
  }

  /**
   * Get products by station
   * TODO: Replace with public API call when available
   */
  static async getProductsByStation(stationCode: string): Promise<DemoProduct[]> {
    try {
      // TODO: Replace with actual API call when public endpoint is available
      // This would require a new public endpoint like:
      // GET /api/v1/public/stations/{stationCode}/products

      // Fallback to demo data
      return demoProducts.filter((product: DemoProduct) =>
        product.stationCodes.includes(stationCode)
      )
    } catch (error) {
      console.warn('Failed to fetch products by station from API, using demo data:', error)
      return demoProducts.filter((product: DemoProduct) =>
        product.stationCodes.includes(stationCode)
      )
    }
  }

  /**
   * Get available products (in stock and active)
   * TODO: Replace with public API call when available
   */
  static async getAvailableProducts(): Promise<DemoProduct[]> {
    try {
      // TODO: Replace with actual API call when public endpoint is available
      // const response = await apiCall(() =>
      //   ProductsService.productsControllerFindAll({
      //     // Add filters for available products
      //   })
      // )
      // return response.data?.filter(product => product.available && product.stockLevel > 0) || []

      // Fallback to demo data
      return demoProducts.filter((product: DemoProduct) => product.available && product.stockLevel > 0)
    } catch (error) {
      console.warn('Failed to fetch available products from API, using demo data:', error)
      return demoProducts.filter((product: DemoProduct) => product.available && product.stockLevel > 0)
    }
  }

  /**
   * Search products by name or description
   * TODO: Replace with public API call when available
   */
  static async searchProducts(query: string): Promise<DemoProduct[]> {
    try {
      // TODO: Replace with actual API call when public endpoint is available
      // This would require a new public endpoint like:
      // GET /api/v1/public/products/search?q={query}

      // Fallback to demo data
      const searchTerm = query.toLowerCase()
      return demoProducts.filter((product: DemoProduct) =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.nameEn.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
      )
    } catch (error) {
      console.warn('Failed to search products from API, using demo data:', error)
      const searchTerm = query.toLowerCase()
      return demoProducts.filter((product: DemoProduct) =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.nameEn.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
      )
    }
  }

  /**
   * Get popular products
   * TODO: Replace with public API call when available
   */
  static async getPopularProducts(limit: number = 6): Promise<DemoProduct[]> {
    try {
      // TODO: Replace with actual API call when public endpoint is available
      // const response = await apiCall(() =>
      //   ProductsService.productsControllerFindAll({
      //     orderBy: 'popularity',
      //     limit
      //   })
      // )
      // return response.data || []

      // Fallback to demo data
      return [...demoProducts]
        .sort((a, b) => b.rating * b.reviewCount - a.rating * a.reviewCount)
        .slice(0, limit)
    } catch (error) {
      console.warn('Failed to fetch popular products from API, using demo data:', error)
      return [...demoProducts]
        .sort((a, b) => b.rating * b.reviewCount - a.rating * a.reviewCount)
        .slice(0, limit)
    }
  }
}

/**
 * Ticket Verification API Service
 * Uses the existing VN Ticket Integration endpoints
 */
class TicketAPI {
  /**
   * Verify QR ticket and get ticket information
   * This uses the existing API endpoint
   */
  static async verifyQRTicket(qrContent: string): Promise<TicketInfoResponseDto | null> {
    try {
      const response = await apiCall(() =>
        VnTicketIntegrationService.vnticketControllerGetTicketInfo({
          requestBody: { qrData: qrContent } as any
        })
      )
      return response
    } catch (error) {
      console.error('Failed to verify QR ticket:', error)
      // For demo purposes, return null - in real app this would throw error
      return null
    }
  }

  /**
   * Parse QR ticket format validation
   * This uses the existing public endpoint
   */
  static async validateQRFormat(qrContent: string): Promise<boolean> {
    try {
      const response = await apiCall(() =>
        VnTicketIntegrationService.vnticketControllerValidateQrFormat()
      )
      return response?.isValid || false
    } catch (error) {
      console.warn('Failed to validate QR format, assuming invalid:', error)
      return false
    }
  }
}

/**
 * Authentication API Service
 * For guest sessions and QR-based authentication
 */
class AuthAPI {
  /**
   * Create guest session for anonymous browsing
   * TODO: Implement when public endpoint is available
   */
  static async createGuestSession(): Promise<{ token: string } | null> {
    try {
      // TODO: Implement when public endpoint is available
      // const response = await apiCall(() =>
      //   AuthService.createGuestSession()
      // )
      // return response

      // For now, generate a temporary token
      const guestToken = `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      apiUtils.setGuestToken(guestToken)
      return { token: guestToken }
    } catch (error) {
      console.warn('Failed to create guest session:', error)
      return null
    }
  }

  /**
   * Authenticate with QR ticket
   * TODO: Implement when public endpoint is available
   */
  static async authenticateWithQR(ticketInfo: any): Promise<{ token: string } | null> {
    try {
      // TODO: Implement when public endpoint is available
      // const response = await apiCall(() =>
      //   AuthService.authenticateWithTicket(ticketInfo)
      // )
      // return response

      // For now, generate a session token
      const sessionToken = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      apiUtils.setSessionToken(sessionToken)
      return { token: sessionToken }
    } catch (error) {
      console.warn('Failed to authenticate with QR:', error)
      return null
    }
  }
}

// Export all services
export const api = {
  stations: StationsAPI,
  trains: TrainsAPI,
  products: ProductsAPI,
  tickets: TicketAPI,
  auth: AuthAPI,
}

// Export individual services for convenience
export { StationsAPI, TrainsAPI, ProductsAPI, TicketAPI, AuthAPI }