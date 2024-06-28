import { ref, watch } from "vue";
import { defineStore } from "pinia";
import { generateQuiz, type ICourse, type IRemote } from "@/course";
import type { Question } from "@/quiz";
import gistClient from "@/helper/gistClient";
import { pull, push } from "@/helper/share";

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

    const getQuiz = (id: string, length: number | null = null) => {
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

    const uploadCourses = () => {
        return new Promise<ICourse[]>((resolve, reject) => {
            const element = document.createElement("input");
            element.type = "file";
            element.accept = "application/json";
            element.multiple = true;
            element.onchange = async () => {
                if (!element.files) {
                    reject(new Error("No file selected"));
                    return;
                }

                const promises = [] as Promise<ICourse>[];
                for (const file of Array.from(element.files)) {
                    promises.push(
                        new Promise((resolve, reject) => {
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
                        })
                    );
                }

                resolve(await Promise.all(promises));
            };
            element.click();
        });
    };

    const shareCourse = async (course: ICourse, asPublic: boolean = false) => {
        const result = await push(course, asPublic);
        if (result.course) {
            courses.value.find((x) => x.id === course.id)!.remote =
                result.course.remote;
        }
        return result.link;
    };

    const addFromUpload = async () => {
        const courses = await uploadCourses();
        courses.map((x) => addCourse(x));
    };

    const moveQuestionUp = (course: ICourse, question: Question) => {
        const index = course.questions.findIndex((q) => q.id === question.id);
        if (index === 0) {
            return;
        }
        course.questions.splice(index, 1);
        course.questions.splice(index - 1, 0, question);
    };

    const moveQuestionDown = (course: ICourse, question: Question) => {
        const index = course.questions.findIndex((q) => q.id === question.id);
        if (index === course.questions.length - 1) {
            return;
        }
        course.questions.splice(index, 1);
        course.questions.splice(index + 1, 0, question);
    };

    const onCorrectQuestion = (course: ICourse, question: Question) => {
        if (!course.score) {
            course.score = {};
        }

        if (!course.score[question.id]) {
            course.score[question.id] = 1;
            return;
        }

        course.score[question.id]++;
    };

    const onIncorrectQuestion = (course: ICourse, question: Question) => {
        if (!course.score) {
            course.score = {};
        }

        if (!course.score[question.id]) {
            course.score[question.id] = -1;
            return;
        }

        course.score[question.id]--;
    };

    const progress = (course: ICourse) => {
        if (!course.score) {
            return 0;
        }

        const total = course.questions.length;
        // mastered if answered correctly 2 times
        const mastered = Object.values(course.score).filter(
            (score) => score >= 2
        ).length;
        // ok if answered correctly 1 time
        const ok = Object.values(course.score).filter(
            (score) => score >= 1
        ).length;
        return Math.round((50 * (ok + mastered)) / total);
    };

    const resetProgress = (course: ICourse) => {
        course.score = {};
    };

    const pullFromRemote = async (options: {
        course?: ICourse;
        remote?: IRemote;
    }) => {
        const { course, remote } = options;

        console.log("Pulling course", course, remote);
        const pullSource =
            remote?.identifier ?? course?.remote?.[0]?.identifier;

        console.log("Pulling from", pullSource);

        if (!pullSource) {
            throw new Error("No remote source");
        }

        const newCourse = await pull(pullSource);
        if (newCourse.error) {
            throw new Error(newCourse.error);
        }

        if (course) {
            course.title = newCourse.course.title;
            course.description = newCourse.course.description;
            course.questions = newCourse.course.questions;
            return course;
        }
    };

    return {
        courses,
        addCourse,
        getCourse,
        removeCourse,
        getQuiz,
        downloadCourse,
        addFromUpload,
        moveQuestionUp,
        moveQuestionDown,
        onCorrectQuestion,
        onIncorrectQuestion,
        progress,
        resetProgress,
        shareCourse,
        pull: pullFromRemote
    };
});
