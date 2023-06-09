import type { IQuiz } from "./quiz";

export interface ICourse extends IQuiz {
    mastered?: string[]; // correct 2x
    seen?: string[]; // correct 1x
    bad?: Record<string, number>; // [questionId, count]
}

export const generateQuiz = (course: ICourse, length = 15): IQuiz => {
    const quiz = JSON.parse(JSON.stringify(course)) as IQuiz;

    quiz.questions = quiz.questions.slice(0, length);

    for (const question of quiz.questions) {
        if (question.answer) {
            console.warn("Question already has an answer", question);
        }
        delete question.answer;
    }

    return quiz;
};
