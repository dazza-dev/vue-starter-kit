<template>
    <v-dialog v-model="dialog" max-width="500px" persistent no-click-animation>
        <v-card>
            <v-card-title class="text-h5 text-center py-6">
                {{ title }}
            </v-card-title>
            <v-card-text v-if="description || $slots.description" class="text-center px-0 py-0">
                {{ description }}
                <slot name="description"></slot>
            </v-card-text>
            <v-card-actions class="justify-center ga-2 pb-6 pt-4">
                <v-btn variant="outlined" @click="emit('close')">{{ cancelButtonText }}</v-btn>
                <v-btn :color="confirmColor" variant="flat" @click="emit('confirm')">{{ confirmButtonText }}</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
defineOptions({ name: 'ConfirmationModal' });

import { computed } from 'vue';

const props = withDefaults(
    defineProps<{
        show: boolean;
        title?: string;
        description?: string;
        confirmButtonText?: string;
        cancelButtonText?: string;
        confirmColor?: string;
    }>(),
    {
        title: 'Are you sure?',
        description: undefined,
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        confirmColor: 'primary'
    }
);

const emit = defineEmits<{
    (e: 'close'): void;
    (e: 'confirm'): void;
}>();

const dialog = computed({
    get: () => props.show,
    set: () => emit('close')
});
</script>
