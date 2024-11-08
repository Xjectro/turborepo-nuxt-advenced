<template>
  <AlertDialogOverlay
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
import { AlertDialogOverlay, useForwardProps } from "radix-vue";
import type { AlertDialogOverlayProps } from "radix-vue";
import { type HtmlHTMLAttributes } from "vue";

const props = defineProps<
  AlertDialogOverlayProps & { class?: HtmlHTMLAttributes["class"] }
>();

const forwaredProps = useForwardProps(props);
</script>
