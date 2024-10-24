<template>
  <DialogTrigger
    :class="dialogTriggerVariants({ variant })"
    v-bind="forwardedProps"
  >
    <slot />
  </DialogTrigger>
</template>

<script lang="ts" setup>
import {
  useForwardProps,
  DialogTrigger,
  type DialogTriggerProps,
} from "radix-vue";
import { type DialogTriggerVariants, dialogTriggerVariants } from ".";

interface Props extends DialogTriggerProps {
  variant?: DialogTriggerVariants["variant"];
}

const props = defineProps<Props>();

const forwardedProps = useForwardProps(props);
</script>
