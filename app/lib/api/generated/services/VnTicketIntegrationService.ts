/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BulkVerificationResponseDto } from '../models/BulkVerificationResponseDto';
import type { BulkVerifyTicketsDto } from '../models/BulkVerifyTicketsDto';
import type { GetTicketInfoDto } from '../models/GetTicketInfoDto';
import type { TicketInfoResponseDto } from '../models/TicketInfoResponseDto';
import type { TicketVerificationResponseDto } from '../models/TicketVerificationResponseDto';
import type { UpdateVerificationDto } from '../models/UpdateVerificationDto';
import type { VerifyTicketDto } from '../models/VerifyTicketDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class VnTicketIntegrationService {
    /**
     * Verify train ticket from QR code
     * Parse and validate a VNTicket QR code to verify ticket authenticity
     * @returns TicketVerificationResponseDto Ticket verification result
     * @throws ApiError
     */
    public static vnticketControllerVerifyTicket({
        requestBody,
    }: {
        requestBody: VerifyTicketDto,
    }): CancelablePromise<TicketVerificationResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/vnticket/verify',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid QR code or verification failed`,
                401: `Unauthorized`,
            },
        });
    }
    /**
     * Verify multiple tickets at once
     * Bulk verification of multiple VNTicket QR codes
     * @returns BulkVerificationResponseDto Bulk verification results
     * @throws ApiError
     */
    public static vnticketControllerBulkVerifyTickets({
        requestBody,
    }: {
        requestBody: BulkVerifyTicketsDto,
    }): CancelablePromise<BulkVerificationResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/vnticket/verify-bulk',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid input or verification failed`,
                401: `Unauthorized`,
            },
        });
    }
    /**
     * Get ticket verification details
     * Retrieve details of a specific ticket verification
     * @returns TicketVerificationResponseDto Ticket verification details
     * @throws ApiError
     */
    public static vnticketControllerGetVerification({
        id,
    }: {
        id: string,
    }): CancelablePromise<TicketVerificationResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/vnticket/verification/{id}',
            path: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                404: `Verification not found`,
            },
        });
    }
    /**
     * Update ticket verification
     * Update verification status or details (admin only)
     * @returns TicketVerificationResponseDto Verification updated successfully
     * @throws ApiError
     */
    public static vnticketControllerUpdateVerification({
        id,
        requestBody,
    }: {
        id: string,
        requestBody: UpdateVerificationDto,
    }): CancelablePromise<TicketVerificationResponseDto> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/v1/vnticket/verification/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
                403: `Insufficient permissions`,
                404: `Verification not found`,
            },
        });
    }
    /**
     * Get user ticket verifications
     * Retrieve all ticket verifications for the current user
     * @returns TicketVerificationResponseDto User ticket verifications
     * @throws ApiError
     */
    public static vnticketControllerGetUserVerifications({
        status,
    }: {
        /**
         * Filter by verification status
         */
        status?: 'pending' | 'verified' | 'failed' | 'expired',
    }): CancelablePromise<Array<TicketVerificationResponseDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/vnticket/my-verifications',
            query: {
                'status': status,
            },
            errors: {
                401: `Unauthorized`,
            },
        });
    }
    /**
     * Get ticket information
     * Get detailed information about a ticket by ticket number
     * @returns TicketInfoResponseDto Ticket information
     * @throws ApiError
     */
    public static vnticketControllerGetTicketInfo({
        requestBody,
    }: {
        requestBody: GetTicketInfoDto,
    }): CancelablePromise<TicketInfoResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/vnticket/ticket-info',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
                404: `Ticket not found`,
            },
        });
    }
    /**
     * Get verification statistics
     * Get statistics about ticket verifications
     * @returns any Verification statistics
     * @throws ApiError
     */
    public static vnticketControllerGetStats(): CancelablePromise<{
        /**
         * Total verifications
         */
        total?: number;
        /**
         * Successfully verified
         */
        verified?: number;
        /**
         * Failed verifications
         */
        failed?: number;
        /**
         * Expired verifications
         */
        expired?: number;
        /**
         * Valid for ordering
         */
        validForOrdering?: number;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/vnticket/stats',
            errors: {
                401: `Unauthorized`,
            },
        });
    }
    /**
     * Get global verification statistics (admin only)
     * Get global statistics about all ticket verifications
     * @returns any Global verification statistics
     * @throws ApiError
     */
    public static vnticketControllerGetGlobalStats(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/vnticket/admin/stats',
            errors: {
                401: `Unauthorized`,
                403: `Insufficient permissions`,
            },
        });
    }
    /**
     * Cleanup expired verifications (admin only)
     * Mark expired ticket verifications as expired
     * @returns any Cleanup completed
     * @throws ApiError
     */
    public static vnticketControllerCleanupExpired(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/vnticket/admin/cleanup-expired',
            errors: {
                401: `Unauthorized`,
                403: `Insufficient permissions`,
            },
        });
    }
    /**
     * Check VNTicket API health
     * Check if the VNTicket API integration is working properly
     * @returns any API health status
     * @throws ApiError
     */
    public static vnticketControllerCheckApiHealth(): CancelablePromise<{
        healthy?: boolean;
        error?: string;
        responseTime?: number;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/vnticket/health/api',
        });
    }
    /**
     * Parse QR ticket and create user account
     * Parse Vietnamese train ticket QR code and automatically create user account
     * @returns any QR ticket parsed successfully
     * @throws ApiError
     */
    public static vnticketControllerParseQrTicket(): CancelablePromise<{
        success?: boolean;
        data?: {
            ticketNumber?: string;
            trainCode?: string;
            passengerName?: string;
            travelDate?: string;
            fromStation?: string;
            toStation?: string;
            carNumber?: string;
            seatNumber?: string;
        };
        user?: {
            id?: string;
            fullName?: string;
            phone?: string;
            isNewUser?: boolean;
            needsOtp?: boolean;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/vnticket/parse-qr',
            errors: {
                400: `Invalid QR code format`,
            },
        });
    }
    /**
     * Complete QR-based registration
     * Complete registration process for QR-created accounts with OTP verification
     * @returns any Registration completed successfully
     * @throws ApiError
     */
    public static vnticketControllerCompleteQrRegistration(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/vnticket/complete-qr-registration',
            errors: {
                400: `Invalid user ID or phone`,
            },
        });
    }
    /**
     * Verify QR registration OTP
     * Verify OTP for QR-based registration and activate account
     * @returns any OTP verified and account activated
     * @throws ApiError
     */
    public static vnticketControllerVerifyQrOtp(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/vnticket/verify-qr-otp',
            errors: {
                400: `Invalid OTP or user`,
            },
        });
    }
    /**
     * Validate QR code format
     * Validate if a QR code string follows the VNTicket format (public endpoint for testing)
     * @returns any QR format validation result
     * @throws ApiError
     */
    public static vnticketControllerValidateQrFormat(): CancelablePromise<{
        isValid?: boolean;
        error?: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/vnticket/validate-qr-format',
        });
    }
}
