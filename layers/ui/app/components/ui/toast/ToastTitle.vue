<template>
  <ToastTitle
    v-bind="forwardedProps"
    class="[grid-area:_title] flex items-center w-full gap-2 px-2 pt-2 mb-[5px] font-inter font-medium text-base text-black dark:text-white"
  >
    <slot />
  </ToastTitle>
</template>

<script setup lang="ts">
import { useForwardProps, ToastTitle, type ToastTitleProps } from "radix-vue";

const props = withDefaults(defineProps<ToastTitleProps>(), {});

const forwardedProps = useForwardProps(props);
</script>
