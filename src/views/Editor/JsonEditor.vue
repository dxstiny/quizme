<script setup lang="ts">
import Question from "@/components/questions/index.vue";
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
import Monaco from "@/components/Monaco.vue";

const route = useRoute();
const router = useRouter();
const store = useCourseStore();

const id = route.params.id;
const course = store.courses.find((course) => course.id === id);

const stringValue = ref(JSON.stringify(course, null, 4));

const save = () => {
    if (!course) return;
    const newCourse = JSON.parse(stringValue.value);
    for (const key in newCourse) {
        (course as any)[key] = newCourse[key];
    }
    router.push(`/courses/${newCourse.id}`);
};

if (!course) {
    router.push("/");
}
</script>
<template>
    <WithSidebar>
        <div class="wrap">
            <div class="editor">
                <div class="meta">
                    <IconButton
                        icon="arrow_back"
                        @click="router.back()"
                    />
                    <IconButton
                        icon="save"
                        label="Save"
                        @click="save"
                        type="action-green"
                    />
                </div>
                <div class="content">
                    <Monaco v-model="stringValue" />
                </div>
            </div>
        </div>
    </WithSidebar>
</template>

<style scoped>
@import "@/assets/progress.css";

.wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;

    .editor {
        padding: 1em;
        width: calc(100% - 2em);
        height: calc(100% - 2em);

        display: grid;
        grid-template-columns: 200px 1fr;
        gap: 1em;
        align-items: start;

        & .meta {
            position: sticky;
            top: 1em;
            display: grid;
            grid-template-columns: max-content 1fr;
            gap: 1em;
        }

        & .content {
            height: 100%;
        }
    }
}

textarea {
    width: 100%;
    min-height: 90vh;
    font-family: monospace;
    font-size: 1rem;
    padding: 1em;
    border: 2px solid var(--bg-base-lt);
    border-radius: 0.5em;
    white-space: pre;
    resize: none;
}

@media screen and (max-width: 768px) {
    .editor {
        grid-template-columns: 1fr !important;
    }

    .questions {
        display: none;
    }
}
</style>

<style>
.monaco-editor {
    border: 2px solid var(--bg-base-lt);
    outline: none;
    border-radius: 0.5em;
    overflow: clip;
}
</style>
