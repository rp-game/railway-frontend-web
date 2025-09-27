/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CreateArticleDto = {
    /**
     * Article title
     */
    title: string;
    /**
     * Article slug (auto-generated if not provided)
     */
    slug?: string;
    /**
     * Article content
     */
    content: string;
    /**
     * Article excerpt/summary
     */
    excerpt?: string;
    /**
     * Featured image URL
     */
    featuredImage?: string;
    /**
     * Article status
     */
    status?: 'draft' | 'pending' | 'published' | 'archived';
    /**
     * Array of tag IDs to associate with the article
     */
    tagIds?: Array<string>;
    /**
     * Publish article immediately after creation
     */
    publishNow?: boolean;
};

