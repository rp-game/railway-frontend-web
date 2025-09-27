/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateDeliveryDto } from '../models/CreateDeliveryDto';
import type { Delivery } from '../models/Delivery';
import type { UpdateDeliveryDto } from '../models/UpdateDeliveryDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DeliveryService {
    /**
     * Create a new delivery
     * @returns Delivery The delivery has been successfully created.
     * @throws ApiError
     */
    public static deliveryControllerCreate({
        requestBody,
    }: {
        requestBody: CreateDeliveryDto,
    }): CancelablePromise<Delivery> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/delivery',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get all deliveries
     * @returns Delivery Return all deliveries.
     * @throws ApiError
     */
    public static deliveryControllerFindAll({
        status,
    }: {
        /**
         * Filter by delivery status
         */
        status?: 'pending' | 'ready_for_pickup' | 'assigned' | 'picked_up' | 'in_transit' | 'delivered' | 'failed' | 'cancelled',
    }): CancelablePromise<Array<Delivery>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/delivery',
            query: {
                'status': status,
            },
        });
    }
    /**
     * Track delivery by tracking number
     * @returns Delivery Return delivery details.
     * @throws ApiError
     */
    public static deliveryControllerTrackDelivery({
        trackingNumber,
    }: {
        trackingNumber: string,
    }): CancelablePromise<Delivery> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/delivery/track/{trackingNumber}',
            path: {
                'trackingNumber': trackingNumber,
            },
            errors: {
                404: `Delivery not found.`,
            },
        });
    }
    /**
     * Get delivery by order ID
     * @returns Delivery Return delivery for the order.
     * @throws ApiError
     */
    public static deliveryControllerFindByOrderId({
        orderId,
    }: {
        orderId: string,
    }): CancelablePromise<Delivery> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/delivery/order/{orderId}',
            path: {
                'orderId': orderId,
            },
            errors: {
                404: `Delivery not found.`,
            },
        });
    }
    /**
     * Get a delivery by ID
     * @returns Delivery Return a delivery.
     * @throws ApiError
     */
    public static deliveryControllerFindOne({
        id,
    }: {
        id: string,
    }): CancelablePromise<Delivery> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/delivery/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Delivery not found.`,
            },
        });
    }
    /**
     * Update a delivery
     * @returns Delivery The delivery has been successfully updated.
     * @throws ApiError
     */
    public static deliveryControllerUpdate({
        id,
        requestBody,
    }: {
        id: string,
        requestBody: UpdateDeliveryDto,
    }): CancelablePromise<Delivery> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/v1/delivery/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `Delivery not found.`,
            },
        });
    }
    /**
     * Delete a delivery
     * @returns any The delivery has been successfully deleted.
     * @throws ApiError
     */
    public static deliveryControllerRemove({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/delivery/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Delivery not found.`,
            },
        });
    }
}
