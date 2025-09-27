/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { User } from '../models/User';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UsersService {
    /**
     * Get all users
     * @returns User Return all users.
     * @throws ApiError
     */
    public static usersControllerFindAll(): CancelablePromise<Array<User>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/users',
        });
    }
    /**
     * Create a new user
     * @returns User The user has been successfully created.
     * @throws ApiError
     */
    public static usersControllerCreate(): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/users',
        });
    }
    /**
     * Get a user by id
     * @returns User Return a user.
     * @throws ApiError
     */
    public static usersControllerFindOne({
        id,
    }: {
        id: string,
    }): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/users/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `User not found.`,
            },
        });
    }
    /**
     * Update a user
     * @returns User The user has been successfully updated.
     * @throws ApiError
     */
    public static usersControllerUpdate({
        id,
    }: {
        id: string,
    }): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/v1/users/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `User not found.`,
            },
        });
    }
    /**
     * Delete a user
     * @returns any The user has been successfully deleted.
     * @throws ApiError
     */
    public static usersControllerRemove({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/users/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `User not found.`,
            },
        });
    }
}
