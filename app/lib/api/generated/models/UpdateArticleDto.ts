/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type UpdateArticleDto = {
    /**
     * Article title
     */
    title?: string;
    /**
     * Article slug
     */
    slug?: string;
    /**
     * Article content
     */
    content?: string;
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
     * Published date (ISO string)
     */
    publishedAt?: string;
};

