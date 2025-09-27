/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type VerifyOtpDto = {
    /**
     * Phone number in Vietnamese format
     */
    phone: string;
    /**
     * OTP code sent to phone
     */
    otp: string;
    /**
     * Device token for push notifications
     */
    deviceToken?: string;
};

