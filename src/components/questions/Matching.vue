<script setup lang="ts">
import EditableText from "../EditableText.vue";
import { type IMatchingQuestion } from "../../quiz";
import { type PropType, ref, watch, nextTick } from "vue";

const props = defineProps({
    question: {
        type: Object as PropType<IMatchingQuestion>,
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

const randomOptions = ref({
    left: [] as string[],
    right: [] as string[]
});

const randomise = () => {
    const leftSide = Object.keys(props.question.solution);
    const rightSide = Object.values(props.question.solution);

    if (props.editable) {
        randomOptions.value.left = leftSide;
        randomOptions.value.right = rightSide;
        return;
    }

    randomOptions.value.left = leftSide.sort(() => Math.random() - 0.5);
    randomOptions.value.right = rightSide.sort(() => Math.random() - 0.5);
};
randomise();
watch(() => props.question.solution, randomise);

const selected = ref({
    left: null as null | number,
    right: null as null | number
});

const correctPairs = ref({
    left: [] as string[],
    right: [] as string[]
});
const wrongPairs = ref({
    left: [] as string[],
    right: [] as string[]
});

const select = (index: number, side: "left" | "right") => {
    if (props.disabled) return;
    if (props.editable) return;
    if (!props.question.answer) props.question.answer = {};
    if (correctPairs.value[side].includes(randomOptions.value[side][index]))
        return;

    if (selected.value[side] === index) {
        selected.value[side] = null;
        return;
    }

    selected.value[side] = index;

    if (selected.value.left === null || selected.value.right === null) return;
    const left = randomOptions.value.left[selected.value.left];
    const right = randomOptions.value.right[selected.value.right];
    props.question.answer[left] = right;

    if (props.question.solution[left] === right) {
        correctPairs.value.left.push(left);
        correctPairs.value.right.push(right);
    } else {
        wrongPairs.value.left.push(left);
        wrongPairs.value.right.push(right);

        setTimeout(() => {
            wrongPairs.value.left = wrongPairs.value.left.filter(
                (l) => l !== left
            );
            wrongPairs.value.right = wrongPairs.value.right.filter(
                (r) => r !== right
            );
        }, 1000);
    }

    selected.value.left = null;
    selected.value.right = null;
};
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
        <div class="optionlist">
            <div
                class="options"
                v-for="side in Object.keys(randomOptions)"
            >
                <div
                    class="option"
                    v-for="(option, index) in (randomOptions as any)[side]"
                    :class="{
                        // @ts-ignore
                        selected: !editable && selected[side] === index,
                        correct:
                            // @ts-ignore
                            !editable && correctPairs[side].includes(option),
                        // @ts-ignore
                        wrong: !editable && wrongPairs[side].includes(option)
                    }"
                    @click="select(index, side as any)"
                >
                    <EditableText
                        :locked="!editable"
                        no-outline
                        v-model="
                            // @ts-ignore
                            randomOptions[side][index]
                        "
                    >
                        <span>{{ option }}</span>
                    </EditableText>
                </div>
            </div>
            <div
                v-if="editable"
                class="option add"
                @click.stop="props.question.solution['A'] = 'B'"
            >
                <span class="material-symbols-rounded add"> add </span>
                Add
            </div>
        </div>
    </div>
</template>

<style scoped>
@import "./common.css";

@keyframes correct {
    0% {
        background: var(--c-green-ltr);
        border-color: var(--c-green);
        color: var(--fg-green);
    }
    50% {
        background: var(--c-green-ltr);
        border-color: var(--c-green);
        color: var(--fg-green);
    }
    100% {
        background: none;
        border-color: var(--bg-base-lt);
        color: var(--bg-base-lt);
    }
}

@keyframes wrong {
    0% {
        background: var(--c-red-ltr);
        border-color: var(--c-red);
        color: var(--fg-red);
    }
    50% {
        background: var(--c-red-ltr);
        border-color: var(--c-red);
        color: var(--fg-red);
    }
    100% {
        background: none;
        border-color: var(--bg-base-lt);
        color: inherit;
    }
}

.optionlist {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1em;

    .option.add {
        grid-column: 1 / span 2;
    }

    .option {
        &.correct {
            animation: correct 1s ease-in-out forwards;
        }

        &.wrong {
            animation: wrong 1s ease-in-out forwards;
        }
    }
}
</style>
