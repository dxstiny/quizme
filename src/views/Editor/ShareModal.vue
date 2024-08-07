<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import gistClient from "../../helper/gistClient";
import IconButton from "@/components/IconButton.vue";
import type { ICourse } from "@/course";
import { useCourseStore } from "@/stores/course";
import Switch from "@/components/Switch.vue";

const patSet = ref(false);
const shareUrl = ref("");
const includeProgress = ref(false);
const publicGist = ref(false);
const sharingCourse = ref<ICourse>();

const action = ref<null | "gist">(null);

const courses = useCourseStore();

const inputPat = ref("");
const dialog = ref<HTMLDialogElement>();

onMounted(() => {
    const pat = gistClient.pat();
    patSet.value = !!pat;
});

const open = (course: ICourse) => {
    action.value = null;
    dialog.value?.showModal();
    if (course.id !== sharingCourse.value?.id) {
        includeProgress.value = false;
        publicGist.value = false;
        shareUrl.value = "";
    }
    sharingCourse.value = course;
};

const setPat = () => {
    gistClient.setPat(inputPat.value);
    patSet.value = true;
};

const save = async () => {
    const course = sharingCourse.value;
    if (!course) return;

    const courseCopy: ICourse = JSON.parse(JSON.stringify(course));
    delete courseCopy.remote;

    if (!includeProgress.value) {
        courseCopy.score = {};
    }

    shareUrl.value =
        (await courses.shareCourse(courseCopy, publicGist.value)) ?? "";
};

const download = () => {
    courses.downloadCourse(sharingCourse.value!);
    dialog.value?.close();
};

const update = () => {
    const course = sharingCourse.value;
    if (!course) return;

    const courseCopy: ICourse = JSON.parse(JSON.stringify(course));

    if (!includeProgress.value) {
        courseCopy.score = {};
    }

    courses.shareCourse(courseCopy, publicGist.value);

    dialog.value?.close();
};

const canUpdate = computed(() => {
    if (!sharingCourse.value?.remote?.length) return false;

    const identifier = sharingCourse.value.remote[0].identifier;

    return gistClient.isMine(identifier);
});

defineExpose({ open });
</script>
<template>
    <dialog ref="dialog">
        <span
            class="material-symbols-rounded close"
            @click="dialog?.close()"
        >
            close
        </span>
        <template v-if="!action && sharingCourse">
            <h1>Share "{{ sharingCourse.title }}"</h1>
            <div class="options">
                <div
                    class="option"
                    v-if="canUpdate"
                >
                    <div class="info">
                        <h3>Update remote</h3>
                        <p>
                            This course is already shared. Update the remote to
                            share the latest changes.
                        </p>
                    </div>
                    <IconButton
                        type="action-green"
                        icon="update"
                        label="Update"
                        @click="update"
                    />
                </div>
                <div class="option">
                    <div class="info">
                        <h3>New share</h3>
                        <p>
                            Share this course for the first time. This will
                            create a new gist on GitHub.
                        </p>
                    </div>
                    <IconButton
                        type="action-green"
                        icon="share"
                        label="Share"
                        @click="action = 'gist'"
                    />
                </div>
                <div class="option">
                    <div class="info">
                        <h3>Download</h3>
                        <p>
                            Download the course as a JSON file. This can be used
                            to import the course on another device.
                        </p>
                    </div>
                    <IconButton
                        type="action-green"
                        icon="download"
                        label="Download"
                        @click="download"
                    />
                </div>
            </div>
        </template>
        <template v-else-if="!patSet && action">
            <h1>GitHub Gists PAT</h1>
            <p>
                To use this feature, you need to provide a GitHub Gists PAT.
                This is used to create gists for sharing courses.
            </p>
            <input
                type="text"
                v-model="inputPat"
                placeholder="Enter your PAT here"
            />
            <IconButton
                type="action-green"
                icon="done"
                label="Save"
                :disabled="!inputPat.length"
                @click="setPat"
            />
        </template>
        <template v-else-if="action == 'gist' && sharingCourse">
            <h1>Share "{{ sharingCourse.title }}"</h1>
            <div v-if="shareUrl">
                <p>Your share link:</p>
                <input
                    type="text"
                    readonly
                    :value="shareUrl"
                />
            </div>
            <div v-else>
                <p>
                    To share this course, click the button below. This will
                    create a gist on GitHub with the course data.
                </p>
                <div class="options">
                    <Switch
                        label="Include Progress"
                        v-model="includeProgress"
                    />
                    <Switch
                        label="Public Gist"
                        v-model="publicGist"
                    />
                </div>
                <IconButton
                    type="action-green"
                    icon="share"
                    label="Share"
                    @click="save"
                />
            </div>
        </template>
    </dialog>
</template>
<style scoped>
dialog .close {
    position: absolute;
    top: 0;
    right: 0;
    padding: 0.5rem;
    cursor: pointer;
}

dialog[open] {
    border-radius: 1em;
}

dialog[open],
dialog[open] > div {
    outline: none;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 40vw;
    overflow: hidden;
    gap: 1em;

    & input {
        width: unset;
    }
}

dialog::backdrop {
    background: rgba(0, 0, 0, 0.7);
}

.options {
    display: flex;
    flex-direction: row;
    gap: 1em;

    .option {
        display: grid;
        grid-template-columns: 1fr 20ch;
        gap: 1em;
        align-items: center;
        border: none;
        border-radius: 0;

        &:not(:last-child) {
            border-bottom: 2px solid var(--bg-base-lt);
        }
    }
}
</style>
