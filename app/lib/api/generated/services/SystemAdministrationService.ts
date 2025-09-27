/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BackupRequestDto } from '../models/BackupRequestDto';
import type { MaintenanceModeDto } from '../models/MaintenanceModeDto';
import type { RestoreRequestDto } from '../models/RestoreRequestDto';
import type { SystemConfigDto } from '../models/SystemConfigDto';
import type { SystemHealthDto } from '../models/SystemHealthDto';
import type { UpdateSystemConfigDto } from '../models/UpdateSystemConfigDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SystemAdministrationService {
    /**
     * Get all system configurations
     * Retrieve all system configuration settings for UC3.1
     * @returns SystemConfigDto System configurations retrieved successfully
     * @throws ApiError
     */
    public static adminControllerGetSystemConfigurations(): CancelablePromise<Array<SystemConfigDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/admin/system/config',
            errors: {
                403: `Insufficient permissions`,
            },
        });
    }
    /**
     * Get configurations by category
     * Retrieve system configurations filtered by category
     * @returns SystemConfigDto Category configurations retrieved successfully
     * @throws ApiError
     */
    public static adminControllerGetConfigurationsByCategory({
        category,
    }: {
        /**
         * Configuration category
         */
        category: 'database' | 'payment' | 'order' | 'notification' | 'security' | 'integration' | 'monitoring' | 'business',
    }): CancelablePromise<Array<SystemConfigDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/admin/system/config/{category}',
            path: {
                'category': category,
            },
        });
    }
    /**
     * Update system configuration
     * Update a specific system configuration setting for UC3.1
     * @returns SystemConfigDto Configuration updated successfully
     * @throws ApiError
     */
    public static adminControllerUpdateSystemConfiguration({
        key,
        requestBody,
    }: {
        /**
         * Configuration key to update
         */
        key: string,
        requestBody: UpdateSystemConfigDto,
    }): CancelablePromise<SystemConfigDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/admin/system/config/{key}',
            path: {
                'key': key,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                403: `Insufficient permissions`,
                404: `Configuration not found`,
            },
        });
    }
    /**
     * Bulk update system configurations
     * Update multiple system configurations at once
     * @returns any Configurations updated successfully
     * @throws ApiError
     */
    public static adminControllerBulkUpdateConfigurations({
        requestBody,
    }: {
        requestBody: Array<string>,
    }): CancelablePromise<{
        updated?: number;
        failed?: number;
        results?: Array<SystemConfigDto>;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/admin/system/config/bulk-update',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Create database backup
     * Create a full database backup for disaster recovery (UC3.3)
     * @returns any Backup created successfully
     * @throws ApiError
     */
    public static adminControllerCreateBackup({
        requestBody,
    }: {
        requestBody: BackupRequestDto,
    }): CancelablePromise<{
        backupId?: string;
        filename?: string;
        size?: number;
        createdAt?: string;
        status?: 'in_progress' | 'completed' | 'failed';
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/admin/backup/create',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                403: `Insufficient permissions`,
            },
        });
    }
    /**
     * List all backups
     * Get list of all database backups with their status
     * @returns any Backup list retrieved successfully
     * @throws ApiError
     */
    public static adminControllerListBackups({
        limit,
    }: {
        /**
         * Number of backups to retrieve
         */
        limit?: number,
    }): CancelablePromise<Array<{
        id?: string;
        filename?: string;
        size?: number;
        createdAt?: string;
        status?: string;
        createdBy?: string;
    }>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/admin/backup/list',
            query: {
                'limit': limit,
            },
        });
    }
    /**
     * Restore from backup
     * Restore database from a specific backup (UC3.3)
     * @returns any Restore initiated successfully
     * @throws ApiError
     */
    public static adminControllerRestoreFromBackup({
        requestBody,
    }: {
        requestBody: RestoreRequestDto,
    }): CancelablePromise<{
        restoreId?: string;
        status?: 'in_progress' | 'completed' | 'failed';
        estimatedTime?: number;
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/admin/backup/restore',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid backup file or restore parameters`,
                403: `Insufficient permissions`,
            },
        });
    }
    /**
     * Get backup status
     * Check the status of a backup or restore operation
     * @returns any Backup status retrieved successfully
     * @throws ApiError
     */
    public static adminControllerGetBackupStatus({
        backupId,
    }: {
        /**
         * Backup operation ID
         */
        backupId: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/admin/backup/{backupId}/status',
            path: {
                'backupId': backupId,
            },
        });
    }
    /**
     * Get detailed system health
     * Comprehensive system health check for UC3.1
     * @returns SystemHealthDto System health information retrieved successfully
     * @throws ApiError
     */
    public static adminControllerGetDetailedSystemHealth(): CancelablePromise<SystemHealthDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/admin/system/health/detailed',
        });
    }
    /**
     * Get system performance metrics
     * Retrieve system performance data and metrics
     * @returns any Performance metrics retrieved successfully
     * @throws ApiError
     */
    public static adminControllerGetPerformanceMetrics({
        period,
    }: {
        /**
         * Time period for metrics
         */
        period?: '1h' | '24h' | '7d' | '30d',
    }): CancelablePromise<{
        cpu?: Record<string, any>;
        memory?: Record<string, any>;
        database?: Record<string, any>;
        api?: Record<string, any>;
        errors?: any[];
        uptime?: number;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/admin/system/performance',
            query: {
                'period': period,
            },
        });
    }
    /**
     * Toggle maintenance mode
     * Enable or disable system maintenance mode for UC3.1
     * @returns any Maintenance mode updated successfully
     * @throws ApiError
     */
    public static adminControllerToggleMaintenanceMode({
        requestBody,
    }: {
        requestBody: MaintenanceModeDto,
    }): CancelablePromise<{
        maintenanceMode?: boolean;
        message?: string;
        estimatedDuration?: number;
        affectedServices?: Array<string>;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/admin/maintenance/toggle',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get maintenance mode status
     * Check if system is in maintenance mode
     * @returns any Maintenance status retrieved successfully
     * @throws ApiError
     */
    public static adminControllerGetMaintenanceStatus(): CancelablePromise<{
        isMaintenanceMode?: boolean;
        message?: string;
        startedAt?: string;
        estimatedEnd?: string;
        enabledBy?: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/admin/maintenance/status',
        });
    }
    /**
     * Get user statistics
     * Comprehensive user statistics for system administration
     * @returns any User statistics retrieved successfully
     * @throws ApiError
     */
    public static adminControllerGetUserStatistics(): CancelablePromise<{
        totalUsers?: number;
        activeUsers?: number;
        usersByType?: Record<string, any>;
        usersByRole?: Record<string, any>;
        recentRegistrations?: number;
        blockedUsers?: number;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/admin/users/statistics',
        });
    }
    /**
     * Suspend user account
     * Suspend a user account for administrative reasons
     * @returns any User suspended successfully
     * @throws ApiError
     */
    public static adminControllerSuspendUser({
        userId,
    }: {
        /**
         * User ID to suspend
         */
        userId: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/admin/users/{userId}/suspend',
            path: {
                'userId': userId,
            },
        });
    }
    /**
     * Activate user account
     * Reactivate a suspended user account
     * @returns any User activated successfully
     * @throws ApiError
     */
    public static adminControllerActivateUser({
        userId,
    }: {
        /**
         * User ID to activate
         */
        userId: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/admin/users/{userId}/activate',
            path: {
                'userId': userId,
            },
        });
    }
    /**
     * Get system logs
     * Retrieve system logs for monitoring and debugging
     * @returns any System logs retrieved successfully
     * @throws ApiError
     */
    public static adminControllerGetSystemLogs({
        level,
        limit,
        from,
        to,
    }: {
        /**
         * Log level filter
         */
        level?: 'error' | 'warn' | 'info' | 'debug',
        /**
         * Number of log entries
         */
        limit?: number,
        /**
         * Start date (ISO string)
         */
        from?: string,
        /**
         * End date (ISO string)
         */
        to?: string,
    }): CancelablePromise<{
        logs?: Array<{
            timestamp?: string;
            level?: string;
            message?: string;
            module?: string;
            userId?: string;
            metadata?: Record<string, any>;
        }>;
        totalCount?: number;
        hasMore?: boolean;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/admin/logs/system',
            query: {
                'level': level,
                'limit': limit,
                'from': from,
                'to': to,
            },
        });
    }
    /**
     * Get audit logs
     * Retrieve audit trail logs for security and compliance
     * @returns any Audit logs retrieved successfully
     * @throws ApiError
     */
    public static adminControllerGetAuditLogs({
        userId,
        action,
        limit,
    }: {
        /**
         * Filter by user ID
         */
        userId?: string,
        /**
         * Filter by action type
         */
        action?: string,
        /**
         * Number of log entries
         */
        limit?: number,
    }): CancelablePromise<{
        logs?: Array<{
            timestamp?: string;
            userId?: string;
            action?: string;
            resource?: string;
            details?: Record<string, any>;
            ipAddress?: string;
            userAgent?: string;
        }>;
        totalCount?: number;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/admin/logs/audit',
            query: {
                'userId': userId,
                'action': action,
                'limit': limit,
            },
        });
    }
}
