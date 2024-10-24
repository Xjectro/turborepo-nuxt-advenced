<template>
  <ScrollAreaThumb
    v-bind="props"
    class="flex-1 bg-primary-500 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]"
  />
</template>

<script setup lang="ts">
import { ScrollAreaThumb, type ScrollAreaThumbProps } from "radix-vue";

const props = withDefaults(
  defineProps<ScrollAreaThumbProps & { class?: string }>(),
  {},
);
</script>
