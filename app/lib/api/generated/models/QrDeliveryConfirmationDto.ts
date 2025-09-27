/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type QrDeliveryConfirmationDto = {
    /**
     * Customer QR code data
     */
    qrCode: string;
    /**
     * Delivery location details
     */
    deliveryLocation: string;
    /**
     * Customer phone number for verification
     */
    customerPhone?: string;
    /**
     * Delivery notes or special instructions
     */
    notes?: string;
    /**
     * Photo evidence of delivery
     */
    photoEvidence?: Array<string>;
    /**
     * Customer signature (base64)
     */
    customerSignature?: string;
    /**
     * Delivery verification method
     */
    verificationMethod?: string;
    /**
     * GPS coordinates of delivery
     */
    gpsLocation?: Record<string, any>;
};

