/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Decimal } from './Decimal';
import type { ProductCategory } from './ProductCategory';
import type { ProductImage } from './ProductImage';
import type { ProductInventory } from './ProductInventory';
import type { ProductVariant } from './ProductVariant';
import type { Vendor } from './Vendor';
export type Product = {
    /**
     * Product ID
     */
    id: string;
    /**
     * Creation timestamp
     */
    createdAt: string;
    /**
     * Last update timestamp
     */
    updatedAt: string;
    /**
     * Product name
     */
    name: string;
    /**
     * Product SKU
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
     * Product status
     */
    status: 'draft' | 'active' | 'inactive' | 'out_of_stock' | 'discontinued' | 'pending_approval' | 'expired';
    /**
     * Product type
     */
    productType: 'physical' | 'digital' | 'service' | 'food' | 'beverage' | 'souvenir' | 'personal_care' | 'electronics' | 'reading_material' | 'pharmaceutical' | 'clothing';
    /**
     * Base price
     */
    basePrice: Decimal;
    /**
     * Sale price
     */
    salePrice?: Decimal;
    /**
     * Cost price
     */
    cost: Decimal;
    /**
     * Currency
     */
    currency: string;
    /**
     * Unit of measure
     */
    unitOfMeasure: 'piece' | 'kg' | 'g' | 'l' | 'ml' | 'm' | 'cm' | 'pack' | 'box' | 'bottle' | 'can' | 'serving' | 'portion';
    /**
     * Is product active
     */
    isActive: boolean;
    /**
     * Is product visible to customers
     */
    isVisible: boolean;
    /**
     * Is product featured
     */
    isFeatured: boolean;
    /**
     * Category ID
     */
    categoryId: string;
    category?: ProductCategory;
    /**
     * Vendor ID
     */
    vendorId: string;
    vendor?: Vendor;
    variants?: Array<ProductVariant>;
    images?: Array<ProductImage>;
    inventories?: Array<ProductInventory>;
    /**
     * Current price (computed)
     */
    price: number;
};

