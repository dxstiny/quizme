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
    editable: {
        type: Boolean,
        default: false
    }
});
</script>
<template>
    <MultipleChoice
        v-if="question.type === 'multiple-choice'"
        :question="question"
        :disabled="disabled"
        :editable="editable"
    />
    <MultipleAnswers
        v-else-if="question.type === 'multiple-answer'"
        :question="question"
        :disabled="disabled"
        :editable="editable"
    />
    <Matching
        v-else-if="question.type === 'matching'"
        :question="question"
        :disabled="disabled"
        :editable="editable"
    />
    <NumberInput
        v-else-if="question.type === 'number-answer'"
        :question="question"
        :disabled="disabled"
        :editable="editable"
    />
    <TextInput
        v-else-if="question.type === 'text-answer'"
        :question="question"
        :disabled="disabled"
        :editable="editable"
    />
    <TrueFalse
        v-else-if="question.type === 'true-false'"
        :question="question"
        :disabled="disabled"
        :editable="editable"
    />
    <Ordering
        v-else-if="question.type === 'ordering'"
        :question="question"
        :disabled="disabled"
        :editable="editable"
    />
    <Flashcard
        v-else-if="question.type === 'flashcard'"
        :question="question"
        :disabled="disabled"
        :editable="editable"
    />
</template>
