/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type OtpResponseDto = {
    /**
     * OTP sent successfully
     */
    sent: boolean;
    /**
     * Message for user
     */
    message: string;
    /**
     * OTP expiration time in seconds
     */
    expiresIn: number;
    /**
     * Remaining attempts
     */
    remainingAttempts: number;
    /**
     * Can resend OTP
     */
    canResend: boolean;
};

