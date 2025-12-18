<template>
    <v-locale-provider>
        <v-app
            :theme="customizer.actTheme"
            :class="[
                'verticalLayout',
                customizer.actTheme,
                customizer.miniSidebar ? 'mini-sidebar' : '',
                customizer.setBorderCard ? 'cardBordered' : ''
            ]"
        >
            <Customizer />
            <VerticalSidebarVue />
            <VerticalHeaderVue />

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
import VerticalSidebarVue from './vertical-sidebar/VerticalSidebar.vue';
import VerticalHeaderVue from './vertical-header/VerticalHeader.vue';
import Customizer from './customizer/Customizer.vue';
import { useCustomizerStore } from '../../../modules/authentication/stores/customizer';
const customizer = useCustomizerStore();
</script>
