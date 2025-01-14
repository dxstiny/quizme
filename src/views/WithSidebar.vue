<script setup lang="ts">
import { ref, onMounted } from "vue";
import NavLink from "@/components/NavLink.vue";

const expanded = ref(false);
const KEY = "quizme.sidebar-expanded";

const setSidebarWidth = () => {
    const body = document.querySelector("body");
    if (body) {
        body.style.setProperty(
            "--sidebar-width",
            expanded.value ? "260px" : "88px"
        );
    }
};

onMounted(() => {
    expanded.value = window.localStorage.getItem(KEY) === "true";
    setSidebarWidth();
});

const toggleExpanded = () => {
    expanded.value = !expanded.value;
    window.localStorage.setItem(KEY, expanded.value.toString());
    setSidebarWidth();
};
</script>
<template>
    <div class="wrapper">
        <div
            class="sidebar"
            :class="{ expanded }"
        >
            <h1 class="logo">Qz</h1>
            <NavLink
                to="/"
                icon="home"
                label="Home"
            />
            <NavLink
                to="/quiz"
                icon="school"
                label="Quiz Me"
            />
            <NavLink
                to="/courses"
                icon="edit"
                label="Courses"
            />
            <NavLink
                to="/about"
                icon="question_mark"
                label="About"
            />
            <div class="spacer" />
            <NavLink
                to=""
                @click="toggleExpanded"
                :icon="expanded ? 'chevron_left' : 'chevron_right'"
                label="Hide Sidebar"
            />
            <NavLink
                to="/settings"
                icon="settings"
                label="Settings"
            />
        </div>
        <div class="slot">
            <slot />
        </div>
    </div>
</template>
<style>
.wrapper {
    height: 100svh;
    width: 100%;
    display: grid;
    grid-template-columns: var(--sidebar-width) 1fr;

    @media screen and (max-width: 1100px) {
        grid-template-columns: 88px 1fr;
    }

    .sidebar {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5em;
        padding: 1em;
        border-right: 2px solid var(--bg-base-lt);
    }

    .spacer {
        flex: 1;
    }

    .slot {
        max-height: 100vh;
        overflow-y: auto;
    }
}

@media screen and (max-width: 700px) {
    .wrapper {
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 70px;
        font-size: 1.2em;

        .sidebar {
            grid-row: 2;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            border-right: none;
            border-top: 2px solid var(--bg-base-lt);
            border-right: none;
            padding: 0 0.5em;

            .logo {
                display: none;
            }

            .material-symbols-rounded {
                font-size: 30px;
            }
        }
    }
}
</style>
