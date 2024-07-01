<script setup lang="ts">
import EditableText from "../EditableText.vue";
import { type IMultipleChoiceQuestion } from "../../quiz";
import { type PropType, ref, watch } from "vue";
import Tag from "../Tag.vue";

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

const showAsCorrect = (index: number) => {
    if (props.editable && props.question.solution === index) return true;
    if (
        props.showCorrection &&
        props.question.solution === index &&
        props.question.answer === index
    ) {
        return true;
    }
};

const showAsWrong = (index: number) => {
    if (
        props.showCorrection &&
        props.question.solution !== index &&
        props.question.answer === index
    ) {
        return true;
    }
    if (
        props.showCorrection &&
        props.question.solution === index &&
        props.question.answer !== index
    ) {
        return true;
    }
};
</script>
<template>
    <div class="question multiple-choice">
        <div class="header">
            <Tag
                v-if="!editable"
                label="Multiple Choice"
                icon="rule"
            />
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
                    selected: !editable && props.question.answer === index,
                    correct: showAsCorrect(index),
                    wrong: showAsWrong(index)
                }"
                tabindex="0"
                @click="select(index)"
                @keypress.space.stop="select(index)"
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
