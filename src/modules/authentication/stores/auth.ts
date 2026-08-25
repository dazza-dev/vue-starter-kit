import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from '@/core/utils/axios';
import { useApiCall } from '@/core/composables/useApiCall';
import ability from '@/core/plugins/ability';
import type { AuthUser, MyPermissions, ResetPasswordPayload } from '@/modules/authentication/types/AuthUser';

export const useAuthStore = defineStore('auth', () => {
    const loading = ref(false);
    const user = ref<AuthUser | null>(null);
    const permissions = ref<string[]>([]);
    const isAdmin = ref(false);
    // Own flag: an empty list can't tell "no permissions" apart from "not loaded yet".
    const permissionsLoaded = ref(false);
    const apiCall = useApiCall(loading);

    async function profile() {
        return apiCall(async () => {
            const response = await axios.post<{ data: AuthUser }>('v1/auth/profile');
            user.value = response.data.data;
            return response;
        }, 'Error fetching profile:');
    }

    async function login(username: string, password: string) {
        return apiCall(async () => {
            const response = await axios.post<{ data: AuthUser }>('v1/auth/login', { username, password });
            user.value = response.data.data;
            return response;
        }, 'Error logging in:');
    }

    async function logout() {
        try {
            // The local session is cleared regardless of what happens on the server.
            return await apiCall(() => axios.post('v1/auth/logout'), 'Error logging out:');
        } finally {
            user.value = null;
            resetPermissions();
        }
    }

    async function forgotPassword(email: string) {
        return apiCall(() => axios.post<{ message: string }>('v1/auth/forgot-password', { email }), 'Error requesting password reset:');
    }

    async function resetPassword(payload: ResetPasswordPayload) {
        return apiCall(() => axios.post<{ message: string }>('v1/auth/reset-password', payload), 'Error resetting password:');
    }

    /**
     * Loads permissions and syncs CASL. Admins get `manage all` instead of the list.
     */
    async function getPermissions(): Promise<void> {
        await apiCall(async () => {
            const response = await axios.get<{ data: MyPermissions }>('v1/permissions/me');
            const data = response.data.data;

            permissions.value = data.permissions;
            isAdmin.value = data.isAdmin;
            permissionsLoaded.value = true;

            ability.update(data.isAdmin ? [{ action: 'manage', subject: 'all' }] : [{ action: data.permissions, subject: 'all' }]);

            return response;
        }, 'Error fetching permissions:');
    }

    /**
     * Checks whether the user has a permission. Same `can` used by the guard and the v-can directive.
     */
    function can(permission: string): boolean {
        return ability.can(permission, 'all');
    }

    /**
     * Clears the permissions and leaves CASL denying everything.
     */
    function resetPermissions(): void {
        permissions.value = [];
        isAdmin.value = false;
        permissionsLoaded.value = false;
        ability.update([]);
    }

    return {
        loading,
        user,
        permissions,
        isAdmin,
        permissionsLoaded,
        profile,
        login,
        logout,
        forgotPassword,
        resetPassword,
        getPermissions,
        can,
        resetPermissions
    };
});
