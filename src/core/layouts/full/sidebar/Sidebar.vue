<template>
    <v-navigation-drawer
        left
        v-model="customizer.sidebarDrawer"
        elevation="0"
        rail-width="75"
        app
        class="leftSidebar"
        :rail="customizer.miniSidebar"
        expand-on-hover
        width="270"
    >
        <!--- Logo -->
        <div class="pa-5">
            <Logo />
        </div>

        <!-- ---------------------------------------------- -->
        <!---Navigation -->
        <!-- ---------------------------------------------- -->
        <perfect-scrollbar class="scrollnavbar">
            <v-list class="pa-6">
                <!---Menu Loop -->
                <template v-for="(item, i) in sidebarMenu">
                    <!---Item Sub Header -->
                    <NavGroup :item="item" v-if="item.header" :key="item.title" />
                    <!---If Has Child -->
                    <NavCollapse class="leftPadding" :item="item" :level="0" v-else-if="item.children" />
                    <!---Single Item-->
                    <NavItem :item="item" v-else class="leftPadding" />
                    <!---End Single Item-->
                </template>
            </v-list>
        </perfect-scrollbar>
    </v-navigation-drawer>
</template>

<script setup lang="ts">
import { shallowRef } from 'vue';
import { useCustomizerStore } from '@/core/stores/customizer';
import sidebarItems from './sidebarItem';
import NavGroup from './NavGroup.vue';
import NavItem from './NavItem.vue';
import NavCollapse from './NavCollapse.vue';
import Logo from '@/core/components/logo/Logo.vue';

const customizer = useCustomizerStore();
const sidebarMenu = shallowRef(sidebarItems);
</script>
