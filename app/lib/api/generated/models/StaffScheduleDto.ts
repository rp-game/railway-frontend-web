/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type StaffScheduleDto = {
    /**
     * Staff member ID
     */
    staffId: string;
    /**
     * Schedule period
     */
    period: Record<string, any>;
    /**
     * Scheduled shifts
     */
    shifts: Array<string>;
    /**
     * Schedule statistics
     */
    statistics: Record<string, any>;
    /**
     * Availability preferences
     */
    preferences?: Record<string, any>;
};

