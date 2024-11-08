<template>
  <ToastAction v-bind="forwardedProps" class="[grid-area:_action]">
    <button
      type="button"
      class="inline-flex items-center justify-center h-full px-4 rounded-xl bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-300 hover:text-black dark:hover:text-white"
    >
      <IconCircleX :size="20" />
    </button>
  </ToastAction>
</template>

<script setup lang="ts">
import { useForwardProps, ToastAction, type ToastActionProps } from "radix-vue";

const props = withDefaults(defineProps<ToastActionProps>(), { asChild: true });

const forwardedProps = useForwardProps(props);
</script>
