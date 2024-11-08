<template>
  <AlertDialogTitle
    v-bind="forwaredProps"
    :class="
      $cn(
        'flex items-center gap-2 text-lg font-inter font-bold text-black dark:text-white',
        props.class,
      )
    "
  >
    <slot />
  </AlertDialogTitle>
</template>

<script setup lang="ts">
import { AlertDialogTitle, useForwardProps } from "radix-vue";
import type { AlertDialogTitleProps } from "radix-vue";
import { type HtmlHTMLAttributes } from "vue";

const props = defineProps<
  AlertDialogTitleProps & { class?: HtmlHTMLAttributes["class"] }
>();

const forwaredProps = useForwardProps(props);
</script>
