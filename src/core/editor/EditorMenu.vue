<template>
    <div>
        <div class="menu-item" :class="{ 'is-active': isActive ? isActive() : null }" @click="action" :title="title">
            <svg class="remix">
                <use :xlink:href="`${remixiconUrl}#ri-${icon}`" />
            </svg>
        </div>
    </div>
</template>

<script setup lang="ts">
import remixiconUrl from 'remixicon/fonts/remixicon.symbol.svg';

defineProps<{
    icon?: string;
    title?: string;
    action?: () => void;
    isActive?: () => boolean;
}>();
</script>

<style lang="scss">
.menu-item {
    width: 1.75rem;
    height: 1.75rem;
    color: inherit;
    border: none;
    background-color: transparent;
    border-radius: 0.4rem;
    padding: 0.25rem;
    margin-right: 0.25rem;

    svg {
        width: 100%;
        height: 100%;
        fill: currentColor;
    }

    &.is-active,
    &:hover {
        color: #fff;
        background-color: rgb(var(--v-theme-primary));
    }
}

.variable {
    cursor: pointer;
    border-radius: 0.4rem;
    margin-right: 0.25rem;
    flex: 1;
    position: relative;
    padding: 5px;
    padding-left: 30px;

    &.is-active,
    &:hover {
        color: #fff;
        background-color: rgb(var(--v-theme-primary));

        select {
            color: #fff;
        }
    }

    svg {
        fill: currentColor;
        width: 22px;
        height: 22px;
        position: absolute;
        left: 4px;
        top: 4px;
    }

    select {
        cursor: pointer;
    }
}
</style>
