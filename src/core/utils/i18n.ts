import { createI18n } from 'vue-i18n';

// English
import EnglishCommon from '@/core/languages/en/common.json';
import EnglishCustomizer from '@/core/languages/en/customizer.json';
import EnglishSidebar from '@/core/languages/en/sidebar.json';

// Spanish
import SpanishCommon from '@/core/languages/es/common.json';
import SpanishCustomizer from '@/core/languages/es/customizer.json';
import SpanishSidebar from '@/core/languages/es/sidebar.json';

// Portuguese
import PortugueseCommon from '@/core/languages/pt/common.json';
import PortugueseCustomizer from '@/core/languages/pt/customizer.json';
import PortugueseSidebar from '@/core/languages/pt/sidebar.json';

// French
import FrenchCommon from '@/core/languages/fr/common.json';
import FrenchCustomizer from '@/core/languages/fr/customizer.json';
import FrenchSidebar from '@/core/languages/fr/sidebar.json';

// Messages
const messages = {
    en: {
        common: EnglishCommon,
        customizer: EnglishCustomizer,
        sidebar: EnglishSidebar
    },
    es: {
        common: SpanishCommon,
        customizer: SpanishCustomizer,
        sidebar: SpanishSidebar
    },
    fr: {
        common: FrenchCommon,
        customizer: FrenchCustomizer,
        sidebar: FrenchSidebar
    },
    pt: {
        common: PortugueseCommon,
        customizer: PortugueseCustomizer,
        sidebar: PortugueseSidebar
    }
} as const;

// i18n
const i18n = createI18n({
    locale: 'en',
    messages: messages,
    silentTranslationWarn: true,
    silentFallbackWarn: true
});

export default i18n;
