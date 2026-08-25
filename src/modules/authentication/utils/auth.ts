import { useAuthStore } from '@/modules/authentication/stores/auth';

export async function isAuthenticated() {
    const store = useAuthStore();

    if (store.user !== null) {
        return true;
    }

    // The store is empty after a page reload: check the cookie against the profile.
    try {
        await store.profile();
        return true;
    } catch {
        return false;
    }
}
