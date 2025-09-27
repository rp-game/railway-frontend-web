/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type UpdateVendorStaffDto = {
    /**
     * Staff member full name
     */
    name?: string;
    /**
     * Staff member email address
     */
    email?: string;
    /**
     * Staff member phone number
     */
    phone?: string;
    /**
     * Staff role
     */
    role?: 'vendor_staff' | 'vendor_admin' | 'cashier';
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
    isActive?: boolean;
    /**
     * Additional notes
     */
    notes?: string;
};

