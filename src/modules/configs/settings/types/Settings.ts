import type { ThemeName } from '@/core/types/config.type';

// Settings as returned by `GET v1/settings`, already in camelCase.
export interface SettingsApiResponse {
    appName: string | null;
    email: string | null;
    notificationEmail: string | null;
    language: string | null;
    timezone: string | null;
    appTheme: ThemeName;
    logo: string | null;
    logoDark: string | null;
}

export interface AppSettings {
    appName: string;
    email: string;
    notificationEmail: string;
    language: string;
    timezone: string;
    appTheme: ThemeName;
    logo: string | null;
    logoDark: string | null;
}
