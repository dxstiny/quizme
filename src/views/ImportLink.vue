<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import IconButton from "../components/IconButton.vue";
import type { ICourse } from "@/course";
import { useCourseStore } from "@/stores/course";
import WithSidebar from "./WithSidebar.vue";
import gistClient from "@/helper/gistClient";
import { pull } from "@/helper/share/index";

type Error = null | "not-found" | "not-allowed";

const route = useRoute();
const router = useRouter();
const courses = useCourseStore();

const who = ref("");
const what = ref<ICourse[]>([]);
const error = ref<Error>(null);
const githubPat = ref("");

onMounted(async () => {
    const base64 = route.params.id as string;
    const importObject = await pull(base64);

    if (importObject.error) {
        error.value = importObject.error;
        return;
    }

    what.value = [importObject.course];
    who.value = importObject.author ?? "(unknown)";
});

const confirm = async () => {
    const course = what.value[0];
    course.remote ??= [];
    course.remote.push({
        identifier: route.params.id as string
    });

    await courses.addCourse(course);
    router.push(`/courses/${what.value[0].id}`);
};

const createNewCourse = () => {
    const id = Math.random().toString(36).substring(7);
    courses.addCourse({
        title: "New Course",
        description: "",
        questions: [],
        id
    });
    router.push(`/courses/${id}`);
};

const tryAgain = () => {
    gistClient.setPat(githubPat.value);
    window.location.reload();
};
</script>
<template>
    <WithSidebar>
        <div class="wrap">
            <div
                v-if="error == null"
                class="flex-col"
            >
                <span>
                    <strong>{{ who }}</strong> wants to share:
                </span>
                <span
                    v-if="what.length == 0"
                    class="text-muted italic text-sm"
                    >Nothing</span
                >
                <div
                    class="mt-4 w-max flex flex-col gap-4"
                    v-else
                >
                    <div class="items">
                        <div
                            v-for="item in what"
                            class="card flex gap-2 items-center"
                        >
                            <div class="flex flex-col">
                                <h1>{{ item.title }}</h1>
                                <span class="text-muted">
                                    {{ item.description }}
                                </span>
                                <span
                                    class="mt-4 text-muted text-sm uppercase italic"
                                >
                                    {{ item.questions.length }} questions
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="buttons flex gap-2">
                        <IconButton
                            type="action-green"
                            icon="check"
                            label="Accept"
                            @click="confirm"
                        />
                        <IconButton
                            type="action-red"
                            icon="close"
                            label="Reject"
                            @click="router.push('/')"
                        />
                    </div>
                </div>
            </div>
            <div
                v-else-if="error == 'not-found'"
                class="error flex-col"
            >
                <h1>Guess you'll have to create it yourself...</h1>
                <p>
                    No course was found at the link you provided. The course may
                    have been deleted or the link may be incorrect.
                </p>
                <div class="flex gap-2">
                    <IconButton
                        type="action-green"
                        icon="add"
                        label="Create New Course"
                        @click="createNewCourse"
                    />
                    <IconButton
                        icon="home"
                        label="Home"
                        @click="router.push('/')"
                    />
                </div>
            </div>
            <div
                v-else-if="error == 'not-allowed'"
                class="error flex-col"
            >
                <h1>Not Allowed</h1>
                <p>You don't have permission to view this course.</p>
                <div class="card">
                    <p>Wait, this is my Gist!</p>
                    <input
                        type="text"
                        :value="githubPat"
                        placeholder="Enter your GitHub PAT here"
                    />
                    <IconButton
                        type="action-green"
                        icon="check"
                        label="Accept"
                        @click="tryAgain"
                        :disabled="!githubPat.length"
                    />
                </div>
                <IconButton
                    type="action-red"
                    icon="close"
                    label="Close"
                    @click="router.push('/')"
                />
            </div>
        </div>
    </WithSidebar>
</template>
<style scoped>
.wrap {
    padding: 1em;
    width: calc(100% - 2em);
    height: calc(100% - 2em);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & > div.error {
        padding: 0 1em;
        width: calc(100% - 2em);

        @media screen and (min-width: 1080px) {
            max-width: 1080px;
            padding: 0;
        }
    }
}

.items {
    margin-bottom: 1em;
}

.card {
    padding: 1rem;
    border-radius: 0.5rem;
    border: 2px solid var(--bg-base-lt);
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    justify-content: center;
    overflow: hidden;
    width: calc(100% - 2em);
}

.text-muted {
    color: var(--fg-base-mute);
}

.italic {
    font-style: italic;
}

.text-sm {
    font-size: 0.8rem;
}

.p-4 {
    padding: 1rem;
}

.mt-4 {
    margin-top: 1rem;
}

.w-max {
    width: max-content;

    @media screen and (max-width: 768px) {
        width: unset;
    }
}

.flex-col {
    display: flex;
    flex-direction: column;
}

.flex {
    display: flex;
}

.gap-4 {
    gap: 1rem;
}

.gap-2 {
    gap: 0.5rem;
}

.items-center {
    align-items: center;
}

.uppercase {
    text-transform: uppercase;
}
</style>
