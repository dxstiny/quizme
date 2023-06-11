import type { IQuiz } from "./quiz";
import { useSettingsStore } from "./stores/settings";

export interface ICourse extends IQuiz {
    mastered?: string[]; // correct 2x
    seen?: string[]; // correct 1x
    bad?: Record<string, number>; // [questionId, count]
}

export const generateQuiz = (
    course: ICourse,
    length: number | null = null
): IQuiz => {
    length = length || useSettingsStore().settings.defaultLength;

    console.log("Generating quiz", course, length);

    const quiz = JSON.parse(JSON.stringify(course)) as IQuiz;

    if (length !== -1) {
        quiz.questions = quiz.questions.slice(0, length);
    }

    for (const question of quiz.questions) {
        if (question.answer) {
            console.warn("Question already has an answer", question);
        }
        delete question.answer;
    }

    return quiz;
};
