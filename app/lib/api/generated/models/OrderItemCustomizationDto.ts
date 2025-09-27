/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OrderItemCustomizationOptionDto } from './OrderItemCustomizationOptionDto';
export type OrderItemCustomizationDto = {
    /**
     * Customization options
     */
    options?: Array<OrderItemCustomizationOptionDto>;
    /**
     * Special instructions for the item
     */
    specialInstructions?: string;
    /**
     * Spicy level (0-5)
     */
    spicyLevel?: number;
    /**
     * Allergy notes
     */
    allergyNotes?: string;
    /**
     * Portion size configuration
     */
    portionSize?: Record<string, any>;
};

