/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateCategoryDto } from '../models/CreateCategoryDto';
import type { Product } from '../models/Product';
import type { ProductCategory } from '../models/ProductCategory';
import type { ProductDiscoveryResponseDto } from '../models/ProductDiscoveryResponseDto';
import type { ProductImage } from '../models/ProductImage';
import type { ProductInventoryDto } from '../models/ProductInventoryDto';
import type { ProductVariant } from '../models/ProductVariant';
import type { UpdateInventoryDto } from '../models/UpdateInventoryDto';
import type { UpdateProductDto } from '../models/UpdateProductDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ProductsService {
    /**
     * Get all products
     * @returns any Return paginated products.
     * @throws ApiError
     */
    public static productsControllerFindAll({
        category,
        vendor,
        withCount,
        page,
        pageSize,
    }: {
        /**
         * Filter by category ID
         */
        category?: string,
        /**
         * Filter by vendor ID
         */
        vendor?: string,
        /**
         * Include total count (0=no, 1=yes)
         */
        withCount?: number,
        /**
         * Page number (starts from 1)
         */
        page?: number,
        /**
         * Number of items per page
         */
        pageSize?: number,
    }): CancelablePromise<{
        data?: Array<Product>;
        meta?: {
            page?: number;
            pageSize?: number;
            /**
             * Only included when withCount=1
             */
            total?: number;
            filter?: Record<string, any>;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/products',
            query: {
                'category': category,
                'vendor': vendor,
                'withCount': withCount,
                'page': page,
                'pageSize': pageSize,
            },
        });
    }
    /**
     * Create a new product
     * @returns Product The product has been successfully created.
     * @throws ApiError
     */
    public static productsControllerCreate(): CancelablePromise<Product> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/products',
        });
    }
    /**
     * Discover available products from train and station vendors
     * Ultra-simple product discovery: finds train vendor products and upcoming station products
     * @returns ProductDiscoveryResponseDto Products discovered successfully
     * @throws ApiError
     */
    public static productsControllerDiscoverProducts({
        trainCode,
        upcomingStations,
        categoryId,
        minPrice,
        maxPrice,
        search,
        page = 1,
        pageSize = 20,
    }: {
        /**
         * Train code to find on-train products
         */
        trainCode: string,
        /**
         * Array of upcoming station IDs for station products
         */
        upcomingStations?: Array<string>,
        /**
         * Filter by product category ID
         */
        categoryId?: string,
        /**
         * Minimum price filter
         */
        minPrice?: number,
        /**
         * Maximum price filter
         */
        maxPrice?: number,
        /**
         * Search query for product names and descriptions
         */
        search?: string,
        /**
         * Page number for pagination
         */
        page?: number,
        /**
         * Number of items per page
         */
        pageSize?: number,
    }): CancelablePromise<ProductDiscoveryResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/products/available',
            query: {
                'trainCode': trainCode,
                'upcomingStations': upcomingStations,
                'categoryId': categoryId,
                'minPrice': minPrice,
                'maxPrice': maxPrice,
                'search': search,
                'page': page,
                'pageSize': pageSize,
            },
            errors: {
                400: `Invalid query parameters`,
            },
        });
    }
    /**
     * Get all product categories
     * @returns any Return paginated categories.
     * @throws ApiError
     */
    public static productsControllerFindCategories({
        withCount,
        page,
        pageSize,
    }: {
        /**
         * Include total count (0=no, 1=yes)
         */
        withCount?: number,
        /**
         * Page number (starts from 1)
         */
        page?: number,
        /**
         * Number of items per page
         */
        pageSize?: number,
    }): CancelablePromise<{
        data?: Array<ProductCategory>;
        meta?: {
            page?: number;
            pageSize?: number;
            /**
             * Only included when withCount=1
             */
            total?: number;
            filter?: Record<string, any>;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/products/categories',
            query: {
                'withCount': withCount,
                'page': page,
                'pageSize': pageSize,
            },
        });
    }
    /**
     * Create a new product category
     * @returns ProductCategory The category has been successfully created.
     * @throws ApiError
     */
    public static productsControllerCreateCategory({
        requestBody,
    }: {
        requestBody: CreateCategoryDto,
    }): CancelablePromise<ProductCategory> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/products/categories',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get a product by id
     * @returns Product Return a product.
     * @throws ApiError
     */
    public static productsControllerFindOne({
        id,
    }: {
        id: string,
    }): CancelablePromise<Product> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/products/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Product not found.`,
            },
        });
    }
    /**
     * Update a product
     * @returns Product The product has been successfully updated.
     * @throws ApiError
     */
    public static productsControllerUpdate({
        id,
        requestBody,
    }: {
        id: string,
        /**
         * Product data to update
         */
        requestBody: UpdateProductDto,
    }): CancelablePromise<Product> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/v1/products/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `Product not found.`,
            },
        });
    }
    /**
     * Delete a product
     * @returns any The product has been successfully deleted.
     * @throws ApiError
     */
    public static productsControllerRemove({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/products/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Product not found.`,
            },
        });
    }
    /**
     * Delete a product category
     * @returns any The category has been successfully deleted.
     * @throws ApiError
     */
    public static productsControllerDeleteCategory({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/products/categories/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Cannot delete category with subcategories or products.`,
                404: `Category not found.`,
            },
        });
    }
    /**
     * Add image to product
     * @returns ProductImage The image has been successfully added.
     * @throws ApiError
     */
    public static productsControllerAddImage({
        id,
    }: {
        id: string,
    }): CancelablePromise<ProductImage> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/products/{id}/images',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Add variant to product
     * @returns ProductVariant The variant has been successfully added.
     * @throws ApiError
     */
    public static productsControllerAddVariant({
        id,
    }: {
        id: string,
    }): CancelablePromise<ProductVariant> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/products/{id}/variants',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Update product inventory
     * @returns ProductInventoryDto The inventory has been successfully updated.
     * @throws ApiError
     */
    public static productsControllerUpdateInventory({
        id,
        requestBody,
    }: {
        id: string,
        /**
         * Inventory data to update
         */
        requestBody: UpdateInventoryDto,
    }): CancelablePromise<ProductInventoryDto> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/v1/products/{id}/inventory',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get real-time inventory levels (UC2.4)
     * Get real-time stock levels across all products and locations
     * @returns any Real-time inventory data retrieved successfully
     * @throws ApiError
     */
    public static productsControllerGetRealtimeInventory({
        vendorId,
        locationId,
        lowStockOnly,
        outOfStockOnly,
    }: {
        /**
         * Filter by vendor
         */
        vendorId?: string,
        /**
         * Filter by location/station
         */
        locationId?: string,
        /**
         * Show only low stock items
         */
        lowStockOnly?: boolean,
        /**
         * Show only out of stock items
         */
        outOfStockOnly?: boolean,
    }): CancelablePromise<{
        timestamp?: string;
        inventories?: Array<{
            productId?: string;
            productName?: string;
            currentStock?: number;
            reservedStock?: number;
            availableStock?: number;
            reorderLevel?: number;
            maxStock?: number;
            lastUpdated?: string;
            status?: 'in_stock' | 'low_stock' | 'out_of_stock' | 'discontinued';
            location?: string;
            vendor?: string;
            vendorId?: string;
            vendorName?: string;
        }>;
        correlationId?: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/products/inventory/realtime',
            query: {
                'vendorId': vendorId,
                'locationId': locationId,
                'lowStockOnly': lowStockOnly,
                'outOfStockOnly': outOfStockOnly,
            },
        });
    }
    /**
     * Subscribe to inventory alerts (UC2.4)
     * Subscribe to low stock and out of stock notifications
     * @returns any Successfully subscribed to inventory alerts
     * @throws ApiError
     */
    public static productsControllerSubscribeToInventoryAlerts(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/products/inventory/alerts/subscribe',
        });
    }
    /**
     * Bulk update inventory (UC2.4)
     * Update inventory levels for multiple products at once
     * @returns any Bulk inventory update completed
     * @throws ApiError
     */
    public static productsControllerBulkUpdateInventory({
        requestBody,
    }: {
        requestBody: Array<string>,
    }): CancelablePromise<{
        success?: boolean;
        updated?: number;
        failed?: number;
        results?: Array<{
            productId?: string;
            success?: boolean;
            error?: string;
            previousStock?: number;
            newStock?: number;
        }>;
    }> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/products/inventory/bulk-update',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get inventory movement history (UC2.4)
     * Get detailed history of stock movements for a product
     * @returns any Inventory history retrieved successfully
     * @throws ApiError
     */
    public static productsControllerGetInventoryHistory({
        productId,
        limit,
        from,
        to,
        type,
    }: {
        /**
         * Product ID to get history for
         */
        productId: string,
        /**
         * Number of records to return
         */
        limit?: number,
        /**
         * Start date (ISO string)
         */
        from?: string,
        /**
         * End date (ISO string)
         */
        to?: string,
        /**
         * Movement type filter
         */
        type?: 'purchase' | 'sale' | 'adjustment' | 'return' | 'transfer',
    }): CancelablePromise<{
        movements?: Array<{
            id?: string;
            type?: 'purchase' | 'sale' | 'adjustment' | 'return' | 'transfer' | 'expired' | 'damaged';
            quantity?: number;
            previousStock?: number;
            newStock?: number;
            reason?: string;
            notes?: string;
            performedBy?: string;
            timestamp?: string;
            relatedOrderId?: string;
            batchNumber?: string;
            expiryDate?: string;
        }>;
        summary?: {
            totalMovements?: number;
            totalInbound?: number;
            totalOutbound?: number;
            netChange?: number;
            periodStart?: string;
            periodEnd?: string;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/products/inventory/{productId}/history',
            path: {
                'productId': productId,
            },
            query: {
                'limit': limit,
                'from': from,
                'to': to,
                'type': type,
            },
        });
    }
    /**
     * Generate automated reorder suggestions (UC2.4)
     * Generate reorder suggestions based on sales patterns and current stock levels
     * @returns any Reorder suggestions generated successfully
     * @throws ApiError
     */
    public static productsControllerGenerateReorderSuggestions(): CancelablePromise<{
        suggestions?: Array<{
            productId?: string;
            productName?: string;
            currentStock?: number;
            suggestedOrderQuantity?: number;
            priority?: 'low' | 'medium' | 'high' | 'urgent';
            estimatedStockoutDate?: string;
            averageDailySales?: number;
            leadTime?: number;
            lastOrderDate?: string;
            supplier?: string;
            estimatedCost?: number;
        }>;
        summary?: {
            totalSuggestions?: number;
            urgentItems?: number;
            estimatedTotalCost?: number;
            potentialStockouts?: number;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/products/inventory/reorder/automated',
        });
    }
    /**
     * Adjust inventory with reason (UC2.4)
     * Manually adjust inventory levels with detailed reasoning and audit trail
     * @returns any Inventory adjusted successfully
     * @throws ApiError
     */
    public static productsControllerAdjustInventory({
        requestBody,
    }: {
        /**
         * Inventory adjustment data
         */
        requestBody: {
            /**
             * Product ID to adjust
             */
            productId: string;
            /**
             * Location ID (optional)
             */
            locationId?: string;
            /**
             * Type of adjustment
             */
            adjustmentType: 'increase' | 'decrease' | 'set_absolute';
            /**
             * Quantity to adjust
             */
            quantity: number;
            /**
             * Reason for adjustment
             */
            reason: 'damaged' | 'expired' | 'theft' | 'count_correction' | 'return' | 'gift' | 'sample' | 'other';
            /**
             * Additional notes (optional)
             */
            notes?: string;
            /**
             * Batch number (optional)
             */
            batchNumber?: string;
            /**
             * Expiry date (optional)
             */
            expiryDate?: string;
            /**
             * Photo evidence URLs (optional)
             */
            photoEvidence?: Array<string>;
            /**
             * Whether approval is required (optional)
             */
            approvalRequired?: boolean;
        },
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/products/inventory/adjust',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get inventory analytics (UC2.4)
     * Get comprehensive inventory analytics and insights
     * @returns any Inventory analytics retrieved successfully
     * @throws ApiError
     */
    public static productsControllerGetInventoryAnalytics({
        vendorId,
        categoryId,
        period,
    }: {
        /**
         * Filter by vendor
         */
        vendorId?: string,
        /**
         * Filter by category
         */
        categoryId?: string,
        /**
         * Analysis period
         */
        period?: '7d' | '30d' | '90d' | '1y',
    }): CancelablePromise<{
        turnoverRates?: {
            overall?: number;
            byCategory?: any[];
            byProduct?: any[];
        };
        stockLevels?: {
            averageStockValue?: number;
            stockoutEvents?: number;
            overstockItems?: number;
            deadStock?: any[];
        };
        performance?: {
            fillRate?: number;
            stockAccuracy?: number;
            wastePercentage?: number;
            carryingCosts?: number;
        };
        trends?: Array<{
            date?: string;
            stockValue?: number;
            turnoverRate?: number;
            stockoutEvents?: number;
        }>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/products/inventory/analytics',
            query: {
                'vendorId': vendorId,
                'categoryId': categoryId,
                'period': period,
            },
        });
    }
    /**
     * Get demand forecasting for product (UC2.4)
     * Get AI-powered demand forecasting for inventory planning
     * @returns any Demand forecast generated successfully
     * @throws ApiError
     */
    public static productsControllerGetDemandForecast({
        productId,
        includeSeasonality,
        horizon,
    }: {
        /**
         * Product ID for forecasting
         */
        productId: string,
        /**
         * Include seasonal patterns
         */
        includeSeasonality?: boolean,
        /**
         * Forecast horizon
         */
        horizon?: '7d' | '30d' | '90d',
    }): CancelablePromise<{
        forecast?: Array<{
            date?: string;
            predictedDemand?: number;
            confidence?: number;
            factors?: Array<string>;
        }>;
        recommendations?: {
            optimalStock?: number;
            reorderPoint?: number;
            safetyStock?: number;
            orderQuantity?: number;
        };
        modelAccuracy?: {
            mape?: number;
            accuracy?: number;
            lastTraining?: string;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/products/inventory/forecasting/{productId}',
            path: {
                'productId': productId,
            },
            query: {
                'includeSeasonality': includeSeasonality,
                'horizon': horizon,
            },
        });
    }
    /**
     * Transfer inventory between locations (UC2.4)
     * Transfer stock between different locations/stations
     * @returns any Inventory transfer initiated successfully
     * @throws ApiError
     */
    public static productsControllerTransferInventory(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/products/inventory/transfer',
        });
    }
    /**
     * Get active inventory alerts (UC2.4)
     * Get all active inventory alerts and warnings
     * @returns any Active inventory alerts retrieved successfully
     * @throws ApiError
     */
    public static productsControllerGetActiveInventoryAlerts({
        severity,
        type,
    }: {
        /**
         * Filter by severity
         */
        severity?: 'low' | 'medium' | 'high' | 'critical',
        /**
         * Filter by alert type
         */
        type?: 'low_stock' | 'out_of_stock' | 'overstock' | 'expired' | 'damaged',
    }): CancelablePromise<{
        alerts?: Array<{
            id?: string;
            type?: string;
            severity?: string;
            productId?: string;
            productName?: string;
            currentStock?: number;
            threshold?: number;
            message?: string;
            createdAt?: string;
            acknowledged?: boolean;
            actionRequired?: boolean;
        }>;
        summary?: {
            totalAlerts?: number;
            criticalAlerts?: number;
            unacknowledged?: number;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/products/inventory/alerts/active',
            query: {
                'severity': severity,
                'type': type,
            },
        });
    }
}
