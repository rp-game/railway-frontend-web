import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { TrainsService } from '../generated'
import { queryKeys } from '../query-client'
import type { Station, StationResponseDto, StationListResponseDto } from '../generated'

// Types for compatibility with existing components
export interface MappedStation {
  // Map API Station to demo structure for compatibility
  stationId: string // mapped from id
  stationCode: string
  name: string // mapped from stationName
  nameEn: string // fallback to stationName
  city: string
  province: string
  coordinates?: {
    latitude: number
    longitude: number
  }
  hasKitchen: boolean // derived from facilities.restaurant
  operatingHours?: {
    open: string
    close: string
  }
  image: string // placeholder
  description: string
  specialties: string[]
  // Original API fields
  id: string
  stationName: string
  address?: string
  status: string
  facilities?: Record<string, any>
  phoneNumber?: string
  createdAt: string
  updatedAt: string
}

// Helper function to map API Station to compatible format
function mapStationToCompatible(station: Station | StationResponseDto): MappedStation {
  // Parse coordinates if it's a PostGIS POINT string
  let coordinates: { latitude: number; longitude: number } | undefined
  if (station.coordinates && typeof station.coordinates === 'string') {
    // Parse "POINT(lng lat)" format
    const match = station.coordinates.match(/POINT\(([+-]?\d*\.?\d+)\s+([+-]?\d*\.?\d+)\)/)
    if (match) {
      coordinates = {
        longitude: parseFloat(match[1]),
        latitude: parseFloat(match[2]),
      }
    }
  }

  return {
    // Compatibility mappings
    stationId: station.id,
    name: station.stationName,
    nameEn: station.stationName, // Fallback since API doesn't have nameEn
    hasKitchen: Boolean(station.facilities?.restaurant || station.facilities?.wifi), // Approximate mapping
    image: '/api/placeholder/station.jpg', // Placeholder
    specialties: station.specialties || [],

    // Direct mappings
    stationCode: station.stationCode,
    city: station.city || '',
    province: station.province || '',
    description: station.description || '',
    coordinates,
    operatingHours: station.operatingHours ? {
      open: station.operatingHours.open || '05:00',
      close: station.operatingHours.close || '23:00'
    } : undefined,

    // Original API fields
    id: station.id,
    stationName: station.stationName,
    address: station.address,
    status: station.status,
    facilities: station.facilities,
    phoneNumber: station.phoneNumber,
    createdAt: station.createdAt,
    updatedAt: station.updatedAt,
  }
}

// Station queries
export function useStations(params?: {
  page?: number
  limit?: number
  status?: 'active' | 'inactive' | 'maintenance'
  province?: string
  city?: string
  search?: string
}) {
  return useQuery({
    queryKey: queryKeys.stations.list(params || {}),
    queryFn: () => TrainsService.trainsControllerFindAllStationsPaginated(params || {}),
    enabled: true,
    select: (data: StationListResponseDto) => ({
      ...data,
      stations: data.stations?.map(mapStationToCompatible) || []
    }),
  })
}

export function useStationsSimple() {
  return useQuery({
    queryKey: queryKeys.stations.all,
    queryFn: () => TrainsService.trainsControllerFindAllStations(),
    enabled: true,
    select: (data: StationResponseDto[]) => data.map(mapStationToCompatible),
  })
}

export function useStationsWithKitchen() {
  return useQuery({
    queryKey: queryKeys.stations.withKitchen,
    queryFn: () => TrainsService.trainsControllerFindAllStations(),
    enabled: true,
    select: (data: StationResponseDto[]) => {
      return data
        .map(mapStationToCompatible)
        .filter(station => station.hasKitchen) // Filter for stations with kitchen/food facilities
    },
  })
}

export function useStationByCode(stationCode: string) {
  return useQuery({
    queryKey: queryKeys.stations.detail(stationCode),
    queryFn: async () => {
      // Since there's no direct "get by code" endpoint, we'll search
      const data = await TrainsService.trainsControllerFindAllStations()
      const station = data.find(s => s.stationCode === stationCode)
      if (!station) {
        throw new Error(`Station with code ${stationCode} not found`)
      }
      return station
    },
    enabled: !!stationCode,
    select: mapStationToCompatible,
  })
}

export function useStationSearch(query: string) {
  return useQuery({
    queryKey: queryKeys.stations.search(query),
    queryFn: () => TrainsService.trainsControllerFindAllStationsPaginated({
      search: query,
      limit: 50, // Get more results for search
    }),
    enabled: !!query && query.length > 1,
    select: (data: StationListResponseDto) => ({
      ...data,
      stations: data.stations?.map(mapStationToCompatible) || []
    }),
  })
}

// For backward compatibility - match demo function signatures
export function useGetStationsWithKitchen() {
  return useStationsWithKitchen()
}

export function useGetStationByCode(stationCode: string) {
  return useStationByCode(stationCode)
}

export function useSearchStations(query: string) {
  return useStationSearch(query)
}

// Station mutations (for admin/management features)
export function useCreateStation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: TrainsService.trainsControllerCreateStation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.stations.lists() })
      queryClient.invalidateQueries({ queryKey: queryKeys.stations.withKitchen })
    },
  })
}

export function useUpdateStation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => {
      // Note: The API might not have update endpoint, this is placeholder
      throw new Error('Update station endpoint not implemented in API')
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.stations.lists() })
      queryClient.invalidateQueries({ queryKey: queryKeys.stations.withKitchen })
      queryClient.invalidateQueries({ queryKey: queryKeys.stations.detail(variables.id) })
    },
  })
}

export function useDeleteStation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id }: { id: string }) => {
      // Note: The API might not have delete endpoint, this is placeholder
      throw new Error('Delete station endpoint not implemented in API')
    },
    onSuccess: (data, variables) => {
      queryClient.removeQueries({ queryKey: queryKeys.stations.detail(variables.id) })
      queryClient.invalidateQueries({ queryKey: queryKeys.stations.lists() })
      queryClient.invalidateQueries({ queryKey: queryKeys.stations.withKitchen })
    },
  })
}

// Export the mapping function for external use
export { mapStationToCompatible }