<script setup lang="ts">
import EditableText from "../EditableText.vue";
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
    },
    editable: {
        type: Boolean,
        default: false
    }
});

const randomOptions = ref([] as string[]);

const randomise = () => {
    if (props.editable) {
        randomOptions.value = props.question.options;
        return;
    }

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

    if (props.editable) {
        props.question.solution = index;
        return;
    }

    props.question.answer = index;
};
</script>
<template>
    <div class="question multiple-choice">
        <div class="header">
            <EditableText
                v-if="question.title"
                :locked="!editable"
                v-model="question.title"
            >
                <h1>
                    {{ question.title }}
                </h1>
            </EditableText>
            <EditableText
                v-if="question.question"
                :locked="!editable"
                v-model="question.question"
            >
                <p>
                    {{ question.question }}
                </p>
            </EditableText>
        </div>
        <div class="options">
            <div
                class="option"
                :class="{
                    selected: !editable && props.question.answer === index,
                    correct: editable && props.question.solution === index
                }"
                @click="select(index)"
                v-for="(option, index) in randomOptions"
            >
                <EditableText
                    :locked="!editable"
                    no-outline
                    v-model="randomOptions[index]"
                >
                    <span>{{ option }}</span>
                </EditableText>
                <span
                    v-if="editable"
                    class="material-symbols-rounded delete"
                    @click.stop="props.question.options.splice(index, 1)"
                >
                    delete
                </span>
            </div>
            <div
                v-if="editable"
                class="option add"
                @click.stop="props.question.options.push('')"
            >
                <span class="material-symbols-rounded add"> add </span>
                Add
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
    position: relative;
    overflow: hidden;

    &.add {
        display: flex;
        align-items: center;
        gap: 0.5em;
        color: var(--fg-base);
    }

    .delete {
        position: absolute;
        top: 0;
        right: 0;
        cursor: pointer;
        font-size: 0.8rem;
        background: var(--bg-base-lt);
        box-shadow: 0 0 0 1px var(--bg-base-lt);
    }

    &.selected {
        background: var(--c-blue-light);
        border-color: var(--c-blue);
        color: var(--fg-blue);
    }

    &.correct {
        background: var(--c-green-ltr);
        border-color: var(--c-green);
        color: var(--fg-green);
    }
}

textarea {
    width: 100%;
    border: none;
    background: none;
    font-size: 1em;
    font-weight: 900;
    font-family: inherit;
    color: inherit;
    outline: none;
    color: var(--fg-base);

    &.title {
        font-size: 2rem;
        font-weight: 900;
    }

    &.outlined {
        border: 2px solid var(--bg-base-lt);
        border-radius: 0.5em;
    }
}
</style>
