/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type UpdateInventoryDto = {
    /**
     * Current stock quantity
     */
    currentStock?: number;
    /**
     * Minimum stock level for reorder alerts
     */
    minStockLevel?: number;
    /**
     * Maximum stock level
     */
    maxStockLevel?: number;
    /**
     * Unit price for inventory calculations
     */
    unitPrice?: string;
    /**
     * Reorder point threshold
     */
    reorderPoint?: number;
    /**
     * Location or warehouse identifier
     */
    location?: string;
};

