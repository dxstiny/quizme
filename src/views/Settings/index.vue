<script setup lang="ts">
import {
    defaultLength,
    questDifficulty,
    useSettingsStore
} from "@/stores/settings";
import WithSidebar from "../WithSidebar.vue";
import ExpandedDropdown from "@/components/ExpandedDropdown.vue";

const settings = useSettingsStore();
</script>
<template>
    <WithSidebar>
        <div class="wrap">
            <div class="settings">
                <div class="main">
                    <h1>Settings</h1>
                    <h2>Quiz Length</h2>
                    <ExpandedDropdown
                        :options="defaultLength"
                        v-model="settings.settings.defaultLength"
                    >
                        <template #label="{ option }">
                            <div class="label">
                                <h3>{{ option.label }}</h3>
                                <p>
                                    {{
                                        option.value == -1
                                            ? "all"
                                            : option.value
                                    }}
                                    questions
                                </p>
                            </div>
                        </template>
                    </ExpandedDropdown>
                    <hr />
                    <h2>Quest Difficulty</h2>
                    <ExpandedDropdown
                        :options="questDifficulty"
                        v-model="settings.settings.questDifficulty"
                    >
                        <template #label="{ option }">
                            <div class="label">
                                <h3>{{ option.label }}</h3>
                            </div>
                        </template>
                    </ExpandedDropdown>
                </div>
                <div class="other">
                    <div class="card">
                        <h2>About you</h2>
                        <p class="muted">
                            We want to
                            <span class="strikethrough"
                                >sell your data to facebook </span
                            >personalise the UI for you, to make you feel at
                            home!
                        </p>
                        <div class="input">
                            <span class="material-symbols-rounded">
                                person
                            </span>
                            <input
                                v-model="settings.settings.username"
                                type="text"
                                placeholder="Your name"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </WithSidebar>
</template>
<style scoped>
@import "@/components/questions/common.css";
.input {
    display: flex;
    align-items: center;
    gap: 0.5em;
}

.wrap {
    padding: 1em;
    width: calc(100% - 2em);
    display: flex;
    flex-direction: column;
    align-items: center;
}

.label {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0.5em;

    & h3 {
        font-weight: 900;
        margin: 0;
    }

    & p {
        margin: 0;
    }
}

.settings {
    width: 100%;
    max-width: 1080px;
    display: grid;
    grid-template-columns: 2fr 1fr;
    align-items: start;
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
</style>
