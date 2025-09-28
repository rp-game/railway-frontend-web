/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type TrainSchedule = {
    /**
     * Train schedule ID
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
     * Train ID
     */
    trainId: string;
    /**
     * Route ID
     */
    routeId: string;
    /**
     * Schedule date
     */
    scheduleDate: string;
    /**
     * Scheduled departure time
     */
    departureTime: string;
    /**
     * Scheduled arrival time
     */
    arrivalTime: string;
    /**
     * Actual departure time
     */
    actualDepartureTime?: string;
    /**
     * Actual arrival time
     */
    actualArrivalTime?: string;
    /**
     * Schedule status
     */
    status: 'scheduled' | 'running' | 'delayed' | 'cancelled' | 'completed';
    /**
     * Delay in minutes
     */
    delayMinutes: number;
    /**
     * Additional notes about the schedule
     */
    notes?: string;
    /**
     * Platform number
     */
    platformNumber?: string;
    /**
     * Capacity and occupancy information
     */
    capacityInfo?: Record<string, any>;
    /**
     * Weather information for the schedule
     */
    weatherInfo?: Record<string, any>;
    /**
     * Reason for cancellation if applicable
     */
    cancellationReason?: string;
};

