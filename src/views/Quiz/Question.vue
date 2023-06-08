<script setup lang="ts">
import { type Question } from "../../types";
import { type PropType } from "vue";

import MultipleChoice from "@/components/questions/MultipleChoice.vue";

defineProps({
    question: {
        type: Object as PropType<Question>,
        required: true
    },
    disabled: {
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
    />
</template>
