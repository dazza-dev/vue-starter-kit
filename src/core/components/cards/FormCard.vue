<template>
    <v-card elevation="0">
        <v-card-item v-if="title">
            <div class="d-sm-flex align-center justify-space-between">
                <v-card-title class="text-h5">
                    <slot name="title">
                        <v-icon v-if="icon" class="mr-2">{{ icon }}</v-icon>
                        {{ title }}
                    </slot>
                </v-card-title>
            </div>
        </v-card-item>
        <v-divider></v-divider>
        <v-card-text class="pb-0">
            <slot />
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
defineOptions({ name: 'FormCard' });

defineProps<{
    title?: string;
    icon?: string;
}>();
</script>
