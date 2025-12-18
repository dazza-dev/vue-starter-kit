const AuthRoutes = {
    path: '/auth',
    component: () => import('@/core/layouts/blank/BlankLayout.vue'),
    meta: {
        requiresAuth: false
    },
    children: [
        {
            name: 'Login',
            path: '/auth/login',
            component: () => import('@/modules/authentication/views/Login.vue')
        },
        {
            name: 'Error',
            path: '/auth/404',
            component: () => import('@/core/components/shared/ErrorPage.vue')
        }
    ]
};

export default AuthRoutes;
