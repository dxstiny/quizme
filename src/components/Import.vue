<script setup lang="ts">
import { useCourseStore } from "@/stores/course";
import Dropdown from "./Dropdown.vue";
import { computed, onMounted, ref } from "vue";
import IconButton from "./IconButton.vue";
import type { Question } from "@/quiz";

const store = useCourseStore();
const questions = ref([] as Question[]);
const importDialog = ref<HTMLDialogElement>();

const loadFromStorage = () => {
    questions.value = JSON.parse(
        window.localStorage.getItem("quizme.import") || "[]"
    );
    if (questions.value.length > 0) {
        importDialog.value?.showModal();
    } else {
        importDialog.value?.close();
    }
};

var originalSetItem = localStorage.setItem;
localStorage.setItem = function () {
    // @ts-ignore
    originalSetItem.apply(this, arguments);
    loadFromStorage();
};

onMounted(loadFromStorage);

const options = computed(() => {
    const courses = store.courses;
    const options = courses.map((course) => ({
        label: course.title,
        value: course.id
    }));

    return options;
});

const toCourse = ref(options.value[0]?.value);

const importQuestions = () => {
    const course = store.courses.find((course) => course.id === toCourse.value);
    if (!course) return;
    course.questions.push(...questions.value);
    window.localStorage.removeItem("quizme.import");
    importDialog.value?.close();
};
</script>
<template>
    <dialog
        ref="importDialog"
        class="import"
    >
        <div class="header">
            <h2>Import {{ questions.length }} questions?</h2>
        </div>
        <div class="content">
            <Dropdown
                :options="options"
                v-model="toCourse"
            />
            <IconButton
                label="import"
                icon="file_upload"
                type="action-green"
                @click="importQuestions"
            />
        </div>
    </dialog>
</template>
<style scoped>
dialog {
    border-radius: 1em;
    border: 2px solid var(--bg-base-lt);
    background: var(--bg-base);
    color: var(--fg-base);

    .content {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        gap: 1em;
    }
}
</style>
