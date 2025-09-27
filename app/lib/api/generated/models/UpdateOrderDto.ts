/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateOrderItemDto } from './CreateOrderItemDto';
export type UpdateOrderDto = {
    /**
     * Ticket ID for the order
     */
    ticketId?: string;
    /**
     * Array of order items
     */
    items?: Array<CreateOrderItemDto>;
    /**
     * Updated special instructions
     */
    specialInstructions?: string;
    /**
     * Updated customer notes
     */
    notes?: string;
    /**
     * Order status
     */
    status?: 'pending' | 'confirmed' | 'paid' | 'in_preparation' | 'ready' | 'in_delivery' | 'delivered' | 'completed' | 'cancelled' | 'refunded' | 'failed';
};

