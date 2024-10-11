<script setup lang="ts">
import { computed } from "vue";
import WithSidebar from "../WithSidebar.vue";
import { useStatsStore } from "@/stores/stats";
import { useSettingsStore } from "@/stores/settings";
import { useCourseStore } from "@/stores/course";
import Rive from "@/components/Rive.vue";

const statStore = useStatsStore();
const settingStore = useSettingsStore();
const courseStore = useCourseStore();

const goals = computed(() => []);

const factor = settingStore.settings.questDifficulty;
const questMax = [15, 5, 5].map((x) => x * factor);

const quests = computed(() => {
    return [
        {
            title: `Solve ${questMax[0]} questions`,
            icon: "school",
            progress: statStore.correctQuestions,
            max: questMax[0]
        },
        {
            title: `Spend ${questMax[1]} minutes learning`,
            icon: "timer",
            progress: statStore.timeSpent / 60 / 1000,
            max: questMax[1]
        },
        {
            title: `Get ${questMax[2]} questions correct in a row`,
            icon: "check",
            progress: statStore.bestStreak,
            max: questMax[2]
        }
    ];
});

const averageQuestProgress = computed(
    () =>
        quests.value.reduce(
            (acc, quest) => acc + quest.progress / quest.max,
            0
        ) / quests.value.length
);
</script>
<template>
    <WithSidebar>
        <div class="wrap">
            <div class="dashboard">
                <div class="current-courses">
                    <h1>Dashboard</h1>
                    <div class="courses">
                        <div v-if="!courseStore.courses.length" class="text">
                            You don't have any courses yet.
                        </div>
                        <div class="course card" v-for="course in courseStore.courses"
                            @click="$router.push(`/quiz/${course.id}`)">
                            <h2>{{ course.title }}</h2>
                            <div class="progress">
                                <progress :value="courseStore.progress(course)" :max="100" />
                                <span>
                                    {{ courseStore.progress(course) }}%
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="other">
                    <div class="raccoon">
                        <Rive src="/quizme/assets/raccoon.riv" autoplay state-machine="default"
                            :inputs="{ happiness: 100 * averageQuestProgress }" />
                    </div>
                    <div class="card" v-if="goals.length">
                        <h2>Goals</h2>
                    </div>
                    <div class="card">
                        <h2>Daily Quests</h2>
                        <div class="quests">
                            <div class="quest" v-for="quest in quests">
                                <div class="icon">
                                    <span class="material-symbols-rounded">
                                        {{ quest.icon }}
                                    </span>
                                </div>
                                <div class="info">
                                    <h3>{{ quest.title }}</h3>
                                    <div class="progress">
                                        <progress :value="quest.progress" :max="quest.max" />
                                        <span>
                                            {{ Math.round(quest.progress) }} /
                                            {{ quest.max }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </WithSidebar>
</template>
<style scoped>
@import "@/assets/progress.css";

.wrap {
    padding: 1em;
    width: calc(100% - 2em);
    display: flex;
    flex-direction: column;
    align-items: center;
}

.raccoon {
    display: flex;
    justify-content: center;
    margin: 1em;

    >div {
        max-width: 200px;
    }
}

.dashboard {
    width: 100%;
    max-width: 1080px;
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 1em;

    @media screen and (max-width: 850px) {
        grid-template-columns: 1fr;
    }
}

.other {
    display: flex;
    flex-direction: column;
    gap: 1em;
}

.courses {
    display: flex;
    flex-direction: column;
    gap: 1em;

    & .course {
        & .progress {
            width: calc(100% - 2em);
        }

        &:hover {
            cursor: pointer;
            background: var(--bg-highlight);
        }
    }
}

.card {
    border-radius: 1em;
    border: 2px solid var(--bg-base-lt);

    >* {
        margin: 1em;
    }

    & h2 {
        font-weight: 900;
    }
}

.quests {
    display: flex;
    flex-direction: column;
    gap: 1em;
    margin: 0 !important;

    .quest:not(:last-child) {
        border-bottom: 1px solid var(--bg-base-lt);
    }

    .quest {
        padding: 1em;
        display: flex;
        align-items: center;
        gap: 1em;
        width: calc(100% - 2em);

        & h3 {
            font-weight: 900;
            margin-top: 0;
        }

        .icon .material-symbols-rounded {
            font-size: 40px;
            font-variation-settings: "wght" 700;
            color: var(--c-green);
        }

        .info {
            flex: 1;
        }
    }
}
</style>
