<script setup lang="ts">
import { type PropType, ref, watch } from "vue";

interface IDropdownOption {
    value: string | number;
    label: string;
    description?: string;
}

const props = defineProps({
    modelValue: {
        required: true
    },
    options: {
        type: Array as PropType<IDropdownOption[]>,
        required: true
    }
});

const value = ref(props.modelValue);
watch(
    () => props.modelValue,
    (newValue) => (value.value = newValue)
);

const emit = defineEmits(["update:modelValue"]);

const select = (newValue: any) => {
    emit("update:modelValue", newValue);
};
</script>
<template>
    <div class="dropdown">
        <div
            class="option"
            v-for="option in options"
            :key="option.value"
            @click="select(option.value)"
            :class="{ selected: option.value === value }"
        >
            <slot
                name="label"
                :option="option"
            />
        </div>
    </div>
</template>
<style scoped>
@import "questions/common.css";

.dropdown {
    isolation: isolate;
}

.option {
    cursor: pointer;
    border: none;
    border-radius: 0;
    border: 2px solid var(--bg-base-lt);
    position: relative;

    &:first-child {
        border-top-left-radius: 0.8em;
        border-top-right-radius: 0.8em;
    }

    &:last-child {
        border-bottom-left-radius: 0.8em;
        border-bottom-right-radius: 0.8em;
    }

    &:not(:last-child) {
        border-bottom: 0;

        &:after {
            content: "";
            position: absolute;
            left: -2px;
            right: -2px;
            bottom: -1px;
            height: 2px;
            background: var(--bg-base-lt);
            z-index: 1;
        }

        &.selected::after {
            background: var(--c-blue);
            z-index: 10;
        }
    }

    &:not(:first-child) {
        border-top: 0;

        &:before {
            content: "";
            position: absolute;
            left: -2px;
            right: -2px;
            top: -1px;
            height: 2px;
            background: var(--bg-base-lt);
            z-index: 1;
        }

        &.selected::before {
            background: var(--c-blue);
            z-index: 10;
        }
    }
}
</style>
