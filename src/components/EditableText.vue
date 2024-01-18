<script setup lang="ts">
import { nextTick, ref, watch, computed } from "vue";

const props = defineProps({
    modelValue: {
        type: String,
        required: true
    },
    locked: {
        type: Boolean,
        default: false
    },
    noOutline: {
        type: Boolean,
        default: false
    },
    placeholder: {
        type: String,
        default: "Click to edit"
    }
});

const value = ref(props.modelValue);
watch(
    () => props.modelValue,
    (newValue) => (value.value = newValue)
);

const editing = ref(false);
const emit = defineEmits(["update:modelValue", "change"]);
const area = ref(null as HTMLTextAreaElement | null);
const startEditing = () => {
    if (props.locked) return;

    editing.value = true;

    nextTick(() => {
        if (!area.value) return;
        area.value.focus();
    });
};

const showSlot = computed(() => {
    if (props.locked) return true;
    if (editing.value) return false;
    return value.value;
});

const update = (newValue: string) => {
    value.value = newValue;
    emit("change", newValue);
    emit("update:modelValue", newValue);
};

const autoResize = () => {
    if (!area.value) return;
    area.value.style.height = "auto";
    area.value.style.height = area.value.scrollHeight + "px";
};

const onEnter = (e: KeyboardEvent) => {
    // is shift pressed?
    if (e.shiftKey) {
        value.value += "\n";
        autoResize();
        return;
    }

    e.preventDefault();
    editing.value = !editing.value;
};
</script>
<template>
    <div
        class="editable-text"
        :class="{ outlined: !noOutline && editing }"
        @dblclick.stop="startEditing"
    >
        <slot v-if="showSlot" />
        <textarea
            v-else
            ref="area"
            v-model="value"
            @change="update(($event.target as HTMLInputElement).value)"
            @input="autoResize()"
            @click.stop="editing = true"
            @keydown.enter="onEnter"
            @keydown.esc="editing = false"
            @blur="editing = false"
            :placeholder="placeholder"
        />
    </div>
</template>
<style scoped>
.editable-text {
    &.outlined {
        border: 2px solid var(--bg-base-lt);
        border-radius: 0.5em;
        margin-bottom: 1em;
    }
}

.h1 textarea {
    font-size: 2rem;
    font-weight: 900;
    margin-block-start: 0.67em;
    margin-block-end: 0.67em;
}
</style>
