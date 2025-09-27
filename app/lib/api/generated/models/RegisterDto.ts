/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type RegisterDto = {
    /**
     * Phone number in Vietnamese format
     */
    phone: string;
    /**
     * Full name of the user
     */
    fullName?: string;
    /**
     * Email address
     */
    email?: string;
    /**
     * User type
     */
    userType?: 'passenger' | 'vendor_staff' | 'train_staff' | 'station_staff' | 'admin';
    /**
     * Device token for push notifications
     */
    deviceToken?: string;
};

