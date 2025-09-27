/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BusinessHoursDto } from './BusinessHoursDto';
import type { CertificationDto } from './CertificationDto';
import type { LicenseDto } from './LicenseDto';
import type { NotificationSettingsDto } from './NotificationSettingsDto';
import type { SpecialRequirementsDto } from './SpecialRequirementsDto';
export type UpdateVendorDto = {
    businessName?: string;
    displayName?: string;
    description?: string;
    vendorType?: 'restaurant' | 'cafe' | 'fast_food' | 'beverage' | 'local_specialty' | 'retail' | 'catering' | 'train_service' | 'station_service';
    contactPersonName?: string;
    contactPhone?: string;
    contactEmail?: string;
    emergencyPhone?: string;
    businessAddress?: string;
    city?: string;
    province?: string;
    postalCode?: string;
    country?: string;
    businessHours?: BusinessHoursDto;
    averagePreparationTime?: number;
    dailyOrderCapacity?: number;
    acceptsOnlineOrders?: boolean;
    acceptsAdvanceOrders?: boolean;
    advanceOrderHours?: number;
    logoUrl?: string;
    bannerImageUrl?: string;
    galleryImages?: Array<string>;
    primaryColor?: string;
    secondaryColor?: string;
    certifications?: Array<CertificationDto>;
    licenses?: Array<LicenseDto>;
    foodSafetyCertified?: boolean;
    lastInspectionDate?: string;
    inspectionScore?: string;
    notificationSettings?: NotificationSettingsDto;
    specialRequirements?: SpecialRequirementsDto;
};

