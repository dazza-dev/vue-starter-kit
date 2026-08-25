<template>
    <v-card elevation="10">
        <template v-if="title || $slots.header || $slots.action">
            <v-card-item :class="['px-6', 'pb-4', $slots.header ? 'pt-6' : 'pt-4']">
                <div class="d-sm-flex align-center justify-space-between">
                    <v-card-title v-if="title" class="text-h5">{{ title }}</v-card-title>
                    <slot v-else name="header"></slot>
                    <slot name="action"></slot>
                </div>
            </v-card-item>
            <v-divider></v-divider>
        </template>
        <v-card-text>
            <slot />
        </v-card-text>
        <template v-if="$slots.footer">
            <v-divider></v-divider>
            <v-card-text>
                <slot name="footer"></slot>
            </v-card-text>
        </template>
    </v-card>
</template>

<script setup lang="ts">
defineOptions({ name: 'ParentCard' });

defineProps<{
    title?: string;
}>();
</script>
