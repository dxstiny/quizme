import { levenshtein } from "./levenshtein";
import type { INumberAnswerQuestion, ITextAnswerQuestion } from "./quiz";

export const checkTextAnswer = (question: ITextAnswerQuestion) => {
    let answer = question.answer;
    let exactSolution = question.solution;
    if (answer == null) return false;

    if (question.ignoreCase) {
        answer = answer.toLowerCase();
        exactSolution = exactSolution.toLowerCase();
    }
    if (question.ignoreWhitespace) {
        answer = answer.replace(/\s/g, "");
        exactSolution = exactSolution.replace(/\s/g, "");
    }
    if (question.ignorePunctuation) {
        answer = answer.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
        exactSolution = exactSolution.replace(
            /[.,\/#!$%\^&\*;:{}=\-_`~()]/g,
            ""
        );
    }

    if (question.solutionRegex) {
        const regex = new RegExp(question.solutionRegex);
        return regex.test(answer);
    }

    if (question.solutionAll?.length) {
        const solutions = question.solutionAll;
        return solutions.every((solution) => answer?.includes(solution));
    }

    if (question.solutionAny?.length) {
        const solutions = question.solutionAny;
        return solutions.some((solution) => answer?.includes(solution));
    }

    if (question.levenshtein) {
        const lev = levenshtein(answer, exactSolution);
        return lev <= question.levenshtein;
    }

    return answer == exactSolution;
};

export const checkNumber = (question: INumberAnswerQuestion) => {
    const answer = question.answer;

    if (answer == null) return false;

    if (question.min != null && answer < question.min) return false;
    if (question.max != null && answer > question.max) return false;
    if (question.min != null || question.max != null) return true;

    if (question.delta) {
        const delta = Math.abs(answer - question.solution);
        return delta <= question.delta;
    }

    return answer == question.solution;
};
