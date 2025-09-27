/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CreateCategoryDto = {
    /**
     * Category name
     */
    name: string;
    /**
     * Category code
     */
    code: string;
    /**
     * Category description
     */
    description?: string;
    /**
     * Image URL
     */
    imageUrl?: string;
    /**
     * Icon URL
     */
    iconUrl?: string;
    /**
     * Color in hex format
     */
    color?: string;
    /**
     * Sort order
     */
    sortOrder: number;
    /**
     * Is category active
     */
    isActive: boolean;
    /**
     * Is category visible
     */
    isVisible?: boolean;
    /**
     * Parent category ID
     */
    parentId?: string;
};

