<template>
    <div v-if="editor">
        <EditorMenubar :editor="editor" :variables="variables" />
    </div>
    <editor-content :editor="editor" />
</template>

<script setup lang="ts">
import { watch, onBeforeUnmount } from 'vue';
import { useEditor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import { Table } from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import EditorMenubar from './EditorMenubar.vue';

const props = defineProps({
    modelValue: {
        type: String,
        default: ''
    },
    variables: Array
});

const emits = defineEmits(['update:modelValue']);

const editor = useEditor({
    extensions: [
        StarterKit,
        Table.configure({
            resizable: true
        }),
        TableRow,
        TableCell,
        TableHeader
    ],
    content: props.modelValue,
    onUpdate: () => {
        emits('update:modelValue', editor.value?.getHTML() ?? '');
    }
});

watch(
    () => props.modelValue,
    (value) => {
        const isSame = editor.value?.getHTML() === value;

        if (!isSame) {
            editor.value?.commands.setContent(value);
        }
    }
);

onBeforeUnmount(() => {
    editor.value?.destroy();
});

defineExpose({
    focus: () => editor.value?.commands.focus()
});
</script>
