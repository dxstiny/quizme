<script setup lang="ts">
import { type IMultipleChoiceQuestion } from "../../quiz";
import { type PropType, ref, watch } from "vue";

const props = defineProps({
    question: {
        type: Object as PropType<IMultipleChoiceQuestion>,
        required: true
    },
    disabled: {
        type: Boolean,
        default: false
    }
});

const randomOptions = ref([] as string[]);

const randomise = () => {
    const solutionText = props.question.options[props.question.solution];

    randomOptions.value = props.question.options.sort(
        () => Math.random() - 0.5
    );

    props.question.solution = randomOptions.value.findIndex(
        (option) => option === solutionText
    );
    props.question.options = props.question.options;
};
randomise();
watch(() => props.question.options, randomise);

const select = (index: number) => {
    if (props.disabled) return;
    props.question.answer = index;
};
</script>
<template>
    <div class="question multiple-choice">
        <div class="header">
            <h1 v-if="question.title">{{ question.title }}</h1>
            <p>{{ question.question }}</p>
        </div>
        <div class="options">
            <div
                class="option"
                :class="{ selected: props.question.answer === index }"
                @click="select(index)"
                v-for="(option, index) in randomOptions"
            >
                {{ option }}
            </div>
        </div>
    </div>
</template>

<style scoped>
.question {
    display: flex;
    flex-direction: column;
    align-items: center;
}

@media screen and (min-width: 600px) {
    .question > div {
        width: 600px;
    }
}

.options {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 1em;
}

.option {
    border: 2px solid var(--bg-base-lt);
    border-radius: 0.5em;
    padding: 0.5em;
    cursor: pointer;

    &.selected {
        background: var(--c-blue-light);
        border-color: var(--c-blue);
        color: var(--fg-blue);
    }
}
</style>
