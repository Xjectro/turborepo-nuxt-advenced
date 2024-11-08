<template>
  <article
    v-if="previewURL"
    ref="article"
    :class="
      $cn(
        'relative flex flex-col items-center group overflow-hidden outline-none',
        props.class,
      )
    "
    tabindex="0"
    @keydown.prevent.space="playing = !playing"
    @keydown.right="currentTime += 10"
    @keydown.left="currentTime -= 10"
  >
    <video
      ref="source"
      crossorigin="anonymous"
      class="w-full m-auto block cursor-pointer"
      :loop="loop"
      @click="playing = !playing"
    >
      <div
        v-if="waiting"
        class="absolute inset-0 grid place-items-center pointer-events-none bg-black bg-opacity-20"
      >
        <IconLoader :size="18" class="animate-spin" />
      </div>
    </video>

    <section
      :class="
        $cn(
          'transition-all absolute bottom-0 flex flex-col items-center justify-between w-full p-2 bg-black bg-opacity-40 backdrop-blur-sm',
          {
            'opacity-0 translate-y-5 group-hover:-translate-y-0 group-hover:opacity-100':
              !controls,
          },
        )
      "
    >
      <Scrubber v-model="currentTime" :max="duration" class="w-full mb-2">
        <template #default="{ position, pendingValue }">
          <div
            class="absolute transform -translate-x-1/2 font-inter font-medium rounded px-2 bottom-0 mb-4 py-1 text-xs bg-zinc-900 text-white"
            :style="{ left: position }"
          >
            {{ formatDuration(pendingValue) }}
          </div>
        </template>
      </Scrubber>

      <nav class="flex items-center justify-between w-full">
        <ul class="flex items-center justify-start gap-2 w-full">
          <li>
            <button
              @click="playing = !playing"
              class="transition-all p-2 rounded-full text-white hover:bg-zinc-800"
            >
              <IconPause v-if="playing" :size="16" />
              <IconPlay v-else :size="16" />
            </button>
          </li>
          <li>
            <p
              class="flex items-center gap-1 whitespace-nowrap text-sm font-inter font-medium"
            >
              {{ formatDuration(currentTime) }} / {{ formatDuration(duration) }}
            </p>
          </li>
          <li class="w-full">
            <div class="relative flex items-center gap-2 cursor-pointer w-full">
              <button
                @click="muted = !muted"
                class="transition-all p-2 rounded-full text-white hover:bg-zinc-800"
              >
                <IconVolumeX v-if="muted" :size="16" />
                <IconVolume2 v-else :size="16" />
              </button>
              <Scrubber v-model="volume" :max="1" class="w-full max-w-32" />
            </div>
          </li>
        </ul>

        <ul class="flex items-center justify-end gap-2 pl-5">
          <li>
            <button
              v-if="supportsPictureInPicture"
              @click="togglePictureInPicture"
              class="transition-all p-2 rounded-full text-white hover:bg-zinc-800"
            >
              <IconGalleryThumbnails v-if="isPictureInPicture" :size="16" />
              <IconGalleryVerticalEnd v-else :size="16" />
            </button>
          </li>
          <li>
            <button
              @click="toggleFullscreen"
              class="transition-all p-2 rounded-full text-white hover:bg-zinc-800"
            >
              <IconMinimize v-if="isFullscreen" :size="16" />
              <IconMaximize v-else :size="16" />
            </button>
          </li>
        </ul>
      </nav>
    </section>
  </article>
</template>

<script lang="ts" setup>
import Scrubber from "./PlayerScrubber.vue";
import type { VideoPlayerProps, VideoPlayerEmits } from ".";

const { formatDuration, getPreviewURL } = useString();

const loop = ref(false);

const article = ref<HTMLElement>();
const source = ref<HTMLVideoElement>();

const props = withDefaults(defineProps<VideoPlayerProps>(), { class: "" });
defineEmits<VideoPlayerEmits>();

const previewURL = computed(() => getPreviewURL(props.source));

const {
  playing,
  volume,
  muted,
  waiting,
  duration,
  currentTime,
  isPictureInPicture,
  supportsPictureInPicture,
  togglePictureInPicture,
} = useMediaControls(source, {
  src: previewURL.value as string,
});

const { isFullscreen, toggle: toggleFullscreen } = useFullscreen(article);

defineExpose({
  source,
  currentTime,
  playing,
});
</script>
