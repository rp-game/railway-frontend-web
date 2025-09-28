import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { TrainsService } from '../generated'
import { queryKeys } from '../query-client'
import type { Train, TrainResponseDto, TrainListResponseDto, TrainScheduleDto } from '../generated'

// Types for compatibility with existing components
export interface MappedTrain {
  // Map API Train to demo structure for compatibility
  trainId: string // mapped from id
  trainCode: string
  name: string // mapped from trainName
  nameEn: string // fallback to trainName
  type: string // mapped from trainType
  capacity: number
  facilities: string[] // derived from facilities object
  route: {
    origin: string
    destination: string
    totalDistance: number
    estimatedDuration: number
  }
  carriages: number
  status: string
  description: string
  // Original API fields
  id: string
  trainName: string
  trainType: string
  maxCapacity: number
  originalFacilities?: Record<string, any> // renamed to avoid duplicate
  operatingStatus: string
  routeInfo?: {
    originStation: string
    destinationStation: string
    totalDistanceKm: number
    estimatedDurationMinutes: number
  }
  numberOfCarriages: number
  createdAt: string
  updatedAt: string
}

// Helper function to map API Train to compatible format
function mapTrainToCompatible(train: Train | TrainResponseDto): MappedTrain {
  // Extract facilities as array from facilities object
  const facilitiesArray: string[] = []
  if (train.facilities) {
    Object.entries(train.facilities).forEach(([key, value]) => {
      if (value === true) {
        facilitiesArray.push(key)
      }
    })
  }

  return {
    // Compatibility mappings
    trainId: train.id,
    trainCode: train.trainCode || train.id, // Add missing trainCode property
    name: train.trainName,
    nameEn: train.trainName, // Fallback since API doesn't have nameEn
    type: train.trainType,
    capacity: train.maxCapacity || 0,
    facilities: facilitiesArray,
    route: train.routeInfo ? {
      origin: train.routeInfo.originStation || '',
      destination: train.routeInfo.destinationStation || '',
      totalDistance: train.routeInfo.totalDistanceKm || 0,
      estimatedDuration: train.routeInfo.estimatedDurationMinutes || 0
    } : {
      origin: '',
      destination: '',
      totalDistance: 0,
      estimatedDuration: 0
    },
    carriages: train.numberOfCarriages || 0,
    status: train.operatingStatus,
    description: train.description || '',

    // Original API fields
    id: train.id,
    trainName: train.trainName,
    trainType: train.trainType,
    maxCapacity: train.maxCapacity || 0,
    originalFacilities: train.facilities, // Rename to avoid duplicate key
    operatingStatus: train.operatingStatus,
    routeInfo: train.routeInfo,
    numberOfCarriages: train.numberOfCarriages || 0,
    createdAt: train.createdAt,
    updatedAt: train.updatedAt,
  }
}

// Train queries
export function useTrains(params?: {
  page?: number
  limit?: number
  status?: 'active' | 'inactive' | 'maintenance'
  trainType?: string
  search?: string
}) {
  return useQuery({
    queryKey: queryKeys.trains.list(params || {}),
    queryFn: () => TrainsService.trainsControllerFindAllTrainsPaginated(params || {}),
    enabled: true,
    select: (data: TrainListResponseDto) => ({
      ...data,
      trains: data.trains?.map(mapTrainToCompatible) || []
    }),
  })
}

export function useTrainsSimple() {
  return useQuery({
    queryKey: queryKeys.trains.all,
    queryFn: () => TrainsService.trainsControllerFindAllTrains(),
    enabled: true,
    select: (data: TrainResponseDto[]) => data.map(mapTrainToCompatible),
  })
}

export function useTrainByCode(trainCode: string) {
  return useQuery({
    queryKey: queryKeys.trains.detail(trainCode),
    queryFn: async () => {
      // Since there's no direct "get by code" endpoint, we'll search
      const data = await TrainsService.trainsControllerFindAllTrains()
      const train = data.find(t => t.trainCode === trainCode)
      if (!train) {
        throw new Error(`Train with code ${trainCode} not found`)
      }
      return train
    },
    enabled: !!trainCode,
    select: mapTrainToCompatible,
  })
}

export function useTrainsByType(trainType: string) {
  return useQuery({
    queryKey: queryKeys.trains.byType(trainType),
    queryFn: () => TrainsService.trainsControllerFindAllTrainsPaginated({ trainType }),
    enabled: !!trainType,
    select: (data: TrainListResponseDto) => ({
      ...data,
      trains: data.trains?.map(mapTrainToCompatible) || []
    }),
  })
}

export function useTrainSearch(query: string) {
  return useQuery({
    queryKey: queryKeys.trains.search(query),
    queryFn: () => TrainsService.trainsControllerFindAllTrainsPaginated({
      search: query,
      limit: 50, // Get more results for search
    }),
    enabled: !!query && query.length > 1,
    select: (data: TrainListResponseDto) => ({
      ...data,
      trains: data.trains?.map(mapTrainToCompatible) || []
    }),
  })
}

// Train schedule queries
export function useTrainSchedules(params: {
  trainCode?: string
  originStationCode?: string
  destinationStationCode?: string
  departureDate?: string
  status?: 'scheduled' | 'active' | 'completed' | 'cancelled'
  page?: number
  limit?: number
}) {
  return useQuery({
    queryKey: queryKeys.trains.schedules(params),
    queryFn: () => TrainsService.trainsControllerFindSchedules(params),
    enabled: !!(params.trainCode || params.originStationCode || params.destinationStationCode),
  })
}

export function useTrainSchedulesByRoute(
  originStationCode: string,
  destinationStationCode: string,
  departureDate?: string
) {
  return useQuery({
    queryKey: ['trains', 'schedules', 'route', originStationCode, destinationStationCode, departureDate],
    queryFn: () => TrainsService.trainsControllerFindSchedules({
      originStationCode,
      destinationStationCode,
      departureDate,
    }),
    enabled: !!(originStationCode && destinationStationCode),
  })
}

// For backward compatibility - match demo function signatures
export function useGetTrainByCode(trainCode: string) {
  return useTrainByCode(trainCode)
}

export function useSearchTrains(query: string) {
  return useTrainSearch(query)
}

export function useGetTrainsByType(trainType: string) {
  return useTrainsByType(trainType)
}

// Train mutations (for admin/management features)
export function useCreateTrain() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: TrainsService.trainsControllerCreateTrain,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.trains.lists() })
    },
  })
}

export function useUpdateTrain() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => {
      // Note: The API might not have update endpoint, this is placeholder
      throw new Error('Update train endpoint not implemented in API')
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.trains.lists() })
      queryClient.invalidateQueries({ queryKey: queryKeys.trains.detail(variables.id) })
    },
  })
}

export function useDeleteTrain() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id }: { id: string }) => {
      // Note: The API might not have delete endpoint, this is placeholder
      throw new Error('Delete train endpoint not implemented in API')
    },
    onSuccess: (data, variables) => {
      queryClient.removeQueries({ queryKey: queryKeys.trains.detail(variables.id) })
      queryClient.invalidateQueries({ queryKey: queryKeys.trains.lists() })
    },
  })
}

// Export the mapping function for external use
export { mapTrainToCompatible }