<template>
    <div class="d-flex flex-column align-center justify-center text-center h-100vh px-4">
        <div class="not-found-art text-primary">
            <NotFoundArt />
        </div>
        <h1 class="text-h4 font-weight-bold mt-10">{{ title }}</h1>
        <p class="text-body-1 text-medium-emphasis mt-3 not-found-text">{{ description }}</p>
        <v-btn flat color="primary" class="mt-8" :to="homeRoute">{{ backToHome }}</v-btn>
    </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'ErrorPage' });
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import NotFoundArt from '@/core/components/shared/NotFoundArt.vue';
import { getThemeOptions } from '@/core/plugin';

const { t, te } = useI18n({ useScope: 'global' });
const errorPage = getThemeOptions().errorPage ?? {};

function translateOr(key: string | undefined, fallback: string) {
    return key && te(key) ? t(key) : fallback;
}

const title = computed(() => translateOr(errorPage.titleKey, 'Oops!'));
const description = computed(() => translateOr(errorPage.descriptionKey, 'The page you are looking for could not be found.'));
const backToHome = computed(() => translateOr(errorPage.backToHomeKey, 'Go Back to Home'));
const homeRoute = computed(() => errorPage.homeRoute ?? '/');
</script>

<style scoped>
.not-found-art {
    width: 100%;
    max-width: 380px;
}

.not-found-text {
    max-width: 420px;
}
</style>
