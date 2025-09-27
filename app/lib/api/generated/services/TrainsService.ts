/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Station } from '../models/Station';
import type { StationListResponseDto } from '../models/StationListResponseDto';
import type { StationResponseDto } from '../models/StationResponseDto';
import type { Ticket } from '../models/Ticket';
import type { Train } from '../models/Train';
import type { TrainSchedule } from '../models/TrainSchedule';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TrainsService {
    /**
     * Get all trains
     * @returns Train Return all trains.
     * @throws ApiError
     */
    public static trainsControllerFindAllTrains(): CancelablePromise<Array<Train>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/trains',
        });
    }
    /**
     * Create a new train
     * @returns Train The train has been successfully created.
     * @throws ApiError
     */
    public static trainsControllerCreateTrain(): CancelablePromise<Train> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/trains',
        });
    }
    /**
     * Get all stations with pagination and filtering
     * @returns StationListResponseDto Return paginated stations with metadata.
     * @throws ApiError
     */
    public static trainsControllerFindAllStationsPaginated({
        page = 1,
        limit = 10,
        status,
        province,
        city,
        search,
    }: {
        /**
         * Page number
         */
        page?: number,
        /**
         * Number of items per page
         */
        limit?: number,
        /**
         * Filter by station status
         */
        status?: 'active' | 'inactive' | 'maintenance',
        /**
         * Filter by province
         */
        province?: string,
        /**
         * Filter by city
         */
        city?: string,
        /**
         * Search by station name or code
         */
        search?: string,
    }): CancelablePromise<StationListResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/trains/stations',
            query: {
                'page': page,
                'limit': limit,
                'status': status,
                'province': province,
                'city': city,
                'search': search,
            },
        });
    }
    /**
     * Create a new station
     * @returns Station The station has been successfully created.
     * @throws ApiError
     */
    public static trainsControllerCreateStation(): CancelablePromise<Station> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/trains/stations',
        });
    }
    /**
     * Get all stations (simple list, no pagination)
     * @returns StationResponseDto Return all stations.
     * @throws ApiError
     */
    public static trainsControllerFindAllStations(): CancelablePromise<Array<StationResponseDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/trains/stations/simple',
        });
    }
    /**
     * Get all train routes
     * @returns any Return all train routes.
     * @throws ApiError
     */
    public static trainsControllerFindAllRoutes(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/trains/routes',
        });
    }
    /**
     * Search train schedules
     * @returns TrainSchedule Return matching schedules.
     * @throws ApiError
     */
    public static trainsControllerFindTrainSchedules({
        origin,
        destination,
        date,
    }: {
        /**
         * Origin station ID or station name
         */
        origin: string,
        /**
         * Destination station ID or station name
         */
        destination: string,
        /**
         * Travel date
         */
        date?: string,
    }): CancelablePromise<Array<TrainSchedule>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/trains/schedules',
            query: {
                'origin': origin,
                'destination': destination,
                'date': date,
            },
        });
    }
    /**
     * Create a new train schedule
     * @returns TrainSchedule Train schedule created successfully.
     * @throws ApiError
     */
    public static trainsControllerCreateTrainSchedule({
        requestBody,
    }: {
        /**
         * Train schedule creation data
         */
        requestBody: {
            /**
             * Train ID
             */
            trainId: string;
            /**
             * Route ID
             */
            routeId: string;
            /**
             * Schedule date (YYYY-MM-DD)
             */
            scheduleDate: string;
            /**
             * Departure time (HH:mm:ss)
             */
            departureTime: string;
            /**
             * Arrival time (HH:mm:ss)
             */
            arrivalTime: string;
            status?: 'scheduled' | 'running' | 'delayed' | 'cancelled' | 'completed';
            /**
             * Platform number
             */
            platformNumber?: string;
            /**
             * Additional notes
             */
            notes?: string;
        },
    }): CancelablePromise<TrainSchedule> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/trains/schedules',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get all train schedules with pagination
     * @returns any Return paginated train schedules.
     * @throws ApiError
     */
    public static trainsControllerFindAllTrainSchedules({
        status,
        trainId,
        routeId,
        dateFrom,
        dateTo,
        limit,
        page,
    }: {
        /**
         * Filter by status
         */
        status?: string,
        /**
         * Filter by train ID
         */
        trainId?: string,
        /**
         * Filter by route ID
         */
        routeId?: string,
        /**
         * Filter from date
         */
        dateFrom?: string,
        /**
         * Filter to date
         */
        dateTo?: string,
        /**
         * Items per page
         */
        limit?: number,
        /**
         * Page number
         */
        page?: number,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/trains/schedules/all',
            query: {
                'status': status,
                'trainId': trainId,
                'routeId': routeId,
                'dateFrom': dateFrom,
                'dateTo': dateTo,
                'limit': limit,
                'page': page,
            },
        });
    }
    /**
     * Get a train schedule by ID
     * @returns TrainSchedule Return train schedule.
     * @throws ApiError
     */
    public static trainsControllerFindTrainScheduleById({
        id,
    }: {
        /**
         * Train schedule ID
         */
        id: string,
    }): CancelablePromise<TrainSchedule> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/trains/schedules/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Update a train schedule
     * @returns TrainSchedule Train schedule updated successfully.
     * @throws ApiError
     */
    public static trainsControllerUpdateTrainSchedule({
        id,
        requestBody,
    }: {
        /**
         * Train schedule ID
         */
        id: string,
        /**
         * Train schedule update data
         */
        requestBody: {
            /**
             * Train ID
             */
            trainId?: string;
            /**
             * Route ID
             */
            routeId?: string;
            /**
             * Schedule date (YYYY-MM-DD)
             */
            scheduleDate?: string;
            /**
             * Departure time (HH:mm:ss)
             */
            departureTime?: string;
            /**
             * Arrival time (HH:mm:ss)
             */
            arrivalTime?: string;
            /**
             * Actual departure time (HH:mm:ss)
             */
            actualDepartureTime?: string;
            /**
             * Actual arrival time (HH:mm:ss)
             */
            actualArrivalTime?: string;
            status?: 'scheduled' | 'running' | 'delayed' | 'cancelled' | 'completed';
            /**
             * Delay in minutes
             */
            delayMinutes?: number;
            /**
             * Platform number
             */
            platformNumber?: string;
            /**
             * Additional notes
             */
            notes?: string;
            /**
             * Reason for cancellation
             */
            cancellationReason?: string;
        },
    }): CancelablePromise<TrainSchedule> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/trains/schedules/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Delete a train schedule
     * @returns void
     * @throws ApiError
     */
    public static trainsControllerDeleteTrainSchedule({
        id,
    }: {
        /**
         * Train schedule ID
         */
        id: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/trains/schedules/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Get tickets for a schedule
     * @returns Ticket Return tickets for the schedule.
     * @throws ApiError
     */
    public static trainsControllerFindTicketsBySchedule({
        scheduleId,
    }: {
        scheduleId: string,
    }): CancelablePromise<Array<Ticket>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/trains/schedules/{scheduleId}/tickets',
            path: {
                'scheduleId': scheduleId,
            },
        });
    }
    /**
     * Update a train
     * @returns Train The train has been successfully updated.
     * @throws ApiError
     */
    public static trainsControllerUpdateTrain({
        id,
    }: {
        id: string,
    }): CancelablePromise<Train> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/v1/trains/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Delete a train
     * @returns any The train has been successfully deleted.
     * @throws ApiError
     */
    public static trainsControllerDeleteTrain({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/trains/{id}',
            path: {
                'id': id,
            },
        });
    }
}
