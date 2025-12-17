import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import { router } from './routes';
import vuetify from './core/plugins/vuetify';
import '@/scss/style.scss';
import PerfectScrollbar from 'vue3-perfect-scrollbar';
import VueApexCharts from 'vue3-apexcharts';
import VueTablerIcons from 'vue-tabler-icons';
import { fakeBackend } from '@/utils/helpers/fake-backend';
import 'vue3-carousel/dist/carousel.css';

import Maska from 'maska';

// Table
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';
//i18
import { createI18n } from 'vue-i18n';
import messages from '@/core/locales/messages';

//ScrollTop
import VueScrollTo from 'vue-scrollto';

//LightBox
import VueEasyLightbox from 'vue-easy-lightbox';

const i18n = createI18n({
    locale: 'en',
    messages: messages,
    silentTranslationWarn: true,
    silentFallbackWarn: true
});

const app = createApp(App);

// Use the router
app.use(router);
app.use(PerfectScrollbar);
app.use(createPinia());
app.use(VueTablerIcons);
app.use(i18n);
app.use(Maska);
app.use(VueApexCharts);
app.use(vuetify);
app.use(VueEasyLightbox);

//ScrollTop Use
app.use(VueScrollTo, {
    duration: 1000,
    easing: 'ease'
});

// Register the EasyDataTable component globally
app.component('EasyDataTable', Vue3EasyDataTable);

// Mount the app
app.mount('#app');
