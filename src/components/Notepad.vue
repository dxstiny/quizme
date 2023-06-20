<script setup lang="ts">
import { safeEval } from "@/helpers";
import { ref } from "vue";

const dialog = ref<HTMLDialogElement>();
const notes = ref("");

defineProps({
    withCalculator: {
        type: Boolean,
        default: false
    },
    questionText: {
        type: String,
        required: false
    }
})

defineExpose({
    open: () => dialog.value?.showModal()
});

const calculate = (el: HTMLInputElement) => {
    const exp = el.value;
    const res = safeEval(exp);
    if (typeof res !== "number") return;
    notes.value += `\n${exp} = ${res}`
}
</script>
<template>
    <dialog
        ref="dialog"
        @click.stop="dialog?.close()"
    >
        <div class="notepad" @click.stop>
            <span
                class="material-symbols-rounded close"
                @click="() => dialog?.close()"
            >
                close
            </span>
            <div class="header">
                <h2>Notes</h2>
                <template v-if="questionText">
                    <p class="muted">{{ questionText }}</p>
                    <hr>
                </template>
            </div>
            <div class="content">
                <textarea
                    placeholder="your notes..."
                    v-model="notes"
                />
            </div>
            <template v-if="withCalculator">
                <hr>
                <div class="header">
                    <h2>Calculator</h2>
                </div>
                <div class="content">
                    <input
                        placeholder="any mathematical expression..."
                        @keypress.enter.stop="calculate($event.target as HTMLInputElement)"
                    />
                </div>
            </template>
        </div>
    </dialog>
</template>

<style scoped>
@import "./questions/common.css";

textarea {
    min-height: 300px;
    min-width: 600px;
}

dialog {
    position: relative;
}

.notepad {
    display: flex;
    flex-direction: column;
    max-width: 600px;
}

input {
    width: calc(100% - 4px - 1em);
}

.material-symbols-rounded {
    position: absolute;
    right: 0.5em;
    top: 0.5em;
    cursor: pointer;
}
</style>
