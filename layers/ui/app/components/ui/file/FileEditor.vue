<template>
  <div
    v-if="previewURL"
    role="main"
    class="flex flex-col items-center gap-5 text-white"
  >
    <!-- Media Player -->
    <component
      :is="isAudio ? AudioPlayer : VideoPlayer"
      ref="editor"
      :source="previewURL"
      controls
    />
    <!-- Slider -->
    <div class="relative flex flex-col items-center">
      <img
        src="/assets/backgrounds/audio_drag.svg"
        class="w-full h-20 object-cover bg-repeat"
      />
      <UiSlider
        v-model="slider"
        :min="0"
        :step="1"
        :max="duration"
        class="absolute -bottom-3"
      />
    </div>
    <!-- Bottom Controls -->
    <div v-if="editor" role="list" class="flex items-center gap-10">
      <div class="flex items-center gap-2">
        <button
          class="text-black dark:text-white"
          @click="updateSpacing(0, 'decrease')"
        >
          <IconMinus :size="16" />
        </button>
        <div
          class="px-2 py-2 rounded-lg font-inter font-medium text-black dark:text-white bg-zinc-100 dark:bg-zinc-900"
        >
          {{ spacings[0] }}
        </div>
        <button
          class="text-black dark:text-white"
          @click="updateSpacing(0, 'increase')"
        >
          <IconPlus :size="16" />
        </button>
      </div>
      <UiButton
        variant="secondary"
        type="nds"
        @interaction="editor.playing = !editor.playing"
      >
        <IconPause v-if="editor?.playing" />
        <IconPlay v-else />
      </UiButton>
      <div class="flex items-center gap-2">
        <button
          class="text-black dark:text-white"
          @click="updateSpacing(1, 'decrease')"
        >
          <IconMinus :size="16" />
        </button>
        <div
          class="px-2 py-2 rounded-lg font-inter font-medium text-black dark:text-white bg-zinc-100 dark:bg-zinc-900"
        >
          {{ spacings[1] }}
        </div>
        <button
          class="text-black dark:text-white"
          @click="updateSpacing(1, 'increase')"
        >
          <IconPlus :size="16" />
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { FileEditorProps, FileEditorEmits } from ".";
import VideoPlayer from "../player/VideoPlayer.vue";
import AudioPlayer from "../player/AudioPlayer.vue";

const { formatDuration, getPreviewURL } = useString();

const props = withDefaults(defineProps<FileEditorProps>(), {
  maxSpacing: 10,
  minSpacing: 1,
});

const emits = defineEmits<FileEditorEmits>();
useVModels(props, emits);

const editor = ref<{
  source: HTMLVideoElement;
  currentTime: number;
  playing: boolean;
}>();

const slider = ref([0, props.maxSpacing]);
const duration = ref(props.maxSpacing);

const isAudio = computed(() =>
  props.file instanceof File ? props.file.type.startsWith("audio") : false,
);
const previewURL = computed(() => getPreviewURL(props.file));
const spacings = computed(() => slider.value.map(formatDuration));

const updateSpacing = (index: number, direction: "increase" | "decrease") => {
  const change = direction === "increase" ? 1 : -1;

  const [start, end] = slider.value as [number, number];

  const renewedValues =
    index == 0 ? [start + change, end] : [start, end + change];

  slider.value = renewedValues;
};

const handleSpacing = (
  [newStart, newEnd]: [number, number],
  [oldStart, oldEnd]: [number, number],
) => {
  if (!editor.value) return;

  const spacingLength = newEnd - newStart;

  if (!editor.value || spacingLength < props.minSpacing) {
    slider.value = [oldStart, oldEnd];
    return;
  }

  if (spacingLength > props.maxSpacing) {
    slider.value =
      newStart < oldStart
        ? [newStart, newStart + props.maxSpacing]
        : [newEnd - props.maxSpacing, newEnd];
  } else {
    editor.value.currentTime = newStart;
  }

  emits("update:spacing", slider.value);
};

watch(slider, handleSpacing);

onMounted(() => {
  const mediaElement = editor.value?.source;
  if (mediaElement) {
    mediaElement.addEventListener("loadedmetadata", () => {
      const currentDuration = Math.floor(mediaElement.duration);
      if (props.maxSpacing >= currentDuration) {
        slider.value = [0, currentDuration];
      } else {
        slider.value = props.spacing as number[];
      }

      duration.value = currentDuration;
    });
  }
});
</script>
