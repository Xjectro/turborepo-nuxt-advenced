<template>
  <DialogDescription
    v-bind="forwaredProps"
    :class="
      $cn(
        'transition-all text-sm font-inter font-medium text-zinc-600 dark:text-zinc-400',
        props.class,
      )
    "
  >
    <slot />
  </DialogDescription>
</template>

<script setup lang="ts">
import { DialogDescription, useForwardProps } from "radix-vue";
import type { DialogDescriptionProps } from "radix-vue";
import { type HtmlHTMLAttributes, computed } from "vue";

const props = defineProps<
  DialogDescriptionProps & { class?: HtmlHTMLAttributes["class"] }
>();

const forwaredProps = useForwardProps(props);
</script>
