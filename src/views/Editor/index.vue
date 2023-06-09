<script setup lang="ts">
import Question from "../Quiz/Question.vue";
import EditableText from "@/components/EditableText.vue";
import IconButton from "@/components/IconButton.vue";
import { useRoute, useRouter } from "vue-router";
import { useCourseStore } from "@/stores/course";
import Dropdown from "@/components/Dropdown.vue";
import { TYPE_OPTIONS, type Question as IQuestion } from "@/quiz";
import WithSidebar from "../WithSidebar.vue";

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
        // @ts-ignore
        question.options = [];
        question.solution = 0;
    } else if (to === "multiple-answer") {
        question.solution = [];
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
                                    router.push('/')
                            "
                        />
                    </div>
                </div>
                <div
                    class="questions"
                    v-if="course"
                >
                    <div
                        v-for="question in course.questions"
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
                            </div>
                            <div class="right">
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
                        </div>
                        <div class="content">
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
.wrap {
    display: flex;
    flex-direction: column;
    align-items: center;

    .editor {
        width: 100%;
        max-width: 1080px;
        margin: 1em;

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
            border-bottom: 2px solid var(--bg-base-lt);

            .left {
                display: flex;
                flex-direction: column;
                gap: 0.5em;
            }
        }
    }
}
</style>
