<template>
  <article
    v-if="previewURL"
    ref="article"
    :class="
      $cn(
        'relative flex flex-col items-center group outline-none w-full',
        props.class,
      )
    "
    tabindex="0"
  >
    <audio ref="source" :loop="loop">
      <div
        v-if="waiting"
        class="absolute inset-0 grid place-items-center pointer-events-none bg-black bg-opacity-20"
      >
        <IconLoader :size="18" class="animate-spin" />
      </div>
    </audio>
    <nav
      role="menu"
      :class="
        $cn(
          'transition-all flex items-center justify-between w-full px-2 py-1 rounded-xl bg-zinc-200 dark:bg-zinc-800 bg-opacity-40 backdrop-blur-sm',
        )
      "
    >
      <ul role="menuitem" class="flex items-center justify-start gap-2 w-full">
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
            class="flex items-center gap-1 whitespace-nowrap text-sm font-inter font-medium text-black dark:text-white"
          >
            {{ formatDuration(currentTime) }} / {{ formatDuration(duration) }}
          </p>
        </li>
        <li class="w-full">
          <Scrubber v-model="currentTime" :max="duration" class="w-full">
            <template #default="{ position, pendingValue }">
              <div
                class="absolute transform -translate-x-1/2 font-inter font-medium rounded px-2 bottom-0 mb-4 py-1 text-xs bg-zinc-900 text-white"
                :style="{ left: position }"
              >
                {{ formatDuration(pendingValue) }}
              </div>
            </template>
          </Scrubber>
        </li>
        <li>
          <a
            type="button"
            :href="formatDownloadLink(previewURL)"
            target="_blank"
            class="flex items-center justify-center cursor-pointer text-black dark:text-white hover:text-primary-500"
          >
            <IconDownload :size="18" />
          </a>
        </li>
      </ul>
    </nav>
  </article>
</template>

<script lang="ts" setup>
import Scrubber from "./PlayerScrubber.vue";
import type { AudioPlayerProps, AudioPlayerEmits } from ".";

const { formatDuration, formatDownloadLink, getPreviewURL } = useString();

const loop = ref(false);

const article = ref<HTMLElement>();
const source = ref<HTMLAudioElement>();

const props = withDefaults(defineProps<AudioPlayerProps>(), { class: "" });
defineEmits<AudioPlayerEmits>();

const previewURL = computed(() => getPreviewURL(props.source));

const { playing, waiting, duration, currentTime } = useMediaControls(source, {
  src: previewURL.value as string,
});

defineExpose({
  source,
  currentTime,
  playing,
});
</script>
