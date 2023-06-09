<script setup lang="ts">
import EditableText from "../EditableText.vue";
import {
    type INumberAnswerQuestion,
    type ITextAnswerQuestion
} from "../../quiz";
import { type PropType, ref, watch, computed } from "vue";

const props = defineProps({
    question: {
        type: Object as PropType<ITextAnswerQuestion | INumberAnswerQuestion>,
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

const type = computed(() => {
    if (props.question.type == "text-answer") return "text";
    if (props.question.type == "number-answer") return "number";
    return "text";
});

const value = ref(props.editable ? props.question.solution : "");
watch(value, () => {
    if (props.editable) {
        props.question.solution = value.value;
        return;
    }

    if (props.question.type == "number-answer") {
        props.question.answer = Number(value.value);
        return;
    }

    props.question.answer = value.value as string;
});
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
        <div class="input">
            <span class="material-symbols-rounded">
                {{ type == "text" ? "edit_note" : "calculate" }}
            </span>
            <input
                v-model="value"
                :type="type"
                :disabled="disabled"
            />
        </div>
    </div>
</template>

<style scoped>
@import "./common.css";

.input {
    display: flex;
    align-items: center;
    gap: 0.5em;
}
</style>
