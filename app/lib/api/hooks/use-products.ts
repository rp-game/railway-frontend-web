import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { ProductsService } from '../generated'
import { queryKeys } from '../query-client'
import type { Product, ProductCategory, ProductDiscoveryResponseDto } from '../generated'

// Product queries
export function useProducts(params?: {
  category?: string
  vendor?: string
  withCount?: number
  page?: number
  pageSize?: number
}) {
  return useQuery({
    queryKey: queryKeys.products.list(params || {}),
    queryFn: () => ProductsService.productsControllerFindAll(params || {}),
    enabled: true,
  })
}

export function useProductCategories(params?: {
  withCount?: number
  page?: number
  pageSize?: number
}) {
  return useQuery({
    queryKey: queryKeys.products.categories,
    queryFn: () => ProductsService.productsControllerFindCategories(params || {}),
    enabled: true,
  })
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: queryKeys.products.detail(id),
    queryFn: () => ProductsService.productsControllerFindOne({ id }),
    enabled: !!id,
  })
}

export function useProductsByCategory(categoryId: string) {
  return useQuery({
    queryKey: queryKeys.products.byCategory(categoryId),
    queryFn: () => ProductsService.productsControllerFindAll({ category: categoryId }),
    enabled: !!categoryId,
  })
}

export function useProductsByStation(stationCode: string, params?: {
  trainCode: string
  upcomingStations?: string[]
  categoryId?: string
  minPrice?: number
  maxPrice?: number
  search?: string
  page?: number
  pageSize?: number
}) {
  // Use the product discovery endpoint that finds products by train and stations
  return useQuery({
    queryKey: queryKeys.products.byStation(stationCode),
    queryFn: () => {
      const upcomingStations = [stationCode, ...(params?.upcomingStations || [])];
      console.log('Calling API with upcomingStations:', upcomingStations); // Debug log
      return ProductsService.productsControllerDiscoverProducts({
        trainCode: params?.trainCode || '',
        upcomingStations: upcomingStations,
        categoryId: params?.categoryId,
        minPrice: params?.minPrice,
        maxPrice: params?.maxPrice,
        search: params?.search,
        page: params?.page,
        pageSize: params?.pageSize,
      });
    },
    enabled: !!stationCode && !!params?.trainCode,
  })
}

export function useAvailableProducts() {
  return useQuery({
    queryKey: queryKeys.products.list({ available: true }),
    queryFn: () => ProductsService.productsControllerFindAll({}),
    enabled: true,
    select: (data) => {
      // Filter available products on the client side
      // Assuming API returns products with status and stock info
      return {
        ...data,
        data: data.data?.filter((product: Product) =>
          product.isActive && product.isVisible
        ) || []
      }
    },
  })
}

export function usePopularProducts(limit: number = 6) {
  return useQuery({
    queryKey: queryKeys.products.popular(limit),
    queryFn: () => ProductsService.productsControllerFindAll({ pageSize: limit }),
    enabled: true,
    select: (data) => {
      // Sort by computed price or other popularity metrics
      // Since we don't have popularity score, we'll use price as a proxy
      return {
        ...data,
        data: data.data?.slice(0, limit) || []
      }
    },
  })
}

export function useProductSearch(query: string) {
  return useQuery({
    queryKey: queryKeys.products.search(query),
    queryFn: () => ProductsService.productsControllerDiscoverProducts({
      trainCode: 'SE1', // Default train for search
      search: query,
    }),
    enabled: !!query && query.length > 2, // Only search with 3+ characters
  })
}

// Product mutations
export function useCreateProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ProductsService.productsControllerCreate,
    onSuccess: () => {
      // Invalidate and refetch product lists
      queryClient.invalidateQueries({ queryKey: queryKeys.products.lists() })
    },
  })
}

export function useUpdateProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      ProductsService.productsControllerUpdate({ id, requestBody: data }),
    onSuccess: (data, variables) => {
      // Update the product in cache
      queryClient.setQueryData(queryKeys.products.detail(variables.id), data)
      // Invalidate product lists to refresh
      queryClient.invalidateQueries({ queryKey: queryKeys.products.lists() })
    },
  })
}

export function useDeleteProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id }: { id: string }) =>
      ProductsService.productsControllerRemove({ id }),
    onSuccess: (data, variables) => {
      // Remove from cache
      queryClient.removeQueries({ queryKey: queryKeys.products.detail(variables.id) })
      // Invalidate lists
      queryClient.invalidateQueries({ queryKey: queryKeys.products.lists() })
    },
  })
}

// Inventory related hooks
export function useRealtimeInventory(params?: {
  vendorId?: string
  locationId?: string
  lowStockOnly?: boolean
  outOfStockOnly?: boolean
}) {
  return useQuery({
    queryKey: ['products', 'inventory', 'realtime', params],
    queryFn: () => ProductsService.productsControllerGetRealtimeInventory(params || {}),
    enabled: true,
    refetchInterval: 30000, // Refetch every 30 seconds for real-time data
  })
}

export function useUpdateInventory() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      ProductsService.productsControllerUpdateInventory({ id, requestBody: data }),
    onSuccess: () => {
      // Invalidate inventory queries
      queryClient.invalidateQueries({ queryKey: ['products', 'inventory'] })
    },
  })
}

// Category mutations
export function useCreateCategory() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ProductsService.productsControllerCreateCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.categories })
    },
  })
}

export function useDeleteCategory() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id }: { id: string }) =>
      ProductsService.productsControllerDeleteCategory({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.categories })
    },
  })
}