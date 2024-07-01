<script setup lang="ts">
import EditableText from "../EditableText.vue";
import { type IMatchingQuestion } from "../../quiz";
import { type PropType, ref, watch } from "vue";
import Tag from "../Tag.vue";

const props = defineProps({
    question: {
        type: Object as PropType<IMatchingQuestion>,
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

const randomOptions = ref({
    left: [] as string[],
    right: [] as string[]
});
const correctPairs = ref({
    left: [] as number[],
    right: [] as number[]
});
const wrongPairs = ref({
    left: [] as number[],
    right: [] as number[]
});

const randomise = () => {
    const leftSide = Object.keys(props.question.solution);
    const rightSide = Object.values(props.question.solution);
    correctPairs.value.left = [];
    correctPairs.value.right = [];

    if (props.editable) {
        randomOptions.value.left = leftSide;
        randomOptions.value.right = rightSide;
        return;
    }

    randomOptions.value.left = leftSide.sort(() => Math.random() - 0.5);
    randomOptions.value.right = rightSide.sort(() => Math.random() - 0.5);
};
randomise();
watch(() => props.question.solution, randomise, { deep: true });
const renameObjKey = (oldObj: any, oldKey: string, newKey: string) => {
    const keys = Object.keys(oldObj);
    const newObj = keys.reduce((acc: any, val) => {
        if (val === oldKey) {
            acc[newKey] = oldObj[oldKey];
        } else {
            acc[val] = oldObj[val];
        }
        return acc;
    }, {});

    return newObj;
};

const onOptionChange = (side: string, index: number, to: string) => {
    if (!props.editable) return;

    if (side == "left") {
        const oldKey = randomOptions.value.left[index];
        const newKey = to;
        props.question.solution = renameObjKey(
            props.question.solution,
            oldKey,
            newKey
        );
    } else {
        const oldKey = randomOptions.value.left[index];
        props.question.solution[oldKey] = to;
    }
};

const selected = ref({
    left: null as null | number,
    right: null as null | number
});

const onEnter = (e: KeyboardEvent, index: number, side: "left" | "right") => {
    if (!props.editable) {
        select(index, side);
        return;
    }

    if (e.shiftKey) {
        return;
    }

    e.preventDefault();

    const element = e.target as HTMLElement;
    const areaChild = element.querySelector("div");
    if (areaChild) {
        // double click
        const event = new MouseEvent("dblclick", {
            view: window,
            bubbles: true,
            cancelable: true
        });
        areaChild.dispatchEvent(event);
        return;
    }
};

const select = (index: number, side: "left" | "right") => {
    if (props.disabled) return;
    if (props.editable) return;
    if (!props.question.answer) props.question.answer = {};
    if (correctPairs.value[side].includes(index)) return;

    if (selected.value[side] === index) {
        selected.value[side] = null;
        return;
    }

    selected.value[side] = index;

    if (selected.value.left === null || selected.value.right === null) return;
    const left = randomOptions.value.left[selected.value.left];
    const right = randomOptions.value.right[selected.value.right];
    props.question.answer[left] = right;

    if (props.question.solution[left] === right) {
        correctPairs.value.left.push(selected.value.left);
        correctPairs.value.right.push(selected.value.right);
    } else {
        wrongPairs.value.left.push(selected.value.left);
        wrongPairs.value.right.push(selected.value.right);

        const lefti = selected.value.left;
        const righti = selected.value.right;

        setTimeout(() => {
            wrongPairs.value.left = wrongPairs.value.left.filter(
                (l) => l !== lefti
            );
            wrongPairs.value.right = wrongPairs.value.right.filter(
                (r) => r !== righti
            );
        }, 1000);
    }

    selected.value.left = null;
    selected.value.right = null;
};
</script>
<template>
    <div class="question multiple-choice">
        <div class="header">
            <Tag
                v-if="!editable"
                label="Matching"
                icon="signpost"
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
        <div class="optionlist">
            <div
                class="options"
                v-for="(option, index) in randomOptions.left"
            >
                <div
                    class="option"
                    v-for="side in ['left', 'right']"
                    tabindex="0"
                    :class="{
                        // @ts-ignore
                        selected: !editable && selected[side] === index,
                        correct:
                            !editable &&
                            // @ts-ignore
                            correctPairs[side].includes(index),
                        wrong:
                            !editable &&
                            // @ts-ignore
                            wrongPairs[side].includes(index)
                    }"
                    @click="select(index, side as any)"
                    @keypress.space.stop="select(index, side as any)"
                    @keypress.enter="(e) => onEnter(e, index, side as any)"
                >
                    <EditableText
                        :locked="!editable"
                        no-outline
                        @change="(to) => onOptionChange(side, index, to)"
                        v-model="
                            // @ts-ignore
                            randomOptions[side][index]
                        "
                    >
                        <span>{{ (randomOptions as any)[side][index] }}</span>
                    </EditableText>
                </div>
                <span
                    v-if="editable"
                    class="material-symbols-rounded delete"
                    tabindex="0"
                    @click.stop="delete props.question.solution[option]"
                    @keypress.enter.stop="
                        delete props.question.solution[option]
                    "
                >
                    delete
                </span>
            </div>
            <div
                v-if="editable"
                class="option add"
                tabindex="0"
                @click.stop="props.question.solution['A'] = 'B'"
                @keypress.enter="props.question.solution['A'] = 'B'"
            >
                <span class="material-symbols-rounded add"> add </span>
                Add
            </div>
        </div>
    </div>
</template>

<style scoped>
@import "./common.css";

@keyframes correct {
    0% {
        background: var(--c-green-ltr);
        border-color: var(--c-green);
        color: var(--fg-green);
    }
    50% {
        background: var(--c-green-ltr);
        border-color: var(--c-green);
        color: var(--fg-green);
    }
    100% {
        background: none;
        border-color: var(--bg-base-lt);
        color: var(--bg-base-lt);
    }
}

@keyframes wrong {
    0% {
        background: var(--c-red-ltr);
        border-color: var(--c-red);
        color: var(--fg-red);
    }
    50% {
        background: var(--c-red-ltr);
        border-color: var(--c-red);
        color: var(--fg-red);
    }
    100% {
        background: none;
        border-color: var(--bg-base-lt);
        color: inherit;
    }
}

.optionlist {
    display: flex;
    flex-direction: column;
    gap: 1em;

    .option.add {
        grid-column: 1 / span 2;
    }

    .options {
        display: grid;
        grid-template-columns: 1fr 1fr;
        align-items: center;

        &:has(.delete) {
            grid-template-columns: 1fr 1fr max-content;
        }

        .delete {
            cursor: pointer;
        }
    }

    .option span:not(.material-symbols-rounded) {
        white-space: pre-wrap;
    }

    .option {
        &.correct {
            animation: correct 1s ease-in-out forwards;
        }

        &.wrong {
            animation: wrong 1s ease-in-out forwards;
        }
    }
}
</style>
