/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CreateDeliveryDto = {
    orderId: string;
    deliveryPersonName?: string;
    deliveryPersonPhone?: string;
    pickupStation: string;
    deliveryStation: string;
    deliveryAddress: string;
    status: 'pending' | 'ready_for_pickup' | 'assigned' | 'picked_up' | 'in_transit' | 'delivered' | 'failed' | 'cancelled';
    estimatedDeliveryTime?: string;
    deliveryNotes?: string;
    trackingNumber?: string;
};

