/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type UpdateSupportTicketDto = {
    userId?: string;
    subject?: string;
    description?: string;
    category?: 'order_issue' | 'payment_issue' | 'delivery_issue' | 'account_issue' | 'technical_issue' | 'feedback' | 'other';
    priority?: 'low' | 'medium' | 'high' | 'urgent';
    contactEmail?: string;
    contactPhone?: string;
    status?: 'open' | 'in_progress' | 'resolved' | 'closed';
    assignedTo?: string;
    resolution?: string;
    resolvedAt?: string;
};

