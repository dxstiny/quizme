import type { IQuiz, Question } from "./quiz";
import { useCourseStore } from "./stores/course";
import { useSettingsStore } from "./stores/settings";

export interface ICourse extends IQuiz {
    score?: Record<string, number>; // [questionId, count]
}

const pickQuestion = (
    questions: Question[]
): { pick: Question; questions: Question[] } => {
    const index = Math.floor(Math.random() * questions.length);
    const picked = questions[index];
    questions = questions.filter((q) => q.id !== picked.id);
    return {
        pick: picked,
        questions
    };
};

const weightQuestions = (
    course: ICourse,
    questions: Question[]
): Question[] => {
    const weightedQuestions: Question[] = [];
    /**
     * weight = 1 if score >= 2
     * weight = 2 if score == 1
     * weight = 3 if score == 0 || score == undefined
     * weight -score + 4 if score < 0
     *
     * weight means how many times the question will be added to the list
     */

    const weight = (score: number | undefined) => {
        if (!score) return 3;
        if (score >= 2) return 1;
        if (score === 1) return 2;
        return -score + 4;
    };

    for (const question of questions) {
        const score = course.score?.[question.id];
        const w = weight(score);
        for (let i = 0; i < w; i++) {
            weightedQuestions.push(question);
        }
    }

    return weightedQuestions;
};

export const generateQuiz = (
    course: ICourse,
    length: number | null = null
): IQuiz => {
    length = length || useSettingsStore().settings.defaultLength;

    console.log("Generating quiz", course, length);

    const quiz = JSON.parse(JSON.stringify(course)) as IQuiz;

    let weightedQuestions = weightQuestions(course, quiz.questions);
    quiz.questions = [];

    for (
        let i = 0;
        weightedQuestions.length && (i < length || length == -1);
        i++
    ) {
        const pick = pickQuestion(weightedQuestions);
        weightedQuestions = pick.questions;
        quiz.questions.push(pick.pick);
    }

    console.log("Generated quiz", quiz);

    return quiz;
};
