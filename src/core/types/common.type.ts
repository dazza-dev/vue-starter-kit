import type { RouteLocationNormalized } from 'vue-router';
import type { MenuItem } from '@/core/types/sidebar.type';

export interface NamedOption {
    uuid: string;
    name: string;
}

// `slug` is the role's technical name, the one used in its derived permissions.
export interface RoleOption extends NamedOption {
    slug: string;
}

export type HeaderTitleType = {
    title: string;
    subtitle?: string;
};

export type FilterType = {
    title: string;
    value: string | boolean | number;
};

export type ListType = {
    type: string;
    title: string;
    value: string | boolean | number;
    codeParent: string | null;
    typeParent: string | null;
};

// Permission a route requires: a fixed name or a function deriving it from the params.
export type RoutePermission = string | ((to: RouteLocationNormalized) => string | undefined);

// Theme's MenuItem plus the permission needed to see it.
export type SidebarItem = MenuItem & {
    permission?: string;
    children?: SidebarItem[];
};
