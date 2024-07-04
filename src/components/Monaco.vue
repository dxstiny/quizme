<script setup lang="ts">
import { read } from "fs";
import * as monaco from "monaco-editor";
import { onMounted, onUnmounted, ref, watch } from "vue";

const props = defineProps({
    language: {
        type: String,
        default: "json"
    },
    modelValue: {
        type: String,
        default: ""
    },
    value: {
        type: String,
        default: ""
    },
    readOnly: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(["update:modelValue"]);

let editor: monaco.editor.IStandaloneCodeEditor;
const container = ref<HTMLDivElement>();

onMounted(() => {
    editor = monaco.editor.create(container.value!, {
        value: props.modelValue,
        language: props.language,
        readOnly: props.readOnly,
        scrollBeyondLastLine: false
    });
    editor.getModel()?.onDidChangeContent(() => {
        emit("update:modelValue", editor.getValue());
    });
});

onUnmounted(() => {
    editor.dispose();
});

const updateEditor = (value: string) => {
    if (editor) {
        editor.setValue(value);
    }
};

watch(() => props.value, updateEditor);
watch(() => props.modelValue, updateEditor);
</script>

<template>
    <div
        ref="container"
        style="height: 100%"
    ></div>
</template>

<style scoped>
div {
    min-height: 80vh;
}
</style>
