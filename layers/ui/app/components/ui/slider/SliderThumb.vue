<template>
  <SliderThumb
    v-bind="forwardedProps"
    class="flex flex-col items-center w-4 h-4 order-1 rounded-full border-none outline-none cursor-grab font-inter font-medium bg-primary-500 hover:bg-primary-600 text-black dark:text-white"
    aria-label="Volume"
  />
</template>

<script lang="ts" setup>
import { SliderThumb, useForwardProps } from "radix-vue";
import type { SliderTrackProps } from "radix-vue";
import type { HTMLAttributes } from "vue";

const props = defineProps<
  SliderTrackProps & {
    class?: HTMLAttributes["class"];
    inset?: boolean;
    value?: string;
  }
>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>
