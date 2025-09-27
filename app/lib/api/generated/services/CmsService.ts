/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ArticleResponseDto } from '../models/ArticleResponseDto';
import type { CreateArticleDto } from '../models/CreateArticleDto';
import type { CreateTagDto } from '../models/CreateTagDto';
import type { PaginatedArticleResponseDto } from '../models/PaginatedArticleResponseDto';
import type { TagResponseDto } from '../models/TagResponseDto';
import type { UpdateArticleDto } from '../models/UpdateArticleDto';
import type { UpdateTagDto } from '../models/UpdateTagDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CmsService {
    /**
     * Create a new article
     * @returns ArticleResponseDto Article created successfully
     * @throws ApiError
     */
    public static cmsControllerCreateArticle({
        requestBody,
    }: {
        requestBody: CreateArticleDto,
    }): CancelablePromise<ArticleResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/cms/articles',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get all articles with pagination and filters
     * @returns PaginatedArticleResponseDto Articles retrieved successfully
     * @throws ApiError
     */
    public static cmsControllerFindAllArticles({
        page = 1,
        pageSize = 10,
        search,
        status,
        authorId,
        tagId,
        dateFrom,
        dateTo,
        sortBy = 'createdAt',
        sortOrder,
        withCount = false,
        withTags = true,
    }: {
        /**
         * Page number
         */
        page?: number,
        /**
         * Items per page
         */
        pageSize?: number,
        /**
         * Search query
         */
        search?: string,
        /**
         * Filter by status
         */
        status?: 'draft' | 'pending' | 'published' | 'archived',
        /**
         * Filter by author ID
         */
        authorId?: string,
        /**
         * Filter by tag ID
         */
        tagId?: string,
        /**
         * Filter from date (ISO string)
         */
        dateFrom?: string,
        /**
         * Filter to date (ISO string)
         */
        dateTo?: string,
        /**
         * Sort field
         */
        sortBy?: string,
        /**
         * Sort order
         */
        sortOrder?: 'ASC' | 'DESC',
        /**
         * Include total count
         */
        withCount?: boolean,
        /**
         * Include tags
         */
        withTags?: boolean,
    }): CancelablePromise<PaginatedArticleResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/cms/articles',
            query: {
                'page': page,
                'pageSize': pageSize,
                'search': search,
                'status': status,
                'authorId': authorId,
                'tagId': tagId,
                'dateFrom': dateFrom,
                'dateTo': dateTo,
                'sortBy': sortBy,
                'sortOrder': sortOrder,
                'withCount': withCount,
                'withTags': withTags,
            },
        });
    }
    /**
     * Get article by ID
     * @returns ArticleResponseDto Article retrieved successfully
     * @throws ApiError
     */
    public static cmsControllerFindArticleById({
        id,
        withTags,
    }: {
        /**
         * Article ID
         */
        id: string,
        /**
         * Include tags
         */
        withTags?: boolean,
    }): CancelablePromise<ArticleResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/cms/articles/{id}',
            path: {
                'id': id,
            },
            query: {
                'withTags': withTags,
            },
        });
    }
    /**
     * Update an article
     * @returns ArticleResponseDto Article updated successfully
     * @throws ApiError
     */
    public static cmsControllerUpdateArticle({
        id,
        requestBody,
    }: {
        /**
         * Article ID
         */
        id: string,
        requestBody: UpdateArticleDto,
    }): CancelablePromise<ArticleResponseDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/cms/articles/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Delete an article
     * @returns void
     * @throws ApiError
     */
    public static cmsControllerDeleteArticle({
        id,
    }: {
        /**
         * Article ID
         */
        id: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/cms/articles/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Get article by slug
     * @returns ArticleResponseDto Article retrieved successfully
     * @throws ApiError
     */
    public static cmsControllerFindArticleBySlug({
        slug,
        withTags,
    }: {
        /**
         * Article slug
         */
        slug: string,
        /**
         * Include tags
         */
        withTags?: boolean,
    }): CancelablePromise<ArticleResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/cms/articles/slug/{slug}',
            path: {
                'slug': slug,
            },
            query: {
                'withTags': withTags,
            },
        });
    }
    /**
     * Publish an article
     * @returns ArticleResponseDto Article published successfully
     * @throws ApiError
     */
    public static cmsControllerPublishArticle({
        id,
    }: {
        /**
         * Article ID
         */
        id: string,
    }): CancelablePromise<ArticleResponseDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/cms/articles/{id}/publish',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Unpublish an article
     * @returns ArticleResponseDto Article unpublished successfully
     * @throws ApiError
     */
    public static cmsControllerUnpublishArticle({
        id,
    }: {
        /**
         * Article ID
         */
        id: string,
    }): CancelablePromise<ArticleResponseDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/cms/articles/{id}/unpublish',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Archive an article
     * @returns ArticleResponseDto Article archived successfully
     * @throws ApiError
     */
    public static cmsControllerArchiveArticle({
        id,
    }: {
        /**
         * Article ID
         */
        id: string,
    }): CancelablePromise<ArticleResponseDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/cms/articles/{id}/archive',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Increment article view count
     * @returns void
     * @throws ApiError
     */
    public static cmsControllerIncrementViewCount({
        id,
    }: {
        /**
         * Article ID
         */
        id: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/cms/articles/{id}/view',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Bulk update article status
     * @returns void
     * @throws ApiError
     */
    public static cmsControllerBulkUpdateStatus({
        requestBody,
    }: {
        requestBody: {
            ids: Array<string>;
            status: 'draft' | 'pending' | 'published' | 'archived';
        },
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/cms/articles/bulk/status',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Bulk delete articles
     * @returns void
     * @throws ApiError
     */
    public static cmsControllerBulkDeleteArticles({
        requestBody,
    }: {
        requestBody: {
            ids: Array<string>;
        },
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/cms/articles/bulk',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Create a new tag
     * @returns TagResponseDto Tag created successfully
     * @throws ApiError
     */
    public static cmsControllerCreateTag({
        requestBody,
    }: {
        requestBody: CreateTagDto,
    }): CancelablePromise<TagResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/cms/tags',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get all tags
     * @returns TagResponseDto Tags retrieved successfully
     * @throws ApiError
     */
    public static cmsControllerFindAllTags({
        includeInactive,
    }: {
        /**
         * Include inactive tags
         */
        includeInactive?: boolean,
    }): CancelablePromise<Array<TagResponseDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/cms/tags',
            query: {
                'includeInactive': includeInactive,
            },
        });
    }
    /**
     * Get tags as hierarchical tree
     * @returns TagResponseDto Tag tree retrieved successfully
     * @throws ApiError
     */
    public static cmsControllerFindTagTree({
        includeInactive,
    }: {
        /**
         * Include inactive tags
         */
        includeInactive?: boolean,
    }): CancelablePromise<Array<TagResponseDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/cms/tags/tree',
            query: {
                'includeInactive': includeInactive,
            },
        });
    }
    /**
     * Get popular tags by usage
     * @returns any Popular tags retrieved successfully
     * @throws ApiError
     */
    public static cmsControllerGetPopularTags({
        limit,
    }: {
        /**
         * Number of tags to return
         */
        limit?: number,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/cms/tags/popular',
            query: {
                'limit': limit,
            },
        });
    }
    /**
     * Get tag by ID
     * @returns TagResponseDto Tag retrieved successfully
     * @throws ApiError
     */
    public static cmsControllerFindTagById({
        id,
    }: {
        /**
         * Tag ID
         */
        id: string,
    }): CancelablePromise<TagResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/cms/tags/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Update a tag
     * @returns TagResponseDto Tag updated successfully
     * @throws ApiError
     */
    public static cmsControllerUpdateTag({
        id,
        requestBody,
    }: {
        /**
         * Tag ID
         */
        id: string,
        requestBody: UpdateTagDto,
    }): CancelablePromise<TagResponseDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/cms/tags/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Delete a tag
     * @returns void
     * @throws ApiError
     */
    public static cmsControllerDeleteTag({
        id,
        deleteChildren,
    }: {
        /**
         * Tag ID
         */
        id: string,
        /**
         * Delete child tags
         */
        deleteChildren?: boolean,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/cms/tags/{id}',
            path: {
                'id': id,
            },
            query: {
                'deleteChildren': deleteChildren,
            },
        });
    }
    /**
     * Get tag usage statistics
     * @returns any Tag stats retrieved successfully
     * @throws ApiError
     */
    public static cmsControllerGetTagStats({
        id,
    }: {
        /**
         * Tag ID
         */
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/cms/tags/{id}/stats',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Get tag by slug
     * @returns TagResponseDto Tag retrieved successfully
     * @throws ApiError
     */
    public static cmsControllerFindTagBySlug({
        slug,
    }: {
        /**
         * Tag slug
         */
        slug: string,
    }): CancelablePromise<TagResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/cms/tags/slug/{slug}',
            path: {
                'slug': slug,
            },
        });
    }
    /**
     * Activate a tag
     * @returns TagResponseDto Tag activated successfully
     * @throws ApiError
     */
    public static cmsControllerActivateTag({
        id,
        includeChildren,
    }: {
        /**
         * Tag ID
         */
        id: string,
        /**
         * Include child tags
         */
        includeChildren?: boolean,
    }): CancelablePromise<TagResponseDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/cms/tags/{id}/activate',
            path: {
                'id': id,
            },
            query: {
                'includeChildren': includeChildren,
            },
        });
    }
    /**
     * Deactivate a tag
     * @returns TagResponseDto Tag deactivated successfully
     * @throws ApiError
     */
    public static cmsControllerDeactivateTag({
        id,
        includeChildren,
    }: {
        /**
         * Tag ID
         */
        id: string,
        /**
         * Include child tags
         */
        includeChildren?: boolean,
    }): CancelablePromise<TagResponseDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/cms/tags/{id}/deactivate',
            path: {
                'id': id,
            },
            query: {
                'includeChildren': includeChildren,
            },
        });
    }
    /**
     * Reorder tags
     * @returns void
     * @throws ApiError
     */
    public static cmsControllerReorderTags({
        requestBody,
    }: {
        requestBody: {
            tagOrders: Array<{
                id: string;
                sortOrder: number;
            }>;
        },
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/cms/tags/reorder',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
