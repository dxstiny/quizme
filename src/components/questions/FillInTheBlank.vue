<script setup lang="ts">
import EditableText from "../EditableText.vue";
import type { IFillInTheBlankQuestion } from "@/quiz";
import { ref, type PropType, onMounted } from "vue";
import IconButton from "../IconButton.vue";
import Tag from "../Tag.vue";

const props = defineProps({
    question: {
        type: Object as PropType<IFillInTheBlankQuestion>,
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

const editor = ref<HTMLDivElement>();
const quiz = ref<HTMLDivElement>();
const allGaps = ref<string[]>([]);

const findAllGaps = () => {
    if (!quiz.value) return [];
    const gaps: NodeListOf<HTMLInputElement> =
        quiz.value.querySelectorAll(".gap");
    return Array.from(gaps).map((gap) => gap.value);
};

const generateQuiz = (text: string | undefined) => {
    if (!quiz.value) return;
    if (!text) return;

    // replace --[.*]-- with <span class="gap">(*)</span>
    const regex = /-\[(.*)\]-/g;
    const matches = text.matchAll(regex);

    const gaps = Array.from(matches, (m) => {
        const index = m.index || 0;
        const length = m[0].length;
        return { index, length, value: m[0], gap: m[1] };
    });

    // @ts-ignore
    window.onGapInput = (e: Event) => {
        const target = e.target as HTMLInputElement;
        const index = parseInt(target.dataset.index || "0");
        allGaps.value[index] = target.value;
        props.question.answer = allGaps.value;
    };

    for (let i = gaps.length - 1; i >= 0; i--) {
        const gap = gaps[i];
        const span = document.createElement("input");
        span.classList.add("gap");
        span.value = props.editable ? gap.gap : "";
        span.size = (gap.length - 4) * 2;
        span.dataset.index = `${i}`;
        span.disabled = props.editable;

        text = text.replace(
            gap.value,
            span.outerHTML.replace(
                "<input",
                `<input oninput='onGapInput(event)' value='${span.value}'`
            )
        );
    }

    quiz.value.innerHTML = text;
    allGaps.value = findAllGaps();
};

onMounted(() => {
    if (props.editable) {
        editor.value!.innerHTML = props.question.text;
    }

    generateQuiz(props.question.text);
});

const onFocusOut = () => {
    if (!editor.value) return;
    generateQuiz(editor.value.innerHTML);
    props.question.text = editor.value.innerHTML;
    props.question.solution = allGaps.value;
};

const insertGap = () => {
    editor.value!.innerHTML += "-[gap]-";
    onFocusOut();
};
</script>
<template>
    <div class="question fill-in-the-blank">
        <div class="header">
            <Tag
                v-if="!editable"
                label="Fill in the Blank"
                icon="edit"
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
        <div
            class="input editor"
            v-if="editable"
        >
            <div
                class="textarea"
                :contenteditable="true"
                ref="editor"
                @focusout="onFocusOut"
            />
            <IconButton
                label="Add gap"
                icon="add"
                @click="insertGap"
            />
        </div>
        <h4 v-if="editable">Preview</h4>
        <div class="input">
            <div
                class="textarea"
                ref="quiz"
            />
        </div>
    </div>
</template>

<style>
@import "./common.css";

.fill-in-the-blank {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .textarea {
        border: 2px solid var(--bg-base-lt);
        border-radius: 0.5em;
        padding: 0.5em;
        position: relative;
        font-family: inherit;
        width: 100%;
        white-space: pre;

        .gap {
            color: var(--fg-blue);
            background: var(--c-blue-ltr);
            border: 2px solid var(--c-blue);
            border-radius: 0.5em;
            padding: 0 0.25em 0 0.25em;
            white-space: pre;
            width: max-content;
            font-size: inherit;
            text-align: center;
        }
    }

    h4 {
        margin-top: 3em;
    }

    .input.editor {
        display: flex;
        flex-direction: column;
        gap: 1em;
    }
}
</style>
