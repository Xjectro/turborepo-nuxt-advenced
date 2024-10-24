<template>
  <DialogDescription
    v-bind="delegatedProps"
    :class="
      $cn(
        'transition-all text-sm font-chakra-petch font-medium text-zinc-600 dark:text-zinc-400',
        props.class,
      )
    "
  >
    <slot />
  </DialogDescription>
</template>

<script setup lang="ts">
import { DialogDescription } from "radix-vue";
import type { DialogDescriptionProps } from "radix-vue";
import { type HtmlHTMLAttributes, computed } from "vue";

const props = defineProps<
  DialogDescriptionProps & { class?: HtmlHTMLAttributes["class"] }
>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>
