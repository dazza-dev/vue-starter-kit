import type { Component } from 'vue';

export interface PillTabItem {
    value: string;
    text: string;
    icon: Component;
}

export interface PillTabBreakpoints {
    mobile: number;
    desktop: number;
}
