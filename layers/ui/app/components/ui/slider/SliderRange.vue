<template>
  <SliderRange
    v-bind="forwardedProps"
    class="absolute bg-primary-500/50 rounded-full h-full"
  />
</template>

<script lang="ts" setup>
import { SliderRange, useForwardProps } from "radix-vue";
import type { SliderRangeProps } from "radix-vue";
import type { HTMLAttributes } from "vue";

const props = defineProps<
  SliderRangeProps & {
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
