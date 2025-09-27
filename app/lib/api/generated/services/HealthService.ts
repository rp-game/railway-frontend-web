/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class HealthService {
    /**
     * Health check endpoint
     * @returns any The Health Check is successful
     * @throws ApiError
     */
    public static healthControllerCheck(): CancelablePromise<{
        status?: string;
        info?: Record<string, Record<string, any>> | null;
        error?: Record<string, Record<string, any>> | null;
        details?: Record<string, Record<string, any>>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/health',
            errors: {
                503: `The Health Check is not successful`,
            },
        });
    }
    /**
     * System information endpoint
     * @returns any System information
     * @throws ApiError
     */
    public static healthControllerGetInfo(): CancelablePromise<{
        status?: string;
        timestamp?: string;
        uptime?: number;
        database?: Record<string, any>;
        application?: Record<string, any>;
        statistics?: Record<string, any>;
        memory?: Record<string, any>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/health/info',
        });
    }
    /**
     * Simple ping endpoint
     * @returns any Ping response
     * @throws ApiError
     */
    public static healthControllerPing(): CancelablePromise<{
        status?: string;
        message?: string;
        timestamp?: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/health/ping',
        });
    }
}
