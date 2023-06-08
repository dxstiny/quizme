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
                to="/editor"
                icon="add"
                label="Create"
            />
            <NavLink
                to="/about"
                icon="question_mark"
                label="About"
            />
        </div>
        <slot />
    </div>
</template>
<style scoped>
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
}
</style>
