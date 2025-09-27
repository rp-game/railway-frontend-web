/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { StationCoordinatesDto } from './StationCoordinatesDto';
import type { StationFacilitiesDto } from './StationFacilitiesDto';
import type { StationOperatingHoursDto } from './StationOperatingHoursDto';
export type StationResponseDto = {
    /**
     * Station ID
     */
    id: string;
    /**
     * Station code
     */
    stationCode: string;
    /**
     * Station name
     */
    stationName: string;
    /**
     * Station code (alias)
     */
    code: string;
    /**
     * Station name (alias)
     */
    name: string;
    /**
     * Province
     */
    province?: string;
    /**
     * City
     */
    city?: string;
    /**
     * Full address
     */
    address?: string;
    /**
     * GPS coordinates
     */
    coordinates?: StationCoordinatesDto;
    /**
     * Station status
     */
    status: 'active' | 'inactive' | 'maintenance';
    /**
     * Station facilities
     */
    facilities?: StationFacilitiesDto;
    /**
     * Station description
     */
    description?: string;
    /**
     * Contact phone number
     */
    phoneNumber?: string;
    /**
     * Operating hours
     */
    operatingHours?: StationOperatingHoursDto;
    /**
     * Local food specialties
     */
    specialties?: Array<string>;
    /**
     * Creation timestamp
     */
    createdAt: string;
    /**
     * Last update timestamp
     */
    updatedAt: string;
};

