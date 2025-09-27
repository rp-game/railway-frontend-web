/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CustomReportRequestDto = {
    /**
     * Report title
     */
    title: string;
    /**
     * Report type
     */
    type: 'customer_behavior' | 'sales_trends' | 'performance_metrics' | 'financial_analysis' | 'custom';
    /**
     * Analysis period
     */
    period: string;
    /**
     * Report filters
     */
    filters?: Record<string, any>;
    /**
     * Metrics to include in report
     */
    metrics?: Array<string>;
    /**
     * Data breakdowns to include
     */
    breakdowns?: Array<string>;
    /**
     * Output format
     */
    format?: 'pdf' | 'excel' | 'csv' | 'json';
    /**
     * Include visualizations
     */
    includeCharts?: boolean;
    /**
     * Report description
     */
    description?: string;
    /**
     * Schedule report generation
     */
    scheduledFor?: string;
    /**
     * Report recipients
     */
    recipients?: Array<string>;
};

