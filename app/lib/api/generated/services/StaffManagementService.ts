/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CheckInDto } from '../models/CheckInDto';
import type { CheckOutDto } from '../models/CheckOutDto';
import type { CreateVendorStaffDto } from '../models/CreateVendorStaffDto';
import type { QrDeliveryConfirmationDto } from '../models/QrDeliveryConfirmationDto';
import type { ShiftPerformanceDto } from '../models/ShiftPerformanceDto';
import type { ShiftReportDto } from '../models/ShiftReportDto';
import type { ShiftStatusDto } from '../models/ShiftStatusDto';
import type { StaffReassignmentDto } from '../models/StaffReassignmentDto';
import type { StaffScheduleDto } from '../models/StaffScheduleDto';
import type { TaskAssignmentDto } from '../models/TaskAssignmentDto';
import type { UpdateVendorStaffDto } from '../models/UpdateVendorStaffDto';
import type { VendorStaffResponseDto } from '../models/VendorStaffResponseDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class StaffManagementService {
    /**
     * Staff shift check-in (UC2.6)
     * Check in for work shift with location and device verification
     * @returns ShiftStatusDto Shift check-in successful
     * @throws ApiError
     */
    public static staffManagementControllerCheckInShift({
        requestBody,
    }: {
        requestBody: CheckInDto,
    }): CancelablePromise<ShiftStatusDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/staff/shifts/checkin',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid check-in data or shift not found`,
            },
        });
    }
    /**
     * Staff shift check-out (UC2.9)
     * Check out from work shift with performance summary
     * @returns ShiftStatusDto Shift check-out successful
     * @throws ApiError
     */
    public static staffManagementControllerCheckOutShift({
        requestBody,
    }: {
        requestBody: CheckOutDto,
    }): CancelablePromise<ShiftStatusDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/staff/shifts/checkout',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `No active shift found or invalid data`,
            },
        });
    }
    /**
     * Get current active shift
     * Get details of the current active shift for the staff member
     * @returns ShiftStatusDto Current shift details retrieved successfully
     * @throws ApiError
     */
    public static staffManagementControllerGetCurrentShift(): CancelablePromise<ShiftStatusDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/staff/shifts/current',
            errors: {
                404: `No active shift found`,
            },
        });
    }
    /**
     * Get shift history
     * Get historical shift data for the staff member
     * @returns any Shift history retrieved successfully
     * @throws ApiError
     */
    public static staffManagementControllerGetShiftHistory({
        limit,
        from,
        to,
    }: {
        /**
         * Number of shifts to return
         */
        limit?: number,
        /**
         * Start date (ISO string)
         */
        from?: string,
        /**
         * End date (ISO string)
         */
        to?: string,
    }): CancelablePromise<{
        shifts?: Array<ShiftStatusDto>;
        totalShifts?: number;
        totalHours?: number;
        avgPerformance?: number;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/staff/shifts/history',
            query: {
                'limit': limit,
                'from': from,
                'to': to,
            },
        });
    }
    /**
     * Submit shift performance report (UC2.9)
     * Submit detailed shift performance report with metrics and issues
     * @returns any Shift report submitted successfully
     * @throws ApiError
     */
    public static staffManagementControllerSubmitShiftReport({
        shiftId,
        requestBody,
    }: {
        /**
         * Shift ID to report on
         */
        shiftId: string,
        requestBody: ShiftReportDto,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/staff/shifts/{shiftId}/report',
            path: {
                'shiftId': shiftId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `Shift not found or not authorized`,
            },
        });
    }
    /**
     * Get staff performance summary (UC2.9)
     * Get comprehensive performance summary for the staff member
     * @returns ShiftPerformanceDto Performance summary retrieved successfully
     * @throws ApiError
     */
    public static staffManagementControllerGetPerformanceSummary({
        period,
    }: {
        /**
         * Performance period
         */
        period?: 'week' | 'month' | 'quarter',
    }): CancelablePromise<ShiftPerformanceDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/staff/performance/summary',
            query: {
                'period': period,
            },
        });
    }
    /**
     * Get detailed performance analytics
     * Get detailed analytics including trends and comparisons
     * @returns any Performance analytics retrieved successfully
     * @throws ApiError
     */
    public static staffManagementControllerGetPerformanceAnalytics({
        breakdown,
        period,
    }: {
        /**
         * Performance breakdown type
         */
        breakdown?: string,
        /**
         * Analysis period
         */
        period?: any,
    }): CancelablePromise<{
        metrics?: Record<string, any>;
        trends?: any[];
        comparisons?: Record<string, any>;
        recommendations?: any[];
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/staff/performance/analytics',
            query: {
                'breakdown': breakdown,
                'period': period,
            },
        });
    }
    /**
     * Get assigned tasks for current shift
     * Get all tasks assigned to the staff member for the current shift
     * @returns any Assigned tasks retrieved successfully
     * @throws ApiError
     */
    public static staffManagementControllerGetAssignedTasks({
        status,
    }: {
        /**
         * Task status filter
         */
        status?: 'pending' | 'in_progress' | 'completed',
    }): CancelablePromise<{
        tasks?: Array<{
            id?: string;
            type?: string;
            priority?: string;
            description?: string;
            status?: string;
            assignedAt?: string;
            dueAt?: string;
            location?: string;
            metadata?: Record<string, any>;
        }>;
        totalTasks?: number;
        completedTasks?: number;
        pendingTasks?: number;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/staff/tasks/assigned',
            query: {
                'status': status,
            },
        });
    }
    /**
     * Update task status
     * Update the status of an assigned task with optional notes
     * @returns any Task status updated successfully
     * @throws ApiError
     */
    public static staffManagementControllerUpdateTaskStatus({
        taskId,
    }: {
        /**
         * Task ID to update
         */
        taskId: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/staff/tasks/{taskId}/status',
            path: {
                'taskId': taskId,
            },
        });
    }
    /**
     * Confirm delivery with QR code scan (UC2.6)
     * Confirm order delivery by scanning customer QR code
     * @returns any Delivery confirmed successfully
     * @throws ApiError
     */
    public static staffManagementControllerConfirmDeliveryWithQr({
        deliveryId,
        requestBody,
    }: {
        /**
         * Delivery ID to confirm
         */
        deliveryId: string,
        requestBody: QrDeliveryConfirmationDto,
    }): CancelablePromise<{
        success?: boolean;
        deliveryId?: string;
        confirmedAt?: string;
        customerVerified?: boolean;
        location?: string;
        photoEvidence?: Array<string>;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/staff/delivery/{deliveryId}/confirm-qr',
            path: {
                'deliveryId': deliveryId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid QR code or delivery not found`,
            },
        });
    }
    /**
     * Get pending deliveries assigned to staff
     * Get all pending delivery tasks assigned to the current staff member
     * @returns any Pending deliveries retrieved successfully
     * @throws ApiError
     */
    public static staffManagementControllerGetPendingDeliveries({
        location,
        priority,
    }: {
        /**
         * Filter by delivery location
         */
        location?: string,
        /**
         * Filter by priority
         */
        priority?: 'low' | 'medium' | 'high' | 'urgent',
    }): CancelablePromise<{
        deliveries?: Array<{
            id?: string;
            orderId?: string;
            customerName?: string;
            customerPhone?: string;
            deliveryLocation?: string;
            priority?: string;
            estimatedDeliveryTime?: string;
            items?: any[];
            specialInstructions?: string;
        }>;
        totalDeliveries?: number;
        urgentCount?: number;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/staff/delivery/pending',
            query: {
                'location': location,
                'priority': priority,
            },
        });
    }
    /**
     * Get staff schedule
     * Get work schedule for the staff member or team (admin view)
     * @returns StaffScheduleDto Schedule retrieved successfully
     * @throws ApiError
     */
    public static staffManagementControllerGetSchedule({
        staffId,
        view,
        period,
    }: {
        /**
         * Specific staff member (admin only)
         */
        staffId?: string,
        /**
         * Schedule view type
         */
        view?: 'personal' | 'team',
        /**
         * Schedule period
         */
        period?: 'week' | 'month',
    }): CancelablePromise<StaffScheduleDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/staff/schedule',
            query: {
                'staffId': staffId,
                'view': view,
                'period': period,
            },
        });
    }
    /**
     * Update staff availability
     * Update personal availability preferences and constraints
     * @returns any Availability updated successfully
     * @throws ApiError
     */
    public static staffManagementControllerUpdateAvailability(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/staff/schedule/availability',
        });
    }
    /**
     * Get team performance metrics (Admin)
     * Get performance metrics for the entire staff team or department
     * @returns any Team performance metrics retrieved successfully
     * @throws ApiError
     */
    public static staffManagementControllerGetTeamPerformance({
        department,
        location,
        period,
    }: {
        /**
         * Filter by department
         */
        department?: string,
        /**
         * Filter by location/station
         */
        location?: string,
        /**
         * Performance period
         */
        period?: any,
    }): CancelablePromise<{
        teamMetrics?: {
            totalStaff?: number;
            activeStaff?: number;
            avgPerformanceScore?: number;
            totalHoursWorked?: number;
            attendanceRate?: number;
        };
        departmentBreakdown?: any[];
        topPerformers?: any[];
        improvementAreas?: any[];
        recommendations?: any[];
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/staff/team/performance',
            query: {
                'department': department,
                'location': location,
                'period': period,
            },
        });
    }
    /**
     * Assign tasks to staff members (Admin)
     * Assign delivery or operational tasks to specific staff members
     * @returns any Tasks assigned successfully
     * @throws ApiError
     */
    public static staffManagementControllerAssignTasksToStaff({
        requestBody,
    }: {
        requestBody: TaskAssignmentDto,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/staff/team/assignment',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Send emergency alert
     * Send emergency alert to supervisors and relevant staff
     * @returns any Emergency alert sent successfully
     * @throws ApiError
     */
    public static staffManagementControllerSendEmergencyAlert(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/staff/emergency/alert',
        });
    }
    /**
     * Get urgent notifications
     * Get urgent notifications and alerts for the staff member
     * @returns any Urgent notifications retrieved successfully
     * @throws ApiError
     */
    public static staffManagementControllerGetUrgentNotifications(): CancelablePromise<{
        alerts?: any[];
        announcements?: any[];
        taskUpdates?: any[];
        systemMessages?: any[];
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/staff/notifications/urgent',
        });
    }
    /**
     * Get vendor staff list
     * Get all staff members for a specific vendor
     * @returns VendorStaffResponseDto Vendor staff list retrieved successfully
     * @throws ApiError
     */
    public static staffManagementControllerGetVendorStaff({
        vendorId,
        role,
        department,
        isActive,
    }: {
        /**
         * Vendor ID
         */
        vendorId: string,
        /**
         * Filter by staff role
         */
        role?: string,
        /**
         * Filter by department
         */
        department?: string,
        /**
         * Filter by active status
         */
        isActive?: boolean,
    }): CancelablePromise<Array<VendorStaffResponseDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/staff/vendor/{vendorId}',
            path: {
                'vendorId': vendorId,
            },
            query: {
                'role': role,
                'department': department,
                'isActive': isActive,
            },
        });
    }
    /**
     * Add vendor staff member
     * Add a new staff member to a vendor
     * @returns VendorStaffResponseDto Staff member added successfully
     * @throws ApiError
     */
    public static staffManagementControllerAddVendorStaff({
        vendorId,
        requestBody,
    }: {
        /**
         * Vendor ID
         */
        vendorId: string,
        requestBody: CreateVendorStaffDto,
    }): CancelablePromise<VendorStaffResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/staff/vendor/{vendorId}',
            path: {
                'vendorId': vendorId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid staff data or email already exists`,
            },
        });
    }
    /**
     * Update staff member details
     * Update details of an existing staff member
     * @returns VendorStaffResponseDto Staff member updated successfully
     * @throws ApiError
     */
    public static staffManagementControllerUpdateVendorStaff({
        staffId,
        requestBody,
    }: {
        /**
         * Staff member ID
         */
        staffId: string,
        requestBody: UpdateVendorStaffDto,
    }): CancelablePromise<VendorStaffResponseDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/staff/{staffId}',
            path: {
                'staffId': staffId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `Staff member not found`,
            },
        });
    }
    /**
     * Remove staff member
     * Remove a staff member from the vendor (soft delete)
     * @returns any Staff member removed successfully
     * @throws ApiError
     */
    public static staffManagementControllerRemoveVendorStaff({
        staffId,
    }: {
        /**
         * Staff member ID
         */
        staffId: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/staff/{staffId}',
            path: {
                'staffId': staffId,
            },
            errors: {
                404: `Staff member not found`,
            },
        });
    }
    /**
     * Update staff role/permissions
     * Update role and permissions for a staff member
     * @returns VendorStaffResponseDto Staff role updated successfully
     * @throws ApiError
     */
    public static staffManagementControllerUpdateStaffRole({
        staffId,
        requestBody,
    }: {
        /**
         * Staff member ID
         */
        staffId: string,
        requestBody: {
            role: 'vendor_staff' | 'vendor_admin' | 'cashier';
            permissions?: Array<string>;
        },
    }): CancelablePromise<VendorStaffResponseDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/staff/{staffId}/role',
            path: {
                'staffId': staffId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Reassign staff member to different vendor
     * @returns any Staff reassigned successfully
     * @throws ApiError
     */
    public static staffManagementControllerReassignStaff({
        requestBody,
    }: {
        /**
         * Staff reassignment data
         */
        requestBody: StaffReassignmentDto,
    }): CancelablePromise<{
        success?: boolean;
        message?: string;
        data?: {
            staffId?: string;
            previousVendorId?: string | null;
            newVendorId?: string | null;
            reassignedAt?: string;
        };
    }> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/staff/reassign',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                403: `Insufficient permissions`,
                404: `Staff member or vendor not found`,
            },
        });
    }
    /**
     * Get all staff assignments
     * @returns any Staff assignments retrieved successfully
     * @throws ApiError
     */
    public static staffManagementControllerGetStaffAssignments(): CancelablePromise<{
        success?: boolean;
        data?: Array<{
            staffId?: string;
            staffName?: string;
            vendorId?: string | null;
            vendorName?: string | null;
            trainCode?: string | null;
            assignedAt?: string;
        }>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/staff/assignments',
        });
    }
}
