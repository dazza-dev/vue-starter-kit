import { defineStore } from 'pinia';
import axios from '@/core/utils/axios';

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        loading: false,
        user: {}
    }),
    actions: {
        // Profile
        async profile() {
            this.loading = true;
            try {
                const response = await axios.post('auth/profile');
                this.user = response.data.user;

                return response;
            } catch (error) {
                console.error('Error fetching profile in:', error);
                throw error;
            } finally {
                this.loading = false;
            }
        },

        // Login
        async login(username: string, password: string) {
            this.loading = true;
            try {
                const response = await axios.post('auth/login', {
                    username: username,
                    password: password
                });
                this.user = response.data.user;
                localStorage.setItem('token', response.data.token);

                return response;
            } catch (error) {
                console.error('Error logging in:', error);
                throw error;
            } finally {
                this.loading = false;
            }
        },

        // Logout
        async logout() {
            this.loading = true;
            try {
                const response = await axios.post('auth/logout');

                // Remove token from localStorage
                localStorage.removeItem('token');

                return response;
            } catch (error) {
                console.error('Error logout in:', error);
                throw error;
            } finally {
                this.loading = false;
            }
        }
    }
});
