/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type BulkVerifyTicketsDto = {
    /**
     * Array of QR data to verify
     */
    qrDataList: Array<string>;
    /**
     * Verification method
     */
    verificationMethod?: 'qr_code' | 'manual' | 'api';
};

