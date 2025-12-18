<template>
    <v-card variant="outlined" elevation="0" class="mb-6 overflow-hidden">
        <v-card-item>
            <v-card-title class="text-18">{{ title }}</v-card-title>
        </v-card-item>
        <v-divider></v-divider>
        <slot />
        <v-divider></v-divider>
        <v-card-actions :class="`${hideAction ? 'd-none' : ''}`">
            <slot name="footer" />
        </v-card-actions>
    </v-card>
</template>

<script setup lang="ts">
const props = defineProps({
    title: String,
    hideAction: Boolean
});
</script>
