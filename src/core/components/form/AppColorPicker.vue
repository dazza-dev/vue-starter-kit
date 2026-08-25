<template>
    <div>
        <div v-if="label" class="text-body-2 mb-1 text-medium-emphasis">{{ label }}</div>
        <v-menu v-model="menu" :close-on-content-click="false" location="bottom start">
            <template #activator="{ props: menuProps }">
                <div
                    v-bind="menuProps"
                    class="app-color-picker__swatch"
                    :class="{ 'app-color-picker__swatch--error': hasErrors }"
                    :style="{ backgroundColor: model ?? '#E0E0E0' }"
                    :title="model ?? placeholder"
                >
                    <v-icon v-if="!model" size="18" color="grey-darken-1">mdi-eyedropper</v-icon>
                </div>
            </template>

            <v-card elevation="4" rounded="lg">
                <v-color-picker v-model="model" mode="hex" hide-inputs />
                <v-card-actions class="pt-0 px-4 pb-3">
                    <v-text-field
                        v-model="model"
                        density="compact"
                        variant="outlined"
                        hide-details
                        :placeholder="placeholder"
                        clearable
                        @click:clear="model = null"
                    />
                    <v-btn variant="text" class="ml-2" @click="menu = false">OK</v-btn>
                </v-card-actions>
            </v-card>
        </v-menu>
        <div v-if="hasErrors" class="text-caption text-error mt-1">
            {{ errorMessages[0] }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import type { VuelidateField } from '../../types/validation.type';

const props = defineProps<{
    modelValue?: string | null;
    label?: string;
    placeholder?: string;
    v$?: VuelidateField;
}>();

const emit = defineEmits<{
    'update:modelValue': [value: string | null];
}>();

const menu = ref(false);

const model = computed({
    get: () => props.modelValue ?? null,
    set: (value) => emit('update:modelValue', value)
});

const errorMessages = computed(() => props.v$?.$errors.map((e) => String(e.$message)) ?? []);
const hasErrors = computed(() => errorMessages.value.length > 0);
</script>

<style scoped>
.app-color-picker__swatch {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    border: 2px solid rgba(0, 0, 0, 0.12);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: border-color 0.2s;
}

.app-color-picker__swatch:hover {
    border-color: rgba(0, 0, 0, 0.38);
}

.app-color-picker__swatch--error {
    border-color: rgb(var(--v-theme-error));
}
</style>
