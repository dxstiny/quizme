<script setup lang="ts">
import WithSidebar from "../WithSidebar.vue";
import { useCourseStore } from "@/stores/course";

const courses = useCourseStore();
</script>
<template>
    <WithSidebar>
        <div class="dashboard">
            <h1>Courses</h1>
            <div v-for="course in courses.courses">
                <RouterLink :to="`/quiz/${course.id}`">
                    {{ course.title }}
                </RouterLink>
            </div>
        </div>
    </WithSidebar>
</template>
<style scoped>
.dashboard {
    padding: 1em;
}
</style>
