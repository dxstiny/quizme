<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import Question from "@/components/questions/index.vue";
import IconButton from "@/components/IconButton.vue";
import { useRouter, useRoute } from "vue-router";
import { useCourseStore } from "@/stores/course";
import { type IRun } from "@/quiz";
import { useStatsStore } from "@/stores/stats";
import type { ICourse } from "@/course";
import { checkNumber, checkTextAnswer } from "@/answerCorrect";

const courses = useCourseStore();
const statStore = useStatsStore();
const courseId = ref(useRoute().params.id as string);

onMounted(() => {
    const route = useRoute();
    const id = route.params.id as string;
    courseId.value = id;
    currentQuestion.value = 0;
});

const run = ref({
    correct: [],
    wrong: [],
    startTime: new Date(),
    endTime: null
} as IRun);

const quiz = ref(courses.getQuiz(courseId.value));
const quizLength = quiz.value.questions.length;

const router = useRouter();
const currentQuestion = ref(0);

const activeQuestion = computed(() => {
    return quiz.value.questions[currentQuestion.value];
});

const answered = computed(() => {
    const question = activeQuestion.value;
    if (!question) return false;

    if (question.type === "flashcard") return true;

    if (question.type == "matching") {
        const answer = question.answer || {};
        const solution = question.solution || {};
        return Object.keys(solution).every((s) => answer[s] === solution[s]);
    }

    return quiz.value.questions[currentQuestion.value]?.answer != null;
});
const hasTip = computed(() => {
    return quiz.value.questions[currentQuestion.value]?.hint != null;
});
const showTip = () => {
    alert(quiz.value.questions[currentQuestion.value].hint);
};
const checking = ref(false);
const correct = () => {
    if (["flashcard", "matching"].includes(activeQuestion.value.type)) {
        next();
        return true;
    }

    if (activeQuestion.value.type == "multiple-answer") {
        const solution = activeQuestion.value.solution || [];
        const answer = activeQuestion.value.answer || [];
        return solution.every((s) => answer.includes(s));
    }

    if (activeQuestion.value.type == "ordering") {
        const solution = activeQuestion.value.solution || [];
        const answer = activeQuestion.value.answer || [];
        ("");
        return solution.every((s, i) => s === answer[i]);
    }

    if (activeQuestion.value.type === "text-answer") {
        return checkTextAnswer(activeQuestion.value);
    }

    if (activeQuestion.value.type === "number-answer") {
        return checkNumber(activeQuestion.value);
    }

    return activeQuestion.value.answer === solution.value;
};
const checkText = computed(() => {
    if (["matching", "flashcard"].includes(activeQuestion.value?.type)) {
        return "Continue";
    }
    return "Check";
});
const solution = computed(() => {
    return activeQuestion.value.solution;
});
const solutionText = computed(() => {
    const question = activeQuestion.value;

    if (question.type === "multiple-choice") {
        return question.options[question.solution];
    }
    if (question.type === "multiple-answer") {
        return question.solution.map((s) => question.options[s]).join(", ");
    }
    if (question.type === "true-false") {
        return question.solution ? "True" : "False";
    }
    if (question.type === "text-answer") {
        if (question.solution) {
            return question.solution;
        }
        if (question.solutionRegex) {
            return `Matches ${question.solutionRegex}`;
        }
        if (question.solutionAny) {
            return `Matches any of ${question.solutionAny.join(", ")}`;
        }
        if (question.solutionAll) {
            return `Matches all of ${question.solutionAll.join(", ")}`;
        }
        return "Any";
    }
    if (question.type === "number-answer") {
        if (question.min != null && question.max != null) {
            return "Between " + question.min + " and " + question.max;
        }
        return `${question.solution} (+/- ${question.delta})`;
    }
    if (question.type === "ordering") {
        return question.solution.join(", ");
    }
});
const next = () => {
    checking.value = false;
    currentQuestion.value++;
    onEnd();
};
const showEnd = () => {
    return currentQuestion.value === quiz.value.questions.length;
};
const onEnd = () => {
    if (!showEnd()) return;
    run.value.endTime = new Date();
    statStore.resetStreak();
    statStore.addRun(run.value);
};

const quit = () => {
    if (currentQuestion.value === 0) {
        router.push("/");
        return;
    }

    if (confirm("Are you sure you want to quit?")) {
        router.push("/");
    }
};

const check = () => {
    checking.value = true;
    const thisId = activeQuestion.value.id;
    const thisCourse = courses.getCourse(courseId.value) as ICourse;
    const question = activeQuestion.value;

    if (correct()) {
        run.value.correct.push(thisId);
        courses.onCorrectQuestion(thisCourse, question);
        statStore.addToStreak();
        return;
    }

    run.value.wrong.push(thisId);
    courses.onIncorrectQuestion(thisCourse, question);
    statStore.resetStreak();

    if (quiz.value.questions.filter((q) => q.id === thisId).length === 1) {
        quiz.value.questions.push(question);
        // remove answer
        delete quiz.value.questions[quiz.value.questions.length - 1].answer;
    }
};

const formattedRunTime = computed(() => {
    if (run.value.endTime == null) return 0;
    /*
    m:ss
    */
    const diff = run.value.endTime.getTime() - run.value.startTime.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const ss = (seconds - minutes * 60).toString().padStart(2, "0");

    return `${minutes}:${ss}`;
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        if (checking.value) {
            next();
            return;
        }

        if (!answered.value) return;
        check();
    }
});

let previousMistakesShown = ref(false);
let timeout: any = null;
const showPreviousMistakes = () => {
    if (timeout) return true;
    if (previousMistakesShown.value) return false;

    if (currentQuestion.value >= quizLength) {
        timeout = window.setTimeout(() => {
            previousMistakesShown.value = true;
        }, 3000);

        return true;
    }
    return false;
};
</script>
<template>
    <div class="quiz">
        <template v-if="!showEnd()">
            <div class="header">
                <h1>{{ quiz.title }}</h1>
                <div class="flex gap-2">
                    <span
                        @click="quit"
                        class="material-symbols-rounded muted cursor-pointer"
                        >close</span
                    >
                    <progress
                        :max="quiz.questions.length"
                        :value="currentQuestion + (checking ? 1 : 0)"
                    />
                </div>
            </div>
            <div class="body">
                <div
                    v-if="showPreviousMistakes() && !previousMistakesShown"
                    class="correct-missed"
                >
                    <h1>
                        Let's correct the exercises you got wrong last time!
                    </h1>
                </div>
                <Question
                    v-else
                    :question="quiz.questions[currentQuestion]"
                    :disabled="checking"
                />
            </div>
        </template>
        <div
            class="end"
            v-else
        >
            <h1>Well done!</h1>
            <div class="review">
                <div class="score">
                    <span>SCORE</span>
                    <span class="value">
                        {{
                            Math.round(
                                (run.correct.length / quiz.questions.length) *
                                    100
                            )
                        }}
                        %
                    </span>
                </div>
                <div class="time">
                    <span>TIME</span>
                    <span class="value">{{ formattedRunTime }}</span>
                </div>
            </div>
        </div>
        <div class="footer">
            <div
                class="check"
                v-if="showEnd()"
            >
                <IconButton
                    class="left"
                    label="Review Lesson"
                    type="minimal-grey"
                />
                <IconButton
                    class="right"
                    label="Continue"
                    type="submit"
                    @click="router.push('/')"
                />
            </div>
            <div
                class="check"
                v-else-if="!checking"
            >
                <IconButton
                    class="left"
                    icon="lightbulb"
                    label="Show Tip"
                    type="minimal-blue"
                    v-if="hasTip"
                    @click="showTip"
                />
                <IconButton
                    class="right"
                    :label="checkText"
                    type="submit"
                    :disabled="!answered"
                    @click="check"
                />
            </div>
            <div
                class="checking"
                v-else
            >
                <div
                    class="correct"
                    v-if="correct()"
                >
                    <div class="continue">
                        <div class="icon">
                            <span class="material-symbols-rounded">check</span>
                        </div>
                    </div>
                    <div class="text">
                        <h2>Correct!</h2>
                    </div>
                    <div class="continue">
                        <IconButton
                            label="Continue"
                            type="submit"
                            @click="next"
                        />
                    </div>
                </div>
                <div
                    class="wrong"
                    v-else
                >
                    <div class="continue">
                        <div class="icon">
                            <span class="material-symbols-rounded">close</span>
                        </div>
                    </div>
                    <div class="text">
                        <h2>Correct solution:</h2>
                        <p>
                            {{ solutionText }}
                        </p>
                    </div>
                    <div class="continue">
                        <IconButton
                            label="Continue"
                            type="action-red"
                            @click="next"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
/*
float in left, stay middle, float out right in 3s
 */
@keyframes float-in {
    0% {
        transform: translateX(-30%);
        opacity: 0;
    }
    30% {
        transform: translateX(0);
        opacity: 1;
    }
    70% {
        transform: translateX(0);
        opacity: 1;
    }
    100% {
        transform: translateX(30%);
        opacity: 0;
    }
}

.correct-missed {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    & h1 {
        animation: float-in 3s ease-in-out;
    }
}

.quiz {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100svh;
    max-height: 100svh;
    overflow: hidden;

    .end {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
        padding-bottom: 5em;

        & h1 {
            color: var(--fg-yellow);
        }

        .review {
            display: flex;
            gap: 1em;

            & > div {
                display: flex;
                flex-direction: column;
                align-items: center;
                background: var(--fg-yellow);
                color: white;
                border-radius: 1em;
                padding: 2px;
                width: 100%;

                .value {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 1.5rem;
                    border-radius: 0.6em;
                    font-weight: 900;
                    background: var(--bg-base);
                    color: var(--fg-yellow);
                    padding: 1em;
                    width: max-content;
                }
            }
        }
    }

    .body {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        overflow: auto;
    }

    .footer {
        display: flex;
        justify-content: center;

        .check {
            width: 100%;
            display: grid;
            grid-template-columns: repeat(2, fit-content);
            justify-content: space-between;
            align-items: center;

            .left {
                grid-column: 1;
            }

            .right {
                grid-column: 2;
            }
        }
    }

    & > div {
        padding: 0 1em;
        width: calc(100% - 2em);

        @media screen and (min-width: 1080px) {
            max-width: 1080px;
            padding: 0;
        }
    }

    .footer {
        max-width: none;
        padding: 1em 0;
        width: 100%;
        min-height: 102px;

        .checking,
        .check {
            padding: 0 1em;
        }

        & > div {
            @media screen and (min-width: 1080px) {
                max-width: 1080px;
            }
        }
    }
}

progress {
    width: 100%;
    height: 1rem;
    border: none;
    border-radius: 0.5rem;
    appearance: none;

    &::-webkit-progress-bar {
        border-radius: 0.5rem;
        background-color: var(--bg-base-lt);
    }

    &::-webkit-progress-value {
        border-radius: 0.5rem;
        background-color: var(--c-good);
    }
}

.checking {
    width: 100%;

    .wrong,
    .correct {
        display: grid;
        grid-template-columns: min-content 1fr max-content;
        align-items: start;
        gap: 1em;
        height: 100%;

        &.wrong {
            color: var(--fg-red);
        }
        &.correct {
            color: var(--fg-green);
        }

        & h2 {
            font-weight: 900;
        }

        .continue {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
        }
    }

    .icon {
        display: flex;
        justify-content: center;
        align-items: center;
        background: var(--bg-base);
        width: min-content;
        border-radius: 1000vmax;

        & span {
            font-size: 4rem;
            font-variation-settings: "wght" 900;
        }
    }
}

.footer:has(.wrong) {
    background: var(--c-red-ltr);
}

.footer:has(.correct) {
    background: var(--c-green-ltr);
}

.footer:has(.check) {
    border-top: 2px solid var(--bg-base-lt);
}
</style>
