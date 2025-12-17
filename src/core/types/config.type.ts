export type ConfigProps = {
    sidebarDrawer: any;
    customizerDrawer: boolean;
    miniSidebar: boolean;
    setHorizontalLayout: boolean;
    actTheme: string;
    boxed: boolean;
    setBorderCard: boolean;
};

const config: ConfigProps = {
    sidebarDrawer: null,
    customizerDrawer: false,
    miniSidebar: false,
    setHorizontalLayout: false, // Horizontal layout
    actTheme: 'BLUE_THEME',
    boxed: true,
    setBorderCard: false
};

export default config;
