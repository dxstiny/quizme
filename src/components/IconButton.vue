<script lang="ts" setup>
import { type PropType } from "vue";

defineProps({
    icon: {
        type: String,
        required: false
    },
    label: {
        type: String,
        required: false
    },
    type: {
        type: String as PropType<
            | "minimal-blue"
            | "minimal-green"
            | "minimal-red"
            | "minimal-grey"
            | "action-blue"
            | "action-green"
            | "action-red"
            | "submit"
        >,
        default: "minimal-blue"
    },
    disabled: {
        type: Boolean,
        default: false
    }
});
</script>
<template>
    <button
        class="icon-button"
        :class="type + (disabled ? ' disabled' : '')"
        :disabled="disabled"
    >
        <span
            v-if="icon"
            class="material-symbols-rounded"
            >{{ icon }}</span
        >
        <span
            v-if="label"
            class="label"
            >{{ label }}</span
        >
    </button>
</template>
<style scoped>
.material-symbols-rounded {
    margin-right: 0.5em;
}

.icon-button {
    --border: var(--c-blue);
    --text: white;
    --back: var(--c-blue);
    --border-hover: var(--c-blue-light);
    --text-hover: white;
    --back-hover: var(--c-blue-light);

    min-width: 150px;

    padding: 0.5em;
    border: 2px solid var(--border);
    border-radius: 1em;
    font-size: 1.2rem;
    text-transform: uppercase;
    font-weight: 900;
    background-color: var(--back);
    color: var(--text);
    font-family: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.1s ease-in-out;

    &:hover {
        border-color: var(--border-hover);
        color: var(--text-hover);
        background-color: var(--back-hover);
    }

    &.minimal-blue {
        --border: var(--bg-base-ltr);
        --text: var(--fg-blue);
        --back: var(--highlight);
        --border-hover: var(--bg-base-ltr);
        --text-hover: var(--fg-blue);
        --back-hover: var(--bg-base-lt);
    }

    &.minimal-grey {
        --border: var(--bg-base-lt);
        --text: var(--bg-base-ltr);
        --back: none;
        --border-hover: var(--bg-base-ltr);
        --text-hover: var(--fg-base-mute);
        --back-hover: var(--bg-base-lt);
    }

    &.action-green,
    &.submit {
        --border: var(--c-green);
        --text: white;
        --back: var(--c-green);
        --border-hover: var(--c-green-lt);
        --text-hover: white;
        --back-hover: var(--c-green-lt);
    }

    &.action-red {
        --border: var(--c-red);
        --text: white;
        --back: var(--c-red);
        --border-hover: var(--c-red-lt);
        --text-hover: white;
        --back-hover: var(--c-red-lt);
    }

    &.disabled {
        --border: var(--bg-base-lt);
        --text: var(--fg-base-mute);
        --back: var(--bg-base-lt);
        --border-hover: var(--bg-base-lt);
        --text-hover: var(--fg-base-mute);
        --back-hover: var(--bg-base-lt);
        cursor: not-allowed;
    }
}
</style>
