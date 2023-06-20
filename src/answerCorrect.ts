import { levenshtein, safeEval } from "./helpers";
import type { INumberAnswerQuestion, ITextAnswerQuestion } from "./quiz";

export const checkTextAnswer = (question: ITextAnswerQuestion) => {
    let answer = question.answer;
    let exactSolution = question.solution;
    let solutionAll = question.solutionAll;
    let solutionAny = question.solutionAny;
    if (answer == null) return false;

    if (question.ignoreCase) {
        answer = answer.toLowerCase();
        exactSolution = exactSolution.toLowerCase();
        solutionAll = solutionAll?.map((s) => s.toLowerCase());
        solutionAny = solutionAny?.map((s) => s.toLowerCase());
    }
    if (question.ignoreWhitespace) {
        answer = answer.replace(/\s/g, "");
        exactSolution = exactSolution.replace(/\s/g, "");
        solutionAll = solutionAll?.map((s) => s.replace(/\s/g, ""));
        solutionAny = solutionAny?.map((s) => s.replace(/\s/g, ""));
    }
    if (question.ignorePunctuation) {
        const regex = /[.,\/#!$%\^&\*;:{}=\-_`~()]/g;

        answer = answer.replace(regex, "");
        exactSolution = exactSolution.replace(regex, "");
        solutionAll = solutionAll?.map((s) => s.replace(regex, ""));
        solutionAny = solutionAny?.map((s) => s.replace(regex, ""));
    }

    if (question.solutionRegex) {
        let regex = safeEval(question.solutionRegex) as any;
        if (regex instanceof RegExp) {
            return regex.test(answer);
        }
        regex = new RegExp(question.solutionRegex);
        return regex.test(answer);
    }

    if (solutionAll?.length) {
        return solutionAll.every((solution) => answer?.includes(solution));
    }

    if (solutionAny?.length) {
        return solutionAny.some((solution) => answer?.includes(solution));
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
