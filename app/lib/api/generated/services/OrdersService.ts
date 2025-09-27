/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateOrderDto } from '../models/CreateOrderDto';
import type { OrderListResponseDto } from '../models/OrderListResponseDto';
import type { UpdateOrderDto } from '../models/UpdateOrderDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class OrdersService {
    /**
     * Create a new order
     * @returns any Order created successfully
     * @throws ApiError
     */
    public static ordersControllerCreate({
        requestBody,
    }: {
        requestBody: CreateOrderDto,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/orders',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid order data`,
            },
        });
    }
    /**
     * Get all orders with filtering and pagination
     * @returns OrderListResponseDto Orders retrieved successfully
     * @throws ApiError
     */
    public static ordersControllerFindAll({
        page = 1,
        limit = 10,
        status,
        userId,
        orderNumber,
        vendorId,
        startDate,
        endDate,
    }: {
        /**
         * Page number
         */
        page?: number,
        /**
         * Number of items per page
         */
        limit?: number,
        /**
         * Filter by order status
         */
        status?: 'pending' | 'confirmed' | 'paid' | 'in_preparation' | 'ready' | 'in_delivery' | 'delivered' | 'completed' | 'cancelled' | 'refunded' | 'failed',
        /**
         * Filter by user ID (admin only)
         */
        userId?: string,
        /**
         * Search by order number
         */
        orderNumber?: string,
        /**
         * Filter by vendor ID
         */
        vendorId?: string,
        /**
         * Start date for date range filter (YYYY-MM-DD)
         */
        startDate?: string,
        /**
         * End date for date range filter (YYYY-MM-DD)
         */
        endDate?: string,
    }): CancelablePromise<OrderListResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/orders',
            query: {
                'page': page,
                'limit': limit,
                'status': status,
                'userId': userId,
                'orderNumber': orderNumber,
                'vendorId': vendorId,
                'startDate': startDate,
                'endDate': endDate,
            },
        });
    }
    /**
     * Get order by ID
     * @returns any Order retrieved successfully
     * @throws ApiError
     */
    public static ordersControllerFindOne({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/orders/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Order not found`,
            },
        });
    }
    /**
     * Update order
     * @returns any Order updated successfully
     * @throws ApiError
     */
    public static ordersControllerUpdate({
        id,
        requestBody,
    }: {
        id: string,
        requestBody: UpdateOrderDto,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/v1/orders/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `Order not found`,
            },
        });
    }
    /**
     * Cancel order
     * @returns any Order cancelled successfully
     * @throws ApiError
     */
    public static ordersControllerRemove({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/orders/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Order not found`,
            },
        });
    }
    /**
     * Confirm order
     * @returns any Order confirmed successfully
     * @throws ApiError
     */
    public static ordersControllerConfirmOrder({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/orders/{id}/confirm',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Start order preparation
     * @returns any Order preparation started
     * @throws ApiError
     */
    public static ordersControllerStartPreparation({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/orders/{id}/prepare',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Mark order as ready for pickup
     * @returns any Order marked as ready
     * @throws ApiError
     */
    public static ordersControllerMarkAsReady({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/orders/{id}/ready',
            path: {
                'id': id,
            },
        });
    }
}
