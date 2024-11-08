<template>
  <DialogTitle
    v-bind="forwaredProps"
    :class="
      $cn(
        'flex items-center gap-2 text-lg font-inter font-bold text-black dark:text-white',
        props.class,
      )
    "
  >
    <slot />
  </DialogTitle>
</template>

<script setup lang="ts">
import { DialogTitle, useForwardProps } from "radix-vue";
import type { DialogTitleProps } from "radix-vue";
import { type HtmlHTMLAttributes } from "vue";

const props = defineProps<
  DialogTitleProps & { class?: HtmlHTMLAttributes["class"] }
>();

const forwaredProps = useForwardProps(props);
</script>
