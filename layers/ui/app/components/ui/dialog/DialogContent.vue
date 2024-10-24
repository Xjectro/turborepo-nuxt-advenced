<template>
  <DialogPortal>
    <DialogOverlay />
    <DialogContent
      v-bind="forwarded"
      class="transition-all data-[state=open]:animate-content-show data-[state=closed]:animate-content-hide fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-[100] border border-solid border-zinc-100 dark:border-zinc-900 bg-white dark:bg-zinc-950"
    >
      <slot />
    </DialogContent>
  </DialogPortal>
</template>

<script setup lang="ts">
import type { HtmlHTMLAttributes } from "vue";
import { useForwardPropsEmits, DialogContent, DialogPortal } from "radix-vue";
import type { DialogContentProps, DialogContentEmits } from "radix-vue";
import DialogOverlay from "../dialog/DialogOverlay.vue";

const props = defineProps<
  DialogContentProps & { class?: HtmlHTMLAttributes["class"]; title?: string }
>();
const emits = defineEmits<DialogContentEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>
