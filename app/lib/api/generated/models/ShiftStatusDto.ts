/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ShiftStatusDto = {
    /**
     * Shift ID
     */
    id: string;
    /**
     * Shift date
     */
    shiftDate: string;
    /**
     * Shift status
     */
    status: 'scheduled' | 'checked_in' | 'in_progress' | 'checked_out' | 'completed' | 'cancelled';
    /**
     * Scheduled start time
     */
    scheduledStart: string;
    /**
     * Scheduled end time
     */
    scheduledEnd: string;
    /**
     * Actual check-in time
     */
    actualStart?: string;
    /**
     * Actual check-out time
     */
    actualEnd?: string;
    /**
     * Shift location/station
     */
    location: string;
    /**
     * Shift type
     */
    shiftType: string;
    /**
     * Assigned tasks count
     */
    assignedTasks?: number;
    /**
     * Completed tasks count
     */
    completedTasks?: number;
    /**
     * Break time taken (minutes)
     */
    breakTime?: number;
    /**
     * Performance score (1-10)
     */
    performanceScore?: number;
};

