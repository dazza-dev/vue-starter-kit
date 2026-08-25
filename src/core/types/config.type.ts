export type ThemeName =
    | 'DEFAULT_THEME'
    | 'BLUE_THEME'
    | 'AQUA_THEME'
    | 'ORANGE_THEME'
    | 'PURPLE_THEME'
    | 'GREEN_THEME'
    | 'CYAN_THEME'
    | 'EMERALD_THEME'
    | 'DARK_DEFAULT_THEME'
    | 'DARK_BLUE_THEME'
    | 'DARK_AQUA_THEME'
    | 'DARK_ORANGE_THEME'
    | 'DARK_PURPLE_THEME'
    | 'DARK_GREEN_THEME'
    | 'DARK_CYAN_THEME'
    | 'DARK_EMERALD_THEME';

export type ConfigProps = {
    sidebarDrawer: boolean;
    customizerDrawer: boolean;
    miniSidebar: boolean;
    activeTheme: ThemeName;
    darkMode: boolean;
    boxed: boolean;
    borderCard: boolean;
};
