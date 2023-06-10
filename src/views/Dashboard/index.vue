<script setup lang="ts">
import { computed } from "vue";
import WithSidebar from "../WithSidebar.vue";
import { useStatsStore } from "@/stores/stats";

const statStore = useStatsStore();

const goals = computed(() => []);

const quests = computed(() => {
    return [
        {
            title: "Answer 30 questions",
            icon: "school",
            progress: statStore.correctQuestions,
            max: 30
        },
        {
            title: "Spend 10 minutes learning",
            icon: "timer",
            progress: statStore.timeSpent / 60 / 1000,
            max: 10
        },
        {
            title: "Get 10 questions correct in a row",
            icon: "check",
            progress: statStore.bestStreak,
            max: 10
        }
    ];
});
</script>
<template>
    <WithSidebar>
        <div class="wrap">
            <div class="dashboard">
                <div class="progress">
                    <h1>Dashboard</h1>
                    <p class="muted">Welcome back!</p>
                </div>
                <div class="other">
                    <div
                        class="card"
                        v-if="goals.length"
                    >
                        <h2>Goals</h2>
                    </div>
                    <div class="card">
                        <h2>Daily Quests</h2>
                        <div class="quests">
                            <div
                                class="quest"
                                v-for="quest in quests"
                            >
                                <div class="icon">
                                    <span class="material-symbols-rounded">
                                        {{ quest.icon }}
                                    </span>
                                </div>
                                <div class="info">
                                    <h3>{{ quest.title }}</h3>
                                    <div class="progress">
                                        <progress
                                            :value="quest.progress"
                                            :max="quest.max"
                                        />
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
.wrap {
    padding: 1em;
    width: calc(100% - 2em);
    display: flex;
    flex-direction: column;
    align-items: center;
}

.dashboard {
    width: 100%;
    max-width: 1080px;
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 1em;
}

.other {
    display: flex;
    flex-direction: column;
    gap: 1em;
}

.card {
    width: 100%;
    height: 100%;
    border-radius: 1em;
    border: 2px solid var(--bg-base-lt);

    > * {
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
        }

        .icon .material-symbols-rounded {
            font-size: 40px;
            color: var(--c-green);
        }

        .info {
            flex: 1;
        }

        .progress {
            display: grid;
            grid-template-columns: 1fr max-content;
            align-items: center;
            grid-gap: 1em;
            width: 100%;

            & progress {
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
        }
    }
}
</style>
