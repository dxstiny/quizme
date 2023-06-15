<script setup lang="ts">
import { type Question } from "../../quiz";
import { type PropType } from "vue";

import MultipleChoice from "./MultipleChoice.vue";
import MultipleAnswers from "./MultipleAnswers.vue";
import Matching from "./Matching.vue";
import NumberInput from "./NumberInput.vue";
import TextInput from "./TextInput.vue";
import TrueFalse from "./TrueFalse.vue";
import Ordering from "./Ordering.vue";
import Flashcard from "./Flashcard.vue";

defineProps({
    question: {
        type: Object as PropType<Question>,
        required: true
    },
    disabled: {
        type: Boolean,
        default: false
    },
    showCorrection: {
        type: Boolean,
        default: false
    },
    editable: {
        type: Boolean,
        default: false
    }
});

const component = {
    "multiple-choice": MultipleChoice,
    "multiple-answer": MultipleAnswers,
    matching: Matching,
    "number-answer": NumberInput,
    "text-answer": TextInput,
    "true-false": TrueFalse,
    ordering: Ordering,
    flashcard: Flashcard,
    "fill-in-the-blank": TextInput
};
</script>
<template>
    <component
        :is="component[question.type]"
        :question="(question as any)"
        :disabled="disabled"
        :editable="editable"
        :showCorrection="showCorrection"
    />
</template>
