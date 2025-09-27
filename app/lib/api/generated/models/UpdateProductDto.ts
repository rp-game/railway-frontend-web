/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CustomizationOptionsDto } from './CustomizationOptionsDto';
import type { DimensionsDto } from './DimensionsDto';
import type { NutritionInfoDto } from './NutritionInfoDto';
export type UpdateProductDto = {
    name?: string;
    description?: string;
    shortDescription?: string;
    status?: 'draft' | 'active' | 'inactive' | 'out_of_stock' | 'discontinued' | 'pending_approval' | 'expired';
    productType?: 'physical' | 'digital' | 'service' | 'food' | 'beverage' | 'souvenir' | 'personal_care' | 'electronics' | 'reading_material' | 'pharmaceutical' | 'clothing';
    basePrice?: string;
    salePrice?: string;
    cost?: string;
    unitOfMeasure?: 'piece' | 'kg' | 'g' | 'l' | 'ml' | 'm' | 'cm' | 'pack' | 'box' | 'bottle' | 'can' | 'serving' | 'portion';
    weight?: number;
    dimensions?: DimensionsDto;
    categoryId?: string;
    isActive?: boolean;
    isVisible?: boolean;
    isFeatured?: boolean;
    trackInventory?: boolean;
    minimumQuantity?: number;
    maximumQuantity?: number;
    taxRate?: number;
    preparationTime?: number;
    tags?: Array<string>;
    nutritionInfo?: NutritionInfoDto;
    customizationOptions?: CustomizationOptionsDto;
};

