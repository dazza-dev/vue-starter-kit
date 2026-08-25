<template>
    <svg viewBox="0 0 520 244" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
        <g stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round">
            <path d="M118 40 L30 152 H150" />
            <path d="M118 40 V200" />
            <path d="M458 40 L370 152 H490" />
            <path d="M458 40 V200" />
        </g>
        <g stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round">
            <path d="M260 40 A62 80 0 0 0 260 200" transform="rotate(-3 260 120) translate(-9,2)" />
            <path d="M260 40 A62 80 0 0 1 260 200" transform="rotate(3 260 120) translate(9,-2)" />
        </g>
        <path
            d="M261 36 L246 76 L274 104 L242 134 L268 166 L252 204"
            stroke="currentColor"
            stroke-width="10"
            stroke-linecap="round"
            stroke-linejoin="round"
            opacity="0.5"
        />
        <g fill="currentColor">
            <path d="M238 216 l15 -6 -3 15 z" opacity="0.38" />
            <path d="M274 224 l12 -8 3 13 z" opacity="0.24" />
        </g>
    </svg>
</template>

<script setup lang="ts">
// Everything is currentColor, so the parent sets the theme color.
defineOptions({ name: 'NotFoundArt' });
</script>

<style scoped>
svg {
    display: block;
    width: 100%;
    height: auto;
}
</style>
