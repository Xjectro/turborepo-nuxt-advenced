<template>
  <AlertDialogTrigger
    :class="$cn(alertDialogTriggerVariants({ variant, type }), props.class)"
    v-bind="forwardedProps"
  >
    <slot />
  </AlertDialogTrigger>
</template>

<script lang="ts" setup>
import {
  useForwardProps,
  AlertDialogTrigger,
  type AlertDialogTriggerProps,
} from "radix-vue";
import { alertDialogTriggerVariants, type AlertDialogTriggerVariants } from ".";
import type { HTMLAttributes } from "vue";

interface Props extends AlertDialogTriggerProps {
  variant?: AlertDialogTriggerVariants["variant"];
  class?: HTMLAttributes["class"];
  loading?: boolean;
  disabled?: HTMLButtonElement["disabled"];
  type?: AlertDialogTriggerVariants["type"];
}

const props = defineProps<Props>();

const forwardedProps = useForwardProps(props);
</script>
