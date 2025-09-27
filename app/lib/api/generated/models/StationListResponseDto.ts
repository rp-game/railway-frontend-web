/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { StationListMetaDto } from './StationListMetaDto';
import type { StationResponseDto } from './StationResponseDto';
export type StationListResponseDto = {
    /**
     * List of stations
     */
    data: Array<StationResponseDto>;
    /**
     * Pagination metadata
     */
    meta: StationListMetaDto;
};

