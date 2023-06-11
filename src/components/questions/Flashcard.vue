<script setup lang="ts">
import EditableText from "../EditableText.vue";
import { type PropType, ref, watch } from "vue";
import type { IFlashcard } from "../../quiz";

const props = defineProps({
    question: {
        type: Object as PropType<IFlashcard>,
        required: true
    },
    disabled: {
        type: Boolean,
        default: false
    },
    editable: {
        type: Boolean,
        default: false
    }
});

const revealed = ref(false);
</script>
<template>
    <div class="question multiple-choice">
        <div class="header">
            <EditableText
                :locked="!editable"
                v-model="question.title"
                class="h1"
            >
                <h1>
                    {{ question.title }}
                </h1>
            </EditableText>
            <EditableText
                :locked="!editable"
                v-model="question.question"
            >
                <p>
                    {{ question.question }}
                </p>
            </EditableText>
        </div>
        <div
            class="card"
            :class="{ revealed }"
            @click="revealed = !revealed"
        >
            <EditableText
                v-if="revealed"
                :locked="!editable"
                v-model="question.solution"
                @click.stop
            >
                <h3>
                    {{ question.solution }}
                </h3>
            </EditableText>
            <div v-else>
                <p class="muted">Click to reveal</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import "./common.css";

.card {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid var(--bg-base-lt);
    border-radius: 0.8em;
    padding: 1rem;
    transition: all 0.5s ease-in-out;
    cursor: pointer;

    > * {
        transition: all 0.5s ease-in-out;
    }

    &.revealed {
        transform: rotateY(180deg) rotateX(180deg);

        > * {
            transform: rotateY(180deg) rotateX(180deg);
        }
    }
}
</style>
