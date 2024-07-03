import type { IQuiz, Question } from "./quiz";
import { useCourseStore } from "./stores/course";
import { useSettingsStore } from "./stores/settings";

export interface IRemote {
    identifier: string;
}

export interface ICourse extends IQuiz {
    score?: Record<string, number>; // [questionId, count]
    remote?: IRemote[];
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
    for (const question of course.questions) {
        delete question.answer;
    }

    const quiz = JSON.parse(JSON.stringify(course)) as IQuiz;
    let questions = quiz.questions;

    if (length == -2) {
        // filter out mastered questions
        questions = questions.filter((q) => (course.score?.[q.id] ?? 0) < 2);
        if (!questions.length) {
            questions = quiz.questions;
        }
    }

    let weightedQuestions = weightQuestions(quiz, questions);
    quiz.questions = [];

    for (
        let i = 0;
        weightedQuestions.length && (i < length || length < 0);
        i++
    ) {
        const pick = pickQuestion(weightedQuestions);
        weightedQuestions = pick.questions;
        quiz.questions.push(pick.pick);
    }

    console.log("Generated quiz", quiz);

    return quiz;
};
