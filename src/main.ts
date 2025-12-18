import '@/scss/style.scss';

// App
import App from '@/App.vue';

// Pinia
import { createApp } from 'vue';
import { createPinia } from 'pinia';

// Router
import { router } from '@/routes';
import vuetify from '@/core/plugins/vuetify';
import PerfectScrollbar from 'vue3-perfect-scrollbar';
import VueTablerIcons from 'vue-tabler-icons';

// i18
import { createI18n } from 'vue-i18n';
import messages from '@/core/locales/messages';

// ScrollTop
import VueScrollTo from 'vue-scrollto';

const i18n = createI18n({
    locale: 'en',
    messages: messages,
    silentTranslationWarn: true,
    silentFallbackWarn: true
});

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(PerfectScrollbar);
app.use(VueTablerIcons);
app.use(i18n);
app.use(vuetify);

//ScrollTop Use
app.use(VueScrollTo, {
    duration: 1000,
    easing: 'ease'
});

// Mount the app
app.mount('#app');
