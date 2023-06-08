<script setup lang="ts">
import NavLink from "@/components/NavLink.vue";
</script>
<template>
    <div class="dashboard">
        <div class="sidebar">
            <h1 class="logo">Qz</h1>
            <NavLink
                to="/"
                icon="home"
                label="Home"
            />
            <NavLink
                to="/quiz"
                icon="quiz"
                label="Quiz"
            />
            <NavLink
                to="/editor"
                icon="add"
                label="Create"
            />
        </div>
    </div>
</template>
<style scoped>
.dashboard {
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
