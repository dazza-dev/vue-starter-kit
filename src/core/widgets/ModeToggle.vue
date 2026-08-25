<template>
    <v-btn icon variant="text" :aria-label="label" @click="customizer.toggleDarkMode()">
        <v-tooltip activator="parent" location="bottom">{{ label }}</v-tooltip>
        <MoonIcon v-if="!customizer.darkMode" size="20" stroke-width="1.5" />
        <SunIcon v-else size="20" stroke-width="1.5" />
    </v-btn>
</template>

<script setup lang="ts">
defineOptions({ name: 'ModeToggle' });

import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { MoonIcon, SunIcon } from 'vue-tabler-icons';
import { useCustomizerStore } from '@/core/stores/customizer';

const { t } = useI18n();
const customizer = useCustomizerStore();

const label = computed(() => t(customizer.darkMode ? 'common.mode.light' : 'common.mode.dark'));
</script>
