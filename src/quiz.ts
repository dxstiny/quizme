interface IQuestion {
    id: string;
    title: string;
    question: string;
    hint?: string;
    type:
        | "multiple-choice"
        | "multiple-answer"
        | "text-answer"
        | "number-answer"
        | "true-false"
        | "fill-in-the-blank"
        | "matching"
        | "ordering";
    solution:
        | string
        | number
        | boolean
        | string[]
        | number[]
        | Record<string, string>;
    answer?:
        | string
        | number
        | boolean
        | string[]
        | number[]
        | Record<string, string>;
}

export interface IMultipleChoiceQuestion extends IQuestion {
    type: "multiple-choice";
    options: string[];
    solution: number;
    answer?: number;
}

export interface IMultipleAnswerQuestion extends IQuestion {
    type: "multiple-answer";
    options: string[];
    solution: number[];
    answer?: number[];
}

export interface ITextAnswerQuestion extends IQuestion {
    type: "text-answer";
    solution: string;
    answer?: string;
}

export interface INumberAnswerQuestion extends IQuestion {
    type: "number-answer";
    solution: number;
    answer?: number;
}

export interface ITrueFalseQuestion extends IQuestion {
    type: "true-false";
    solution: boolean;
    answer?: boolean;
}

export interface IFillInTheBlankQuestion extends IQuestion {
    type: "fill-in-the-blank";
    solution: string[];
    answer?: string[];
}

export interface IMatchingQuestion extends IQuestion {
    type: "matching";
    solution: Record<string, string>;
    answer?: Record<string, string>;
}

export interface IOrderingQuestion extends IQuestion {
    type: "ordering";
    solution: string[];
    answer?: string[];
}

export const TYPE_OPTIONS = [
    {
        label: "Multiple Choice",
        value: "multiple-choice"
    },
    {
        label: "Multiple Answer",
        value: "multiple-answer"
    },
    {
        label: "Text Answer",
        value: "text-answer"
    },
    {
        label: "Number Answer",
        value: "number-answer"
    },
    {
        label: "True/False",
        value: "true-false"
    },
    {
        label: "Fill in the Blank",
        value: "fill-in-the-blank"
    },
    {
        label: "Matching",
        value: "matching"
    },
    {
        label: "Ordering",
        value: "ordering"
    }
];

export type Question =
    | IMultipleChoiceQuestion
    | IMultipleAnswerQuestion
    | ITextAnswerQuestion
    | INumberAnswerQuestion
    | ITrueFalseQuestion
    | IFillInTheBlankQuestion
    | IMatchingQuestion
    | IOrderingQuestion;

export interface IQuiz {
    id: string;
    title: string;
    description: string;
    questions: Question[];
}

export interface IRun {
    correct: string[];
    wrong: string[];
    startTime: Date;
    endTime: Date | null;
}
