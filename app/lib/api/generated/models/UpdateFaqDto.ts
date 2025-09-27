/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type UpdateFaqDto = {
    /**
     * FAQ question
     */
    question?: string;
    /**
     * FAQ answer
     */
    answer?: string;
    /**
     * FAQ category
     */
    category?: 'general' | 'booking' | 'payment' | 'food_ordering' | 'delivery' | 'account' | 'technical';
    /**
     * FAQ status
     */
    status?: 'draft' | 'published' | 'archived';
    /**
     * Sort order for display
     */
    sortOrder?: number;
    /**
     * Tags for search (comma-separated)
     */
    tags?: string;
    /**
     * User ID who created this FAQ
     */
    createdBy?: string;
};

