/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CheckOutDto = {
    /**
     * Check-out location coordinates
     */
    location?: Record<string, any>;
    /**
     * Tasks completed during shift
     */
    completedTasks?: Array<string>;
    /**
     * Issues encountered during shift
     */
    issues?: Array<string>;
    /**
     * Check-out summary notes
     */
    notes?: string;
    /**
     * Self-assessment rating (1-5)
     */
    selfRating?: number;
};

