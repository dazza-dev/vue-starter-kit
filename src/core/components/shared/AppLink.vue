<template>
    <RouterLink v-if="to !== undefined" :to="to" :class="linkClass">
        <slot />
    </RouterLink>
    <a v-else :class="linkClass" role="button" tabindex="0">
        <slot />
    </a>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router';

defineProps<{
    /**
     * Router destination; if omitted, renders a clickable `<a>` with `@click` instead.
     */
    to?: RouteLocationRaw;
}>();

// Single source for the table/inline link style used across the app.
const linkClass = 'text-primary text-decoration-none text-body-1 opacity-1 font-weight-medium cursor-pointer';
</script>
