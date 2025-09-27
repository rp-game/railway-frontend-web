/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type VerifyTicketDto = {
    /**
     * QR code data from VNTicket
     */
    qrData: string;
    /**
     * Passenger phone number
     */
    passengerPhone?: string;
    /**
     * Verification method
     */
    verificationMethod?: 'qr_code' | 'manual' | 'api';
};

