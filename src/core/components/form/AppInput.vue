<template>
    <v-text-field
        variant="outlined"
        hide-details
        v-model="model"
        :label="label"
        :type="type"
        :density="density"
        :disabled="disabled"
        :prefix="prefix"
        :required="required"
        v-bind="{ ...$attrs, ...validationAttrs }"
        @blur="v$?.$touch()"
        @input="v$?.$touch()"
    ></v-text-field>
</template>

<script setup lang="ts" generic="T">
import { computed } from 'vue';
import type { VuelidateField } from '../../types/validation.type';

defineOptions({ inheritAttrs: false });

const props = defineProps<{
    modelValue?: T;
    label: string;
    type?: string;
    density?: 'default' | 'comfortable' | 'compact';
    disabled?: boolean;
    prefix?: string;
    required?: boolean;
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
