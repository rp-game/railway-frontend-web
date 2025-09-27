/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type RestoreRequestDto = {
    /**
     * Backup ID or filename to restore from
     */
    backupId: string;
    /**
     * Force restore even if data exists
     */
    force?: boolean;
    /**
     * Restore specific tables only
     */
    includeTables?: Array<string>;
    /**
     * Skip data, restore structure only
     */
    structureOnly?: boolean;
    /**
     * Restore point timestamp
     */
    restorePoint?: string;
};

