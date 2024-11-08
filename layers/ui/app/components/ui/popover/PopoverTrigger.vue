<template>
  <PopoverTrigger
    :class="popoverTriggerVariants({ variant })"
    v-bind="forwardedProps"
  >
    <slot />
  </PopoverTrigger>
</template>

<script lang="ts" setup>
import {
  useForwardProps,
  PopoverTrigger,
  type PopoverTriggerProps,
} from "radix-vue";
import { type PopoverTriggerVariants, popoverTriggerVariants } from ".";

interface Props extends PopoverTriggerProps {
  variant?: PopoverTriggerVariants["variant"];
}

const props = defineProps<Props>();

const forwardedProps = useForwardProps(props);
</script>
