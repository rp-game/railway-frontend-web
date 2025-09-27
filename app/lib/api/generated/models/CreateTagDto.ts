/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CreateTagDto = {
    /**
     * Tag name
     */
    name: string;
    /**
     * Tag slug (auto-generated if not provided)
     */
    slug?: string;
    /**
     * Tag description
     */
    description?: string;
    /**
     * Tag color (hex format)
     */
    color?: string;
    /**
     * Parent tag ID for hierarchical structure
     */
    parentId?: string;
    /**
     * Sort order
     */
    sortOrder?: number;
    /**
     * Is tag active
     */
    isActive?: boolean;
};

