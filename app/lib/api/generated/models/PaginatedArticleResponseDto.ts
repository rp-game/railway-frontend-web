/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ArticleResponseDto } from './ArticleResponseDto';
import type { PaginationMeta } from './PaginationMeta';
export type PaginatedArticleResponseDto = {
    /**
     * Array of articles
     */
    data: Array<ArticleResponseDto>;
    /**
     * Pagination metadata
     */
    meta: PaginationMeta;
};

