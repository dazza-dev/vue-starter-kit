import { createI18n } from 'vue-i18n';

// English
import EnglishCommon from '@/core/languages/en/common.json';

// Spanish
import SpanishCommon from '@/core/languages/es/common.json';

// Portuguese
import PortugueseCommon from '@/core/languages/pt/common.json';

// French
import FrenchCommon from '@/core/languages/fr/common.json';

// Messages
const messages = {
    en: {
        common: EnglishCommon
    },
    es: {
        common: SpanishCommon
    },
    fr: {
        common: FrenchCommon
    },
    pt: {
        common: PortugueseCommon
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
