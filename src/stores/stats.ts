import { ref, computed, watch } from "vue";
import { defineStore } from "pinia";
import type { IRun } from "@/quiz";

const STORAGE_KEY = "quizme.stats";

interface IStats {
    start: string;
    streaks: number[];
    runs: IRun[];
}

export const useStatsStore = defineStore("stats", () => {
    const storedStats = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "{}"
    ) as IStats;
    const stats = ref<IStats>(storedStats);

    const resetStats = () => {
        if (
            stats.value.start &&
            new Date(stats.value.start).getDate() === new Date().getDate()
        ) {
            return;
        }

        stats.value = {
            start: new Date().toISOString(),
            streaks: [],
            runs: []
        };
    };

    watch(
        stats,
        (stats) => {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
        },
        {
            deep: true
        }
    );

    resetStats();

    const timeSpent = computed(() => {
        return stats.value.runs.reduce((acc, run) => {
            if (!run.endTime) {
                return acc;
            }

            if (typeof run.endTime === "string") {
                run.endTime = new Date(run.endTime);
            }
            if (typeof run.startTime === "string") {
                run.startTime = new Date(run.startTime);
            }

            const time = run.endTime.getTime() - run.startTime.getTime();
            return acc + time;
        }, 0);
    });

    const correctQuestions = computed(() => {
        return stats.value.runs.reduce((acc, run) => {
            return acc + run.correct.length;
        }, 0);
    });

    const addToStreak = (correct: boolean = true) => {
        const streaks = stats.value.streaks;

        if (!correct) {
            resetStreak();
            return;
        }

        if (streaks.length === 0) {
            streaks.push(0);
        }

        streaks[streaks.length - 1] += 1;
        console.log("current streak", streaks[streaks.length - 1]);
    };

    const resetStreak = () => {
        const streaks = stats.value.streaks;
        console.log("streak ended!", streaks[streaks.length - 1]);
        streaks.push(0);
    };

    const addRun = (run: IRun) => {
        const runs = stats.value.runs;
        runs.push(run);
    };

    const bestStreak = computed(() => {
        if (stats.value.streaks.length === 0) {
            return 0;
        }
        return Math.max(...stats.value.streaks);
    });

    const streaksOver = (n: number) => {
        return stats.value.streaks.filter((streak) => streak >= n).length;
    };

    return {
        stats,
        timeSpent,
        correctQuestions,
        addToStreak,
        resetStreak,
        addRun,
        bestStreak,
        streaksOver
    };
});
