<template>
  <ScrollAreaRoot
    v-bind="props"
    :class="$cn('rounded overflow-hidden bg-transparent', props.class)"
    style="--scrollbar-size: 10px"
  >
    <slot />

    <ScrollAreaScrollbar orientation="vertical">
      <ScrollAreaThumb />
    </ScrollAreaScrollbar>
    <ScrollAreaScrollbar orientation="horizontal">
      <ScrollAreaThumb />
    </ScrollAreaScrollbar>
  </ScrollAreaRoot>
</template>

<script setup lang="ts">
import { ScrollAreaRoot, type ScrollAreaRootProps } from "radix-vue";
import ScrollAreaScrollbar from "./ScrollAreaScrollbar.vue";
import ScrollAreaThumb from "./ScrollAreaThumb.vue";

const props = withDefaults(
  defineProps<ScrollAreaRootProps & { class?: string }>(),
  {},
);
</script>
