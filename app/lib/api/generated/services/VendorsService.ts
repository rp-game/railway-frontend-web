/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateVendorDto } from '../models/CreateVendorDto';
import type { UpdateVendorDto } from '../models/UpdateVendorDto';
import type { Vendor } from '../models/Vendor';
import type { VendorContract } from '../models/VendorContract';
import type { VendorLocation } from '../models/VendorLocation';
import type { VendorPayoutSetting } from '../models/VendorPayoutSetting';
import type { VendorStatusUpdateDto } from '../models/VendorStatusUpdateDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class VendorsService {
    /**
     * Get all vendors
     * @returns Vendor Return all vendors.
     * @throws ApiError
     */
    public static vendorsControllerFindAll({
        status,
        type,
        search,
    }: {
        /**
         * Filter by vendor status
         */
        status?: string,
        /**
         * Filter by vendor type
         */
        type?: string,
        /**
         * Search by business name
         */
        search?: string,
    }): CancelablePromise<Array<Vendor>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/vendors',
            query: {
                'status': status,
                'type': type,
                'search': search,
            },
        });
    }
    /**
     * Create a new vendor
     * @returns Vendor The vendor has been successfully created.
     * @throws ApiError
     */
    public static vendorsControllerCreate({
        requestBody,
    }: {
        requestBody: CreateVendorDto,
    }): CancelablePromise<Vendor> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/vendors',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get a vendor by id
     * @returns Vendor Return a vendor.
     * @throws ApiError
     */
    public static vendorsControllerFindOne({
        id,
    }: {
        id: string,
    }): CancelablePromise<Vendor> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/vendors/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Vendor not found.`,
            },
        });
    }
    /**
     * Update a vendor
     * @returns Vendor The vendor has been successfully updated.
     * @throws ApiError
     */
    public static vendorsControllerUpdate({
        id,
        requestBody,
    }: {
        id: string,
        requestBody: UpdateVendorDto,
    }): CancelablePromise<Vendor> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/v1/vendors/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `Vendor not found.`,
            },
        });
    }
    /**
     * Delete a vendor
     * @returns any The vendor has been successfully deleted.
     * @throws ApiError
     */
    public static vendorsControllerRemove({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/vendors/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Vendor not found.`,
            },
        });
    }
    /**
     * Get vendor locations
     * @returns VendorLocation Return vendor locations.
     * @throws ApiError
     */
    public static vendorsControllerFindVendorLocations({
        id,
    }: {
        id: string,
    }): CancelablePromise<Array<VendorLocation>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/vendors/{id}/locations',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Get vendor contracts
     * @returns VendorContract Return vendor contracts.
     * @throws ApiError
     */
    public static vendorsControllerFindVendorContracts({
        id,
    }: {
        id: string,
    }): CancelablePromise<Array<VendorContract>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/vendors/{id}/contracts',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Get vendor payout settings
     * @returns VendorPayoutSetting Return vendor payout settings.
     * @throws ApiError
     */
    public static vendorsControllerFindVendorPayoutSettings({
        id,
    }: {
        id: string,
    }): CancelablePromise<Array<VendorPayoutSetting>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/vendors/{id}/payout-settings',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Update vendor status
     * @returns Vendor Vendor status updated successfully.
     * @throws ApiError
     */
    public static vendorsControllerUpdateStatus({
        id,
        requestBody,
    }: {
        id: string,
        requestBody: VendorStatusUpdateDto,
    }): CancelablePromise<Vendor> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/v1/vendors/{id}/status',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `Vendor not found.`,
            },
        });
    }
}
