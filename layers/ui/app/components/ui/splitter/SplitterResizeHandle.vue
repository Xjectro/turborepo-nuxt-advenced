<template>
  <SplitterResizeHandle v-bind="forwarded">
    <slot />
  </SplitterResizeHandle>
</template>

<script setup lang="ts">
import {
  useForwardPropsEmits,
  SplitterResizeHandle,
  type SplitterResizeHandleEmits,
  type SplitterResizeHandleProps,
} from "radix-vue";

const props = withDefaults(defineProps<SplitterResizeHandleProps>(), {});

const emits = defineEmits<SplitterResizeHandleEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>
