/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OrderItemCustomizationDto } from './OrderItemCustomizationDto';
export type CreateOrderItemDto = {
    /**
     * Product ID
     */
    productId: string;
    /**
     * Product variant ID
     */
    variantId?: string;
    /**
     * Quantity of the product
     */
    quantity: number;
    /**
     * Customizations for the product
     */
    customizations?: OrderItemCustomizationDto;
    /**
     * Customer notes for this item
     */
    customerNotes?: string;
};

