import type { ITextAnswerQuestion } from "./quiz";

export const checkTextAnswer = (question: ITextAnswerQuestion) => {
    let answer = question.answer;
    let exactSolution = question.solution;
    if (!answer) return false;

    if (question.ignoreCase) {
        answer = answer.toLowerCase();
        exactSolution = exactSolution.toLowerCase();
    }

    return answer === exactSolution;
};
