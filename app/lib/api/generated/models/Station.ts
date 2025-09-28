/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Station = {
    /**
     * Station ID
     */
    id: string;
    /**
     * Creation timestamp
     */
    createdAt: string;
    /**
     * Last update timestamp
     */
    updatedAt: string;
    /**
     * Unique station code
     */
    stationCode: string;
    /**
     * Station name
     */
    stationName: string;
    /**
     * Province name
     */
    province?: string;
    /**
     * City name
     */
    city?: string;
    /**
     * Full address
     */
    address?: string;
    /**
     * GPS coordinates (PostGIS Point)
     */
    coordinates?: string;
    /**
     * Station operational status
     */
    status: 'active' | 'inactive' | 'maintenance' | 'closed';
    /**
     * Station facilities and amenities
     */
    facilities?: Record<string, any>;
    /**
     * Station description
     */
    description?: string;
    /**
     * Contact phone number
     */
    phoneNumber?: string;
    /**
     * Operating hours by day type
     */
    operatingHours?: Record<string, any>;
    /**
     * Local food specialties available at this station
     */
    specialties?: Array<string>;
};

