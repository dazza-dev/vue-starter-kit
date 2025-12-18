const AuthRoutes = {
    path: '/auth',
    component: () => import('@/core/layouts/blank/BlankLayout.vue'),
    meta: {
        requiresAuth: false
    },
    children: [
        {
            name: 'Side Login',
            path: '/auth/login',
            component: () => import('@/modules/authentication/views/SideLogin.vue')
        },
        {
            name: 'Error',
            path: '/auth/404',
            component: () => import('@/core/components/shared/ErrorPage.vue')
        }
    ]
};

export default AuthRoutes;
