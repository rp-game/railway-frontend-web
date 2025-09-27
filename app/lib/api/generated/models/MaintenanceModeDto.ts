/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type MaintenanceModeDto = {
    /**
     * Enable or disable maintenance mode
     */
    enabled: boolean;
    /**
     * Maintenance message for users
     */
    message?: string;
    /**
     * Estimated maintenance duration in minutes
     */
    estimatedDuration?: number;
    /**
     * Services affected by maintenance
     */
    affectedServices?: Array<string>;
    /**
     * Scheduled maintenance start time
     */
    scheduledStart?: string;
    /**
     * Allow admin access during maintenance
     */
    allowAdminAccess?: boolean;
};

