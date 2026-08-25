<template>
    <component :is="item" :size="level && level > 0 ? 14 : 20" stroke-width="1.5" class="iconClass" />
</template>

<script setup lang="ts">
defineOptions({ name: 'SidebarIcon' });

defineProps<{
    item?: unknown;
    level?: number;
}>();
</script>
