import type { IQuiz } from "./quiz";

export interface ICourse extends IQuiz {
    mastered: string[]; // correct 2x
    seen: string[]; // correct 1x
    bad: Record<string, number>; // [questionId, count]
}

export const generateQuiz = (course: ICourse, length = 15): IQuiz => {
    const quiz: IQuiz = {
        id: course.id,
        title: course.title,
        description: course.description,
        questions: []
    };

    quiz.questions = course.questions.slice(0, length);

    return JSON.parse(JSON.stringify(quiz));
};
