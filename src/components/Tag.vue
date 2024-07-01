<script setup lang="ts">
defineProps({
    label: String,
    icon: String
});
</script>
<template>
    <div class="tag">
        <span
            v-if="icon"
            class="material-symbols-rounded"
        >
            {{ icon }}
        </span>
        {{ label }}
    </div>
</template>

<style scoped>
.tag {
    display: flex;
    align-items: center;
    gap: 0.5em;
    border-radius: 0.5em;
    font-size: 0.9rem;
    font-weight: bold;
    width: max-content;

    color: var(--fg-blue);

    & span {
        font-size: inherit;
        line-height: 2ch;
    }
}
</style>
