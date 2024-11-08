export { default as VideoPlayer } from "./VideoPlayer.vue";
export { default as PlayerScrubber } from "./PlayerScrubber.vue";
export { default as AudioPlayer } from "./AudioPlayer.vue";

export type VideoPlayerProps = {
  source: File | string | null;
  controls?: boolean;
  class?: string;
};

export type VideoPlayerEmits = {};

export type AudioPlayerProps = {
  source: File | string | null;
  class?: string;
};

export type AudioPlayerEmits = {};
