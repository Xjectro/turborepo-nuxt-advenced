<template>
  <HoverCardRoot v-bind="forwarded">
    <slot />
  </HoverCardRoot>
</template>

<script setup lang="ts">
import {
  useForwardPropsEmits,
  HoverCardRoot,
  type HoverCardRootEmits,
  type HoverCardRootProps,
} from "radix-vue";

const props = withDefaults(defineProps<HoverCardRootProps>(), {});

const emits = defineEmits<HoverCardRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>
