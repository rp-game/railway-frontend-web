/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SetupSmsDto } from '../models/SetupSmsDto';
import type { SetupTotpDto } from '../models/SetupTotpDto';
import type { StartVerificationDto } from '../models/StartVerificationDto';
import type { VerifyCodeDto } from '../models/VerifyCodeDto';
import type { VerifySetupDto } from '../models/VerifySetupDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class MultiFactorAuthenticationService {
    /**
     * Get user MFA methods
     * Get all active MFA methods for the current user
     * @returns any MFA methods retrieved successfully
     * @throws ApiError
     */
    public static mfaControllerGetMfaMethods(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/auth/mfa/methods',
        });
    }
    /**
     * Check MFA requirement status
     * Check if the user has MFA enabled and which methods are available
     * @returns any MFA status retrieved successfully
     * @throws ApiError
     */
    public static mfaControllerGetMfaStatus(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/auth/mfa/status',
        });
    }
    /**
     * Setup TOTP MFA
     * Initialize TOTP (Time-based One-Time Password) MFA setup
     * @returns any TOTP setup initiated successfully
     * @throws ApiError
     */
    public static mfaControllerSetupTotp({
        requestBody,
    }: {
        requestBody: SetupTotpDto,
    }): CancelablePromise<{
        method?: 'sms' | 'email' | 'totp' | 'backup_codes';
        secret?: string;
        qrCodeUrl?: string;
        setupId?: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/auth/mfa/setup/totp',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Setup SMS MFA
     * Initialize SMS-based MFA setup
     * @returns any SMS MFA setup initiated successfully
     * @throws ApiError
     */
    public static mfaControllerSetupSms({
        requestBody,
    }: {
        requestBody: SetupSmsDto,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/auth/mfa/setup/sms',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Verify MFA setup
     * Verify and activate a pending MFA method setup
     * @returns any MFA setup verified and activated successfully
     * @throws ApiError
     */
    public static mfaControllerVerifySetup({
        requestBody,
    }: {
        requestBody: VerifySetupDto,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/auth/mfa/setup/verify',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Generate backup codes
     * Generate new backup recovery codes for MFA
     * @returns any Backup codes generated successfully
     * @throws ApiError
     */
    public static mfaControllerGenerateBackupCodes(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/auth/mfa/backup-codes/generate',
        });
    }
    /**
     * Start MFA verification
     * Initiate MFA verification process for login or sensitive actions
     * @returns any MFA verification started successfully
     * @throws ApiError
     */
    public static mfaControllerStartVerification({
        requestBody,
    }: {
        requestBody: StartVerificationDto,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/auth/mfa/verify/start',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Verify MFA code
     * Verify the MFA code provided by the user
     * @returns any MFA code verified successfully
     * @throws ApiError
     */
    public static mfaControllerVerifyCode({
        requestBody,
    }: {
        requestBody: VerifyCodeDto,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/auth/mfa/verify/code',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Set primary MFA method
     * Set a specific MFA method as the primary method
     * @returns any Primary MFA method updated successfully
     * @throws ApiError
     */
    public static mfaControllerSetPrimaryMethod({
        methodId,
    }: {
        methodId: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/auth/mfa/{methodId}/primary',
            path: {
                'methodId': methodId,
            },
        });
    }
    /**
     * Disable MFA method
     * Disable a specific MFA method for the user
     * @returns any MFA method disabled successfully
     * @throws ApiError
     */
    public static mfaControllerDisableMfaMethod(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/auth/mfa/{method}',
        });
    }
    /**
     * Get MFA recovery status
     * Check the status of MFA recovery options
     * @returns any MFA recovery status retrieved successfully
     * @throws ApiError
     */
    public static mfaControllerGetRecoveryStatus(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/auth/mfa/recovery/status',
        });
    }
}
