/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type TagResponseDto = {
    /**
     * Tag ID
     */
    id: string;
    /**
     * Tag name
     */
    name: string;
    /**
     * Tag slug
     */
    slug: string;
    /**
     * Tag description
     */
    description?: string;
    /**
     * Tag color
     */
    color?: string;
    /**
     * Parent tag ID
     */
    parentId?: string;
    /**
     * Sort order
     */
    sortOrder: number;
    /**
     * Is tag active
     */
    isActive: boolean;
    /**
     * Creation date
     */
    createdAt: string;
    /**
     * Update date
     */
    updatedAt: string;
    /**
     * Child tags
     */
    children?: Array<TagResponseDto>;
    /**
     * Parent tag
     */
    parent?: TagResponseDto;
};

