<script setup lang="ts">
import IconButton from "@/components/IconButton.vue";
import WithSidebar from "../WithSidebar.vue";
</script>
<template>
    <WithSidebar>
        <div class="wrap">
            <div class="about">
                <div class="slide">
                    <div class="content">
                        <span class="material-symbols-rounded black">
                            school
                        </span>
                        <h1>A free, fun way to learn anything!</h1>
                        <IconButton
                            class="button"
                            label="Get Started"
                            icon="school"
                            type="action-green"
                            @click="$router.push('/courses')"
                        />
                    </div>
                </div>
                <div class="slide double space-evenly">
                    <div class="left">
                        <div class="content">
                            <h1 class="black">
                                free. fun. probably effective.
                            </h1>
                            <p>
                                Contrary to duolingo, we don't have any proof
                                that our platform is effective. But it's free,
                                so why not give it a try?
                            </p>
                        </div>
                    </div>
                    <div class="right">
                        <div class="content">
                            <h1 class="black">What even is this?</h1>
                            <p>
                                A free, open-source learning platform. Inspired
                                by duolingos design and functionality, this app
                                offers anyone the platform to create courses,
                                learn from courses, and share courses.
                            </p>
                        </div>
                    </div>
                    <div class="left">
                        <div class="content">
                            <h1 class="black">
                                Soooo what exactly can I learn?
                            </h1>
                            <p>
                                Anything, really! Select from 8 different
                                question types to create your own course about
                                anything you want - from learning a language to
                                literal rocket science.
                                <br />
                                QuizMe then generates quizzes from your course
                                and tracks your progress.
                            </p>
                        </div>
                    </div>
                    <div class="right">
                        <div class="content">
                            <h1 class="black">
                                Aren't there any copyright problems?
                            </h1>
                            <p>
                                The design is heavily inspired by duolingo, but
                                the platform was entirely written from scratch.
                                Should they ever ask to take this down, the
                                design will be changed.
                            </p>
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

.about {
    width: 100%;
    max-width: 1080px;
    display: flex;
    flex-direction: column;
}

.slide {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: calc(100svh - 2em);

    &.double {
        height: calc(200vh - 2em);
    }

    &.space-evenly {
        justify-content: space-evenly;
    }

    .left {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: start;

        & div {
            min-width: 30ch;
            max-width: 60ch;
        }
    }

    .right {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: end;
        text-align: right;

        & div {
            min-width: 30ch;
            max-width: 60ch;
        }
    }

    &:not(:last-child) {
        border-bottom: 2px solid var(--bg-base-lt);
    }
}

h1.black {
    color: var(--c-green);
    font-size: 3em;
}

.material-symbols-rounded.black {
    color: var(--c-green);
    font-size: 10em;
    text-align: center;
    width: 100%;
}

.button {
    width: 100%;
}
</style>
