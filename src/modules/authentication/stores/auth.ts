import { defineStore } from 'pinia';
import { router } from '@/routes';
import { fetchWrapper } from '@/utils/helpers/fetch-wrapper';

const baseUrl = `${import.meta.env.VITE_API_URL}/users`;

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        user: JSON.parse(localStorage.getItem('user')),
        returnUrl: null
    }),
    actions: {
        /**
         * Login
         */
        async login(username: string, password: string) {
            const user = await fetchWrapper.post(`${baseUrl}/authenticate`, { username, password });

            // update pinia state
            this.user = user;
            // store user details and jwt in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));
            // redirect to previous url or default to home page
            router.push(this.returnUrl || '/dashboards/modern');
        },

        /**
         * Logout
         */
        logout() {
            this.user = null;
            localStorage.removeItem('user');
            router.push('/');
        }
    }
});
