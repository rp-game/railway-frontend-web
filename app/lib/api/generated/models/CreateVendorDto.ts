/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BusinessHoursDto } from './BusinessHoursDto';
import type { CertificationDto } from './CertificationDto';
import type { LicenseDto } from './LicenseDto';
import type { NotificationSettingsDto } from './NotificationSettingsDto';
import type { SpecialRequirementsDto } from './SpecialRequirementsDto';
export type CreateVendorDto = {
    /**
     * Business name
     */
    businessName: string;
    /**
     * Display name shown to customers
     */
    displayName?: string;
    /**
     * Business description
     */
    description?: string;
    /**
     * Business registration number
     */
    businessRegistrationNumber: string;
    /**
     * Tax ID number
     */
    taxIdNumber?: string;
    /**
     * Vendor type
     */
    vendorType: 'restaurant' | 'cafe' | 'fast_food' | 'beverage' | 'local_specialty' | 'retail' | 'catering' | 'train_service' | 'station_service';
    /**
     * Contact person name
     */
    contactPersonName: string;
    /**
     * Contact phone number
     */
    contactPhone: string;
    /**
     * Contact email
     */
    contactEmail: string;
    /**
     * Emergency phone number
     */
    emergencyPhone?: string;
    /**
     * Business address
     */
    businessAddress: string;
    /**
     * City
     */
    city?: string;
    /**
     * Province/State
     */
    province?: string;
    /**
     * Postal code
     */
    postalCode?: string;
    /**
     * Country
     */
    country: string;
    /**
     * Owner user ID
     */
    ownerId?: string;
    /**
     * Business hours
     */
    businessHours?: BusinessHoursDto;
    /**
     * Average preparation time in minutes
     */
    averagePreparationTime?: number;
    /**
     * Daily order capacity
     */
    dailyOrderCapacity?: number;
    /**
     * Logo URL
     */
    logoUrl?: string;
    /**
     * Banner image URL
     */
    bannerImageUrl?: string;
    /**
     * Gallery images
     */
    galleryImages?: Array<string>;
    /**
     * Primary brand color
     */
    primaryColor?: string;
    /**
     * Certifications
     */
    certifications?: Array<CertificationDto>;
    /**
     * Business licenses
     */
    licenses?: Array<LicenseDto>;
    /**
     * Food safety certified
     */
    foodSafetyCertified?: boolean;
    /**
     * Notification settings
     */
    notificationSettings?: NotificationSettingsDto;
    /**
     * Special requirements
     */
    specialRequirements?: SpecialRequirementsDto;
};

