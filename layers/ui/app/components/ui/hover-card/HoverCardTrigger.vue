<template>
  <HoverCardTrigger
    v-bind="forwardedProps"
    :class="$cn('inline-block cursor-pointer outline-none', props.class)"
  >
    <slot />
  </HoverCardTrigger>
</template>

<script setup lang="ts">
import {
  useForwardProps,
  HoverCardTrigger,
  type HoverCardTriggerProps,
} from "radix-vue";

const props = withDefaults(
  defineProps<HoverCardTriggerProps & { class?: string }>(),
  { class: "" },
);

const forwardedProps = useForwardProps(props);
</script>
