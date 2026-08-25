import { createRouter, createWebHistory } from 'vue-router';
import { isAuthenticated } from '@/modules/authentication/utils/auth';

import AppRoutes from '@/routes/AppRoutes';
import ConfigsRoutes from '@/routes/ConfigsRoutes';
import AuthRoutes from '@/routes/AuthRoutes';
import ProfileRoutes from '@/routes/ProfileRoutes';

import ability from '@/core/plugins/ability';
import { useAuthStore } from '@/modules/authentication/stores/auth';
import { useConfigStore } from '@/core/stores/config';

import ErrorPage from '@/core/components/shared/ErrorPage.vue';
import type { RoutePermission } from '@/core/types/common.type';

const routes = [
    {
        path: '/',
        redirect: '/auth/login'
    },

    AuthRoutes,
    AppRoutes,
    ConfigsRoutes,
    ProfileRoutes,

    {
        path: '/403',
        name: 'forbidden',
        component: () => import('@/core/views/ForbiddenView.vue'),
        meta: { requiresAuth: true }
    },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: ErrorPage }
];

const router = createRouter({
    history: createWebHistory('/'),
    routes
});

// Settings load once and feed the logo, theme and app name.
router.beforeEach(async (to) => {
    if (to.name === 'not-found') return;

    const configStore = useConfigStore();

    if (!Object.keys(configStore.settings).length) {
        try {
            await configStore.getSettings();
        } catch {
            // Navigation continues without settings: they're decorative, not a login blocker.
        }
    }
});

// Redirects to login when there's no session and a restricted page is requested.
router.beforeEach(async (to) => {
    const publicPages = ['/auth/login'];
    const authRequired = !publicPages.includes(to.path);

    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (authRequired && !(await isAuthenticated())) {
            return '/auth/login';
        }
    } else {
        if (to.path === '/auth/login' && (await isAuthenticated())) {
            return '/app/dashboard';
        }
    }
});

// Each route declares its required permission in meta.permission.
router.beforeEach(async (to) => {
    if (to.path.startsWith('/auth/')) return;

    const authStore = useAuthStore();

    // Always loaded: the sidebar and v-can need them from the first render.
    if (!authStore.permissionsLoaded && (await isAuthenticated())) {
        try {
            await authStore.getPermissions();
        } catch {
            return '/auth/login';
        }
    }

    const meta = to.meta?.permission as RoutePermission | undefined;
    if (!meta) return;

    const permission = typeof meta === 'function' ? meta(to) : meta;
    if (!permission) return;

    if (ability.can(permission, 'all')) return;

    return { name: 'forbidden' };
});

export default router;
