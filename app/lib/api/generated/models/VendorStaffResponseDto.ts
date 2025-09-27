/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type VendorStaffResponseDto = {
    /**
     * Staff member ID
     */
    id: string;
    /**
     * Staff member full name
     */
    name: string;
    /**
     * Staff member email address
     */
    email: string;
    /**
     * Staff member phone number
     */
    phone: string;
    /**
     * Staff role
     */
    role: string;
    /**
     * Staff department
     */
    department?: string;
    /**
     * Staff position/title
     */
    position?: string;
    /**
     * Whether staff account is active
     */
    isActive: boolean;
    /**
     * Vendor ID this staff belongs to
     */
    vendorId: string;
    /**
     * Date staff was added
     */
    createdAt: string;
    /**
     * Last update date
     */
    updatedAt: string;
    /**
     * Last login date
     */
    lastLoginAt?: string;
    /**
     * Additional notes
     */
    notes?: string;
};

