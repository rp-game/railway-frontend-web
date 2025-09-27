/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type BackupRequestDto = {
    /**
     * Backup type
     */
    type?: 'full' | 'incremental' | 'differential';
    /**
     * Include system logs in backup
     */
    includeLogs?: boolean;
    /**
     * Compress backup file
     */
    compress?: boolean;
    /**
     * Backup description/notes
     */
    description?: string;
    /**
     * Tables to exclude from backup
     */
    excludeTables?: Array<string>;
};

