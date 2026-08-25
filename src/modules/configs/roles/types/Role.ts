import type { LoadDataParams } from '@dazzadev/vuetify-datatable';

export interface Role {
    uuid: string;
    name: string;
    displayName: string;
    description: string | null;
    deletedAt?: string | null;
}

export interface RoleForm {
    displayName: string;
    description: string | null;
}

// A single permission (one checkbox in the matrix).
export interface Permission {
    uuid: string;
    name: string;
    label: string;
}

// A group of permissions: one row in the matrix.
export interface PermissionGroup {
    group: string;
    label: string;
    permissions: Permission[];
}

// A module with its groups: one tab in the matrix; `module` is null when it belongs to none.
export interface PermissionModule {
    module: string | null;
    label: string;
    icon: string | null;
    groups: PermissionGroup[];
}

export interface RolePermissionsResponse {
    data: PermissionModule[];
    assigned: string[];
}

export type RoleTableParams = LoadDataParams;
