import { toast, type ToastOptions } from 'vue3-toastify';

export function notify(toastType: ToastOptions['type'], message: string) {
    toast(message, {
        type: toastType
    });
}

export function getBaseUrl(): string {
    return import.meta.env.VITE_API_URL || window.location.origin;
}

/**
 * Initials of a name, for avatars.
 */
export function getInitials(name: string): string {
    const parts = name.trim().split(/\s+/).filter(Boolean);

    if (parts.length > 1) return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();

    return '';
}
