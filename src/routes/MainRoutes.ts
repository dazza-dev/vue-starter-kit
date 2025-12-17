const MainRoutes = {
    path: '/main',
    meta: {
        requiresAuth: true
    },
    redirect: '/main',
    component: () => import('@/core/layouts/full/FullLayout.vue'),
    children: [
        {
            name: 'Starter',
            path: '/',
            component: () => import('@/views/StarterPage.vue')
        }
    ]
};

export default MainRoutes;
