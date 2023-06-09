<script setup lang="ts">
import Question from "../Quiz/Question.vue";
import EditableText from "@/components/EditableText.vue";
import IconButton from "@/components/IconButton.vue";
import { useRoute, useRouter } from "vue-router";
import { useCourseStore } from "@/stores/course";

const route = useRoute();
const router = useRouter();
const store = useCourseStore();

const id = route.params.id;
const course = store.courses.find((course) => course.id === id);

if (!course) {
    router.push("/");
}
</script>
<template>
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
                            store.removeCourse(course.id) && router.push('/')
                        "
                    />
                </div>
            </div>
            <div
                class="questions"
                v-if="course"
            >
                <div v-for="question in course.questions">
                    <Question
                        :question="question"
                        editable
                    />
                </div>
            </div>
        </div>
    </div>
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

    :not(:last-child) {
        padding-bottom: 1em;
        border-bottom: 1px solid var(--bg-base-lt);
    }

    :not(:first-child) {
        padding-top: 1em;
    }
}
</style>
