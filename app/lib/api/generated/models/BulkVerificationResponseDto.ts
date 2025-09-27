/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TicketVerificationResponseDto } from './TicketVerificationResponseDto';
export type BulkVerificationResponseDto = {
    /**
     * Number of tickets processed
     */
    totalProcessed: number;
    /**
     * Number of successfully verified tickets
     */
    successfullyVerified: number;
    /**
     * Number of failed verifications
     */
    failed: number;
    /**
     * Individual verification results
     */
    results: Array<TicketVerificationResponseDto>;
};

