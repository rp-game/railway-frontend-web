/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CustomizationChoiceDto } from './CustomizationChoiceDto';
export type CustomizationOptionDto = {
    name: string;
    type: 'select' | 'multiselect' | 'text' | 'number';
    required: boolean;
    choices?: Array<CustomizationChoiceDto>;
};

