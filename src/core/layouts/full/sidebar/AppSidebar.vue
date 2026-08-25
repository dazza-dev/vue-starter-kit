<template>
    <v-navigation-drawer
        left
        v-model="customizer.sidebarDrawer"
        elevation="0"
        rail-width="75"
        app
        class="leftSidebar sidebar-dark"
        :rail="customizer.miniSidebar"
        expand-on-hover
        width="270"
    >
        <RouterLink :to="{ name: 'app-dashboard' }" class="sidebar-logo pa-2">
            <AppLogo />
        </RouterLink>

        <PerfectScrollbar class="scrollnavbar">
            <v-list class="pa-6">
                <template v-for="item in sidebarItems" :key="item.title">
                    <NavGroup :item="item" v-if="item.header" />
                    <NavCollapse class="leftPadding" :item="item" :level="0" v-else-if="item.children" />
                    <NavItem :item="item" v-else class="leftPadding" />
                </template>
            </v-list>
        </PerfectScrollbar>
    </v-navigation-drawer>
</template>

<script setup lang="ts">
defineOptions({ name: 'AppSidebar' });

import { PerfectScrollbar } from 'vue3-perfect-scrollbar';
import { useCustomizerStore } from '../../../stores/customizer';
import { sidebarItems } from '../../../sidebar/useSidebarItems';
import AppLogo from '../../../components/AppLogo.vue';
import NavGroup from './NavGroup.vue';
import NavItem from './NavItem.vue';
import NavCollapse from './NavCollapse.vue';

const customizer = useCustomizerStore();
</script>
