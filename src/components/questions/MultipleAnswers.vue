<script setup lang="ts">
import EditableText from "../EditableText.vue";
import { type IMultipleAnswerQuestion } from "../../quiz";
import { type PropType, ref, watch } from "vue";

const props = defineProps({
    question: {
        type: Object as PropType<IMultipleAnswerQuestion>,
        required: true
    },
    disabled: {
        type: Boolean,
        default: false
    },
    editable: {
        type: Boolean,
        default: false
    },
    showCorrection: {
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

    const solutionText = props.question.solution.map(
        (index) => props.question.options[index]
    );

    randomOptions.value = props.question.options.sort(
        () => Math.random() - 0.5
    );

    props.question.solution = solutionText.map((option) =>
        randomOptions.value.findIndex((text) => text === option)
    );
    props.question.options = props.question.options;
    props.question.answer = props.question.answer ?? [];
};
randomise();
watch(() => props.question.options, randomise);

const select = (index: number) => {
    if (props.disabled) return;

    if (props.editable) {
        if (props.question.solution.includes(index)) {
            props.question.solution.splice(
                props.question.solution.findIndex((i) => i === index),
                1
            );
            return;
        }
        props.question.solution.push(index);
        return;
    }

    if (!props.question.answer) props.question.answer = [];

    if (props.question.answer.includes(index)) {
        props.question.answer.splice(
            props.question.answer.findIndex((i) => i === index),
            1
        );
        return;
    }

    props.question.answer.push(index);
};

// correct: editable && props.question.solution.includes(index)
const showAsCorrect = (index: number) => {
    if (props.editable && props.question.solution.includes(index)) return true;
    if (props.showCorrection && props.question.solution.includes(index))
        return true;
    return false;
};

const showAsWrong = (index: number) => {
    if (props.editable && !props.question.solution.includes(index)) return true;
    if (
        props.showCorrection &&
        !props.question.solution.includes(index) &&
        props.question.answer?.includes(index)
    )
        return true;
    return false;
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
        <div class="options">
            <div
                class="option"
                :class="{
                    selected:
                        !editable && props.question?.answer?.includes(index),
                    correct: showAsCorrect(index),
                    wrong: showAsWrong(index)
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
                @click.stop="props.question.options.push('Option')"
            >
                <span class="material-symbols-rounded add"> add </span>
                Add
            </div>
        </div>
    </div>
</template>

<style scoped>
@import "./common.css";
</style>
