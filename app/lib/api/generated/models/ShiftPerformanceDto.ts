/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ShiftPerformanceDto = {
    /**
     * Performance period
     */
    period: string;
    /**
     * Overall performance metrics
     */
    metrics: Record<string, any>;
    /**
     * Performance trends over time
     */
    trends: Array<string>;
    /**
     * Strengths and areas for improvement
     */
    feedback: Record<string, any>;
    /**
     * Comparison with team/department averages
     */
    comparisons: Record<string, any>;
    /**
     * Awards and recognitions
     */
    awards?: Array<string>;
};

