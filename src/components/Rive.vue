<template>
    <div>
        <canvas ref="canvas"></canvas>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import {
    Rive,
    Layout,
    Fit,
    Alignment,
    StateMachineInput
} from "@rive-app/canvas";

let rive: Rive | null = null;
const canvas = ref<HTMLCanvasElement>();

const props = defineProps({
    src: {
        type: String,
        required: true
    },
    stateMachine: {
        type: String,
        default: ""
    },
    inputs: {
        type: Object,
        default: () => ({})
    }
});

const stateMachineInputs: Record<string, StateMachineInput> = {};

const updateStateMachineInputs = () => {
    if (!rive) return;

    Object.entries(props.inputs).forEach(([key, value]) => {
        const input = stateMachineInputs?.[key];
        if (!input) return;

        input.value = value;
    });
};

watch(() => props.inputs, updateStateMachineInputs, { deep: true });

onMounted(() => {
    // get width of canvas element
    const width = canvas.value!.parentElement!.clientWidth;
    // set canvas height to width
    canvas.value!.height = width;
    canvas.value!.width = width;

    rive = new Rive({
        canvas: canvas.value!,
        src: props.src,
        autoplay: true,
        stateMachines: props.stateMachine ? [props.stateMachine] : undefined,
        layout: new Layout({
            fit: Fit.Contain,
            alignment: Alignment.Center
        }),
        onLoad: () => {
            if (props.stateMachine && rive) {
                const inputs =
                    rive?.stateMachineInputs(props.stateMachine) ?? [];

                for (const input of inputs) {
                    stateMachineInputs[input.name] = input;
                }

                updateStateMachineInputs();
            }
        }
    });
});
</script>
