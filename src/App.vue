<template>
    <RouterView></RouterView>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { RouterView } from 'vue-router';
import { useSidebarItems } from '@/core/sidebar/useSidebarItems';
import { useConfigStore } from '@/core/stores/config';
import { useCustomizerStore } from '@/core/stores/customizer';
import { setDefaultLanguage } from '@/core/plugins/i18n';
import type { ThemeName } from '@/core/types/config.type';

useSidebarItems();

const configStore = useConfigStore();
const customizerStore = useCustomizerStore();

// Theme comes from the backend. Same for language, unless the user picked one.
watch(
    () => configStore.settings.appTheme,
    (theme) => {
        if (theme) customizerStore.setTheme(theme as ThemeName);
    },
    { immediate: true }
);

watch(
    () => configStore.settings.language,
    (language) => setDefaultLanguage(language as string | undefined),
    { immediate: true }
);
</script>
