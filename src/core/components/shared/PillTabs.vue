<template>
    <div>
        <v-container fluid class="pa-0">
            <v-row dense class="ma-0">
                <v-col
                    v-for="(tabItem, index) in items"
                    :key="tabItem.value"
                    :cols="breakpoints.mobile"
                    :md="breakpoints.desktop"
                    class="pa-1"
                >
                    <v-btn
                        :value="tabItem.value"
                        :class="['w-100', modelValue === tabItem.value ? 'bg-primary' : 'bg-lightprimary text-white']"
                        variant="tonal"
                        rounded="lg"
                        @click="emit('update:modelValue', tabItem.value)"
                        height="40"
                        class="px-2"
                    >
                        <component :is="tabItem.icon" class="mr-1" size="16" />
                        <span class="text-caption text-truncate"> {{ showNumbers ? `${index + 1}.` : '' }} {{ tabItem.text }} </span>
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>

        <slot></slot>
    </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'PillTabs' });

import type { PillTabItem, PillTabBreakpoints } from '../../types/pill-tabs.type';

withDefaults(
    defineProps<{
        modelValue: string;
        items: PillTabItem[];
        showNumbers?: boolean;
        breakpoints?: PillTabBreakpoints;
    }>(),
    {
        showNumbers: true,
        breakpoints: () => ({ mobile: 12, desktop: 12 })
    }
);

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
}>();
</script>
