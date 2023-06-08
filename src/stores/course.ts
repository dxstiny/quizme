import { ref, watch } from "vue";
import { defineStore } from "pinia";
import { generateQuiz, type ICourse } from "@/course";

const STORAGE_KEY = "quizme.courses";

export const useCourseStore = defineStore("course", () => {
    const storedCourses = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    const courses = ref<ICourse[]>(storedCourses);

    watch(
        courses,
        (courses) => {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(courses));
        },
        { deep: true }
    );

    const addCourse = (course: ICourse) => {
        courses.value.push(course);
    };

    const getCourse = (id: string) => {
        return courses.value.find((course) => course.id === id);
    };

    const removeCourse = (id: string) => {
        const index = courses.value.findIndex((course) => course.id === id);
        courses.value.splice(index, 1);
    };

    const getQuiz = (id: string, length = 15) => {
        const course = getCourse(id);

        if (!course) {
            throw new Error(`Course ${id} not found`);
        }

        return generateQuiz(course, length);
    };

    return { courses, addCourse, getCourse, removeCourse, getQuiz };
});
