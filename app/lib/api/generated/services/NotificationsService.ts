/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RegisterPushTokenDto } from '../models/RegisterPushTokenDto';
import type { SendNotificationDto } from '../models/SendNotificationDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class NotificationsService {
    /**
     * Get user notifications
     * Get paginated list of notifications for the current user
     * @returns any Notifications retrieved successfully
     * @throws ApiError
     */
    public static notificationsControllerGetNotifications({
        page,
        pageSize,
        withCount,
        read,
        type,
        priority,
    }: {
        /**
         * Page number (starts from 1)
         */
        page?: number,
        /**
         * Number of items per page
         */
        pageSize?: number,
        /**
         * Include total count (0=no, 1=yes)
         */
        withCount?: 0 | 1,
        read?: boolean,
        type?: Array<string>,
        priority?: Array<string>,
    }): CancelablePromise<{
        /**
         * Array of notifications
         */
        data?: any[];
        meta?: {
            /**
             * Total count (only when withCount=1)
             */
            total?: number;
            /**
             * Current page number
             */
            page?: number;
            /**
             * Number of items per page
             */
            pageSize?: number;
            /**
             * Applied filters
             */
            filter?: Record<string, any>;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/notifications',
            query: {
                'page': page,
                'pageSize': pageSize,
                'withCount': withCount,
                'read': read,
                'type': type,
                'priority': priority,
            },
        });
    }
    /**
     * Get notification statistics
     * Get notification statistics for the current user
     * @returns any Statistics retrieved successfully
     * @throws ApiError
     */
    public static notificationsControllerGetNotificationStats(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/notifications/stats',
        });
    }
    /**
     * Mark notification as read
     * Mark a specific notification as read
     * @returns any Notification marked as read
     * @throws ApiError
     */
    public static notificationsControllerMarkAsRead({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/notifications/{id}/read',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Mark all notifications as read
     * Mark all unread notifications as read for the current user
     * @returns any All notifications marked as read
     * @throws ApiError
     */
    public static notificationsControllerMarkAllAsRead(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/notifications/read-all',
        });
    }
    /**
     * Delete notification
     * Delete a specific notification
     * @returns any Notification deleted successfully
     * @throws ApiError
     */
    public static notificationsControllerDeleteNotification({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/notifications/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Register push notification token
     * Register a push notification token for the current user
     * @returns any Push token registered successfully
     * @throws ApiError
     */
    public static notificationsControllerRegisterPushToken({
        requestBody,
    }: {
        requestBody: RegisterPushTokenDto,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/notifications/push-token',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Unregister push notification token
     * Unregister a push notification token
     * @returns any Push token unregistered successfully
     * @throws ApiError
     */
    public static notificationsControllerUnregisterPushToken(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/notifications/push-token',
        });
    }
    /**
     * Send bulk notification (Admin only)
     * Send notification to multiple users
     * @returns any Notifications sent successfully
     * @throws ApiError
     */
    public static notificationsControllerSendBulkNotification({
        requestBody,
    }: {
        requestBody: SendNotificationDto,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/notifications/send',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Test push notification (Admin only)
     * Send a test push notification
     * @returns any Test notification sent
     * @throws ApiError
     */
    public static notificationsControllerTestPushNotification(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/notifications/test-push',
        });
    }
    /**
     * Cleanup expired notifications (Super Admin only)
     * Remove expired notifications from the system
     * @returns any Cleanup completed
     * @throws ApiError
     */
    public static notificationsControllerCleanupExpiredNotifications(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/notifications/cleanup',
        });
    }
    /**
     * Live order tracking stream (UC1.4)
     * Real-time order status updates via Server-Sent Events for order tracking
     * @returns string Real-time order updates stream
     * @throws ApiError
     */
    public static notificationsControllerStreamOrderUpdates({
        orderId,
    }: {
        orderId: string,
    }): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/notifications/stream/orders/{orderId}',
            path: {
                'orderId': orderId,
            },
        });
    }
    /**
     * Live delivery tracking stream (UC2.7)
     * Real-time delivery status updates for train/station staff
     * @returns string Real-time delivery updates stream
     * @throws ApiError
     */
    public static notificationsControllerStreamDeliveryUpdates({
        deliveryId,
    }: {
        deliveryId: string,
    }): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/notifications/stream/delivery/{deliveryId}',
            path: {
                'deliveryId': deliveryId,
            },
        });
    }
    /**
     * Subscribe to order update notifications (UC1.4)
     * Subscribe to push notifications for order status changes
     * @returns any Successfully subscribed to order notifications
     * @throws ApiError
     */
    public static notificationsControllerSubscribeToOrderUpdates(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/notifications/subscribe/order-updates',
        });
    }
    /**
     * Confirm delivery with QR code (UC2.7)
     * Confirm order delivery using QR code scan with real-time updates
     * @returns any Delivery confirmed successfully
     * @throws ApiError
     */
    public static notificationsControllerConfirmDeliveryWithQr({
        deliveryId,
    }: {
        deliveryId: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/notifications/delivery/{deliveryId}/confirm-qr',
            path: {
                'deliveryId': deliveryId,
            },
        });
    }
    /**
     * Live notifications stream (UC1.4)
     * Real-time notifications stream for the current user
     * @returns string Real-time notifications stream
     * @throws ApiError
     */
    public static notificationsControllerStreamLiveNotifications(): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/notifications/stream/live',
        });
    }
    /**
     * Send bulk delivery notifications (UC2.7)
     * Send notifications to multiple staff members about delivery assignments
     * @returns any Bulk delivery notifications sent
     * @throws ApiError
     */
    public static notificationsControllerSendBulkDeliveryNotifications(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/notifications/delivery/bulk-notify',
        });
    }
    /**
     * Get real-time activity feed
     * Get recent activity feed with order and delivery updates
     * @returns any Activity feed retrieved successfully
     * @throws ApiError
     */
    public static notificationsControllerGetActivityFeed({
        limit,
        types,
    }: {
        /**
         * Number of activities to return
         */
        limit?: number,
        /**
         * Activity types to include
         */
        types?: Array<string>,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/notifications/activity-feed',
            query: {
                'limit': limit,
                'types': types,
            },
        });
    }
    /**
     * Send emergency broadcast notification
     * Send emergency notification to all active users or specific user groups
     * @returns any Emergency broadcast sent
     * @throws ApiError
     */
    public static notificationsControllerSendEmergencyBroadcast(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/notifications/emergency/broadcast',
        });
    }
}
