/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ProductInventoryDto = {
    /**
     * Unique identifier for the inventory record
     */
    id: string;
    /**
     * Location code (station, train, or warehouse)
     */
    locationCode: string;
    /**
     * Human readable location name
     */
    locationName?: string;
    /**
     * Train code for train-specific inventory
     */
    trainCode?: string;
    /**
     * Car number for car-specific inventory
     */
    carNumber?: string;
    /**
     * Current stock quantity
     */
    quantity: number;
    /**
     * Reserved quantity for pending orders
     */
    reservedQuantity: number;
    /**
     * Damaged/unusable stock quantity
     */
    damagedQuantity: number;
    /**
     * Low stock threshold
     */
    lowStockThreshold: number;
    /**
     * Maximum stock capacity
     */
    maxStockCapacity: number;
    /**
     * Reorder point
     */
    reorderPoint: number;
    /**
     * Reorder quantity
     */
    reorderQuantity: number;
    /**
     * Last transaction type
     */
    lastTransactionType: 'PURCHASE' | 'SALE' | 'ADJUSTMENT' | 'TRANSFER' | 'DAMAGE' | 'RESERVATION' | 'RELEASE_RESERVATION';
    /**
     * Last transaction reference (Order ID, Transfer ID, etc.)
     */
    lastTransactionReference?: string;
    /**
     * Last restock date
     */
    lastRestockDate?: string;
    /**
     * Last sale date
     */
    lastSaleDate?: string;
    /**
     * Product expiry date
     */
    expiryDate?: string;
    /**
     * Batch number
     */
    batchNumber?: string;
    /**
     * Supplier reference
     */
    supplierReference?: string;
    /**
     * Storage conditions requirements
     */
    storageConditions?: Record<string, any>;
    /**
     * Whether the inventory record is active
     */
    isActive: boolean;
    /**
     * Whether auto-reorder is enabled
     */
    autoReorder: boolean;
    /**
     * Additional metadata
     */
    metadata?: Record<string, any>;
    /**
     * Product ID
     */
    productId: string;
    /**
     * Product variant ID
     */
    variantId?: string;
    /**
     * Available quantity (quantity minus reserved)
     */
    availableQuantity: number;
    /**
     * Stock status
     */
    stockStatus: 'out_of_stock' | 'low_stock' | 'in_stock' | 'overstocked';
    /**
     * Whether stock is low
     */
    isLowStock: boolean;
    /**
     * Whether out of stock
     */
    isOutOfStock: boolean;
    /**
     * Whether needs reorder
     */
    needsReorder: boolean;
    /**
     * Created timestamp
     */
    createdAt: string;
    /**
     * Updated timestamp
     */
    updatedAt: string;
};

