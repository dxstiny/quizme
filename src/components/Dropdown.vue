<script setup lang="ts">
import { type PropType, ref, watch } from "vue";

interface IDropdownOption {
    value: string;
    label: string;
}

const props = defineProps({
    modelValue: {
        type: String,
        required: true
    },
    options: {
        type: Array as PropType<IDropdownOption[]>,
        required: true
    },
    label: {
        type: String,
        required: false
    },
    onChange: {
        type: Function as PropType<(value: string) => boolean>,
        required: false
    }
});

const value = ref(props.modelValue);
const emit = defineEmits(["update:modelValue"]);
watch(
    () => props.modelValue,
    (newValue) => (value.value = newValue)
);
watch(value, (newValue) => {
    if (props.onChange) {
        if (!props.onChange(newValue)) {
            value.value = props.modelValue;
        }
        return;
    }

    emit("update:modelValue", newValue);
});
</script>
<template>
    <div class="dropdown">
        <label v-if="label">
            {{ label }}
        </label>
        <select v-model="value">
            <option
                v-for="option in options"
                :value="option.value"
            >
                {{ option.label }}
            </option>
        </select>
    </div>
</template>
<style scoped>
select {
    border: 2px solid var(--bg-base-lt);
    border-radius: 0.8em;
    padding: 0.5em;
    font-size: 1rem;
    font-family: inherit;
    background: var(--bg-base);
    color: var(--fg-base);

    &:focus {
        outline: none;
    }
}

.dropdown {
    display: flex;
    flex-direction: column;
    gap: 0.5em;

    & label {
        font-weight: 900;
        text-transform: uppercase;
        font-size: 0.8rem;
    }
}
</style>
