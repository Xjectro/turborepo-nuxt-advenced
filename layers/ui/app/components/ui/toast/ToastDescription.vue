<template>
  <ToastDescription
    v-bind="forwardedProps"
    class="flex items-center w-full gap-2 px-2 pb-2 font-inter font-medium text-base text-zinc-700 dark:text-zinc-400"
  >
    <slot />
  </ToastDescription>
</template>

<script setup lang="ts">
import {
  useForwardProps,
  ToastDescription,
  type ToastDescriptionProps,
} from "radix-vue";

const props = withDefaults(defineProps<ToastDescriptionProps>(), {});

const forwardedProps = useForwardProps(props);
</script>
