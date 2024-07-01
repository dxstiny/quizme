<script setup lang="ts">
import EditableText from "../EditableText.vue";
import { type IOrderingQuestion } from "../../quiz";
import { type PropType, watch, ref, onMounted } from "vue";
import draggable from "vuedraggable";
import Tag from "../Tag.vue";

const props = defineProps({
    question: {
        type: Object as PropType<IOrderingQuestion>,
        required: true
    },
    disabled: {
        type: Boolean,
        default: false
    },
    editable: {
        type: Boolean,
        default: false
    },
    showCorrection: {
        type: Boolean,
        default: false
    }
});

const display = ref(props.editable ? props.question.solution : []);

const randomise = () => {
    if (props.editable) {
        return;
    }

    const solution = JSON.parse(
        JSON.stringify(props.question.solution)
    ) as string[];
    props.question.answer = solution.sort(() => Math.random() - 0.5);
    display.value = props.question.answer;
};
watch(
    display,
    () => {
        if (props.editable) {
            props.question.solution = display.value;
            return;
        }
        props.question.answer = display.value;
    },
    {
        deep: true
    }
);
watch(() => props.question.id, randomise);
onMounted(randomise);
</script>
<template>
    <div class="question multiple-choice">
        <div class="header">
            <Tag
                v-if="!editable"
                label="Ordering"
                icon="sort"
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
        <div class="options">
            <draggable
                v-model="display"
                item-key="id"
                tag="div"
                class="options"
            >
                <template #item="{ element, index }">
                    <div
                        class="option"
                        :class="{
                            wrong:
                                showCorrection &&
                                question.solution[index] !== element
                        }"
                    >
                        <EditableText
                            :locked="!editable"
                            no-outline
                            v-model="display[index]"
                        >
                            <span>{{ element }}</span>
                        </EditableText>
                        <span
                            v-if="editable"
                            class="material-symbols-rounded delete"
                            tabindex="0"
                            @click.stop="
                                props.question.solution.splice(index, 1)
                            "
                            @keypress.enter.stop="
                                props.question.solution.splice(index, 1)
                            "
                        >
                            delete
                        </span>
                    </div>
                </template>
            </draggable>
            <div
                v-if="editable"
                class="option add"
                tabindex="0"
                @click.stop="props.question.solution.push('Item')"
                @keypress.enter.stop="props.question.solution.push('Item')"
            >
                <span class="material-symbols-rounded add"> add </span>
                Add
            </div>
        </div>
    </div>
</template>

<style scoped>
@import "./common.css";
</style>
