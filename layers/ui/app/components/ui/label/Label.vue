<template>
  <Label
    v-bind="forwarded"
    :class="
      $cn(
        'transition-all flex items-center font-inter font-medium text-black dark:text-white',
        props.class,
      )
    "
  >
    <slot />
    <span v-if="required" class="text-lg font-bold font-inter text-red-700"
      >*</span
    >
  </Label>
</template>

<script setup lang="ts">
import { Label, useForwardProps, type LabelProps } from "radix-vue";

const props = withDefaults(
  defineProps<LabelProps & { class?: string; required?: boolean }>(),
  { class: "text-lg" },
);

const forwarded = useForwardProps(props);
</script>
