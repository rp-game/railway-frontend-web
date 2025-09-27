/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateFaqDto } from '../models/CreateFaqDto';
import type { CreateSupportTicketDto } from '../models/CreateSupportTicketDto';
import type { Faq } from '../models/Faq';
import type { SupportTicket } from '../models/SupportTicket';
import type { UpdateFaqDto } from '../models/UpdateFaqDto';
import type { UpdateSupportTicketDto } from '../models/UpdateSupportTicketDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SupportService {
    /**
     * Create a new support ticket
     * @returns SupportTicket The ticket has been successfully created.
     * @throws ApiError
     */
    public static supportControllerCreate({
        requestBody,
    }: {
        requestBody: CreateSupportTicketDto,
    }): CancelablePromise<SupportTicket> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/support',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get all support tickets
     * @returns any Return support tickets with pagination.
     * @throws ApiError
     */
    public static supportControllerFindAll({
        page,
        pageSize,
        withCount,
        status,
    }: {
        /**
         * Page number (starts from 1)
         */
        page?: number,
        /**
         * Number of items per page
         */
        pageSize?: number,
        /**
         * Include total count (0=no, 1=yes)
         */
        withCount?: 0 | 1,
        /**
         * Filter by ticket status
         */
        status?: 'open' | 'in_progress' | 'resolved' | 'closed',
    }): CancelablePromise<{
        data?: Array<SupportTicket>;
        meta?: {
            /**
             * Total count (only when withCount=1)
             */
            total?: number;
            page?: number;
            pageSize?: number;
            filter?: Record<string, any>;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/support',
            query: {
                'page': page,
                'pageSize': pageSize,
                'withCount': withCount,
                'status': status,
            },
        });
    }
    /**
     * Create a new FAQ
     * @returns Faq The FAQ has been successfully created.
     * @throws ApiError
     */
    public static supportControllerCreateFaq({
        requestBody,
    }: {
        requestBody: CreateFaqDto,
    }): CancelablePromise<Faq> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/support/faqs',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get all FAQs with filtering and pagination
     * @returns any Return paginated FAQs.
     * @throws ApiError
     */
    public static supportControllerFindAllFaqs({
        search,
        category,
        status,
        tags,
        page = 1,
        limit = 20,
        sortBy = 'sortOrder',
        sortOrder = 'ASC',
    }: {
        /**
         * Search query for question or answer
         */
        search?: string,
        /**
         * Filter by category
         */
        category?: 'general' | 'booking' | 'payment' | 'food_ordering' | 'delivery' | 'account' | 'technical',
        /**
         * Filter by status
         */
        status?: 'draft' | 'published' | 'archived',
        /**
         * Filter by tags (comma-separated)
         */
        tags?: string,
        /**
         * Page number
         */
        page?: number,
        /**
         * Items per page
         */
        limit?: number,
        /**
         * Sort field
         */
        sortBy?: string,
        /**
         * Sort order
         */
        sortOrder?: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/support/faqs',
            query: {
                'search': search,
                'category': category,
                'status': status,
                'tags': tags,
                'page': page,
                'limit': limit,
                'sortBy': sortBy,
                'sortOrder': sortOrder,
            },
        });
    }
    /**
     * Get published FAQs only
     * @returns Faq Return published FAQs.
     * @throws ApiError
     */
    public static supportControllerFindPublishedFaqs(): CancelablePromise<Array<Faq>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/support/faqs/published',
        });
    }
    /**
     * Get FAQ categories with counts
     * @returns any Return FAQ categories with counts.
     * @throws ApiError
     */
    public static supportControllerGetFaqCategories(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/support/faqs/categories',
        });
    }
    /**
     * Search FAQs by term
     * @returns Faq Return matching FAQs.
     * @throws ApiError
     */
    public static supportControllerSearchFaqs({
        searchTerm,
    }: {
        searchTerm: string,
    }): CancelablePromise<Array<Faq>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/support/faqs/search/{searchTerm}',
            path: {
                'searchTerm': searchTerm,
            },
        });
    }
    /**
     * Get FAQs by category
     * @returns Faq Return FAQs in category.
     * @throws ApiError
     */
    public static supportControllerFindFaqsByCategory(): CancelablePromise<Array<Faq>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/support/faqs/category/{category}',
        });
    }
    /**
     * Get FAQ by ID
     * @returns Faq Return FAQ details.
     * @throws ApiError
     */
    public static supportControllerFindFaqById({
        id,
    }: {
        id: string,
    }): CancelablePromise<Faq> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/support/faqs/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `FAQ not found.`,
            },
        });
    }
    /**
     * Update an FAQ
     * @returns Faq The FAQ has been successfully updated.
     * @throws ApiError
     */
    public static supportControllerUpdateFaq({
        id,
        requestBody,
    }: {
        id: string,
        requestBody: UpdateFaqDto,
    }): CancelablePromise<Faq> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/v1/support/faqs/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `FAQ not found.`,
            },
        });
    }
    /**
     * Delete an FAQ
     * @returns any The FAQ has been successfully deleted.
     * @throws ApiError
     */
    public static supportControllerDeleteFaq({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/support/faqs/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `FAQ not found.`,
            },
        });
    }
    /**
     * Increment FAQ view count
     * @returns any View count incremented.
     * @throws ApiError
     */
    public static supportControllerIncrementFaqViewCount({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/v1/support/faqs/{id}/view',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Mark FAQ as helpful
     * @returns any FAQ marked as helpful.
     * @throws ApiError
     */
    public static supportControllerMarkFaqAsHelpful({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/v1/support/faqs/{id}/helpful',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Mark FAQ as not helpful
     * @returns any FAQ marked as not helpful.
     * @throws ApiError
     */
    public static supportControllerMarkFaqAsNotHelpful({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/v1/support/faqs/{id}/not-helpful',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Publish an FAQ
     * @returns Faq FAQ published successfully.
     * @throws ApiError
     */
    public static supportControllerPublishFaq({
        id,
    }: {
        id: string,
    }): CancelablePromise<Faq> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/v1/support/faqs/{id}/publish',
            path: {
                'id': id,
            },
            errors: {
                404: `FAQ not found.`,
            },
        });
    }
    /**
     * Archive an FAQ
     * @returns Faq FAQ archived successfully.
     * @throws ApiError
     */
    public static supportControllerArchiveFaq({
        id,
    }: {
        id: string,
    }): CancelablePromise<Faq> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/v1/support/faqs/{id}/archive',
            path: {
                'id': id,
            },
            errors: {
                404: `FAQ not found.`,
            },
        });
    }
    /**
     * Get ticket by ticket number
     * @returns SupportTicket Return ticket details.
     * @throws ApiError
     */
    public static supportControllerFindByTicketNumber({
        ticketNumber,
    }: {
        ticketNumber: string,
    }): CancelablePromise<SupportTicket> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/support/ticket/{ticketNumber}',
            path: {
                'ticketNumber': ticketNumber,
            },
            errors: {
                404: `Ticket not found.`,
            },
        });
    }
    /**
     * Get tickets by user ID
     * @returns SupportTicket Return user tickets.
     * @throws ApiError
     */
    public static supportControllerFindByUserId({
        userId,
    }: {
        userId: string,
    }): CancelablePromise<Array<SupportTicket>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/support/user/{userId}',
            path: {
                'userId': userId,
            },
        });
    }
    /**
     * Update a support ticket
     * @returns SupportTicket The ticket has been successfully updated.
     * @throws ApiError
     */
    public static supportControllerUpdate({
        id,
        requestBody,
    }: {
        id: string,
        requestBody: UpdateSupportTicketDto,
    }): CancelablePromise<SupportTicket> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/v1/support/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `Ticket not found.`,
            },
        });
    }
    /**
     * Delete a support ticket
     * @returns any The ticket has been successfully deleted.
     * @throws ApiError
     */
    public static supportControllerRemove({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/support/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Ticket not found.`,
            },
        });
    }
    /**
     * Get a support ticket by ID
     * @returns SupportTicket Return a support ticket.
     * @throws ApiError
     */
    public static supportControllerFindOne({
        id,
    }: {
        id: string,
    }): CancelablePromise<SupportTicket> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/support/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Ticket not found.`,
            },
        });
    }
}
