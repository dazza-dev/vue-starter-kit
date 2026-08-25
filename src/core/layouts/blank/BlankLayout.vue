<template>
    <v-app :theme="customizer.theme" :class="customizer.theme">
        <RouterView />
    </v-app>
</template>

<script setup lang="ts">
defineOptions({ name: 'BlankLayout' });

import { RouterView } from 'vue-router';
import { useCustomizerStore } from '@/core/stores/customizer';

// Without this, auth screens stay stuck on Vuetify's default theme.
const customizer = useCustomizerStore();
</script>
