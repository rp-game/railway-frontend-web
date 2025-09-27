/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type SystemHealthDto = {
    /**
     * Overall system status
     */
    status: string;
    /**
     * System uptime in milliseconds
     */
    uptime: number;
    /**
     * Database connection status
     */
    database: Record<string, any>;
    /**
     * External services status
     */
    externalServices: Record<string, any>;
    /**
     * System resources
     */
    resources: Record<string, any>;
    /**
     * API performance metrics
     */
    api: Record<string, any>;
    /**
     * Recent errors
     */
    recentErrors: Array<string>;
    /**
     * Health check timestamp
     */
    timestamp: string;
};

