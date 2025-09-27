/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type AuthResponseDto = {
    /**
     * Access token
     */
    accessToken: string;
    /**
     * Refresh token
     */
    refreshToken: string;
    /**
     * Token expiration time in seconds
     */
    expiresIn: number;
    /**
     * Token type
     */
    tokenType: string;
    /**
     * User information
     */
    user: Record<string, any>;
};

