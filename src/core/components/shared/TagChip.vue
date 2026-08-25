<template>
    <v-chip class="text-body-2 font-weight-medium" :class="'bg-' + color" :size="size">
        <slot name="title">
            <v-icon v-if="icon" class="mr-2">{{ icon }}</v-icon>
            {{ title }}
        </slot>
    </v-chip>
</template>

<script setup lang="ts">
defineOptions({ name: 'TagChip' });

withDefaults(
    defineProps<{
        title?: string;
        icon?: string;
        size?: string;
        color?: string;
    }>(),
    {
        size: 'small',
        color: 'primary'
    }
);
</script>
