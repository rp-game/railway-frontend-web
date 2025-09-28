/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CustomizationOptionsDto } from './CustomizationOptionsDto';
import type { DimensionsDto } from './DimensionsDto';
import type { NutritionInfoDto } from './NutritionInfoDto';
export type CreateProductDto = {
    /**
     * Product name
     */
    name: string;
    /**
     * Product SKU (unique)
     */
    sku: string;
    /**
     * Product description
     */
    description?: string;
    /**
     * Short description
     */
    shortDescription?: string;
    /**
     * Product type
     */
    productType: 'physical' | 'digital' | 'service' | 'food' | 'beverage' | 'souvenir' | 'personal_care' | 'electronics' | 'reading_material' | 'pharmaceutical' | 'clothing';
    /**
     * Base price in VND
     */
    basePrice: string;
    /**
     * Sale price in VND (optional)
     */
    salePrice?: string;
    /**
     * Cost price in VND
     */
    cost: string;
    /**
     * Currency code
     */
    currency?: string;
    /**
     * Unit of measure
     */
    unitOfMeasure: 'piece' | 'kg' | 'g' | 'l' | 'ml' | 'm' | 'cm' | 'pack' | 'box' | 'bottle' | 'can' | 'serving' | 'portion';
    /**
     * Weight in kg
     */
    weight?: number;
    /**
     * Product dimensions
     */
    dimensions?: DimensionsDto;
    /**
     * Category ID
     */
    categoryId: string;
    /**
     * Vendor ID
     */
    vendorId: string;
    /**
     * Track inventory
     */
    trackInventory?: boolean;
    /**
     * Allow backorder
     */
    allowBackorder?: boolean;
    /**
     * Minimum quantity per order
     */
    minimumQuantity?: number;
    /**
     * Maximum quantity per order
     */
    maximumQuantity?: number;
    /**
     * Tax rate percentage
     */
    taxRate?: number;
    /**
     * Preparation time in minutes
     */
    preparationTime?: number;
    /**
     * Available from date
     */
    availableFrom?: string;
    /**
     * Available until date
     */
    availableUntil?: string;
    /**
     * Product tags
     */
    tags?: Array<string>;
    /**
     * Nutrition information
     */
    nutritionInfo?: NutritionInfoDto;
    /**
     * Customization options
     */
    customizationOptions?: CustomizationOptionsDto;
};

