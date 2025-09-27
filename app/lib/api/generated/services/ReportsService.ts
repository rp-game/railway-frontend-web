/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ReportsService {
    /**
     * Generate report based on query parameters
     * @returns any Return generated report data.
     * @throws ApiError
     */
    public static reportsControllerGenerateReport({
        type,
        period = 'monthly',
        startDate,
        endDate,
        vendorId,
        categoryId,
    }: {
        type: 'sales' | 'orders' | 'users' | 'products' | 'deliveries' | 'revenue',
        period?: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly',
        startDate?: string,
        endDate?: string,
        vendorId?: string,
        categoryId?: string,
    }): CancelablePromise<{
        type?: 'sales' | 'orders' | 'users' | 'products' | 'deliveries' | 'revenue';
        period?: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
        data?: Array<Record<string, any>>;
        summary?: Record<string, any>;
        generated_at?: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/reports',
            query: {
                'type': type,
                'period': period,
                'startDate': startDate,
                'endDate': endDate,
                'vendorId': vendorId,
                'categoryId': categoryId,
            },
        });
    }
    /**
     * Get vendor revenue report
     * Get detailed revenue breakdown for a specific vendor
     * @returns any Revenue report retrieved successfully
     * @throws ApiError
     */
    public static reportsControllerGetVendorRevenue({
        vendorId,
        from,
        to,
        period,
    }: {
        /**
         * Vendor ID
         */
        vendorId: string,
        /**
         * Start date (ISO string)
         */
        from?: string,
        /**
         * End date (ISO string)
         */
        to?: string,
        /**
         * Report period
         */
        period?: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly',
    }): CancelablePromise<{
        vendorId?: string;
        period?: string;
        totalRevenue?: number;
        totalOrders?: number;
        averageOrderValue?: number;
        revenueByPeriod?: Array<{
            date?: string;
            revenue?: number;
            orders?: number;
            avgOrderValue?: number;
        }>;
        topProducts?: Array<{
            productId?: string;
            productName?: string;
            revenue?: number;
            quantity?: number;
        }>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/reports/vendor/{vendorId}/revenue',
            path: {
                'vendorId': vendorId,
            },
            query: {
                'from': from,
                'to': to,
                'period': period,
            },
        });
    }
    /**
     * Get vendor commission report
     * Get commission breakdown and tracking for a vendor
     * @returns any Commission report retrieved successfully
     * @throws ApiError
     */
    public static reportsControllerGetVendorCommission({
        vendorId,
        status,
        period,
    }: {
        /**
         * Vendor ID
         */
        vendorId: string,
        /**
         * Commission status filter
         */
        status?: 'pending' | 'paid' | 'disputed',
        /**
         * Report period
         */
        period?: 'monthly' | 'quarterly' | 'yearly',
    }): CancelablePromise<{
        vendorId?: string;
        period?: string;
        totalCommissionEarned?: number;
        totalCommissionPaid?: number;
        pendingCommission?: number;
        commissionRate?: number;
        commissionByPeriod?: Array<{
            date?: string;
            earned?: number;
            paid?: number;
            pending?: number;
            rate?: number;
        }>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/reports/vendor/{vendorId}/commission',
            path: {
                'vendorId': vendorId,
            },
            query: {
                'status': status,
                'period': period,
            },
        });
    }
    /**
     * Get vendor payout history
     * Get detailed payout history and status for a vendor
     * @returns any Payout history retrieved successfully
     * @throws ApiError
     */
    public static reportsControllerGetVendorPayouts({
        vendorId,
        status,
        from,
        to,
        limit,
    }: {
        /**
         * Vendor ID
         */
        vendorId: string,
        /**
         * Payout status filter
         */
        status?: 'pending' | 'processing' | 'completed' | 'failed',
        /**
         * Start date (ISO string)
         */
        from?: string,
        /**
         * End date (ISO string)
         */
        to?: string,
        /**
         * Number of payouts to return
         */
        limit?: number,
    }): CancelablePromise<{
        vendorId?: string;
        totalPayouts?: number;
        pendingAmount?: number;
        lastPayoutDate?: string;
        payouts?: Array<{
            id?: string;
            amount?: number;
            status?: string;
            requestedAt?: string;
            processedAt?: string;
            method?: string;
            reference?: string;
            notes?: string;
        }>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/reports/vendor/{vendorId}/payouts',
            path: {
                'vendorId': vendorId,
            },
            query: {
                'status': status,
                'from': from,
                'to': to,
                'limit': limit,
            },
        });
    }
    /**
     * Get vendor financial summary
     * Get comprehensive financial overview for a vendor
     * @returns any Financial summary retrieved successfully
     * @throws ApiError
     */
    public static reportsControllerGetVendorFinancialSummary({
        vendorId,
        period,
    }: {
        /**
         * Vendor ID
         */
        vendorId: string,
        /**
         * Summary period
         */
        period?: 'monthly' | 'quarterly' | 'yearly',
    }): CancelablePromise<{
        vendorId?: string;
        period?: string;
        summary?: {
            totalRevenue?: number;
            totalCommission?: number;
            totalPayouts?: number;
            pendingPayouts?: number;
            netEarnings?: number;
            averageOrderValue?: number;
            totalOrders?: number;
            growthRate?: number;
        };
        monthlyTrends?: Array<{
            month?: string;
            revenue?: number;
            commission?: number;
            orders?: number;
            growth?: number;
        }>;
        performance?: {
            bestSellingProducts?: any[];
            peakSalesHours?: any[];
            customerRetention?: number;
            averageRating?: number;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/reports/vendor/{vendorId}/financial-summary',
            path: {
                'vendorId': vendorId,
            },
            query: {
                'period': period,
            },
        });
    }
}
