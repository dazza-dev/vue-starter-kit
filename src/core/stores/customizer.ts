import { defineStore } from 'pinia';
import config from '@/core/types/config.type';

export const useCustomizerStore = defineStore({
    id: 'customizer',
    state: () => ({
        sidebarDrawer: config.sidebarDrawer,
        customizerDrawer: config.customizerDrawer,
        miniSidebar: config.miniSidebar,
        activeTheme: config.activeTheme,
        boxed: config.boxed,
        setBorderCard: config.setBorderCard
    }),

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
