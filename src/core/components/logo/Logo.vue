<template>
    <LogoLight v-if="dark" />
    <LogoDark v-else />
</template>

<script setup>
import { computed } from 'vue';
import LogoLight from './LogoLight.vue';
import LogoDark from './LogoDark.vue';
import { useCustomizerStore } from '@/core/stores/customizer';

const customizer = useCustomizerStore();

// check if dark theme is active
const dark = computed(() => {
    if (
        customizer.activeTheme === 'DARK_BLUE_THEME' ||
        customizer.activeTheme === 'DARK_AQUA_THEME' ||
        customizer.activeTheme === 'DARK_ORANGE_THEME' ||
        customizer.activeTheme === 'DARK_PURPLE_THEME' ||
        customizer.activeTheme === 'DARK_GREEN_THEME' ||
        customizer.activeTheme === 'DARK_CYAN_THEME'
    ) {
        return true;
    } else {
        return false;
    }
});
</script>
