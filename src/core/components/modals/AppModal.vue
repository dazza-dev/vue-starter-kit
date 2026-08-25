<template>
    <v-dialog v-model="dialog" :max-width="maxWidth" persistent no-click-animation>
        <v-card class="app-modal-card d-flex flex-column">
            <v-card-title class="app-modal-header px-6 pt-5 pb-2 d-flex align-center justify-space-between flex-shrink-0">
                <span class="text-h4 font-weight-bold">{{ title }}</span>
                <v-btn icon variant="text" size="small" @click="emit('cancel')">
                    <v-icon size="18">mdi-close</v-icon>
                </v-btn>
            </v-card-title>

            <v-card-text class="app-modal-body px-6 pb-2 flex-grow-1 overflow-y-auto">
                <div v-if="contentLoading" class="d-flex justify-center align-center py-12">
                    <v-progress-circular indeterminate color="primary" size="48" />
                </div>
                <slot v-else></slot>
            </v-card-text>

            <v-card-actions class="app-modal-footer px-6 pb-5 pt-3 d-flex justify-end ga-2 flex-shrink-0">
                <v-btn variant="text" @click="emit('cancel')">
                    {{ cancel }}
                </v-btn>
                <v-btn color="primary" variant="flat" :loading="loading" :disabled="saveDisabled || contentLoading" @click="emit('save')">
                    {{ save }}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = withDefaults(
    defineProps<{
        modelValue: boolean;
        title: string;
        maxWidth?: number | string;
        saveText?: string;
        cancelText?: string;
        saveDisabled?: boolean;
        loading?: boolean;
        contentLoading?: boolean;
    }>(),
    {
        maxWidth: 500,
        saveText: undefined,
        cancelText: undefined,
        saveDisabled: false,
        loading: false,
        contentLoading: false
    }
);

const emit = defineEmits<{
    'update:modelValue': [value: boolean];
    save: [];
    cancel: [];
}>();

const dialog = computed({
    get: () => props.modelValue,
    set: (value: boolean) => emit('update:modelValue', value)
});

const cancel = computed(() => props.cancelText ?? t('common.cancel'));
const save = computed(() => props.saveText ?? t('common.save'));
</script>

<style scoped>
/* Fixed header and footer: only the body scrolls, so the actions stay visible. */
.app-modal-card {
    max-height: 90vh;
}

.app-modal-body {
    min-height: 0;
}

.app-modal-header,
.app-modal-footer {
    background: rgb(var(--v-theme-surface));
}
</style>
