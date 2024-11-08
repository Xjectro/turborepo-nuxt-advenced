<template>
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogContent
      v-bind="forwarded"
      class="transition-all data-[state=open]:animate-content-show data-[state=closed]:animate-content-hide fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] focus:outline-none flex flex-col items-start gap-5 z-[100] rounded-xl max-sm:w-full max-sm:h-screen p-4 border border-solid border-zinc-100 dark:border-zinc-900 bg-white dark:bg-zinc-950"
    >
      <slot />

      <div class="flex items-end justify-between w-full h-full">
        <slot name="button-section" />
      </div>
    </AlertDialogContent>
  </AlertDialogPortal>
</template>

<script setup lang="ts">
import type { HtmlHTMLAttributes } from "vue";
import AlertDialogOverlay from "./AlertDialogOverlay.vue";
import {
  useForwardPropsEmits,
  AlertDialogContent,
  AlertDialogPortal,
} from "radix-vue";
import type {
  AlertDialogContentProps,
  AlertDialogContentEmits,
} from "radix-vue";

const props = defineProps<
  AlertDialogContentProps & {
    class?: HtmlHTMLAttributes["class"];
    title?: string;
  }
>();
const emits = defineEmits<AlertDialogContentEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>
