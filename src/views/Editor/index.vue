<script setup lang="ts">
import Question from "../Quiz/Question.vue";
import EditableText from "@/components/EditableText.vue";
import IconButton from "@/components/IconButton.vue";
import { useRoute, useRouter } from "vue-router";
import { useCourseStore } from "@/stores/course";
import Dropdown from "@/components/Dropdown.vue";
import {
    TYPE_OPTIONS,
    type Question as IQuestion,
    type IMultipleChoiceQuestion,
    type IMultipleAnswerQuestion
} from "@/quiz";
import WithSidebar from "../WithSidebar.vue";
import { ref } from "vue";

const route = useRoute();
const router = useRouter();
const store = useCourseStore();

const id = route.params.id;
const course = store.courses.find((course) => course.id === id);

if (!course) {
    router.push("/");
}

const changeQuestionType = (question: IQuestion, to: string) => {
    const currentType = question.type;
    if (currentType === to) return false;
    let verify = false;

    // @ts-ignore
    if (typeof question.solution === "array") {
        // @ts-ignore
        verify = question.solution.length > 0;
    } else if (typeof question.solution === "object") {
        // @ts-ignore
        verify = Object.keys(question.solution).length > 0;
    } else {
        verify = !!question.solution;
    }

    if (verify) {
        if (!confirm("Are you sure you want to change the question type?")) {
            return false;
        }
    }

    if (to === "multiple-choice") {
        (question as IMultipleChoiceQuestion).options = [];
        (question as IMultipleChoiceQuestion).solution = -1;
    } else if (to === "multiple-answer") {
        (question as IMultipleAnswerQuestion).options = [];
        (question as IMultipleAnswerQuestion).solution = [];
    } else if (to === "ordering") {
        question.solution = [];
    } else if (to === "matching") {
        question.solution = {};
    } else {
        question.solution = "";
    }

    // @ts-ignore
    question.type = to;
    return true;
};

const collapsedQuestions = ref<string[]>([]);
const toggleCollapse = (questionId: string) => {
    if (collapsedQuestions.value.includes(questionId)) {
        collapsedQuestions.value = collapsedQuestions.value.filter(
            (id) => id !== questionId
        );
    } else {
        collapsedQuestions.value.push(questionId);
    }
};
</script>
<template>
    <WithSidebar>
        <div class="wrap">
            <div class="editor">
                <div
                    class="meta"
                    v-if="course"
                >
                    <EditableText
                        v-model="course.title"
                        class="h1"
                    >
                        <h1>{{ course.title }}</h1>
                    </EditableText>
                    <EditableText v-model="course.description">
                        <p class="muted">{{ course.description }}</p>
                    </EditableText>
                    <div class="progress">
                        <IconButton
                            icon="replay"
                            @click="store.resetProgress(course)"
                        />
                        <div class="bar">
                            <progress
                                :value="store.progress(course)"
                                max="100"
                            />
                        </div>
                        <span class="muted">{{ store.progress(course) }}%</span>
                    </div>
                    <div class="actions">
                        <IconButton
                            icon="file_download"
                            label="Download"
                            @click="store.downloadCourse(course)"
                        />
                        <IconButton
                            icon="school"
                            label="Start"
                            type="action-green"
                            @click="router.push(`/quiz/${course.id}`)"
                        />
                        <IconButton
                            icon="delete"
                            label="Delete"
                            type="action-red"
                            @click="
                                store.removeCourse(course.id) &&
                                    router.push('/courses')
                            "
                        />
                    </div>
                </div>
                <div
                    class="questions"
                    v-if="course"
                >
                    <div
                        v-for="(question, index) in course.questions"
                        class="question-wrapper"
                    >
                        <div class="header">
                            <div class="left">
                                <IconButton
                                    icon="arrow_upward"
                                    @click="
                                        store.moveQuestionUp(course, question)
                                    "
                                />
                                <span class="muted">
                                    {{ index + 1 }} /
                                    {{ course.questions.length }}
                                </span>
                                <IconButton
                                    icon="arrow_downward"
                                    @click="
                                        store.moveQuestionDown(course, question)
                                    "
                                />
                            </div>
                            <div class="middle">
                                <Dropdown
                                    :options="TYPE_OPTIONS"
                                    v-model="question.type"
                                    :onChange="
                                        (to) => changeQuestionType(question, to)
                                    "
                                    label="type"
                                />
                                <IconButton
                                    icon="delete"
                                    type="action-red"
                                    @click="
                                        course.questions.splice(
                                            course.questions.indexOf(question),
                                            1
                                        )
                                    "
                                />
                            </div>
                            <div class="right">
                                <span
                                    class="muted material-symbols-rounded cursor-pointer"
                                    @click="toggleCollapse(question.id)"
                                >
                                    {{
                                        collapsedQuestions.includes(question.id)
                                            ? "expand_less"
                                            : "expand_more"
                                    }}
                                </span>
                            </div>
                        </div>
                        <div
                            class="content"
                            v-if="!collapsedQuestions.includes(question.id)"
                        >
                            <Question
                                :question="question"
                                editable
                            />
                        </div>
                    </div>
                    <div class="actions">
                        <IconButton
                            icon="add"
                            label="Add"
                            type="action-green"
                            @click="
                                course.questions.push({
                                    id: Math.random()
                                        .toString(36)
                                        .substring(2, 9),
                                    type: 'text-answer',
                                    title: 'Question',
                                    question: 'Question',
                                    solution: ''
                                })
                            "
                        />
                    </div>
                </div>
            </div>
        </div>
    </WithSidebar>
</template>

<style scoped>
@import "@/assets/progress.css";

.progress {
    grid-template-columns: max-content 1fr max-content;
    margin-bottom: 2em;
}

.wrap {
    display: flex;
    flex-direction: column;
    align-items: center;

    .editor {
        max-width: 1080px;
        padding: 1em;
        width: calc(100% - 2em);

        display: grid;
        grid-template-columns: 200px 1fr;
        gap: 1em;
    }
}

.actions {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
}

.questions {
    display: flex;
    flex-direction: column;
    gap: 1em;

    .content {
        padding-top: 1em;
    }

    .question-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        border-radius: 1em;
        border: 2px solid var(--bg-base-lt);
        padding-bottom: 1em;

        .header {
            display: grid;
            grid-template-columns: max-content 1fr max-content;
            align-items: center;
            gap: 1em;
            padding: 1em;

            &:not(:last-child) {
                border-bottom: 2px solid var(--bg-base-lt);
            }

            .left {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 0.5em;
            }
        }

        .middle {
            display: flex;
            gap: 1em;
            align-items: flex-end;

            .dropdown {
                flex: 1;
            }
        }

        .right {
            display: flex;
            gap: 1em;
            align-items: flex-start;
            height: 100%;
        }
    }
}
</style>
