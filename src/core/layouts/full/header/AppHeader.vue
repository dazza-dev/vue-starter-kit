<template>
    <v-app-bar elevation="10" height="70">
        <v-btn
            class="hidden-md-and-down"
            icon
            color="primary"
            variant="text"
            @click.stop="customizer.setMiniSidebar(!customizer.miniSidebar)"
        >
            <Menu2Icon size="20" stroke-width="1.5" />
        </v-btn>
        <v-btn class="hidden-lg-and-up" icon variant="flat" @click.stop="customizer.toggleSidebarDrawer" size="small">
            <Menu2Icon size="20" stroke-width="1.5" />
        </v-btn>

        <NavigationMenu />

        <v-spacer />

        <ModeToggle />
        <NotificationsMenu />
        <LanguageSwitcher />
        <ProfileMenu />
    </v-app-bar>
</template>

<script setup lang="ts">
defineOptions({ name: 'AppHeader' });

import { useCustomizerStore } from '../../../stores/customizer';
import { Menu2Icon } from 'vue-tabler-icons';
import NavigationMenu from '../../../widgets/NavigationMenu.vue';
import NotificationsMenu from '../../../widgets/NotificationsMenu.vue';
import ProfileMenu from '../../../widgets/ProfileMenu.vue';
import ModeToggle from '../../../widgets/ModeToggle.vue';
import LanguageSwitcher from '../../../components/widgets/LanguageSwitcher.vue';

const customizer = useCustomizerStore();
</script>
