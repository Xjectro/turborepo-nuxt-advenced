<template>
  <DrawerOverlay
    v-bind="delegatedProps"
    :class="$cn('fixed inset-0 z-[150] bg-black/80', props.class)"
  />
</template>

<script setup lang="ts">
import type { DialogOverlayProps } from "radix-vue";
import { DrawerOverlay } from "vaul-vue";
import { type HtmlHTMLAttributes } from "vue";

const props = defineProps<
  DialogOverlayProps & { class?: HtmlHTMLAttributes["class"] }
>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>
