<template>
  <DialogClose
    v-bind="delegatedProps"
    :class="
      $cn(
        'transition-all flex items-center justify-center outline-none p-2 rounded-full border border-solid border-zinc-100 dark:border-zinc-900 hover:border-transparent bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-zinc-100',
        props.class,
      )
    "
    aria-label="Close"
  >
    <IconX :size="18" />
  </DialogClose>
</template>

<script setup lang="ts">
import { DialogClose } from "radix-vue";
import type { DialogCloseProps } from "radix-vue";
import { type HtmlHTMLAttributes } from "vue";

const props = defineProps<
  DialogCloseProps & { class?: HtmlHTMLAttributes["class"] }
>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>
