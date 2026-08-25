<template>
    <div class="d-flex align-start justify-space-between mb-6">
        <div>
            <h2 class="text-h2 font-weight-bold text-black">{{ title }}</h2>
            <p v-if="subtitle" class="text-body-1 text-medium-emphasis mt-1">{{ subtitle }}</p>
        </div>
        <div v-if="$slots.actions" class="page-header-actions d-flex ga-2 align-center flex-shrink-0 ml-4">
            <slot name="actions" />
        </div>
    </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'PageHeader' });

defineProps<{
    title: string;
    subtitle?: string;
}>();
</script>
