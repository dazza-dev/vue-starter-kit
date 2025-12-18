<template>
    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-row>
        <v-col cols="12" md="12">
            <ParentCard title="Simple Title"> test </ParentCard>
        </v-col>
    </v-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import BaseBreadcrumb from '@/core/layouts/full/breadcrumb/Breadcrumb.vue';
import ParentCard from '@/core/components/cards/ParentCard.vue';

const page = ref({ title: 'Sample Page' });
const breadcrumbs = ref([
    {
        text: 'Dashboard',
        disabled: false,
        href: '#'
    },
    {
        text: 'Sample Page',
        disabled: true,
        href: '#'
    }
]);
</script>
