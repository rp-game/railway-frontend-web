/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CheckInDto = {
    /**
     * Shift ID to check into
     */
    shiftId: string;
    /**
     * Check-in location coordinates
     */
    location: Record<string, any>;
    /**
     * Device information
     */
    deviceInfo?: Record<string, any>;
    /**
     * Check-in notes or comments
     */
    notes?: string;
    /**
     * Photo verification (base64 or URL)
     */
    photoVerification?: string;
};

