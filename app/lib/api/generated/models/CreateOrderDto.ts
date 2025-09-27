/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateOrderItemDto } from './CreateOrderItemDto';
export type CreateOrderDto = {
    /**
     * Ticket ID for the order
     */
    ticketId: string;
    /**
     * Array of order items
     */
    items: Array<CreateOrderItemDto>;
    /**
     * Special instructions for the entire order
     */
    specialInstructions?: string;
    /**
     * Customer notes for the order
     */
    notes?: string;
};

