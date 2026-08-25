<template>
    <v-menu :close-on-content-click="false" location="bottom">
        <template v-slot:activator="{ props }">
            <v-btn icon variant="text" color="primary" v-bind="props">
                <v-avatar size="22">
                    <img v-if="locale === 'en'" :src="flagEn" :alt="locale" width="22" height="22" class="obj-cover" />
                    <img v-if="locale === 'es'" :src="flagEs" :alt="locale" width="22" height="22" class="obj-cover" />
                    <img v-if="locale === 'pt'" :src="flagPt" :alt="locale" width="22" height="22" class="obj-cover" />
                </v-avatar>
            </v-btn>
        </template>
        <v-sheet rounded="md" width="200" elevation="10">
            <v-list class="theme-list">
                <v-list-item
                    v-for="(item, index) in languages"
                    :key="index"
                    color="primary"
                    :active="locale === item.value"
                    class="d-flex align-center"
                    @click="changeLanguage(item.value)"
                >
                    <template v-slot:prepend>
                        <v-avatar size="22">
                            <img :src="item.avatar" :alt="item.avatar" width="22" height="22" class="obj-cover" />
                        </v-avatar>
                    </template>
                    <v-list-item-title class="text-subtitle-1 font-weight-regular">
                        {{ item.title }}
                        <span class="text-disabled text-subtitle-1 pl-2">({{ item.subtext }})</span>
                    </v-list-item-title>
                </v-list-item>
            </v-list>
        </v-sheet>
    </v-menu>
</template>

<script setup lang="ts">
import { setI18nLanguage } from '@/core/plugins/i18n';
defineOptions({ name: 'LanguageSwitcher' });
import { useI18n } from 'vue-i18n';
import flagEn from '@/assets/images/flag/icon-flag-en.svg';
import flagEs from '@/assets/images/flag/icon-flag-es.svg';
import flagPt from '@/assets/images/flag/icon-flag-pt.svg';
import type { LanguageType } from '@/core/types/language.type';

const languages: LanguageType[] = [
    { title: 'English', subtext: 'US', value: 'en', avatar: flagEn },
    { title: 'Español', subtext: 'ES', value: 'es', avatar: flagEs },
    { title: 'Português', subtext: 'PT', value: 'pt', avatar: flagPt }
];

const { locale } = useI18n({ useScope: 'global' });

function changeLanguage(lang: string) {
    locale.value = lang;
    setI18nLanguage(lang);
}
</script>
