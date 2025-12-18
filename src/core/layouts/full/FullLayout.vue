<template>
    <v-locale-provider>
        <v-app
            :theme="customizer.activeTheme"
            :class="[
                'verticalLayout',
                customizer.activeTheme,
                customizer.miniSidebar ? 'mini-sidebar' : '',
                customizer.setBorderCard ? 'cardBordered' : ''
            ]"
        >
            <Customizer />
            <Sidebar />
            <Header />

            <v-main>
                <v-container fluid class="page-wrapper pb-sm-15 pb-10">
                    <div :class="customizer.boxed ? 'maxWidth' : ''">
                        <RouterView />
                        <v-btn
                            class="customizer-btn"
                            size="large"
                            icon
                            variant="flat"
                            color="primary"
                            @click.stop="customizer.SET_CUSTOMIZER_DRAWER(!customizer.customizerDrawer)"
                        >
                            <SettingsIcon />
                        </v-btn>
                    </div>
                </v-container>
            </v-main>
        </v-app>
    </v-locale-provider>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import Sidebar from '@/core/layouts/full/sidebar/Sidebar.vue';
import Header from '@/core/layouts/full/header/Header.vue';
import Customizer from '@/core/layouts/full/widgets/customizer/Customizer.vue';
import { useCustomizerStore } from '@/core/stores/customizer';
const customizer = useCustomizerStore();
</script>
