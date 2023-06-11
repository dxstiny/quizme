<script setup lang="ts">
import { type Question } from "../../quiz";
import { type PropType } from "vue";

import MultipleChoice from "@/components/questions/MultipleChoice.vue";
import MultipleAnswers from "@/components/questions/MultipleAnswers.vue";
import Matching from "@/components/questions/Matching.vue";
import CustomInput from "@/components/questions/CustomInput.vue";
import TrueFalse from "@/components/questions/TrueFalse.vue";
import Ordering from "@/components/questions/Ordering.vue";
import Flashcard from "@/components/questions/Flashcard.vue";

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
    <CustomInput
        v-else-if="['text-answer', 'number-answer'].includes(question.type)"
        :question="question as any"
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
