<script setup lang="ts">
import IconButton from "@/components/IconButton.vue";
import WithSidebar from "../WithSidebar.vue";
import { useCourseStore } from "@/stores/course";

const courses = useCourseStore();
</script>
<template>
    <WithSidebar>
        <div class="dashboard">
            <div class="head">
                <h1>Courses</h1>
                <div class="actions">
                    <IconButton
                        icon="add"
                        label="Add"
                        type="action-green"
                        @click="
                            courses.addCourse({
                                title: '',
                                description: '',
                                questions: [],
                                id: Math.random().toString(36).substring(7)
                            })
                        "
                    />
                    <IconButton
                        icon="file_upload"
                        label="Upload"
                        @click="courses.addFromUpload"
                    />
                </div>
            </div>
            <div class="courses">
                <div
                    v-for="course in courses.courses"
                    class="course"
                >
                    <div class="info">
                        <h2>{{ course.title }}</h2>
                        <p class="muted">{{ course.description }}</p>
                    </div>
                    <div class="actions">
                        <IconButton
                            label="Edit"
                            icon="edit"
                            @click="$router.push(`/courses/${course.id}`)"
                        />
                        <IconButton
                            label="Learn"
                            icon="school"
                            @click="$router.push(`/quiz/${course.id}`)"
                        />
                    </div>
                </div>
            </div>
        </div>
    </WithSidebar>
</template>
<style scoped>
.dashboard {
    padding: 1em;
}

.head {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .actions {
        display: flex;
        gap: 1em;
    }
}

.courses {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}

.course {
    display: flex;
    flex-direction: row;
    gap: 2em;
    padding: 1em;
    border: 2px solid var(--bg-base-lt);
    border-radius: 1em;
    margin: 0.5em;

    &:hover {
        background: var(--bg-highlight);
    }

    & h2 {
        margin: 0;
    }

    .actions {
        display: flex;
        flex-direction: column;
        gap: 0.5em;
    }
}
</style>
