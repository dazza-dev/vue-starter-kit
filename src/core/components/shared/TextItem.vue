<template>
    <div class="d-flex gap-3 mb-5">
        <slot name="icon">
            <v-icon v-if="icon">{{ icon }}</v-icon>
        </slot>
        <span v-if="title" class="text-h6">{{ title }}</span>
        <span v-if="value || $slots.value" class="text-subtitle-1">
            <slot name="value">
                {{ value }}
            </slot>
        </span>
    </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'TextItem' });

defineProps<{
    title?: string;
    value?: string | number | null;
    icon?: string;
}>();
</script>
