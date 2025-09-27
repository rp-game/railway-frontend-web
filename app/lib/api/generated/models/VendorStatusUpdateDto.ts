/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type VendorStatusUpdateDto = {
    /**
     * New vendor status
     */
    status: 'pending' | 'approved' | 'suspended' | 'rejected' | 'inactive';
    /**
     * Reason for status change
     */
    reason?: string;
};

