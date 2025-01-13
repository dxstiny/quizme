<script setup lang="ts">
import { ref, type PropType } from "vue";
import IconButton from "@/components/IconButton.vue";
import type { ICourse } from "@/course";
import {
    generateLatexSummary,
    generateMarkdownSummary
} from "@/helper/generateSummary";
import Dropdown from "@/components/Dropdown.vue";

const format = ref<"LaTeX" | "Markdown">("LaTeX");
const generated = ref<string | null>(null);

const copied = ref(false);
const downloaded = ref(false);

const dialog = ref<HTMLDialogElement>();

const props = defineProps({
    course: {
        type: Object as PropType<ICourse>,
        required: false
    }
});

const open = () => {
    generated.value = null;
    copied.value = false;
    downloaded.value = false;
    dialog.value?.showModal();
};

const generate = () => {
    if (!props.course) return;

    switch (format.value) {
        case "LaTeX":
            generated.value = generateLatexSummary(props.course);
            break;
        case "Markdown":
            generated.value = generateMarkdownSummary(props.course);
            break;
    }
};

const getFileExtension = (format: "LaTeX" | "Markdown") =>
    format === "LaTeX" ? "tex" : "md";

const copyGenerated = () => {
    if (!generated.value) return;

    navigator.clipboard.writeText(generated.value);

    copied.value = true;
};

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
        <template v-if="course && !generated">
            <h1>Create a Summary for "{{ course.title }}"</h1>
            <p>Choose the format for the summary you want to generate.</p>
            <Dropdown
                v-model="format"
                :options="[
                    { label: 'LaTeX', value: 'LaTeX' },
                    { label: 'Markdown', value: 'Markdown' }
                ]"
            />
            <IconButton
                icon="play_arrow"
                label="Generate"
                @click="generate"
                type="action-green"
            />
        </template>
        <template v-else-if="course && generated">
            <h1>Summary for "{{ course.title }}"</h1>
            <div class="export-options">
                <a
                    :href="
                        'data:text/plain;charset=utf-8,' +
                        encodeURIComponent(generated)
                    "
                    :download="'summary.' + getFileExtension(format)"
                    @click="downloaded = true"
                >
                    <span
                        class="material-symbols-rounded option"
                        :class="{ clicked: downloaded }"
                    >
                        {{ downloaded ? "download_done" : "file_download" }}
                    </span>
                </a>
                <span
                    class="material-symbols-rounded option"
                    :class="{ clicked: copied }"
                    @click="copyGenerated"
                >
                    {{ copied ? "assignment_turned_in" : "content_copy" }}
                </span>
            </div>
            <div class="output">
                <p>{{ generated }}</p>
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

.output {
    max-height: 50vh;

    & p {
        overflow: auto;
        white-space: pre-wrap;
    }
}

@keyframes changeAnimation {
    0% {
        scale: 1;
    }
    50% {
        scale: 0.5;
    }
    100% {
        scale: 1;
    }
}

.export-options {
    display: flex;
    flex-direction: row !important;
    justify-content: flex-end;
    gap: 1em;

    & a {
        color: var(--fg-base);
        text-decoration: none;
    }

    .option.clicked {
        background: var(--c-green);
        border-color: var(--c-green-lt);
        transition: background 0.2s;
        animation: changeAnimation 0.5s;
    }
}
</style>
