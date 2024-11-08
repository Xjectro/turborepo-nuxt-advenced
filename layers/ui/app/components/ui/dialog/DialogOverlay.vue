<template>
  <DialogOverlay
    v-bind="forwaredProps"
    :class="
      $cn(
        'data-[state=open]:animate-overlay-show data-[state=closed]:animate-overlay-hide fixed inset-0 z-[100] bg-black/80',
        props.class,
      )
    "
  />
</template>

<script setup lang="ts">
import { DialogOverlay, useForwardProps } from "radix-vue";
import type { DialogOverlayProps } from "radix-vue";
import { type HtmlHTMLAttributes } from "vue";

const props = defineProps<
  DialogOverlayProps & { class?: HtmlHTMLAttributes["class"] }
>();

const forwaredProps = useForwardProps(props);
</script>
