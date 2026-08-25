<template>
    <v-autocomplete
        variant="outlined"
        hide-details
        v-model="model"
        :label="label"
        :items="items"
        :density="density"
        :clearable="clearable"
        :multiple="multiple"
        :disabled="disabled"
        v-bind="{ ...$attrs, ...validationAttrs }"
        @blur="v$?.$touch()"
        @input="v$?.$touch()"
    ></v-autocomplete>
</template>

<script setup lang="ts" generic="T">
import { computed } from 'vue';
import type { VuelidateField } from '../../types/validation.type';

defineOptions({ inheritAttrs: false });

const props = defineProps<{
    modelValue?: T;
    label: string;
    items: unknown[];
    density?: 'default' | 'comfortable' | 'compact';
    clearable?: boolean;
    multiple?: boolean;
    disabled?: boolean;
    v$?: VuelidateField;
}>();

const emit = defineEmits<{
    'update:modelValue': [value: T];
}>();

const model = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value as T)
});

const validationAttrs = computed(() => {
    if (!props.v$) {
        return {};
    }
    return {
        'error-messages': props.v$.$errors.map((e) => String(e.$message))
    };
});
</script>
