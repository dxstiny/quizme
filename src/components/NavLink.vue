<script setup lang="ts">
import { RouterLink } from "vue-router";

defineProps({
    icon: {
        type: String,
        required: false
    },
    label: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    }
});
</script>
<template>
    <component :is="to ? RouterLink : 'div'" :to="to" class="link">
        <div class="entry">
            <span class="material-symbols-rounded">{{ icon }}</span>
            <span class="label">
                {{ label }}
            </span>
        </div>
    </component>
</template>
<style scoped>
.link {
    text-decoration: none;
    color: inherit;
    color: var(--fg-base);
    width: 100%;
    container-type: inline-size;
    cursor: pointer;

    .entry {
        border: 2px solid transparent;
    }

    &.router-link-active {
        color: var(--fg-blue);

        .entry {
            background-color: var(--c-blue-ltr);
            border: 2px solid var(--c-blue);
        }
    }
}

.entry {
    display: flex;
    align-items: center;
    gap: 1em;
    font-size: 1.2rem;
    padding: 0.5em;
    border-radius: 0.8em;

    &:hover {
        background-color: var(--bg-highlight);
    }
}

.label {
    text-transform: uppercase;
    font-weight: 900;
    font-size: 0.9em;
}

@container (max-width: 150px) {
    .entry {
        gap: 0;
        justify-content: center;
    }

    .label {
        display: none;
    }
}
</style>
