import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Stale time: 5 minutes - consider data fresh for this long
      staleTime: 5 * 60 * 1000,
      // Cache time: 10 minutes - keep in cache this long after component unmounts
      gcTime: 10 * 60 * 1000,
      // Retry failed requests 3 times with exponential backoff
      retry: 3,
      // Refetch on window focus for better UX
      refetchOnWindowFocus: false,
      // Refetch on reconnect
      refetchOnReconnect: true,
    },
    mutations: {
      // Retry failed mutations once
      retry: 1,
    },
  },
})

// Query keys factory for consistency
export const queryKeys = {
  // Products
  products: {
    all: ['products'] as const,
    lists: () => [...queryKeys.products.all, 'list'] as const,
    list: (filters: Record<string, any>) => [...queryKeys.products.lists(), filters] as const,
    details: () => [...queryKeys.products.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.products.details(), id] as const,
    categories: ['products', 'categories'] as const,
    search: (query: string) => [...queryKeys.products.all, 'search', query] as const,
    byStation: (stationCode: string) => [...queryKeys.products.all, 'station', stationCode] as const,
    byCategory: (categoryId: string) => [...queryKeys.products.all, 'category', categoryId] as const,
    popular: (limit: number) => [...queryKeys.products.all, 'popular', limit] as const,
  },
  // Stations
  stations: {
    all: ['stations'] as const,
    lists: () => [...queryKeys.stations.all, 'list'] as const,
    list: (filters: Record<string, any>) => [...queryKeys.stations.lists(), filters] as const,
    details: () => [...queryKeys.stations.all, 'detail'] as const,
    detail: (code: string) => [...queryKeys.stations.details(), code] as const,
    withKitchen: ['stations', 'with-kitchen'] as const,
    search: (query: string) => [...queryKeys.stations.all, 'search', query] as const,
  },
  // Trains
  trains: {
    all: ['trains'] as const,
    lists: () => [...queryKeys.trains.all, 'list'] as const,
    list: (filters: Record<string, any>) => [...queryKeys.trains.lists(), filters] as const,
    details: () => [...queryKeys.trains.all, 'detail'] as const,
    detail: (code: string) => [...queryKeys.trains.details(), code] as const,
    byType: (type: string) => [...queryKeys.trains.all, 'type', type] as const,
    schedules: (params: Record<string, any>) => [...queryKeys.trains.all, 'schedules', params] as const,
  },
  // Tickets
  tickets: {
    verify: (qrContent: string) => ['tickets', 'verify', qrContent] as const,
    validate: (qrContent: string) => ['tickets', 'validate', qrContent] as const,
  },
}