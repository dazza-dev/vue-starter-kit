<template>
    <v-app-bar elevation="0" :priority="priority" height="70">
        <v-btn
            class="hidden-md-and-down"
            icon
            color="primary"
            variant="text"
            @click.stop="customizer.SET_MINI_SIDEBAR(!customizer.miniSidebar)"
        >
            <Menu2Icon size="20" stroke-width="1.5" />
        </v-btn>
        <v-btn class="hidden-lg-and-up" icon variant="flat" @click.stop="customizer.SET_SIDEBAR_DRAWER" size="small">
            <Menu2Icon size="20" stroke-width="1.5" />
        </v-btn>

        <!-- ---------------------------------------------- -->
        <!-- Search part -->
        <!-- ---------------------------------------------- -->
        <v-sheet>
            <Search />
        </v-sheet>
        <!---/Search part -->

        <v-spacer />
        <!-- ---------------------------------------------- -->
        <!---right part -->
        <!-- ---------------------------------------------- -->
        <!-- ---------------------------------------------- -->
        <!-- translate -->
        <!-- ---------------------------------------------- -->
        <Language />

        <!-- ---------------------------------------------- -->
        <!-- Notification -->
        <!-- ---------------------------------------------- -->
        <Notifications />

        <!-- right sidebar -->
        <v-btn variant="text" color="primary" class="hidden-lg-and-up" icon @click.stop="appsDrawer = !appsDrawer">
            <GridDotsIcon size="17" stroke-width="1.5" />
        </v-btn>

        <!-- ---------------------------------------------- -->
        <!-- User Profile -->
        <!-- ---------------------------------------------- -->
        <div class="ml-2">
            <Profile />
        </div>
    </v-app-bar>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useCustomizerStore } from '@/core/stores/customizer';
import { GridDotsIcon, Menu2Icon } from 'vue-tabler-icons';
import Language from '@/core/layouts/full/widgets/language/Language.vue';
import Notifications from '@/core/layouts/full/widgets/notifications/Notifications.vue';
import Profile from '@/core/layouts/full/widgets/profile/Profile.vue';
import Search from '@/core/layouts/full/widgets/search/Search.vue';

const customizer = useCustomizerStore();
const appsDrawer = ref(false);
const priority = ref(0);

watch(priority, (newPriority) => {
    priority.value = newPriority;
});
</script>
