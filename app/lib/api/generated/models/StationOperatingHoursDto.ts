/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OperatingHoursDto } from './OperatingHoursDto';
export type StationOperatingHoursDto = {
    /**
     * Weekday hours
     */
    weekday?: OperatingHoursDto;
    /**
     * Weekend hours
     */
    weekend?: OperatingHoursDto;
    /**
     * Holiday hours
     */
    holiday?: OperatingHoursDto;
};

