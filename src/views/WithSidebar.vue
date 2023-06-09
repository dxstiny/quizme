<script setup lang="ts">
import NavLink from "@/components/NavLink.vue";
</script>
<template>
    <div class="wrapper">
        <div class="sidebar">
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
    grid-template-columns: 260px 1fr;

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

    .slot {
        max-height: 100vh;
        overflow-y: auto;
    }
}

@media screen and (max-width: 700px) {
    .wrapper {
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 88px;
        font-size: 1.5em;

        .sidebar {
            grid-row: 2;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            border-right: none;
            border-top: 2px solid var(--bg-base-lt);
            border-right: none;
            padding: 0 1em;

            .logo {
                display: none;
            }

            .material-symbols-rounded {
                font-size: 36px;
            }
        }
    }
}
</style>
