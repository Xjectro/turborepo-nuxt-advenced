<template>
  <SliderTrack v-bind="props" class="relative grow rounded-full h-[3px]">
    <SliderRange
      class="transition-all absolute bg-primary-500/50 rounded-full h-full"
    />
  </SliderTrack>
</template>

<script lang="ts" setup>
import { SliderTrack, SliderRange } from "radix-vue";
import type { SliderTrackProps } from "radix-vue";

const props = withDefaults(defineProps<SliderTrackProps>(), {});
</script>
