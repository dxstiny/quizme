<script lang="ts" setup>
import { computed, ref } from "vue";
import Question from "./Question.vue";
import IconButton from "@/components/IconButton.vue";
import { useRouter, useRoute } from "vue-router";
import { useCourseStore } from "@/stores/course";
import { type IRun } from "@/quiz";

const route = useRoute();
const courses = useCourseStore();

const run = ref({
    correct: [],
    wrong: [],
    startTime: new Date(),
    endTime: null
} as IRun);

const quiz = ref(courses.getQuiz(route.params.id as string));

const router = useRouter();
const currentQuestion = ref(0);

const answered = computed(() => {
    return quiz.value.questions[currentQuestion.value]?.answer != null;
});
const hasTip = computed(() => {
    return quiz.value.questions[currentQuestion.value]?.hint != null;
});
const showTip = () => {
    alert(quiz.value.questions[currentQuestion.value].hint);
};
const checking = ref(false);
const correct = computed(() => {
    return (
        quiz.value.questions[currentQuestion.value].answer === solution.value
    );
});
const solution = computed(() => {
    return quiz.value.questions[currentQuestion.value].solution;
});
const solutionText = computed(() => {
    const question = quiz.value.questions[currentQuestion.value];

    if (question.type === "multiple-choice") {
        return question.options[question.solution];
    }
});
const next = () => {
    checking.value = false;
    currentQuestion.value++;
    onEnd();
};
const showEnd = computed(() => {
    return currentQuestion.value === quiz.value.questions.length;
});
const onEnd = () => {
    console.log("onEnd");

    if (!showEnd.value) return;
    run.value.endTime = new Date();

    console.log(run.value);
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
    const thisId = quiz.value.questions[currentQuestion.value].id;

    if (correct.value) {
        run.value.correct.push(thisId);
        return;
    }

    run.value.wrong.push(thisId);

    if (quiz.value.questions.filter((q) => q.id === thisId).length === 1) {
        quiz.value.questions.push(quiz.value.questions[currentQuestion.value]);
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
        if (showEnd.value) {
            router.push("/");
            return;
        }

        if (checking.value) {
            next();
            return;
        }

        if (!answered.value) return;
        check();
    }
});
</script>
<template>
    <div class="quiz">
        <template v-if="!showEnd">
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
                <Question
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
                v-if="showEnd"
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
                    label="Check"
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
                    v-if="correct"
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
.quiz {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100svh;

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
                    background: white;
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
        width: 100%;

        @media screen and (min-width: 1080px) {
            max-width: 1080px;
        }
    }

    .footer {
        max-width: none;
        padding: 1em 0;

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
        grid-template-columns: min-content 1fr 200px;
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
