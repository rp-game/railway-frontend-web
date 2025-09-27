/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AuthResponseDto } from '../models/AuthResponseDto';
import type { ChangePasswordDto } from '../models/ChangePasswordDto';
import type { ForgotPasswordDto } from '../models/ForgotPasswordDto';
import type { LoginDto } from '../models/LoginDto';
import type { LogoutDto } from '../models/LogoutDto';
import type { OtpResponseDto } from '../models/OtpResponseDto';
import type { PasswordLoginDto } from '../models/PasswordLoginDto';
import type { RefreshTokenDto } from '../models/RefreshTokenDto';
import type { RegisterDto } from '../models/RegisterDto';
import type { ResetPasswordDto } from '../models/ResetPasswordDto';
import type { VerifyOtpDto } from '../models/VerifyOtpDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuthenticationService {
    /**
     * Request OTP for login
     * Send OTP to phone number for login authentication
     * @returns OtpResponseDto OTP sent successfully
     * @throws ApiError
     */
    public static authControllerRequestLoginOtp({
        requestBody,
    }: {
        requestBody: LoginDto,
    }): CancelablePromise<OtpResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/auth/login/request-otp',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `User not found or account inactive`,
            },
        });
    }
    /**
     * Verify OTP and login
     * Verify OTP code and complete login process
     * @returns AuthResponseDto Login successful
     * @throws ApiError
     */
    public static authControllerVerifyLoginOtp({
        requestBody,
    }: {
        requestBody: VerifyOtpDto,
    }): CancelablePromise<AuthResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/auth/login/verify-otp',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Invalid OTP or user not found`,
            },
        });
    }
    /**
     * Login with password
     * Login using phone number and password
     * @returns AuthResponseDto Login successful
     * @throws ApiError
     */
    public static authControllerLoginWithPassword({
        requestBody,
    }: {
        requestBody: PasswordLoginDto,
    }): CancelablePromise<AuthResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/auth/login/password',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Invalid credentials`,
            },
        });
    }
    /**
     * Request OTP for registration
     * Send OTP to phone number for user registration
     * @returns OtpResponseDto Registration OTP sent successfully
     * @throws ApiError
     */
    public static authControllerRegister({
        requestBody,
    }: {
        requestBody: RegisterDto,
    }): CancelablePromise<OtpResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/auth/register',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                409: `User already exists`,
            },
        });
    }
    /**
     * Verify registration OTP and create account
     * Verify OTP code and complete user registration
     * @returns AuthResponseDto Registration successful
     * @throws ApiError
     */
    public static authControllerVerifyRegistrationOtp({
        requestBody,
    }: {
        requestBody: VerifyOtpDto,
    }): CancelablePromise<AuthResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/auth/register/verify-otp',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Invalid OTP`,
            },
        });
    }
    /**
     * Refresh access token
     * Get new access token using refresh token
     * @returns AuthResponseDto Token refreshed successfully
     * @throws ApiError
     */
    public static authControllerRefreshToken({
        requestBody,
    }: {
        requestBody: RefreshTokenDto,
    }): CancelablePromise<AuthResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/auth/refresh',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Invalid or expired refresh token`,
            },
        });
    }
    /**
     * Logout user
     * Logout user and invalidate tokens
     * @returns any Logout successful
     * @throws ApiError
     */
    public static authControllerLogout({
        requestBody,
    }: {
        requestBody: LogoutDto,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/auth/logout',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
            },
        });
    }
    /**
     * Request password reset OTP
     * Send OTP for password reset
     * @returns OtpResponseDto Password reset OTP sent
     * @throws ApiError
     */
    public static authControllerForgotPassword({
        requestBody,
    }: {
        requestBody: ForgotPasswordDto,
    }): CancelablePromise<OtpResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/auth/forgot-password',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `User not found or account inactive`,
            },
        });
    }
    /**
     * Reset password with OTP
     * Reset password using OTP verification
     * @returns any Password reset successful
     * @throws ApiError
     */
    public static authControllerResetPassword({
        requestBody,
    }: {
        requestBody: ResetPasswordDto,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/auth/reset-password',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Invalid OTP`,
            },
        });
    }
    /**
     * Change password
     * Change user password with current password verification
     * @returns any Password changed successfully
     * @throws ApiError
     */
    public static authControllerChangePassword({
        requestBody,
    }: {
        requestBody: ChangePasswordDto,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/auth/change-password',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Current password is incorrect`,
                401: `Unauthorized`,
            },
        });
    }
    /**
     * Get current user profile
     * Get authenticated user profile information
     * @returns any User profile retrieved successfully
     * @throws ApiError
     */
    public static authControllerGetProfile(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/auth/profile',
            errors: {
                401: `Unauthorized`,
            },
        });
    }
    /**
     * Get active sessions
     * Get list of active user sessions
     * @returns any Active sessions retrieved successfully
     * @throws ApiError
     */
    public static authControllerGetActiveSessions(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/auth/sessions',
            errors: {
                401: `Unauthorized`,
            },
        });
    }
}
