<template>
  <ScrollAreaViewport
    v-bind="props"
    :class="$cn('', props.class)"
    style="--scrollbar-size: 10px"
  >
    <slot />
  </ScrollAreaViewport>
</template>

<script setup lang="ts">
import { ScrollAreaViewport, type ScrollAreaViewportProps } from "radix-vue";

const props = withDefaults(
  defineProps<ScrollAreaViewportProps & { class?: string }>(),
  {},
);
</script>
