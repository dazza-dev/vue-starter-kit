import type { App } from 'vue';

import FormCard from './components/cards/FormCard.vue';
import ParentCard from './components/cards/ParentCard.vue';
import BreadcrumbBar from './components/shared/BreadcrumbBar.vue';
import PageHeader from './components/shared/PageHeader.vue';
import PillTabs from './components/shared/PillTabs.vue';
import TagChip from './components/shared/TagChip.vue';
import TextItem from './components/shared/TextItem.vue';
import ConfirmationModal from './components/modals/ConfirmationModal.vue';

/**
 * Plugin options; `errorPage` keys are i18n keys resolved at render time, falling back to the 404 page's default text when missing.
 */
export interface VuetifyAppKitOptions {
    errorPage?: {
        titleKey?: string;
        descriptionKey?: string;
        backToHomeKey?: string;
        homeRoute?: string;
    };
}

let themeOptions: VuetifyAppKitOptions = {};

export function getThemeOptions(): VuetifyAppKitOptions {
    return themeOptions;
}

export const VuetifyAppKit = {
    install(app: App, options: VuetifyAppKitOptions = {}) {
        themeOptions = options;

        app.component('ParentCard', ParentCard);
        app.component('FormCard', FormCard);
        app.component('BreadcrumbBar', BreadcrumbBar);
        app.component('PageHeader', PageHeader);
        app.component('TagChip', TagChip);
        app.component('ConfirmationModal', ConfirmationModal);
        app.component('PillTabs', PillTabs);
        app.component('TextItem', TextItem);
    }
};

declare module 'vue' {
    interface GlobalComponents {
        ParentCard: typeof ParentCard;
        FormCard: typeof FormCard;
        BreadcrumbBar: typeof BreadcrumbBar;
        PageHeader: typeof PageHeader;
        TagChip: typeof TagChip;
        ConfirmationModal: typeof ConfirmationModal;
        PillTabs: typeof PillTabs;
        TextItem: typeof TextItem;
    }
}
