/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type StaffReassignmentDto = {
    /**
     * ID of the staff member to reassign
     */
    staffId: string;
    /**
     * ID of the vendor to assign staff to (null to unassign)
     */
    vendorId?: Record<string, any>;
    /**
     * Reason for reassignment
     */
    reason: string;
};

