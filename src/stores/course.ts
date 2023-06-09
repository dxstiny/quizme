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
        return true;
    };

    const getQuiz = (id: string, length = 15) => {
        const course = getCourse(id);

        if (!course) {
            throw new Error(`Course ${id} not found`);
        }

        return generateQuiz(course, length);
    };

    const downloadCourse = (course: ICourse) => {
        const element = document.createElement("a");
        const file = new Blob([JSON.stringify(course, null, 4)], {
            type: "application/json"
        });
        element.href = URL.createObjectURL(file);
        element.download = `${course.title}.json`;
        element.click();
    };

    const uploadCourse = () => {
        return new Promise<ICourse>((resolve, reject) => {
            const element = document.createElement("input");
            element.type = "file";
            element.accept = "application/json";
            element.onchange = () => {
                if (!element.files) {
                    reject(new Error("No file selected"));
                    return;
                }

                const file = element.files[0];
                const reader = new FileReader();
                reader.onload = () => {
                    const result = reader.result as string;
                    try {
                        const course = JSON.parse(result);
                        resolve(course);
                    } catch (error) {
                        reject(error);
                    }
                };
                reader.readAsText(file);
            };
            element.click();
        });
    };

    const addFromUpload = async () => {
        const course = await uploadCourse();
        addCourse(course);
    };

    return {
        courses,
        addCourse,
        getCourse,
        removeCourse,
        getQuiz,
        downloadCourse,
        addFromUpload
    };
});
