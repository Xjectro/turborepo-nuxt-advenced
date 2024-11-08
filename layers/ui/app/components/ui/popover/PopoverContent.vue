<template>
  <PopoverPortal>
    <PopoverContent
      v-bind="forwarded"
      class="rounded-lg p-2 will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slide-down-and-fade data-[state=open]:data-[side=right]:animate-slide-left-and-fade data-[state=open]:data-[side=bottom]:animate-slide-up-and-fade data-[state=open]:data-[side=left]:animate-slide-right-and-fade border border-solid border-zinc-100 dark:border-zinc-900 bg-white dark:bg-zinc-950"
    >
      <slot />
    </PopoverContent>
  </PopoverPortal>
</template>

<script setup lang="ts">
import type { HtmlHTMLAttributes } from "vue";
import { useForwardPropsEmits, PopoverContent, PopoverPortal } from "radix-vue";
import type { PopoverContentProps, PopoverContentEmits } from "radix-vue";

const props = defineProps<
  PopoverContentProps & { class?: HtmlHTMLAttributes["class"]; title?: string }
>();
const emits = defineEmits<PopoverContentEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>
