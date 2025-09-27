/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SmsTestingService {
    /**
     * Send test SMS (Admin only)
     * Send a test SMS to verify SMS provider configuration
     * @returns any Test SMS sent successfully
     * @throws ApiError
     */
    public static smsTestControllerSendTestSms(): CancelablePromise<{
        success?: boolean;
        provider?: string;
        messageId?: string;
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/sms-test/send-test',
        });
    }
    /**
     * Get SMS providers status (Admin only)
     * Get the status and configuration of all SMS providers
     * @returns any SMS providers status retrieved successfully
     * @throws ApiError
     */
    public static smsTestControllerGetProvidersStatus(): CancelablePromise<{
        providers?: Array<{
            name?: string;
            enabled?: boolean;
            configured?: boolean;
            priority?: number;
            lastTest?: string;
            balance?: number;
        }>;
        totalProviders?: number;
        activeProviders?: number;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/sms-test/providers/status',
        });
    }
    /**
     * SMS service health check
     * Check if SMS service is healthy and configured properly
     * @returns any SMS service health status
     * @throws ApiError
     */
    public static smsTestControllerHealthCheck(): CancelablePromise<{
        healthy?: boolean;
        providers?: number;
        configured?: boolean;
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/sms-test/health',
        });
    }
    /**
     * Validate Vietnamese phone number
     * Validate if a phone number is in correct Vietnamese format
     * @returns any Phone number validation result
     * @throws ApiError
     */
    public static smsTestControllerValidatePhoneNumber(): CancelablePromise<{
        valid?: boolean;
        formatted?: string;
        carrier?: string;
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/sms-test/validate-phone',
        });
    }
}
