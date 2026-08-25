<template>
    <v-text-field
        variant="outlined"
        hide-details
        v-model="model"
        :label="label"
        :type="show ? 'text' : 'password'"
        :density="density"
        :disabled="disabled"
        :required="required"
        :append-inner-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
        :autocomplete="autocomplete"
        v-bind="{ ...$attrs, ...validationAttrs }"
        @click:append-inner="show = !show"
        @blur="v$?.$touch()"
        @input="v$?.$touch()"
    ></v-text-field>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { VuelidateField } from '../../types/validation.type';

defineOptions({ inheritAttrs: false });

const props = defineProps<{
    modelValue?: string;
    label: string;
    density?: 'default' | 'comfortable' | 'compact';
    disabled?: boolean;
    required?: boolean;
    autofill?: boolean;
    v$?: VuelidateField;
}>();

const emit = defineEmits<{
    'update:modelValue': [value: string];
}>();

const show = ref(false);

// Autocomplete off by default; enable it with the `autofill` prop.
const autocomplete = computed(() => (props.autofill ? 'current-password' : 'new-password'));

const model = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value as string)
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
