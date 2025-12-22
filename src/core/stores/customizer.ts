import { defineStore } from 'pinia';
import type { ConfigProps } from '@/core/types/config.type';

export const useCustomizerStore = defineStore('customizer', {
    state: () =>
        ({
            sidebarDrawer: true,
            customizerDrawer: false,
            miniSidebar: false,
            activeTheme: 'BLUE_THEME',
            boxed: true,
            setBorderCard: false
        }) as ConfigProps,

    getters: {},
    actions: {
        SET_SIDEBAR_DRAWER() {
            this.sidebarDrawer = !this.sidebarDrawer;
        },
        SET_MINI_SIDEBAR(payload: any) {
            this.miniSidebar = payload;
        },
        SET_CUSTOMIZER_DRAWER(payload: any) {
            this.customizerDrawer = payload;
        },
        SET_THEME(payload: any) {
            this.activeTheme = payload;
        },
        SET_CARD_BORDER(payload: any) {
            this.setBorderCard = payload;
        }
    }
});
