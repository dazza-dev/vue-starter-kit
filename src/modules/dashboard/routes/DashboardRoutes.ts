const DashboardRoutes = {
    path: '/',
    meta: {
        requiresAuth: true
    },
    redirect: '/dashboard',
    component: () => import('@/core/layouts/full/FullLayout.vue'),
    children: [
        {
            name: 'Dashboard',
            path: '/dashboard',
            component: () => import('@/modules/dashboard/views/Dashboard.vue')
        }
    ]
};

export default DashboardRoutes;
