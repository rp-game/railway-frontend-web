/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DayHoursDto } from './DayHoursDto';
import type { SpecialHoursDto } from './SpecialHoursDto';
export type BusinessHoursDto = {
    monday?: DayHoursDto;
    tuesday?: DayHoursDto;
    wednesday?: DayHoursDto;
    thursday?: DayHoursDto;
    friday?: DayHoursDto;
    saturday?: DayHoursDto;
    sunday?: DayHoursDto;
    specialHours?: Array<SpecialHoursDto>;
};

