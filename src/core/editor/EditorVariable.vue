<template>
    <div class="variable">
        <svg class="remix">
            <use :xlink:href="`${remixiconUrl}#ri-add-circle-line`" />
        </svg>
        <select @change="insertVariable($event)">
            <option value="">{{ title }}</option>
            <option v-for="variable in variables" :key="variable.variable" :value="variable.variable">
                {{ variable.title }}
            </option>
        </select>
    </div>
</template>

<script setup lang="ts">
import remixiconUrl from 'remixicon/fonts/remixicon.symbol.svg';
import type { Editor } from '@tiptap/vue-3';

interface VariableOption {
    variable: string;
    title: string;
}

const props = defineProps<{
    editor: Editor;
    title?: string;
    variables?: VariableOption[];
}>();

function insertVariable(event: Event) {
    const select = event.target as HTMLSelectElement;
    const variable = select.value;
    if (variable && props.editor) {
        props.editor.chain().focus().insertContent(`{{${variable}}} `).run();
        select.value = '';
    }
}
</script>
