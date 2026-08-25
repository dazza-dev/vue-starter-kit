import { defineStore } from 'pinia';
import type { ConfigProps, ThemeName } from '../types/config.type';

const DEFAULT_CONFIG: ConfigProps = {
    sidebarDrawer: true,
    customizerDrawer: false,
    miniSidebar: false,
    activeTheme: 'EMERALD_THEME',
    darkMode: false,
    boxed: true,
    borderCard: false
};

let customDefaults: Partial<ConfigProps> = {};

export function setCustomizerDefaults(defaults: Partial<ConfigProps>) {
    customDefaults = defaults;
}

// The dark preference is the user's, not the tenant's, so it lives in the browser.
const DARK_STORAGE_KEY = 'darkMode';
const MINI_SIDEBAR_STORAGE_KEY = 'miniSidebar';

function storedFlag(key: string, fallback: boolean): boolean {
    const value = localStorage.getItem(key);

    return value === null ? fallback : value === 'true';
}

export const useCustomizerStore = defineStore('customizer', {
    state: (): ConfigProps => ({
        ...DEFAULT_CONFIG,
        ...customDefaults,
        // A stored choice wins over the app default; without one, the default stands.
        miniSidebar: storedFlag(MINI_SIDEBAR_STORAGE_KEY, customDefaults.miniSidebar ?? DEFAULT_CONFIG.miniSidebar),
        darkMode: storedFlag(DARK_STORAGE_KEY, customDefaults.darkMode ?? DEFAULT_CONFIG.darkMode)
    }),
    getters: {
        // Each palette ships a DARK_ twin; the mode just picks which one applies.
        theme(state): ThemeName {
            const base = state.activeTheme.replace(/^DARK_/, '');
            return (state.darkMode ? `DARK_${base}` : base) as ThemeName;
        }
    },
    actions: {
        toggleSidebarDrawer() {
            this.sidebarDrawer = !this.sidebarDrawer;
        },
        setMiniSidebar(value: boolean) {
            this.miniSidebar = value;
            localStorage.setItem(MINI_SIDEBAR_STORAGE_KEY, String(value));
        },
        setCustomizerDrawer(value: boolean) {
            this.customizerDrawer = value;
        },
        /** Theme comes from settings and applies to the whole app. */
        setTheme(theme: ThemeName) {
            this.activeTheme = theme;
        },
        setCardBorder(value: boolean) {
            this.borderCard = value;
        },
        toggleDarkMode() {
            this.darkMode = !this.darkMode;
            localStorage.setItem(DARK_STORAGE_KEY, String(this.darkMode));
        }
    }
});
