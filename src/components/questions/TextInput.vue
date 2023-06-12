<script setup lang="ts">
import EditableText from "../EditableText.vue";
import Switch from "../Switch.vue";
import { type ITextAnswerQuestion } from "../../quiz";
import { type PropType, ref, watch, computed, onMounted } from "vue";
import ExpandedDropdown from "../ExpandedDropdown.vue";
import { checkTextAnswer } from "@/answerCorrect";

const props = defineProps({
    question: {
        type: Object as PropType<ITextAnswerQuestion>,
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

const type = ref("exact");
const tryout = ref("");
const exactOrRegex = ref("");

onMounted(() => {
    value.value = "";

    if (!props.editable) return;

    value.value = props.question.solution;

    if (props.question.ignoreCase == null) {
        props.question.ignoreCase = true;
    }
    if (props.question.ignoreWhitespace == null) {
        props.question.ignoreWhitespace = false;
    }
    if (props.question.ignorePunctuation == null) {
        props.question.ignorePunctuation = false;
    }
    if (props.question.levenshtein == null) {
        props.question.levenshtein = 0;
    }

    if (props.question.solution) {
        type.value = "exact";
        exactOrRegex.value = props.question.solution;
    }
    if (props.question.solutionRegex) {
        type.value = "regex";
        exactOrRegex.value = props.question.solutionRegex;
    }
    if (props.question.solutionAll?.length) {
        type.value = "all";
        exactOrRegex.value = props.question.solutionAll.join(",");
    }
    if (props.question.solutionAny?.length) {
        type.value = "any";
        exactOrRegex.value = props.question.solutionAny.join(",");
    }
});

const value = ref(props.editable ? props.question.solution : "");
const cachedQuestionId = ref(props.question.id);
watch(value, () => {
    if (props.editable) {
        props.question.solution = value.value;
        return;
    }

    props.question.answer = value.value;
});
watch(
    () => props.question,
    () => {
        if (cachedQuestionId.value == props.question.id) {
            return;
        }
        cachedQuestionId.value = props.question.id;
        if (props.editable) {
            value.value = props.question.solution;
            return;
        }

        value.value = "";
    },
    { deep: true }
);

const typeOptions = [
    {
        value: "exact",
        label: "Exact Match"
    },
    {
        value: "regex",
        label: "Regular Expression"
    },
    {
        value: "all",
        label: "All",
        description: "comma separated"
    },
    {
        value: "any",
        label: "Any",
        description: "comma separated"
    }
];

const onInputChange = () => {
    if (!props.editable) return;

    if (type.value === "exact") {
        props.question.solution = exactOrRegex.value;
        props.question.solutionRegex = "";
        props.question.solutionAll = [];
        props.question.solutionAny = [];
        return;
    }
    if (type.value === "regex") {
        props.question.solution = "";
        props.question.solutionRegex = exactOrRegex.value;
        props.question.solutionAll = [];
        props.question.solutionAny = [];
        return;
    }
    if (type.value === "all") {
        props.question.solution = "";
        props.question.solutionRegex = "";
        props.question.solutionAll = exactOrRegex.value.split(",");
        props.question.solutionAny = [];
        return;
    }
    if (type.value === "any") {
        props.question.solution = "";
        props.question.solutionRegex = "";
        props.question.solutionAll = [];
        props.question.solutionAny = exactOrRegex.value.split(",");
        return;
    }
};

watch(type, onInputChange);

const tryoutCorrect = computed(() => {
    return checkTextAnswer({
        ...props.question,
        answer: tryout.value
    });
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
        <div
            class="input"
            v-if="!editable"
        >
            <span class="material-symbols-rounded"> edit_note </span>
            <input
                v-model="value"
                type="text"
                :disabled="disabled"
            />
        </div>
        <template v-else>
            <div class="settings">
                <div class="basic">
                    <ExpandedDropdown
                        :options="typeOptions"
                        v-model="type"
                    >
                        <template #label="{ option }">
                            <div class="label">
                                <h3>{{ option.label }}</h3>
                                <p v-if="option.description">
                                    {{ option.description }}
                                </p>
                            </div>
                        </template>
                    </ExpandedDropdown>
                    <input
                        v-model="exactOrRegex"
                        @change="onInputChange"
                        type="text"
                        :disabled="disabled"
                    />
                </div>
                <div class="advanced">
                    <Switch
                        label="ignore case"
                        v-model="question.ignoreCase"
                    />
                    <Switch
                        label="ignore punctuation"
                        v-model="question.ignorePunctuation"
                    />
                    <Switch
                        label="ignore whitespace"
                        v-model="question.ignoreWhitespace"
                    />
                    <div class="levenshtein">
                        <label> Levenshtein Distance (typo tolerance) </label>
                        <input
                            v-model="question.levenshtein"
                            type="number"
                        />
                    </div>
                </div>
            </div>
            <hr />
            <div class="tryout">
                <label>Tryout</label>
                <input
                    :class="{
                        correct: tryoutCorrect,
                        incorrect: !tryoutCorrect
                    }"
                    v-model="tryout"
                    type="text"
                />
            </div>
        </template>
    </div>
</template>

<style scoped>
@import "./common.css";

.label {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0.5em;

    & h3 {
        font-weight: 900;
        margin: 0;
    }

    & p {
        margin: 0;
    }
}

.input {
    display: flex;
    align-items: center;
    gap: 0.5em;
    height: 100%;
}

.settings {
    display: grid;
    grid-template-columns: 1fr max-content;
    gap: 1em;
    margin: 1em 0;
}

.basic {
    display: flex;
    flex-direction: column;
    gap: 1em;

    & input {
        width: calc(100% - 4px - 1em);
    }
}

.advanced {
    display: flex;
    flex-direction: column;
    gap: 1em;
}

hr {
    border: none;
    border-top: 2px solid var(--bg-base-lt);
    width: calc(100% - 2em);
    margin: 1em;
}

.tryout,
.levenshtein {
    margin-top: 1em;
    display: flex;
    flex-direction: column;
    gap: 0.5em;

    & input.correct {
        border-color: var(--c-good);
        color: var(--c-good);
    }

    & input.incorrect {
        border-color: var(--c-bad);
        color: var(--c-bad);
    }
}
</style>
