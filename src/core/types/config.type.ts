export type ConfigProps = {
    sidebarDrawer: any;
    customizerDrawer: boolean;
    miniSidebar: boolean;
    activeTheme: string;
    boxed: boolean;
    setBorderCard: boolean;
};

const config: ConfigProps = {
    sidebarDrawer: null,
    customizerDrawer: false,
    miniSidebar: false,
    activeTheme: 'BLUE_THEME',
    boxed: true,
    setBorderCard: false
};

export default config;
