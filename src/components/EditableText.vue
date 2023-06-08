<script setup lang="ts">
import { nextTick, ref, watch } from "vue";

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
    }
});

const value = ref(props.modelValue);
watch(
    () => props.modelValue,
    (newValue) => (value.value = newValue)
);

const editing = ref(false);
const emit = defineEmits(["update:modelValue"]);
const area = ref(null as HTMLTextAreaElement | null);
const startEditing = () => {
    if (props.locked) return;

    editing.value = true;

    nextTick(() => {
        if (!area.value) return;
        area.value.focus();
    });
};
</script>
<template>
    <div
        class="editable-text"
        @dblclick="startEditing"
    >
        <slot v-if="!editing" />
        <textarea
            v-else
            ref="area"
            v-model="value"
            :class="{ outlined: !noOutline }"
            @input="
                emit(
                    'update:modelValue',
                    ($event.target as HTMLTextAreaElement).value
                )
            "
            @keydown.enter="editing = false"
            @keydown.esc="editing = false"
            @blur="editing = false"
            @focusout="editing = false"
        />
    </div>
</template>
<style scoped>
textarea {
    width: 100%;
    border: none;
    background: none;
    font-size: 1em;
    font-weight: 900;
    font-family: inherit;
    color: inherit;
    outline: none;
    color: var(--fg-base);

    &.title {
        font-size: 2rem;
        font-weight: 900;
    }

    &.outlined {
        border: 2px solid var(--bg-base-lt);
        border-radius: 0.5em;
    }
}
</style>
