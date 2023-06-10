import { ref, computed, watch } from "vue";
import { defineStore } from "pinia";
import type { IRun } from "@/quiz";

const STORAGE_KEY = "quizme.stats";

interface ISettings {
    username: string;
    defaultLength: number;
    questDifficulty: number;
}

export const useStatsStore = defineStore("stats", () => {});
