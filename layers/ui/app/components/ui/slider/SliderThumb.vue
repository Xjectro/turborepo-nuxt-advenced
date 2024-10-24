<template>
  <SliderThumb
    v-bind="props"
    class="transition-all flex flex-col items-center w-5 h-5 order-1 rounded-full border-none outline-none cursor-grab font-chakra-petch font-medium bg-primary-500 hover:bg-primary-600 text-black dark:text-white"
    aria-label="Volume"
  >
    <span class="absolute -bottom-6 flex items-center z-10 order-2 text-base">{{
      value
    }}</span>
  </SliderThumb>
</template>

<script lang="ts" setup>
import { SliderThumb } from "radix-vue";
import type { SliderTrackProps } from "radix-vue";

const props = withDefaults(
  defineProps<SliderTrackProps & { value: string }>(),
  {},
);
</script>
