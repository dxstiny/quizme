<script setup lang="ts">
import EditableText from "../EditableText.vue";
import { type ITrueFalseQuestion } from "../../quiz";
import { onMounted, type PropType } from "vue";
import Tag from "../Tag.vue";

const props = defineProps({
    question: {
        type: Object as PropType<ITrueFalseQuestion>,
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

const select = (value: boolean) => {
    if (props.editable) {
        props.question.solution = value;
        return;
    }
    props.question.answer = value;
};

onMounted(() => {
    props.question.answer = undefined;
});
</script>
<template>
    <div class="question multiple-choice">
        <div class="header">
            <Tag
                v-if="!editable"
                label="True or False"
                icon="check"
            />
            <EditableText
                v-model="question.title"
                class="h1"
            >
                <h1>{{ question.title }}</h1>
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
                    selected: !editable && question.answer === true,
                    correct: editable && question.solution === true
                }"
                @click="select(true)"
            >
                <span class="material-symbols-rounded">check</span>
                True
            </div>
            <div
                class="option"
                :class="{
                    selected: !editable && question.answer === false,
                    correct: editable && question.solution === false
                }"
                @click="select(false)"
            >
                <span class="material-symbols-rounded">close</span>
                False
            </div>
        </div>
    </div>
</template>

<style scoped>
@import "./common.css";

.options {
    display: grid;
    grid-template-columns: 1fr 1fr;

    .option {
        display: flex;
        align-items: center;
        gap: 0.5em;
    }
}
</style>
