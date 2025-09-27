/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Decimal } from './Decimal';
import type { User } from './User';
import type { VendorContract } from './VendorContract';
import type { VendorLocation } from './VendorLocation';
import type { VendorPayoutSetting } from './VendorPayoutSetting';
export type Vendor = {
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
     * Vendor status
     */
    status: 'pending' | 'approved' | 'suspended' | 'rejected' | 'inactive';
    /**
     * Vendor type
     */
    vendorType: 'restaurant' | 'cafe' | 'fast_food' | 'beverage' | 'local_specialty' | 'retail' | 'catering' | 'train_service' | 'station_service';
    /**
     * Is vendor active
     */
    isActive: boolean;
    /**
     * Is vendor verified
     */
    isVerified: boolean;
    /**
     * Is vendor featured
     */
    isFeatured: boolean;
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
     * Province
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
     * Commission rate percentage
     */
    commissionRate: Decimal;
    /**
     * Total earnings amount
     */
    totalEarnings: Decimal;
    /**
     * Pending payout amount
     */
    pendingPayout: Decimal;
    /**
     * Total paid out amount
     */
    totalPaidOut: Decimal;
    /**
     * Preferred currency
     */
    preferredCurrency: string;
    /**
     * Business operating hours for each day of the week
     */
    businessHours?: Record<string, any>;
    /**
     * Average preparation time in minutes
     */
    averagePreparationTime: number;
    /**
     * Maximum daily order capacity
     */
    dailyOrderCapacity: number;
    /**
     * Whether vendor accepts online orders
     */
    acceptsOnlineOrders: boolean;
    /**
     * Whether vendor accepts advance orders
     */
    acceptsAdvanceOrders: boolean;
    /**
     * How many hours in advance orders can be placed
     */
    advanceOrderHours: number;
    /**
     * Logo image URL
     */
    logoUrl?: string;
    /**
     * Banner image URL
     */
    bannerImageUrl?: string;
    /**
     * Gallery image URLs
     */
    galleryImages?: Array<string>;
    /**
     * Primary brand color
     */
    primaryColor?: string;
    /**
     * Secondary brand color
     */
    secondaryColor?: string;
    /**
     * Average customer rating
     */
    averageRating: number;
    /**
     * Total number of reviews
     */
    totalReviews: number;
    /**
     * Total number of orders received
     */
    totalOrders: number;
    /**
     * Number of completed orders
     */
    completedOrders: number;
    /**
     * Number of cancelled orders
     */
    cancelledOrders: number;
    /**
     * Business certifications
     */
    certifications?: Array<string>;
    /**
     * Business licenses
     */
    licenses?: Array<string>;
    /**
     * Whether vendor has food safety certification
     */
    foodSafetyCertified: boolean;
    /**
     * Date of last health inspection
     */
    lastInspectionDate?: string;
    /**
     * Latest inspection score
     */
    inspectionScore?: string;
    /**
     * Notification preferences
     */
    notificationSettings?: Record<string, any>;
    /**
     * Special dietary and sourcing requirements
     */
    specialRequirements?: Record<string, any>;
    /**
     * Additional metadata and settings
     */
    metadata?: Record<string, any>;
    /**
     * Date when vendor was approved
     */
    approvedAt?: string;
    /**
     * Date when vendor was suspended
     */
    suspendedAt?: string;
    /**
     * Reason for suspension
     */
    suspensionReason?: string;
    /**
     * Last activity timestamp
     */
    lastActiveAt?: string;
    /**
     * Owner user ID
     */
    ownerId?: string;
    /**
     * Vendor owner details
     */
    owner?: User;
    /**
     * Vendor locations
     */
    locations?: Array<VendorLocation>;
    /**
     * Vendor contracts
     */
    contracts?: Array<VendorContract>;
    /**
     * Vendor payout settings
     */
    payoutSettings?: Array<VendorPayoutSetting>;
};

