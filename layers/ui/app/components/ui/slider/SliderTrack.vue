<template>
  <SliderTrack
    v-bind="forwardedProps"
    class="relative grow rounded-full h-[3px] bg-zinc-200 dark:bg-zinc-800"
  >
    <slot />
  </SliderTrack>
</template>

<script lang="ts" setup>
import { SliderTrack, useForwardProps } from "radix-vue";
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
