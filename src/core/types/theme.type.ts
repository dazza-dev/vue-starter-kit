import type { ThemeName } from './config.type';

export type ThemeTypes = {
    name: ThemeName;
    dark: boolean;
    variables?: Record<string, string | number>;
    colors: {
        primary: string;
        secondary: string;
        sidebarBg: string;
        info: string;
        success: string;
        accent: string;
        warning: string;
        error: string;
        lightprimary: string;
        lightsecondary: string;
        lightsuccess: string;
        lighterror: string;
        lightinfo: string;
        lightwarning: string;
        textPrimary: string;
        textSecondary: string;
        borderColor: string;
        hoverColor: string;
        inputBorder: string;
        containerBg: string;
        background: string;
        surface: string;
        'on-surface-variant': string;
        grey100: string;
        grey200: string;
    };
};
