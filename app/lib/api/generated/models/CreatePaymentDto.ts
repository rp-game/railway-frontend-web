/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CreatePaymentDto = {
    /**
     * Order ID to create payment for
     */
    orderId: string;
    /**
     * Payment method
     */
    paymentMethod: 'vnpay' | 'zalopay' | 'momo' | 'viettel_money' | 'bank_transfer' | 'bank_card' | 'credit_card' | 'debit_card' | 'qr_banking' | 'qr_code' | 'cash';
    /**
     * Payment amount as string (for precision)
     */
    amount: string;
    /**
     * Currency code
     */
    currency?: string;
    /**
     * Return URL after payment completion
     */
    returnUrl?: string;
    /**
     * Cancel URL if payment is cancelled
     */
    cancelUrl?: string;
    /**
     * Payment description
     */
    description?: string;
    /**
     * Additional payment metadata
     */
    metadata?: Record<string, any>;
};

