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
        <EditableText
            v-if="editable"
            class="back"
            :locked="false"
            v-model="question.solution"
            @click.stop
        >
            <h3>
                {{ question.solution }}
            </h3>
        </EditableText>
        <div
            class="card"
            v-else
            :class="{ revealed }"
            @click="revealed = !revealed"
        >
            <h3 class="back">
                {{ question.solution }}
            </h3>

            <div class="front">
                <p class="muted">Click to reveal</p>
            </div>
            <h3 class="placeholder">
                {{ "m ".repeat(question.solution.length / 2) }}
            </h3>
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
    transition: transform 0.5s;
    transform-style: preserve-3d;

    .placeholder {
        color: transparent;
    }

    > * {
        transition: all 0.5s ease-in-out;
    }

    &.revealed {
        transform: rotateY(180deg);
    }

    .front,
    .back {
        position: absolute;
        inset: 1em;

        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
    }

    .back {
        transform: rotateY(180deg);
    }
}
</style>
