import type { ThemeTypes } from '../types/theme.type';

const DARK_BASE_COLORS = {
    info: '#539BFF',
    success: '#13DEB9',
    accent: '#FA896B',
    warning: '#FFAE1F',
    error: '#FA896B',
    lightsuccess: '#1B3C48',
    lighterror: '#4B313D',
    lightinfo: '#223662',
    lightwarning: '#4D3A2A',
    textPrimary: '#EAEFF4',
    textSecondary: '#7C8FAC',
    borderColor: '#333F55',
    inputBorder: '#465670',
    containerBg: '#171c23',
    background: '#171c23',
    hoverColor: '#333f55',
    surface: '#171c23',
    'on-surface-variant': '#171c23',
    grey100: '#333F55',
    grey200: '#465670'
} as const;

const DARK_BASE_VARIABLES = {
    'border-color': '#333F55',
    'border-opacity': 1
} as const;

function createDarkTheme(
    name: ThemeTypes['name'],
    primary: string,
    secondary: string,
    lightprimary: string,
    lightsecondary: string,
    overrides?: Partial<ThemeTypes['colors']>
): ThemeTypes {
    return {
        name,
        dark: true,
        variables: { ...DARK_BASE_VARIABLES },
        colors: {
            ...DARK_BASE_COLORS,
            primary,
            secondary,
            // The sidebar follows primary unless the theme overrides it.
            sidebarBg: primary,
            lightprimary,
            lightsecondary,
            ...overrides
        }
    };
}

const DARK_BLUE_THEME = createDarkTheme('DARK_BLUE_THEME', '#5D87FF', '#49BEFF', '#253662', '#1C455D', {
    containerBg: '#2a3447',
    background: '#2a3447',
    surface: '#2a3447',
    'on-surface-variant': '#2a3447'
});

const DARK_AQUA_THEME = createDarkTheme('DARK_AQUA_THEME', '#0074BA', '#47D7BC', '#103247', '#0C4339');

const DARK_PURPLE_THEME = createDarkTheme('DARK_PURPLE_THEME', '#763EBD', '#95CFD5', '#26153C', '#09454B');

const DARK_GREEN_THEME = createDarkTheme('DARK_GREEN_THEME', '#0A7EA4', '#CCDA4E', '#05313F', '#282917');

const DARK_CYAN_THEME = createDarkTheme('DARK_CYAN_THEME', '#01C0C8', '#FB9678', '#003638', '#40241C');

const DARK_ORANGE_THEME = createDarkTheme('DARK_ORANGE_THEME', '#FA896B', '#0074BA', '#402E32', '#082E45');

// Black sidebar with green accents.
const DARK_EMERALD_THEME = createDarkTheme('DARK_EMERALD_THEME', '#00c853', '#00e676', '#0C4339', '#003638', {
    sidebarBg: '#0B0E12',
    success: '#00e676'
});

const DARK_DEFAULT_THEME = createDarkTheme('DARK_DEFAULT_THEME', '#562ff4', '#49BEFF', '#1C1060', '#1C455D');

export {
    DARK_BLUE_THEME,
    DARK_AQUA_THEME,
    DARK_ORANGE_THEME,
    DARK_PURPLE_THEME,
    DARK_GREEN_THEME,
    DARK_CYAN_THEME,
    DARK_EMERALD_THEME,
    DARK_DEFAULT_THEME
};
