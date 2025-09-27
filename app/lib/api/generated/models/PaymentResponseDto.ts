/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type PaymentResponseDto = {
    /**
     * Payment ID
     */
    id: string;
    /**
     * Order ID
     */
    orderId: string;
    /**
     * Payment method used
     */
    paymentMethod: 'vnpay' | 'zalopay' | 'momo' | 'viettel_money' | 'bank_transfer' | 'bank_card' | 'credit_card' | 'debit_card' | 'qr_banking' | 'qr_code' | 'cash';
    /**
     * Payment amount
     */
    amount: string;
    /**
     * Currency code
     */
    currency: string;
    /**
     * Payment status
     */
    status: 'pending' | 'completed' | 'partial' | 'failed' | 'expired' | 'cancelled' | 'processing' | 'refunded';
    /**
     * Transaction ID from payment gateway
     */
    transactionId: string;
    /**
     * Gateway transaction ID
     */
    gatewayTransactionId?: string;
    /**
     * Payment URL for redirection
     */
    paymentUrl?: string;
    /**
     * QR code data for payment
     */
    qrCodeData?: string;
    /**
     * QR code image URL
     */
    qrCodeUrl?: string;
    /**
     * Payment creation timestamp
     */
    createdAt: string;
    /**
     * Payment completion timestamp
     */
    completedAt?: string;
    /**
     * Payment expiration timestamp
     */
    expiresAt?: string;
};

