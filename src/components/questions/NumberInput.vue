<script setup lang="ts">
import EditableText from "../EditableText.vue";
import Switch from "../Switch.vue";
import { type INumberAnswerQuestion } from "../../quiz";
import { type PropType, ref, watch, onMounted } from "vue";
import ExpandedDropdown from "../ExpandedDropdown.vue";
import IconButton from "../IconButton.vue";
import Notepad from "../Notepad.vue";

const notepad = ref<typeof Notepad>();

const props = defineProps({
    question: {
        type: Object as PropType<INumberAnswerQuestion>,
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

const value = ref(props.editable ? props.question.solution : null);
const cachedQuestionId = ref(props.question.id);
watch(value, () => {
    if (value.value == null) return;

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

        value.value = 0;
    },
    { deep: true }
);

const typeOptions = [
    {
        label: "Exact",
        value: "exact"
    },
    {
        label: "Range",
        value: "range"
    }
];
const type = ref("");

watch(type, () => {
    if (type.value === "exact") {
        props.question.solution = props.question.solution || 0;
        props.question.delta = props.question.delta || 0;
        delete props.question.min;
        delete props.question.max;
    } else {
        props.question.solution = 0;
        delete props.question.delta;
        props.question.min = props.question.min || 0;
        props.question.max = props.question.max || 0;
    }
});

onMounted(() => {
    if (!props.editable) return;

    if (props.question.allowNotes == null) {
        props.question.allowNotes = true;
    }

    if (props.question.min != null || props.question.max != null) {
        type.value = "range";
        return;
    }

    type.value = "exact";
});

const notes = ref("");
const calculate = () => {
    if (!props.question.allowNotes) return;
    if (!props.question.allowCalculator) return;

    const latestLine = notes.value.split("\n").at(-1)?.trim();
    if (latestLine == null) return;

    // if latestLine ends with =, then evaluate it
    if (latestLine.endsWith("=")) {
        const result = eval(latestLine.slice(0, -1));
        if (typeof result === "number") {
            value.value = result;

            // append the result to the notes
            notes.value += result;
        }
    }
};

const autoResize = (el: EventTarget | null) => {
    if (!el) return;
    const area = el as HTMLTextAreaElement;
    area.style.height = "auto";
    area.style.height = area.scrollHeight + "px";
};
</script>
<template>
    <div class="question">
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
            <div class="line">
                <span class="material-symbols-rounded"> calculate </span>
                <input
                    v-model="value"
                    type="number"
                    :disabled="disabled"
                    placeholder="Enter your answer here"
                />
            </div>
            <hr />
            <div class="line notepad">
                <textarea
                    v-if="question.allowNotes"
                    class="notes"
                    placeholder="Notes"
                    @keypress.enter="calculate"
                    @input="autoResize($event.target)"
                    v-model="notes"
                />
                <span v-if="question.allowCalculator">
                    <span class="material-symbols-rounded"> info </span>
                    Calculator enabled. Terminate your calculation with an = and
                    press enter.
                </span>
            </div>
        </div>
        <template v-else>
            <div class="settings">
                <div class="type-and-help">
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
                    <div class="settings">
                        <Switch
                            label="allow calculator"
                            v-model="question.allowCalculator"
                        />
                        <Switch
                            label="allow notes"
                            v-model="question.allowNotes"
                        />
                    </div>
                </div>
                <template v-if="type == 'exact'">
                    <div class="pair">
                        <label>Value</label>
                        <input
                            v-model="question.solution"
                            type="number"
                        />
                    </div>
                    <div class="pair">
                        <label>Tolerance (delta)</label>
                        <input
                            v-model="question.delta"
                            type="number"
                        />
                    </div>
                </template>
                <template v-else>
                    <div class="pair">
                        <label>Minimum</label>
                        <input
                            v-model="question.min"
                            type="number"
                        />
                    </div>
                    <div class="pair">
                        <label>Maximum</label>
                        <input
                            v-model="question.max"
                            type="number"
                        />
                    </div>
                </template>
            </div>
        </template>
    </div>
</template>

<style scoped>
@import "./common.css";

textarea {
    min-height: max-content;
}

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

.settings {
    display: flex;
    flex-direction: column;
    gap: 1em;
    margin: 1em 0;

    .pair {
        display: flex;
        flex-direction: column;
        gap: 0.5em;
    }

    .type-and-help {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1em;

        .settings {
            margin: 0;
        }
    }
}

.input,
.line {
    display: flex;
    align-items: center;
    gap: 0.5em;
    width: 100%;

    &.input {
        flex-direction: column;
    }

    > button {
        flex: 1;
    }

    &.notepad {
        position: relative;
        padding-top: 1em;

        & > span {
            position: absolute;
            top: -1em;
            left: 0;
            display: flex;
            align-items: center;
            gap: 0.5em;
            font-size: 0.8rem;
            color: var(--fg-base-mute);

            & span {
                font-size: 1em;
            }
        }
    }
}
</style>
