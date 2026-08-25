import { createVuetify } from 'vuetify';
import { createVueI18nAdapter } from 'vuetify/locale/adapters/vue-i18n';
import { useI18n } from 'vue-i18n';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import {
    DEFAULT_THEME,
    BLUE_THEME,
    AQUA_THEME,
    PURPLE_THEME,
    GREEN_THEME,
    CYAN_THEME,
    EMERALD_THEME,
    ORANGE_THEME
} from './theme/LightTheme';
import {
    DARK_DEFAULT_THEME,
    DARK_BLUE_THEME,
    DARK_AQUA_THEME,
    DARK_ORANGE_THEME,
    DARK_PURPLE_THEME,
    DARK_GREEN_THEME,
    DARK_CYAN_THEME,
    DARK_EMERALD_THEME
} from './theme/DarkTheme';

import type { I18n } from 'vue-i18n';

export function createAppVuetify(i18n: I18n) {
    return createVuetify({
        components,
        directives,
        theme: {
            defaultTheme: 'EMERALD_THEME',
            themes: {
                DEFAULT_THEME,
                BLUE_THEME,
                AQUA_THEME,
                PURPLE_THEME,
                GREEN_THEME,
                CYAN_THEME,
                EMERALD_THEME,
                ORANGE_THEME,
                DARK_DEFAULT_THEME,
                DARK_BLUE_THEME,
                DARK_AQUA_THEME,
                DARK_ORANGE_THEME,
                DARK_PURPLE_THEME,
                DARK_GREEN_THEME,
                DARK_CYAN_THEME,
                DARK_EMERALD_THEME
            }
        },
        locale: {
            adapter: createVueI18nAdapter({ i18n, useI18n })
        },
        defaults: {
            VCard: {
                rounded: 'md'
            },
            VTextField: {
                variant: 'outlined',
                density: 'comfortable',
                color: 'primary'
            },
            VTextarea: {
                variant: 'outlined',
                density: 'comfortable',
                color: 'primary'
            },
            VSelect: {
                variant: 'outlined',
                density: 'comfortable',
                color: 'primary'
            },
            VListItem: {
                minHeight: '45px'
            },
            VTooltip: {
                location: 'top'
            }
        }
    });
}
