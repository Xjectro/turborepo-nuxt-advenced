<template>
  <AlertDialogDescription
    v-bind="forwaredProps"
    :class="
      $cn(
        'transition-all text-sm font-inter font-medium text-zinc-600 dark:text-zinc-400',
        props.class,
      )
    "
  >
    <slot />
  </AlertDialogDescription>
</template>

<script setup lang="ts">
import { AlertDialogDescription, useForwardProps } from "radix-vue";
import type { AlertDialogDescriptionProps } from "radix-vue";
import { type HtmlHTMLAttributes } from "vue";

const props = defineProps<
  AlertDialogDescriptionProps & { class?: HtmlHTMLAttributes["class"] }
>();

const forwaredProps = useForwardProps(props);
</script>
