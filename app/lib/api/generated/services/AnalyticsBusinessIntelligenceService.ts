/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BusinessIntelligenceDto } from '../models/BusinessIntelligenceDto';
import type { CustomerAnalyticsDto } from '../models/CustomerAnalyticsDto';
import type { CustomReportRequestDto } from '../models/CustomReportRequestDto';
import type { KpiDashboardDto } from '../models/KpiDashboardDto';
import type { PerformanceMetricsDto } from '../models/PerformanceMetricsDto';
import type { PredictiveDemandDto } from '../models/PredictiveDemandDto';
import type { RevenueAnalyticsDto } from '../models/RevenueAnalyticsDto';
import type { SalesTrendsDto } from '../models/SalesTrendsDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AnalyticsBusinessIntelligenceService {
    /**
     * Get customer behavior analytics (UC3.10)
     * Comprehensive customer behavior analysis for business insights
     * @returns CustomerAnalyticsDto Customer behavior analytics retrieved successfully
     * @throws ApiError
     */
    public static analyticsControllerGetCustomerBehaviorAnalytics({
        segment,
        routes,
        period,
    }: {
        /**
         * Customer segment filter
         */
        segment?: string,
        /**
         * Specific train routes to analyze
         */
        routes?: Array<string>,
        /**
         * Analysis period
         */
        period?: '7d' | '30d' | '90d' | '1y',
    }): CancelablePromise<CustomerAnalyticsDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/analytics/customers/behavior',
            query: {
                'segment': segment,
                'routes': routes,
                'period': period,
            },
        });
    }
    /**
     * Get customer segmentation analysis
     * Customer segmentation based on behavior and purchase patterns
     * @returns any Customer segments retrieved successfully
     * @throws ApiError
     */
    public static analyticsControllerGetCustomerSegmentation(): CancelablePromise<{
        segments?: Array<{
            id?: string;
            name?: string;
            size?: number;
            characteristics?: Record<string, any>;
            avgOrderValue?: number;
            frequency?: number;
            loyaltyScore?: number;
        }>;
        totalCustomers?: number;
        segmentationCriteria?: Record<string, any>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/analytics/customers/segments',
        });
    }
    /**
     * Get customer journey analytics
     * Customer journey mapping and funnel analysis
     * @returns any Customer journey analytics retrieved successfully
     * @throws ApiError
     */
    public static analyticsControllerGetCustomerJourneyAnalytics({
        period,
    }: {
        /**
         * Analysis period
         */
        period?: '7d' | '30d' | '90d',
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/analytics/customers/journey',
            query: {
                'period': period,
            },
        });
    }
    /**
     * Get KPI dashboard (UC3.11)
     * Comprehensive KPI dashboard for operational performance monitoring
     * @returns KpiDashboardDto KPI dashboard data retrieved successfully
     * @throws ApiError
     */
    public static analyticsControllerGetKpiDashboard({
        refresh,
        period,
    }: {
        /**
         * Force refresh cache
         */
        refresh?: boolean,
        /**
         * Dashboard period
         */
        period?: 'today' | '7d' | '30d' | '90d',
    }): CancelablePromise<KpiDashboardDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/analytics/kpi-dashboard',
            query: {
                'refresh': refresh,
                'period': period,
            },
        });
    }
    /**
     * Get operational performance metrics (UC3.11)
     * Detailed operational performance analysis
     * @returns PerformanceMetricsDto Operational performance metrics retrieved successfully
     * @throws ApiError
     */
    public static analyticsControllerGetOperationalPerformance({
        breakdown,
        period,
    }: {
        /**
         * Performance breakdown
         */
        breakdown?: 'route' | 'station' | 'vendor' | 'time',
        /**
         * Analysis period
         */
        period?: any,
    }): CancelablePromise<PerformanceMetricsDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/analytics/performance/operational',
            query: {
                'breakdown': breakdown,
                'period': period,
            },
        });
    }
    /**
     * Get business intelligence insights (UC3.16)
     * Advanced business intelligence for strategic expansion decisions
     * @returns BusinessIntelligenceDto Business intelligence insights retrieved successfully
     * @throws ApiError
     */
    public static analyticsControllerGetBusinessIntelligence({
        focus,
        period,
    }: {
        /**
         * Analysis focus area
         */
        focus?: 'routes' | 'stations' | 'vendors' | 'products',
        /**
         * Analysis period
         */
        period?: any,
    }): CancelablePromise<BusinessIntelligenceDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/analytics/business-intelligence',
            query: {
                'focus': focus,
                'period': period,
            },
        });
    }
    /**
     * Get expansion opportunities analysis (UC3.16)
     * Data-driven expansion opportunities and market analysis
     * @returns any Expansion opportunities retrieved successfully
     * @throws ApiError
     */
    public static analyticsControllerGetExpansionOpportunities({
        type,
    }: {
        /**
         * Expansion type
         */
        type?: 'new_routes' | 'new_stations' | 'new_products' | 'vendor_expansion',
    }): CancelablePromise<{
        opportunities?: Array<{
            id?: string;
            type?: string;
            priority?: 'high' | 'medium' | 'low';
            potentialRevenue?: number;
            investmentRequired?: number;
            roi?: number;
            riskLevel?: string;
            timeline?: Record<string, any>;
            recommendations?: any[];
        }>;
        marketAnalysis?: Record<string, any>;
        competitorInsights?: Record<string, any>;
        generatedAt?: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/analytics/expansion/opportunities',
            query: {
                'type': type,
            },
        });
    }
    /**
     * Get predictive demand analysis (UC3.16)
     * AI-powered demand forecasting for strategic planning
     * @returns PredictiveDemandDto Predictive demand analysis retrieved successfully
     * @throws ApiError
     */
    public static analyticsControllerGetPredictiveDemandAnalysis({
        routes,
        products,
        horizon,
    }: {
        /**
         * Specific routes for forecasting
         */
        routes?: Array<string>,
        /**
         * Specific products for forecasting
         */
        products?: Array<string>,
        /**
         * Forecast horizon
         */
        horizon?: '7d' | '30d' | '90d' | '1y',
    }): CancelablePromise<PredictiveDemandDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/analytics/predictive/demand',
            query: {
                'routes': routes,
                'products': products,
                'horizon': horizon,
            },
        });
    }
    /**
     * Get sales trends analysis (UC3.10)
     * Comprehensive sales trends and pattern analysis
     * @returns SalesTrendsDto Sales trends retrieved successfully
     * @throws ApiError
     */
    public static analyticsControllerGetSalesTrends({
        breakdown,
        granularity,
        period,
    }: {
        /**
         * Breakdown dimensions
         */
        breakdown?: Array<string>,
        /**
         * Data granularity
         */
        granularity?: 'hourly' | 'daily' | 'weekly' | 'monthly',
        /**
         * Analysis period
         */
        period?: any,
    }): CancelablePromise<SalesTrendsDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/analytics/sales/trends',
            query: {
                'breakdown': breakdown,
                'granularity': granularity,
                'period': period,
            },
        });
    }
    /**
     * Get revenue analysis
     * Detailed revenue analysis with various breakdowns and comparisons
     * @returns RevenueAnalyticsDto Revenue analysis retrieved successfully
     * @throws ApiError
     */
    public static analyticsControllerGetRevenueAnalysis({
        comparison,
        period,
    }: {
        /**
         * Include period comparison
         */
        comparison?: boolean,
        /**
         * Analysis period
         */
        period?: any,
    }): CancelablePromise<RevenueAnalyticsDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/analytics/revenue/analysis',
            query: {
                'comparison': comparison,
                'period': period,
            },
        });
    }
    /**
     * Generate custom analytics report (UC3.11)
     * Generate custom analytics reports with flexible parameters
     * @returns any Custom report generated successfully
     * @throws ApiError
     */
    public static analyticsControllerGenerateCustomReport({
        requestBody,
    }: {
        requestBody: CustomReportRequestDto,
    }): CancelablePromise<{
        reportId?: string;
        status?: 'generated' | 'processing' | 'failed';
        downloadUrl?: string;
        expiresAt?: string;
        metadata?: Record<string, any>;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/analytics/reports/custom',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get custom report status or download
     * Check custom report generation status or download completed report
     * @returns any Report status or download link retrieved
     * @throws ApiError
     */
    public static analyticsControllerGetCustomReport({
        reportId,
    }: {
        /**
         * Custom report ID
         */
        reportId: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/analytics/reports/{reportId}',
            path: {
                'reportId': reportId,
            },
        });
    }
    /**
     * Get report generation history
     * Get history of previously generated custom reports
     * @returns any Report history retrieved successfully
     * @throws ApiError
     */
    public static analyticsControllerGetReportHistory({
        limit,
    }: {
        /**
         * Number of reports to return
         */
        limit?: number,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/analytics/reports/history',
            query: {
                'limit': limit,
            },
        });
    }
    /**
     * Get cohort analysis
     * Customer cohort analysis for retention and lifetime value insights
     * @returns any Cohort analysis retrieved successfully
     * @throws ApiError
     */
    public static analyticsControllerGetCohortAnalysis({
        metric,
        cohortType,
    }: {
        /**
         * Cohort metric
         */
        metric?: 'retention' | 'revenue' | 'frequency',
        /**
         * Cohort time grouping
         */
        cohortType?: 'weekly' | 'monthly',
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/analytics/cohort/analysis',
            query: {
                'metric': metric,
                'cohortType': cohortType,
            },
        });
    }
    /**
     * Get anomaly detection results
     * AI-powered anomaly detection in sales, orders, and operational metrics
     * @returns any Anomaly detection results retrieved successfully
     * @throws ApiError
     */
    public static analyticsControllerGetAnomalyDetection({
        sensitivity,
        period,
    }: {
        /**
         * Detection sensitivity
         */
        sensitivity?: 'low' | 'medium' | 'high',
        /**
         * Detection period
         */
        period?: any,
    }): CancelablePromise<{
        anomalies?: Array<{
            id?: string;
            type?: string;
            severity?: 'low' | 'medium' | 'high' | 'critical';
            metric?: string;
            expectedValue?: number;
            actualValue?: number;
            deviation?: number;
            timestamp?: string;
            context?: Record<string, any>;
            recommendations?: any[];
        }>;
        summary?: Record<string, any>;
        detectionRun?: Record<string, any>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/analytics/anomaly/detection',
            query: {
                'sensitivity': sensitivity,
                'period': period,
            },
        });
    }
    /**
     * Get real-time metrics dashboard
     * Real-time operational metrics and alerts
     * @returns any Real-time metrics retrieved successfully
     * @throws ApiError
     */
    public static analyticsControllerGetRealtimeMetrics(): CancelablePromise<{
        currentOrders?: number;
        activeDeliveries?: number;
        systemLoad?: Record<string, any>;
        alerts?: any[];
        trends?: Record<string, any>;
        lastUpdated?: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/analytics/realtime/metrics',
        });
    }
    /**
     * Get dashboard statistics for operations admin
     * Get real-time statistics for the operations dashboard including vendor counts and order metrics
     * @returns any Dashboard statistics retrieved successfully
     * @throws ApiError
     */
    public static analyticsControllerGetDashboardStats(): CancelablePromise<{
        activeVendors?: number;
        ordersToday?: number;
        pendingOrders?: number;
        completedOrders?: number;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/analytics/dashboard-stats',
        });
    }
    /**
     * Export analytics data
     * Export analytics data in various formats (CSV, Excel, PDF)
     * @returns any Export initiated successfully
     * @throws ApiError
     */
    public static analyticsControllerExportAnalyticsData({
        reportType,
    }: {
        /**
         * Type of report to export
         */
        reportType: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/analytics/export/{reportType}',
            path: {
                'reportType': reportType,
            },
        });
    }
}
