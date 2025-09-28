/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Train = {
    /**
     * Train ID
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
     * Unique train code
     */
    trainCode: string;
    /**
     * Train name/route name
     */
    trainName?: string;
    /**
     * Type of train service
     */
    trainType: 'express' | 'local' | 'high_speed' | 'sleeper';
    /**
     * Total number of cars in the train
     */
    totalCars: number;
    /**
     * Configuration of each car with type, capacity and amenities
     */
    carConfiguration?: Record<string, any>;
    /**
     * Train facilities and amenities
     */
    facilities?: Record<string, any>;
    /**
     * Train operational status
     */
    status: 'active' | 'maintenance' | 'retired' | 'reserved';
    /**
     * Train description
     */
    description?: string;
    /**
     * Train manufacturer
     */
    manufacturer?: string;
    /**
     * Manufacturing date
     */
    manufacturingDate?: string;
    /**
     * Last maintenance date
     */
    lastMaintenanceDate?: string;
    /**
     * Next scheduled maintenance date
     */
    nextMaintenanceDate?: string;
    /**
     * Maximum speed in km/h
     */
    maxSpeed?: number;
    /**
     * Total passenger capacity
     */
    totalCapacity?: number;
};

