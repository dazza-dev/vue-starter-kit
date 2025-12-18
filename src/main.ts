import '@/assets/scss/style.scss';

// App
import App from '@/App.vue';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { router } from '@/routes';
import vuetify from '@/core/plugins/vuetify';
import i18n from '@/utils/i18n';
import VueTablerIcons from 'vue-tabler-icons';
import PerfectScrollbar from 'vue3-perfect-scrollbar';
import VueScrollTo from 'vue-scrollto';

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(i18n);
app.use(vuetify);
app.use(PerfectScrollbar);
app.use(VueTablerIcons);

//ScrollTop Use
app.use(VueScrollTo, {
    duration: 1000,
    easing: 'ease'
});

// Mount the app
app.mount('#app');
