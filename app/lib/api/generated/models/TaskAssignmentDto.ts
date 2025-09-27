/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type TaskAssignmentDto = {
    /**
     * Staff IDs to assign tasks to
     */
    staffIds: Array<string>;
    /**
     * Tasks to assign
     */
    tasks: Array<string>;
    /**
     * Assignment notes
     */
    notes?: string;
    /**
     * Auto-assign based on workload
     */
    autoAssign?: boolean;
    /**
     * Send immediate notifications
     */
    sendNotifications?: boolean;
};

