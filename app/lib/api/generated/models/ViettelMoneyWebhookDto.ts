/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ViettelMoneyWebhookDto = {
    merchant_id: string;
    transaction_id: string;
    order_id: string;
    amount: string;
    status: string;
    timestamp: string;
    signature: string;
    message?: string;
    data?: Record<string, any>;
};

