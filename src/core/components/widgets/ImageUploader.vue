<template>
    <div class="image-uploader">
        <div class="image-uploader-card">
            <div class="image-uploader-preview" :class="{ 'image-uploader-preview--dark': dark }">
                <img v-if="modelValue" :src="modelValue" :alt="altText" />
                <PhotoIcon v-else :size="40" stroke-width="1.5" class="image-uploader-placeholder-icon" />
                <div v-if="loading" class="image-uploader-loading-overlay">
                    <v-progress-circular indeterminate color="primary" size="32" />
                </div>
            </div>
            <div class="image-uploader-actions">
                <button type="button" class="image-uploader-btn" :disabled="loading" @click="openFileDialog">
                    <UploadIcon :size="18" stroke-width="2" />
                    <span>{{ $t('common.change') }}</span>
                </button>
                <button
                    type="button"
                    class="image-uploader-btn image-uploader-btn--danger"
                    :disabled="loading || !modelValue"
                    @click="onRemove"
                >
                    <TrashIcon :size="18" stroke-width="2" />
                    <span>{{ $t('common.remove') }}</span>
                </button>
            </div>
        </div>
        <div v-if="helpText" class="text-caption text-medium-emphasis mt-1">{{ helpText }}</div>
        <div v-if="error" class="text-caption text-error mt-1">{{ error }}</div>
        <input ref="fileInput" type="file" :accept="accept" class="d-none" @change="onFilePick" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { UploadIcon, TrashIcon, PhotoIcon } from 'vue-tabler-icons';

const MIME_LABELS: Record<string, string> = {
    'image/png': 'PNG',
    'image/jpeg': 'JPG',
    'image/webp': 'WebP',
    'image/gif': 'GIF',
    'image/svg+xml': 'SVG'
};

interface Props {
    modelValue: string;
    uploadFn: (file: File) => Promise<string>;
    accept?: string;
    dark?: boolean;
    helpText?: string;
    altText?: string;
    maxSizeMb?: number;
}

const props = withDefaults(defineProps<Props>(), {
    accept: 'image/png,image/jpeg',
    dark: false,
    helpText: undefined,
    altText: 'image',
    maxSizeMb: 1
});

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
    (e: 'error', message: string): void;
}>();

const { t } = useI18n();
const fileInput = ref<HTMLInputElement | null>(null);
const loading = ref(false);
const error = ref<string | null>(null);

const openFileDialog = () => {
    error.value = null;
    fileInput.value?.click();
};

// Resets the <input> so the same file can be picked again after removing it.
const resetFileInput = () => {
    if (fileInput.value) fileInput.value.value = '';
};

// MIME types from `accept` without wildcards: the dialog filter can be bypassed, so we enforce it here.
const restrictedTypes = (): string[] => {
    const patterns = props.accept
        .split(',')
        .map((p) => p.trim())
        .filter(Boolean);
    return patterns.some((p) => p.endsWith('/*')) ? [] : patterns;
};

const onFilePick = async (e: Event) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;

    const allowedTypes = restrictedTypes();
    if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
        const formats = allowedTypes.map((type) => MIME_LABELS[type] ?? type).join(', ');
        const message = t('common.invalidFormat', { formats });
        error.value = message;
        emit('error', message);
        resetFileInput();
        return;
    }

    if (file.size > props.maxSizeMb * 1024 * 1024) {
        const message = t('common.fileTooLarge', { max: props.maxSizeMb });
        error.value = message;
        emit('error', message);
        resetFileInput();
        return;
    }

    loading.value = true;
    error.value = null;
    try {
        const url = await props.uploadFn(file);
        emit('update:modelValue', url);
    } catch {
        const message = t('common.uploadFailed');
        error.value = message;
        emit('error', message);
    } finally {
        loading.value = false;
        resetFileInput();
    }
};

const onRemove = () => {
    emit('update:modelValue', '');
    resetFileInput();
};
</script>

<style scoped>
.image-uploader-card {
    border: 1px solid rgb(var(--v-theme-borderColor));
    border-radius: 10px;
    overflow: hidden;
    background: rgb(var(--v-theme-surface));
}

.image-uploader-preview {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 130px;
    padding: 24px 16px;
    background: rgba(var(--v-theme-textPrimary), 0.04);
}

.image-uploader-preview--dark {
    background: #1f2937;
}

.image-uploader-preview img {
    max-height: 76px;
    max-width: 100%;
    object-fit: contain;
}

.image-uploader-placeholder-icon {
    color: rgba(var(--v-theme-textPrimary), 0.28);
}

.image-uploader-preview--dark .image-uploader-placeholder-icon {
    color: rgba(255, 255, 255, 0.4);
}

.image-uploader-loading-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(var(--v-theme-surface), 0.7);
}

.image-uploader-preview--dark .image-uploader-loading-overlay {
    background: rgba(0, 0, 0, 0.4);
}

.image-uploader-actions {
    display: flex;
    border-top: 1px solid rgb(var(--v-theme-borderColor));
}

.image-uploader-btn {
    flex: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 10px 12px;
    background: transparent;
    border: none;
    color: inherit;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.15s;
}

.image-uploader-btn:not(:last-child) {
    border-right: 1px solid rgb(var(--v-theme-borderColor));
}

.image-uploader-btn:hover:not(:disabled) {
    background: rgba(var(--v-theme-textPrimary), 0.06);
}

.image-uploader-btn--danger {
    color: rgb(var(--v-theme-error));
}

.image-uploader-btn--danger:hover:not(:disabled) {
    background: rgba(var(--v-theme-error), 0.08);
}

.image-uploader-btn:disabled {
    opacity: 0.45;
    cursor: not-allowed;
}
</style>
