<script lang="ts" setup>
const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    },
    label: {
        type: String,
        default: ""
    }
});

const emit = defineEmits(["update:modelValue"]);

const toggle = () => {
    emit("update:modelValue", !props.modelValue);
};
</script>
<template>
    <div class="switch">
        <div
            class="toggle-switch"
            :class="{ 'toggle-switch--on': modelValue }"
            @click="toggle"
        />
        <label>{{ label }}</label>
    </div>
</template>
<style>
.switch {
    display: flex;
    align-items: center;
    gap: 0.5em;
}

.toggle-switch {
    align-items: center;
    background: var(--bg-base-lt);
    border-radius: 12px;
    display: inline-flex;
    flex-shrink: 0;
    height: 24px;
    position: relative;
    transition: background 0.1s;
    width: 57px;
    cursor: pointer;

    &:before {
        content: "";
        background: white;
        border: solid var(--bg-base-lt);
        border-radius: 10px;
        border-width: 2px 2px 4px;
        box-sizing: border-box;
        height: 34px;
        left: 0;
        position: absolute;
        transition: left 0.2s;
        width: 32px;
    }
}

.toggle-switch--on {
    background-color: var(--fg-blue);

    &:before {
        border-color: var(--fg-blue);
        left: 25px;
    }
}
</style>
