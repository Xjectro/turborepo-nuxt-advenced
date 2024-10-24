<template>
  <DialogOverlay
    v-bind="delegatedProps"
    :class="
      $cn(
        'data-[state=open]:animate-overlay-show data-[state=closed]:animate-overlay-hide fixed inset-0 z-[100] bg-black/80',
        props.class,
      )
    "
  />
</template>

<script setup lang="ts">
import { DialogOverlay } from "radix-vue";
import type { DialogOverlayProps } from "radix-vue";
import { type HtmlHTMLAttributes, computed } from "vue";

const props = defineProps<
  DialogOverlayProps & { class?: HtmlHTMLAttributes["class"] }
>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>
