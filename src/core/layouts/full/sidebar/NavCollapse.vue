<template>
    <v-list-group no-action>
        <template v-slot:activator="{ props: activatorProps }">
            <v-list-item v-bind="activatorProps" :value="item.title" rounded class="mb-1">
                <template v-slot:prepend>
                    <SidebarIcon :item="item.icon" :level="level" />
                </template>
                <v-list-item-title class="mr-auto">{{ item.title }}</v-list-item-title>
                <v-list-item-subtitle v-if="item.subCaption" class="text-caption mt-n1 hide-menu">
                    {{ item.subCaption }}
                </v-list-item-subtitle>
            </v-list-item>
        </template>
        <template v-if="item.children">
            <template v-for="(subitem, i) in item.children" :key="i">
                <NavCollapse :item="subitem" v-if="subitem.children" :level="level + 1" />
                <NavItem :item="subitem" :level="level + 1" v-else />
            </template>
        </template>
    </v-list-group>
</template>

<script setup lang="ts">
defineOptions({ name: 'NavCollapse' });

import type { MenuItem } from '../../../types/sidebar.type';
import NavItem from './NavItem.vue';
import SidebarIcon from './SidebarIcon.vue';

defineProps<{
    item: MenuItem;
    level: number;
}>();
</script>
