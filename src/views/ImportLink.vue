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

const route = useRoute();
const router = useRouter();
const courses = useCourseStore();

const who = ref("");
const what = ref<ICourse[]>([]);

onMounted(async () => {
    const base64 = route.params.id as string;
    const str = atob(base64);
    const [type, ...data] = str.split(":");

    if (type === "gist") {
        const [user, gist, file] = data;
        const url = `https://gist.githubusercontent.com/${user}/${gist}/raw/${file}`;

        const res = await fetch(url);
        const jdata = await res.json();

        what.value = [jdata];
        who.value = user;
    }
});

const confirm = async () => {
    await courses.addCourse(what.value[0]);
    router.push(`/courses/${what.value[0].id}`);
};
</script>
<template>
    <WithSidebar>
        <div class="wrap">
            <div class="flex-col">
                <strong>{{ who }}</strong> wants to share:
                <span
                    v-if="what.length == 0"
                    class="text-muted italic text-sm"
                    >Nothing</span
                >
                <div
                    class="p-4 mt-4 w-max flex flex-col gap-4"
                    v-else
                >
                    <div class="items">
                        <div
                            v-for="item in what"
                            class="card flex gap-2 items-center"
                        >
                            <div class="flex flex-col">
                                <h4>{{ item.title }}</h4>
                                <span class="text-muted uppercase text-sm">
                                    {{ item.description }}
                                </span>
                                <span class="text-muted italic">
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
