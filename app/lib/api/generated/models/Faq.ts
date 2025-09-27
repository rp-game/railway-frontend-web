/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Faq = {
    id: string;
    question: string;
    answer: string;
    category: 'general' | 'booking' | 'payment' | 'food_ordering' | 'delivery' | 'account' | 'technical';
    status: 'draft' | 'published' | 'archived';
    viewCount: number;
    helpfulCount: number;
    notHelpfulCount: number;
    sortOrder: number;
    tags: string;
    createdBy: string;
    updatedBy: string;
    createdAt: string;
    updatedAt: string;
};

