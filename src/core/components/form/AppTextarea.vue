<template>
    <v-textarea
        variant="outlined"
        hide-details
        v-model="model"
        :label="label"
        :disabled="disabled"
        v-bind="{ ...$attrs, ...validationAttrs }"
        @blur="v$?.$touch()"
        @input="v$?.$touch()"
    ></v-textarea>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { VuelidateField } from '../../types/validation.type';

defineOptions({ inheritAttrs: false });

const props = defineProps<{
    modelValue: string | null;
    label?: string;
    disabled?: boolean;
    v$?: VuelidateField;
}>();

const emit = defineEmits<{
    'update:modelValue': [value: string | null];
}>();

const model = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
});

const validationAttrs = computed(() => {
    if (!props.v$) return {};
    return {
        'error-messages': props.v$.$errors.map((e) => String(e.$message))
    };
});
</script>
