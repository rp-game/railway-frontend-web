/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type TicketVerificationResponseDto = {
    /**
     * Verification ID
     */
    id: string;
    /**
     * Ticket number
     */
    ticketNumber: string;
    /**
     * Verification status
     */
    verificationStatus: string;
    /**
     * Whether ticket is valid for ordering
     */
    isValidForOrdering: boolean;
    /**
     * Parsed ticket data
     */
    parsedData?: Record<string, any>;
    /**
     * Verification timestamp
     */
    verifiedAt?: string;
    /**
     * Failure reason if verification failed
     */
    failureReason?: string;
    /**
     * Expiration timestamp
     */
    expiresAt?: string;
};

