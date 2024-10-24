<template>
  <DialogTitle
    v-bind="delegatedProps"
    :class="
      $cn(
        'flex items-center gap-2 text-lg font-chakra-petch font-bold text-black dark:text-white',
        props.class,
      )
    "
  >
    <slot />
  </DialogTitle>
</template>

<script setup lang="ts">
import { DialogTitle } from "radix-vue";
import type { DialogTitleProps } from "radix-vue";
import { type HtmlHTMLAttributes, computed } from "vue";

const props = defineProps<
  DialogTitleProps & { class?: HtmlHTMLAttributes["class"] }
>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>
