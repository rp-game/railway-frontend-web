/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Order } from './Order';
import type { OrderMetaDto } from './OrderMetaDto';
export type OrderListResponseDto = {
    /**
     * List of orders
     */
    data: Array<Order>;
    /**
     * Pagination metadata
     */
    meta: OrderMetaDto;
};

