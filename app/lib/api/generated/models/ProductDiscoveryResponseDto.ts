/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ProductDiscoveryResponseDto = {
    /**
     * Products available on the train
     */
    trainProducts: Array<Record<string, any>>;
    /**
     * Products available at upcoming stations
     */
    stationProducts: Array<Record<string, any>>;
    /**
     * Metadata about the search results
     */
    meta: {
        totalCount?: number;
        page?: number;
        pageSize?: number;
        vendors?: Array<Record<string, any>>;
    };
};

