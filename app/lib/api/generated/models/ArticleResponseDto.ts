/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TagResponseDto } from './TagResponseDto';
export type ArticleResponseDto = {
    /**
     * Article ID
     */
    id: string;
    /**
     * Article title
     */
    title: string;
    /**
     * Article slug
     */
    slug: string;
    /**
     * Article content
     */
    content: string;
    /**
     * Article excerpt
     */
    excerpt?: string;
    /**
     * Featured image URL
     */
    featuredImage?: string;
    /**
     * Article status
     */
    status: 'draft' | 'pending' | 'published' | 'archived';
    /**
     * Author ID
     */
    authorId: string;
    /**
     * Published date
     */
    publishedAt?: string;
    /**
     * View count
     */
    viewCount: number;
    /**
     * Creation date
     */
    createdAt: string;
    /**
     * Update date
     */
    updatedAt: string;
    /**
     * Created by user ID
     */
    createdBy?: string;
    /**
     * Updated by user ID
     */
    updatedBy?: string;
    /**
     * Article tags
     */
    tags?: Array<TagResponseDto>;
};

