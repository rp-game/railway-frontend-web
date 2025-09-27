/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreatePaymentDto } from '../models/CreatePaymentDto';
import type { PaymentResponseDto } from '../models/PaymentResponseDto';
import type { PaymentWebhookResponseDto } from '../models/PaymentWebhookResponseDto';
import type { ViettelMoneyWebhookDto } from '../models/ViettelMoneyWebhookDto';
import type { VNPayWebhookDto } from '../models/VNPayWebhookDto';
import type { ZaloPayWebhookDto } from '../models/ZaloPayWebhookDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PaymentsService {
    /**
     * Create a new payment
     * @returns PaymentResponseDto Payment created successfully
     * @throws ApiError
     */
    public static paymentsControllerCreate({
        requestBody,
    }: {
        requestBody: CreatePaymentDto,
    }): CancelablePromise<PaymentResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/payments',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid payment data`,
                404: `Order not found`,
            },
        });
    }
    /**
     * Get payment status
     * @returns PaymentResponseDto Payment status retrieved
     * @throws ApiError
     */
    public static paymentsControllerGetPaymentStatus({
        transactionId,
    }: {
        /**
         * Payment transaction ID
         */
        transactionId: string,
    }): CancelablePromise<PaymentResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/payments/{transactionId}',
            path: {
                'transactionId': transactionId,
            },
            errors: {
                404: `Payment not found`,
            },
        });
    }
    /**
     * Refresh payment status from gateway
     * @returns PaymentResponseDto Payment status refreshed
     * @throws ApiError
     */
    public static paymentsControllerRefreshPaymentStatus({
        transactionId,
    }: {
        /**
         * Payment transaction ID
         */
        transactionId: string,
    }): CancelablePromise<PaymentResponseDto> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/v1/payments/{transactionId}/refresh',
            path: {
                'transactionId': transactionId,
            },
            errors: {
                404: `Payment not found`,
            },
        });
    }
    /**
     * Process payment refund
     * @returns any Refund processed successfully
     * @throws ApiError
     */
    public static paymentsControllerProcessRefund({
        transactionId,
        requestBody,
    }: {
        /**
         * Payment transaction ID
         */
        transactionId: string,
        requestBody: {
            /**
             * Amount to refund (optional, full amount if not specified)
             */
            refundAmount?: string;
            /**
             * Reason for refund
             */
            reason?: string;
        },
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/payments/{transactionId}/refund',
            path: {
                'transactionId': transactionId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Cannot refund payment`,
                404: `Payment not found`,
            },
        });
    }
    /**
     * Get available payment gateways
     * @returns any Payment gateways configuration
     * @throws ApiError
     */
    public static paymentsControllerGetPaymentGateways(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/payments/config/gateways',
        });
    }
    /**
     * Generate QR code for payment
     * @returns any QR code generated successfully
     * @throws ApiError
     */
    public static paymentsControllerGenerateQrCode({
        requestBody,
    }: {
        requestBody: {
            /**
             * Payment method for QR code
             */
            paymentMethod: 'vnpay' | 'zalopay' | 'momo' | 'viettel_money' | 'bank_transfer' | 'bank_card' | 'credit_card' | 'debit_card' | 'qr_banking' | 'qr_code' | 'cash';
            /**
             * Order ID
             */
            orderId: string;
            /**
             * Payment amount
             */
            amount: string;
            /**
             * Payment description
             */
            description?: string;
            /**
             * QR code size in pixels
             */
            size?: number;
        },
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/payments/qr-code/generate',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * VNPay payment webhook
     * @returns PaymentWebhookResponseDto Webhook processed
     * @throws ApiError
     */
    public static paymentsControllerHandleVnPayWebhook({
        requestBody,
    }: {
        requestBody: VNPayWebhookDto,
    }): CancelablePromise<PaymentWebhookResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/payments/webhooks/vnpay',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * ViettelMoney payment webhook
     * @returns PaymentWebhookResponseDto Webhook processed
     * @throws ApiError
     */
    public static paymentsControllerHandleViettelMoneyWebhook({
        requestBody,
    }: {
        requestBody: ViettelMoneyWebhookDto,
    }): CancelablePromise<PaymentWebhookResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/payments/webhooks/viettel-money',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * ZaloPay payment webhook
     * @returns PaymentWebhookResponseDto Webhook processed
     * @throws ApiError
     */
    public static paymentsControllerHandleZaloPayWebhook({
        requestBody,
    }: {
        requestBody: ZaloPayWebhookDto,
    }): CancelablePromise<PaymentWebhookResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/payments/webhooks/zalopay',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Generic payment webhook handler
     * @returns PaymentWebhookResponseDto Webhook processed
     * @throws ApiError
     */
    public static paymentsControllerHandleGenericWebhook({
        paymentMethod,
    }: {
        /**
         * Payment method
         */
        paymentMethod: 'vnpay' | 'zalopay' | 'momo' | 'viettel_money' | 'bank_transfer' | 'bank_card' | 'credit_card' | 'debit_card' | 'qr_banking' | 'qr_code' | 'cash',
    }): CancelablePromise<PaymentWebhookResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/payments/webhooks/{paymentMethod}',
            path: {
                'paymentMethod': paymentMethod,
            },
        });
    }
    /**
     * Payment return URL handler
     * @returns any Payment return processed
     * @throws ApiError
     */
    public static paymentsControllerHandlePaymentReturn({
        paymentMethod,
    }: {
        /**
         * Payment method
         */
        paymentMethod: 'vnpay' | 'zalopay' | 'momo' | 'viettel_money' | 'bank_transfer' | 'bank_card' | 'credit_card' | 'debit_card' | 'qr_banking' | 'qr_code' | 'cash',
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/payments/return/{paymentMethod}',
            path: {
                'paymentMethod': paymentMethod,
            },
        });
    }
}
