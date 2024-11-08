<template>
  <HoverCardPortal>
    <HoverCardContent
      v-bind="forwardedProps"
      :class="
        $cn(
          'data-[side=bottom]:animate-slide-up-and-fade data-[side=right]:animate-slide-left-and-fade data-[side=left]:animate-slide-right-and-fade data-[side=top]:animate-slide-down-and-fade transition-all p-2 z-50 rounded-lg border border-solid border-zinc-100 dark:border-zinc-900 bg-white dark:bg-zinc-950',
          props.class,
        )
      "
    >
      <slot />
    </HoverCardContent>
  </HoverCardPortal>
</template>

<script setup lang="ts">
import {
  useForwardProps,
  HoverCardContent,
  HoverCardPortal,
  type HoverCardContentProps,
} from "radix-vue";

const props = withDefaults(
  defineProps<HoverCardContentProps & { class?: string }>(),
  { class: "" },
);

const forwardedProps = useForwardProps(props);
</script>
