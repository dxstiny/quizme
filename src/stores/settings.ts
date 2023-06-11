import { defineStore } from "pinia";
import { ref, watch } from "vue";

const STORAGE_KEY = "quizme.settings";

interface ISettings {
    username: string;
    defaultLength: number;
    questDifficulty: number;
}

export const questDifficulty = [
    {
        label: "Easy",
        value: 1
    },
    {
        label: "Medium",
        value: 2
    },
    {
        label: "Hard",
        value: 3
    }
];

export const defaultLength = [
    {
        label: "Blitz",
        value: 5
    },
    {
        label: "Standard",
        value: 15
    },
    {
        label: "Long",
        value: 30
    },
    {
        label: "Marathon",
        value: -1
    }
];

export const useSettingsStore = defineStore("settings", () => {
    const storedSettings = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "{}"
    ) as ISettings;

    const settings = ref({
        username: storedSettings.username || "",
        defaultLength: storedSettings.defaultLength || 15,
        questDifficulty: storedSettings.questDifficulty || 1
    });

    const saveSettings = () => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(settings.value));
    };

    watch(settings, saveSettings, { deep: true });

    return {
        settings
    };
});
