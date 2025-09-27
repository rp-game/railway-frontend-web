/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ShiftReportDto = {
    /**
     * Overall shift rating (1-5)
     */
    overallRating: number;
    /**
     * Tasks completed during shift
     */
    completedTasks: Array<string>;
    /**
     * Issues encountered during shift
     */
    issues?: Array<string>;
    /**
     * Suggestions for improvement
     */
    suggestions?: Array<string>;
    /**
     * Additional comments
     */
    additionalComments?: string;
    /**
     * Photo attachments
     */
    attachments?: Array<string>;
    /**
     * Acknowledgments or recognitions
     */
    acknowledgments?: Array<string>;
};

