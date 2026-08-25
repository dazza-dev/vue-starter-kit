import type { ThemeTypes } from '../types/theme.type';

const LIGHT_BASE_COLORS = {
    info: '#539BFF',
    success: '#13DEB9',
    accent: '#FFAB91',
    warning: '#FFAE1F',
    error: '#FA896B',
    lightsuccess: '#E6FFFA',
    lighterror: '#FDEDE8',
    lightinfo: '#EBF3FE',
    lightwarning: '#FEF5E5',
    textPrimary: '#2A3547',
    textSecondary: '#2A3547',
    borderColor: '#e5eaef',
    inputBorder: '#DFE5EF',
    containerBg: '#ffffff',
    background: '#ffffff',
    hoverColor: '#f6f9fc',
    surface: '#fff',
    'on-surface-variant': '#fff',
    grey100: '#F2F6FA',
    grey200: '#EAEFF4'
} as const;

const LIGHT_BASE_VARIABLES = {
    'border-color': '#e5eaef',
    'border-opacity': 1
} as const;

function createLightTheme(
    name: ThemeTypes['name'],
    primary: string,
    secondary: string,
    lightprimary: string,
    lightsecondary: string,
    overrides?: Partial<ThemeTypes['colors']>
): ThemeTypes {
    return {
        name,
        dark: false,
        variables: { ...LIGHT_BASE_VARIABLES },
        colors: {
            ...LIGHT_BASE_COLORS,
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

const BLUE_THEME = createLightTheme('BLUE_THEME', '#5D87FF', '#49BEFF', '#ECF2FF', '#E8F7FF');

const AQUA_THEME = createLightTheme('AQUA_THEME', '#0074BA', '#47D7BC', '#EFF9FF', '#EDFBF7');

const PURPLE_THEME = createLightTheme('PURPLE_THEME', '#763EBD', '#95CFD5', '#F2ECF9', '#EDF8FA');

const GREEN_THEME = createLightTheme('GREEN_THEME', '#0A7EA4', '#CCDA4E', '#F4F9FB', '#FAFBEF');

const CYAN_THEME = createLightTheme('CYAN_THEME', '#01C0C8', '#FB9678', '#EBF9FA', '#FFF5F2', { success: '#00e676' });

const ORANGE_THEME = createLightTheme('ORANGE_THEME', '#FA896B', '#0074BA', '#FBF2EF', '#EFF9FF', {
    success: '#00e676',
    warning: '#ffe57f'
});

// Black sidebar with green accents.
const EMERALD_THEME = createLightTheme('EMERALD_THEME', '#00c853', '#00e676', '#E6F9ED', '#E9FBF1', {
    sidebarBg: '#12161C',
    success: '#00e676'
});

const DEFAULT_THEME = createLightTheme('DEFAULT_THEME', '#562ff4', '#49BEFF', '#EDE8FE', '#E8F7FF');

export { BLUE_THEME, AQUA_THEME, ORANGE_THEME, PURPLE_THEME, GREEN_THEME, CYAN_THEME, EMERALD_THEME, DEFAULT_THEME };
