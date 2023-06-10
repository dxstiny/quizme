<script setup lang="ts">
import EditableText from "../EditableText.vue";
import { type IMatchingQuestion } from "../../quiz";
import { type PropType, ref, watch, computed } from "vue";

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

const randomise = () => {
    const leftSide = Object.keys(props.question.solution);
    const rightSide = Object.values(props.question.solution);

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
const computedRandomOptions = computed(() =>
    JSON.parse(JSON.stringify(randomOptions.value))
);
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

watch(
    computedRandomOptions,
    (to, from) => {
        if (!props.editable) return;
        // lengths are different
        if (to.left.length !== from.left.length) return;

        // solution stores as { left: right }
        // find the index in from
        // if the value is not in to, then it has changed

        // newLeft: elements that are in to but not in from
        const newLeft = to.left.filter((l: string) => !from.left.includes(l));
        // oldLeft: elements that are in from but not in to
        const oldLeft = from.left.filter((l: string) => !to.left.includes(l));

        // length should be 0
        if (newLeft.length !== 1 || oldLeft.length !== 1) {
            // value changed
            // replace the old right value with the new right value
            const newRightValue = to.right.find(
                (r: string) => r !== from.right[0]
            );
            // find the index of the newRightValue
            const newRightIndex = to.right.findIndex(
                (r: string) => r === newRightValue
            );
            const key = to.left[newRightIndex];
            if (!key) return;

            props.question.solution[key] = newRightValue;
            return;
        }

        const oldKey = oldLeft[0];
        const newKey = newLeft[0];

        // replace the old right value with the new right value
        props.question.solution = renameObjKey(
            props.question.solution,
            oldKey,
            newKey
        );
    },
    { deep: true }
);

const selected = ref({
    left: null as null | number,
    right: null as null | number
});

const correctPairs = ref({
    left: [] as string[],
    right: [] as string[]
});
const wrongPairs = ref({
    left: [] as string[],
    right: [] as string[]
});

const select = (index: number, side: "left" | "right") => {
    if (props.disabled) return;
    if (props.editable) return;
    if (!props.question.answer) props.question.answer = {};
    if (correctPairs.value[side].includes(randomOptions.value[side][index]))
        return;

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
        correctPairs.value.left.push(left);
        correctPairs.value.right.push(right);
    } else {
        wrongPairs.value.left.push(left);
        wrongPairs.value.right.push(right);

        setTimeout(() => {
            wrongPairs.value.left = wrongPairs.value.left.filter(
                (l) => l !== left
            );
            wrongPairs.value.right = wrongPairs.value.right.filter(
                (r) => r !== right
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
                    :class="{
                        // @ts-ignore
                        selected: !editable && selected[side] === index,
                        correct:
                        !editable &&
                            // @ts-ignore
                            correctPairs[side].includes(
                                (randomOptions as any)[side][index]
                            ),
                        wrong:
                            !editable &&
                            // @ts-ignore
                            wrongPairs[side].includes(
                                (randomOptions as any)[side][index]
                            )
                    }"
                    @click="select(index, side as any)"
                >
                    <EditableText
                        :locked="!editable"
                        no-outline
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
                    @click.stop="delete props.question.solution[option]"
                >
                    delete
                </span>
            </div>
            <div
                v-if="editable"
                class="option add"
                @click.stop="props.question.solution['A'] = 'B'"
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
