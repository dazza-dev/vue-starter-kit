<template>
    <v-card class="bg-lightprimary elevation-0 rounded-md mb-8">
        <div class="px-8 py-8">
            <div class="d-flex justify-space-between">
                <div class="d-flex py-0 align-center">
                    <div>
                        <h3 class="text-h3 mb-2">{{ title }}</h3>
                        <nav class="d-flex align-center flex-wrap ga-1 mt-1">
                            <template v-for="(item, i) in breadcrumbs" :key="i">
                                <span v-if="i > 0" class="text-subtitle-2 text-medium-emphasis">•</span>
                                <router-link
                                    v-if="item.href && !item.disabled"
                                    :to="item.href"
                                    class="text-subtitle-2 text-decoration-none text-textPrimary"
                                    >{{ item.title }}</router-link
                                >
                                <span v-else class="text-subtitle-2 text-medium-emphasis">{{ item.title }}</span>
                            </template>
                        </nav>
                    </div>
                </div>
                <div v-if="image" class="d-none py-0 d-lg-block overflow-hidden">
                    <div class="breadcrumb-image" :style="{ backgroundImage: `url(${image})` }"></div>
                </div>
            </div>
        </div>
    </v-card>
</template>

<script setup lang="ts">
defineOptions({ name: 'BreadcrumbBar' });

import { RouterLink } from 'vue-router';
import type { BreadcrumbItem } from '../../types/breadcrumb.type';

defineProps<{
    title?: string;
    breadcrumbs?: BreadcrumbItem[];
    image?: string;
}>();
</script>

<style lang="scss" scoped>
.breadcrumb-image {
    display: block;
    width: 120px;
    height: 120px;
    background-size: cover;
    background-position: center;
}
</style>
