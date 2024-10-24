<template>
  <ScrollAreaScrollbar
    v-bind="props"
    class="flex select-none touch-none p-0.5 bg-primary-500/20 transition-colors duration-[160ms] ease-out hover:bg-primary-500/30 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
  >
    <slot />
  </ScrollAreaScrollbar>
</template>

<script setup lang="ts">
import { ScrollAreaScrollbar, type ScrollAreaThumbProps } from "radix-vue";

const props = withDefaults(
  defineProps<ScrollAreaThumbProps & { class?: string }>(),
  {},
);
</script>
